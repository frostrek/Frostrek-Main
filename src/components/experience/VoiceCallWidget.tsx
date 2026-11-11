import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Loader2, Sparkles, Send } from 'lucide-react';
import {
    getTenantId,
    getOrCreateSession,
    fetchVoiceTicket,
    getBotAppearance,
    postVoiceTurnStream,
    resolveFrostyWsBase,
    isValidUuid,
    FROSTY_API_KEY,
    type FrostySessionData,
} from '../../utils/frostyApi';

interface VoiceCallWidgetProps {
    onCallStateChange?: (isActive: boolean) => void;
}

const MIME_CANDIDATES = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/ogg;codecs=opus',
    'audio/ogg',
    'audio/mp4',
    'audio/aac',
];

function pickSupportedRecorderMime(): string {
    if (typeof MediaRecorder === 'undefined') return 'audio/webm';
    const isSafari = typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const ordered = isSafari
        ? ['audio/mp4', 'audio/aac', 'audio/webm;codecs=opus', 'audio/webm', 'audio/ogg']
        : MIME_CANDIDATES;
    for (const mime of ordered) {
        if (MediaRecorder.isTypeSupported(mime)) return mime;
    }
    return '';
}

function cleanMarkdownForDisplay(raw: string): string {
    return raw
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/[*_`#>~]/g, '')
        .trim();
}

function stripMarkdownForSpeech(raw: string): string {
    return cleanMarkdownForDisplay(raw)
        .replace(/https?:\/\/\S+/g, '')
        .replace(/^\s*[-•]\s+/gm, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function splitIntoSpeechChunks(text: string): string[] {
    const cleaned = stripMarkdownForSpeech(text);
    if (!cleaned) return [];
    const sentences = cleaned.match(/[^.!?]+[.!?]*/g) || [cleaned];
    const chunks: string[] = [];
    let current = '';

    for (const sentence of sentences) {
        const trimmed = sentence.trim();
        if (!trimmed) continue;
        if ((current + ' ' + trimmed).trim().length > 180) {
            if (current) chunks.push(current.trim());
            current = trimmed;
        } else {
            current = (current ? current + ' ' : '') + trimmed;
        }
    }
    if (current) chunks.push(current.trim());
    return chunks;
}

const VoiceCallWidget: React.FC<VoiceCallWidgetProps> = ({ onCallStateChange }) => {
    const [isCallActive, setIsCallActive] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isTurnMode, setIsTurnMode] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');
    const [audioLevel, setAudioLevel] = useState(0);

    const tenantIdRef = useRef<string>('default');
    const callWsRef = useRef<WebSocket | null>(null);
    const callMediaRef = useRef<MediaRecorder | null>(null);
    const callStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const vizContextRef = useRef<AudioContext | null>(null);
    const pcmWorkletRef = useRef<AudioWorkletNode | null>(null);
    const playbackCtxRef = useRef<AudioContext | null>(null);
    const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
    const nextPlayTimeRef = useRef<number>(0);

    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const vadIntervalRef = useRef<number | null>(null);

    const isCallActiveRef = useRef(false);
    const isMutedRef = useRef(false);
    const isListeningRef = useRef(false);
    const callGenerationRef = useRef(0);
    const manualStopTurnRef = useRef<(() => void) | null>(null);
    const skipPlaybackRef = useRef<(() => void) | null>(null);

    const stopSpeechAndAudio = useCallback(() => {
        try {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        } catch { /* ignore */ }
        if (htmlAudioRef.current) {
            try {
                htmlAudioRef.current.pause();
                htmlAudioRef.current.src = '';
            } catch { /* ignore */ }
            htmlAudioRef.current = null;
        }
        try {
            playbackCtxRef.current?.close();
        } catch { /* ignore */ }
        playbackCtxRef.current = null;
        nextPlayTimeRef.current = 0;
    }, []);

    const cleanupResources = useCallback(() => {
        isCallActiveRef.current = false;
        isListeningRef.current = false;
        callGenerationRef.current += 1;
        manualStopTurnRef.current = null;
        skipPlaybackRef.current = null;

        if (vadIntervalRef.current !== null) {
            window.clearInterval(vadIntervalRef.current);
            vadIntervalRef.current = null;
        }
        if (animationFrameRef.current !== null) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        try { pcmWorkletRef.current?.disconnect(); } catch { /* no-op */ }
        pcmWorkletRef.current = null;
        try { audioContextRef.current?.close(); } catch { /* no-op */ }
        audioContextRef.current = null;
        try { vizContextRef.current?.close(); } catch { /* no-op */ }
        vizContextRef.current = null;
        analyserRef.current = null;

        if (callMediaRef.current && callMediaRef.current.state !== 'inactive') {
            try { callMediaRef.current.stop(); } catch { /* no-op */ }
        }
        callMediaRef.current = null;

        if (callStreamRef.current) {
            callStreamRef.current.getTracks().forEach((track) => track.stop());
            callStreamRef.current = null;
        }

        if (callWsRef.current) {
            try { callWsRef.current.send(JSON.stringify({ type: 'hangup' })); } catch { /* no-op */ }
            try { callWsRef.current.close(); } catch { /* no-op */ }
            callWsRef.current = null;
        }

        stopSpeechAndAudio();
    }, [stopSpeechAndAudio]);

    useEffect(() => {
        try {
            const storedSid = sessionStorage.getItem('voiceCallSessionId');
            if (storedSid && !isValidUuid(storedSid)) {
                sessionStorage.removeItem('voiceCallSessionId');
            }
        } catch { /* ignore */ }

        return () => {
            cleanupResources();
        };
    }, [cleanupResources]);

    const generateSessionId = () => {
        let sid = sessionStorage.getItem('voiceCallSessionId');
        if (!sid || !isValidUuid(sid)) {
            sid = typeof crypto !== 'undefined' && crypto.randomUUID
                ? crypto.randomUUID()
                : `exp_${Math.random().toString(36).substring(2, 10)}`;
            sessionStorage.setItem('voiceCallSessionId', sid);
        }
        return sid;
    };

    const playPcmChunk = (pcmBytes: Uint8Array) => {
        if (!pcmBytes.length) return;
        setIsSpeaking(true);
        setIsListening(false);
        isListeningRef.current = false;

        try {
            if (!playbackCtxRef.current || playbackCtxRef.current.state === 'closed') {
                playbackCtxRef.current = new AudioContext({ sampleRate: 24000 });
                nextPlayTimeRef.current = 0;
            }
            const ctx = playbackCtxRef.current;
            if (ctx.state === 'suspended') {
                void ctx.resume();
            }

            const samplesCount = Math.floor(pcmBytes.byteLength / 2);
            if (samplesCount === 0) return;
            const dataView = new DataView(pcmBytes.buffer, pcmBytes.byteOffset, pcmBytes.byteLength);
            const float32 = new Float32Array(samplesCount);
            for (let i = 0; i < samplesCount; i++) {
                float32[i] = dataView.getInt16(i * 2, true) / 32768.0;
            }

            const buffer = ctx.createBuffer(1, float32.length, 24000);
            buffer.copyToChannel(float32, 0);

            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);

            const now = ctx.currentTime;
            const startTime = Math.max(now, nextPlayTimeRef.current);
            source.start(startTime);
            nextPlayTimeRef.current = startTime + buffer.duration;
        } catch (err) {
            console.warn('[CALL] PCM playback error', err);
        }
    };

    const startS2SMicStream = async (ws: WebSocket, stream: MediaStream) => {
        try {
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }
            audioContextRef.current = ctx;

            // Resample system hardware sample rate (e.g. 44.1kHz / 48kHz) cleanly to 16kHz PCM16.
            const processorCode = `
                class PcmCaptureProcessor extends AudioWorkletProcessor {
                  constructor(options) {
                    super();
                    this.inRate = options?.processorOptions?.sampleRate || 48000;
                    this.outRate = 16000;
                    this.ratio = this.inRate / this.outRate;
                    this.phase = 0;
                    this.bufferSize = 1600;
                    this.buffer = new Int16Array(this.bufferSize);
                    this.bufIndex = 0;
                  }
                  process(inputs) {
                    const input = inputs[0]?.[0];
                    if (!input || !input.length) return true;
                    const len = input.length;
                    let i = this.phase;
                    for (; i < len; i += this.ratio) {
                      const idx = Math.floor(i);
                      const frac = i - idx;
                      const s0 = input[idx] || 0;
                      const s1 = idx + 1 < len ? input[idx + 1] : s0;
                      const sample = Math.max(-1, Math.min(1, s0 + (s1 - s0) * frac));
                      this.buffer[this.bufIndex++] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
                      if (this.bufIndex >= this.bufferSize) {
                        const chunk = this.buffer.slice(0, this.bufferSize);
                        this.port.postMessage(chunk.buffer, [chunk.buffer]);
                        this.bufIndex = 0;
                      }
                    }
                    const rem = (len - this.phase) % this.ratio;
                    this.phase = rem > 0 ? this.ratio - rem : 0;
                    return true;
                  }
                }
                registerProcessor("pcm-capture-processor", PcmCaptureProcessor);
            `;
            const blob = new Blob([processorCode], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            try {
                await ctx.audioWorklet.addModule(url);
            } finally {
                URL.revokeObjectURL(url);
            }

            const source = ctx.createMediaStreamSource(stream);
            const worklet = new AudioWorkletNode(ctx, 'pcm-capture-processor', {
                processorOptions: { sampleRate: ctx.sampleRate },
            });
            pcmWorkletRef.current = worklet;

            worklet.port.onmessage = (e) => {
                if (!isMutedRef.current && ws.readyState === WebSocket.OPEN) {
                    ws.send(e.data);
                }
            };

            source.connect(worklet);
            setIsListening(true);
            isListeningRef.current = true;
            setIsSpeaking(false);
            setIsLoading(false);
            setCallStatus('active');
        } catch (err) {
            console.error('[CALL] AudioWorklet setup failed, falling back to MediaRecorder', err);
            const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
                ? 'audio/webm;codecs=opus'
                : 'audio/webm';
            const rec = new MediaRecorder(stream, { mimeType: mime });
            callMediaRef.current = rec;
            rec.ondataavailable = (e) => {
                if (!isMutedRef.current && e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
                    ws.send(e.data);
                }
            };
            rec.start(250);
            setIsListening(true);
            isListeningRef.current = true;
            setIsSpeaking(false);
            setIsLoading(false);
            setCallStatus('active');
        }
    };

    const speakReply = useCallback(async (text: string, audioUrl: string | null, gen: number): Promise<void> => {
        if (!isCallActiveRef.current || callGenerationRef.current !== gen) return;

        setIsSpeaking(true);
        setIsListening(false);
        isListeningRef.current = false;
        setIsLoading(false);

        if (audioUrl) {
            await new Promise<void>((resolve) => {
                let settled = false;
                const audio = new Audio(audioUrl);
                htmlAudioRef.current = audio;

                const finish = () => {
                    if (settled) return;
                    settled = true;
                    skipPlaybackRef.current = null;
                    try {
                        audio.pause();
                        audio.src = '';
                    } catch { /* ignore */ }
                    if (htmlAudioRef.current === audio) {
                        htmlAudioRef.current = null;
                    }
                    resolve();
                };
                skipPlaybackRef.current = finish;

                audio.onended = finish;
                audio.onerror = finish;
                audio.play().catch(finish);
            });
            return;
        }

        if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
            return;
        }

        const chunks = splitIntoSpeechChunks(text);
        if (!chunks.length) return;

        window.speechSynthesis.cancel();
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
            voices.find((v) => /en[-_](US|GB|IN)/i.test(v.lang) && /natural|google|samantha|aria|jenny/i.test(v.name)) ||
            voices.find((v) => /^en/i.test(v.lang));

        await new Promise<void>((resolve) => {
            let settled = false;
            let idx = 0;
            let safetyTimer: number | null = null;

            const finish = () => {
                if (settled) return;
                settled = true;
                if (safetyTimer !== null) window.clearTimeout(safetyTimer);
                skipPlaybackRef.current = null;
                try { window.speechSynthesis.cancel(); } catch { /* ignore */ }
                resolve();
            };

            skipPlaybackRef.current = finish;

            const speakNext = () => {
                if (settled || !isCallActiveRef.current || callGenerationRef.current !== gen || idx >= chunks.length) {
                    finish();
                    return;
                }
                const chunkText = chunks[idx++];
                const utterance = new SpeechSynthesisUtterance(chunkText);
                if (preferredVoice) utterance.voice = preferredVoice;
                utterance.rate = 1.04;
                utterance.pitch = 1.0;

                if (safetyTimer !== null) window.clearTimeout(safetyTimer);
                safetyTimer = window.setTimeout(speakNext, Math.max(4500, chunkText.length * 95));

                utterance.onend = () => {
                    if (safetyTimer !== null) window.clearTimeout(safetyTimer);
                    speakNext();
                };
                utterance.onerror = () => {
                    if (safetyTimer !== null) window.clearTimeout(safetyTimer);
                    speakNext();
                };
                window.speechSynthesis.speak(utterance);
            };

            speakNext();
        });
    }, []);

    /** Conversational turn-based voice loop using Frosty's /voice API when real-time S2S WebSocket is not enabled. */
    const runTurnVoiceLoop = useCallback(async (stream: MediaStream, sid: string, greeting: string, gen: number) => {
        setIsTurnMode(true);
        setCallStatus('active');
        setAiResponse(greeting || 'Hi! How can we help?');

        if (greeting) {
            await speakReply(greeting, null, gen);
        }

        const timeData = new Uint8Array(256);

        while (isCallActiveRef.current && callGenerationRef.current === gen) {
            setIsSpeaking(false);
            setIsLoading(false);
            setIsListening(true);
            isListeningRef.current = true;

            const mime = pickSupportedRecorderMime();
            const chunks: BlobPart[] = [];
            let recorder: MediaRecorder;
            try {
                recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
            } catch (err) {
                console.error('[CALL] MediaRecorder init error:', err);
                break;
            }
            callMediaRef.current = recorder;

            const recordedBlob = await new Promise<Blob | null>((resolve) => {
                let settled = false;
                let hasSpoken = false;
                const recStart = Date.now();
                let lastSpeechAt = recStart;

                const stopRec = () => {
                    if (vadIntervalRef.current !== null) {
                        window.clearInterval(vadIntervalRef.current);
                        vadIntervalRef.current = null;
                    }
                    manualStopTurnRef.current = null;
                    if (recorder.state === 'recording') {
                        try { recorder.stop(); } catch { finish(null); }
                    } else if (!settled) {
                        finish(null);
                    }
                };

                const finish = (blob: Blob | null) => {
                    if (settled) return;
                    settled = true;
                    if (vadIntervalRef.current !== null) {
                        window.clearInterval(vadIntervalRef.current);
                        vadIntervalRef.current = null;
                    }
                    manualStopTurnRef.current = null;
                    resolve(blob);
                };

                manualStopTurnRef.current = () => {
                    hasSpoken = true;
                    stopRec();
                };

                recorder.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) {
                        chunks.push(e.data);
                    }
                };

                recorder.onstop = () => {
                    if (!isCallActiveRef.current || callGenerationRef.current !== gen || !hasSpoken || !chunks.length) {
                        finish(null);
                        return;
                    }
                    finish(new Blob(chunks, { type: recorder.mimeType || mime || 'audio/webm' }));
                };

                recorder.onerror = () => finish(null);
                recorder.start(250);

                vadIntervalRef.current = window.setInterval(() => {
                    if (!isCallActiveRef.current || callGenerationRef.current !== gen) {
                        stopRec();
                        return;
                    }
                    const analyser = analyserRef.current;
                    const now = Date.now();
                    if (analyser && !isMutedRef.current) {
                        analyser.getByteTimeDomainData(timeData);
                        let sumSq = 0;
                        for (let i = 0; i < timeData.length; i++) {
                            const normalized = (timeData[i] - 128) / 128;
                            sumSq += normalized * normalized;
                        }
                        const rms = Math.sqrt(sumSq / timeData.length);

                        if (rms > 0.025) {
                            hasSpoken = true;
                            lastSpeechAt = now;
                        }
                    }

                    // End turn naturally after ~1.4s of silence following speech, or at 20s max turn length.
                    if (hasSpoken && now - lastSpeechAt >= 1450 && now - recStart >= 700) {
                        stopRec();
                    } else if (hasSpoken && now - recStart >= 20000) {
                        stopRec();
                    } else if (!hasSpoken && now - recStart >= 18000) {
                        // Reset long silent buffer cleanly so audio file stays compact when idle.
                        stopRec();
                    }
                }, 70);
            });

            if (!isCallActiveRef.current || callGenerationRef.current !== gen) {
                break;
            }
            if (!recordedBlob || recordedBlob.size < 1200) {
                continue;
            }

            setIsListening(false);
            isListeningRef.current = false;
            setIsLoading(true);
            setTranscript('Transcribing...');

            try {
                let streamed = '';
                const { reply, audioUrl } = await postVoiceTurnStream(
                    recordedBlob,
                    recordedBlob.type || mime || 'audio/webm',
                    {
                        onTranscribed: (text) => {
                            if (isCallActiveRef.current && callGenerationRef.current === gen) {
                                setTranscript(`You: "${text}"`);
                            }
                        },
                        onToken: (tok) => {
                            if (isCallActiveRef.current && callGenerationRef.current === gen) {
                                streamed += tok;
                                setAiResponse(streamed);
                            }
                        },
                        onFinal: (finalText) => {
                            if (isCallActiveRef.current && callGenerationRef.current === gen && finalText) {
                                setAiResponse(finalText);
                            }
                        },
                    },
                    sid
                );

                if (!isCallActiveRef.current || callGenerationRef.current !== gen) {
                    break;
                }

                if (reply || audioUrl) {
                    await speakReply(reply, audioUrl, gen);
                } else {
                    setIsLoading(false);
                }
            } catch (err: any) {
                if (!isCallActiveRef.current || callGenerationRef.current !== gen) {
                    break;
                }
                console.warn('[CALL] Voice turn error:', err);
                setAiResponse(err?.message || 'Could not process voice turn. Please speak again.');
                setIsLoading(false);
            }
        }
    }, [speakReply]);

    const updateAudioLevel = useCallback(() => {
        if (!analyserRef.current || !isListening) {
            setAudioLevel(0);
            return;
        }

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setAudioLevel(Math.min(1, average / 110));
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    }, [isListening]);

    useEffect(() => {
        if (isListening && analyserRef.current) {
            updateAudioLevel();
        } else {
            if (animationFrameRef.current !== null) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            setAudioLevel(0);
        }
    }, [isListening, updateAudioLevel]);

    const endCall = useCallback(() => {
        cleanupResources();
        setIsCallActive(false);
        setIsListening(false);
        setIsSpeaking(false);
        setIsLoading(false);
        setIsTurnMode(false);
        setCallStatus('ended');
        onCallStateChange?.(false);

        setTimeout(() => {
            if (!isCallActiveRef.current) {
                setCallStatus('idle');
            }
        }, 2000);
    }, [cleanupResources, onCallStateChange]);

    const startCall = async () => {
        if (!FROSTY_API_KEY) {
            setAiResponse('Voice agent is not configured. Please set VITE_FROSTREK_BOT_API_KEY.');
            return;
        }

        // Prime speechSynthesis during user click gesture for browser autoplay policies.
        try {
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.getVoices();
            }
        } catch { /* ignore */ }

        const gen = ++callGenerationRef.current;

        try {
            setCallStatus('connecting');
            setIsLoading(true);
            setIsTurnMode(false);
            setAiResponse('');
            setTranscript('');
            stopSpeechAndAudio();

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
            });

            if (callGenerationRef.current !== gen) {
                stream.getTracks().forEach((t) => t.stop());
                return;
            }

            callStreamRef.current = stream;

            const vizContext = new AudioContext();
            if (vizContext.state === 'suspended') {
                await vizContext.resume();
            }
            vizContextRef.current = vizContext;
            const vizSource = vizContext.createMediaStreamSource(stream);
            const analyser = vizContext.createAnalyser();
            analyser.fftSize = 256;
            vizSource.connect(analyser);
            analyserRef.current = analyser;

            isCallActiveRef.current = true;
            setIsCallActive(true);
            onCallStateChange?.(true);

            tenantIdRef.current = await getTenantId();
            const sid = generateSessionId();

            const [session, appearance]: [FrostySessionData, { greeting: string }] = await Promise.all([
                getOrCreateSession(sid),
                getBotAppearance(),
            ]);

            if (!isCallActiveRef.current || callGenerationRef.current !== gen) return;

            // Try real-time S2S WebSocket when enabled on this Frosty workspace/agent.
            if (session.s2sEnabled) {
                const { ticket, error, errorCode } = await fetchVoiceTicket(session.conversationId);
                if (!isCallActiveRef.current || callGenerationRef.current !== gen) return;

                if (ticket) {
                    const wsBase = resolveFrostyWsBase();
                    const wsUrl = `${wsBase}/v1/public/widget/sessions/${encodeURIComponent(session.conversationId)}/live-s2s?ticket=${encodeURIComponent(ticket)}`;
                    const ws = new WebSocket(wsUrl);
                    ws.binaryType = 'arraybuffer';
                    ws.onopen = () => {
                        void startS2SMicStream(ws, stream);
                    };
                    callWsRef.current = ws;

                    ws.onmessage = async (event) => {
                        if (event.data instanceof ArrayBuffer) {
                            playPcmChunk(new Uint8Array(event.data));
                            return;
                        }
                        if (event.data instanceof Blob) {
                            const buf = await event.data.arrayBuffer();
                            playPcmChunk(new Uint8Array(buf));
                            return;
                        }

                        try {
                            const msg = JSON.parse(event.data);
                            const type = msg.type || msg.event;
                            switch (type) {
                                case 'ready':
                                case 's2s.ready':
                                    setAiResponse(appearance.greeting || 'Hi! How can we help?');
                                    void startS2SMicStream(ws, stream);
                                    break;
                                case 'transcript':
                                case 'user_final':
                                case 'voice.transcribed':
                                    setTranscript(msg.text || msg.data?.text || '');
                                    break;
                                case 'thinking':
                                case 's2s.thinking':
                                case 's2s.awaiting_reply':
                                    setIsLoading(true);
                                    setIsListening(false);
                                    isListeningRef.current = false;
                                    setIsSpeaking(false);
                                    break;
                                case 'bot_reply':
                                case 's2s.speak':
                                case 'voice.reply_text':
                                    setAiResponse(msg.text || msg.data?.text || '');
                                    setIsLoading(false);
                                    break;
                                case 'audio_end':
                                case 's2s.turn_complete':
                                    setIsLoading(false);
                                    setIsSpeaking(false);
                                    setIsListening(true);
                                    isListeningRef.current = true;
                                    break;
                                case 'interrupted':
                                case 's2s.interrupted':
                                    stopSpeechAndAudio();
                                    setIsLoading(false);
                                    setIsSpeaking(false);
                                    setIsListening(true);
                                    isListeningRef.current = true;
                                    break;
                                case 's2s.audio':
                                    if (msg.data?.base64_audio || msg.data) {
                                        const b64 = typeof msg.data === 'string' ? msg.data : msg.data?.base64_audio;
                                        if (b64) {
                                            const binary = atob(b64);
                                            const bytes = new Uint8Array(binary.length);
                                            for (let i = 0; i < binary.length; i++) {
                                                bytes[i] = binary.charCodeAt(i);
                                            }
                                            playPcmChunk(bytes);
                                        }
                                    }
                                    break;
                                case 's2s.closed':
                                    endCall();
                                    break;
                                case 'error':
                                    setAiResponse(msg.message || msg.text || 'Voice service error');
                                    setIsLoading(false);
                                    break;
                            }
                        } catch {
                            // Ignore non-JSON payloads.
                        }
                    };

                    ws.onclose = () => {
                        if (callWsRef.current === ws) {
                            endCall();
                        }
                    };

                    ws.onerror = () => {
                        console.error('[CALL] WebSocket error');
                        setAiResponse('Connection failed. Please try again.');
                        endCall();
                    };
                    return;
                }

                if (errorCode !== 'feature_not_entitled' && !session.liveVoiceEnabled) {
                    setAiResponse(error || 'Voice calling could not connect. Please try again.');
                    endCall();
                    return;
                }
            }

            // Use turn-based conversational voice (/voice endpoint) when live_voice_enabled is active.
            if (session.liveVoiceEnabled) {
                void runTurnVoiceLoop(stream, sid, appearance.greeting, gen);
                return;
            }

            setAiResponse('Voice calling is not enabled for this agent in your Frosty Agent dashboard.');
            endCall();
        } catch (error) {
            console.error('Error starting call:', error);
            cleanupResources();
            setCallStatus('idle');
            setIsLoading(false);
            setIsCallActive(false);
            onCallStateChange?.(false);
            alert('Cannot access microphone. Please check permissions.');
        }
    };

    const toggleMute = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        isMutedRef.current = nextMuted;
        callStreamRef.current?.getAudioTracks().forEach((track) => {
            track.enabled = !nextMuted;
        });
    };

    return (
        <div className="relative font-body">
            <motion.div
                className="relative rounded-3xl p-8 shadow-[0_15px_40px_rgba(16,185,129,0.06)] border overflow-hidden bg-white border-[#BBF7D0]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div
                    className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isCallActive ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-[#F0FDF4] to-[#BBF7D0]/20`}
                />

                <div className="relative flex justify-center mb-8">
                    <motion.div
                        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center cursor-pointer ${isCallActive
                            ? 'bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] shadow-lg shadow-[#2D6A4F]/30 border-2 border-emerald-400/30 text-white'
                            : 'bg-[#F0FDF4] border border-[#BBF7D0] text-[#1B4332] shadow-sm hover:border-[#10B981]/50 hover:shadow-md transition-all duration-300'
                            }`}
                        animate={{ scale: isCallActive ? [1, 1.05, 1] : 1 }}
                        transition={{ duration: 1.5, repeat: isCallActive ? Infinity : 0, ease: 'easeInOut' }}
                        onClick={!isCallActive ? startCall : isSpeaking ? () => skipPlaybackRef.current?.() : undefined}
                    >
                        {isListening && (
                            <>
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="absolute inset-0 rounded-full border-2 border-emerald-500/25 animate-ping"
                                        style={{ animationDelay: `${i * 0.4}s` }}
                                    />
                                ))}
                            </>
                        )}

                        {isLoading ? (
                            <Loader2 className="w-10 h-10 text-white animate-spin" />
                        ) : isSpeaking ? (
                            <Volume2 className="w-10 h-10 text-white animate-pulse" />
                        ) : isListening ? (
                            <Mic className="w-10 h-10 text-white animate-pulse" />
                        ) : (
                            <img src="/icons/Voice-ai-green.webp" alt="Voice AI" className={`w-10 h-10 object-contain transition-all duration-300 ${isCallActive ? 'brightness-0 invert' : ''}`} loading="lazy" width={512} height={512} />
                        )}
                    </motion.div>
                </div>

                <div className="text-center mb-6 space-y-2 relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
                        <span className="text-[10px] font-bold tracking-wider text-[#1B4332] uppercase font-mono">
                            {callStatus === 'active' ? 'Agent Online' : callStatus === 'connecting' ? 'Connecting' : 'Agent Offline'}
                        </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-gray-900 leading-tight">
                        {callStatus === 'idle' && 'Voice AI Assistant'}
                        {callStatus === 'connecting' && 'Connecting...'}
                        {callStatus === 'active' && (
                            isListening ? 'Listening...' :
                                isSpeaking ? 'Speaking...' :
                                    isLoading ? 'Processing...' : 'Ready'
                        )}
                        {callStatus === 'ended' && 'Call Ended'}
                    </h3>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={aiResponse ? 'response' : 'idle'}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="text-sm max-w-sm max-h-36 overflow-y-auto mx-auto leading-relaxed text-slate-700 font-body whitespace-pre-line"
                        >
                            {aiResponse ? cleanMarkdownForDisplay(aiResponse) : "Click 'Try Voice Call' below to speak live with our conversational AI agent."}
                        </motion.p>
                    </AnimatePresence>

                    {transcript && (
                        <p className="text-xs italic text-emerald-700 font-extrabold tracking-wide mt-2">{transcript}</p>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                    {!isCallActive ? (
                        <button
                            onClick={startCall}
                            disabled={callStatus === 'connecting'}
                            className="flex items-center gap-2.5 px-8 py-4 font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 cursor-pointer bg-[#16A34A] hover:bg-[#12823b] text-white text-sm tracking-widest uppercase font-body"
                        >
                            <Phone className="w-4 h-4 text-white" />
                            Try Voice Call
                        </button>
                    ) : (
                        <>
                            <motion.button
                                onClick={toggleMute}
                                title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                                className={`p-4 rounded-full transition-all duration-300 border cursor-pointer ${isMuted
                                    ? 'bg-red-50 text-red-500 border-red-200'
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMuted ? <MicOff className="w-5.5 h-5.5" /> : <Mic className="w-5.5 h-5.5" />}
                            </motion.button>

                            {isTurnMode && isListening && (
                                <motion.button
                                    onClick={() => manualStopTurnRef.current?.()}
                                    className="flex items-center gap-2 px-5 py-4 bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-extrabold rounded-xl shadow-md transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Send className="w-4 h-4 text-white" />
                                    Send Now
                                </motion.button>
                            )}

                            {isTurnMode && isSpeaking && (
                                <motion.button
                                    onClick={() => skipPlaybackRef.current?.()}
                                    className="flex items-center gap-2 px-5 py-4 bg-white border border-[#BBF7D0] text-[#1B4332] hover:bg-[#F0FDF4] font-extrabold rounded-xl shadow-sm transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Mic className="w-4 h-4" />
                                    Speak Next
                                </motion.button>
                            )}

                            <motion.button
                                onClick={endCall}
                                className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-extrabold rounded-xl shadow-md transition-all duration-300 text-xs uppercase tracking-widest cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <PhoneOff className="w-4 h-4 text-white" />
                                End Call
                            </motion.button>
                        </>
                    )}
                </div>

                {isListening && (
                    <div className="mt-6 flex items-center justify-center gap-1.5">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 rounded-full bg-[#2D6A4F]"
                                animate={{ height: Math.random() * 20 + 5 + audioLevel * 30 }}
                                transition={{ duration: 0.1 }}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default VoiceCallWidget;
