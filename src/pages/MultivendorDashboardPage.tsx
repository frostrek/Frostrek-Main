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

const PROBLEM_POINTS = [
    {
        title: 'Fragmented Data',
        description: 'Your revenue is spread across multiple platforms — no single source of truth for total sales, inventory, or profit.',
        icon: '/icons/gaps.png',
        bgColor: 'bg-[#F0F9FF]',
        borderColor: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
        iconBg: 'bg-white/60',
        iconBorder: 'border-[#BAE6FD]/60',
        iconColor: 'text-[#0284C7]',
    },
    {
        title: 'Manual Reconciliation',
        description: "You're downloading CSV exports, copying numbers into spreadsheets, and calculating totals by hand — wasting hours every week.",
        icon: '/icons/custom dev.png',
        bgColor: 'bg-[#FFF7ED]',
        borderColor: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
        iconBg: 'bg-white/60',
        iconBorder: 'border-[#FFEDD5]/60',
        iconColor: 'text-[#C2410C]',
    },
    {
        title: 'Blind Spots',
        description: 'A product sells out on one platform while overstocked on another. You don\'t know until customers complain or capital is tied up in dead stock.',
        icon: '/icons/shield.png',
        bgColor: 'bg-[#F0FDF4]',
        borderColor: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
        iconBg: 'bg-white/60',
        iconBorder: 'border-[#BBF7D0]/60',
        iconColor: 'text-[#166534]',
    },
    {
        title: 'No Predictive Intelligence',
        description: 'You react to demand spikes after they happen. No AI forecasting. No inventory alerts. No market trend signals.',
        icon: '/icons/machine-learning.png',
        bgColor: 'bg-[#FFF1F2]',
        borderColor: 'border-[#FECDD3]',
        headingColor: 'text-[#E11D48]',
        iconBg: 'bg-white/60',
        iconBorder: 'border-[#FECDD3]/60',
        iconColor: 'text-[#E11D48]',
    },
];

