import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X, Send, Mic, Square, Paperclip, Trash2, Minus } from 'lucide-react';
import {
    buildVoiceFormData,
    getTenantId,
    getWebsiteSessionId,
    playTtsStream,
    postChatStream,
} from '../../utils/frostyApi';

// Legacy webhook for image uploads only
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

// Color Scheme - Frostrek Brand Theme
const COLORS = {
    primary: '#2D6A4F', // Brand Teal
    primaryDark: '#1B4332',
    primaryLight: '#E8F5EE',
    accent: '#2D6A4F',
    accentLight: '#52B788',
    background: '#FAFCFB', // Light, clean background
    text: '#0F172A', // Dark slate for readability
    textLight: '#64748B', // Muted slate
    white: '#FFFFFF',
    border: '#E2E8F0',
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string, image?: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Persistent IDs
    const [userId] = useState<string>(() => getOrCreateUserId());
    const [sessionId] = useState<string>(() => getOrCreateSessionId());
    const [conversationId, setConversationId] = useState<string>(() => crypto.randomUUID());

    // Audio Recording State
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const dragControls = useDragControls();




    const scrollToBottom = () => {
        // Save page scroll position first
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
        // Restore page scroll position to prevent page jump
        requestAnimationFrame(() => {
            window.scrollTo(scrollX, scrollY);
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);


    const toggleChat = () => setIsOpen(!isOpen);

    const clearChat = () => {
        setMessages([]);
        setMessage('');
        setSelectedFile(null);
        setConversationId(crypto.randomUUID()); // New conversation

        setTimeout(() => {
            scrollToBottom();
        }, 100);
    };


    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // 20MB size limit
        const MAX_SIZE = 20 * 1024 * 1024; // 20MB in bytes

        if (file.size > MAX_SIZE) {
            setMessages(prev => [
                ...prev,
                {
                    type: 'bot',
                    content: `⚠️ File too large. Maximum allowed size is 20MB. Your file size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
                }
            ]);

            // Reset input so user can reselect
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            return;
        }

        setSelectedFile(file);

        setMessages(prev => [
            ...prev,
            { type: 'user', content: `📎 File selected: ${file.name}` }
        ]);
    };


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
        if (!textInput && !audioBlob && !selectedFile) return;

        setIsLoading(true);

        if (textInput) {
            setMessages(prev => [...prev, { type: 'user', content: textInput }]);
            setMessage('');
        } else if (audioBlob) {
            setMessages(prev => [...prev, { type: 'user', content: '🎤 Audio Message Sent' }]);
        }

        try {
            let response;
            const messageId = crypto.randomUUID();

            if (audioBlob) {
                const tenantId = await getTenantId();
                const bridgedSession = getWebsiteSessionId(tenantId, sessionId);
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
                return;
            } else if (selectedFile) {
                // Image: multipart/form-data
                const formData = new FormData();
                formData.append('image', selectedFile);
                formData.append('user_id', userId);
                formData.append('session_id', sessionId);
                formData.append('conversation_id', conversationId);
                formData.append('message_id', messageId);
                formData.append('message', textInput || '[Image]');
                formData.append('type', 'image');

                response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    body: formData,
                });
            } else {
                const tenantId = await getTenantId();
                setMessages(prev => [...prev, { type: 'bot', content: '' }]);

                await postChatStream(
                    {
                        message: textInput || '',
                        session_id: getWebsiteSessionId(tenantId, sessionId),
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
                return;
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }
            // hello 
            const contentType = response.headers.get('content-type') || '';

            if (contentType.includes('audio/')) {
                const audioBlob = await response.blob();
                const audioUrl = URL.createObjectURL(audioBlob);

                setMessages(prev => [
                    ...prev,
                    { type: 'bot', content: '🔊 Playing voice response…' }
                ]);

                // const audio = new Audio()  ;
                // audio.src = audioUrl;
                // audio.preload = 'auto';

                // audio.oncanplaythrough = () => {
                //     audio.play().catch(err => {
                //         console.error('Autoplay blocked:', err);
                //     });
                // };

                // audio.onerror = (e) => {
                //     console.error('Audio playback error', e);
                // };

                const audio = new Audio(audioUrl);
                audio.preload = 'auto';

                try {
                    await audio.play(); // user already interacted → autoplay allowed
                } catch (err) {
                    console.error('Audio play failed:', err);
                }

                return;
            } else if (contentType.includes('image/')) {
                const imageBlob = await response.blob();
                const imageUrl = URL.createObjectURL(imageBlob);

                setMessages(prev => [
                    ...prev,
                    { type: 'bot', content: 'Here is the generated image:', image: imageUrl }
                ]);

                return;
            }
            else {
                const rawText = await response.text();
                console.log('Raw Server Response:', rawText);

                if (!rawText) {
                    setMessages(prev => [
                        ...prev,
                        { type: 'bot', content: textInput ? '✅ Message received.' : '✅ Voice received. Processing…' }
                    ]);
                    return;
                }

                let data: any;

                try {
                    data = JSON.parse(rawText);
                    console.log('=== FULL PARSED RESPONSE ===');
                    console.log('Type:', typeof data);
                    console.log('Is Array:', Array.isArray(data));
                    console.log('Data:', JSON.stringify(data, null, 2));
                    if (Array.isArray(data)) {
                        console.log('Array Length:', data.length);
                        console.log('First Item:', data[0]);
                    }
                    console.log('Keys:', Object.keys(data));
                    console.log('===========================');
                } catch {
                    console.log('Could not parse JSON, displaying raw text');
                    setMessages(prev => [
                        ...prev,
                        { type: 'bot', content: rawText }
                    ]);
                    return;
                }

                // Try to extract the bot response from various possible structures
                let botText: string | undefined;

                // Handle array response (n8n often returns arrays)
                if (Array.isArray(data)) {
                    const firstItem = data[0];
                    if (firstItem) {
                        console.log('First array item keys:', Object.keys(firstItem));
                        botText =
                            firstItem.reply ||
                            firstItem.output ||
                            firstItem.text ||
                            firstItem.message ||
                            firstItem.response ||
                            firstItem.content ||
                            (firstItem.body && (firstItem.body.message || firstItem.body.output || firstItem.body.text)) ||
                            (typeof firstItem === 'string' ? firstItem : undefined);
                    }
                } else {
                    // Handle object response
                    botText =
                        data.reply ||
                        data.output ||
                        data.text ||
                        data.message ||
                        data.response ||
                        data.content ||
                        (data.body && (data.body.message || data.body.output || data.body.text));
                }

                // Fallback to raw JSON if nothing found
                if (!botText) {
                    console.warn('Could not extract text from response, showing raw JSON');
                    botText = JSON.stringify(data, null, 2);
                }

                console.log('Extracted botText:', botText);

                setMessages(prev => [
                    ...prev,
                    { type: 'bot', content: botText }
                ]);
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
            setSelectedFile(null);
        }
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Save page scroll position before any state changes
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        if (message.trim() || selectedFile) {
            handleSendMessage(message);
        }
        // Restore page scroll position to prevent page jump
        requestAnimationFrame(() => {
            window.scrollTo(scrollX, scrollY);
        });
    };

    return (
        <>
            <style>{`
                .ai-copilot-chat {
                    touch-action: pan-y !important;
                    pointer-events: auto !important;
                    font-family: 'Raleway', sans-serif;
                }
                .ai-copilot-button:hover {
                    /* Removed background-color to keep it transparent */
                }
                .ai-copilot-button-style {
                    font-family: 'Raleway', sans-serif;
                }
                .ai-copilot-suggestion {
                    background-color: white;
                    border: 1.5px solid ${COLORS.primary}20;
                    color: ${COLORS.primary};
                    border-radius: 12px;
                    padding: 8px 16px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    font-family: 'Raleway', sans-serif;
                }
                .ai-copilot-suggestion:hover {
                    background-color: ${COLORS.primary};
                    color: #FFFFFF;
                    border-color: ${COLORS.primary};
                    transform: translateY(-2px);
                    shadow: 0 4px 12px ${COLORS.primary}20;
                }
                /* Custom Scrollbar Styling */
                .ai-copilot-chat::-webkit-scrollbar {
                    width: 6px;
                }
                .ai-copilot-chat::-webkit-scrollbar-track {
                    background: transparent;
                }
                .ai-copilot-chat::-webkit-scrollbar-thumb {
                    background: ${COLORS.border};
                    border-radius: 10px;
                }
                .ai-copilot-chat::-webkit-scrollbar-thumb:hover {
                    background: ${COLORS.primary}40;
                }
                .ai-copilot-chat {
                    scrollbar-color: ${COLORS.border} transparent;
                    scrollbar-width: thin;
                }
            `}</style>



            {/* Trigger Button - Always Visible */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    right: 24
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    toggleChat();
                }}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    zIndex: 10002,
                    backgroundColor: isOpen ? '#f0f0f0' : 'transparent',
                }}
                className={`rounded-full transition-all duration-300 ai-copilot-button group ${isOpen ? 'p-4 rotate-90 shadow-2xl' : 'p-0'}`}
            >
                {isOpen ? (
                    <X className="w-6 h-6 text-[#2D6A4F] transition-colors duration-300" />
                ) : (
                    <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] relative flex items-center justify-center bg-transparent transition-all hover:scale-105">
                        <img src="/chatbot.png" alt="Chat" className="w-full h-full object-contain" loading="lazy" width={512} height={512} />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute top-0 right-0 w-4 h-4 sm:w-4 sm:h-4 bg-red-500 rounded-full border-2 border-white z-10"
                        />
                    </div>
                )}
            </motion.button>

            {/* Chat Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleChat}
                            className="fixed inset-0 bg-black/40 z-[9998] backdrop-blur-sm md:hidden"
                        />

                        {/* Draggable Sidebar Panel */}
                        <motion.div
                            ref={chatContainerRef}
                            drag
                            dragControls={dragControls}
                            dragElastic={0.15}
                            dragMomentum={false}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed bottom-[72px] right-2 sm:right-4 md:right-6 
                                        w-[calc(100vw-16px)] sm:w-[380px] max-w-[95vw] h-[calc(100vh-90px)] sm:h-[600px] max-h-[80vh] 
                                        rounded-2xl shadow-2xl border border-gray-200
                                        overflow-hidden flex flex-col z-[9999]"
                            style={{ backgroundColor: COLORS.white, overscrollBehavior: 'contain' }}
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                        >
                            {/* Header - Draggable Area */}
                            <div
                                className="p-4 flex items-center justify-between text-slate-900 bg-[#BAE6FD] border-b border-[#7DD3FC] rounded-t-2xl cursor-grab active:cursor-grabbing select-none touch-none relative"
                                onPointerDown={(e) => dragControls.start(e)}
                            >
                                <div className="flex items-center gap-3 pointer-events-none">
                                    <div className="w-12 h-12 bg-transparent flex items-center justify-center overflow-hidden">
                                        <img src="/chatbot.png" alt="chatbot" className="w-10 h-10 object-contain translate-y-1" loading="lazy" width={512} height={512} />
                                    </div>
                                    <div>
                                        <h3 className="font-serif font-bold text-base tracking-tight">Frostrek Assistant</h3>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-[#0EA5E9] font-body">Online • Ready to help</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pointer-events-auto">

                                    {/* Show Clear Chat Button ONLY if chat exists */}
                                    <AnimatePresence>
                                        {messages.length > 0 && (
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                onClick={clearChat}
                                                title="Clear Chat"
                                                className="p-1.5 rounded-lg transition-all duration-200 
                           hover:bg-red-50 group"
                                            >
                                                <Trash2 className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition" />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>

                                    {/* Close Chat Button */}
                                    <button
                                        onClick={toggleChat}
                                        title="Close Chat"
                                        className="p-1.5 rounded-lg transition-all duration-200 hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                                    >
                                        <Minus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            {/* Chat Body (Messages) */}
                            <div
                                className="ai-copilot-chat flex-1 overflow-y-auto p-6 flex flex-col gap-4"
                                style={{
                                    backgroundColor: COLORS.background,
                                    overscrollBehavior: 'contain',
                                    touchAction: 'pan-y',
                                    pointerEvents: 'auto'
                                }}

                                onWheel={(e) => {
                                    const el = messagesEndRef.current?.parentElement;
                                    if (!el) return;
                                    const { scrollTop, scrollHeight, clientHeight } = el;
                                    const atTop = scrollTop === 0 && e.deltaY < 0;
                                    const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
                                    if (!atTop && !atBottom) {
                                        e.stopPropagation();
                                    }
                                }}

                                onTouchMove={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <AnimatePresence>
                                    {messages.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="text-center px-6 py-6"
                                        >
                                            <div className="w-20 h-20 bg-transparent flex items-center justify-center mx-auto mb-6 overflow-hidden">
                                                <img src="/chatbot.png" alt="Frosty" className="w-16 h-16 object-contain translate-y-2" loading="lazy" width={512} height={512} />
                                            </div>
                                            <h4 className="text-2xl font-serif font-black text-gray-950">
                                                Hi, I'm Frosty 👋
                                            </h4>
                                            <p className="text-sm mt-3 text-slate-500 font-medium font-body leading-relaxed">
                                                Ask me anything about your business, support, or innovation.
                                            </p>

                                            <div className="flex flex-wrap justify-center gap-2 mt-4">
                                                <button className="ai-copilot-suggestion">💡 Get ideas</button>
                                                <button className="ai-copilot-suggestion">📊 Analytics</button>
                                                <button className="ai-copilot-suggestion">🛠 Support</button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>


                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : ''}`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden ${msg.type === 'user' ? 'text-xs font-bold' : ''}`}
                                            style={{
                                                backgroundColor: msg.type === 'user' ? '#e8e8e8' : COLORS.accent + '20',
                                                color: msg.type === 'user' ? COLORS.text : COLORS.accent,
                                            }}
                                        >
                                            {msg.type === 'user' ? (
                                                <span>You</span>
                                            ) : (
                                                <img src="/noddy.png" alt="Bot" className="w-6 h-6 object-contain translate-y-[2px]" loading="lazy" width={512} height={512} />
                                            )}
                                        </div>
                                        <div
                                            className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap font-medium ${msg.type === 'user' ? 'text-white rounded-br-none' : 'text-slate-700 rounded-bl-none border border-[#2D6A4F]/10 bg-white'}`}
                                            style={{
                                                backgroundColor: msg.type === 'user' ? COLORS.primary : undefined,
                                            }}
                                        >
                                            {msg.content ? (
                                                <div className="whitespace-pre-wrap">
                                                    {msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
                                                        if (part.match(/https?:\/\/[^\s]+/)) {
                                                            return (
                                                                <a
                                                                    key={i}
                                                                    href={part}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className={`underline hover:opacity-80 break-all ${msg.type === 'user' ? 'text-white' : 'text-blue-600'}`}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                >
                                                                    {part}
                                                                </a>
                                                            );
                                                        }
                                                        return part;
                                                    })}
                                                </div>
                                            ) : (
                                                msg.type === 'bot' && isLoading && (
                                                    <div className="flex gap-1 h-5 items-center">
                                                        <span className="typing-dot"></span>
                                                        <span className="typing-dot"></span>
                                                        <span className="typing-dot"></span>
                                                    </div>
                                                )
                                            )}
                                            {msg.image && (
                                                <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                                                    <img src={msg.image} alt="Generated" className="w-full h-auto" loading="lazy" width={512} height={512} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Typing Indicator Style */}
                                <style>{`
                                        @keyframes blink {
                                            0% { opacity: 0.2; }
                                            20% { opacity: 1; }
                                            100% { opacity: 0.2; }
                                        }
                                        .typing-dot {
                                            animation: blink 1.4s infinite both;
                                            height: 6px;
                                            width: 6px;
                                            border-radius: 50%;
                                            background-color: ${COLORS.primary};
                                            display: inline-block;
                                        }
                                        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                                        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
                                    `}</style>

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Footer (Input) */}
                            <div className="p-3 sm:p-4 border-t" style={{ backgroundColor: COLORS.white, borderColor: '#334155' }}>
                                {selectedFile && (
                                    <div className="text-xs mb-2 flex items-center gap-2" style={{ color: COLORS.textLight }}>
                                        <span className="truncate">📎 {selectedFile.name}</span>
                                        <button
                                            onClick={() => setSelectedFile(null)}
                                            className="text-red-500 text-xs hover:underline flex-shrink-0"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}

                                <form onSubmit={onSubmit} className="flex items-center gap-1.5 sm:gap-2 rounded-2xl px-2 sm:px-4 py-3 bg-[#FAFCFB] border border-gray-200 focus-within:border-[#2D6A4F] focus-within:ring-4 focus-within:ring-[#E8F5EE]/50 transition-all">
                                    {/* Hidden File Input */}
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />

                                    {/* Upload Button */}
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-1.5 sm:p-2 rounded-lg transition-all duration-200 flex-shrink-0"
                                        style={{
                                            backgroundColor: COLORS.primary + '20',
                                            color: COLORS.primary,
                                        }}
                                        title="Upload file"
                                    >
                                        <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>

                                    {/* Mic Button */}
                                    <button
                                        type="button"
                                        onClick={isRecording ? stopRecording : startRecording}
                                        className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${isRecording ? 'animate-pulse' : ''}`}
                                        style={{
                                            backgroundColor: isRecording ? '#ff4444' : COLORS.primary + '20',
                                            color: isRecording ? 'white' : COLORS.primary,
                                        }}
                                        title={isRecording ? "Stop Recording" : "Start Recording"}
                                    >
                                        {isRecording ? <Square className="w-4 h-4 sm:w-5 sm:h-5 fill-current" /> : <Mic className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>

                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={isRecording ? "Listening..." : "Type a message..."}
                                        disabled={isRecording || isLoading}
                                        className="flex-1 min-w-0 bg-transparent outline-none text-sm px-1.5 sm:px-2"
                                        style={{ color: COLORS.text }}
                                        onFocus={(e) => {
                                            // Prevent browser from scrolling the page to keep input visible
                                            e.preventDefault();
                                            e.target.focus({ preventScroll: true });
                                        }}
                                    />

                                    <button
                                        type="submit"
                                        disabled={!message.trim() || isLoading || isRecording}
                                        className="w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-40"
                                        style={{ backgroundColor: COLORS.primary }}
                                    >
                                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    </button>
                                </form>

                                <div className="text-center mt-1.5">
                                    <p className="text-[9px] sm:text-[10px]" style={{ color: COLORS.textLight }}>Powered by Frostrek AI</p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
