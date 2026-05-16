import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Activity, Zap } from 'lucide-react';
import Button from '../ui/Button';
import SplitTextReveal from '../ui/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const FrostyHero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const dashboardRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Dashboard entrance animation
            if (dashboardRef.current) {
                gsap.fromTo(dashboardRef.current,
                    { opacity: 0, y: 60, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1,
                        duration: 1,
                        delay: 0.8,
                        ease: 'power3.out',
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative min-h-[80vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#F9FBFA]/50 font-body z-10">

            {/* Content Container */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">

                {/* Floating Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-bold mb-8 shadow-sm"
                >
                    <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                    AUTOMATE CUSTOMER SUPPORT
                    <span className="mx-1 text-xs text-[#2D6A4F]/40">·</span>
                    <span className="font-extrabold">Top Rated Support AI</span>
                    <ChevronRight className="w-3 h-3 ml-1 text-[#2D6A4F]/60" />
                </motion.div>

                {/* Main Headline — SplitTextReveal */}
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black mb-8 tracking-tight max-w-5xl mx-auto leading-tight text-[#2D6A4F]">
                    <SplitTextReveal as="span" type="chars" stagger={0.02} once={false}>
                        Frosty: The AI Brain
                    </SplitTextReveal>
                    <br />
                    <SplitTextReveal as="span" type="chars" stagger={0.02} once={false} delay={0.3}>
                        for your Business.
                    </SplitTextReveal>
                </div>

                {/* Subtext */}
                <SplitTextReveal
                    as="p"
                    className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-500 font-medium"
                    type="words"
                    stagger={0.015}
                    once={false}
                    delay={0.6}
                >
                    Empower your support team with an intelligent agent that understands context, sentiment, and intent. Resolve up to 80% of inquiries instantly.
                </SplitTextReveal>

                {/* Buttons — Using site's Button component with FlipText */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-20"
                >
                    <Button
                        size="lg"
                        onClick={() => window.location.href = '/schedule-demo'}
                        className="font-extrabold rounded-2xl px-8 h-14 text-base shadow-lg transition-all duration-300 flex items-center gap-2 bg-[#2D6A4F] text-white hover:bg-[#1B4332] hover:shadow-xl hover:shadow-[#2D6A4F]/25 cursor-pointer border-none"
                    >
                        Schedule a Demo
                    </Button>
                </motion.div>

                {/* Animated Dashboard Card */}
                <div ref={dashboardRef} className="w-full max-w-4xl mx-auto opacity-0">
                    <div className="relative rounded-[2rem] bg-white border border-[#E6EFE6] shadow-[0_50px_120px_rgba(45,106,79,0.15)] overflow-hidden">
                        {/* Dashboard Header */}
                        <div className="h-12 bg-[#F4F9F6] border-b border-[#E6EFE6] flex items-center px-5 gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-inner"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner"></div>
                                <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-inner"></div>
                            </div>
                            <div className="ml-4 px-3 py-1 bg-white border border-[#E6EFE6] rounded-md text-[10px] font-bold text-[#2D6A4F] flex items-center gap-2 uppercase tracking-wider">
                                <Activity className="w-3 h-3 text-[#2D6A4F]" /> Live Transcription
                            </div>
                        </div>

                        {/* Dashboard Body */}
                        <div className="p-6 md:p-10 bg-white min-h-[280px] flex flex-col gap-5 font-body text-sm">
                            <TranscriptionLine delay={0.4} speaker="User" text="I need help tracking my recent order." />
                            <TranscriptionLine delay={1.2} speaker="Frosty AI" text="I can help with that! Can you provide your order number?" isAgent />
                            <TranscriptionLine delay={2.0} speaker="User" text="Sure, it's ORD-99231-X." />

                            {/* Analyzing State */}
                            <motion.div
                                className="flex items-center gap-3 text-xs text-gray-400 mt-2 pl-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0.5, 1, 0] }}
                                transition={{ delay: 2.8, duration: 1.2, repeat: Infinity }}
                            >
                                <Zap className="w-4 h-4 text-[#2D6A4F] animate-pulse" /> Analyzing intent & fetching shipping data...
                            </motion.div>

                            <TranscriptionLine delay={3.2} speaker="Frosty AI" text="Found it! Your order is currently out for delivery and will arrive by 4:00 PM today." isAgent />
                        </div>
                    </div>
                </div>
            </div>

            {/* Soft fade at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
        </section>
    );
};

const TranscriptionLine = ({ delay, speaker, text, isAgent = false }: { delay: number, speaker: string, text: string, isAgent?: boolean }) => {
    return (
        <motion.div
            className={`flex flex-col gap-1.5 ${isAgent ? 'items-start' : 'items-start'}`}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
        >
            <span className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isAgent ? 'text-[#2D6A4F]' : 'text-gray-400'}`}>
                {speaker}
            </span>
            <div className={`px-5 py-3.5 rounded-2xl border transition-all duration-300 ${isAgent ? 'bg-[#F4F9F6] border-[#2D6A4F]/10 text-[#2D6A4F] shadow-sm' : 'bg-gray-50/50 border-gray-100 text-gray-700'}`}>
                <span className="font-medium leading-relaxed">{text}</span>
            </div>
        </motion.div>
    );
};

export default FrostyHero;
