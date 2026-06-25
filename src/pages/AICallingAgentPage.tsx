import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── DATA ──────────────────── */

const PROBLEMS = [
    {
        title: 'Missed Calls = Missed Revenue',
        description: 'Every unanswered inbound call is a lost lead. Customer support teams cannot be available 24/7, and customers who do not get through simply go elsewhere.',
        icon: '/icons/phone-call.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FFE4E6]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#9F1239]',
        iconBorder: 'border-[#FFE4E6]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
    {
        title: 'Outbound Calling Does Not Scale',
        description: 'Sales teams burn hours on cold outreach, follow-ups, and repetitive qualification calls. Human reps cannot dial 500 leads a day. An AI agent can.',
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'Generic IVRs Frustrate Customers',
        description: 'Press 1 for billing. Press 2 for support. Rule-based phone trees kill customer experience and fail the moment a caller goes off-script.',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    }
];

const FEATURES = [
    {
        title: 'Outbound Sales Dialer',
        description: 'AI agent dials leads from your CRM, delivers a natural pitch, handles objections, and qualifies or books a meeting without a human on the line.',
        icon: '/icons/phone-call.png',
        bgColor: 'bg-[#E8F5EE]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(37,99,235,0.05)]',
        headingColor: 'text-[#2D6A4F]',
        iconBorder: 'border-[#BFDBFE]/60',
        spotlight: 'rgba(37, 99, 235, 0.02)',
    },
    {
        title: 'Inbound Support Agent',
        description: 'Answers calls instantly, resolves common queries using your knowledge base, and escalates complex issues to a human rep with full call context.',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'Natural Language Voice Engine',
        description: 'Powered by frontier TTS and STT models. The agent listens, understands intent, and responds conversationally, not robotically.',
        icon: '/icons/ai.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(139,92,246,0.05)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(139, 92, 246, 0.02)',
    },
    {
        title: 'Live Call Dashboard',
        description: 'Monitor active calls, review transcripts, track resolution rates, and listen to recordings, all from one control panel.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },

    {
        title: 'Human Escalation and Takeover',
        description: 'One trigger and the AI hands off to a live agent with a real-time call summary. Warm transfer, zero context lost.',
        icon: '/icons/fintech.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
];

const MODES = [
    {
        tag: 'Outbound',
        title: 'Sales and Outreach Calling',
        description: 'Upload your lead list or connect your CRM. The agent dials, pitches, qualifies, and books. It runs hundreds of conversations in parallel while your reps focus on closing.',
        for: 'Real Estate · Finance · Sales Teams',
        icon: '/icons/phone-call.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/30',
        hoverShadow: 'hover:shadow-[0_20px_50px_rgba(14,165,233,0.1)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.04)',
        tagBg: 'bg-[#0284C7]/5',
        tagText: 'text-[#0284C7]',
        tagBorder: 'border-[#0284C7]/20',
    },
    {
        tag: 'Inbound',
        title: 'Support and Query Resolution',
        description: 'Every inbound call is answered instantly. The agent resolves common queries, collects information, and escalates only what truly needs a human, with full context handed over.',
        for: 'Customer Support · Finance · Real Estate',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#22C55E]/30',
        hoverShadow: 'hover:shadow-[0_20px_50px_rgba(34,197,94,0.1)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.04)',
        tagBg: 'bg-[#166534]/5',
        tagText: 'text-[#166534]',
        tagBorder: 'border-[#166534]/20',
    }
];

const INDUSTRIES = [
    {
        title: 'Real Estate',
        description: 'Follow up with every inquiry, qualify buyers and renters, and book site visits automatically the moment a lead comes in.',
        icon: '/icons/architecture.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#F97316]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'Financial Services',
        description: 'Handle loan inquiry calls, payment reminders, and support queries with compliance-aware, consistent AI conversations.',
        icon: '/icons/bank.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'Customer Support Teams',
        description: 'Scale your support capacity without scaling headcount. The AI handles tier-1 queries around the clock.',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FFE4E6]',
        hoverBorder: 'hover:border-[#E11D48]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#9F1239]',
        iconBorder: 'border-[#FFE4E6]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
    {
        title: 'Sales and SDR Teams',
        description: 'Run outbound campaigns at 10x the volume. Let AI handle first contact and qualification while your reps own the close.',
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#22C55E]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.05)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.02)',
    }
];

const TECH_STACK_MARQUEE = [
    { category: 'Frontend', name: 'Next.js, Tailwind CSS', image: '/techstack/Next.js.svg' },
    { category: 'Backend', name: 'Node.js, Express / FastAPI', image: '/techstack/Node.js.svg' },
    { category: 'Voice AI', name: 'ElevenLabs / Deepgram', image: '/icons/Voice ai.png' },
    { category: 'LLM Layer', name: 'GPT-4o / Gemini Pro', image: '/techstack/gemini.png' },
    { category: 'Telephony', name: 'Twilio Voice', image: '/techstack/Twilio.png' },
    { category: 'CRM Sync', name: 'REST API / Webhooks', image: '/icons/collaboration.png' },
    { category: 'Deployment', name: 'AWS / Render', image: '/techstack/AWS.svg' },
];

/* ──────────────────── COMPONENT ──────────────────── */

const AICallingAgentPage = () => {
    const problemsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const modesRef = useRef<HTMLDivElement>(null);
    const industriesRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const ctaButtonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Problem cards
            const problemCards = problemsRef.current?.querySelectorAll('.problem-card');
            if (problemCards) {
                gsap.fromTo(problemCards, { y: 60, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: problemsRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }
            // Feature cards
            const featureCards = featuresRef.current?.querySelectorAll('.feature-card');
            if (featureCards) {
                gsap.fromTo(featureCards, { y: 60, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: featuresRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }
            // Mode cards
            const modeCards = modesRef.current?.querySelectorAll('.mode-card');
            if (modeCards) {
                gsap.fromTo(modeCards, { y: 60, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: modesRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }
            // Industry tiles
            const industryTiles = industriesRef.current?.querySelectorAll('.industry-tile');
            if (industryTiles) {
                gsap.fromTo(industryTiles, { y: 40, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: industriesRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }
            // Tech badges
            const techBadges = techRef.current?.querySelectorAll('.tech-badge');
            if (techBadges) {
                gsap.fromTo(techBadges, { y: 20, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
                    scrollTrigger: { trigger: techRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }
            // CTA buttons
            const ctaBtns = ctaButtonsRef.current?.querySelectorAll('.cta-btn');
            if (ctaBtns) {
                gsap.fromTo(ctaBtns, { y: 40, opacity: 0, scale: 0.9 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.7)',
                    scrollTrigger: { trigger: ctaButtonsRef.current, start: 'top 95%', toggleActions: 'play reverse play reverse' }
                });
            }
        });
        return () => ctx.revert();
    });

    return (
        <div className="relative min-h-screen bg-white text-[#2D6A4F] font-body">
            <SEO
                title="AI Calling Agent | Frostrek AI"
                description="A production-grade AI voice agent platform that handles outbound sales calls and inbound customer support, autonomously."
                keywords="AI calling agent, AI voice bot, outbound AI sales, inbound AI support, conversational AI, voice AI platform"
                path="/products/ai-calling-agent"
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden flex flex-col justify-center min-h-[90vh]">

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center">
                    <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-bold mb-8 shadow-sm"
                        >
                            <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                            OUR PRODUCT
                        </motion.div>

                        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-8 tracking-tight max-w-5xl mx-auto leading-tight text-[#2D6A4F]">
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                AI Calling Agent
                            </SplitTextReveal>
                            {' '}
                            <SplitTextReveal as="span" type="chars" stagger={0.02} once={false}>
                                Conversations That Convert, Around the Clock
                            </SplitTextReveal>
                        </div>

                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-500"
                            type="words" stagger={0.015} once={false} delay={0.6}
                        >
                            A production-grade AI voice agent platform that handles outbound sales calls and inbound customer support, autonomously, at scale, with human-like conversation quality. Built end-to-end by Frostrek.
                        </SplitTextReveal>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                        >
                            <Link
                                to="/contact"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-bold text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 overflow-hidden"
                            >
                                Talk to us
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 2 — PRODUCT OVERVIEW ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                        <div className="order-2 lg:order-1 flex-1 w-full max-w-2xl mx-auto flex flex-col justify-center text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-bold tracking-widest uppercase mb-8 shadow-sm self-center lg:self-start"
                            >
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#2D6A4F]" />
                                PRODUCT OVERVIEW
                            </motion.div>

                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em] mb-6">
                                <SplitTextReveal as="span" type="words" stagger={0.03} once={false}>
                                    What is
                                </SplitTextReveal>
                                <br />
                                <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                    AI Calling Agent?
                                </SplitTextReveal>
                            </h2>

                            <div className="text-lg text-gray-600 leading-relaxed space-y-4 mt-2">
                                <SplitTextReveal as="p" type="words" stagger={0.01} once={false} delay={0.2}>
                                    AI Calling Agent is a production-ready autonomous voice AI platform built for businesses that cannot afford to miss a call or waste a rep's time on one that does not convert.
                                </SplitTextReveal>
                                <SplitTextReveal as="p" type="words" stagger={0.01} once={false} delay={0.3}>
                                    It handles outbound sales outreach and inbound support queries with natural, context-aware conversation. No scripts, no hold times, no headcount increase. Built for customer support teams and high-velocity industries like real estate and finance, where every conversation is a revenue opportunity.
                                </SplitTextReveal>
                            </div>
                        </div>

                        {/* <div className="order-1 lg:order-2 relative w-full flex-1 mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img
                                    src="/products/hiyring-home.png"
                                    alt="AI Calling Agent Dashboard"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.08)]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl lg:rounded-[2.2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 3 — THE PROBLEM ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            The Problem We Solved
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Three critical gaps that cost businesses revenue and customers every single day.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <div ref={problemsRef} className="flex flex-col gap-3 md:gap-6">
                                {PROBLEMS.map((problem, idx) => (
                                    <SpotlightCard
                                        key={idx}
                                        className={`problem-card group relative overflow-hidden rounded-xl border p-4 md:p-6 transition-all duration-300 ${problem.bgColor} ${problem.border} ${problem.hoverShadow} hover:-translate-y-1`}
                                        spotlightColor={problem.spotlight}
                                    >
                                        <div className="relative z-10 flex gap-3 md:gap-5 items-center justify-between">
                                            <div className="flex gap-3 md:gap-5 items-center flex-1">
                                                <div className={`w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${problem.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                                    <img src={problem.icon} alt={problem.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className={`font-serif text-[15px] md:text-xl font-bold mb-0.5 md:mb-1.5 leading-tight text-black`}>{problem.title}</h3>
                                                    <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600">{problem.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-7 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img
                                    src="/products/ProblemSolved.png"
                                    alt="The Problem We Solved"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4 — WHAT WE BUILT ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            What We Built
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                A complete, production-ready AI voice agent platform engineered from scratch.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 order-2 lg:order-1 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img
                                    src="/products/WhatWeBuilt.png"
                                    alt="What We Built Architecture"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
                            <div ref={featuresRef} className="flex flex-col gap-3 md:gap-4">
                                {FEATURES.map((feature, idx) => (
                                    <SpotlightCard
                                        key={idx}
                                        className={`feature-card group relative overflow-hidden rounded-xl border p-4 md:p-6 transition-all duration-300 ${feature.bgColor} ${feature.border} ${feature.hoverShadow} hover:-translate-y-1`}
                                        spotlightColor={feature.spotlight}
                                    >
                                        <div className="relative z-10 flex gap-3 md:gap-5 items-center">
                                            <div className={`w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${feature.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                                <img src={feature.icon} alt={feature.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif text-[15px] md:text-xl font-bold mb-0.5 md:mb-1.5 leading-tight text-black">{feature.title}</h3>
                                                <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600">{feature.description}</p>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — TWO MODES, ONE PLATFORM ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Two Modes. One Platform.
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Whether your calls are coming in or going out, AI Calling Agent handles both.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={modesRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {MODES.map((mode) => (
                            <SpotlightCard
                                key={mode.tag}
                                className={`mode-card group relative overflow-hidden rounded-[2rem] border p-6 md:p-12 transition-all duration-300 ${mode.bgColor} ${mode.border} ${mode.hoverShadow} ${mode.hoverBorder} hover:-translate-y-2`}
                                spotlightColor={mode.spotlight}
                            >
                                <div className="relative z-10 h-full flex flex-col">
                                    <div className="flex justify-between items-start mb-6 md:mb-8">
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 transition-transform duration-300 group-hover:scale-110 shadow-sm ${mode.iconBorder}`}>
                                            <img src={mode.icon} alt={mode.title} className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                                        </div>
                                        <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full ${mode.tagBg} ${mode.tagText} text-[10px] md:text-xs font-bold tracking-widest uppercase border ${mode.tagBorder} shadow-sm`}>
                                            {mode.tag}
                                        </div>
                                    </div>
                                    <h3 className={`font-serif text-xl md:text-3xl font-bold mb-2 md:mb-4 ${mode.headingColor}`}>{mode.title}</h3>
                                    <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-4 md:mb-8 flex-grow">
                                        {mode.description}
                                    </p>
                                    <div className="pt-6 border-t border-black/5 flex items-center justify-between">
                                        <div className={`text-sm font-bold ${mode.headingColor} tracking-wider opacity-80`}>
                                            FOR: {mode.for}
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — INDUSTRIES WE SERVE ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Built for High-Stakes Conversations
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Industries where every call is a relationship and every missed call is a cost.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={industriesRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
                        {INDUSTRIES.map((ind, idx) => (
                            <SpotlightCard
                                key={idx}
                                className={`industry-tile group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-5 md:p-8 transition-all duration-300 ${ind.bgColor} ${ind.border} ${ind.hoverShadow} ${ind.hoverBorder} hover:-translate-y-1`}
                                spotlightColor={ind.spotlight}
                            >
                                <div className="relative z-10 flex items-center gap-4 md:gap-6">
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${ind.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={ind.icon} alt={ind.title} className="w-6 h-6 md:w-7 md:h-7 object-contain" />
                                    </div>
                                    <div>
                                        <h3 className={`font-serif text-[17px] md:text-xl font-bold mb-1 md:mb-2 leading-tight ${ind.headingColor}`}>{ind.title}</h3>
                                        <p className="text-gray-600 text-[12px] md:text-sm leading-snug md:leading-relaxed">
                                            {ind.description}
                                        </p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 7 — TECH STACK ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Tech Stack
                        </SplitTextReveal>
                    </div>

                    <div ref={techRef} className="flex flex-wrap justify-center gap-3 md:gap-4">
                        {TECH_STACK_MARQUEE.map((tech, index) => (
                            <div key={index} className="tech-badge flex flex-col items-center justify-center bg-white border border-gray-100 rounded-2xl md:rounded-3xl p-4 md:p-6 w-28 md:w-36 h-28 md:h-36 shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-8 md:h-12 w-full flex items-center justify-center px-2 mb-2 md:mb-3">
                                    <img src={tech.image} alt={tech.name} className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-sm hover:scale-105" />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{tech.category}</span>
                                    <span className="text-[10px] md:text-xs font-medium text-gray-700 leading-tight">{tech.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 8 — CTA BANNER ═══════ */}
            <section className="py-16 lg:py-24 relative overflow-hidden bg-white font-sans">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-badge-bg/80 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#E8F5EE]/60 rounded-full blur-[100px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false}
                            >
                                Ready to put your calls
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false} delay={0.2}
                            >
                                on autopilot?
                            </SplitTextReveal>
                        </div>
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
                            type="words" stagger={0.02} once={false} delay={0.3}
                        >
                            Let's talk about deploying AI Calling Agent for your business.
                        </SplitTextReveal>

                        <div ref={ctaButtonsRef} className="flex justify-center">
                            <Link
                                to="/contact"
                                className="cta-btn group relative flex items-center gap-3 px-10 py-5 bg-[#2D6A4F] text-white rounded-full font-bold text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 overflow-hidden"
                            >
                                Talk to Frostrek
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AICallingAgentPage;
