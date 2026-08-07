import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Loader2, Sparkles } from 'lucide-react';
import { getTenantId, getWebsiteSessionId } from '../../utils/frostyApi';
import {
    apiBaseToWsBase,
    FROSTY_BOT_API_KEY,
    resolveBotApiBase,
} from '../../utils/botApi';

interface VoiceCallWidgetProps {
    onCallStateChange?: (isActive: boolean) => void;
}

const VoiceCallWidget: React.FC<VoiceCallWidgetProps> = ({ onCallStateChange }) => {
    const [isCallActive, setIsCallActive] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active' | 'ended'>('idle');

    const tenantIdRef = useRef<string>('default');
    const callWsRef = useRef<WebSocket | null>(null);
    const callMediaRef = useRef<MediaRecorder | null>(null);
    const callStreamRef = useRef<MediaStream | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const pcmWorkletRef = useRef<AudioWorkletNode | null>(null);
    const playbackCtxRef = useRef<AudioContext | null>(null);
    const nextPlayTimeRef = useRef<number>(0);

    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const [audioLevel, setAudioLevel] = useState(0);

    useEffect(() => {
        return () => {
            endCall();
        };
    }, []);

    const ensureTenantContext = async () => {
        tenantIdRef.current = await getTenantId();
    };

    const generateSessionId = () => {
        let sid = sessionStorage.getItem('voiceCallSessionId');
        if (!sid) {
            sid = 'sess_' + Math.random().toString(36).substring(2, 9);
            sessionStorage.setItem('voiceCallSessionId', sid);
        }
        return sid;
    };

    const getBridgedSessionId = (sid: string) =>
        getWebsiteSessionId(tenantIdRef.current, sid);

    const flushPlayback = () => {
        try {
            playbackCtxRef.current?.close();
        } catch {
            // AudioContext may already be closed.
        }
        playbackCtxRef.current = null;
        nextPlayTimeRef.current = 0;
    };

    const playPcmChunk = (pcmBytes: Uint8Array) => {
        if (!pcmBytes.length) return;
        setIsSpeaking(true);
        setIsListening(false);

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

    const startMicStream = async (ws: WebSocket, stream: MediaStream) => {
        try {
            const ctx = new AudioContext({ sampleRate: 16000 });
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }
            audioContextRef.current = ctx;

            const processorCode = `
                class PcmProcessor extends AudioWorkletProcessor {
                  process(inputs) {
                    const input = inputs[0]?.[0];
                    if (input) {
                      const pcm16 = new Int16Array(input.length);
                      for (let i = 0; i < input.length; i++) {
                        const s = Math.max(-1, Math.min(1, input[i]));
                        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
                      }
                      this.port.postMessage(pcm16.buffer, [pcm16.buffer]);
                    }
                    return true;
                  }
                }
                registerProcessor("pcm-processor", PcmProcessor);
            `;
            const blob = new Blob([processorCode], { type: 'application/javascript' });
            const url = URL.createObjectURL(blob);
            await ctx.audioWorklet.addModule(url);
            URL.revokeObjectURL(url);

            const source = ctx.createMediaStreamSource(stream);
            const worklet = new AudioWorkletNode(ctx, 'pcm-processor');
            pcmWorkletRef.current = worklet;

            worklet.port.onmessage = (e) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(e.data);
                }
            };

            source.connect(worklet);
            setIsListening(true);
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
                if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) ws.send(e.data);
            };
            rec.start(250);
            setIsListening(true);
            setIsSpeaking(false);
            setIsLoading(false);
            setCallStatus('active');
        }
    };

    const updateAudioLevel = useCallback(() => {
        if (!analyserRef.current || !isListening) {
            setAudioLevel(0);
            return;
        }

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setAudioLevel(average / 255);
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    }, [isListening]);

    useEffect(() => {
        if (isListening && analyserRef.current) {
            updateAudioLevel();
        } else {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            setAudioLevel(0);
        }
    }, [isListening, updateAudioLevel]);

    const startCall = async () => {
        if (!FROSTY_BOT_API_KEY) {
            setAiResponse('Voice agent is not configured. Please set VITE_FROSTREK_BOT_API_KEY.');
            return;
        }

        try {
            setCallStatus('connecting');
            setIsLoading(true);
            setAiResponse('');
            setTranscript('');
            flushPlayback();

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true, noiseSuppression: true },
            });
            callStreamRef.current = stream;

            const vizContext = new AudioContext();
            const vizSource = vizContext.createMediaStreamSource(stream);
            const analyser = vizContext.createAnalyser();
            analyser.fftSize = 256;
            vizSource.connect(analyser);
            analyserRef.current = analyser;

            setIsCallActive(true);
            onCallStateChange?.(true);

            await ensureTenantContext();

            const wsBase = apiBaseToWsBase(resolveBotApiBase());
            const sid = getBridgedSessionId(generateSessionId());
            const ws = new WebSocket(`${wsBase}/ws/voice-call/${encodeURIComponent(sid)}`);
            callWsRef.current = ws;
            ws.binaryType = 'arraybuffer';

            ws.onopen = () => {
                ws.send(JSON.stringify({ api_key: FROSTY_BOT_API_KEY }));
            };

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
                    switch (msg.type) {
                        case 'ready':
                            setAiResponse("Hi! I'm Frostrek's AI assistant. How can I help you today?");
                            void startMicStream(ws, stream);
                            break;
                        case 'transcript':
                            setTranscript(msg.text);
                            break;
                        case 'user_final':
                            setTranscript(msg.text);
                            break;
                        case 'thinking':
                            setIsLoading(true);
                            setIsListening(false);
                            setIsSpeaking(false);
                            break;
                        case 'bot_reply':
                            setAiResponse(msg.text);
                            setIsLoading(false);
                            break;
                        case 'audio_end':
                            setIsLoading(false);
                            setIsSpeaking(false);
                            setIsListening(true);
                            break;
                        case 'interrupted':
                            flushPlayback();
                            setIsLoading(false);
                            setIsSpeaking(false);
                            setIsListening(true);
                            break;
                        case 'error':
                            console.error('[CALL] Server error:', msg.message);
                            setAiResponse(msg.message || "Sorry, I'm having trouble connecting. Please try again.");
                            endCall();
                            break;
                    }
                } catch {
                    // ignore malformed payloads
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
        } catch (error) {
            console.error('Error starting call:', error);
            setCallStatus('idle');
            setIsLoading(false);
            setIsCallActive(false);
            alert('Cannot access microphone. Please check permissions.');
        }
    };

    const endCall = () => {
        try { pcmWorkletRef.current?.disconnect(); } catch { /* no-op */ }
        pcmWorkletRef.current = null;
        try { audioContextRef.current?.close(); } catch { /* no-op */ }
        audioContextRef.current = null;

        if (callMediaRef.current && callMediaRef.current.state !== 'inactive') {
            callMediaRef.current.stop();
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

        flushPlayback();

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        analyserRef.current = null;

        setIsCallActive(false);
        setIsListening(false);
        setIsSpeaking(false);
        setIsLoading(false);
        setCallStatus('ended');
        onCallStateChange?.(false);

        setTimeout(() => setCallStatus('idle'), 2000);
    };

    const toggleMute = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
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
                        onClick={!isCallActive ? startCall : undefined}
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
                            key={aiResponse || 'idle'}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="text-sm max-w-sm mx-auto leading-relaxed text-slate-700 font-body"
                        >
                            {aiResponse || "Click 'Try Voice Call' below to speak live with our conversational AI agent."}
                        </motion.p>
                    </AnimatePresence>

                    {transcript && (
                        <p className="text-xs italic text-emerald-700 font-extrabold tracking-wide mt-2">{transcript}</p>
                    )}
                </div>

                <div className="flex items-center justify-center gap-4 relative z-10">
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
                                className={`p-4 rounded-full transition-all duration-300 border ${isMuted
                                    ? 'bg-red-50 text-red-500 border-red-200'
                                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMuted ? <MicOff className="w-5.5 h-5.5" /> : <Mic className="w-5.5 h-5.5" />}
                            </motion.button>

                            <motion.button
                                onClick={endCall}
                                className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-extrabold rounded-xl shadow-md transition-all duration-300 text-xs uppercase tracking-widest"
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
