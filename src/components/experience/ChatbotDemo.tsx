import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Square } from 'lucide-react';
import {
    buildVoiceFormData,
    getTenantId,
    getWebsiteSessionId,
    playTtsStream,
    postChatStream,
} from '../../utils/frostyApi';

function getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
}

interface Message {
    type: 'user' | 'bot';
    content: string;
    image?: string;
}

const ChatbotDemo: React.FC = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { type: 'bot', content: "Hello! 👋 I'm your AI assistant from Frostrek.\nHow can I help you innovate today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const [sessionId] = useState<string>(() => getOrCreateSessionId());

    // Audio Recording State
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        if (messagesEndRef.current) {
            const parent = messagesEndRef.current.parentElement;
            if (parent) {
                parent.scrollTo({
                    top: parent.scrollHeight,
                    behavior: 'smooth'
                });
            }
        }
        requestAnimationFrame(() => {
            window.scrollTo(scrollX, scrollY);
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                handleSendMessage(undefined, audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Cannot access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSendMessage = async (textInput?: string, audioBlob?: Blob) => {
        if (!textInput && !audioBlob) return;

        setIsLoading(true);

        if (textInput) {
            setMessages(prev => [...prev, { type: 'user', content: textInput }]);
            setMessage('');
        } else if (audioBlob) {
            setMessages(prev => [...prev, { type: 'user', content: '🎤 Audio Message Sent' }]);
        }

        try {
            const tenantId = await getTenantId();
            const bridgedSession = getWebsiteSessionId(tenantId, sessionId);

            if (textInput) {
                setMessages(prev => [...prev, { type: 'bot', content: '' }]);

                await postChatStream(
                    {
                        message: textInput,
                        session_id: bridgedSession,
                        channel: 'website',
                    },
                    {
                        onToken: (token) => {
                            setMessages((prev) => {
                                const updated = [...prev];
                                const lastIdx = updated.length - 1;
                                updated[lastIdx] = {
                                    ...updated[lastIdx],
                                    content: updated[lastIdx].content + token,
                                };
                                return updated;
                            });
                        },
                        onFinal: (finalReply) => {
                            setMessages((prev) => {
                                const updated = [...prev];
                                const lastIdx = updated.length - 1;
                                updated[lastIdx] = {
                                    ...updated[lastIdx],
                                    content: finalReply,
                                };
                                return updated;
                            });
                        },
                    }
                );
            } else if (audioBlob) {
                setMessages(prev => [...prev, { type: 'bot', content: '' }]);

                const reply = await postChatStream(
                    buildVoiceFormData(audioBlob, bridgedSession),
                    {
                        onToken: (token) => {
                            setMessages((prev) => {
                                const updated = [...prev];
                                const lastIdx = updated.length - 1;
                                updated[lastIdx] = {
                                    ...updated[lastIdx],
                                    content: updated[lastIdx].content + token,
                                };
                                return updated;
                            });
                        },
                        onFinal: (finalReply) => {
                            setMessages((prev) => {
                                const updated = [...prev];
                                const lastIdx = updated.length - 1;
                                updated[lastIdx] = {
                                    ...updated[lastIdx],
                                    content: finalReply,
                                };
                                return updated;
                            });
                        },
                    }
                );

                if (reply) await playTtsStream(reply);
            } else {
                return;
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => {
                if (prev.length > 0 && prev[prev.length - 1].type === 'bot' && !prev[prev.length - 1].content) {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        content: "Sorry, I'm having trouble connecting right now."
                    };
                    return updated;
                }
                return [...prev, { type: 'bot', content: "Sorry, I'm having trouble connecting right now." }];
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        if (message.trim()) {
            handleSendMessage(message);
        }
        requestAnimationFrame(() => {
            window.scrollTo(scrollX, scrollY);
            inputRef.current?.focus({ preventScroll: true });
        });
    };

    return (
        <motion.div
            className="rounded-3xl shadow-[0_15px_40px_rgba(214,124,186,0.1)] border border-[#D67CBA]/20 overflow-hidden flex flex-col h-[500px] bg-white font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {/* Header - Pink Theme */}
            <div className="p-4 text-gray-900 flex items-center gap-3 bg-[#FDF4FA] border-b border-[#F2BAE4]">
                <div className="w-9 h-9 bg-white border border-[#F2BAE4] rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                    <img src="/chatbot.png" alt="Noddy" className="w-7 h-7 object-contain translate-y-1" loading="lazy" width={512} height={512} />
                </div>
                <div>
                    <h3 className="font-serif font-extrabold text-sm tracking-wide">Chat with Frosty</h3>
                    <p className="text-[10px] text-[#D67CBA] font-bold tracking-wider">AI-powered assistant</p>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={chatBodyRef}
                className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50/50"
                style={{ overscrollBehavior: 'contain' }}
                onWheel={(e) => {
                    const el = chatBodyRef.current;
                    if (!el) return;
                    const { scrollTop, scrollHeight, clientHeight } = el;
                    const atTop = scrollTop === 0 && e.deltaY < 0;
                    const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
                    if (!atTop && !atBottom) {
                        e.stopPropagation();
                    }
                }}
            >
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
                    >
                        {msg.type === 'user' && (
                            <div className="w-7.5 h-7.5 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border bg-gray-100 border-gray-200 text-gray-500">
                                <span className="text-[9px] font-bold">You</span>
                            </div>
                        )}
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap font-medium shadow-sm ${msg.type === 'user'
                            ? 'bg-gray-100 text-gray-700 rounded-tr-none'
                            : 'bg-[#FDF4FA] text-slate-800 border border-[#F2BAE4] rounded-tl-none'
                            }`}>
                            {msg.content ? (
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                            ) : (
                                msg.type === 'bot' && isLoading && (
                                    <div className="flex gap-1.5 h-5 items-center px-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D67CBA] animate-pulse" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D67CBA] animate-pulse" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D67CBA] animate-pulse" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                )
                            )}
                            {msg.image && (
                                <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                                    <img src={msg.image} alt="Generated" className="w-full h-auto" loading="lazy" width={512} height={512} />
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input - Perfectly readable text and inputs */}
            <div className="p-3 border-t bg-white border-gray-150">
                <form onSubmit={onSubmit} className="relative flex items-center gap-2">
                    <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`p-2.5 rounded-xl transition-all duration-200 border ${isRecording
                            ? 'bg-red-50 text-red-500 border-red-200 animate-pulse ring-2 ring-red-500/20'
                            : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                            }`}
                        title={isRecording ? "Stop Recording" : "Start Recording"}
                    >
                        {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={isRecording ? "Listening..." : "Type a message..."}
                        disabled={isRecording || isLoading}
                        className="w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm transition-all duration-200 outline-none disabled:opacity-60 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#D67CBA] focus:ring-2 focus:ring-[#D67CBA]/10 font-bold"
                        onFocus={(e) => {
                            e.preventDefault();
                            e.target.focus({ preventScroll: true });
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || isLoading || isRecording}
                        className="absolute right-2 p-1.5 rounded-lg transition-colors disabled:opacity-40 bg-[#D67CBA] text-white hover:bg-[#C060A0]"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default ChatbotDemo;
