import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Square } from 'lucide-react';

const WEBHOOK_URL = 'https://n8n.frostrek.com/webhook/cac2fab9-d171-4d67-8587-9ac8d834f436';

// --- ID Helpers ---
function getOrCreateUserId(): string {
    let userId = localStorage.getItem('user_id');
    if (!userId) {
        userId = 'UID-' + crypto.randomUUID();
        localStorage.setItem('user_id', userId);
    }
    return userId;
}

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

    // Persistent IDs
    const [userId] = useState<string>(() => getOrCreateUserId());
    const [sessionId] = useState<string>(() => getOrCreateSessionId());
    const [conversationId] = useState<string>(() => crypto.randomUUID());

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
            const messageId = crypto.randomUUID();
            let response;

            if (textInput) {
                // Add an empty bot message placeholder for streaming
                setMessages(prev => [...prev, { type: 'bot', content: '' }]);

                const response = await fetch('https://bot.frostrek.com/bot-api/chat/stream', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-api-key': 'frsty_dbd5f199b86c457db63723afcf9a523b'
                    },
                    body: JSON.stringify({
                        message: textInput,
                        session_id: `default--website--${sessionId}`,
                        channel: 'website'
                    }),
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const reader = response.body!.getReader();
                const decoder = new TextDecoder("utf-8");
                let buffer = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    buffer += decoder.decode(value, { stream: true });
                    const parts = buffer.split("\n\n");
                    buffer = parts.pop() || "";

                    for (const part of parts) {
                        if (part.startsWith("data: ")) {
                            const jsonStr = part.replace("data: ", "").trim();
                            if (!jsonStr) continue;

                            try {
                                const data = JSON.parse(jsonStr);
                                
                                if (data.token) {
                                    setMessages((prev) => {
                                        const updated = [...prev];
                                        const lastIdx = updated.length - 1;
                                        updated[lastIdx] = {
                                            ...updated[lastIdx],
                                            content: updated[lastIdx].content + data.token,
                                        };
                                        return updated;
                                    });
                                }

                                if (data.final && data.final.reply) {
                                    setMessages((prev) => {
                                        const updated = [...prev];
                                        const lastIdx = updated.length - 1;
                                        updated[lastIdx] = {
                                            ...updated[lastIdx],
                                            content: data.final.reply,
                                        };
                                        return updated;
                                    });
                                }
                            } catch (e) {
                                // ignore
                            }
                        }
                    }
                }
            } else if (audioBlob) {
                const formData = new FormData();
                formData.append('audio', audioBlob, 'voice-message.webm');
                formData.append('user_id', userId);
                formData.append('session_id', sessionId);
                formData.append('conversation_id', conversationId);
                formData.append('message_id', messageId);
                formData.append('message', '[Voice message]');
                formData.append('type', 'voice');
                response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    body: formData,
                });
            } else {
                return;
            }

            if (response && !response.ok) throw new Error('Network response was not ok');

            if (response) {
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('audio')) {
                    const audioBlob = await response.blob();
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);

                    setMessages(prev => [...prev, { type: 'bot', content: '🎤 (Playing Audio Response...)' }]);
                    audio.play().catch(e => console.error("Audio play failed", e));
                } else if (contentType && contentType.includes('image')) {
                    const imageBlob = await response.blob();
                    const imageUrl = URL.createObjectURL(imageBlob);
                    setMessages(prev => [...prev, { type: 'bot', content: 'Here is the generated image:', image: imageUrl }]);
                } else {
                    const data = await response.json();

                    let botText = "I received your message.";
                    if (data.reply) botText = data.reply;
                    else if (data.output) botText = data.output;
                    else if (data.text) botText = data.text;
                    else if (data.message) botText = data.message;
                    else if (Array.isArray(data) && data[0]?.reply) botText = data[0].reply;
                    else if (Array.isArray(data) && data[0]?.output) botText = data[0].output;
                    else if (typeof data === 'string') botText = data;

                    if (data.audioUrl) {
                        const audio = new Audio(data.audioUrl);
                        audio.play().catch(e => console.error("Audio play failed", e));
                        botText += " 🔊";
                    }

                    setMessages(prev => [...prev, { type: 'bot', content: botText }]);
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { type: 'bot', content: "Sorry, I'm having trouble connecting right now." }]);
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
            className="rounded-3xl shadow-[0_15px_40px_rgba(45,106,79,0.06)] border border-[#2D6A4F]/10 overflow-hidden flex flex-col h-[500px] bg-white font-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {/* Header - Vibrant Brand Green */}
            <div className="p-4 text-white flex items-center gap-3 bg-gradient-to-r from-[#2D6A4F] to-[#1B4332]">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-inner overflow-hidden">
                    <img src="/noddy.png" alt="Noddy" className="w-7 h-7 object-contain translate-y-1" />
                </div>
                <div>
                    <h3 className="font-serif font-extrabold text-sm tracking-wide">Chat with Frosty</h3>
                    <p className="text-[10px] text-[#E8F5EE] font-medium tracking-wider">AI-powered assistant</p>
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
                    e.stopPropagation();
                }}
            >
                {messages.map((msg, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-2 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
                    >
                        <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border ${
                            msg.type === 'user'
                                ? 'bg-[#E8F5EE] border-[#2D6A4F]/25 text-[#2D6A4F]'
                                : 'bg-white border-gray-200 text-gray-500'
                        }`}>
                            {msg.type === 'user' ? (
                                <span className="text-[9px] font-bold">You</span>
                            ) : (
                                <img src="/noddy.png" alt="Bot" className="w-5 h-5 object-contain translate-y-[2px]" />
                            )}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap font-medium shadow-sm ${
                            msg.type === 'user'
                                ? 'bg-[#2D6A4F] text-white rounded-tr-none'
                                : 'bg-white text-slate-800 border border-gray-100 rounded-tl-none'
                        }`}>
                            {msg.content ? (
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                            ) : (
                                msg.type === 'bot' && isLoading && (
                                    <div className="flex gap-1.5 h-5 items-center px-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                )
                            )}
                            {msg.image && (
                                <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                                    <img src={msg.image} alt="Generated" className="w-full h-auto" />
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
                        className={`p-2.5 rounded-xl transition-all duration-200 border ${
                            isRecording
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
                        className="w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm transition-all duration-200 outline-none disabled:opacity-60 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 font-bold"
                        onFocus={(e) => {
                            e.preventDefault();
                            e.target.focus({ preventScroll: true });
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || isLoading || isRecording}
                        className="absolute right-2 p-1.5 rounded-lg transition-colors disabled:opacity-40 bg-[#2D6A4F] text-white hover:bg-[#1B4332]"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default ChatbotDemo;
