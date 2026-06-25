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
        title: '20 Changeovers a Week, Zero Intelligence',
        description: "The manufacturing plant lost 20–42 tons of weekly production from product changeovers decided by Excel sheets and gut feel — no one was sequencing products intelligently to minimise downtime.",
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'Four Systems, Zero Integration',
        description: 'Syspro ERP, Fusion WMS, CFAM extruder PLC, and Famsun plant system operated as isolated islands — shift handovers happened on WhatsApp, quality readings on WhatsApp, cost per kg calculated monthly from financials when it was too late to act.',
        icon: '/icons/gaps.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'Invisible Factory',
        description: "Management couldn't see the factory floor in real time — no live production data, no changeover tracking, no sensor alerts, no shift accountability beyond verbal reports.",
        icon: '/icons/shield.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FFE4E6]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#9F1239]',
        iconBorder: 'border-[#FFE4E6]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
];

const FEATURES = [
    {
        title: 'Four-System Integration Layer',
        description: 'Connected Syspro ERP (SQL), Fusion WMS (REST API), CFAM TX80 Extruder (PLC via EtherNet/IP), and Famsun Plant (MQTT) — all read-only, zero changes to existing systems.',
        icon: '/icons/architecture.png',
        bgColor: 'bg-[#EFF6FF]',
        border: 'border-[#BFDBFE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(37,99,235,0.05)]',
        headingColor: 'text-[#1D4ED8]',
        iconBorder: 'border-[#BFDBFE]/60',
        spotlight: 'rgba(37, 99, 235, 0.02)',
    },
    {
        title: 'Real-Time Factory Dashboard',
        description: 'Live extruder parameters every 30 seconds via WebSocket, orders and job cards synced every 10 minutes, plant equipment status in real-time — one unified view replacing WhatsApp chaos.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'Digital Shift Handover & Quality Forms',
        description: 'Replaced WhatsApp shift reporting with structured forms capturing changeover data, quality readings, output, and machine issues — feeding analytics and AI scheduling.',
        icon: '/icons/collaboration.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.05)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.02)',
    },
    {
        title: 'Sensor Alerting System',
        description: 'Configurable thresholds per product; instant push alerts (dashboard, email, WhatsApp via Twilio) when moisture, temperature, or any reading drifts outside acceptable range.',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
];

const IMPACT = [
    {
        value: '20–42',
        unit: 'Tons/Week',
        label: 'Recovered',
        description: 'Lost production from poor changeover sequencing eliminated through AI-optimised scheduling.',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.08)]',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        value: '75% → 85%+',
        unit: '',
        label: 'Capacity',
        description: 'Factory throughput increased 10+ percentage points with smarter sequencing and real-time visibility.',
        bgColor: 'bg-[#EFF6FF]',
        border: 'border-[#BFDBFE]',
        headingColor: 'text-[#1D4ED8]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(37,99,235,0.08)]',
        spotlight: 'rgba(37, 99, 235, 0.025)',
    },
    {
        value: 'Zero',
        unit: 'Hardware',
        label: 'Investment',
        description: 'All gains from software intelligence — no new extruders, no new PLCs, just better decisions.',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.08)]',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    }
];

const TECH_STACK_MARQUEE = [
    { category: 'Backend', name: 'Python (FastAPI)', image: '/techstack/Python.svg' },
    { category: 'Frontend', name: 'Next.js + WebSocket', image: '/techstack/Next.js.svg' },
    { category: 'Database', name: 'TimescaleDB', image: '/techstack/PostgresSQL.svg' },
    { category: 'Cache & Queue', name: 'Redis', image: '/techstack/Redis.svg' },
    { category: 'ERP', name: 'pyodbc (SQL Server)', image: '/icons/gaps.png' },
    { category: 'AI Scheduler', name: 'Google OR-Tools', image: '/techstack/OR-tools.png' },
    { category: 'Alerting', name: 'Twilio', image: '/techstack/Twilio.png' },
    { category: 'Deployment', name: 'AWS EC2, Docker', image: '/techstack/AWS.svg' },
];

