import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Database, Shield, Globe,
    Check, BarChart3, Layers, Zap, Activity,
    RotateCcw, Workflow,
    PartyPopper, Rocket, Star
} from 'lucide-react';

interface FrostrekAdvantageProps {
    features?: any[];
}

const WORKFLOW_STEPS = [
    {
        id: 'input-1',
        title: 'Unstructured Data',
        subtitle: 'Raw inputs & documents',
        icon: Database,
        color: '#2D6A4F',
        outcome: { title: 'Smart Data Lake', desc: 'Auto-categorized & searchable.', stat: '99.2%', statLabel: 'Accuracy' }
    },
    {
        id: 'input-2',
        title: 'Security Threats',
        subtitle: 'Anomalies & vulnerabilities',
        icon: Shield,
        color: '#2D6A4F',
        outcome: { title: 'Threat Shield', desc: 'Real-time neutralization.', stat: '<500ms', statLabel: 'Response' }
    },
    {
        id: 'input-3',
        title: 'Global Traffic',
        subtitle: 'Network load & routing',
        icon: Globe,
        color: '#2D6A4F',
        outcome: { title: 'Edge Optimization', desc: 'Intelligent load balancing.', stat: '40%', statLabel: 'Faster' }
    }
];

// Floating Particle Component - styled with matching green theme
const FloatingParticle = ({ delay, size, duration }: { 
    delay: number; size: number; duration: number;
}) => (
    <div
        className="absolute rounded-full bg-[#2D6A4F]/25 animate-ping"
        style={{ 
            width: size, 
            height: size,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
        }}
    />
);

const CONFETTI_DATA = Array.from({ length: 15 }, (_, i) => ({
    left: Math.random() * 100,
    x: (Math.random() - 0.5) * 120,
    rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
    duration: 1.8 + Math.random(),
    color: ['#2D6A4F', '#34A853', '#1B4332', '#40916C', '#52B788'][i % 5],
}));

const Confetti = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        {CONFETTI_DATA.map((data, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                    left: `${data.left}%`,
                    top: '-10px',
                    backgroundColor: data.color,
                }}
                animate={{
                    y: ['0%', '600%'],
                    x: [0, data.x],
                    rotate: [0, data.rotate],
                    opacity: [1, 0],
                }}
                transition={{ duration: data.duration, delay: i * 0.04, ease: 'easeOut' }}
            />
        ))}
    </div>
);

