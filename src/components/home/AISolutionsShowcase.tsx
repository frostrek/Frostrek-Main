import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight, Sparkles, MessageCircle, Volume2,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SplitTextReveal from '../ui/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

interface SolutionDemo {
    type: 'chat' | 'voice' | 'manufacturing' | 'web3' | 'multivendor' | 'llm';
}

interface Solution {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: any;
    demo: SolutionDemo;
    features: string[];
    link: string;
    gradient: string;
    tabColor: string;
    tabColorHover: string;
}

const SOLUTIONS: Solution[] = [
    {
        id: 'manufacturing-intelligence',
        title: 'Manufacturing Intelligence',
        tagline: 'Your factory. Finally, one screen.',
        description: 'Connect every system on your production floor - ERP, WMS, PLCs, SCADA - into a single real-time intelligence platform. Built in 8 weeks. No new hardware. No million-dollar MES licence.',
        icon: "/icons/manufacturing.png",
        demo: { type: 'manufacturing' },
        features: [
            'Disconnected systems: Unify ERP, WMS, and machine control',
            'Blind cost per unit: Real-time cost calculations',
            'Changeover losses: Eliminate 20-40+ hrs/wk of downtime',
            'Quality catch: Automated real-time deviation alerts',
            'Unstructured handovers: AI-driven shift briefings'
        ],
        link: '/solutions/manufacturing-intelligence',
        gradient: 'from-[#2D6A4F] to-[#3D8B6E]',
        tabColor: '#F3E8FF',
        tabColorHover: '#EBE0F7'
    },
    {
        id: 'frostrek-web3-commerce',
        title: 'Fintech & Custom Wallets',
        tagline: 'Bypass commissions with closed-loop loyalty',
        description: 'A centralized, closed-loop digital currency engineered specifically for sports fans and affiliated clubs. Functioning as a next-generation digital loyalty programme that bypasses traditional gateway commissions.',
        icon: "/icons/fintech.png",
        demo: { type: 'web3' },
        features: [
            'Centralized, closed-loop digital fan currency',
            'Bypass gateway transaction commissions completely',
            'Next-generation digital loyalty program engine',
            'Custom programmable wallets for sports merchandising'
        ],
        link: '/solutions/fintech-custom-wallets',
        gradient: 'from-[#2D6A4F] to-[#3D8B6E]',
        tabColor: '#FFFBEB',
        tabColorHover: '#FEF3C7'
    },
    {
        id: 'ai-agents',
        title: 'AI Agents',
        tagline: 'Intelligent Conversations',
        description: 'Deploy conversational AI agents that understand context, handle complex queries, and provide human-like support 24/7. From customer service to sales, our agents adapt to your business needs.',
        icon: "/icons/ai agents.png",
        demo: { type: 'chat' },
        features: [
            'Natural language understanding with 98% accuracy',
            'Multi-turn conversation memory',
            'Seamless handoff to human agents',
            'Custom personality & brand voice'
        ],
        link: '/solutions/ai-agents',
        gradient: 'from-[#2D6A4F] to-[#3D8B6E]',
        tabColor: '#FEF2F2',
        tabColorHover: '#FEE2E2'
    },
    {
        id: 'voice-ai',
        title: 'Voice AI',
        tagline: 'Natural Voice Interactions',
        description: 'Low-latency voice bots that sound natural and respond instantly. Perfect for customer support calls, appointment scheduling, and interactive voice responses.',
        icon: "/icons/Voice ai.png",
        demo: { type: 'voice' },
        features: [
            'Sub-200ms response latency',
            'Natural text-to-speech voices',
            'Multi-language support',
            'Real-time transcription & analytics'
        ],
        link: '/solutions/voice-ai',
        gradient: 'from-[#2D6A4F] to-[#3D8B6E]',
        tabColor: '#F0FDF4',
        tabColorHover: '#DCFCE7'
    },
    {
        id: 'multivendor-dashboard',
        title: 'Multivendor Dashboard',
        tagline: 'Track revenue, products & trends in one place.',
        description: 'Consolidate multiple storefronts and marketplaces-Amazon, Shopify, WooCommerce, eBay-into a single automated AI command center. Track total e-commerce revenue, analyze product metrics, and forecast global market trends in real-time.',
        icon: "/icons/multivendor.png",
        demo: { type: 'multivendor' },
        features: [
            'Unified monitoring for Amazon, Shopify, WooCommerce, & eBay',
            'AI-powered demand forecasting & inventory alerts',
            'Real-time revenue, order volume, and profit consolidation',
            'E-commerce market trends & product margin analysis',
            'Unified data stream for simplified e-commerce scaling'
        ],
        link: '/solutions/multivendor-dashboard',
        gradient: 'from-[#2D6A4F] to-[#3D8B6E]',
        tabColor: '#F0F9FF',
        tabColorHover: '#E0F2FE'
    },
    {
        id: 'llm-training-data',
        title: 'LLM Training & Data Services',
        tagline: 'High-quality data for robust models.',
        description: 'Accelerate your AI initiatives with our end-to-end data services. From data annotation and RLHF to model evaluation, we provide the high-quality datasets and human feedback needed to train, fine-tune, and align your Large Language Models.',
        icon: "/icons/data-analytics.png",
        demo: { type: 'llm' },
        features: [
            'Data Annotation: Precise labeling for computer vision and NLP',
            'RLHF: Human feedback to align model behavior with human intent',
            'Model Evaluation: Rigorous benchmarking against industry standards',
            'Custom Datasets: Tailored data collection for specialized domains',
            'Data Quality: Multi-stage QA processes for maximum accuracy'
        ],
        link: '/solutions/data-services',
        gradient: 'from-[#2D6A4F] to-[#3D8B6E]',
        tabColor: '#EEF2FF',
        tabColorHover: '#E0E7FF'
    }
];

