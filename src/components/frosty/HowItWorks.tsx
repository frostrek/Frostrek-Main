import { useRef } from 'react';
import { Zap, Sliders, Rocket, Check } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpotlightCard from '../ui/SpotlightCard';
import SplitTextReveal from '../ui/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01',
        title: 'Install in 60 seconds',
        desc: 'Paste one line of code on your website, or connect your WhatsApp number. No engineers required.',
        icon: Zap,
        features: ['One-line embed script', 'WhatsApp number connect', 'Zero DevOps']
    },
    {
        num: '02',
        title: 'Configure your AI',
        desc: 'Upload your knowledge base, set your brand tone, choose your AI model, and define your working hours.',
        icon: Sliders,
        features: ['Knowledge base upload', 'Brand tone & persona', 'Model selection']
    },
    {
        num: '03',
        title: 'Convert at scale',
        desc: 'Frosty works around the clock — capturing leads, scheduling meetings, and closing deals while you sleep.',
        icon: Rocket,
        features: ['24/7 lead capture', 'Auto meeting booking', 'Real-time analytics']
    }
];

const HowItWorks = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const cards = gridRef.current?.querySelectorAll('.step-card');
            if (cards) {
                gsap.fromTo(cards,
                    { y: 50, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
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
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-white font-body border-t border-[#2D6A4F]/10">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col items-center text-center mb-16">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-brand-badge-bg text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4 border border-[#c4e0d4]/50">
                        How It Works
                    </span>
                    <div className="mb-4">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Up and running in minutes
                        </SplitTextReveal>
                    </div>
                    <div>
                        <SplitTextReveal
                            as="p"
                            className="max-w-2xl mx-auto text-lg text-gray-500 font-medium"
                            type="words"
                            stagger={0.02}
                            once={false}
                            delay={0.3}
                        >
                            Three steps. No engineers. Live in under 5 minutes.
                        </SplitTextReveal>
                    </div>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {steps.map((step, idx) => (
                        <SpotlightCard
                            key={idx}
                            className="step-card group relative overflow-hidden rounded-[2.5rem] border p-8 transition-all duration-300 bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_20px_50px_rgba(45,106,79,0.06)] hover:-translate-y-1 flex flex-col h-full"
                            spotlightColor="rgba(30, 59, 50, 0.03)"
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                {/* Top Row: Number and Icon */}
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-5xl font-serif font-black text-[#2D6A4F]/10 group-hover:text-[#2D6A4F]/20 transition-colors">
                                        {step.num}
                                    </span>
                                    <div className="w-12 h-12 rounded-2xl border flex items-center justify-center bg-brand-badge-bg border-[#c4e0d4]/50 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                                        <step.icon className="text-[#2D6A4F]" size={24} strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Content */}
                                <span className="text-xs font-bold text-[#2D6A4F]/60 uppercase tracking-wider mb-2">Step {step.num}</span>
                                <h3 className="font-serif text-2xl font-bold mb-3 text-[#2D6A4F]">{step.title}</h3>
                                <p className="text-[14px] leading-relaxed text-gray-500 font-medium mb-6 flex-grow">
                                    {step.desc}
                                </p>

                                {/* Feature List */}
                                <ul className="space-y-2.5 mt-auto">
                                    {step.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-2.5 text-sm text-gray-600 font-medium">
                                            <div className="w-5 h-5 rounded-full bg-[#E8F5EE] flex items-center justify-center flex-shrink-0">
                                                <Check className="w-3 h-3 text-[#2D6A4F]" strokeWidth={3} />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
