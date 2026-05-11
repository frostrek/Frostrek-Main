import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MoreVertical, Plus, Smile, Mic, Send, Check, CheckCheck } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    time: string;
    status?: 'sent' | 'delivered' | 'read';
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        text: "Hello! We're Frosty, the AI WhatsApp Bot. I can answer questions regarding Frostrek. Try asking me:\n• Who is the founder of Frostrek?\n• What is the pricing?\n• I want to schedule a meeting.",
        sender: 'bot',
        time: '1:55 pm'
    }
];

const WhatsappBotDemo = () => {
    const { theme } = useTheme();
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // WhatsApp Dark Mode Colors
    const isDark = theme === 'dark';
    const bgApp = isDark ? '#111b21' : '#f0f2f5';
    const bgHeader = isDark ? '#202c33' : '#f0f2f5';
    const bgChat = isDark ? '#0b141a' : '#efeae2';
    const bgMsgReceived = isDark ? '#202c33' : '#ffffff';
    const bgMsgSent = isDark ? '#005c4b' : '#d9fdd3';
    const textMain = isDark ? '#e9edef' : '#111b21';
    const textSecondary = isDark ? '#8696a0' : '#667781';
    const borderDivider = isDark ? '#222d34' : '#d1d7db';

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            time: timeString,
            status: 'sent'
        };

        setMessages((prev) => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // Update status mock
        setTimeout(() => {
            setMessages((prev) => 
                prev.map(msg => msg.id === newUserMsg.id ? { ...msg, status: 'delivered' } : msg)
            );
        }, 800);

        setTimeout(() => {
            setMessages((prev) => 
                prev.map(msg => msg.id === newUserMsg.id ? { ...msg, status: 'read' } : msg)
            );
            
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getMockResponse(inputValue),
                sender: 'bot',
                time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase()
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 2000);
    };

    const getMockResponse = (input: string) => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('founder')) return 'Frostrek is an intelligent systems and agentic AI company founded by visionaries aiming to revolutionize enterprise automation. We design and deploy enterprise-grade AI solutions.';
        if (lowerInput.includes('price') || lowerInput.includes('pricing') || lowerInput.includes('cost')) return 'Our pricing is tailored to your specific enterprise requirements. We offer flexible plans depending on the scale of deployment. We would be happy to discuss this in a meeting.';
        if (lowerInput.includes('meeting') || lowerInput.includes('schedule')) return 'Certainly! I can help with that. What day and time would work best for you to connect with our team?';
        return "I'm sorry, I'm just a demo bot designed to answer a few specific questions. Try asking about our founder, pricing, or scheduling a meeting!";
    };

    const StatusIcon = ({ status }: { status: Message['status'] }) => {
        if (!status) return null;
        if (status === 'sent') return <Check className="w-3.5 h-3.5 text-gray-400" />;
        if (status === 'delivered') return <CheckCheck className="w-3.5 h-3.5 text-gray-400" />;
        return <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />;
    };

    return (
        <div style={{ backgroundColor: bgApp, borderColor: borderDivider }} className="relative w-full h-[500px] border rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans">
            {/* Header */}
            <div style={{ backgroundColor: bgHeader }} className="h-16 px-4 flex items-center justify-between shrink-0 z-10 shadow-sm relative">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center relative">
                        <img src="/CompanyOffice.webp" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <span style={{ color: textMain }} className="font-semibold text-[15px] leading-tight">+1 (757) 472-2491</span>
                        <span style={{ color: textSecondary }} className="text-[12px] leading-tight">click here for contact info</span>
                    </div>
                </div>
                <div style={{ color: textSecondary }} className="flex items-center gap-4">
                    <Search className="w-5 h-5 cursor-pointer" />
                    <MoreVertical className="w-5 h-5 cursor-pointer" />
                </div>
            </div>

            {/* Chat Area */}
            <div 
                ref={chatContainerRef}
                style={{ backgroundColor: bgChat }} 
                className="flex-1 overflow-y-auto overscroll-y-contain min-h-0 relative scroll-smooth [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-thumb]:bg-gray-400/30 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
                tabIndex={0}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")', backgroundRepeat: 'repeat' }}></div>

                {/* Inner flex layout */}
                <div className="p-4 flex flex-col gap-2 min-h-full">

                <div className="flex justify-center mb-4">
                    <div style={{ backgroundColor: isDark ? '#182229' : '#fff' }} className="px-3 py-1 rounded-md text-xs shadow-sm">
                        <span style={{ color: textSecondary }}>Today</span>
                    </div>
                </div>

                <div className="flex justify-center mb-4">
                    <div style={{ backgroundColor: isDark ? '#1c2833' : '#fff9c4', color: isDark ? '#f4b828' : '#8a6d3b' }} className="px-3 py-2 rounded-lg text-[12px] text-center max-w-[85%] shadow-sm flex flex-col items-center">
                        <div>This business uses a secure service from Meta to manage this chat. Click to learn more.</div>
                    </div>
                </div>

                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex w-full mb-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div 
                                style={{ 
                                    backgroundColor: msg.sender === 'user' ? bgMsgSent : bgMsgReceived,
                                    color: textMain,
                                    maxWidth: '85%',
                                    borderTopLeftRadius: msg.sender === 'user' ? '8px' : '0px',
                                    borderTopRightRadius: msg.sender === 'user' ? '0px' : '8px',
                                    borderBottomLeftRadius: '8px',
                                    borderBottomRightRadius: '8px',
                                }} 
                                className="px-2 pt-1.5 pb-1 text-[14.5px] leading-relaxed relative shadow-sm group"
                            >
                                <div className="whitespace-pre-line break-words text-left">
                                    {msg.text}
                                    <span className="inline-block w-[65px] h-4"></span>
                                </div>
                                <div style={{ color: textSecondary }} className="absolute bottom-1 right-2 text-[11px] flex items-center gap-1 h-[15px]">
                                    {msg.time}
                                    {msg.sender === 'user' && <StatusIcon status={msg.status} />}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex w-full mb-1 justify-start"
                        >
                            <div style={{ backgroundColor: bgMsgReceived, color: textMain, borderTopLeftRadius: '0px', borderRadius: '0 8px 8px 8px' }} className="px-3 py-2 text-[14.5px] shadow-sm flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                </div>
            </div>

            {/* Input Area */}
            <div style={{ backgroundColor: bgHeader }} className="min-h-[60px] px-3 py-2 flex items-end gap-2 shrink-0 z-10 shadow-[0_-1px_2px_rgba(0,0,0,0.05)]">
                <div className="flex pb-2 px-1">
                    <Plus style={{ color: textSecondary }} className="w-6 h-6 cursor-pointer" />
                </div>
                <div style={{ backgroundColor: bgApp }} className="flex-1 rounded-lg flex items-center px-3 py-2 min-h-[40px] max-h-[100px]">
                    <Smile style={{ color: textSecondary }} className="w-6 h-6 mr-3 shrink-0 cursor-pointer" />
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message"
                        style={{ color: textMain }}
                        className="w-full bg-transparent outline-none text-[15px]"
                    />
                </div>
                <div className="flex pb-2 pl-1 pr-1">
                    {inputValue.trim() ? (
                        <div onClick={handleSend} className="cursor-pointer">
                            <Send style={{ color: textSecondary }} className="w-6 h-6 ml-1" />
                        </div>
                    ) : (
                        <Mic style={{ color: textSecondary }} className="w-6 h-6 cursor-pointer ml-1" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WhatsappBotDemo;
