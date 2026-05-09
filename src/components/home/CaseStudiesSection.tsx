import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Zap, Trophy, Factory, Globe,
    TrendingUp, DollarSign, Database, Cpu, ExternalLink, ChevronRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const caseStudies = [
    {
        id: 'pcc-marketplace',
        href: '/products/pcc-marketplace',
        tag: 'Web3 · Sports · Blockchain',
        badge: 'Live Build',
        icon: Trophy,
        title: 'PCC Marketplace',
        subtitle: 'Sports Merchandise Meets Blockchain',
        description:
            'A multi-tenant Web3 e-commerce ecosystem for global sports clubs — powered by Circle programmable wallets, $PCC token payments, and automated on-chain treasury settlement. Built from scratch.',
        stats: [
            { value: 'Multi', label: 'Club Storefronts', icon: Globe },
            { value: '$PCC', label: 'Token Payments', icon: Zap },
            { value: 'Auto', label: 'On-chain Settlement', icon: Cpu },
            { value: 'Polygon', label: 'Blockchain Network', icon: Database },
        ],
        accent: '#2EE1C7',
        gradient: 'from-[#2EE1C7]/20 via-[#1CB8A1]/10 to-transparent',
        borderGlow: 'shadow-[0_0_60px_rgba(46,225,199,0.15)]',
        glowColor: 'rgba(46,225,199,0.2)',
        ctaText: 'View Case Study',
    },
    {
        id: 'saf-manufacturing',
        href: '/products/saf-manufacturing',
        tag: 'Manufacturing · AI · IoT',
        badge: 'Live Deployment',
        icon: Factory,
        title: 'SAF Manufacturing',
        subtitle: 'AI Intelligence for a 24/7 Factory',
        description:
            'Unified 4 disconnected factory systems into a real-time AI intelligence platform — live sensor dashboards, automated cost analytics, and an OR-Tools AI scheduler recovering 25+ tonnes of lost production weekly.',
        stats: [
            { value: '4', label: 'Systems Unified', icon: Database },
            { value: '30s', label: 'Live Sensor Refresh', icon: Zap },
            { value: '25t', label: 'Weekly Recovery', icon: TrendingUp },
            { value: 'R19.5M', label: 'Annual Value Recovered', icon: DollarSign },
        ],
        accent: '#F59E0B',
        gradient: 'from-[#F59E0B]/20 via-[#D97706]/10 to-transparent',
        borderGlow: 'shadow-[0_0_60px_rgba(245,158,11,0.15)]',
        glowColor: 'rgba(245,158,11,0.2)',
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
    const { theme } = useTheme();
    const Icon = stat.icon;
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.4, ease: 'easeOut' }}
            className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl border backdrop-blur-sm ${
                theme === 'dark'
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white/80 border-gray-200'
            }`}
        >
            <Icon className="w-4 h-4 mb-0.5" style={{ color: accent }} />
            <span className="text-xl font-black" style={{ color: accent }}>
                {stat.value}
            </span>
            <span
                className={`text-[10px] font-medium text-center leading-tight ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
            >
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
    const { theme } = useTheme();
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
                className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-500 ${
                    isActive ? study.borderGlow : ''
                } ${
                    theme === 'dark'
                        ? `bg-[#0D0D0D] ${isActive ? 'border-white/20' : 'border-white/8 hover:border-white/15'}`
                        : `bg-white ${isActive ? 'border-gray-300' : 'border-gray-200 hover:border-gray-300'}`
                }`}
            >
                {/* Animated gradient background */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${study.gradient} transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
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
                            className="absolute top-0 left-0 w-full h-1 origin-left"
                            style={{ background: study.accent }}
                        />
                    )}
                </AnimatePresence>

                <div className="relative p-7 md:p-8">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-4">
                            {/* Icon */}
                            <motion.div
                                animate={isActive ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                                className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                                style={{ background: `${study.glowColor}` }}
                            >
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 1, opacity: 0.5 }}
                                        animate={{ scale: 1.6, opacity: 0 }}
                                        transition={{ duration: 1.8, repeat: Infinity }}
                                        className="absolute inset-0 rounded-2xl"
                                        style={{ background: study.accent }}
                                    />
                                )}
                                <Icon className="w-7 h-7 relative z-10" style={{ color: study.accent }} />
                            </motion.div>

                            <div>
                                {/* Live Badge */}
                                <div className="flex items-center gap-2 mb-1">
                                    <span
                                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                        style={{
                                            background: `${study.glowColor}`,
                                            color: study.accent,
                                            border: `1px solid ${study.accent}40`,
                                        }}
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                                            style={{ background: study.accent }}
                                        />
                                        {study.badge}
                                    </span>
                                </div>
                                <p
                                    className={`text-xs font-medium ${
                                        theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                                    }`}
                                >
                                    {study.tag}
                                </p>
                            </div>
                        </div>

                        <motion.div
                            animate={{ x: isActive ? 0 : -6, opacity: isActive ? 1 : 0 }}
                            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                                theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
                            }`}
                        >
                            <ChevronRight className="w-4 h-4" style={{ color: study.accent }} />
                        </motion.div>
                    </div>

                    {/* Title & Description */}
                    <h3
                        className={`text-2xl md:text-3xl font-black mb-2 tracking-tight ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                        {study.title}
                    </h3>
                    <p className="text-sm font-semibold mb-3" style={{ color: study.accent }}>
                        {study.subtitle}
                    </p>
                    <p
                        className={`text-sm leading-relaxed mb-6 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                        {study.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-2 mb-6">
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
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                                        style={{
                                            background: study.accent,
                                            color: '#000',
                                        }}
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
                        <div
                            className={`flex items-center gap-2 text-sm font-semibold ${
                                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                            } group-hover:opacity-100 transition-opacity`}
                        >
                            <span>Click to explore</span>
                            <ArrowRight className="w-3 h-3" />
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

const CaseStudiesSection = () => {
    const { theme } = useTheme();
    const [activeId, setActiveId] = useState<string | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section
            ref={sectionRef}
            className={`relative py-24 overflow-hidden transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#080808]' : 'bg-gray-50'
            }`}
        >
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-[#2EE1C7]" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 bg-[#F59E0B]" />
                {/* Grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-16"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 border ${
                            theme === 'dark'
                                ? 'bg-white/5 border-white/10'
                                : 'bg-white border-gray-200'
                        }`}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2EE1C7] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2EE1C7]" />
                        </span>
                        <span
                            className={`text-xs font-bold uppercase tracking-widest ${
                                theme === 'dark' ? 'text-[#2EE1C7]' : 'text-[#2EE1C7]'
                            }`}
                        >
                            Real Builds. Real Impact.
                        </span>
                    </motion.div>

                    <h2
                        className={`text-3xl md:text-5xl font-black mb-5 leading-tight ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                        Products We've{' '}
                        <span className="relative inline-block">
                            <span className="text-[#2EE1C7]">Already Built</span>
                        </span>
                        <br />
                        <span
                            className={`text-2xl md:text-3xl font-semibold ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}
                        >
                            — and can build for you.
                        </span>
                    </h2>

                    <p
                        className={`max-w-2xl mx-auto text-base md:text-lg ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                        These aren't concepts. These are live, deployed products built by Frostrek — 
                        proof that we deliver complex, production-grade systems. 
                        If you have a bold idea, we have the team to build it.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
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
                    className={`max-w-3xl mx-auto text-center p-8 rounded-3xl border-2 border-dashed ${
                        theme === 'dark'
                            ? 'border-[#2EE1C7]/30 bg-[#2EE1C7]/5'
                            : 'border-[#2EE1C7]/40 bg-[#2EE1C7]/5'
                    }`}
                >
                    <div className="text-3xl mb-3">🚀</div>
                    <h3
                        className={`text-xl md:text-2xl font-black mb-3 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                    >
                        Have a bold idea? We'll build it.
                    </h3>
                    <p
                        className={`text-sm mb-6 ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                        From Web3 platforms to AI-powered factory systems — if you can imagine it, 
                        our team can architect and ship it. Let's talk about your project.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-[#2EE1C7] text-black transition-all hover:bg-[#2EE1C7]/90 hover:shadow-lg hover:shadow-[#2EE1C7]/30 flex items-center gap-2"
                            >
                                Start Your Project
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </Link>
                        <Link to="/products">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`px-8 py-3.5 rounded-2xl font-bold text-sm border transition-all flex items-center gap-2 ${
                                    theme === 'dark'
                                        ? 'border-white/20 text-white hover:border-white/40'
                                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                }`}
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
