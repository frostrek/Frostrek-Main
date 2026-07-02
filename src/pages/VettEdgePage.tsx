import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ArrowRight } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import FlipText from '../components/ui/FlipText';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── ACCENT ──────────────────── */
// VettEdge accent: rich purple
const A = '#800080';   // primary accent
const AH = '#600060';  // hover

/* ──────────────────── DATA ──────────────────── */

const PROBLEMS = [
    {
        title: 'Due Diligence Takes Weeks',
        description: 'Financial DD on a single company requires days of manual ratio computation, statement normalisation, and report writing. Time that kills deal velocity.',
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'No Single Platform Covers It All',
        description: 'CAs, VCs, and M&A teams juggle Excel models, Word templates, and disconnected tools with no unified workflow from upload to report.',
        icon: '/icons/gaps.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'AI Hallucinations Are a Dealbreaker',
        description: 'Generic AI tools produce plausible-looking numbers with no source traceability. Unacceptable for professionals staking their reputation on accuracy.',
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
        title: '3-Layer Hybrid Extraction Pipeline',
        description: 'Smart router, Gemini Flash Vision, and validation engine combined. Every extracted number is linked to its exact source page and cell.',
        icon: '/icons/architecture.png',
        bgColor: 'bg-[#EFF6FF]',
        border: 'border-[#BFDBFE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(37,99,235,0.05)]',
        headingColor: 'text-[#1D4ED8]',
        iconBorder: 'border-[#BFDBFE]/60',
        spotlight: 'rgba(37, 99, 235, 0.02)',
    },
    {
        title: '40+ Financial Ratios Engine',
        description: 'Liquidity, profitability, leverage, efficiency, valuation, and red flag ratios. All deterministic math, all formula-transparent.',
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'AI Red Flag Detection',
        description: 'Rules-based + LLM-augmented detection of earnings manipulation, revenue-cash divergence, qualified audits, related party risks, and 10+ other critical signals.',
        icon: '/icons/shield.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
    {
        title: 'MemoAI: Pitch Deck & CIM Analyser',
        description: "Upload a pitch deck, CIM, or voice note; receive a structured investment memo with configurable scoring against your fund's thesis.",
        icon: '/icons/ai.png',
        bgColor: 'bg-[#F4F4F5]',
        border: 'border-[#E4E4E7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(113,113,122,0.05)]',
        headingColor: 'text-[#3F3F46]',
        iconBorder: 'border-[#E4E4E7]/60',
        spotlight: 'rgba(113, 113, 122, 0.02)',
    },
];

const AGENTS = [
    {
        tag: 'Agent 01',
        title: 'Financial Due Diligence',
        description: 'Upload any financial statement (PDF, Excel, or Tally export). Get a 15-to-20 page DD report with 40+ ratios, red flag analysis, peer benchmarking, and full source traceability.',
        forAudience: 'CAs · NBFCs · M&A Advisors',
        icon: '/icons/data-analytics.png',
        tagBg: 'bg-[#EFF6FF]',
        tagText: 'text-[#1D4ED8]',
        tagBorder: 'border-[#BFDBFE]',
        bgColor: 'bg-[#EFF6FF]',
        border: 'border-[#BFDBFE]',
        hoverShadow: 'hover:shadow-[0_20px_50px_rgba(37,99,235,0.08)]',
        headingColor: 'text-[#1D4ED8]',
        iconBorder: 'border-[#BFDBFE]/60',
        spotlight: 'rgba(37, 99, 235, 0.025)',
    },
    {
        tag: 'Agent 02',
        title: 'Valuation & Scenario Modelling',
        description: 'DCF, comparable company analysis, comparable transactions, and asset-based valuation, with three-scenario modelling and sensitivity tables. Every assumption is transparent and user-adjustable.',
        forAudience: 'Investment Bankers · VCs · Corporate Finance',
        icon: '/icons/valuation.png',
        tagBg: 'bg-[#FFFBEB]',
        tagText: 'text-[#B45309]',
        tagBorder: 'border-[#FEF3C7]',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_20px_50px_rgba(245,158,11,0.08)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        tag: 'Agent 03',
        title: 'Investment Memo & CIM Analyser',
        description: "Upload a pitch deck, CIM, or record a voice note after a founder meeting. MemoAI produces a structured investment memo scored against your fund's thesis, in minutes.",
        forAudience: 'VCs · PE Funds · Angel Networks',
        icon: '/icons/investment.png',
        tagBg: 'bg-[#FFF1F2]',
        tagText: 'text-[#9F1239]',
        tagBorder: 'border-[#FFE4E6]',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FFE4E6]',
        hoverShadow: 'hover:shadow-[0_20px_50px_rgba(225,29,72,0.08)]',
        headingColor: 'text-[#9F1239]',
        iconBorder: 'border-[#FFE4E6]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
];

const AUDIENCE = [
    {
        title: 'Chartered Accountants',
        description: 'Run statutory valuations and client DD reports in a fraction of the time.',
        icon: '/icons/ca.png',
        bgColor: 'bg-[#EFF6FF]',
        border: 'border-[#BFDBFE]',
        headingColor: 'text-[#1D4ED8]',
        iconBorder: 'border-[#BFDBFE]/60',
        spotlight: 'rgba(37, 99, 235, 0.02)',
    },
    {
        title: 'Venture Capital Funds',
        description: 'Screen more deals faster with AI-generated memos and configurable scoring.',
        icon: '/icons/venture cap.webp',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.02)',
    },
    {
        title: 'Private Equity Firms',
        description: 'Deep financial analysis on targets with institutional-grade red flag detection.',
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#F4F4F5]',
        border: 'border-[#E4E4E7]',
        headingColor: 'text-[#3F3F46]',
        iconBorder: 'border-[#E4E4E7]/60',
        spotlight: 'rgba(113, 113, 122, 0.02)',
    },
    {
        title: 'M&A Advisors',
        description: 'Deliver polished DD reports to clients without weeks of manual spreadsheet work.',
        icon: '/icons/advisors.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'NBFCs & Lenders',
        description: 'Assess borrower financials with 40+ ratios and DSCR-focused risk analysis.',
        icon: '/icons/lender.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
    {
        title: 'Investment Bankers',
        description: 'Run multi-methodology valuations with client-ready scenario modelling outputs.',
        icon: '/icons/bank.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.02)',
    },
];

const TECH_STACK_MARQUEE = [
    { category: 'Frontend', name: 'Next.js', image: '/techstack/Next.js.svg' },
    { category: 'Frontend', name: 'Tailwind CSS', image: '/techstack/Tailwind CSS.svg' },
    { category: 'Backend', name: 'Python', image: '/techstack/Python.svg' },
    { category: 'Backend', name: 'FastAPI', image: '/techstack/FastAPI.svg' },
    { category: 'Database', name: 'PostgreSQL', image: '/techstack/PostgresSQL.svg' },
    { category: 'Storage', name: 'AWS S3', image: '/techstack/AWS.svg' },
    { category: 'AI Extraction', name: 'Gemini', image: '/techstack/gemini.png' },
    { category: 'Deployment', name: 'AWS', image: '/techstack/AWS.svg' },

];

/* ──────────────────── COMPONENTs ──────────────────── */

const VettEdgePage = () => {
    const problemsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const agentsRef = useRef<HTMLDivElement>(null);
    const audienceRef = useRef<HTMLDivElement>(null);
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
            // Agent cards
            const agentCards = agentsRef.current?.querySelectorAll('.agent-card');
            if (agentCards) {
                gsap.fromTo(agentCards, { y: 60, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: agentsRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }
            // Audience tiles
            const audienceTiles = audienceRef.current?.querySelectorAll('.audience-tile');
            if (audienceTiles) {
                gsap.fromTo(audienceTiles, { y: 40, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
                    scrollTrigger: { trigger: audienceRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
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
                title="VettEdge | AI Financial Due Diligence & Investment Intelligence | Frostrek AI"
                description="VettEdge is the first AI platform built for financial professionals: automating due diligence, valuation, and investment memos with institutional-grade accuracy. Built end-to-end by Frostrek."
                path="/products/vettedge"
                keywords="ai due diligence, financial due diligence ai, investment memo ai, valuation ai, ca tool ai, vc due diligence platform, m&a ai, frostrek vettedge"
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section className="relative min-h-screen flex items-center pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-[#F9FBFA]/50 font-body z-10">
                <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                    {/* Tag */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-bold mb-8 shadow-sm"
                    >
                        <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                        OUR PRODUCT
                        <ChevronRight className="w-3 h-3 ml-1 text-[#2D6A4F]/60" />
                    </motion.div>

                    {/* Headline */}
                    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-8 tracking-tight max-w-5xl mx-auto leading-tight text-[#2D6A4F]">
                        <SplitTextReveal as="span" className="text-[#800080]" type="chars" stagger={0.02} once={false}>
                            VettEdge
                        </SplitTextReveal>
                        {' '}
                        <SplitTextReveal as="span" type="chars" stagger={0.02} once={false}>
                            AI-Powered Financial
                        </SplitTextReveal>
                        <br />
                        <SplitTextReveal as="span" type="chars" stagger={0.02} once={false} delay={0.3}>
                            Due Diligence & Investment Intelligence
                        </SplitTextReveal>
                    </div>

                    {/* Subtext */}
                    <SplitTextReveal
                        as="p"
                        className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-500"
                        type="words" stagger={0.015} once={false} delay={0.6}
                    >
                        The first AI platform built for financial professionals - automating due diligence, valuation, and investment memos with institutional-grade accuracy. Built end-to-end by Frostrek.
                    </SplitTextReveal>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Link
                            to="/contact"
                            className={`group font-extrabold rounded-2xl px-8 h-14 text-base shadow-lg transition-all duration-300 flex items-center gap-2 text-white cursor-pointer border-none`}
                            style={{ backgroundColor: A }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = AH)}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = A)}
                        >
                            <FlipText hoverColor="text-white">
                                Explore VettEdge <ArrowRight className="w-4 h-4" />
                            </FlipText>
                        </Link>
                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* ═══════ SECTION 2 — PRODUCT OVERVIEW ═══════ */}
            <section id="overview" className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Side: Text */}
                        <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex self-center lg:self-start items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-widest mb-6"
                            >
                                Product Overview
                            </motion.div>
                            <h2 className="w-full mb-6 font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.01em]">
                                <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                    What is
                                </SplitTextReveal>
                                {' '}
                                <SplitTextReveal as="span" className="text-[#800080]" type="chars" stagger={0.02} once={false}>
                                    VettEdge?
                                </SplitTextReveal>
                            </h2>
                            <div className="w-full">
                                <SplitTextReveal
                                    as="p"
                                    className="text-lg text-gray-500 leading-relaxed"
                                    type="words" stagger={0.02} once={false} delay={0.3}
                                >
                                    VettEdge is a standalone AI-powered financial due diligence, valuation, and investment memo platform, purpose-built for CAs, investment bankers, VCs, PE funds, and M&A advisors. It accepts financial statements in any format, extracts data with source-linked accuracy, runs 40+ financial ratios, detects red flags, and produces 15-to-20 page professional-grade reports in minutes. Built as the wedge product on Frostrek's path to FundOS, the AI operating system for fund managers.
                                </SplitTextReveal>
                            </div>
                        </div>

                        {/* Right Side: Dashboard Visual */}
                        <div className="lg:col-span-7 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img src="/products/vettedge-home.png"
                                    alt="VettEdge AI Financial Due Diligence Platform"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(29,78,216,0.08)]"
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/products/WhatWeBuilt.png'; }} loading="lazy" width={512} height={512} />
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
                                Three critical gaps that slow down every financial professional doing due diligence today.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left: Problem Cards */}
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
                                                <img src={problem.icon} alt={problem.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" loading="lazy" width={512} height={512} />
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

                        {/* Right: Illustration */}
                        <div className="lg:col-span-7 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img src="/products/ProblemSolved.png"
                                    alt="Problems Solved by VettEdge"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]" loading="lazy" width={512} height={512} />
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
                                A complete, production-ready AI financial intelligence platform engineered from scratch.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left: Illustration */}
                        <div className="lg:col-span-7 order-2 lg:order-1 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img src="/products/WhatWeBuilt.png"
                                    alt="What VettEdge Built"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]" loading="lazy" width={512} height={512} />
                            </div>
                        </div>

                        {/* Right: Feature Cards */}
                        <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
                            <div ref={featuresRef} className="flex flex-col gap-3 md:gap-4">
                                {FEATURES.map((feature) => (
                                    <SpotlightCard
                                        key={feature.title}
                                        className={`feature-card group relative overflow-hidden rounded-xl border p-4 md:p-6 transition-all duration-300 ${feature.bgColor} ${feature.border} ${feature.hoverShadow} hover:-translate-y-1`}
                                        spotlightColor={feature.spotlight}
                                    >
                                        <div className="relative z-10 flex gap-3 md:gap-5 items-center">
                                            <div className={`w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${feature.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                                <img src={feature.icon} alt={feature.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" loading="lazy" width={512} height={512} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif text-[15px] md:text-xl font-bold mb-0.5 md:mb-1.5 text-black leading-tight">{feature.title}</h3>
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

            {/* ═══════ SECTION 5 — THREE AGENTS ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Three Agents.
                        </SplitTextReveal>
                        {' '}
                        <span className="relative inline-block">
                            <SplitTextReveal
                                as="span"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-[-0.01em] text-[#800080]"
                                type="chars" stagger={0.02} once={false}
                            >
                                One Platform.
                            </SplitTextReveal>
                            <motion.span
                                className={`absolute -bottom-1 left-0 h-1 rounded-full`}
                                style={{ background: `linear-gradient(to right, ${A}, ${A}40)` }}
                                initial={{ width: 0 }}
                                whileInView={{ width: '100%' }}
                                viewport={{ once: false }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                        <div className="mt-6">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                VettEdge ships three purpose-built AI agents — each solving a distinct problem for financial professionals.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={agentsRef} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
                        {AGENTS.map((agent) => (
                            <SpotlightCard
                                key={agent.tag}
                                className={`agent-card group relative overflow-hidden rounded-3xl md:rounded-[2rem] border p-5 md:p-8 transition-all duration-300 ${agent.bgColor} ${agent.border} ${agent.hoverShadow} hover:-translate-y-2`}
                                spotlightColor={agent.spotlight}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Tag */}
                                    <span className={`self-start text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 md:px-3 md:py-1 rounded-full border mb-2 md:mb-5 ${agent.tagBg} ${agent.tagText} ${agent.tagBorder}`}>
                                        {agent.tag}
                                    </span>

                                    {/* Icon */}
                                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center mb-2 md:mb-5 bg-white/50 ${agent.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={agent.icon} alt={agent.title} className="w-6 h-6 md:w-8 md:h-8 object-contain" loading="lazy" width={512} height={512} />
                                    </div>

                                    {/* Title */}
                                    <h3 className={`font-serif text-[17px] md:text-2xl font-bold mb-1.5 md:mb-3 leading-tight ${agent.headingColor}`}>{agent.title}</h3>

                                    {/* Body */}
                                    <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600 flex-1 mb-3 md:mb-6">{agent.description}</p>

                                    {/* For */}
                                    <div className="border-t border-current/10 pt-3 md:pt-4 mt-auto" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
                                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">For</p>
                                        <p className={`text-xs md:text-sm font-semibold ${agent.headingColor}`}>{agent.forAudience}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — WHO IT'S FOR ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Built for Financial Professionals
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                VettEdge is purpose-built for the people who live and die by financial accuracy.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={audienceRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {AUDIENCE.map((tile) => (
                            <SpotlightCard
                                key={tile.title}
                                className={`audience-tile group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-6 transition-all duration-300 ${tile.bgColor} ${tile.border} hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1`}
                                spotlightColor={tile.spotlight}
                            >
                                <div className="relative z-10 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 text-left">
                                    <div className={`w-12 h-12 md:w-12 md:h-12 rounded-xl border flex items-center justify-center shrink-0 mb-0 md:mb-4 bg-white/50 ${tile.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={tile.icon} alt={tile.title} className="w-6 h-6 md:w-7 md:h-7 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-serif text-[15px] md:text-lg font-bold mb-1 md:mb-2 leading-tight ${tile.headingColor}`}>{tile.title}</h3>
                                        <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600">{tile.description}</p>
                                    </div>
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
                                Want AI built for your
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false} delay={0.2}
                            >
                                financial workflows?
                            </SplitTextReveal>
                        </div>
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
                            type="words" stagger={0.02} once={false} delay={0.3}
                        >
                            Let's talk about what Frostrek can build for you.
                        </SplitTextReveal>
                        <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                className="group cta-btn w-full sm:w-auto px-10 py-4 bg-[#2D6A4F] text-white rounded-2xl font-medium text-[15px] shadow-lg shadow-[#2D6A4F]/10 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#1E4D38]"
                            >
                                <FlipText hoverColor="text-white">
                                    Talk to Frostrek <ArrowRight size={18} />
                                </FlipText>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VettEdgePage;



