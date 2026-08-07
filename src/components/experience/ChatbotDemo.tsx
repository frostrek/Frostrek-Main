import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { DEFAULT_BOT_CHANNEL } from '../../utils/botApi';
import {
    getTenantId,
    getWebsiteSessionId,
    postChatStream,
} from '../../utils/frostyApi';

function getOrCreateSessionId(): string {
    let sessionId = sessionStorage.getItem('experience_chat_session');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem('experience_chat_session', sessionId);
    }
    return sessionId;
}

const renderMessageWithLinks = (text: string, keyPrefix = 'lnk'): React.ReactNode[] => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
        if (part.match(urlRegex)) {
            return (
                <a
                    key={`${keyPrefix}-a-${i}`}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80 transition-opacity text-blue-600"
                    onClick={(e) => e.stopPropagation()}
                >
                    {part}
                </a>
            );
        }
        return <React.Fragment key={`${keyPrefix}-t-${i}`}>{part}</React.Fragment>;
    });
};

const renderInlineMarkdown = (text: string, keyPrefix: string): React.ReactNode[] => {
    const nodes: React.ReactNode[] = [];
    const boldRegex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let k = 0;

    while ((match = boldRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(...renderMessageWithLinks(text.slice(lastIndex, match.index), `${keyPrefix}-${k++}`));
        }
        nodes.push(<strong key={`${keyPrefix}-b-${k++}`} className="font-bold text-[#D67CBA]">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < text.length) {
        nodes.push(...renderMessageWithLinks(text.slice(lastIndex), `${keyPrefix}-${k++}`));
    }

    return nodes.length ? nodes : renderMessageWithLinks(text, keyPrefix);
};

const renderMarkdownMessage = (text: string): React.ReactNode => {
    const lines = text.split('\n');
    const blocks: React.ReactNode[] = [];
    const listItems: React.ReactNode[] = [];
    let key = 0;

    const flushList = () => {
        if (!listItems.length) return;
        blocks.push(
            <ul key={`ul-${key++}`} className="list-disc pl-5 my-2 space-y-1.5 ml-2">
                {listItems.splice(0, listItems.length)}
            </ul>
        );
    };

    for (const line of lines) {
        const trimmed = line.trim();
        const bulletMatch = trimmed.match(/^[*\-•]\s+(.*)$/);

        if (bulletMatch) {
            listItems.push(
                <li key={`li-${key++}`}>{renderInlineMarkdown(bulletMatch[1], `li-${key}`)}</li>
            );
            continue;
        }

        flushList();

        if (!trimmed) {
            if (blocks.length) blocks.push(<div key={`sp-${key++}`} className="h-2" />);
            continue;
        }

        blocks.push(
            <div key={`p-${key++}`} className={blocks.length ? 'mt-2 first:mt-0' : ''}>
                {renderInlineMarkdown(line, `p-${key}`)}
            </div>
        );
    }

    flushList();
    return blocks.length ? <>{blocks}</> : null;
};

interface Message {
    type: 'user' | 'bot';
    content: string;
}

const ChatbotDemo: React.FC = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { type: 'bot', content: "Hello! 👋 I'm Frosty, Frostrek's AI assistant.\nHow can I help you innovate today?" },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId] = useState<string>(() => getOrCreateSessionId());

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        if (messagesEndRef.current?.parentElement) {
            messagesEndRef.current.parentElement.scrollTo({
                top: messagesEndRef.current.parentElement.scrollHeight,
                behavior: 'smooth',
            });
        }
        requestAnimationFrame(() => window.scrollTo(scrollX, scrollY));
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (textInput: string) => {
        if (!textInput.trim() || isLoading) return;

        setIsLoading(true);
        setMessages((prev) => [...prev, { type: 'user', content: textInput }]);
        setMessage('');
        setMessages((prev) => [...prev, { type: 'bot', content: '' }]);

        try {
            const tenantId = await getTenantId();
            const bridgedSession = getWebsiteSessionId(tenantId, sessionId);

            await postChatStream(
                {
                    message: textInput,
                    session_id: bridgedSession,
                    channel: DEFAULT_BOT_CHANNEL,
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
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => {
                if (prev.length > 0 && prev[prev.length - 1].type === 'bot' && !prev[prev.length - 1].content) {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        content: "Sorry, I'm having trouble connecting right now.",
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
            void handleSendMessage(message);
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
            <div className="p-4 text-gray-900 flex items-center gap-3 bg-[#FDF4FA] border-b border-[#F2BAE4]">
                <div className="w-9 h-9 bg-white border border-[#F2BAE4] rounded-full flex items-center justify-center shadow-sm overflow-hidden">
                    <img src="/chatbot.webp" alt="AI assistant" className="w-7 h-7 object-contain translate-y-1" loading="lazy" width={512} height={512} />
                </div>
                <div>
                    <h3 className="font-serif font-extrabold text-sm tracking-wide">Chat with Frosty</h3>
                    <p className="text-[10px] text-[#D67CBA] font-bold tracking-wider">AI-powered assistant</p>
                </div>
            </div>

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
                    if (!atTop && !atBottom) e.stopPropagation();
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
                        <div
                            className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap font-medium shadow-sm ${
                                msg.type === 'user'
                                    ? 'bg-gray-100 text-gray-700 rounded-tr-none'
                                    : 'bg-[#FDF4FA] text-slate-800 border border-[#F2BAE4] rounded-tl-none'
                            }`}
                        >
                            {msg.content ? (
                                <div className="whitespace-pre-wrap">
                                    {msg.type === 'user' ? (
                                        msg.content.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                                            part.match(/https?:\/\/[^\s]+/) ? (
                                                <a
                                                    key={i}
                                                    href={part}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="underline hover:opacity-80 break-all text-blue-600"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    {part}
                                                </a>
                                            ) : (
                                                part
                                            )
                                        )
                                    ) : (
                                        renderMarkdownMessage(msg.content)
                                    )}
                                </div>
                            ) : (
                                msg.type === 'bot' &&
                                isLoading && (
                                    <div className="flex gap-1.5 h-5 items-center px-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D67CBA] animate-pulse" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D67CBA] animate-pulse anim-delay-200" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#D67CBA] animate-pulse anim-delay-400" />
                                    </div>
                                )
                            )}
                        </div>
                    </motion.div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t bg-white border-gray-150">
                <form onSubmit={onSubmit} className="relative flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isLoading}
                        className="w-full pl-3 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm transition-all duration-200 outline-none disabled:opacity-60 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-[#D67CBA] focus:ring-2 focus:ring-[#D67CBA]/10 font-bold"
                        onFocus={(e) => {
                            e.preventDefault();
                            e.target.focus({ preventScroll: true });
                        }}
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || isLoading}
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