const CAPABILITIES = [
    {
        title: 'Unified Revenue Dashboard',
        description: 'Real-time consolidation of sales across all your storefronts. See total revenue, orders, and profit in one view — no spreadsheets, no platform hopping.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'AI Demand Forecasting',
        description: 'Machine learning models trained on your historical sales data predict demand spikes 7–30 days ahead. Stock the right products before the rush hits.',
        icon: '/icons/ai.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Cross-Platform Inventory Sync',
        description: 'Live inventory tracking across all storefronts. Auto-alerts when stock falls below thresholds. Prevent overselling and stockouts.',
        icon: '/icons/multivendor.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Profit Margin Analysis',
        description: 'Per-product, per-platform profit calculation accounting for platform fees, shipping costs, COGS, and ad spend. Know which products actually make money.',
        icon: '/icons/fintech.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Market Trend Intelligence',
        description: 'AI-powered trend analysis pulls search volume, competitor pricing, and category demand shifts. Spot opportunities before your competitors do.',
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        title: 'Automated Reporting',
        description: 'Weekly and monthly performance reports auto-generated and emailed. Investor-ready P&L, SKU performance, channel breakdowns — all automated.',
        icon: '/icons/custom dev.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
];

const AUDIENCE_CARDS = [
    {
        title: 'Multi-Channel Brands',
        description: 'You sell on 3+ platforms and need unified visibility without logging into five dashboards every morning.',
        icon: '/icons/shopping-bag.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'D2C Brands Scaling Fast',
        description: 'You\'re growing 30%+ month-over-month and manual inventory tracking is breaking down under volume.',
        icon: '/icons/lightning.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'E-Commerce Aggregators',
        description: 'You manage 10–50 brands across multiple storefronts and need consolidated reporting for investors and operators.',
        icon: '/icons/multivendor.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Marketplace Sellers + Own Store',
        description: 'You run leading online marketplaces for reach plus your own direct-to-consumer storefront for brand control — but reconciling them is a nightmare.',
        icon: '/icons/world.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
];

const TECH_STACK_MARQUEE = [
    { category: 'Frontend', name: 'Next.js', image: '/techstack/Next.js.svg' },
    { category: 'Frontend', name: 'React', image: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
    { category: 'Frontend', name: 'Tailwind CSS', image: '/techstack/Tailwind CSS.svg' },
    { category: 'Backend', name: 'Node.js', image: '/techstack/Node.js.svg' },
    { category: 'Backend', name: 'FastAPI', image: '/techstack/FastAPI.svg' },
    { category: 'Backend', name: 'Python', image: '/techstack/Python.svg' },
    { category: 'Database', name: 'PostgreSQL', image: '/techstack/PostgresSQL.svg' },
    { category: 'Database', name: 'Redis', image: '/techstack/Redis.svg' },
    { category: 'Infrastructure', name: 'AWS', image: '/techstack/AWS.svg' },
    { category: 'AI & ML', name: 'TensorFlow', image: 'https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg' },
    { category: 'Infrastructure', name: 'Docker', image: 'https://cdn.worldvectorlogo.com/logos/docker.svg' },
    { category: 'Infrastructure', name: 'Kubernetes', image: '/techstack/Kubernetes.svg' },
];

/* ──────────────────── COMPONENT ──────────────────── */

const MultivendorDashboardPage = () => {
    const challengeRef = useRef<HTMLDivElement>(null);
    const buildRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const audienceRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Challenge items
            const challengeItems = challengeRef.current?.querySelectorAll('.challenge-item');
            if (challengeItems) {
                gsap.fromTo(challengeItems, { x: -40, opacity: 0 }, {
                    x: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out',
                    scrollTrigger: { trigger: challengeRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Challenge visual
            const challengeVisual = challengeRef.current?.querySelector('.challenge-visual');
            if (challengeVisual) {
                gsap.fromTo(challengeVisual, { scale: 0.9, opacity: 0 }, {
                    scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out',
                    scrollTrigger: { trigger: challengeRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
                });
            }

            // What We Build block
            const buildBlock = buildRef.current?.querySelectorAll('.build-el');
            if (buildBlock) {
                gsap.fromTo(buildBlock, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: buildRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Capability cards
            const capCards = capabilitiesRef.current?.querySelectorAll('.cap-card');
            if (capCards) {
                gsap.fromTo(capCards, { y: 50, opacity: 0, scale: 0.96 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
                    scrollTrigger: { trigger: capabilitiesRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Audience tiles
            const audCards = audienceRef.current?.querySelectorAll('.audience-card');
            if (audCards) {
                gsap.fromTo(audCards, { y: 40, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: audienceRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Tech Stack lists
            const techGroups = techRef.current?.querySelectorAll('.tech-group');
            if (techGroups) {
                gsap.fromTo(techGroups, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: techRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }
        });
        return () => ctx.revert();
    });

    return (
        <div className="relative min-h-screen bg-white text-[#2D6A4F] font-body overflow-x-hidden">
            <SEO
                title="Multivendor E-Commerce Dashboard Development | Frostrek AI"
                description="Consolidate all your storefronts, major online marketplaces, and custom e-commerce sites into a unified AI-powered command center. Real-time sales, automated forecasting, and inventory tracking."
                keywords="multivendor dashboard development, custom ecommerce dashboard builder, storefront integration dashboard, cross platform ecommerce analytics, demand forecasting AI ecommerce, inventory sync multi-storefront, e-commerce data aggregator, custom api connector development, Recharts ecommerce dashboard"
                path="/solutions/multivendor-dashboard"
                schema={[
                    JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Multivendor E-Commerce Dashboard Development",
                        "description": "Frostrek AI builds custom, production-grade multivendor e-commerce dashboards with AI-driven forecasting and real-time inventory synchronization across all your global storefronts, leading marketplaces, and custom e-commerce channels.",
                        "provider": {
                            "@type": "Organization",
                            "name": "Frostrek AI",
                            "url": "https://www.frostrek.ai",
                            "logo": "https://www.frostrek.ai/logonew.png",
                            "address": {
                                "@type": "PostalAddress",
                                "streetAddress": "4th Floor, Unit No. 455, JMD Empire, Sector 62",
                                "addressLocality": "Gurugram",
                                "addressRegion": "Haryana",
                                "postalCode": "122102",
                                "addressCountry": "IN"
                            }
                        },
                        "serviceType": ["E-Commerce Dashboard Development", "API Connector Building", "AI Demand Forecasting", "Multi-Storefront Inventory Sync", "E-Commerce Profit Analysis"],
                        "areaServed": ["IN", "US", "GB", "AE", "SG"],
                        "url": "https://www.frostrek.ai/solutions/multivendor-dashboard"
                    }),
                    JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What platforms can Frostrek integrate into a multivendor dashboard?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "We build custom REST and GraphQL API connectors to integrate all leading direct-to-consumer platforms, global online marketplaces, third-party sales channels, and any custom ERP or proprietary storefront solution."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How does cross-platform inventory sync work?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Your dashboard tracks real-time inventory movements. Whenever an order is placed on one storefront, the system triggers automated sync pipelines to update inventory values across all other active sales channels and marketplaces instantly, preventing overselling."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does the dashboard support AI-driven demand forecasting?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes. We implement machine learning models (using frameworks like TensorFlow and Prophet) trained on your historical sales patterns to predict customer demand spikes 7 to 30 days in advance."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do we own the codebase and deployment infrastructure?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Absolutely. The custom e-commerce dashboard is built tailored to your business, deployed on your secure cloud environment (AWS, Azure, Google Cloud), and 100% owned by your company with no monthly licensing fees."
                                }
                            }
                        ]
                    })
                ]}
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section className="relative pt-28 pb-16 md:pt-48 md:pb-32 overflow-hidden flex flex-col justify-center min-h-[90vh]">
                {/* Ambient blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E8F5EE] rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3 opacity-60" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F0F9FF] rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 opacity-50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FFFBEB]/80 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center">
                    <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
                        {/* Pill tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-bold mb-8 shadow-sm"
                        >
                            <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                            OUR SOLUTIONS
                        </motion.div>

                        {/* Headline */}
                        <div className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-8 tracking-tight max-w-5xl mx-auto leading-tight text-[#2D6A4F]">
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                Multivendor Dashboard
                            </SplitTextReveal>
                            <br />
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false} delay={0.2}>
                                One Command Center for Your Entire E-Commerce Empire
                            </SplitTextReveal>
                        </div>

                        {/* Subtext */}
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-500"
                            type="words" stagger={0.015} once={false} delay={0.5}
                        >
                            Stop juggling multiple platform dashboards. We build unified AI-powered control centers that consolidate revenue, inventory, orders, and market intelligence across every storefront and marketplace you operate in real-time.
                        </SplitTextReveal>

                        {/* Single CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="w-full sm:w-auto"
                        >
                            <Link
                                to="/contact"
                                id="multivendor-hero-cta"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Build Your Dashboard
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* ═══════ SECTION 2 — THE MULTI-CHANNEL CHALLENGE (Split-view) ═══════ */}
            <section ref={challengeRef} className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-b border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            The Multi-Channel Challenge
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            Selling on multiple platforms means managing multiple dashboards — and that's where the chaos begins.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Side: 4 Problem Points */}
                        <div className="space-y-6">
                            {PROBLEM_POINTS.map((pt, idx) => {
                                return (
                                    <div key={idx} className={`challenge-item flex items-center gap-3 md:gap-5 p-4 md:p-6 border rounded-[1.25rem] md:rounded-[1.5rem] shadow-sm hover:shadow-md transition-all duration-300 ${pt.bgColor} ${pt.borderColor}`}>
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 border ${pt.iconBorder} ${pt.iconBg}`}>
                                            <img src={pt.icon} alt={pt.title} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                                        </div>
                                        <div>
                                            <h3 className={`font-serif text-[15px] md:text-lg font-bold mb-1 ${pt.headingColor}`}>{pt.title}</h3>
                                            <p className="text-gray-600 text-[12px] md:text-sm leading-snug md:leading-relaxed">{pt.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Side: Premium E-Commerce Analytics Dashboard Image Mockup */}
                        <div className="challenge-visual flex justify-center items-center relative min-h-[400px]">
                            {/* Ambient background glow */}
                            <div className="absolute w-[350px] h-[350px] bg-[#E8F5EE] rounded-full blur-[80px] opacity-60 -z-10 animate-pulse" />

                            {/* Dashboard Showcase Frame */}
                            <div className="relative w-full max-w-[500px] border border-[#2D6A4F]/10 rounded-[2rem] bg-white/80 backdrop-blur-md p-3 shadow-[0_30px_60px_rgba(45,106,79,0.08)] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                                {/* Browser Chrome header mockup */}
                                <div className="flex items-center gap-2 mb-3 px-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                                    </div>
                                    <div className="flex-1 text-center text-[10px] text-gray-400 font-mono font-medium truncate select-none bg-gray-100/50 py-1 px-3 rounded-md mx-6">
                                        frostrek-omnichannel.internal
                                    </div>
                                </div>
                                <img
                                    src="/ecommerce-dashboard.png"
                                    alt="Frostrek Omnichannel E-commerce Analytics Dashboard"
                                    className="w-full h-auto rounded-[1.2rem] border border-[#2D6A4F]/5 object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 3 — WHAT WE BUILD ═══════ */}
            <section ref={buildRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Column: Descriptive Content */}
                        <div className="lg:col-span-5 space-y-6">
                            <h2 className="build-el font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                                What We Build
                            </h2>
                            <p className="build-el font-sans text-gray-600 text-base md:text-lg">
                                A unified AI command center that connects every storefront you operate — one dashboard, one login, complete visibility.
                            </p>
                            <p className="build-el text-gray-600 text-base md:text-lg">
                                Every order, every SKU, every dollar — consolidated in real-time. Add AI-powered demand forecasting, inventory alerts, profit margin analysis, and market trend intelligence. Built custom for your business, deployed on your infrastructure, owned by you.
                            </p>
                            <div className="build-el pt-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#2D6A4F] text-white rounded-full font-medium text-md transition-all hover:bg-[#1B4332] shadow-md hover:-translate-y-0.5"
                                >
                                    Build Your Dashboard
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Premium Custom visual mockup */}
                        <div className="lg:col-span-7 build-el">
                            <div className="relative rounded-[2rem] border border-[#2D6A4F]/10 bg-slate-950 p-4 md:p-6 shadow-[0_30px_70px_rgba(0,0,0,0.2)] overflow-hidden">
                                {/* Window browser dots */}
                                <div className="flex gap-1.5 mb-4 border-b border-white/5 pb-3">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                    <span className="text-[10px] text-white/30 ml-4 font-mono font-medium">frostrek-commerce-hub.internal</span>
                                </div>

                                {/* Mockup layout */}
                                <div className="space-y-4">
                                    {/* Stats grid */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Consolidated Sales</span>
                                            <div className="text-lg font-bold text-white mt-1">$459,204</div>
                                            <span className="text-[9px] text-emerald-400 font-semibold flex items-center mt-1">▲ +24.8% vs PM</span>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Active Orders</span>
                                            <div className="text-lg font-bold text-white mt-1">12,845</div>
                                            <span className="text-[9px] text-emerald-400 font-semibold flex items-center mt-1">▲ +12.3% vs PM</span>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Consolidated SKUs</span>
                                            <div className="text-lg font-bold text-white mt-1">3,490</div>
                                            <span className="text-[9px] text-white/40 font-semibold mt-1">Across 4 storefronts</span>
                                        </div>
                                    </div>

                                    {/* Simulated sales analytics chart */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-48 flex flex-col justify-between relative">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-white">Storefront Distribution Matrix</span>
                                            <div className="flex gap-2 text-[9px] font-bold text-white/60">
                                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" />D2C Stores</span>
                                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" />Marketplaces</span>
                                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Other Channels</span>
                                            </div>
                                        </div>

                                        {/* CSS based wave charts */}
                                        <div className="flex-1 w-full flex items-end gap-1.5 pt-4">
                                            <div className="bg-sky-400/80 w-full h-[40%] rounded-t-sm" />
                                            <div className="bg-amber-400/80 w-full h-[65%] rounded-t-sm" />
                                            <div className="bg-emerald-400/80 w-full h-[55%] rounded-t-sm" />
                                            <div className="bg-sky-400/80 w-full h-[75%] rounded-t-sm" />
                                            <div className="bg-amber-400/80 w-full h-[90%] rounded-t-sm" />
                                            <div className="bg-emerald-400/80 w-full h-[80%] rounded-t-sm" />
                                            <div className="bg-sky-400/80 w-full h-[95%] rounded-t-sm" />
                                        </div>
                                        <div className="flex justify-between text-[8px] font-mono text-white/30 border-t border-white/5 pt-2">
                                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                        </div>
                                    </div>

                                    {/* Simulated channel performance items */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[11px] bg-white/5 p-2.5 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-2">
                                                <img src="/icons/world.png" alt="Direct Consumer" className="w-3.5 h-3.5 object-contain invert opacity-90" />
                                                <span className="text-white font-bold">Direct Consumer Site</span>
                                            </div>
                                            <span className="text-white/60 font-semibold">$241,890 sales</span>
                                            <span className="text-emerald-400 font-bold">99.8% Sync Integrity</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] bg-white/5 p-2.5 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-2">
                                                <img src="/icons/shopping-bag.png" alt="Marketplace" className="w-3.5 h-3.5 object-contain invert opacity-90" />
                                                <span className="text-white font-bold">Global Marketplace</span>
                                            </div>
                                            <span className="text-white/60 font-semibold">$184,310 sales</span>
                                            <span className="text-emerald-400 font-bold">99.9% Sync Integrity</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4 — KEY CAPABILITIES ═══════ */}
            <section ref={capabilitiesRef} className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-b border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Key Capabilities
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            Everything you need to run a multi-channel e-commerce business from one screen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {CAPABILITIES.map((cap) => {
                            return (
                                <SpotlightCard
                                    key={cap.title}
                                    className={`cap-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${cap.bgColor} ${cap.border} ${cap.hoverShadow} hover:-translate-y-1`}
                                    spotlightColor={cap.spotlight}
                                >
                                    <div className="relative z-10 flex gap-3 md:gap-5 items-start">
                                        <div className={`w-9 h-9 md:w-14 md:h-14 rounded-lg md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${cap.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                            <img src={cap.icon} alt={cap.title} className="w-4 h-4 md:w-6 md:h-6 object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`font-serif text-[14px] md:text-lg font-bold mb-1 md:mb-2 ${cap.headingColor}`}>{cap.title}</h3>
                                            <p className="text-gray-600 text-[11px] md:text-sm leading-snug md:leading-relaxed">{cap.description}</p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — WHO IT'S FOR ═══════ */}
            <section ref={audienceRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Who It's For
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            Built for e-commerce operators who've outgrown platform-native dashboards.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {AUDIENCE_CARDS.map((aud) => {
                            return (
                                <SpotlightCard
                                    key={aud.title}
                                    className={`audience-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${aud.bgColor} ${aud.border} ${aud.hoverShadow} hover:-translate-y-1`}
                                    spotlightColor={aud.spotlight}
                                >
                                    <div className="relative z-10">
                                        <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border flex items-center justify-center mb-2 md:mb-5 bg-white/40 ${aud.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                            <img src={aud.icon} alt={aud.title} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" />
                                        </div>
                                        <h3 className={`font-serif text-[13px] md:text-lg font-bold mb-1 md:mb-2 ${aud.headingColor}`}>{aud.title}</h3>
                                        <p className="text-gray-600 text-[10px] md:text-xs leading-snug md:leading-relaxed">{aud.description}</p>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — TECH STACK ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-b border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Tech Stack & Integrations
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            Enterprise-grade tools for reliable, real-time e-commerce data and seamless sync.
                        </p>
                    </div>
                </div>

                {/* Marquee reel */}
                <div ref={techRef} className="relative w-full overflow-hidden py-8 group">
                    {/* Left / right fade masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#Fcfcfc] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#Fcfcfc] to-transparent z-10 pointer-events-none" />

                    <div className="flex animate-[marquee_40s_linear_infinite] w-max group-hover:[animation-play-state:paused]">
                        {[...TECH_STACK_MARQUEE, ...TECH_STACK_MARQUEE].map((tech, i) => (
                            <div key={i} className="flex flex-col items-center justify-center w-24 md:w-48 gap-3 md:gap-6 mx-3 md:mx-8">
                                <div className="h-10 md:h-16 w-full flex items-center justify-center px-2 md:px-4">
                                    <img
                                        src={tech.image}
                                        alt={tech.name}
                                        className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-sm hover:scale-105"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-[#2D6A4F]/60 mb-1">{tech.category}</span>
                                    <span className="text-[10px] md:text-xs font-semibold text-gray-700">{tech.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 7 — CLOSING CTA ═══════ */}
            <section ref={ctaRef} className="py-16 lg:py-24 relative overflow-hidden bg-white font-sans">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-badge-bg/80 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#E8F5EE]/60 rounded-full blur-[100px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                                Ready to Consolidate Your
                            </h2>
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                                E-Commerce Operations?
                            </h2>
                        </div>
                        <p className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Let's talk about building your unified multivendor dashboard.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                id="multivendor-cta-start-project"
                                className="cta-btn group relative flex items-center gap-3 px-10 py-5 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 overflow-hidden"
                            >
                                Build Your Dashboard
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MultivendorDashboardPage;