export const FrostrekAdvantage = ({ features: _features }: FrostrekAdvantageProps) => {
    const [processedIds, setProcessedIds] = useState<string[]>([]);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [pulseCore, setPulseCore] = useState(false);

    const processItem = useCallback((id: string) => {
        if (processedIds.includes(id) || processingId) return;

        setProcessingId(id);
        setPulseCore(true);

        setTimeout(() => {
            setProcessedIds(prev => {
                const newIds = [...prev, id];
                if (newIds.length === WORKFLOW_STEPS.length) {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 3000);
                }
                return newIds;
            });
            setProcessingId(null);
            setPulseCore(false);
        }, 1500);
    }, [processedIds, processingId]);

    const resetAll = () => {
        setProcessedIds([]);
        setProcessingId(null);
        setShowConfetti(false);
    };

    const allProcessed = processedIds.length === WORKFLOW_STEPS.length;
    const isActive = processedIds.length > 0 || processingId;

    return (
        <section className="py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white font-body">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header with Animated Badge */}
                <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] cursor-default"
                    >
                        <div className="animate-pulse">
                            <Workflow size={13} />
                        </div>
                        <span>Interactive Sandbox</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-serif font-black text-gray-900 leading-tight"
                    >
                        The Frostrek <span className="text-[#2D6A4F]">Advantage</span>
                    </motion.h2>

                    {/* FIXED: high-contrast text-slate-600 ensures descriptions are perfectly readable */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-sm sm:text-base text-slate-600 font-medium font-body max-w-xl mx-auto"
                    >
                        Click any challenge card to watch our AI transform it into a solution ✨
                    </motion.p>
                </div>

                {/* Main Interface Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative max-w-6xl mx-auto"
                >
                    {showConfetti && <Confetti />}

                    <div className="rounded-3xl border shadow-xl overflow-hidden bg-white border-[#2D6A4F]/15">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px_1fr]">

                            {/* LEFT COLUMN: Input Challenges */}
                            <div className="p-6 md:p-8 bg-[#FAFCFB] border-b lg:border-b-0 lg:border-r border-[#2D6A4F]/10">
                                <div className="flex items-center gap-3 mb-6">
                                    <motion.div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md bg-[#2D6A4F] text-white"
                                        whileHover={{ rotate: 8 }}
                                    >
                                        <Layers size={18} />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-base font-serif font-bold text-gray-950 leading-tight">Challenges</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Click to process</p>
                                    </div>
                                </div>

                                <div className="space-y-3.5">
                                    {WORKFLOW_STEPS.map((step, idx) => {
                                        const isProcessed = processedIds.includes(step.id);
                                        const isProcessing = processingId === step.id;

                                        return (
                                            <motion.button
                                                key={step.id}
                                                onClick={() => processItem(step.id)}
                                                disabled={isProcessed || !!processingId}
                                                initial={{ opacity: 0, x: -30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
                                                whileHover={!isProcessed && !processingId ? {
                                                    scale: 1.02,
                                                    x: 5,
                                                    boxShadow: '0 8px 30px rgba(45, 106, 79, 0.06)'
                                                } : {}}
                                                whileTap={!isProcessed && !processingId ? { scale: 0.98 } : {}}
                                                className={`
                                                    relative w-full p-4.5 rounded-2xl border-2 text-left transition-all duration-300 overflow-hidden group
                                                    ${isProcessed
                                                        ? 'bg-[#E8F5EE]/40 border-[#2D6A4F]'
                                                        : isProcessing
                                                            ? 'bg-[#E8F5EE]/60 border-[#2D6A4F] shadow-md'
                                                            : 'bg-white border-gray-150 hover:border-[#2D6A4F]/35 cursor-pointer'}
                                                `}
                                            >
                                                <div className="relative flex items-center gap-3.5">
                                                    <motion.div
                                                        className={`
                                                            w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-sm
                                                            ${isProcessed || isProcessing
                                                                ? 'bg-[#2D6A4F] text-white'
                                                                : 'bg-[#E8F5EE] text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white'}
                                                        `}
                                                        animate={isProcessing ? { rotate: [0, 5, -5, 0] } : {}}
                                                        transition={{ duration: 0.3, repeat: isProcessing ? Infinity : 0 }}
                                                    >
                                                        {isProcessing ? (
                                                            <div className="animate-spin">
                                                                <Activity size={18} />
                                                            </div>
                                                        ) : isProcessed ? (
                                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                                <Check size={18} />
                                                            </motion.div>
                                                        ) : (
                                                            <step.icon size={18} />
                                                        )}
                                                    </motion.div>

                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-serif font-bold text-sm text-gray-900 leading-tight">{step.title}</h4>
                                                        {/* FIXED: text-slate-500 prevents invisible subtitle */}
                                                        <p className="text-xs text-slate-500 font-medium mt-0.5">{step.subtitle}</p>
                                                    </div>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>

                                {/* Progress Bar block */}
                                <div className="mt-6 pt-5 border-t border-gray-150/80">
                                    <div className="flex items-center justify-between text-xs mb-2.5 font-bold text-slate-500">
                                        <span>{processedIds.length}/{WORKFLOW_STEPS.length} Completed</span>
                                        {processedIds.length > 0 && (
                                            <motion.button
                                                onClick={resetAll}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex items-center gap-1 font-bold text-[#2D6A4F] hover:underline cursor-pointer"
                                            >
                                                <RotateCcw size={13} /> Reset
                                            </motion.button>
                                        )}
                                    </div>
                                    <div className="relative w-full h-2 rounded-full overflow-hidden bg-gray-100">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 rounded-full bg-[#2D6A4F]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(processedIds.length / WORKFLOW_STEPS.length) * 100}%` }}
                                            transition={{ type: 'spring', stiffness: 100 }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CENTER COLUMN: AI Core Platform Node */}
                            <div className="relative flex items-center justify-center py-12 lg:py-0 bg-white border-b lg:border-b-0 lg:border-r border-[#2D6A4F]/10">
                                {/* Glowing particles */}
                                {isActive && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {[...Array(6)].map((_, i) => (
                                            <FloatingParticle 
                                                key={i} 
                                                delay={i * 0.25} 
                                                size={4 + (i % 3) * 2} 
                                                duration={1.8 + (i % 3) * 0.4}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Central Core Container */}
                                <motion.div
                                    animate={{
                                        scale: pulseCore ? [1, 1.05, 1] : 1,
                                        boxShadow: processingId
                                            ? ['0 0 0px rgba(45,106,79,0)', '0 0 40px rgba(45,106,79,0.25)', '0 0 0px rgba(45,106,79,0)']
                                            : allProcessed
                                                ? '0 0 40px rgba(45,106,79,0.15)'
                                                : '0 8px 30px rgba(0,0,0,0.03)'
                                    }}
                                    transition={{ duration: 0.8, repeat: pulseCore ? Infinity : 0 }}
                                    className={`
                                        relative w-36 h-36 lg:w-40 lg:h-40 rounded-full flex items-center justify-center border-4 transition-all duration-300
                                        ${allProcessed
                                            ? 'bg-white border-[#2D6A4F] shadow-lg'
                                            : 'bg-white border-[#2D6A4F]/25 shadow-md'}
                                    `}
                                >
                                    {/* Spinner animation */}
                                    <AnimatePresence>
                                        {processingId && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute inset-1.5"
                                            >
                                                <div className="w-full h-full rounded-full border-[3px] border-transparent border-t-[#2D6A4F] border-r-[#2D6A4F]/30 animate-spin" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="text-center z-10 p-2">
                                        <motion.div
                                            animate={{
                                                scale: processingId ? [1, 1.1, 1] : allProcessed ? [1, 1.05, 1] : 1,
                                                rotate: processingId ? [0, 3, -3, 0] : 0
                                            }}
                                            transition={{ duration: 0.5, repeat: (processingId || allProcessed) ? Infinity : 0 }}
                                            className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center shadow-md mb-1.5 bg-[#2D6A4F] text-white"
                                        >
                                            {allProcessed ? (
                                                <PartyPopper className="w-6 h-6" />
                                            ) : processingId ? (
                                                <Zap className="w-6 h-6" />
                                            ) : (
                                                <Sparkles className="w-6 h-6 animate-pulse" />
                                            )}
                                        </motion.div>

                                        <h4 className="font-serif font-bold text-xs text-gray-900">
                                            {allProcessed ? 'Complete!' : processingId ? 'Processing' : 'AI Core'}
                                        </h4>

                                        <motion.div
                                            className={`
                                                mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold border
                                                ${processingId || allProcessed
                                                    ? 'bg-[#E8F5EE] text-[#2D6A4F] border-[#2D6A4F]/20'
                                                    : 'bg-gray-50 text-slate-400 border-gray-200'}
                                            `}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full bg-[#2D6A4F] ${processingId ? 'animate-ping' : ''}`} />
                                            {processingId ? 'Working...' : allProcessed ? 'Done!' : 'Ready'}
                                        </motion.div>
                                    </div>

                                    {/* Counter Badge */}
                                    <motion.div
                                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shadow-md bg-[#2D6A4F] text-white"
                                        animate={{ scale: processedIds.length > 0 ? [1, 1.15, 1] : 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {processedIds.length}
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* RIGHT COLUMN: AI Outcomes */}
                            <div className="p-6 md:p-8 bg-[#FAFCFB]">
                                <div className="flex items-center gap-3 mb-6">
                                    <motion.div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md bg-[#2D6A4F] text-white"
                                        whileHover={{ rotate: -8 }}
                                    >
                                        <BarChart3 size={18} />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-base font-serif font-bold text-gray-950 leading-tight">AI Outcomes</h3>
                                        {/* FIXED: high-contrast text-slate-500 */}
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{processedIds.length} generated</p>
                                    </div>
                                </div>

                                <div className="space-y-3.5 min-h-[210px]">
                                    <AnimatePresence mode="popLayout">
                                        {processedIds.map((id, idx) => {
                                            const item = WORKFLOW_STEPS.find(s => s.id === id);
                                            if (!item) return null;

                                            return (
                                                <motion.div
                                                    key={id}
                                                    initial={{ opacity: 0, x: 40, scale: 0.9 }}
                                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ type: 'spring', stiffness: 300, damping: 25, delay: idx * 0.05 }}
                                                    whileHover={{ scale: 1.01, y: -2 }}
                                                    className="p-4 rounded-2xl border-2 shadow-sm bg-white border-emerald-100 hover:border-[#2D6A4F]/25 hover:shadow-md transition-all duration-300"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#E8F5EE] text-[#2D6A4F] shrink-0">
                                                            <Zap size={16} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-serif font-bold text-sm text-gray-900 leading-tight">{item.outcome.title}</h4>
                                                            {/* FIXED: high-contrast text-slate-500 */}
                                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.outcome.desc}</p>
                                                            <div className="mt-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#E8F5EE] border border-[#2D6A4F]/15">
                                                                <span className="text-xs font-extrabold text-[#2D6A4F]">{item.outcome.stat}</span>
                                                                <span className="text-[10px] text-slate-400 font-medium">{item.outcome.statLabel}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>

                                    {/* Empty State */}
                                    {processedIds.length === 0 && !processingId && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="h-[210px] flex items-center justify-center rounded-2xl border-2 border-dashed border-[#2D6A4F]/15 bg-white"
                                        >
                                            <div className="text-center p-4">
                                                <div className="w-11 h-11 rounded-full mx-auto mb-3.5 flex items-center justify-center bg-[#E8F5EE] text-[#2D6A4F] animate-bounce">
                                                    <Rocket size={18} />
                                                </div>
                                                {/* FIXED: high-contrast text-slate-600 & text-slate-400 */}
                                                <p className="text-xs font-extrabold text-slate-600">Ready to launch</p>
                                                <p className="text-[10px] mt-1 text-slate-400 font-medium">Click a challenge to begin</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Loading State */}
                                    {processingId && processedIds.length === 0 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="h-[210px] flex items-center justify-center rounded-2xl border bg-[#E8F5EE]/40 border-[#2D6A4F]/20"
                                        >
                                            <div className="text-center p-4">
                                                <div className="w-10 h-10 rounded-full mx-auto mb-3 flex items-center justify-center bg-white shadow-sm">
                                                    <Activity className="text-[#2D6A4F] animate-spin" size={18} />
                                                </div>
                                                <p className="text-xs font-bold text-[#2D6A4F]">Generating solution...</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16"
                    >
                        {[
                            { icon: Zap, label: 'Processing', value: '<50ms' },
                            { icon: Star, label: 'Accuracy', value: '99.7%' },
                            { icon: Rocket, label: 'Uptime', value: '99.99%' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                className="text-center flex items-center gap-3.5 group cursor-default"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#E8F5EE] border border-[#2D6A4F]/10 group-hover:bg-[#2D6A4F] group-hover:text-white text-[#2D6A4F] transition-colors duration-300 shadow-sm">
                                    <stat.icon size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-lg md:text-xl font-serif font-bold text-gray-950 leading-none mb-1">{stat.value}</p>
                                    {/* FIXED: high-contrast text-slate-500 */}
                                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 leading-none">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default FrostrekAdvantage;
