import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Zap, Trophy, Factory, Globe,
    TrendingUp, DollarSign, Database, Cpu, ExternalLink, ChevronRight
} from 'lucide-react';

const caseStudies = [
    {
        id: 'pcc-marketplace',
        href: '/products/pcc-marketplace',
        tag: 'Web3 · Sports · Blockchain',
        badge: 'Live Build',
        icon: Trophy,
        title: 'Frostrek Web3 Commerce',
        subtitle: 'Sports Merchandise Meets Blockchain',
        description:
            'A multi-tenant Web3 e-commerce ecosystem for global sports clubs — powered by Circle programmable wallets, $TOKEN payments, and automated on-chain treasury settlement. Built from scratch.',
        stats: [
            { value: 'Multi', label: 'Club Storefronts', icon: Globe },
            { value: '$TOKEN', label: 'Token Payments', icon: Zap },
            { value: 'Auto', label: 'On-chain Settlement', icon: Cpu },
            { value: 'Polygon', label: 'Blockchain Network', icon: Database },
        ],
        accent: '#20A88D',
        gradient: 'from-[#20A88D]/10 via-[#20A88D]/5 to-transparent',
        borderGlow: 'shadow-[0_0_40px_rgba(32,168,141,0.15)]',
        glowColor: 'rgba(32, 168, 141, 0.1)',
        ctaText: 'View Case Study',
    },
    {
        id: 'frostrek-manufacturing-os',
        href: '/products/frostrek-manufacturing-os',
        tag: 'Manufacturing · AI · IoT',
        badge: 'Enterprise Platform',
        icon: Factory,
        title: 'Frostrek Manufacturing OS',
        subtitle: 'Real-Time AI Intelligence for the 24/7 Factory',
        description:
            'Our flagship manufacturing platform that unifies disconnected factory systems (ERP, WMS, SCADA) into a single intelligence hub. Features live sensor dashboards, automated cost analytics, and an AI-driven production scheduler.',
        stats: [
            { value: '4+', label: 'Systems Unified', icon: Database },
            { value: '< 30s', label: 'Sensor Refresh', icon: Zap },
            { value: '25%+', label: 'Yield Recovery', icon: TrendingUp },
            { value: '10x', label: 'ROI Potential', icon: DollarSign },
        ],
        accent: '#D97706',
        gradient: 'from-[#D97706]/10 via-[#D97706]/5 to-transparent',
        borderGlow: 'shadow-[0_0_40px_rgba(217,119,6,0.15)]',
        glowColor: 'rgba(217, 119, 6, 0.1)',
        ctaText: 'View Case Study',
    },
];

const StatPill = ({
    stat,
    accent,
    delay,
}: {
    stat: { value: string; label: string; icon: any };
    accent: string;
    delay: number;
}) => {
    const Icon = stat.icon;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center gap-1.5 px-3 py-4 rounded-2xl border border-gray-100 bg-gray-50/80 backdrop-blur-sm hover:border-gray-200 hover:bg-white transition-colors"
        >
            <Icon className="w-5 h-5 mb-1" style={{ color: accent }} />
            <span className="text-xl font-bold text-[#2D6A4F]">
                {stat.value}
            </span>
            <span className="text-[10px] font-bold text-gray-500 text-center leading-tight uppercase tracking-wide">
                {stat.label}
            </span>
        </motion.div>
    );
};

