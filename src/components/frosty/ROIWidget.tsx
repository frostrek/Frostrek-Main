import { useRef, useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SplitTextReveal from '../ui/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const ROIWidget = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const widgetRef = useRef<HTMLDivElement>(null);

    const [monthlyQueries, setMonthlyQueries] = useState<number>(5000);
    const [costPerTicket, setCostPerTicket] = useState<number>(8);
    const [percentAutomated, setPercentAutomated] = useState<number>(65);

    // Calculations
    const annualQueries = monthlyQueries * 12;
    const automatedQueries = annualQueries * (percentAutomated / 100);
    const annualSavings = automatedQueries * costPerTicket;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
        }).format(value);
    };

    useGSAP(() => {
        const ctx = gsap.context(() => {
            if (widgetRef.current) {
                gsap.fromTo(widgetRef.current,
                    { y: 60, opacity: 0, scale: 0.97 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: widgetRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-brand-light-bg font-body border-t border-[#2D6A4F]/10">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col items-center text-center mb-16">
                    <SplitTextReveal
                        as="h2"
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                        type="chars"
                        stagger={0.02}
                        once={false}
                    >
                        Calculate Your ROI
                    </SplitTextReveal>
                    <SplitTextReveal
                        as="p"
                        className="max-w-2xl mx-auto text-lg text-gray-500 font-medium mt-4"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        See how much you can save annually by automating routine support queries with Frosty AI.
                    </SplitTextReveal>
                </div>

                <div ref={widgetRef} className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(45,106,79,0.06)] border border-[#E6EFE6] overflow-hidden flex flex-col md:flex-row">

                    {/* Left: Sliders */}
                    <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#F4F9F6]/50 border-r border-[#E6EFE6]">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-2xl border flex items-center justify-center bg-brand-badge-bg border-[#c4e0d4]/50 shadow-sm">
                                <Calculator className="w-5 h-5 text-[#2D6A4F]" />
                            </div>
                            <h3 className="text-xl font-serif font-bold text-[#2D6A4F]">Input Your Metrics</h3>
                        </div>

                        <div className="space-y-10">
                            {/* Slider 1 */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="font-bold text-gray-600 text-sm">Monthly Support Queries</label>
                                    <span className="font-mono bg-white border border-[#E6EFE6] px-3 py-1 rounded-lg text-[#2D6A4F] font-bold shadow-sm text-sm">{monthlyQueries.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1000" max="50000" step="1000"
                                    value={monthlyQueries}
                                    onChange={(e) => setMonthlyQueries(Number(e.target.value))}
                                    className="w-full h-2 bg-[#E6EFE6] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F]"
                                />
                                <div className="flex justify-between text-xs text-gray-400 font-medium">
                                    <span>1k</span><span>50k+</span>
                                </div>
                            </div>

                            {/* Slider 2 */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="font-bold text-gray-600 text-sm">Average Cost per Ticket</label>
                                    <span className="font-mono bg-white border border-[#E6EFE6] px-3 py-1 rounded-lg text-[#2D6A4F] font-bold shadow-sm text-sm">{formatCurrency(costPerTicket)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1" max="50" step="1"
                                    value={costPerTicket}
                                    onChange={(e) => setCostPerTicket(Number(e.target.value))}
                                    className="w-full h-2 bg-[#E6EFE6] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F]"
                                />
                                <div className="flex justify-between text-xs text-gray-400 font-medium">
                                    <span>$1</span><span>$50+</span>
                                </div>
                            </div>

                            {/* Slider 3 */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <label className="font-bold text-gray-600 text-sm">Target % Automated</label>
                                    <span className="font-mono bg-white border border-[#E6EFE6] px-3 py-1 rounded-lg text-[#2D6A4F] font-bold shadow-sm text-sm">{percentAutomated}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="10" max="90" step="5"
                                    value={percentAutomated}
                                    onChange={(e) => setPercentAutomated(Number(e.target.value))}
                                    className="w-full h-2 bg-[#E6EFE6] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F]"
                                />
                                <div className="flex justify-between text-xs text-gray-400 font-medium">
                                    <span>10%</span><span>90%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Results */}
                    <div className="w-full md:w-2/5 p-8 md:p-12 bg-[#2D6A4F] text-white flex flex-col justify-center relative overflow-hidden">
                        {/* Background Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>

                        <div className="relative z-10 space-y-8">
                            <div>
                                <h3 className="text-white/70 font-medium uppercase tracking-wider text-sm mb-2">Estimated Annual Savings</h3>
                                <motion.div
                                    key={annualSavings}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-4xl lg:text-5xl font-black font-mono tracking-tight"
                                >
                                    {formatCurrency(annualSavings)}
                                </motion.div>
                            </div>

                            <div className="h-px w-full bg-white/20"></div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white/70 font-medium">Annual Automated Tickets</span>
                                    <span className="font-bold">{automatedQueries.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-white/70 font-medium">Equivalent Agent Hours</span>
                                    <span className="font-bold">{Math.round(automatedQueries * 0.25).toLocaleString()} hrs</span>
                                </div>
                            </div>

                            <button className="w-full bg-white text-[#2D6A4F] font-bold py-4 rounded-2xl shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 mt-4">
                                <TrendingUp className="w-5 h-5" />
                                Start Saving Today
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ROIWidget;
