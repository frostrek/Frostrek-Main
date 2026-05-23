import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Play, ChevronRight } from 'lucide-react';

interface Solution {
    id: string;
    name: string;
    description: string;
    shortDesc: string;
    icon: React.ElementType;
    href: string;
    features: string[];
}

import { Bot, Factory, Trophy, Layers, Mic } from 'lucide-react';

const solutions: Solution[] = [
    {
        id: 'manufacturing-intelligence',
        name: 'Manufacturing Intelligence',
        description: 'Real-time factory optimization and production AI.',
        shortDesc: 'Unify factory telemetry, ERP data, and AI scheduling into a single pane of glass.',
        icon: Factory,
        href: '/solutions/manufacturing-intelligence',
        features: ['Live Telemetry', 'AI Scheduling', 'Cost Intelligence']
    },
    {
        id: 'ai-agents',
        name: 'AI Agents',
        description: 'Intelligent, autonomous AI agents built for your business workflows.',
        shortDesc: 'We design and deploy custom AI agents that think, respond, and act.',
        icon: Bot,
        href: '/solutions/ai-agents',
        features: ['Voice Agents', 'Workflow Automation', 'Domain-Specific']
    },
    {
        id: 'voice-ai',
        name: 'Voice AI',
        description: 'Custom Voice AI systems for high-volume inbound and outbound calls.',
        shortDesc: 'Every Call Handled. Every Lead Followed Up. Always On.',
        icon: Mic,
        href: '/solutions/voice-ai',
        features: ['Inbound Agents', 'Outbound Campaigns', 'IVR Replacement']
    },
    {
        id: 'multivendor-dashboard',
        name: 'Multivendor Dashboard',
        description: 'Consolidated automated command center for e-commerce.',
        shortDesc: 'Unify revenue, inventory, and orders across all storefronts into one dashboard.',
        icon: Layers,
        href: '/solutions/multivendor-dashboard',
        features: ['Multi-Channel Sync', 'Automated Pricing', 'Predictive Restocking']
    },
    {
        id: 'fintech-custom-wallets',
        name: 'Fintech & Custom Wallets',
        description: 'Centralised closed-loop digital loyalty currencies to bypass commissions.',
        shortDesc: 'A closed-loop digital currency engineered specifically for sports fans and affiliated clubs.',
        icon: Trophy,
        href: '/solutions/fintech-custom-wallets',
        features: ['0% Gateway Fees', 'Closed-Loop Ecosystem', 'Instant Onboarding']
    }
];

// Animated Solution Card with Hover Expansion
const SolutionCard = ({ solution, index, isActive, onClick }: {
    solution: Solution;
    index: number;
    isActive: boolean;
    onClick: () => void;
}) => {
    const IconComponent = solution.icon as any;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={onClick}
            className={`relative cursor-pointer group ${isActive ? 'z-20' : 'z-10'}`}
        >
            {/* Card */}
            <motion.div
                layout
                className={`relative overflow-hidden rounded-2xl border transition-all duration-500 bg-white border-gray-150 ${isActive ? 'border-[#2D6A4F] shadow-2xl shadow-[#2D6A4F]/10' : 'hover:border-[#2D6A4F]/35 hover:shadow-xl'
                    }`}
            >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#E8F5EE]/40 to-transparent" />

                {/* Active Indicator */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            className="absolute top-0 left-0 w-full h-1 origin-left bg-[#2D6A4F]"
                        />
                    )}
                </AnimatePresence>

                <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        {/* Icon with animated ring */}
                        <motion.div
                            className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-[#E8F5EE] border border-[#2D6A4F]/10"
                            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                        >
                            {/* Pulse ring when active */}
                            {isActive && (
                                <motion.div
                                    initial={{ scale: 1, opacity: 0.5 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute inset-0 rounded-2xl bg-[#2D6A4F]"
                                />
                            )}
                            <IconComponent className="w-7 h-7 relative z-10 text-[#2D6A4F]" />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                            <h4 className={`text-lg font-serif font-bold mb-1 transition-colors duration-300 ${isActive ? 'text-[#2D6A4F]' : 'text-gray-900 group-hover:text-[#2D6A4F]'}`}>
                                {solution.name}
                            </h4>
                            {/* FIXED: high-contrast text-slate-500 prevents white-on-white text issues */}
                            <p className="text-sm text-slate-500 font-medium font-body leading-relaxed">
                                {solution.description}
                            </p>
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                            animate={{ x: isActive ? 0 : -5, opacity: isActive ? 1 : 0 }}
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#E8F5EE]"
                        >
                            <ChevronRight className="w-4 h-4 text-[#2D6A4F]" />
                        </motion.div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm text-slate-600 font-medium mb-4 font-body leading-relaxed">
                                        {solution.shortDesc}
                                    </p>

                                    {/* Feature Pills */}
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {solution.features.map((feature, i) => (
                                            <motion.span
                                                key={feature}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="px-3 py-1.5 rounded-full text-xs font-semibold font-body bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/15"
                                            >
                                                {feature}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <Link to={solution.href}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 bg-[#2D6A4F] text-white hover:bg-[#1B4332] shadow-sm hover:shadow"
                                        >
                                            <Play className="w-3.5 h-3.5 fill-current" />
                                            Explore {solution.name.split(' ').slice(-1)[0]}
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};


export const AllSolutionsSection = () => {
    const [activeSolution, setActiveSolution] = useState<string | null>(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="py-24 relative overflow-hidden transition-colors bg-gradient-to-b from-gray-50/50 to-white font-body"
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl bg-[#E8F5EE]/40"
                />
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.15, 1]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute bottom-40 left-10 w-80 h-80 rounded-full blur-3xl bg-[#E8F5EE]/30"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-[#E8F5EE] border border-[#2D6A4F]/15"
                    >
                        <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
                            Industry Solutions
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black mb-5 text-gray-900 leading-tight">
                        Explore Our{' '}
                        <span className="text-[#2D6A4F]">AI Solutions</span>
                    </h2>
                    {/* FIXED: high-contrast text-slate-600 ensures subtitle text is perfectly visible */}
                    <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-medium font-body leading-relaxed">
                        Click on any solution to explore how AI can transform your industry
                    </p>
                </motion.div>

                {/* Solutions Grid - Two Columns */}
                <div className="max-w-5xl mx-auto">
                    {/* Category Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <div className="w-1.5 h-7 rounded-full bg-[#2D6A4F]" />
                        <span className="text-xs font-black uppercase tracking-wider text-[#2D6A4F]">
                            By Industry
                        </span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {solutions.slice(0, 1).map((solution) => (
                                <div key={solution.id}>
                                    <SolutionCard
                                        solution={solution}
                                        index={0}
                                        isActive={activeSolution === solution.id}
                                        onClick={() => setActiveSolution(activeSolution === solution.id ? null : solution.id)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4 flex flex-col justify-center">
                            {/* CTA Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 }}
                                className="p-6 rounded-2xl border-2 border-dashed border-[#2D6A4F]/20 bg-[#E8F5EE]/10"
                            >
                                <div className="text-center">
                                    <h4 className="font-serif font-bold text-gray-900 mb-1.5 text-base">
                                        Don't See Your Industry?
                                    </h4>
                                    {/* FIXED: text-slate-500 prevents invisible description */}
                                    <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed font-body">
                                        We build custom AI solutions for any business need.
                                    </p>
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 mx-auto transition-all duration-300 bg-white border border-[#2D6A4F]/25 text-[#2D6A4F] hover:bg-[#E8F5EE] hover:border-[#2D6A4F]/40 shadow-sm"
                                        >
                                            Contact Us
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllSolutionsSection;
