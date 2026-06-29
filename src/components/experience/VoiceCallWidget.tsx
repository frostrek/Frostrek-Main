import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Loader2, Sparkles } from 'lucide-react';
import {
    FROSTY_API_KEY,
    getTenantId,
    getVoiceCallWsUrl,
    getWebsiteSessionId,
} from '../../utils/frostyApi';

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

    // Ref to track call active state for async callbacks
    const isCallActiveRef = useRef(false);
    const tenantIdRef = useRef<string>('default');

    // Audio recording refs
    const callWsRef = useRef<WebSocket | null>(null);
    const callMediaRef = useRef<MediaRecorder | null>(null);
    const callStreamRef = useRef<MediaStream | null>(null);
    const callAudioQueueRef = useRef<Uint8Array[]>([]);

    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Audio visualization
    const [audioLevel, setAudioLevel] = useState(0);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            endCall();
        };
    }, []);

    const ensureTenantContext = async () => {
        const tenantId = await getTenantId();
        tenantIdRef.current = tenantId;
    };

    const generateSessionId = () => {
        let sid = sessionStorage.getItem("voiceCallSessionId");
        if (!sid) {
            sid = "sess_" + Math.random().toString(36).substring(2, 9);
            sessionStorage.setItem("voiceCallSessionId", sid);
        }
        return sid;
    };

    const getBridgedSessionId = (sid: string) =>
        getWebsiteSessionId(tenantIdRef.current, sid);

    // Audio level visualization
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

    const _startMicStream = (ws: WebSocket, stream: MediaStream) => {
        const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
            ? "audio/webm;codecs=opus"
            : "audio/webm";
        const recorder = new MediaRecorder(stream, { mimeType });
        callMediaRef.current = recorder;

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0 && ws.readyState === WebSocket.OPEN) {
                ws.send(e.data);
            }
        };

        recorder.start(250); // send chunk every 250ms
    };

    const _playCallAudio = async () => {
        const chunks = callAudioQueueRef.current;
        if (chunks.length === 0) {
            setIsListening(true);
            setIsSpeaking(false);
            return;
        }

        try {
            const totalLen = chunks.reduce((s, c) => s + c.byteLength, 0);
            const merged = new Uint8Array(totalLen);
            let offset = 0;
            for (const chunk of chunks) {
                merged.set(chunk, offset);
                offset += chunk.byteLength;
            }
            callAudioQueueRef.current = [];

            const blob = new Blob([merged as any], { type: "audio/mpeg" });
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);

            setIsSpeaking(true);
            setIsListening(false);

            audio.onended = () => {
                URL.revokeObjectURL(url);
                setIsSpeaking(false);
                setIsListening(true);
            };
            audio.play().catch(e => {
                console.warn("[CALL] audio play blocked:", e);
                setIsSpeaking(false);
                setIsListening(true);
            });
        } catch (e) {
            console.warn("[CALL] audio decode error:", e);
            setIsSpeaking(false);
            setIsListening(true);
        }
    };

    // Start the voice call
    const startCall = async () => {
        if (!FROSTY_API_KEY) {
            setAiResponse('Voice agent is not configured. Please set VITE_FROSTREK_BOT_API_KEY.');
            return;
        }

        try {
            setCallStatus('connecting');
            setIsLoading(true);
            setAiResponse('');
            setTranscript('');

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            callStreamRef.current = stream;

            // Setup audio analyser for visualization
            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            analyserRef.current = analyser;

            setIsCallActive(true);
            isCallActiveRef.current = true;
            onCallStateChange?.(true);

            await ensureTenantContext();

            const sid = getBridgedSessionId(generateSessionId());
            const ws = new WebSocket(getVoiceCallWsUrl(sid));
            callWsRef.current = ws;

            ws.binaryType = 'arraybuffer';

            ws.onopen = () => {
                ws.send(JSON.stringify({ api_key: FROSTY_API_KEY }));
            };

            ws.onmessage = async (event) => {
                if (event.data instanceof ArrayBuffer) {
                    callAudioQueueRef.current.push(new Uint8Array(event.data));
                    return;
                }

                try {
                    const msg = JSON.parse(event.data);
                    switch (msg.type) {
                        case "ready":
                            setCallStatus('active');
                            setIsListening(true);
                            setIsLoading(false);
                            setAiResponse("Hi! I'm Frostrek's AI assistant. How can I help you today?");
                            _startMicStream(ws, stream);
                            break;
                        case "transcript":
                            setTranscript(msg.text);
                            break;
                        case "user_final":
                            setTranscript(msg.text);
                            break;
                        case "thinking":
                            setIsLoading(true);
                            setIsListening(false);
                            break;
                        case "bot_reply":
                            setAiResponse(msg.text);
                            break;
                        case "audio_start":
                            setIsLoading(false);
                            setIsSpeaking(true);
                            callAudioQueueRef.current = [];
                            break;
                        case "audio_end":
                            _playCallAudio();
                            break;
                        case 'error':
                            console.error('[CALL] Server error:', msg.message);
                            setAiResponse(msg.message || "Sorry, I'm having trouble connecting. Please try again.");
                            setIsLoading(false);
                            endCall();
                            break;
                    }
                } catch (e) {
                    // ignore parse errors
                }
            };

            ws.onclose = () => {
                if (callWsRef.current === ws) {
                    endCall();
                }
            };

            ws.onerror = () => {
                console.error('[CALL] WebSocket error');
                setAiResponse("Connection failed. Please try again.");
                setIsLoading(false);
                endCall();
            };

        } catch (error) {
            console.error('Error starting call:', error);
            setCallStatus('idle');
            setIsLoading(false);
            alert('Cannot access microphone. Please check permissions.');
        }
    };

    // End the voice call
    const endCall = () => {
        setIsCallActive(false);
        isCallActiveRef.current = false;
        setIsListening(false);
        setIsSpeaking(false);
        setIsLoading(false);
        setCallStatus('ended');
        onCallStateChange?.(false);

        if (callMediaRef.current && callMediaRef.current.state !== "inactive") {
            callMediaRef.current.stop();
        }
        callMediaRef.current = null;

        if (callStreamRef.current) {
            callStreamRef.current.getTracks().forEach(track => track.stop());
            callStreamRef.current = null;
        }

        if (callWsRef.current) {
            try { callWsRef.current.send(JSON.stringify({ type: "hangup" })); } catch { }
            try { callWsRef.current.close(); } catch { }
            callWsRef.current = null;
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        callAudioQueueRef.current = [];
        sessionStorage.removeItem('voiceCallSessionId');
        setTimeout(() => setCallStatus('idle'), 2000);
    };

    // Toggle mute
    const toggleMute = () => {
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        if (callStreamRef.current) {
            callStreamRef.current.getAudioTracks().forEach(track => {
                track.enabled = !nextMuted;
            });
        }
    };

    return (
        <div className="relative font-body">
            {/* Main Call Widget */}
            <motion.div
                className="relative rounded-3xl p-8 shadow-[0_15px_40px_rgba(16,185,129,0.06)] border overflow-hidden bg-white border-[#BBF7D0]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Background Elegant Glow Accent */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isCallActive ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-[#F0FDF4] to-[#BBF7D0]/20`}
                />

                {/* Animated Orb - Premium Inactive & Active Green States */}
                <div className="relative flex justify-center mb-8">
                    <motion.div
                        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center cursor-pointer ${isCallActive
                            ? 'bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] shadow-lg shadow-[#2D6A4F]/30 border-2 border-emerald-400/30 text-white'
                            : 'bg-[#F0FDF4] border border-[#BBF7D0] text-[#1B4332] shadow-sm hover:border-[#10B981]/50 hover:shadow-md transition-all duration-300'
                            }`}
                        animate={{
                            scale: isCallActive ? [1, 1.05, 1] : 1,
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: isCallActive ? Infinity : 0,
                            ease: 'easeInOut',
                        }}
                        onClick={!isCallActive ? startCall : undefined}
                    >
                        {/* Inner pulsing circles for listening state */}
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

                        {/* Icon - Always perfectly brand aligned and visible! */}
                        {isLoading ? (
                            <Loader2 className="w-10 h-10 text-white animate-spin" />
                        ) : isSpeaking ? (
                            <Volume2 className="w-10 h-10 text-white animate-pulse" />
                        ) : isListening ? (
                            <Mic className="w-10 h-10 text-white animate-pulse" />
                        ) : (
                            <img src="/icons/Voice ai-green.png" alt="Voice AI" className={`w-10 h-10 object-contain transition-all duration-300 ${isCallActive ? 'brightness-0 invert' : ''}`} loading="lazy" width={512} height={512} />
                        )}
                    </motion.div>
                </div>

                {/* Status Text */}
                <div className="text-center mb-6 space-y-2 relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#1B4332]" />
                        <span className="text-[10px] font-bold tracking-wider text-[#1B4332] uppercase font-mono">
                            {callStatus === 'active' ? 'Agent Online' : 'Agent Offline'}
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

                    {/* AI Response Display - 100% visible deep slate text */}
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

                {/* Call Controls */}
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
                            {/* Mute Button */}
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

                            {/* End Call Button */}
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

                {/* Audio Level Indicator */}
                {isListening && (
                    <div className="mt-6 flex items-center justify-center gap-1.5">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 rounded-full bg-[#2D6A4F]"
                                animate={{
                                    height: Math.random() * 20 + 5 + audioLevel * 30,
                                }}
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
