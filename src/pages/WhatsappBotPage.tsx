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

const PROBLEMS = [
    {
        title: 'Leads Arrive on WhatsApp and Go Cold',
        description: 'Businesses get inbound inquiries on WhatsApp around the clock but cannot respond fast enough. By the time a human replies, the lead has lost interest and moved on.',
        icon: '/icons/gaps.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'Generic Bots Cannot Sell',
        description: 'Most WhatsApp bots are glorified FAQ machines. They answer simple questions but cannot hold a sales conversation, qualify intent, or guide a prospect toward a decision.',
        icon: '/icons/ai.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'Support Volume Overwhelms Teams',
        description: 'Customer queries pile up on WhatsApp faster than support teams can handle them. Without automation, response times suffer and customer satisfaction drops.',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FFE4E6]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#9F1239]',
        iconBorder: 'border-[#FFE4E6]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    }
];

const FEATURES = [
    {
        title: 'AI Sales Conversations',
        description: 'The bot engages inbound leads with natural, intent-aware conversation, pitches the right product or service, handles objections, and moves the prospect toward a decision.',
        icon: '/icons/ai agents.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'Deep Lead Qualification Engine',
        description: 'Goes beyond basic form collection. The bot asks contextual follow-up questions, scores lead quality based on responses, and routes high-intent prospects to your sales team instantly.',
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'Customer Query Resolution',
        description: 'Resolves support queries using a RAG-powered knowledge base built from your FAQs, product docs, and policies. Accurate answers, zero hallucination.',
        icon: '/icons/shield.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FFE4E6]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#9F1239]',
        iconBorder: 'border-[#FFE4E6]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
    {
        title: 'CRM Sync and Lead Dashboard',
        description: 'Every qualified lead is automatically logged with conversation summary, contact details, and intent score synced directly to your CRM or lead dashboard.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.05)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.02)',
    }
];

const INDUSTRIES = [
    {
        title: 'D2C and E-Commerce Brands',
        description: 'Capture product inquiries, qualify buyers, and resolve order queries inside the same WhatsApp thread your customers already started.',
        icon: '/icons/fintech.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#F97316]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'Real Estate Agencies',
        description: 'Engage property inquiries instantly, qualify buyer or renter intent through conversation, and book site visits without a single manual follow-up.',
        icon: '/icons/architecture.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'Financial Services and Lending',
        description: 'Handle loan inquiries, pre-qualify applicants through conversation, and route verified leads to your relationship managers.',
        icon: '/icons/bank.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FFE4E6]',
        hoverBorder: 'hover:border-[#E11D48]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#9F1239]',
        iconBorder: 'border-[#FFE4E6]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
    {
        title: 'Education and EdTech',
        description: 'Answer course queries, qualify prospective students, and guide them from first message to enrollment without dropping them into a form.',
        icon: '/icons/graduation.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#22C55E]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.05)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.02)',
    },
    {
        title: 'Healthcare and Clinics',
        description: 'Resolve patient queries, collect symptoms and details before appointments, and send automated booking confirmations on WhatsApp.',
        icon: '/icons/health-care.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#F97316]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'SMEs and Local Businesses',
        description: 'Replace the overwhelmed sales inbox with an AI that responds instantly, qualifies every lead, and never lets a conversation go cold.',
        icon: '/icons/collaboration.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    }
];

const TECH_STACK_MARQUEE = [
    { category: 'Messaging API', name: 'Meta WhatsApp Cloud API', image: '/techstack/Meta.svg' },
    { category: 'Backend', name: 'Node.js, Express', image: '/techstack/Node.js.svg' },
    { category: 'AI Layer', name: 'GPT-4o / Gemini Pro', image: '/techstack/gemini.png' },
    { category: 'RAG Engine', name: 'Semantic KB', image: '/icons/data-analytics.png' },
    { category: 'Flow Engine', name: 'Custom Builder', image: '/icons/architecture.png' },
    { category: 'Deployment', name: 'AWS', image: '/techstack/AWS.svg' },
];


const WhatsappBotPage = () => {
    const problemsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const industriesRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const ctaButtonsRef = useRef<HTMLDivElement>(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const problemCards = problemsRef.current?.querySelectorAll('.problem-card');
            if (problemCards) {
                gsap.fromTo(problemCards, { y: 60, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: problemsRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }

            const featureCards = featuresRef.current?.querySelectorAll('.feature-card');
            if (featureCards) {
                gsap.fromTo(featureCards, { y: 60, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: featuresRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }

            const industryTiles = industriesRef.current?.querySelectorAll('.industry-tile');
            if (industryTiles) {
                gsap.fromTo(industryTiles, { y: 40, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: industriesRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }

            const techBadges = techRef.current?.querySelectorAll('.tech-badge');
            if (techBadges) {
                gsap.fromTo(techBadges, { y: 20, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
                    scrollTrigger: { trigger: techRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }

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
                title="WhatsApp Bot | Frostrek AI"
                description="A standalone, full-featured AI bot built exclusively for WhatsApp. Captures leads, qualifies prospects, and resolves queries natively."
                keywords="WhatsApp bot, AI WhatsApp agent, WhatsApp automation, WhatsApp sales bot, WhatsApp support bot, Meta Cloud API"
                path="/products/whatsapp-bot"
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
                                WhatsApp Bot
                            </SplitTextReveal>
                            {' '}
                            <SplitTextReveal as="span" type="chars" stagger={0.02} once={false}>
                                Your AI Sales and Support Agent, Inside WhatsApp
                            </SplitTextReveal>
                        </div>

                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-500"
                            type="words" stagger={0.015} once={false} delay={0.6}
                        >
                            A standalone, full-featured AI bot built exclusively for WhatsApp. It captures leads, qualifies prospects, closes conversations, and resolves customer queries — all natively inside the app your customers already use every day. Built end-to-end by Frostrek.
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
                                Talk to Frostrek
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
                                    WhatsApp Bot?
                                </SplitTextReveal>
                            </h2>

                            <div className="text-lg text-gray-600 leading-relaxed space-y-4 mt-2">
                                <SplitTextReveal as="p" type="words" stagger={0.01} once={false} delay={0.2}>
                                    WhatsApp Bot is a production-grade, AI-powered sales and support automation platform built exclusively for WhatsApp using the Meta Cloud API.
                                </SplitTextReveal>
                                <SplitTextReveal as="p" type="words" stagger={0.01} once={false} delay={0.3}>
                                    Unlike generic chatbot tools that bolt WhatsApp on as an afterthought, this is WhatsApp-native from the ground up. It handles the full sales lifecycle from first message to qualified lead, and resolves customer queries with AI accuracy, all without pulling customers away from the app they are already in. Built for businesses where WhatsApp is not just a channel, it is the channel.
                                </SplitTextReveal>
                            </div>
                        </div>

                        {/* <div className="order-1 lg:order-2 relative w-full flex-1 mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img src="/products/hiyring-home.png"
                                    alt="WhatsApp Bot Dashboard"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.08)]" loading="lazy" width={512} height={512} />
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
                                Three critical gaps that generic tools and basic WhatsApp integrations cannot fix.
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
                                                    <img src={problem.icon} alt={problem.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" loading="lazy" width={512} height={512} />
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
                                <img src="/products/ProblemSolved.png"
                                    alt="The Problem We Solved"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]" loading="lazy" width={512} height={512} />
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
                                A complete, production-ready WhatsApp AI product engineered from scratch and built deeper than any generic integration.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        <div className="lg:col-span-7 order-2 lg:order-1 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img src="/products/WhatWeBuilt.png"
                                    alt="What We Built Architecture"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]" loading="lazy" width={512} height={512} />
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
                                                <img src={feature.icon} alt={feature.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" loading="lazy" width={512} height={512} />
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

            {/* ═══════ SECTION 5 — INDUSTRIES WE SERVE ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Built for WhatsApp-First Businesses
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                If your customers message you on WhatsApp, this is built for you.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={industriesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                        {INDUSTRIES.map((ind, idx) => (
                            <SpotlightCard
                                key={idx}
                                className={`industry-tile group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-5 md:p-8 transition-all duration-300 ${ind.bgColor} ${ind.border} ${ind.hoverShadow} ${ind.hoverBorder} hover:-translate-y-1`}
                                spotlightColor={ind.spotlight}
                            >
                                <div className="relative z-10 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-6 text-left">
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center shrink-0 bg-white/40 ${ind.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={ind.icon} alt={ind.title} className="w-6 h-6 md:w-7 md:h-7 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <div>
                                        <h3 className={`font-serif text-[15px] md:text-xl font-bold mb-1 md:mb-2 leading-tight ${ind.headingColor}`}>{ind.title}</h3>
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
                </div>

                <div ref={techRef} className="relative w-full overflow-hidden py-8 group">
                    <div className="flex animate-[marquee_40s_linear_infinite] w-max group-hover:[animation-play-state:paused]">
                        {[...TECH_STACK_MARQUEE, ...TECH_STACK_MARQUEE].map((tech, i) => (
                            <div key={i} className="flex flex-col items-center justify-center w-24 md:w-48 gap-3 md:gap-6 mx-3 md:mx-8 tech-badge">
                                <div className="h-10 md:h-16 w-full flex items-center justify-center px-2 md:px-4">
                                    <img src={tech.image} alt={tech.name} className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-sm hover:scale-105" loading="lazy" width={512} height={512} />
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
                    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-orange-50/60 rounded-full blur-[100px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false}
                            >
                                Ready to turn WhatsApp into
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false} delay={0.2}
                            >
                                your best sales channel?
                            </SplitTextReveal>
                        </div>
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
                            type="words" stagger={0.02} once={false} delay={0.3}
                        >
                            Let's talk about deploying WhatsApp Bot for your business.
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

export default WhatsappBotPage;
