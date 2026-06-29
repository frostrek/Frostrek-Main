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
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-4 py-2.5 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Live Factory Dashboard</span>
                </div>
                <span className="text-gray-400 text-[10px]">30s refresh</span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3">
                {metrics.map(m => (
                    <div key={m.label} className="bg-white border border-gray-100 rounded-xl p-3 text-center shadow-sm">
                        <div className="text-[#10B981] font-bold text-sm">{m.value}</div>
                        <div className="text-gray-400 text-[10px] mt-0.5">{m.label}</div>
                    </div>
                ))}
            </div>
            <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                    {[alerts[tick], alerts[(tick + 1) % 4]].map((a, i) => (
                        <motion.div key={a.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-center gap-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl px-3 py-2.5">
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
            <div className="bg-[#FEFCE8] border-[#FEF08A] rounded-xl px-4 py-3 flex items-center justify-between">
                <div><div className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Wallet Balance</div><div className="text-[#CA8A04] font-bold text-base">1,450 <span className="text-xs text-gray-400">$TOKEN</span></div></div>
                <div className="w-9 h-9 rounded-full bg-[#FEF9C3] border border-[#FEF9C3] flex items-center justify-center">
                    <img src="/icons/fintech-yellow.png" alt="Fintech" className="w-5 h-5 object-contain" />
                </div>
            </div>
            <div className="flex gap-2">
                {clubs.map((c, i) => (
                    <div
                        key={c.name}
                        className={`flex-1 border rounded-xl p-2 text-center transition-all duration-500 flex flex-col items-center justify-center ${i === phase % 3 ? 'border-[#CA8A04]/40 bg-[#FEFCE8]' : 'border-gray-100 bg-white'
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
                {steps.map(s => (<div key={s.label} className="flex items-center gap-2"><div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-500 flex-shrink-0 ${s.done ? 'bg-[#CA8A04]' : 'bg-gray-100'}`}>{s.done && <CheckCircle className="w-2.5 h-2.5 text-white" />}</div><span className={`text-[10px] transition-colors duration-300 ${s.done ? 'text-gray-700' : 'text-gray-300'}`}>{s.label}</span></div>))}
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
            <div className="flex items-center gap-2 bg-[#FDF4FA] border border-[#F2BAE4] rounded-xl px-3 py-2 mb-3">
                <div className="w-7 h-7 rounded-full bg-white border border-[#F2BAE4] flex items-center justify-center">
                    <img src="/icons/machine-learning-lavender-filled.png" alt="AI Agent" className="w-4 h-4 object-contain" />
                </div>
                <div><div className="text-gray-800 text-[10px] font-semibold">Frosty AI Agent</div><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#D67CBA] animate-pulse" /><span className="text-[#D67CBA] text-[9px]">Online</span></div></div>
                <div className="ml-auto flex gap-1.5"><Mic className="w-3.5 h-3.5 text-[#D67CBA]" /><MessageSquare className="w-3.5 h-3.5 text-[#D67CBA]" /></div>
            </div>
            <div className="space-y-2 min-h-[140px]">
                <AnimatePresence>
                    {msgs.map(m => (<motion.div key={m.id} initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3 }} className={`flex ${m.who === 'user' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[80%] px-3 py-2 rounded-2xl text-[11px] leading-snug ${m.who === 'user' ? 'bg-gray-100 text-gray-700 rounded-br-sm' : 'bg-[#FDF4FA] border border-[#F2BAE4] text-gray-800 rounded-bl-sm'}`}>{m.text}</div></motion.div>))}
                </AnimatePresence>
                {typing && (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start"><div className="bg-[#FDF4FA] border border-[#F2BAE4] rounded-2xl rounded-bl-sm px-3 py-2 flex gap-1 items-center">{[0, 0.15, 0.3].map((d, i) => (<span key={i} className="w-1.5 h-1.5 rounded-full bg-[#D67CBA] animate-bounce" style={{ animationDelay: `${d}s` }} />))}</div></motion.div>)}
            </div>
        </div>
    );
};

// ─── Cards data ───────────────────────────────────────────────────────────────
const CARDS = [
    {
        icon: "/icons/manufacturing-green.png",
        label: 'MANUFACTURING OS',
        title: 'Frostrek Manufacturing OS',
        desc: 'A unified operating system for smart factories. Real-time visibility, predictive insights, and seamless automation across your shop floor.',
        features: ['Real-time production monitoring', 'Predictive maintenance', 'Quality & process optimization'],
        href: '/products/frostrek-manufacturing-os',
        exploreText: 'Explore Manufacturing OS',
        Demo: ManufacturingDemo
    },
    {
        icon: "/icons/fintech-yellow.png",
        label: 'FINTECH PLATFORM',
        title: 'Fintech & Custom Wallets',
        desc: 'Secure, compliant, and scalable fintech solutions. Digital wallets, KYC, transactions and beyond.',
        features: ['Digital wallets & payments', 'KYC & compliance engine', 'Transaction monitoring'],
        href: '/products/frostrek-web3-commerce',
        exploreText: 'Explore Fintech Platform',
        Demo: Web3Demo
    },
    {
        icon: "/icons/machine-learning-lavender-filled.png",
        label: 'AI AGENTS PLATFORM',
        title: 'Frostrek AI Agents',
        desc: 'Autonomous AI agents that handle tasks, answer queries, and drive outcomes across your business.',
        features: ['Multi-agent orchestration', 'Context-aware automation', 'Human-in-the-loop control'],
        href: '/products/frosty-ai',
        exploreText: 'Explore AI Agents',
        Demo: AIAgentDemo
    },
];

const getCardStyles = (i: number) => {
    if (i === 0) return { // Emerald Green
        bg: 'bg-[#F9FDFB]',
        border: 'border-t-[#10B981] border-[#BBF7D0]',
        iconBg: 'bg-[#F0FDF4]',
        labelColor: 'text-[#10B981]',
        arrowColor: 'text-[#10B981] border-[#10B981]',
        checkColor: 'text-[#10B981]',
    };
    if (i === 1) return { // Yellow
        bg: 'bg-[#FEFDF9]',
        border: 'border-t-[#EAB308] border-[#FEF08A]',
        iconBg: 'bg-[#FEF9C3]',
        labelColor: 'text-[#CA8A04]',
        arrowColor: 'text-[#CA8A04] border-[#CA8A04]',
        checkColor: 'text-[#CA8A04]',
    };
    return { // Lavender/Pink
        bg: 'bg-[#FDFBFC]',
        border: 'border-t-[#D67CBA] border-[#F2BAE4]',
        iconBg: 'bg-[#FDF4FA]',
        labelColor: 'text-[#D67CBA]',
        arrowColor: 'text-[#D67CBA] border-[#D67CBA]',
        checkColor: 'text-[#D67CBA]',
    };
};

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
                const wrapper = scrollWrapperRef.current;
                const container = pinRef.current;

                // Total scrollable distance = full content width minus visible container width
                const totalWidth = wrapper.scrollWidth;
                const containerWidth = container.offsetWidth;
                const scrollAmount = totalWidth - containerWidth;

                if (scrollAmount > 0) {
                    gsap.to(wrapper, {
                        x: -scrollAmount,
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 15%",
                            end: () => `+=${scrollAmount * 1.5}`,
                            scrub: 0.8,
                            pin: true,
                            anticipatePin: 1,
                            invalidateOnRefresh: true,
                            pinSpacing: true
                        }
                    });
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
                        className="mt-6 max-w-2xl mx-auto text-lg text-gray-500"
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
                                const styles = getCardStyles(i);
                                return (
                                    <div key={card.label} className="w-[85vw] sm:w-[60vw] md:w-auto shrink-0 flex">
                                        <motion.div
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                                            className={`group relative rounded-2xl border border-t-4 p-6 sm:p-7 flex flex-col transition-all duration-500 shadow-sm hover:shadow-md ${styles.bg} ${styles.border}`}
                                        >
                                            <div>
                                                <div className="flex items-center gap-3 mb-5">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${styles.iconBg}`}>
                                                        <img src={card.icon} alt={card.label} className="w-6 h-6 object-contain" />
                                                    </div>
                                                    <span className={`text-[11px] font-bold tracking-widest ${styles.labelColor}`}>{card.label}</span>
                                                </div>
                                                <h3 className="font-serif text-[22px] sm:text-2xl font-bold text-black mb-3 leading-tight whitespace-pre-line">{card.title}</h3>
                                                <p className="text-gray-500 text-sm leading-relaxed mb-6">{card.desc}</p>

                                                <div className="space-y-2 mb-6">
                                                    {card.features.map((feature, idx) => (
                                                        <div key={idx} className="flex items-start gap-2">
                                                            <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${styles.checkColor}`} />
                                                            <span className="text-[13px] text-gray-600">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-1 mt-auto">
                                                <Demo />
                                            </div>

                                            <div className="mt-6 pt-5 flex items-center justify-between border-t border-gray-100/60">
                                                <Link to={card.href} className={`text-sm font-bold group/link transition-colors ${styles.labelColor}`}>
                                                    {card.exploreText}
                                                </Link>
                                                <Link to={card.href} className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all bg-white hover:bg-gray-50 ${styles.arrowColor}`}>
                                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default WhatWeDoSection;
