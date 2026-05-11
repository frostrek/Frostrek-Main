import { useRef } from 'react';
import { Zap, Shield, Users, BarChart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import SpotlightCard from '../ui/SpotlightCard';
import FlipText from '../ui/FlipText';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { y: 50, opacity: 0, filter: 'blur(8px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            const cards = gridRef.current?.querySelectorAll('.bento-card');
            if (cards) {
                gsap.fromTo(cards,
                    { y: 60, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-brand-light-bg font-sans">
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1400px]">
                <div ref={headingRef} className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] mb-4 leading-[1.15] tracking-[-0.01em]">
                        Why Choose <span className="text-[#336B55]">Frostrek</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium">
                        Everything you need to build, deploy, and scale AI agents in your organization.
                    </p>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Hero Card - Enterprise Security */}
                    <SpotlightCard 
                        className="bento-card lg:row-span-2 group relative overflow-hidden rounded-[2.5rem] border p-8 md:p-10 transition-all duration-500 bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
                        spotlightColor="rgba(30, 59, 50, 0.03)"
                    >
                        <div className="relative z-10">
                            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-[1.25rem] border bg-brand-badge-bg border-[#c4e0d4]/50 transition-all duration-300 group-hover:scale-110 shadow-sm">
                                <Shield className="text-[#2D6A4F]" size={36} strokeWidth={1.5} />
                            </div>

                            <h3 className="font-serif text-3xl font-bold mb-4 text-[#2D6A4F]">
                                Enterprise Security
                            </h3>
                            <p className="mb-8 text-base leading-relaxed text-gray-500 font-medium">
                                Role-based access control, end-to-end data encryption, comprehensive audit logs, and compliance-ready infrastructure built-in.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-10">
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 border rounded-full text-sm font-bold bg-[#F4F9F6] border-[#E6EFE6] text-[#2D6A4F] shadow-sm">
                                    <CheckCircle2 size={16} className="text-[#336B55]" /> SOC 2 Compliant
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 border rounded-full text-sm font-bold bg-[#F4F9F6] border-[#E6EFE6] text-[#2D6A4F] shadow-sm">
                                    <CheckCircle2 size={16} className="text-[#336B55]" /> GDPR Ready
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 border rounded-full text-sm font-bold bg-[#F4F9F6] border-[#E6EFE6] text-[#2D6A4F] shadow-sm">
                                    <CheckCircle2 size={16} className="text-[#336B55]" /> ISO 27001
                                </span>
                            </div>

                            <Link to="/contact" className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#2D6A4F] hover:text-[#336B55] transition-colors">
                                <FlipText>
                                    Learn More <ArrowRight size={18} />
                                </FlipText>
                            </Link>
                        </div>
                    </SpotlightCard>

                    {/* Lightning Fast */}
                    <SpotlightCard 
                        className="bento-card group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)] hover:-translate-y-1"
                        spotlightColor="rgba(30, 59, 50, 0.03)"
                    >
                        <div className="flex flex-col sm:flex-row items-start gap-5 relative z-10">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 bg-brand-badge-bg border-[#c4e0d4]/50 group-hover:scale-110 shadow-sm">
                                <Zap className="text-[#2D6A4F]" size={26} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-3 text-[#2D6A4F]">
                                    Lightning Fast
                                </h3>
                                <p className="text-[15px] leading-relaxed text-gray-500 font-medium">
                                    Sub-second response times with optimized LLM routing and intelligent caching.
                                </p>
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* Real-time Analytics */}
                    <SpotlightCard 
                        className="bento-card group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)] hover:-translate-y-1"
                        spotlightColor="rgba(30, 59, 50, 0.03)"
                    >
                        <div className="flex flex-col sm:flex-row items-start gap-5 relative z-10">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 bg-brand-badge-bg border-[#c4e0d4]/50 group-hover:scale-110 shadow-sm">
                                <BarChart className="text-[#2D6A4F]" size={26} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-3 text-[#2D6A4F]">
                                    Real-time Analytics
                                </h3>
                                <p className="text-[15px] leading-relaxed text-gray-500 font-medium">
                                    Track KPIs, conversation quality, and user satisfaction metrics live.
                                </p>
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* Multi-agent Orchestration */}
                    <SpotlightCard 
                        className="bento-card group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)] hover:-translate-y-1"
                        spotlightColor="rgba(30, 59, 50, 0.03)"
                    >
                        <div className="flex flex-col sm:flex-row items-start gap-5 relative z-10">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 bg-brand-badge-bg border-[#c4e0d4]/50 group-hover:scale-110 shadow-sm">
                                <Users className="text-[#2D6A4F]" size={26} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-3 text-[#2D6A4F]">
                                    Multi-agent Orchestration
                                </h3>
                                <p className="text-[15px] leading-relaxed text-gray-500 font-medium">
                                    Deploy multiple agents across channels with unified analytics dashboard.
                                </p>
                            </div>
                        </div>
                    </SpotlightCard>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
