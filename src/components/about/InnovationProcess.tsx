import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal,
    Bot,
    CheckCircle2,
    Activity,
    Sparkles,
    ShieldAlert
} from 'lucide-react';

interface ProcessStep {
    id: string;
    label: string;
    title: string;
    description: string;
    bullets: string[];
    icon: string;
    tabColor: string;
    tabColorActive: string;
    activeBorder: string;
    textColor: string;
    iconBgActive: string;
    iconBorderActive: string;
    shadow: string;
    rightBgGradient: string;
    simBg: string;
    simHeaderBorder: string;
    simTitleColor: string;
    simBorder: string;
    simBadgeBg: string;
    simBadgeDot: string;
    simBulletIcon: string;
}

const STEPS: ProcessStep[] = [
    {
        id: 'research',
        label: 'PHASE 01',
        title: 'Deep Research & Blueprinting',
        description: 'We perform deep analysis of your operational workflows to identify custom agentic opportunities and draft the technical architecture blueprint.',
        bullets: [
            'Enterprise workflow mapping',
            'SLA & accuracy requirement profiling',
            'LLM model viability assessment',
            'Custom data connector checklist'
        ],
        icon: '/icons/innovation.png',
        tabColor: 'bg-[#FFF7ED]',
        tabColorActive: 'bg-[#FFEDD5]',
        activeBorder: 'border-[#F97316]/20',
        textColor: 'text-[#F97316]',
        iconBgActive: 'bg-[#F97316]',
        iconBorderActive: 'border-[#F97316]',
        shadow: 'shadow-[0_10px_30px_rgba(249,115,22,0.08)]',
        rightBgGradient: 'bg-gradient-to-br from-white via-white to-[#FFF7ED]/35',
        simBg: 'bg-gradient-to-r from-[#FFF7ED]/80 to-transparent border-[#F97316]/20 shadow-[0_4px_20px_rgba(249,115,22,0.02)]',
        simHeaderBorder: 'border-[#F97316]/15',
        simTitleColor: 'text-[#F97316]',
        simBorder: 'border-[#F97316]/10',
        simBadgeBg: 'bg-[#FFF7ED] border-[#F97316]/20 text-[#F97316]',
        simBadgeDot: 'bg-[#F97316]',
        simBulletIcon: 'text-[#F97316]'
    },
    {
        id: 'architecture',
        label: 'PHASE 02',
        title: 'Multi-Agent System Architecture',
        description: 'Our engineers design and assemble dedicated specialized agents (Voice, Chat, Backend, and RAG) that communicate natively with each other to complete workflows.',
        bullets: [
            'Defining agent-to-agent communication layers',
            'Setting up isolated tools and action schemas',
            'Connecting context retrieval databases',
            'Configuring fallback safety guardrails'
        ],
        icon: '/icons/architecture.png',
        tabColor: 'bg-[#F0F9FF]',
        tabColorActive: 'bg-[#E0F2FE]',
        activeBorder: 'border-[#0284C7]/20',
        textColor: 'text-[#0284C7]',
        iconBgActive: 'bg-[#0284C7]',
        iconBorderActive: 'border-[#0284C7]',
        shadow: 'shadow-[0_10px_30px_rgba(2,132,199,0.08)]',
        rightBgGradient: 'bg-gradient-to-br from-white via-white to-[#F0F9FF]/35',
        simBg: 'bg-gradient-to-r from-[#F0F9FF]/80 to-transparent border-[#0284C7]/20 shadow-[0_4px_20px_rgba(2,132,199,0.02)]',
        simHeaderBorder: 'border-[#0284C7]/15',
        simTitleColor: 'text-[#0284C7]',
        simBorder: 'border-[#0284C7]/10',
        simBadgeBg: 'bg-[#F0F9FF] border-[#0284C7]/20 text-[#0284C7]',
        simBadgeDot: 'bg-[#0284C7]',
        simBulletIcon: 'text-[#0284C7]'
    },
    {
        id: 'validation',
        label: 'PHASE 03',
        title: 'Sandbox Validation & Safety Filters',
        description: 'We deploy the system inside an enterprise-grade sandbox, putting the AI agents through thousands of automated high-load stress tests.',
        bullets: [
            'Prompt injection protection checks',
            'Adversarial safety guardrail tuning',
            'Accuracy benchmarking (goal: >98%)',
            'Latency & load optimization'
        ],
        icon: '/icons/shield.png',
        tabColor: 'bg-[#F0FDF4]',
        tabColorActive: 'bg-[#DCFCE7]',
        activeBorder: 'border-[#2D6A4F]/20',
        textColor: 'text-[#2D6A4F]',
        iconBgActive: 'bg-[#2D6A4F]',
        iconBorderActive: 'border-[#2D6A4F]',
        shadow: 'shadow-[0_10px_30px_rgba(45,106,79,0.08)]',
        rightBgGradient: 'bg-gradient-to-br from-white via-white to-[#F0FDF4]/35',
        simBg: 'bg-gradient-to-r from-[#F0FDF4]/80 to-transparent border-[#2D6A4F]/20 shadow-[0_4px_20px_rgba(45,106,79,0.02)]',
        simHeaderBorder: 'border-[#2D6A4F]/15',
        simTitleColor: 'text-[#2D6A4F]',
        simBorder: 'border-[#2D6A4F]/10',
        simBadgeBg: 'bg-[#F0FDF4] border-[#2D6A4F]/20 text-[#2D6A4F]',
        simBadgeDot: 'bg-[#2D6A4F]',
        simBulletIcon: 'text-[#2D6A4F]'
    },
    {
        id: 'scaling',
        label: 'PHASE 04',
        title: 'Production Scaling & Analytics',
        description: 'We go live with automated auto-scaling cloud infrastructure, complete with real-time semantic monitoring dashboards and telemetry.',
        bullets: [
            'Auto-scaling Kubernetes deployment',
            'Real-time semantic trace logs dashboard',
            'Feedback loop integration',
            'Continuous post-deploy training'
        ],
        icon: '/icons/data-analytics.png',
        tabColor: 'bg-[#FEF2F2]',
        tabColorActive: 'bg-[#FEE2E2]',
        activeBorder: 'border-[#E11D48]/20',
        textColor: 'text-[#E11D48]',
        iconBgActive: 'bg-[#E11D48]',
        iconBorderActive: 'border-[#E11D48]',
        shadow: 'shadow-[0_10px_30px_rgba(225,29,72,0.08)]',
        rightBgGradient: 'bg-gradient-to-br from-white via-white to-[#FEF2F2]/35',
        simBg: 'bg-gradient-to-r from-[#FEF2F2]/80 to-transparent border-[#E11D48]/20 shadow-[0_4px_20px_rgba(225,29,72,0.02)]',
        simHeaderBorder: 'border-[#E11D48]/15',
        simTitleColor: 'text-[#E11D48]',
        simBorder: 'border-[#E11D48]/10',
        simBadgeBg: 'bg-[#FEF2F2] border-[#E11D48]/20 text-[#E11D48]',
        simBadgeDot: 'bg-[#E11D48]',
        simBulletIcon: 'text-[#E11D48]'
    }
];

