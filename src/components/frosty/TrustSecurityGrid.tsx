import { useRef } from 'react';
import { ShieldCheck, Lock, Server, Activity } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitTextReveal from '../ui/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const trustItems = [
    { icon: ShieldCheck, title: 'SOC2/GDPR Compliance', desc: 'Fully certified operations.' },
    { icon: Lock, title: 'End-to-End Encryption', desc: 'AES-256 at rest and in transit.' },
    { icon: Server, title: 'No Data Leaking', desc: 'Isolated Private LLM instances.' },
    { icon: Activity, title: '99.9% Uptime', desc: 'Backed by enterprise SLAs.' },
];

const TrustSecurityGrid = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const cards = gridRef.current?.querySelectorAll('.trust-card');
            if (cards) {
                gsap.fromTo(cards,
                    { y: 40, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
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
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-[#F9FBFA]/80 border-t border-[#2D6A4F]/10 font-body">
            <div className="container mx-auto px-4 md:px-6">

                <div className="flex flex-col items-center text-center mb-16">
                    <SplitTextReveal
                        as="h2"
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                        type="chars"
                        stagger={0.02}
                        once={false}
                    >
                        Enterprise-Grade Security
                    </SplitTextReveal>
                    <SplitTextReveal
                        as="p"
                        className="max-w-2xl mx-auto text-lg text-gray-500 font-medium mt-4"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        Your data is yours. We employ industry-leading protocols to ensure absolute privacy and availability.
                    </SplitTextReveal>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {trustItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="trust-card flex items-center gap-4 p-6 rounded-[2rem] bg-white border border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)] transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-badge-bg border border-[#c4e0d4]/50 flex items-center justify-center text-[#2D6A4F] flex-shrink-0">
                                <item.icon className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-base text-[#2D6A4F]">{item.title}</h4>
                                <p className="text-xs text-gray-500 mt-1 font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustSecurityGrid;
