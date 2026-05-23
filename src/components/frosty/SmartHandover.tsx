import { useRef } from 'react';
import { MessageCircle, Bot, UserCog, ArrowRight, ShieldAlert, FileText } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from '../ui/SpotlightCard';
import SplitTextReveal from '../ui/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '1',
        icon: MessageCircle,
        title: 'Customer Query Ingest',
        desc: '"I need to negotiate my enterprise contract renewal."',
    },
    {
        num: '2',
        icon: Bot,
        title: 'AI Analysis & Handling',
        desc: 'Frosty analyzes intent, checks complexity threshold.',
        isHub: true,
    },
    {
        num: '3',
        icon: UserCog,
        title: 'Escalation to Human',
        desc: 'Complex queries escalate with full chat context attached.',
    },
];

const SmartHandover = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);
    const logsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Steps stagger
            const stepCards = stepsRef.current?.querySelectorAll('.handover-step');
            if (stepCards) {
                gsap.fromTo(stepCards,
                    { y: 50, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: stepsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }

            // Arrow connectors
            const arrows = stepsRef.current?.querySelectorAll('.step-arrow');
            if (arrows) {
                gsap.fromTo(arrows,
                    { scaleX: 0, opacity: 0 },
                    {
                        scaleX: 1, opacity: 1,
                        duration: 0.5,
                        stagger: 0.2,
                        delay: 0.3,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: stepsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }

            // Logs entrance
            const logItems = logsRef.current?.querySelectorAll('.log-item');
            if (logItems) {
                gsap.fromTo(logItems,
                    { x: -20, opacity: 0 },
                    {
                        x: 0, opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: logsRef.current,
                            start: 'top 90%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-[#F9FBFA]/80 border-t border-[#2D6A4F]/10 font-body">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                <div className="flex flex-col items-center text-center mb-16">
                    <SplitTextReveal
                        as="h2"
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                        type="chars"
                        stagger={0.02}
                        once={false}
                    >
                        Smart Handover Protocol
                    </SplitTextReveal>
                    <SplitTextReveal
                        as="p"
                        className="max-w-2xl mx-auto text-lg text-gray-500 font-medium mt-4"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        Frosty knows its limits. Complex issues are seamlessly escalated to human agents with full context.
                    </SplitTextReveal>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(45,106,79,0.04)] border border-[#E6EFE6] p-8 md:p-12">

                    {/* Flowchart — Horizontal Steps */}
                    <div ref={stepsRef} className="flex flex-col lg:flex-row items-stretch justify-between gap-4 lg:gap-0 mb-12">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex items-center flex-1">
                                <SpotlightCard
                                    className={`handover-step flex-1 group relative overflow-hidden rounded-[2rem] border p-6 md:p-8 transition-all duration-300 ${
                                        step.isHub
                                            ? 'bg-[#F4F9F6] border-[#2D6A4F]/20 shadow-[0_0_30px_rgba(45,106,79,0.08)]'
                                            : 'bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)]'
                                    }`}
                                    spotlightColor="rgba(30, 59, 50, 0.03)"
                                >
                                    <div className="relative z-10 text-center">
                                        <div className="relative inline-flex mb-4">
                                            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${
                                                step.isHub
                                                    ? 'bg-[#2D6A4F] border-[#2D6A4F]'
                                                    : 'bg-brand-badge-bg border-[#c4e0d4]/50'
                                            }`}>
                                                <step.icon className={step.isHub ? 'text-white' : 'text-[#2D6A4F]'} size={28} strokeWidth={1.5} />
                                            </div>
                                            <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-xs font-bold shadow-md">
                                                {step.num}
                                            </span>
                                        </div>
                                        <h4 className="font-serif text-lg font-bold text-[#2D6A4F] mb-2">{step.title}</h4>
                                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{step.desc}</p>

                                        {step.isHub && (
                                            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                                                <ShieldAlert className="w-3 h-3" /> Complexity Threshold Met
                                            </div>
                                        )}
                                    </div>
                                </SpotlightCard>

                                {/* Arrow between steps */}
                                {idx < steps.length - 1 && (
                                    <div className="step-arrow hidden lg:flex items-center justify-center px-3 origin-left">
                                        <ArrowRight className="w-8 h-8 text-[#2D6A4F]/30" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Agent Workspace Preview */}
                    <div className="bg-[#F4F9F6] rounded-2xl border border-[#E6EFE6] p-6 mb-8">
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#E6EFE6]">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">JD</div>
                            <div>
                                <div className="text-sm font-bold text-[#2D6A4F]">Agent Workspace</div>
                                <div className="text-xs text-[#2D6A4F]/70 font-medium">Context Transferred ✓</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div className="p-3 bg-white border border-[#E6EFE6] rounded-xl text-gray-600 font-medium">Full chat history attached.</div>
                            <div className="p-3 bg-white border border-[#E6EFE6] rounded-xl text-gray-600 font-medium">Intent: Enterprise Renewal</div>
                            <div className="p-3 bg-[#2D6A4F] text-white rounded-xl font-bold">Ready to reply...</div>
                        </div>
                    </div>

                    {/* Escalation Logs */}
                    <div ref={logsRef}>
                        <div className="flex justify-between items-center mb-4 px-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <span>Escalation Logs</span>
                            <span>Status</span>
                        </div>
                        <div className="space-y-2">
                            {[3843, 3844, 3845].map((log, idx) => (
                                <div key={idx} className="log-item flex justify-between items-center p-3.5 rounded-xl border border-[#E6EFE6] bg-[#F4F9F6]">
                                    <div className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
                                        <FileText className="w-4 h-4 text-[#2D6A4F]/60" />
                                        Escalation Log #{log}
                                    </div>
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                        idx < 2
                                            ? 'bg-[#E8F5EE] text-[#2D6A4F] border border-[#c4e0d4]/50'
                                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                                    }`}>
                                        {idx < 2 ? <><span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse"></span> Live</> : 'Resolved'}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 bg-[#F4F9F6] text-[#2D6A4F] font-bold py-3.5 rounded-2xl hover:bg-[#E8F5EE] transition-colors border border-[#E6EFE6]">
                            View Open Tickets
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SmartHandover;