const CaseStudyCard = ({
    study,
    index,
    isActive,
    onClick,
}: {
    study: (typeof caseStudies)[0];
    index: number;
    isActive: boolean;
    onClick: () => void;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const Icon = study.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClick}
            className="cursor-pointer group"
        >
            <motion.div
                layout
                className={`relative overflow-hidden rounded-[2rem] border-2 transition-all duration-500 bg-white ${
                    isActive ? study.borderGlow + ' border-gray-200' : 'border-[#E6EFE6] hover:border-gray-300 shadow-sm hover:shadow-xl hover:-translate-y-1'
                }`}
            >
                {/* Animated gradient background */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${study.gradient} transition-opacity duration-500 pointer-events-none ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                />

                {/* Top accent line */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            transition={{ duration: 0.4 }}
                            className="absolute top-0 left-0 w-full h-1.5 origin-left"
                            style={{ background: study.accent }}
                        />
                    )}
                </AnimatePresence>

                <div className="relative p-7 md:p-10">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <motion.div
                                animate={isActive ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                                className="relative w-16 h-16 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 shadow-sm border border-white/50"
                                style={{ background: study.glowColor }}
                            >
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 1, opacity: 0.5 }}
                                        animate={{ scale: 1.5, opacity: 0 }}
                                        transition={{ duration: 1.8, repeat: Infinity }}
                                        className="absolute inset-0 rounded-[1.25rem]"
                                        style={{ background: study.accent }}
                                    />
                                )}
                                <Icon className="w-8 h-8 relative z-10" style={{ color: study.accent }} />
                            </motion.div>

                            <div>
                                {/* Live Badge */}
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm"
                                        style={{
                                            background: '#ffffff',
                                            color: study.accent,
                                            border: `1px solid ${study.accent}30`,
                                        }}
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                                            style={{ background: study.accent }}
                                        />
                                        {study.badge}
                                    </span>
                                </div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                    {study.tag}
                                </p>
                            </div>
                        </div>

                        <motion.div
                            animate={{ x: isActive ? 0 : -6, opacity: isActive ? 1 : 0 }}
                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-50 border border-gray-100"
                        >
                            <ChevronRight className="w-5 h-5" style={{ color: study.accent }} />
                        </motion.div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-serif text-[2rem] md:text-[2.5rem] font-bold mb-2 tracking-tight text-[#2D6A4F] leading-none">
                        {study.title}
                    </h3>
                    <p className="text-[15px] font-bold mb-5" style={{ color: study.accent }}>
                        {study.subtitle}
                    </p>
                    <p className="text-[15px] leading-relaxed mb-8 text-gray-500 font-medium">
                        {study.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        {study.stats.map((stat, i) => (
                            <StatPill key={stat.label} stat={stat} accent={study.accent} delay={i * 0.07} />
                        ))}
                    </div>

                    {/* CTA */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <Link to={study.href} onClick={(e) => e.stopPropagation()}>
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 text-white shadow-md"
                                        style={{ background: study.accent }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        {study.ctaText}
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isActive && (
                        <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400 group-hover:text-[#2D6A4F] transition-colors">
                            <span>Click to explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

const CaseStudiesSection = () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className="relative py-24 overflow-hidden bg-brand-light-bg font-sans"
        >
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-40 bg-brand-badge-bg" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-30 bg-orange-100" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1400px]">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-20"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 border border-[#c4e0d4]/50 bg-brand-badge-bg"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-badge-text opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-badge-text" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-badge-text">
                            Real Builds. Real Impact.
                        </span>
                    </motion.div>

                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] mb-6 leading-[1.15] tracking-[-0.01em]">
                        Products We've{' '}
                        <span className="relative inline-block text-[#336B55]">
                            Already Built
                        </span>
                        <br />
                        <span className="text-2xl md:text-3xl font-medium text-gray-500 tracking-normal mt-2 block font-sans">
                            — and can build for you.
                        </span>
                    </h2>

                    <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium">
                        These aren't concepts. These are live, deployed products built by Frostrek — 
                        proof that we deliver complex, production-grade systems. 
                        If you have a bold idea, we have the team to build it.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
                    {caseStudies.map((study, index) => (
                        <CaseStudyCard
                            key={study.id}
                            study={study}
                            index={index}
                            isActive={activeId === study.id}
                            onClick={() =>
                                setActiveId(activeId === study.id ? null : study.id)
                            }
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="max-w-4xl mx-auto text-center p-10 md:p-12 rounded-[2.5rem] border border-[#E6EFE6] bg-white shadow-[0_20px_50px_rgba(45,106,79,0.03)]"
                >
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4 text-[#2D6A4F]">
                        Have a bold idea? We'll build it.
                    </h3>
                    <p className="text-[15px] mb-8 text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        From Web3 platforms to AI-powered factory systems — if you can imagine it, 
                        our team can architect and ship it. Let's talk about your project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[15px] bg-[#2D6A4F] text-white transition-all hover:bg-[#1E4D38] shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                            >
                                Start Your Project
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[15px] border-2 border-gray-200 transition-all flex items-center justify-center gap-2 text-gray-700 hover:border-[#2D6A4F] hover:bg-gray-50"
                            >
                                View All Products
                                <ChevronRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CaseStudiesSection;
