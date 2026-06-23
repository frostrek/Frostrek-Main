import { useEffect, useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Mic, MessageSquare, Sparkles } from 'lucide-react';
import SplitTextReveal from '../ui/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

// ─── Observe.ai-style arrow SVG (exact paths from user) ─────────────────────
const CurlyArrow = ({ className = '' }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 84"
        width="150"
        height="84"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        aria-hidden
        fill="none"
    >
        <g transform="matrix(1.203660011291504,0,0,1.203660011291504,78.125,34.75)" opacity="1">
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="currentColor"
                    strokeOpacity="1"
                    strokeWidth="4"
                    d="M55.5,31.5 C55.5,31.5 -11.319000244140625,37.178001403808594 -9.857999801635742,-2.484999895095825 C-9.092000007629395,-23.27400016784668 24.405000686645508,-27.20800018310547 29.908000946044922,-5.761000156402588 C31.027999877929688,-1.3949999809265137 32.67499923706055,20.930999755859375 -1.75,24.5 C-31.881999969482422,27.624000549316406 -52.4640007019043,-9.656000137329102 -51.5,-18.334999084472656 C-51.375,-18.834999084472656 -36.25,-9.375 -36.25,-9.375"
                />
            </g>
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillOpacity="0"
                    stroke="currentColor"
                    strokeOpacity="1"
                    strokeWidth="4"
                    d="M-59.96900177001953,-3.303999900817871 C-59.96900177001953,-3.303999900817871 -51.46900177001953,-18.304000854492188 -51.46900177001953,-18.304000854492188"
                />
            </g>
        </g>
    </svg>
);

