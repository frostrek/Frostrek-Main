import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lightbulb,
    Cpu,
    ShieldAlert,
    TrendingUp,
    Terminal,
    Bot,
    CheckCircle2,
    Activity,
    Sparkles
} from 'lucide-react';

interface ProcessStep {
    id: string;
    label: string;
    title: string;
    description: string;
    bullets: string[];
    icon: React.ComponentType<any>;
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
        icon: Lightbulb
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
        icon: Cpu
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
        icon: ShieldAlert
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
        icon: TrendingUp
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
            className="grid lg:grid-cols-12 gap-10 items-stretch max-w-7xl mx-auto text-left"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Left side: Interactive Timeline Control */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                {STEPS.map((step) => {
                    const isSelected = step.id === activeStep;
                    const IconComponent = step.icon;
                    return (
                        <div
                            key={step.id}
                            onClick={() => setActiveStep(step.id)}
                            className={`group relative p-5 rounded-2xl cursor-pointer border transition-all duration-300 flex items-start gap-4 ${
                                isSelected
                                    ? 'bg-white border-[#2D6A4F] shadow-[0_10px_30px_rgba(45,106,79,0.08)]'
                                    : 'bg-white/40 border-gray-100 hover:border-[#2D6A4F]/30 hover:bg-white/80'
                            }`}
                        >
                            {/* Accent indicator line */}
                            {isSelected && (
                                <motion.div
                                    layoutId="timeline-accent"
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-[#2D6A4F] rounded-l-2xl"
                                />
                            )}

                            <div className={`p-3 rounded-xl transition-all duration-300 shrink-0 ${
                                isSelected
                                    ? 'bg-[#2D6A4F] text-white shadow-md'
                                    : 'bg-gray-100 text-gray-400 group-hover:bg-[#E8F5EE] group-hover:text-[#2D6A4F]'
                            }`}>
                                <IconComponent size={20} />
                            </div>

                            <div className="space-y-1">
                                <span className={`text-[10px] font-bold tracking-widest font-body uppercase ${
                                    isSelected ? 'text-[#2D6A4F]' : 'text-gray-400'
                                }`}>
                                    {step.label}
                                </span>
                                <h3 className={`font-serif text-lg font-bold transition-colors ${
                                    isSelected ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-800'
                                }`}>
                                    {step.title}
                                </h3>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Right side: Sandbox / Dynamic Calling Agents - White & Green Synced Theme */}
            <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 shadow-xl relative overflow-hidden h-full flex flex-col justify-between min-h-[440px]">
                    {/* Background Soft Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E8F5EE]/30 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#E8F5EE]/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Window Controls Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6 flex-shrink-0 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                            <span className="text-xs text-gray-400 font-mono ml-2 flex items-center gap-1.5 font-bold">
                                <Terminal size={12} className="text-[#2D6A4F]" /> frostrek-sandbox:~/{activeStep}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#E8F5EE] border border-[#2D6A4F]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
                            <span className="text-[10px] font-mono text-[#2D6A4F] font-bold uppercase tracking-wider">Active Stream</span>
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
                                    <p className="text-gray-600 font-body text-sm leading-relaxed max-w-xl font-medium">
                                        {activeData.description}
                                    </p>
                                </div>

                                {/* Custom simulation content based on selected phase - Green & White theme */}
                                <div className="bg-[#F4FAF7] border border-[#2D6A4F]/15 rounded-2xl p-4 sm:p-5 font-mono text-xs text-gray-800 relative shadow-sm">
                                    
                                    {activeStep === 'research' && (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between border-b border-[#2D6A4F]/10 pb-2">
                                                <span className="text-[#2D6A4F] font-bold">Research Blueprint Analysis</span>
                                                <span className="text-[#2D6A4F] font-extrabold">ACCURACY TARGET: 99.5%</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center text-[11px]">
                                                    <span className="text-gray-600 font-semibold">📊 Data Readiness Score</span>
                                                    <span className="text-[#2D6A4F] font-bold">94% (High)</span>
                                                </div>
                                                <div className="w-full bg-gray-200/80 h-1.5 rounded-full overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ duration: 1.2 }} className="bg-[#2D6A4F] h-full rounded-full" />
                                                </div>
                                                <div className="flex justify-between items-center text-[11px] pt-1 font-semibold">
                                                    <span className="text-gray-600">🧠 LLM Parameter Viability</span>
                                                    <span className="text-emerald-600 font-bold">Passed</span>
                                                </div>
                                                <div className="text-[10px] text-gray-600 bg-white p-2.5 rounded border border-[#2D6A4F]/10 shadow-sm leading-relaxed">
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
                                            <div className="flex items-center justify-between border-b border-[#2D6A4F]/10 pb-2">
                                                <span className="text-[#2D6A4F] font-bold flex items-center gap-1.5"><Bot size={13} className="text-[#2D6A4F]" /> Calling Agents Simulator</span>
                                                <span className="text-[#2D6A4F] flex items-center gap-1 animate-pulse font-bold">● Connected</span>
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
                                                <div className="flex items-start gap-2 text-[#2D6A4F] pl-6">
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
                                            <div className="flex items-center justify-between border-b border-[#2D6A4F]/10 pb-2">
                                                <span className="text-red-700 font-bold flex items-center gap-1.5"><ShieldAlert size={13} /> Safety & Stress Benchmarks</span>
                                                <span className="text-gray-400">Run ID: #982-STRESS</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-[11px] font-bold">
                                                <div className="bg-white p-2.5 rounded border border-[#2D6A4F]/10 shadow-sm">
                                                    <div className="text-gray-500 text-[10px] mb-0.5">Prompt Injection</div>
                                                    <div className="text-emerald-600">100% BLOCKED</div>
                                                </div>
                                                <div className="bg-white p-2.5 rounded border border-[#2D6A4F]/10 shadow-sm">
                                                    <div className="text-gray-500 text-[10px] mb-0.5">Latency Under Load</div>
                                                    <div className="text-emerald-600">&lt;1.12s (P95)</div>
                                                </div>
                                                <div className="bg-white p-2.5 rounded border border-[#2D6A4F]/10 shadow-sm">
                                                    <div className="text-gray-500 text-[10px] mb-0.5">PII Masking Filter</div>
                                                    <div className="text-emerald-600">ACTIVE (100%)</div>
                                                </div>
                                                <div className="bg-white p-2.5 rounded border border-[#2D6A4F]/10 shadow-sm">
                                                    <div className="text-gray-500 text-[10px] mb-0.5">Hallucination Index</div>
                                                    <div className="text-emerald-600">&lt;0.02%</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeStep === 'scaling' && (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between border-b border-[#2D6A4F]/10 pb-2">
                                                <span className="text-[#2D6A4F] font-bold flex items-center gap-1.5"><Activity size={13} className="text-[#2D6A4F] animate-pulse" /> Telemetry Dashboard</span>
                                                <span className="text-emerald-600 font-extrabold uppercase">SCALE READY</span>
                                            </div>
                                            <div className="space-y-2.5 font-mono text-[11px] font-semibold">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Total Active Agents Deployed</span>
                                                    <span className="text-gray-900 font-extrabold">18,452</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Current Node Auto-Scaling CPU</span>
                                                    <span className="text-[#2D6A4F] font-extrabold">14.2%</span>
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

                                {/* Custom bullet lists - Legible slate gray */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                                    {activeData.bullets.map((bullet, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-700 font-body font-bold">
                                            <CheckCircle2 size={15} className="text-[#2D6A4F] shrink-0 mt-0.5" />
                                            <span>{bullet}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Interactive Sandbox Navigation Footer strip */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-6 flex-shrink-0 text-[10px] font-mono text-gray-400 font-bold relative z-10">
                        <span>Click steps to simulate pipeline</span>
                        <span className="flex items-center gap-1">
                            <Sparkles size={11} className="text-[#2D6A4F]" /> Multi-Agent Playground v1.0
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnovationProcess;