const ChatDemo = () => {
    const messages = [
        { role: 'user', text: 'How can I track my order?' },
        { role: 'agent', text: 'I can help! Please share your order ID and I\'ll look that up.' },
        { role: 'user', text: 'ORD-2024-7823' },
    ];

    return (
        <div className="rounded-2xl p-5 h-[240px] overflow-hidden bg-gradient-to-r from-[#FEF2F2] to-transparent border border-[#E6EFE6]">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E6EFE6]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2D6A4F] animate-pulse" />
                <span className="text-xs font-semibold text-gray-600">Frosty AI Agent</span>
            </div>
            <div className="space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        style={{ animationDelay: `${i * 1}s` }}
                    >
                        <div
                            className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] font-medium shadow-sm animate-fade-in ${msg.role === 'user'
                                ? 'bg-[#FEE2E2] text-gray-700 rounded-br-sm'
                                : 'bg-white text-gray-700 border border-gray-100 rounded-bl-sm'
                                }`}
                            style={{ animationDelay: `${i * 0.8}s` }}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div className="flex justify-start">
                    <div className="flex gap-1.5 px-3 py-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce" style={{ animationDelay: '0s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const WAVE_HEIGHTS = [20, 32, 16, 28, 12, 24, 30, 18, 26, 14, 22, 20];

const VoiceDemo = () => {
    return (
        <div className="rounded-2xl p-5 h-[240px] bg-gradient-to-r from-[#F0FDF4] to-transparent border border-[#E6EFE6] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0" />
            <div className="relative mb-6 z-10">
                <div className="w-20 h-20 rounded-full bg-[#2D6A4F] flex items-center justify-center animate-pulse shadow-lg shadow-[#2D6A4F]/20">
                    <Volume2 className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-[#2D6A4F]/40 animate-ping" />
            </div>
            <div className="flex items-center gap-1.5 mb-3 z-10 relative">
                {WAVE_HEIGHTS.map((height, i) => (
                    <div
                        key={i}
                        className="w-1.5 bg-[#2D6A4F] rounded-full animate-voice-wave"
                        style={{
                            height: `${height}px`,
                            animationDelay: `${i * 0.2}s`
                        }}
                    />
                ))}
            </div>
            <span className="text-sm font-medium text-gray-500 z-10 relative">Voice AI responding...</span>
        </div>
    );
};

const ManufacturingDemo = () => {
    const industries = [
        { name: 'Aquaculture & Feed', metric: 'Extruder optimisation' },
        { name: 'Food & Beverage', metric: 'Line OEE, changeover logs' },
        { name: 'Pharmaceuticals', metric: 'Batch traceability alerts' },
        { name: 'Chemicals', metric: 'Reactor monitoring' },
    ];

    return (
        <div className="rounded-2xl p-4 h-[240px] bg-gradient-to-r from-[#F3E8FF] to-transparent border border-[#E9D5FF]/50 overflow-hidden flex flex-col relative">
            <div className="flex items-center justify-between mb-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm z-10">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-gray-700">Factory Dashboard</span>
                </div>
                <div className="flex gap-4">
                    <div className="text-[11px] font-bold text-gray-500">OEE: <span className="text-[#2D6A4F]">87%</span></div>
                    <div className="text-[11px] font-bold text-gray-500">Cost/Unit: <span className="text-[#2D6A4F]">$1.24</span></div>
                </div>
            </div>

            <div className="space-y-2 flex-1 relative z-10">
                {industries.map((ind, i) => (
                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-white/80 border border-gray-100 backdrop-blur-sm shadow-sm animate-fade-in" style={{ animationDelay: `${i * 0.2}s` }}>
                        <span className="text-xs font-bold text-gray-700">{ind.name}</span>
                        <span className="text-[11px] font-medium text-gray-500">{ind.metric}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Web3Demo = () => {
    return (
        <div className="rounded-2xl p-5 h-[240px] bg-brand-light-bg border border-[#E6EFE6] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFFBEB] to-transparent" />
            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-[#E6EFE6] flex items-center justify-center mb-4 z-10 relative">
                <img src="/icons/payment-success.png" alt="Payment Success" className="w-10 h-10 object-contain" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#2D6A4F] rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
            </div>
            <div className="text-center z-10">
                <div className="text-sm font-bold text-black mb-1">Payment Successful</div>
                <div className="text-3xl font-black font-mono tracking-tight mb-2">145.00 <span className="text-sm">TOKEN</span></div>
                <div className="text-[11px] text-gray-500 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 inline-block font-medium">Tx: 0x8f...3a9b settled instantly</div>
            </div>
        </div>
    );
};

const MultivendorDemo = () => {
    const marketplaces = [
        { name: 'Amazon Store', revenue: '$18,450', trend: '+12.4%', color: '#FF9900' },
        { name: 'Shopify Store', revenue: '$12,240', trend: '+8.2%', color: '#96BF48' },
        { name: 'eBay Marketplace', revenue: '$4,150', trend: '+3.1%', color: '#0064D2' }
    ];

    return (
        <div className="rounded-2xl p-4 h-[240px] bg-gradient-to-r from-[#F0F9FF] to-transparent border border-[#E6EFE6] overflow-hidden flex flex-col relative">
            <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm z-10">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-700">Consolidated Sales</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-[#2D6A4F] bg-[#E8F5EE] px-2 py-0.5 rounded-full">+9.8%</span>
                    <span className="text-xs font-black text-[#2D6A4F] font-mono">$34,840</span>
                </div>
            </div>

            <div className="space-y-2 flex-1 relative z-10">
                {marketplaces.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-white/80 border border-gray-100 backdrop-blur-sm shadow-sm animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: m.color }} />
                            <span className="text-xs font-bold text-gray-800">{m.name}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <span className="text-[11px] font-mono font-bold text-slate-700">{m.revenue}</span>
                            <span className="text-[10px] font-bold text-green-600">{m.trend}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LLMDemo = () => {
    return (
        <div className="rounded-2xl p-5 h-[240px] bg-gradient-to-br from-[#EEF2FF] to-transparent border border-[#E0E7FF] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[#EEF2FF]/20" />
            <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-[#E0E7FF] flex items-center justify-center mb-4 z-10 relative">
                <div className="flex gap-2">
                    <span className="w-2 h-8 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-12 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-6 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></span>
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
            </div>
            <div className="text-center z-10">
                <div className="text-sm font-bold text-black mb-1">Model Aligned</div>
                <div className="text-3xl font-black font-mono tracking-tight mb-2">99.8% <span className="text-sm">ACCURACY</span></div>
                <div className="text-[11px] text-gray-500 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-100 inline-block font-medium">RLHF Pipeline Active</div>
            </div>
        </div>
    );
};

const DemoComponent = ({ type }: { type: SolutionDemo['type'] }) => {
    switch (type) {
        case 'chat': return <ChatDemo />;
        case 'voice': return <VoiceDemo />;
        case 'manufacturing': return <ManufacturingDemo />;
        case 'web3': return <Web3Demo />;
        case 'multivendor': return <MultivendorDemo />;
        case 'llm': return <LLMDemo />;
    }
};

const AISolutionsShowcase = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);

    const activeSolution = SOLUTIONS[activeIndex];

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Content animations for header are now handled by SplitTextReveal
            if (tabsRef.current) {
                gsap.fromTo(tabsRef.current,
                    { x: -50, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
                        scrollTrigger: { trigger: tabsRef.current, start: 'top 85%', toggleActions: 'play none none none' }
                    }
                );
            }
            if (contentRef.current) {
                gsap.fromTo(contentRef.current,
                    { x: 50, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
                        scrollTrigger: { trigger: contentRef.current, start: 'top 85%', toggleActions: 'play none none none' }
                    }
                );
            }
        }, sectionRef);
        return () => ctx.revert();
    }, { scope: sectionRef });

    const handleTabChange = (index: number) => {
        if (index === activeIndex) return;
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                opacity: 0, x: 20, duration: 0.2,
                onComplete: () => {
                    setActiveIndex(index);
                    gsap.to(contentRef.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' });
                }
            });
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden bg-brand-light-bg font-sans">
            <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-brand-badge-bg/50 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-10 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text text-sm font-bold tracking-wide mb-6 border border-[#c4e0d4]/50"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        <span className="text-[#2D6A4F] text-xs font-bold uppercase tracking-wide">AI Solutions</span>
                    </motion.div>

                    <div className="flex flex-col items-center">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.03}
                            once={false}
                        >
                            Our AI Business
                        </SplitTextReveal>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#2D6A4F] mb-6 leading-[1.1] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.03}
                            once={false}
                            delay={0.3}
                        >
                            Solutions
                        </SplitTextReveal>
                    </div>
                    <SplitTextReveal
                        as="p"
                        className="text-lg text-gray-500 max-w-2xl mx-auto font-medium"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        AI Agents and agentic workflows that embed AI where the value is.
                    </SplitTextReveal>
                </div>

                <div className="max-w-7xl mx-auto">
                    {/* MOBILE VIEW */}
                    <div className="lg:hidden mb-8">
                        <div
                            ref={tabsRef}
                            className="flex justify-start sm:justify-center gap-4 mb-8 overflow-x-auto p-2"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {SOLUTIONS.map((solution, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <button
                                        key={solution.id}
                                        onClick={() => handleTabChange(index)}
                                        className={`flex-shrink-0 relative transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100 hover:scale-105'}`}
                                    >
                                        <div
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            style={{ backgroundColor: isActive ? solution.tabColorHover : solution.tabColor }}
                                            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border-2 ${isActive
                                                ? 'border-[#2D6A4F] shadow-[#2D6A4F]/10'
                                                : 'border-white'
                                                }`}
                                        >
                                            <img
                                                src={solution.icon}
                                                alt={solution.title}
                                                className="w-7 h-7 object-contain transition-all duration-300"
                                            />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="text-center mb-6">
                            <h3 className="font-serif text-2xl font-bold text-[#2D6A4F] mb-1">
                                {activeSolution.title}
                            </h3>
                            <p className="text-sm font-medium text-gray-500">
                                {activeSolution.tagline}
                            </p>
                        </div>

                        <div ref={contentRef} className="rounded-3xl border border-[#E6EFE6] shadow-[0_20px_50px_rgba(45,106,79,0.05)] bg-white overflow-hidden">
                            <div className="p-5 border-b border-[#E6EFE6]">
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {activeSolution.description}
                                </p>
                            </div>
                            <div className="p-5 bg-gray-50/50">
                                <DemoComponent type={activeSolution.demo.type} />
                            </div>
                            <div className="px-5 pb-5 pt-4 space-y-3 border-t border-[#E6EFE6]">
                                {activeSolution.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-600">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="px-5 pb-6 flex flex-col gap-3">
                                <Link
                                    to={activeSolution.link}
                                    style={{ backgroundColor: activeSolution.tabColor }}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-gray-600 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md border border-gray-200"
                                >
                                    Learn More <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/contact"
                                    onMouseEnter={() => setHoveredIndex(-2)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    style={{ borderColor: hoveredIndex === -2 ? activeSolution.tabColorHover : '#E5E7EB' }}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 border rounded-xl font-bold text-sm text-gray-600 hover:bg-[#Fcfcfc] transition-all"
                                >
                                    <MessageCircle className="w-4 h-4" /> Book Demo
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP VIEW */}
                    <div className="hidden lg:flex gap-10">
                        {/* Left Panel */}
                        <div className="lg:w-1/3 pt-2">
                            <div className="space-y-3">
                                {SOLUTIONS.map((solution, index) => {
                                    const isActive = index === activeIndex;

                                    return (
                                        <button
                                            key={solution.id}
                                            onClick={() => handleTabChange(index)}
                                            onMouseEnter={() => setHoveredIndex(index)}
                                            onMouseLeave={() => setHoveredIndex(null)}
                                            style={{ backgroundColor: isActive ? solution.tabColorHover : solution.tabColor }}
                                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-left transition-all duration-300 group border-2 ${isActive
                                                ? 'border-[#2D6A4F]/20 shadow-xl shadow-[#2D6A4F]/5 scale-[1.02]'
                                                : 'border-transparent shadow-sm hover:shadow-md'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white/40' : 'bg-[#F4F9F6]'}`}>
                                                <img
                                                    src={solution.icon}
                                                    alt={solution.title}
                                                    className="w-7 h-7 object-contain transition-all duration-300"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-serif font-bold text-[17px] tracking-wide mb-1">
                                                    {solution.title}
                                                </div>
                                                <div className={`text-[13px] font-medium ${isActive ? 'text-gray-600' : 'text-gray-500'}`}>
                                                    {solution.tagline}
                                                </div>
                                            </div>
                                            {isActive && (
                                                <div className="w-1.5 h-8 bg-[#2D6A4F]/20 rounded-full" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <Link
                                to="/products"
                                className="mt-8 flex items-center gap-3 px-5 py-4 rounded-2xl border-2 border-dashed border-[#c4e0d4] text-[#2D6A4F] hover:bg-white hover:border-[#2D6A4F]/30 transition-all group font-bold"
                            >
                                <Sparkles className="w-5 h-5 text-[#2D6A4F]" />
                                <span>View Full AI Ecosystem</span>
                                <ArrowRight className="w-5 h-5 ml-auto transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Right Panel */}
                        <div ref={contentRef} className="lg:w-2/3">
                            <div className="rounded-3xl border border-[#E6EFE6] shadow-[0_30px_60px_rgba(45,106,79,0.06)] bg-white overflow-hidden flex flex-col h-full">
                                {/* Header */}
                                <div className="p-8 border-b border-[#E6EFE6] bg-gradient-to-br from-white to-[#Fafdfb]">
                                    <div className="flex items-start gap-5">
                                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-[#F4F9F6] flex items-center justify-center shadow-lg shadow-[#2D6A4F]/20">
                                            <img
                                                src={activeSolution.icon}
                                                alt={activeSolution.title}
                                                className="w-10 h-10 object-contain"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-3xl font-bold mb-2">
                                                {activeSolution.title}
                                            </h3>
                                            <p className="text-base text-gray-600 leading-relaxed font-medium">
                                                {activeSolution.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-8 grid grid-cols-[1fr_1.1fr] gap-8 bg-white flex-1">
                                    <div className="space-y-4 pt-2">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Key Features</h4>
                                        {activeSolution.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 animate-fade-in"
                                                style={{ animationDelay: `${i * 0.1}s` }}
                                            >
                                                <div className="mt-0.5 bg-[#E6EFE6] rounded-full p-0.5 flex-shrink-0">
                                                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                                                </div>
                                                <span className="text-[13px] text-gray-600 leading-snug">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col justify-center">
                                        <DemoComponent type={activeSolution.demo.type} />
                                    </div>
                                </div>

                                {/* Footer CTA */}
                                <div className="px-8 py-6 flex items-center gap-4 bg-gray-50/50 border-t border-[#E6EFE6]">
                                    <Link
                                        to={activeSolution.link}
                                        style={{
                                            backgroundColor: hoveredIndex === -1 ? activeSolution.tabColorHover : activeSolution.tabColor
                                        }}
                                        onMouseEnter={() => setHoveredIndex(-1)} // Use -1 to indicate footer button hover
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        className="inline-flex items-center gap-2 px-7 py-3.5 text-gray-600 rounded-xl font-bold transition-all shadow-sm hover:shadow-md border border-gray-200"
                                    >
                                        Learn More <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        to="/contact"
                                        onMouseEnter={() => setHoveredIndex(-2)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                        style={{ borderColor: hoveredIndex === -2 ? activeSolution.tabColorHover : '#F3F4F6' }}
                                        className="inline-flex items-center gap-2 px-7 py-3.5 border-2 rounded-xl font-bold text-gray-600 hover:bg-white transition-all bg-white"
                                    >
                                        <MessageCircle className="w-4 h-4" /> Book Demo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AISolutionsShowcase;