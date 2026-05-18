import { useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpotlightCard from '../ui/SpotlightCard';
import FlipText from '../ui/FlipText';
import SplitTextReveal from '../ui/SplitTextReveal';

// ─── Observe.ai-style arrow SVG (Exact paths) ─────────────────────
const CurlyArrow = ({ className = '', flip = false }: { className?: string, flip?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 84"
        width="150"
        height="84"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        aria-hidden
        fill="none"
        style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
        <g transform="matrix(1.203660011291504,0,0,1.203660011291504,78.125,34.75)" opacity="1">
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="currentColor"
                    strokeOpacity="1"
                    strokeWidth="4"
                    d="M55.5,31.5 C55.5,31.5 -11.319000244140625,37.178001403808594 -9.857999801635742,-2.484999895095825 C-9.092000007629395,-23.27400016784668 24.405000686645508,-27.20800018310547 29.908000946044922,-5.761000156402588 C31.027999877929688,-1.3949999809265137 32.67499923706055,20.930999755859375 -1.75,24.5 C-31.881999969482422,27.624000549316406 -52.4640007019043,-9.656000137329102 -51.5,-18.334999084472656 C-51.375,-18.834999084472656 -36.25,-9.375 -36.25,-9.375"
                />
            </g>
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillOpacity="0"
                    stroke="currentColor"
                    strokeOpacity="1"
                    strokeWidth="4"
                    d="M-59.96900177001953,-3.303999900817871 C-59.96900177001953,-3.303999900817871 -51.46900177001953,-18.304000854492188 -51.46900177001953,-18.304000854492188"
                />
            </g>
        </g>
    </svg>
);

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
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
                            toggleActions: 'play reverse play reverse'
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
                <div className="text-center mb-16">
                    <div className="flex flex-row items-center justify-center gap-4 md:gap-6 mb-4">
                        {/* Curly arrow — slides in from right after text, flipped to be on left */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, rotate: 15 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                            className="flex-shrink-0"
                        >
                            <CurlyArrow flip className="w-12 h-7 md:w-16 md:h-10 text-[#3D8B6E]/65" />
                        </motion.div>

                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Why Choose Frostrek
                        </SplitTextReveal>
                    </div>
                    <SplitTextReveal
                        as="p"
                        className="max-w-2xl mx-auto text-lg text-gray-500 font-medium"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        Everything you need to build, deploy, and scale AI agents in your organization.
                    </SplitTextReveal>
                </div>

                <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Hero Card - Enterprise Security (Light Green Theme) */}
                    <SpotlightCard
                        className="bento-card lg:row-span-2 group relative overflow-hidden rounded-[2.5rem] border p-8 md:p-10 transition-all duration-500 bg-white border-[#BBF7D0] hover:border-[#047857]/30 hover:shadow-[0_20px_50px_rgba(4,120,87,0.06)]"
                        spotlightColor="rgba(4, 120, 87, 0.02)"
                    >
                        <div className="relative z-10">
                            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-[1.25rem] border bg-white border-[#BBF7D0]/60 transition-all duration-300 group-hover:scale-110 shadow-sm">
                                <img src="/icons/shield.png" alt="Enterprise Security" className="w-11 h-11 object-contain" />
                            </div>

                            <h3 className="font-serif text-3xl font-bold mb-4 text-[#047857]">
                                Enterprise Security
                            </h3>
                            <p className="mb-8 text-base leading-relaxed text-gray-600 font-medium">
                                Role-based access control, end-to-end data encryption, comprehensive audit logs, and compliance-ready infrastructure built-in.
                            </p>

                            <div className="flex flex-wrap gap-3 mb-10">
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 border rounded-full text-sm font-bold bg-white border-[#BBF7D0] text-[#047857] shadow-sm">
                                    <CheckCircle2 size={16} className="text-[#047857]" /> SOC 2 Compliant
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 border rounded-full text-sm font-bold bg-white border-[#BBF7D0] text-[#047857] shadow-sm">
                                    <CheckCircle2 size={16} className="text-[#047857]" /> GDPR Ready
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 border rounded-full text-sm font-bold bg-white border-[#BBF7D0] text-[#047857] shadow-sm">
                                    <CheckCircle2 size={16} className="text-[#047857]" /> ISO 27001
                                </span>
                            </div>

                            <Link to="/contact" className="group inline-flex items-center gap-2 text-[15px] font-medium text-[#047857] hover:text-[#065F46] transition-colors">
                                <FlipText>
                                    Learn More <ArrowRight size={18} />
                                </FlipText>
                            </Link>
                        </div>
                    </SpotlightCard>

                    {/* Lightning Fast (Light Orange Theme) */}
                    <SpotlightCard
                        className="bento-card group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 bg-white border-[#FFEDD5] hover:border-[#F97316]/30 hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)] hover:-translate-y-1"
                        spotlightColor="rgba(249, 115, 22, 0.02)"
                    >
                        <div className="flex flex-col sm:flex-row items-start gap-5 relative z-10">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 bg-white border-[#FFEDD5]/60 group-hover:scale-110 shadow-sm">
                                <img src="/icons/lightning.png" alt="Lightning Fast" className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-3 text-[#C2410C]">
                                    Lightning Fast
                                </h3>
                                <p className="text-[15px] leading-relaxed text-gray-600 font-medium">
                                    Sub-second response times with optimized LLM routing and intelligent caching.
                                </p>
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* Real-time Analytics (Light Sky Blue Theme) */}
                    <SpotlightCard
                        className="bento-card group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 bg-white border-[#BAE6FD] hover:border-[#0EA5E9]/30 hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)] hover:-translate-y-1"
                        spotlightColor="rgba(14, 165, 233, 0.02)"
                    >
                        <div className="flex flex-col sm:flex-row items-start gap-5 relative z-10">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 bg-white border-[#BAE6FD]/60 group-hover:scale-110 shadow-sm">
                                <img src="/icons/data-analytics.png" alt="Real-time Analytics" className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-3 text-[#0284C7]">
                                    Real-time Analytics
                                </h3>
                                <p className="text-[15px] leading-relaxed text-gray-600 font-medium">
                                    Track KPIs, conversation quality, and user satisfaction metrics live.
                                </p>
                            </div>
                        </div>
                    </SpotlightCard>

                    {/* Multi-agent Orchestration (Light Yellow Theme) */}
                    <SpotlightCard
                        className="bento-card group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 bg-white border-[#FEF3C7] hover:border-[#F59E0B]/30 hover:shadow-[0_15px_40px_rgba(245,158,11,0.05)] hover:-translate-y-1"
                        spotlightColor="rgba(245, 158, 11, 0.02)"
                    >
                        <div className="flex flex-col sm:flex-row items-start gap-5 relative z-10">
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 bg-white border-[#FEF3C7]/60 group-hover:scale-110 shadow-sm">
                                <img src="/icons/multivendor.png" alt="Multi-agent Orchestration" className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                                <h3 className="font-serif text-2xl font-bold mb-3 text-[#B45309]">
                                    Multi-agent Orchestration
                                </h3>
                                <p className="text-[15px] leading-relaxed text-gray-600 font-medium">
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
