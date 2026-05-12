import { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, Zap, CheckCircle2, MousePointer2 } from 'lucide-react';
import type { Challenge } from '../../utils/solutionData';

gsap.registerPlugin(ScrollTrigger);

interface CommonChallengesProps {
    challenges: Challenge[];
}

const IMAGES = [
    "Solution1.png", // AI Brain/Technology
    "Solution2.png", // Business team working
    "Solution3.png"  // Data analytics dashboard
];

// Mobile Card Component
const MobileCard = ({ challenge, index, total }: { challenge: Challenge; index: number; total: number }) => (
    <div className="flex-shrink-0 w-[85vw] snap-center">
        <div className="rounded-2xl border shadow-xl overflow-hidden bg-white border-gray-150">
            {/* Image Banner without text overlay */}
            <div className="relative h-48 overflow-hidden bg-[#08150F] border-b border-[#2D6A4F]/10">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img
                        src={IMAGES[index % IMAGES.length]}
                        alt={challenge.title}
                        className="w-full h-full object-contain"
                        loading="lazy"
                    />
                </div>
                <div className="absolute top-3 left-3 z-10">
                    <span className="font-mono text-[10px] font-bold tracking-wider bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 text-white shadow-sm">
                        0{index + 1} / 0{total}
                    </span>
                </div>
            </div>
            
            {/* Content Area */}
            <div className="p-5 flex flex-col gap-4 bg-white">
                {/* Challenge Section */}
                <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-red-100 bg-red-50 text-[9px] font-bold uppercase tracking-wider text-red-600 mb-2">
                        <Zap size={10} className="text-red-500" /><span>The Challenge</span>
                    </div>
                    <h3 className="text-xl font-serif font-bold leading-tight text-gray-900 mb-1.5">{challenge.title}</h3>
                    <p className="text-slate-600 text-xs font-medium leading-relaxed">{challenge.description}</p>
                </div>
                
                <div className="w-full h-px bg-gradient-to-r from-gray-100 via-gray-200 to-transparent" />
                
                {/* Solution Section */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full text-white flex items-center justify-center shadow-sm bg-[#2D6A4F]">
                            <CheckCircle2 size={12} />
                        </span>
                        <span className="font-extrabold text-[10px] uppercase tracking-wider text-[#2D6A4F]">AI Solution</span>
                    </div>
                    <p className="text-sm font-serif font-bold text-gray-950 leading-snug">{challenge.solvedBy}</p>
                    
                    <div className="flex flex-wrap gap-2">
                        {['AI-Powered', 'Secure', 'Real-time'].map((tag, i) => (
                            <span key={i} className="px-2 py-1 border rounded-md text-[9px] font-bold bg-[#FAFCFB] border-[#2D6A4F]/15 text-[#2D6A4F]">{tag}</span>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between pt-3 mt-1 border-t border-gray-100">
                    <div className="text-center">
                        <p className="text-lg font-serif font-black text-[#2D6A4F]">60%</p>
                        <p className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">Cost Cut</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-serif font-black text-[#2D6A4F]">24/7</p>
                        <p className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">Uptime</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-serif font-black text-[#2D6A4F]">&lt;1s</p>
                        <p className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">Response</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// Desktop Card Component
const DesktopCard = ({ challenge, index, total }: { challenge: Challenge; index: number; total: number }) => (
    <div className="challenge-card absolute top-0 left-0 w-full h-full flex items-center justify-center p-4" style={{ zIndex: total - index }}>
        <div className="relative w-full max-w-5xl h-[70vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-row bg-white border-[#2D6A4F]/10">
            {/* Left side: Image backdrop without text overlay */}
            <div className="relative h-full w-[45%] overflow-hidden bg-[#08150F]">
                <div className="absolute inset-0 flex items-center justify-center p-6">
                    <img src={IMAGES[index % IMAGES.length]} alt={challenge.title} className="w-full h-full object-contain" loading="lazy" />
                </div>
                {/* Just the index pill floating */}
                <div className="absolute top-6 left-6 z-10">
                    <span className="font-mono text-xs font-bold tracking-wider bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white shadow-sm">
                        0{index + 1} / 0{total}
                    </span>
                </div>
            </div>

            {/* Right side: Detailed Challenge & Solution layout */}
            <div className="relative h-full w-[55%] p-8 flex flex-col justify-between bg-white border-l border-gray-100">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(#2D6A4F 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />
                
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                    {/* Challenge Section */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-100 bg-red-50 text-[10px] font-bold uppercase tracking-wider text-red-600 mb-4">
                            <Zap size={12} className="text-red-500" /><span>The Challenge</span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-serif font-black leading-tight text-gray-900 mb-3">{challenge.title}</h3>
                        <p className="text-slate-600 text-sm font-medium leading-relaxed max-w-lg mb-6">{challenge.description}</p>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-gray-100 via-gray-200 to-transparent my-2" />

                    {/* Solution Section */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl text-white flex items-center justify-center shadow-md bg-[#2D6A4F]">
                                <CheckCircle2 size={16} />
                            </span>
                            <span className="font-extrabold text-[11px] uppercase tracking-wider text-[#2D6A4F]">Our AI Solution</span>
                        </div>
                        <p className="text-lg lg:text-xl font-serif font-bold leading-snug text-gray-950">{challenge.solvedBy}</p>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {[{ label: 'Instant Deploy', desc: 'Go live fast' }, { label: 'AI-Powered', desc: 'Smart automation' }, { label: 'Enterprise Secure', desc: 'SOC2 ready' }, { label: 'Real-time', desc: 'Live insights' }].map((tag, i) => (
                                <div key={i} className="p-3 rounded-2xl border bg-[#FAFCFB] border-[#2D6A4F]/10 hover:border-[#2D6A4F]/25 transition-colors">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                                        <span className="font-serif font-bold text-[11px] text-gray-900">{tag.label}</span>
                                    </div>
                                    <p className="text-[10px] pl-3.5 text-slate-500 font-medium leading-normal">{tag.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 pt-4 mt-4 border-t border-gray-100">
                        <div>
                            <p className="text-xl font-serif font-black text-[#2D6A4F]">60%</p>
                            <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">Cost Cut</p>
                        </div>
                        <div>
                            <p className="text-xl font-serif font-black text-[#2D6A4F]">24/7</p>
                            <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">Uptime</p>
                        </div>
                        <div>
                            <p className="text-xl font-serif font-black text-[#2D6A4F]">&lt;1s</p>
                            <p className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 mt-0.5">Response</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const CommonChallenges = ({ challenges }: CommonChallengesProps) => {
    const location = useLocation();
    const container = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Cleanup GSAP on unmount, route change, or when switching to mobile
    useEffect(() => {
        return () => {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            ScrollTrigger.getAll().forEach(st => {
                if (st.trigger === triggerRef.current) {
                    st.kill();
                }
            });
        };
    }, [isMobile, location.pathname]);

    // Force refresh ScrollTrigger on route change
    useEffect(() => {
        const timeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(timeout);
    }, [location.pathname]);

    useGSAP(() => {
        if (isMobile || !triggerRef.current || !container.current || challenges.length === 0) {
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            return;
        }

        if (scrollTriggerRef.current) {
            scrollTriggerRef.current.kill();
            scrollTriggerRef.current = null;
        }

        ScrollTrigger.getAll().forEach(st => {
            if (st.trigger === triggerRef.current) {
                st.kill();
            }
        });

        const cards = gsap.utils.toArray<HTMLElement>('.challenge-card');
        const count = cards.length;
        if (count === 0) return;

        cards.forEach((card, i) => {
            gsap.set(card, {
                yPercent: 0,
                scale: 1,
                opacity: 1,
                zIndex: count - i,
            });
        });

        const scrollPerCard = window.innerHeight * 0.8;
        const totalScrollDistance = (count - 1) * scrollPerCard;

        const st = ScrollTrigger.create({
            trigger: triggerRef.current,
            start: "top top",
            end: `+=${totalScrollDistance}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.3,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                const progress = self.progress;

                cards.forEach((card, i) => {
                    if (i === count - 1) return;

                    const cardStartProgress = i / (count - 1);
                    const cardEndProgress = (i + 1) / (count - 1);

                    let cardProgress = 0;
                    if (progress >= cardStartProgress && progress <= cardEndProgress) {
                        cardProgress = (progress - cardStartProgress) / (cardEndProgress - cardStartProgress);
                    } else if (progress > cardEndProgress) {
                        cardProgress = 1;
                    }

                    gsap.set(card, {
                        yPercent: -100 * cardProgress,
                        scale: 1 - (0.03 * cardProgress),
                        opacity: 1 - cardProgress,
                        zIndex: count - i,
                    });
                });
            }
        });

        scrollTriggerRef.current = st;

    }, { scope: container, dependencies: [challenges, isMobile, location.pathname] });

    return (
        <section ref={container} className="relative bg-gradient-to-b from-white to-gray-50/50 font-body py-16">
            {/* Intro Header */}
            <div className="container mx-auto px-4 py-8 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2D6A4F]/20 bg-[#E8F5EE] text-[#2D6A4F] font-bold text-[10px] uppercase tracking-wider">
                    <Sparkles size={12} /><span>The Solution Stack</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-900 leading-tight">
                    Problems, <span className="text-[#2D6A4F]">Solved.</span>
                </h2>
                {/* FIXED: high contrast text-slate-600 ensures subtitle text is perfectly visible */}
                <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
                    {isMobile ? 'Swipe to explore solutions.' : 'Scroll to explore how our AI tackles your challenges.'}
                </p>
                <div className={`animate-bounce mt-3 ${isMobile ? 'hidden' : ''} text-[#2D6A4F]/40`}>
                    <MousePointer2 size={18} className="mx-auto" />
                </div>
            </div>

            {/* Mobile: Swipe Carousel */}
            <div className={`relative pb-8 ${isMobile ? '' : 'hidden'}`}>
                <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 scrollbar-hide">
                    {challenges.map((challenge, index) => (
                        <MobileCard key={`mobile-${index}`} challenge={challenge} index={index} total={challenges.length} />
                    ))}
                </div>
            </div>

            {/* Desktop: GSAP Stack */}
            <div ref={triggerRef} className={`relative h-screen w-full ${isMobile ? 'hidden' : ''} bg-[#FAFCFB]`}>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] bg-[#2D6A4F]/5" />
                </div>
                <div className="relative w-full h-full max-w-7xl mx-auto">
                    {challenges.map((challenge, index) => (
                        <DesktopCard key={`desktop-${index}`} challenge={challenge} index={index} total={challenges.length} />
                    ))}
                </div>
            </div>

            <div className="h-8 md:h-[10vh] bg-white" />
        </section>
    );
};

export default CommonChallenges;