// ─── Card 1: Manufacturing OS ─────────────────────────────────────────────────
const ManufacturingDemo = () => {
    const [tick, setTick] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setTick(v => (v + 1) % 4), 1800);
        return () => clearInterval(t);
    }, []);
    const metrics = [{ label: 'OEE', value: '87%' }, { label: 'Cost/Unit', value: '$1.24' }, { label: 'Uptime', value: '99.2%' }];
    const alerts = [
        { id: 0, text: 'Extruder 3 - temp spike detected', icon: '⚡' },
        { id: 1, text: 'Changeover optimised · saved 1.4h', icon: '✅' },
        { id: 2, text: 'Batch cost updated · $1.24/kg', icon: '📊' },
        { id: 3, text: 'Shift handover logged - Team B', icon: '📋' },
    ];
    return (
        <div className="w-full text-xs select-none font-body">
            <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl px-4 py-2.5 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                    <span className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Live Factory Dashboard</span>
                </div>
                <span className="text-gray-400 text-[10px]">30s refresh</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
                {metrics.map(m => (
                    <div key={m.label} className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                        <div className="text-[#0EA5E9] font-bold text-sm">{m.value}</div>
                        <div className="text-gray-400 text-[10px] mt-0.5">{m.label}</div>
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                    {[alerts[tick], alerts[(tick + 1) % 4]].map((a, i) => (
                        <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-center gap-3 bg-[#F0F9FF] border border-[#BAE6FD] rounded-xl px-3 py-2.5">
                            <span>{a.icon}</span>
                            <span className="text-gray-600 text-[11px] leading-tight">{a.text}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

// ─── Card 2: Web3 Commerce ────────────────────────────────────────────────────
const Web3Demo = () => {
    const [phase, setPhase] = useState(0);
    useEffect(() => { const t = setInterval(() => setPhase(v => (v + 1) % 4), 1600); return () => clearInterval(t); }, []);
    const clubs = [
        { name: 'Real Madrid', logo: '/icons/real-madrid.png' },
        { name: 'FC Barcelona', logo: '/icons/barcelona.png' },
        { name: 'Man City', logo: '/icons/manchester-city.png' }
    ];
    const steps = [{ label: 'Wallet provisioned', done: true }, { label: 'Cart validated', done: phase >= 1 }, { label: 'On-chain settlement', done: phase >= 2 }, { label: 'Treasury updated', done: phase >= 3 }];
    return (
        <div className="w-full font-body text-xs select-none space-y-3">
            <div className="bg-[#F4FAF7] border border-[#C8E6DA] rounded-xl px-4 py-3 flex items-center justify-between">
                <div><div className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Wallet Balance</div><div className="text-[#2D6A4F] font-bold text-base">1,450 <span className="text-xs text-gray-400">$TOKEN</span></div></div>
                <div className="w-9 h-9 rounded-full bg-[#E8F5EE] border border-[#C8E6DA] flex items-center justify-center">
                    <img src="/icons/fintech.png" alt="Fintech" className="w-5 h-5 object-contain" />
                </div>
            </div>
            <div className="flex gap-2">
                {clubs.map((c, i) => (
                    <div
                        key={c.name}
                        className={`flex-1 border rounded-xl p-2 text-center transition-all duration-500 flex flex-col items-center justify-center ${i === phase % 3 ? 'border-[#2D6A4F]/40 bg-[#F4FAF7]' : 'border-gray-100 bg-white'
                            }`}
                    >
                        <div className="h-6 w-6 flex items-center justify-center">
                            <img src={c.logo} alt={c.name} className="h-6 w-6 object-contain" />
                        </div>
                        <div className="text-gray-500 text-[9px] mt-1.5 truncate w-full">{c.name}</div>
                    </div>
                ))}
            </div>
            <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 space-y-2 shadow-sm">
                {steps.map(s => (<div key={s.label} className="flex items-center gap-2"><div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0 ${s.done ? 'bg-[#2D6A4F]' : 'bg-gray-100'}`}>{s.done && <CheckCircle className="w-2.5 h-2.5 text-white" />}</div><span className={`text-[10px] transition-colors duration-300 ${s.done ? 'text-gray-700' : 'text-gray-300'}`}>{s.label}</span></div>))}
            </div>
        </div>
    );
};

// ─── Card 3: AI Agents ────────────────────────────────────────────────────────
const AIAgentDemo = () => {
    const [msgs, setMsgs] = useState<{ id: number; who: string; text: string }[]>([{ id: 0, who: 'user', text: 'I need to reschedule my appointment.' }]);
    const [typing, setTyping] = useState(false);
    const replies = [{ who: 'bot', text: 'Sure! I can handle that for you instantly.' }, { who: 'bot', text: 'What date works best for you?' }, { who: 'user', text: 'Next Tuesday at 2pm please.' }, { who: 'bot', text: '✅ Confirmed! Reminder set for Monday.' }];
    const idx = useRef(0);
    useEffect(() => {
        const loop = () => {
            if (idx.current >= replies.length) { setTimeout(() => { setMsgs([{ id: 0, who: 'user', text: 'I need to reschedule my appointment.' }]); idx.current = 0; }, 2500); return; }
            setTyping(true);
            setTimeout(() => { setTyping(false); const r = replies[idx.current]; setMsgs(prev => [...prev, { id: prev.length, ...r }]); idx.current++; }, 900);
        };
        const t = setInterval(loop, 1800);
        return () => clearInterval(t);
    }, []);
    return (
        <div className="w-full font-body text-xs select-none space-y-2">
            <div className="flex items-center gap-2 bg-[#FFF1F2] border border-[#FFE4E6] rounded-xl px-3 py-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-[#FFF1F2] border border-[#FFE4E6] flex items-center justify-center">
                    <img src="/icons/ai agents.png" alt="AI Agent" className="w-4 h-4 object-contain" />
                </div>
                <div><div className="text-gray-800 text-[10px] font-semibold">Frosty AI Agent</div><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#FB7185] animate-pulse" /><span className="text-[#FB7185] text-[9px]">Online</span></div></div>
                <div className="ml-auto flex gap-1.5"><Mic className="w-3.5 h-3.5 text-gray-300" /><MessageSquare className="w-3.5 h-3.5 text-gray-300" /></div>
            </div>
            <div className="space-y-2 min-h-[140px]">
                <AnimatePresence>
                    {msgs.map(m => (<motion.div key={m.id} initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }} className={`flex ${m.who === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] px-3 py-2 rounded-2xl text-[11px] leading-snug ${m.who === 'user' ? 'bg-gray-100 text-gray-700 rounded-br-sm' : 'bg-[#FFF1F2] border border-[#FFE4E6] text-gray-800 rounded-bl-sm'}`}>{m.text}</div></motion.div>))}
                </AnimatePresence>
                {typing && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start"><div className="bg-[#FFF1F2] border border-[#FFE4E6] rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1 items-center">{[0, 0.15, 0.3].map((d, i) => (<span key={i} className="w-1.5 h-1.5 rounded-full bg-[#FB7185] animate-bounce" style={{ animationDelay: `${d}s` }} />))}</div></motion.div>)}
            </div>
        </div>
    );
};

// ─── Cards data ───────────────────────────────────────────────────────────────
const CARDS = [
    { icon: "/icons/manufacturing.png", label: 'Manufacturing Intelligence', title: 'Frostrek Manufacturing OS', desc: 'Unify ERP, WMS, SCADA and PLC data into a single real-time intelligence hub. Live dashboards, AI cost analytics, and automated production scheduling.', href: '/products/frostrek-manufacturing-os', Demo: ManufacturingDemo },
    { icon: "/icons/fintech.png", label: 'Fintech & Custom Wallets', title: 'Fintech & Custom Wallets', desc: 'A centralized, closed-loop digital currency engineered specifically for sports fans and affiliated clubs. Functioning as a next-generation digital loyalty programme that bypasses gateway commissions.', href: '/products/frostrek-web3-commerce', Demo: Web3Demo },
    { icon: "/icons/ai agents.png", label: 'AI Agents', title: 'Frostrek AI Agents', desc: 'Deploy intelligent AI agents across voice, chat, and WhatsApp. Context-aware, sentiment-sensitive, resolving 80% of inquiries without human intervention.', href: '/products/frosty-ai', Demo: AIAgentDemo },
];

// ─── Main Section ─────────────────────────────────────────────────────────────
const WhatWeDoSection = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const scrollWrapperRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(max-width: 767px)", () => {
            if (pinRef.current && scrollWrapperRef.current) {
                const cards = scrollWrapperRef.current.children;
                if (cards.length > 0) {
                    const cardWidth = (cards[0] as HTMLElement).offsetWidth;
                    const gap = 20; // gap-5 = 20px
                    // Scroll distance needed to align the last card to the left edge
                    const scrollAmount = (cardWidth + gap) * (cards.length - 1);
                    
                    if (scrollAmount > 0) {
                        gsap.to(scrollWrapperRef.current, {
                            x: -scrollAmount,
                            ease: "none",
                            scrollTrigger: {
                                trigger: pinRef.current,
                                start: "top 15%", 
                                end: () => `+=${scrollAmount}`,
                                scrub: 1,
                                pin: true,
                                anticipatePin: 1
                            }
                        });
                    }
                }
            }
        });

        return () => mm.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="bg-brand-light-bg py-24 md:py-32 px-4 overflow-hidden font-body">
            <div className="max-w-7xl mx-auto">

                {/* ── Heading block — observe.ai style with curly arrow ── */}
                <div ref={headingRef} className="text-center mb-10 md:mb-16">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C8E6DA] bg-[#F4FAF7] mb-8"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        <span className="text-[#2D6A4F] text-xs font-bold uppercase tracking-wide">What We Do</span>
                    </motion.div>

                    {/* Line 1: "What We Do & How" */}
                    <div className="mb-2">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.08] tracking-[-0.02em] text-center"
                            type="chars"
                            stagger={0.03}
                            once={false}
                        >
                            What We Do & How
                        </SplitTextReveal>
                    </div>

                    {/* Line 2: "We Transform" + curly arrow */}
                    <div className="flex flex-row items-center justify-center gap-4 md:gap-6">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.08] tracking-[-0.02em] text-center"
                            type="chars"
                            stagger={0.03}
                            once={false}
                            delay={0.3}
                        >
                            We Transform
                        </SplitTextReveal>

                        {/* Curly arrow — slides in from left after text */}
                        <motion.div
                            initial={{ opacity: 0, x: -20, rotate: -15 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                            className="flex-shrink-0"
                        >
                            <CurlyArrow className="w-16 h-10 md:w-28 md:h-16 text-[#3D8B6E]/70" />
                        </motion.div>
                    </div>

                    {/* Subtitle */}
                    <SplitTextReveal
                        as="p"
                        className="mt-6 max-w-2xl mx-auto text-lg text-gray-500 font-medium"
                        type="words"
                        stagger={0.02}
                        once={false}
                    >
                        Three flagship platforms. One vision - replace manual chaos with real-time intelligence.
                    </SplitTextReveal>
                </div>

                {/* ── 3-column card grid ── */}
                <div ref={pinRef} className="md:!overflow-visible overflow-hidden -mx-4 md:mx-0">
                    <div className="px-4 md:px-0">
                        <div ref={scrollWrapperRef} className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 w-max md:w-auto">
                            {CARDS.map((card, i) => {
                                const Demo = card.Demo;
                                return (
                                    <div key={card.label} className="w-[85vw] sm:w-[60vw] md:w-auto shrink-0 flex">
                                        <motion.div
                                            initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                                className={`group relative rounded-3xl border border-gray-100 bg-white p-7 flex flex-col gap-5 transition-all duration-500 ${
                                    i === 0
                                        ? 'hover:border-[#BAE6FD] hover:shadow-[0_20px_50px_rgba(14,165,233,0.07)]'
                                        : i === 2
                                        ? 'hover:border-[#FFE4E6] hover:shadow-[0_20px_50px_rgba(244,63,94,0.05)]'
                                        : 'hover:border-[#C8E6DA] hover:shadow-[0_20px_50px_rgba(45,106,79,0.07)]'
                                }`}
                            >
                                <div className={`absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                                    i === 0
                                        ? 'via-[#0EA5E9]/25'
                                        : i === 2
                                        ? 'via-[#FB7185]/20'
                                        : 'via-[#2D6A4F]/25'
                                }`} />
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                                            i === 0
                                                ? 'bg-[#E0F2FE] border-[#BAE6FD]'
                                                : i === 2
                                                ? 'bg-[#FFF1F2] border-[#FFE4E6]'
                                                : 'bg-[#E8F5EE] border-[#C8E6DA]'
                                        }`}>
                                            <img src={card.icon} alt={card.label} className="w-5 h-5 object-contain" />
                                        </div>
                                        <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">{card.label}</span>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-black mb-2 leading-snug">{card.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                                </div>
                                <div className="flex-1"><Demo /></div>
                                <Link to={card.href} className="inline-flex items-center gap-2 text-gray-600 text-sm font-bold group/link hover:gap-3 transition-all duration-300">
                                    Explore platform <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

                {/* ── Stats bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-14 grid grid-cols-4 gap-px bg-gray-100 rounded-xl md:rounded-2xl overflow-hidden border border-gray-100"
                >
                    {[{ value: '8 wks', label: 'Avg. time to go live' }, { value: '4+', label: 'Systems unified' }, { value: '80%', label: 'Inquiries automated' }, { value: '10X', label: 'ROI potential' }].map(s => (
                        <div key={s.label} className="bg-white px-2 py-6 sm:px-4 sm:py-8 md:px-6 md:py-12 text-center transition-all duration-300 hover:bg-gray-50/30 flex flex-col justify-center">
                            <div className="font-serif text-[1.1rem] sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D6A4F] mb-1 md:mb-2">{s.value}</div>
                            <div className="text-gray-600 text-[9px] sm:text-xs md:text-sm lg:text-base font-medium font-body leading-[1.2] md:leading-tight max-w-[70px] sm:max-w-[100px] md:max-w-[140px] mx-auto">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhatWeDoSection;