/* ──────────────────── COMPONENT ──────────────────── */

const ManufacturingOSPage = () => {
    const problemsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const impactRef = useRef<HTMLDivElement>(null);
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
            // Impact tiles
            const impactTiles = impactRef.current?.querySelectorAll('.impact-tile');
            if (impactTiles) {
                gsap.fromTo(impactTiles, { y: 40, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: impactRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
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
                title="Manufacturing AI OS | Frostrek AI"
                description="A unified intelligence platform that connects disconnected factory systems, delivers real-time visibility, and uses AI-powered scheduling to recover lost capacity."
                keywords="manufacturing AI, factory intelligence, AI scheduling, industrial production AI, OR-Tools scheduling, real-time factory dashboard"
                path="/products/frostrek-manufacturing-os"
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section className="relative pt-32 md:pt-48 pb-16 md:pb-32 overflow-hidden flex flex-col justify-center min-h-[90vh]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-badge-bg/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
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
                                Manufacturing AI OS
                            </SplitTextReveal>
                            {' '}
                            <SplitTextReveal as="span" type="chars" stagger={0.02} once={false}>
                                Real-Time Intelligence
                            </SplitTextReveal>
                            <br />
                            <SplitTextReveal as="span" type="chars" stagger={0.02} once={false} delay={0.3}>
                                for Industrial Production
                            </SplitTextReveal>
                        </div>

                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-500"
                            type="words" stagger={0.015} once={false} delay={0.6}
                        >
                            A unified intelligence platform that connects disconnected factory systems, delivers real-time visibility, and uses AI-powered scheduling to recover lost capacity — without buying new equipment. Built end-to-end by Frostrek.
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
                                Talk to Us
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 2 — PRODUCT OVERVIEW ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1 flex flex-col justify-center text-center lg:text-left">
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
                                {' '}
                                <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                    Manufacturing AI OS?
                                </SplitTextReveal>
                            </h2>

                            <div className="text-lg text-gray-600 leading-relaxed space-y-4 mt-2">
                                <SplitTextReveal as="p" type="words" stagger={0.01} once={false} delay={0.2}>
                                    Manufacturing AI OS is a production-ready intelligence layer built for industrial manufacturers. It connects existing ERP, WMS, PLC, and SCADA systems into a single real-time dashboard — no hardware changes, no system replacements, read-only access.
                                </SplitTextReveal>
                                <SplitTextReveal as="p" type="words" stagger={0.01} once={false} delay={0.3}>
                                    In a recent deployment, it recovered 20–42 tons of weekly production capacity by solving product sequencing and visibility gaps that no machine upgrade could fix.
                                </SplitTextReveal>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img
                                    src="/products/manufacturing-home.png"
                                    alt="Manufacturing AI OS Dashboard"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.08)]"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/products/WhatWeBuilt.png'; }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 3 — THE PROBLEM WE SOLVED ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
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
                                Three critical gaps holding the factory back from full capacity.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <div ref={problemsRef} className="flex flex-col gap-3 md:gap-6">
                                {PROBLEMS.map((problem) => (
                                    <SpotlightCard
                                        key={problem.title}
                                        className={`problem-card group relative overflow-hidden rounded-xl border p-4 md:p-6 transition-all duration-300 ${problem.bgColor} ${problem.border} ${problem.hoverShadow} hover:-translate-y-1`}
                                        spotlightColor={problem.spotlight}
                                    >
                                        <div className="relative z-10 flex gap-3 md:gap-5 items-center">
                                            <div className={`w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${problem.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                                <img src={problem.icon} alt={problem.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif text-[15px] md:text-xl font-bold mb-0.5 md:mb-1.5 text-black leading-tight">{problem.title}</h3>
                                                <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600">{problem.description}</p>
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
                                    alt="Problems Solved by Manufacturing AI OS"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4 — WHAT WE BUILT ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
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
                                A complete manufacturing intelligence platform engineered from the ground up.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 order-2 lg:order-1 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img
                                    src="/products/WhatWeBuilt.png"
                                    alt="What Frostrek Built"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
                            <div ref={featuresRef} className="flex flex-col gap-3 md:gap-4">
                                {FEATURES.map((feature) => (
                                    <SpotlightCard
                                        key={feature.title}
                                        className={`feature-card group relative overflow-hidden rounded-xl border p-4 md:p-6 transition-all duration-300 ${feature.bgColor} ${feature.border} ${feature.hoverShadow} hover:-translate-y-1`}
                                        spotlightColor={feature.spotlight}
                                    >
                                        <div className="relative z-10 flex gap-3 md:gap-5 items-center">
                                            <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/50 ${feature.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                                <img src={feature.icon} alt={feature.title} className="w-5 h-5 md:w-7 md:h-7 object-contain" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif text-[15px] md:text-[1.1rem] font-bold mb-0.5 md:mb-1 text-black leading-tight">{feature.title}</h3>
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

            {/* ═══════ SECTION 6 — IMPACT & RESULTS ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            The Impact
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                75% to 85%+ capacity utilization — without buying a single new machine.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={impactRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
                        {IMPACT.map((item, index) => (
                            <SpotlightCard
                                key={index}
                                className={`impact-tile relative overflow-hidden p-5 md:p-8 rounded-2xl md:rounded-3xl border transition-all duration-300 text-center flex flex-col items-center group hover:-translate-y-2 ${item.bgColor} ${item.border} ${item.hoverShadow}`}
                                spotlightColor={item.spotlight}
                            >
                                <div className="relative z-10 flex flex-col items-center h-full">
                                    <div className={`text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight mb-1.5 md:mb-2 flex items-baseline gap-1 ${item.headingColor}`}>
                                        {item.value}
                                        {item.unit && <span className={`text-sm md:text-xl lg:text-2xl font-body font-bold tracking-normal opacity-70`}>{item.unit}</span>}
                                    </div>
                                    <h4 className="text-sm md:text-lg font-bold text-gray-900 uppercase tracking-widest mb-2 md:mb-4">{item.label}</h4>
                                    <p className="text-[12px] md:text-sm text-gray-600 leading-snug md:leading-relaxed max-w-xs">{item.description}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 7 — TECH STACK ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
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
                </div>

                <div ref={techRef} className="relative w-full overflow-hidden py-8 group">
                    <div className="flex animate-[marquee_40s_linear_infinite] w-max group-hover:[animation-play-state:paused]">
                        {[...TECH_STACK_MARQUEE, ...TECH_STACK_MARQUEE].map((tech, i) => (
                            <div key={i} className="flex flex-col items-center justify-center w-24 md:w-48 gap-3 md:gap-6 mx-3 md:mx-8 tech-badge">
                                <div className="h-10 md:h-16 w-full flex items-center justify-center px-2 md:px-4">
                                    <img src={tech.image} alt={tech.name} className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-sm hover:scale-105" />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-black mb-1">{tech.category}</span>
                                    <span className="text-[10px] md:text-xs font-medium text-gray-500">{tech.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 8 — CTA BANNER ═══════ */}
            <section className="py-16 lg:py-24 relative overflow-hidden bg-brand-light-bg font-sans">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-badge-bg/80 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-blue-50/60 rounded-full blur-[100px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false}
                            >
                                Want manufacturing intelligence
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false} delay={0.2}
                            >
                                built for your factory?
                            </SplitTextReveal>
                        </div>
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
                            type="words" stagger={0.02} once={false} delay={0.3}
                        >
                            Let's talk about how Frostrek can unlock capacity in your operations.
                        </SplitTextReveal>
                        <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                className="cta-btn group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-bold text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto"
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

export default ManufacturingOSPage;
