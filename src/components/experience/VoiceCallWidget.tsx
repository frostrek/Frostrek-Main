import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, Mic, MicOff, Volume2, Loader2, Sparkles } from 'lucide-react';

const WEBHOOK_URL = 'https://n8n.frostrek.com/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436';

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

    // Audio recording refs
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const silenceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    // Audio visualization
    const [audioLevel, setAudioLevel] = useState(0);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (silenceTimeoutRef.current) {
                clearTimeout(silenceTimeoutRef.current);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    // Audio level visualization
    const updateAudioLevel = useCallback(() => {
        if (!analyserRef.current || !isListening) return;

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        setAudioLevel(average / 255);

        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    }, [isListening]);

    // Start the voice call
    const startCall = async () => {
        console.log('🎤 startCall triggered');
        try {
            setCallStatus('connecting');
            setAiResponse('');
            setTranscript('');
            console.log('🎤 Status set to connecting');

            console.log('🎤 Requesting microphone access...');
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            console.log('🎤 Microphone access granted');
            streamRef.current = stream;

            // Setup audio analyser for visualization
            const audioContext = new AudioContext();
            const source = audioContext.createMediaStreamSource(stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);
            analyserRef.current = analyser;
            console.log('🎤 Audio context setup complete');

            setIsCallActive(true);
            isCallActiveRef.current = true;
            setCallStatus('active');
            onCallStateChange?.(true);
            console.log('🎤 Call is now active');

            // Initial greeting from AI
            const greeting = "Hi! I'm Frostrek's AI assistant. How can I help you today?";
            setAiResponse(greeting);
            setIsSpeaking(true);
            console.log('🎤 Starting speech synthesis...');
            await speakText(greeting);
            console.log('🎤 Speech finished');
            setIsSpeaking(false);

            // Start listening after greeting
            console.log('🎤 Starting to listen...');
            startListening();
        } catch (error) {
            console.error('🎤 Error starting call:', error);
            setCallStatus('idle');
            alert('Cannot access microphone. Please check permissions. Error: ' + (error as Error).message);
        }
    };

    // End the voice call
    const endCall = () => {
        setIsCallActive(false);
        isCallActiveRef.current = false;
        setIsListening(false);
        setIsSpeaking(false);
        setCallStatus('ended');
        onCallStateChange?.(false);

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }

        if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        // Clear session for fresh start next time
        sessionStorage.removeItem('voiceCallSessionId');

        setTimeout(() => setCallStatus('idle'), 2000);
    };

    // Start listening for user speech
    const startListening = () => {
        if (!streamRef.current || isMuted) return;

        setIsListening(true);
        audioChunksRef.current = [];

        const mediaRecorder = new MediaRecorder(streamRef.current, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            if (audioChunksRef.current.length > 0) {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                await sendToAI(audioBlob);
            }
        };

        mediaRecorder.start();
        updateAudioLevel();

        // Auto-stop after 10 seconds of recording
        silenceTimeoutRef.current = setTimeout(() => {
            if (mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
                setIsListening(false);
            }
        }, 10000);
    };

    // Stop listening
    const stopListening = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        setIsListening(false);

        if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
        }

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };

    // Send audio to n8n and get response
    const sendToAI = async (audioBlob: Blob) => {
        setIsLoading(true);
        setTranscript('Processing your message...');

        try {
            const formData = new FormData();
            formData.append('voice', audioBlob, 'recording.webm');
            formData.append('Type', 'voice');

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('audio')) {
                // Handle audio response
                const responseBlob = await response.blob();
                const audioUrl = URL.createObjectURL(responseBlob);
                const audio = new Audio(audioUrl);

                setAiResponse('🎤 Playing voice response...');
                setIsSpeaking(true);

                audio.onended = () => {
                    setIsSpeaking(false);
                    URL.revokeObjectURL(audioUrl);
                    if (isCallActiveRef.current) {
                        setTimeout(() => startListening(), 500);
                    }
                };

                await audio.play();
            } else {
                // Handle text response
                const data = await response.json();
                let responseText = "I received your message.";

                if (data.output) responseText = data.output;
                else if (data.text) responseText = data.text;
                else if (data.message) responseText = data.message;
                else if (Array.isArray(data) && data[0]?.output) responseText = data[0].output;
                else if (typeof data === 'string') responseText = data;

                setAiResponse(responseText);
                setIsSpeaking(true);
                await speakText(responseText);
                setIsSpeaking(false);

                // Continue listening after response
                if (isCallActiveRef.current) {
                    setTimeout(() => startListening(), 500);
                }
            }

            setTranscript('');
        } catch (error) {
            console.error('Error sending to AI:', error);
            setAiResponse("Sorry, I'm having trouble connecting. Please try again.");
            setIsSpeaking(true);
            await speakText("Sorry, I'm having trouble connecting. Please try again.");
            setIsSpeaking(false);

            if (isCallActiveRef.current) {
                setTimeout(() => startListening(), 1000);
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Text to speech using Web Speech API
    const speakText = (text: string): Promise<void> => {
        return new Promise((resolve) => {
            speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.volume = 1;

            const setVoiceAndSpeak = () => {
                const voices = speechSynthesis.getVoices();
                if (voices.length > 0) {
                    const preferredVoice = voices.find(v =>
                        v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.lang.startsWith('en')
                    ) || voices[0];

                    if (preferredVoice) {
                        utterance.voice = preferredVoice;
                    }
                }

                utterance.onend = () => resolve();
                utterance.onerror = (e) => {
                    console.error('Speech error:', e);
                    resolve();
                };

                speechSynthesis.speak(utterance);
            };

            const voices = speechSynthesis.getVoices();
            if (voices.length > 0) {
                setVoiceAndSpeak();
            } else {
                speechSynthesis.onvoiceschanged = () => {
                    setVoiceAndSpeak();
                };
                setTimeout(() => {
                    if (speechSynthesis.speaking === false) {
                        setVoiceAndSpeak();
                    }
                }, 100);
            }
        });
    };

    // Toggle mute
    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (streamRef.current) {
            streamRef.current.getAudioTracks().forEach(track => {
                track.enabled = isMuted;
            });
        }
    };

    return (
        <div className="relative font-body">
            {/* Main Call Widget */}
            <motion.div
                className="relative rounded-3xl p-8 shadow-[0_15px_40px_rgba(45,106,79,0.06)] border overflow-hidden bg-white border-[#2D6A4F]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Background Elegant Glow Accent */}
                <div
                    className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${isCallActive ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-[#E8F5EE] to-[#C8E6DA]/20`}
                />

                {/* Animated Orb - Premium Inactive & Active Green States */}
                <div className="relative flex justify-center mb-8">
                    <motion.div
                        className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center cursor-pointer ${isCallActive
                            ? 'bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] shadow-lg shadow-[#2D6A4F]/30 border-2 border-emerald-400/30 text-white'
                            : 'bg-gradient-to-br from-[#E8F5EE] to-white border-2 border-[#2D6A4F]/25 text-[#2D6A4F] shadow-sm hover:border-[#2D6A4F]/50 hover:shadow-md transition-all duration-300'
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
                            <Phone className={`w-10 h-10 ${isCallActive ? 'text-white' : 'text-[#2D6A4F]'} transition-colors duration-300`} />
                        )}
                    </motion.div>
                </div>

                {/* Status Text */}
                <div className="text-center mb-6 space-y-2 relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/15 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        <span className="text-[10px] font-bold tracking-wider text-[#2D6A4F] uppercase font-mono">Agent Offline</span>
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
                            className="text-sm max-w-sm mx-auto leading-relaxed text-slate-700 font-body font-bold"
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
                            className="flex items-center gap-2.5 px-8 py-4 font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 cursor-pointer bg-[#2D6A4F] hover:bg-[#1B4332] text-white text-sm tracking-widest uppercase font-body"
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

                            {/* Manual Stop Listening */}
                            {isListening && (
                                <motion.button
                                    onClick={stopListening}
                                    className="p-4 rounded-full transition-all duration-300 bg-[#E8F5EE] border border-[#2D6A4F]/25 text-[#2D6A4F] hover:bg-[#2D6A4F]/10 shadow-sm"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <Volume2 className="w-5.5 h-5.5" />
                                </motion.button>
                            )}
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