const InnovationProcess = () => {
    const [activeStep, setActiveStep] = useState<string>('research');
    const currentStepIndex = STEPS.findIndex(s => s.id === activeStep);
    const activeData = STEPS[currentStepIndex];

    // Auto rotate steps every 12 seconds unless hovered/interacted
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const interval = setInterval(() => {
            const nextIndex = (currentStepIndex + 1) % STEPS.length;
            setActiveStep(STEPS[nextIndex].id);
        }, 12000);
        return () => clearInterval(interval);
    }, [currentStepIndex, paused]);

    return (
        <div
            className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch max-w-7xl mx-auto text-left"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Left side: Interactive Timeline Control */}
            <div className="lg:col-span-5 flex lg:flex-col justify-start lg:justify-center gap-3 lg:gap-0 lg:space-y-4 overflow-x-auto pb-2 lg:pb-0 snap-x snap-mandatory scrollbar-hide">
                {STEPS.map((step) => {
                    const isSelected = step.id === activeStep;
                    return (
                        <div
                            key={step.id}
                            onClick={() => setActiveStep(step.id)}
                            className={`group relative p-3 lg:p-5 rounded-2xl cursor-pointer border-2 transition-all duration-300 flex items-center gap-3 lg:gap-4 min-w-[200px] lg:min-w-0 snap-start shrink-0 lg:shrink ${isSelected
                                ? `${step.tabColorActive} ${step.activeBorder} ${step.shadow} scale-[1.02]`
                                : `${step.tabColor} border-transparent shadow-sm hover:shadow-md hover:${step.tabColorActive}`
                                }`}
                        >
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl transition-all duration-300 shrink-0 flex items-center justify-center border bg-white border-white shadow-sm shadow-black/5 group-hover:shadow-md">
                                <img
                                    src={step.icon}
                                    alt={step.title}
                                    className={`w-6 h-6 lg:w-7 lg:h-7 object-contain transition-all duration-300 ${isSelected ? 'opacity-100 scale-105' : 'opacity-70 group-hover:opacity-100'
                                        }`}
                                />
                            </div>

                            <div className="space-y-0.5 lg:space-y-1 flex-1 min-w-0">
                                <span className={`text-[10px] font-bold tracking-widest font-body uppercase transition-colors duration-300 ${isSelected ? step.textColor : 'text-gray-400'
                                    }`}>
                                    {step.label}
                                </span>
                                <h3 className={`font-serif text-sm lg:text-lg font-bold transition-colors duration-300 leading-tight ${isSelected ? 'text-gray-950 font-black' : 'text-gray-600 group-hover:text-gray-800'
                                    }`}>
                                    {step.title}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Right side: Sandbox / Dynamic Calling Agents - Dynamic Gradient Theme */}
            <div className="lg:col-span-7">
                <div className={`rounded-3xl border border-gray-150 p-4 sm:p-6 lg:p-8 shadow-xl relative overflow-hidden h-full flex flex-col justify-between min-h-[360px] lg:min-h-[440px] transition-all duration-500 ${activeData.rightBgGradient}`}>
                    {/* Background Soft Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Window Controls Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6 flex-shrink-0 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                            <div className="w-3 h-3 rounded-full bg-green-400/80" />
                            <span className="text-xs text-gray-400 font-mono ml-2 flex items-center gap-1.5 font-bold">
                                <Terminal size={12} className={activeData.simTitleColor} /> frostrek-sandbox:~/{activeStep}
                            </span>
                        </div>
                        <div className={`flex items-center gap-2 px-2.5 py-1 rounded border transition-all duration-300 ${activeData.simBadgeBg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeData.simBadgeDot}`} />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Active Stream</span>
                        </div>
                    </div>

                    {/* Active Screen Area with AnimatePresence */}
                    <div className="flex-1 flex flex-col justify-center relative z-10">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                className="space-y-6"
                            >
                                <div className="space-y-3">
                                    <h4 className="font-serif text-xl sm:text-2xl text-gray-950 font-bold">
                                        {activeData.title}
                                    </h4>
                                    <p className="text-gray-600 font-body text-sm leading-relaxed max-w-xl">
                                        {activeData.description}
                                    </p>
                                </div>

                                {/* Custom simulation content based on selected phase - Dynamic theme */}
                                <div className={`border rounded-2xl p-4 sm:p-5 font-mono text-xs text-gray-800 relative shadow-sm transition-all duration-500 ${activeData.simBg}`}>

                                    {activeStep === 'research' && (
                                        <div className="space-y-3">
                                            <div className={`flex items-center justify-between border-b pb-2 ${activeData.simHeaderBorder}`}>
                                                <span className={`${activeData.simTitleColor} font-bold`}>Research Blueprint Analysis</span>
                                                <span className={`${activeData.simTitleColor} font-extrabold`}>ACCURACY TARGET: 99.5%</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center text-[11px]">
                                                    <span className="text-gray-600 font-semibold">📊 Data Readiness Score</span>
                                                    <span className={`${activeData.simTitleColor} font-bold`}>94% (High)</span>
                                                </div>
                                                <div className="w-full bg-gray-200/80 h-1.5 rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ duration: 1.2 }} className={`${activeData.simBadgeDot} h-full rounded-full`} />
                                                </div>
                                                <div className="flex justify-between items-center text-[11px] pt-1 font-semibold">
                                                    <span className="text-gray-600">🧠 LLM Parameter Viability</span>
                                                    <span className="text-emerald-600 font-bold">Passed</span>
                                                </div>
                                                <div className={`text-[10px] text-gray-600 bg-white p-2.5 rounded border shadow-sm leading-relaxed ${activeData.simBorder}`}>
                                                    $ frostrek-cli blueprint analyze --source=enterprise_logs
                                                    <br />
                                                    <span className="text-emerald-700 font-bold">✓ Found 1,402 structured pipeline patterns</span>
                                                    <br />
                                                    <span className="text-emerald-700 font-bold">✓ Created agent pipeline model blueprint</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 'architecture' && (
                                        <div className="space-y-3">
                                            <div className={`flex items-center justify-between border-b pb-2 ${activeData.simHeaderBorder}`}>
                                                <span className={`${activeData.simTitleColor} font-bold flex items-center gap-1.5`}><Bot size={13} /> Calling Agents Simulator</span>
                                                <span className={`${activeData.simTitleColor} flex items-center gap-1 animate-pulse font-bold`}>● Connected</span>
                                            </div>

                                            <div className="space-y-2 font-mono text-[11px] leading-relaxed font-semibold">
                                                <div className="flex items-start gap-2 text-blue-700">
                                                    <span className="text-gray-400">[12:45:01]</span>
                                                    <span><strong>VoiceAgent</strong> initialized, dispatching welcome script.</span>
                                                </div>
                                                <div className="flex items-start gap-2 text-amber-700 pl-3">
                                                    <span className="text-gray-400">[12:45:03]</span>
                                                    <span>↳ Calling <strong>RAGAgent</strong> for context query: "Billing anomaly"</span>
                                                </div>
                                                <div className="flex items-start gap-2 text-emerald-700 pl-6">
                                                    <span className="text-gray-400">[12:45:04]</span>
                                                    <span>↳ <strong>RAGAgent</strong> returned context matching doc #7214</span>
                                                </div>
                                                <div className="flex items-start gap-2 text-blue-700 pl-3">
                                                    <span className="text-gray-400">[12:45:05]</span>
                                                    <span>↳ Synthesis complete. Streamed voice output at 82ms latency.</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 'validation' && (
                                        <div className="space-y-3">
                                            <div className={`flex items-center justify-between border-b pb-2 ${activeData.simHeaderBorder}`}>
                                                <span className="text-red-700 font-bold flex items-center gap-1.5"><ShieldAlert size={13} /> Safety & Stress Benchmarks</span>
                                                <span className="text-gray-400">Run ID: #982-STRESS</span>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-bold">
                                                <div className={`bg-white p-2.5 rounded border shadow-sm ${activeData.simBorder}`}>
                                                    <div className="text-gray-500 text-[10px] mb-0.5">Prompt Injection</div>
                                                    <div className="text-emerald-600">100% BLOCKED</div>
                                                </div>
                                                <div className={`bg-white p-2.5 rounded border shadow-sm ${activeData.simBorder}`}>
                                                    <div className="text-gray-500 text-[10px] mb-0.5">Latency Under Load</div>
                                                    <div className="text-emerald-600">&lt;1.12s (P95)</div>
                                                </div>
                                                <div className={`bg-white p-2.5 rounded border shadow-sm ${activeData.simBorder}`}>
                                                    <div className="text-gray-500 text-[10px] mb-0.5">PII Masking Filter</div>
                                                    <div className="text-emerald-600">ACTIVE (100%)</div>
                                                </div>
                                                <div className={`bg-white p-2.5 rounded border shadow-sm ${activeData.simBorder}`}>
                                                    <div className="text-gray-500 text-[10px] mb-0.5">Hallucination Index</div>
                                                    <div className="text-emerald-600">&lt;0.02%</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 'scaling' && (
                                        <div className="space-y-3">
                                            <div className={`flex items-center justify-between border-b pb-2 ${activeData.simHeaderBorder}`}>
                                                <span className={`${activeData.simTitleColor} font-bold flex items-center gap-1.5`}><Activity size={13} className="animate-pulse" /> Telemetry Dashboard</span>
                                                <span className="text-emerald-600 font-extrabold uppercase">SCALE READY</span>
                                            </div>
                                            <div className="space-y-2.5 font-mono text-[11px] font-semibold">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Total Active Agents Deployed</span>
                                                    <span className="text-gray-900 font-extrabold">18,452</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Current Node Auto-Scaling CPU</span>
                                                    <span className={`${activeData.simTitleColor} font-extrabold`}>14.2%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Total Transactions Handled</span>
                                                    <span className="text-gray-900 font-extrabold">1,824,015</span>
                                                </div>
                                                <div className="flex justify-between border-t border-gray-150 pt-1.5">
                                                    <span className="text-gray-500">Platform Uptime Status</span>
                                                    <span className="text-emerald-600 font-extrabold">99.998% UPTIME</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>

                                {/* Custom bullet lists - Dynamic accent checkboxes */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                    {activeData.bullets.map((bullet, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-body font-semibold">
                                            <CheckCircle2 size={15} className={`${activeData.simBulletIcon} shrink-0 mt-0.5`} />
                                            <span>{bullet}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Interactive Sandbox Navigation Footer strip */}
                    <div className="flex items-center justify-between flex-wrap gap-2 border-t border-gray-100 pt-4 mt-6 flex-shrink-0 text-[10px] font-mono text-gray-400 font-bold relative z-10">
                        <span>Click steps to simulate pipeline</span>
                        <span className="flex items-center gap-1">
                            <Sparkles size={11} className={activeData.simTitleColor} /> Multi-Agent Playground v1.0
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnovationProcess;
