import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import FlipText from '../components/ui/FlipText';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── DATA ──────────────────── */

const PROBLEMS = [
    {
        title: 'No Global Path',
        description: 'India has thousands of premium Ayurvedic and wellness brands with no reliable path to global markets.',
        icon: '/icons/world.png',
        bgColor: 'bg-[#FFF7ED]',
        hoverBg: 'hover:bg-[#FFEDD5]',
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#F97316]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        accentBarColor: 'bg-[#C2410C]/25',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'Platform Gaps',
        description: "Existing generic platforms don't support the nuances of Indian product categories, compliance, or cross-border logistics.",
        icon: '/icons/gaps.png',
        bgColor: 'bg-[#F0F9FF]',
        hoverBg: 'hover:bg-[#E0F2FE]',
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        accentBarColor: 'bg-[#0284C7]/25',
        spotlight: 'rgba(14, 165, 233, 0.02)',
    },
    {
        title: 'No Infrastructure',
        description: 'Small vendors lacked the infrastructure to set up, list, and manage products at scale.',
        icon: '/icons/multivendor.png',
        bgColor: 'bg-[#FFF1F2]',
        hoverBg: 'hover:bg-[#FFE4E6]',
        border: 'border-[#FFE4E6]',
        hoverBorder: 'hover:border-[#E11D48]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        headingColor: 'text-[#9F1239]',
        iconBorder: 'border-[#FFE4E6]/60',
        accentBarColor: 'bg-[#9F1239]/25',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
];


const FEATURES = [
    { title: 'Consumer Storefront', description: 'Fully optimised shopping experience with search, filters, and categories.', icon: '/icons/shopping-bag.png', bgColor: 'bg-[#FFF7ED]', border: 'border-[#FFEDD5]', hoverBorder: 'hover:border-[#F97316]/30', hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]', headingColor: 'text-[#C2410C]', iconBorder: 'border-[#FFEDD5]/60', spotlight: 'rgba(249, 115, 22, 0.02)' },
    { title: 'Admin Dashboard', description: 'Full control over products, vendors, orders, banners, and analytics.', icon: '/icons/dashboard.png', bgColor: 'bg-[#F0F9FF]', border: 'border-[#BAE6FD]', hoverBorder: 'hover:border-[#0EA5E9]/30', hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.05)]', headingColor: 'text-[#0284C7]', iconBorder: 'border-[#BAE6FD]/60', spotlight: 'rgba(14, 165, 233, 0.02)' },
    { title: 'Global-Ready Architecture', description: 'Multi-currency support, international shipping logic, and geo-based routing.', icon: '/icons/world.png', bgColor: 'bg-[#FFFBEB]', border: 'border-[#FEF3C7]', hoverBorder: 'hover:border-[#F59E0B]/30', hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.05)]', headingColor: 'text-[#B45309]', iconBorder: 'border-[#FEF3C7]/60', spotlight: 'rgba(245, 158, 11, 0.02)' },
    { title: 'CDN-Backed Media', description: 'Fast product image delivery via CloudFront for a smooth user experience.', icon: '/icons/image-gallery.png', bgColor: 'bg-[#FFF1F2]', border: 'border-[#FECDD3]', hoverBorder: 'hover:border-[#E11D48]/30', hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]', headingColor: 'text-[#E11D48]', iconBorder: 'border-[#FECDD3]/60', spotlight: 'rgba(225, 29, 72, 0.02)' },
];

const TECH_STACK_MARQUEE = [
    { category: 'Frontend', name: 'Next.js', image: '/techstack/Next.js.svg' },
    { category: 'Frontend', name: 'Tailwind CSS', image: '/techstack/Tailwind CSS.svg' },
    { category: 'Backend', name: 'Node.js', image: '/techstack/Node.js.svg' },
    { category: 'Backend', name: 'Express', image: '/techstack/Express.svg' },
    { category: 'Cloud & Storage', name: 'AWS S3', image: '/techstack/AWS.svg' },
    { category: 'Auth', name: 'JWT', image: 'https://cdn.worldvectorlogo.com/logos/jwt-3.svg' },
    { category: 'Deployment', name: 'AWS', image: '/techstack/AWS.svg' },
];

/* ──────────────────── COMPONENT ──────────────────── */

const VedashiPage = () => {
    const problemsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const ctaButtonsRef = useRef<HTMLDivElement>(null);


    useEffect(() => { window.scrollTo(0, 0); }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Problem cards stagger
            const problemCards = problemsRef.current?.querySelectorAll('.problem-card');
            if (problemCards) {
                gsap.fromTo(problemCards, { y: 60, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: problemsRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }


            // Feature cards stagger
            const featureCards = featuresRef.current?.querySelectorAll('.feature-card');
            if (featureCards) {
                gsap.fromTo(featureCards, { y: 60, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: featuresRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' }
                });
            }
            // Tech badges stagger
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
                title="Vedashi | India's Premium Wellness E-Commerce Platform | Frostrek AI"
                description="Vedashi is a production-grade multi-vendor e-commerce platform purpose-built for India's wellness, herbal, and natural goods market. Engineered by Frostrek."
                path="/products/vedashi-ecommerce"
                keywords="vedashi ecommerce, indian wellness marketplace, ayurvedic ecommerce platform, multi-vendor wellness store, frostrek products"
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
                        <SplitTextReveal as="span" type="chars" stagger={0.02} once={false}>
                            Vedashi - India's Premium
                        </SplitTextReveal>
                        <br />
                        <SplitTextReveal as="span" type="chars" stagger={0.02} once={false} delay={0.3}>
                            Wellness E-Commerce Platform
                        </SplitTextReveal>
                    </div>

                    {/* Subtext */}
                    <SplitTextReveal
                        as="p"
                        className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-500 font-medium"
                        type="words" stagger={0.015} once={false} delay={0.6}
                    >
                        A full-stack, multi-vendor wellness marketplace built from the ground up - connecting authentic Indian brands to customers worldwide.
                    </SplitTextReveal>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4"
                    >
                        <a
                            href="https://vedashi.com/in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group font-extrabold rounded-2xl px-8 h-14 text-base shadow-lg transition-all duration-300 flex items-center gap-2 bg-[#2D6A4F] text-white hover:bg-[#1B4332] hover:shadow-xl hover:shadow-[#2D6A4F]/25 cursor-pointer border-none"
                        >
                            <FlipText hoverColor="text-white">
                                Visit Vedashi <ExternalLink className="w-4 h-4" />
                            </FlipText>
                        </a>

                    </motion.div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* ═══════ SECTION 2 — PRODUCT OVERVIEW ═══════ */}
            <section id="overview" className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Side: Text Content */}
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
                            <div className="w-full mb-6">
                                <SplitTextReveal
                                    as="h2"
                                    className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                    type="chars" stagger={0.02} once={false}
                                >
                                    What is Vedashi?
                                </SplitTextReveal>
                            </div>
                            <div className="w-full">
                                <SplitTextReveal
                                    as="p"
                                    className="text-lg text-gray-500 font-medium leading-relaxed"
                                    type="words" stagger={0.02} once={false} delay={0.3}
                                >
                                    Vedashi is a production-grade e-commerce platform purpose-built for India's wellness, herbal, and natural goods market. It supports multi-vendor seller onboarding, curated brand storefronts, international shipping, multi-currency payments, and a fully optimised consumer storefront - all engineered and maintained by Frostrek.
                                </SplitTextReveal>
                            </div>
                        </div>

                        {/* Right Side: Image Showcase */}
                        <div className="lg:col-span-7 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img
                                    src="/products/vedashi-home.png"
                                    alt="Vedashi E-Commerce Platform"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
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
                                className="max-w-2xl mx-auto text-lg text-gray-500 font-medium"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Three critical gaps that held back India's wellness industry from reaching global customers.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Side: Problem Cards */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            <div ref={problemsRef} className="flex flex-col gap-3 md:gap-6">
                                {PROBLEMS.map((problem) => (
                                    <SpotlightCard
                                        key={problem.title}
                                        className={`problem-card group relative overflow-hidden rounded-xl border p-4 md:p-6 transition-all duration-300 ${problem.bgColor} ${problem.border} ${problem.hoverShadow} hover:-translate-y-1`}
                                        spotlightColor={problem.spotlight}
                                    >
                                        <div className="relative z-10 flex gap-3 md:gap-5 items-center justify-between">
                                            <div className="flex gap-3 md:gap-5 items-center flex-1">
                                                <div className={`w-11 h-11 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${problem.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                                    {typeof problem.icon === 'string' ? (
                                                        <img src={problem.icon} alt={problem.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" />
                                                    ) : (
                                                        (() => {
                                                            const IconComponent = problem.icon as React.ComponentType<any>;
                                                            return <IconComponent className={`${problem.headingColor}`} size={28} strokeWidth={1.5} />;
                                                        })()
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className={`font-serif text-[15px] md:text-xl font-bold mb-0.5 md:mb-1.5 text-black leading-tight`}>{problem.title}</h3>
                                                    <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600 font-medium">{problem.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Image Showcase */}
                        <div className="lg:col-span-7 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img
                                    src="/products/ProblemSolved.png"
                                    alt="Problems Solved by Vedashi"
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
                                className="max-w-2xl mx-auto text-lg text-gray-500 font-medium"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                A complete, production-ready e-commerce ecosystem engineered from scratch.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Side: Image Showcase */}
                        <div className="lg:col-span-7 order-2 lg:order-1 relative w-full mt-8 lg:mt-0">
                            <div className="relative overflow-hidden group rounded-3xl lg:rounded-[2.2rem]">
                                <img
                                    src="/products/WhatWeBuilt.png"
                                    alt="E-commerce Solutions Built by Frostrek"
                                    className="w-full h-auto rounded-3xl lg:rounded-[2.2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
                                />
                            </div>
                        </div>

                        {/* Right Side: Feature Cards */}
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
                                                {typeof feature.icon === 'string' ? (
                                                    <img src={feature.icon} alt={feature.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" />
                                                ) : (
                                                    (() => {
                                                        const IconComponent = feature.icon as React.ComponentType<any>;
                                                        return <IconComponent className={`${feature.headingColor}`} size={28} strokeWidth={1.5} />;
                                                    })()
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-serif text-[15px] md:text-xl font-bold mb-0.5 md:mb-1.5 text-black leading-tight">{feature.title}</h3>
                                                <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600 font-medium">{feature.description}</p>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — TECH STACK ═══════ */}
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
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500 font-medium"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Modern, battle-tested technologies powering Vedashi at scale.
                            </SplitTextReveal>
                        </div>
                    </div>
                </div>

                <div ref={techRef} className="relative w-full overflow-hidden py-8 group">
                    <div className="flex animate-[marquee_40s_linear_infinite] w-max group-hover:[animation-play-state:paused]">
                        {[...TECH_STACK_MARQUEE, ...TECH_STACK_MARQUEE].map((tech, i) => (
                            <div key={i} className="flex flex-col items-center justify-center w-24 md:w-48 gap-3 md:gap-6 mx-3 md:mx-8">
                                <div className="h-10 md:h-16 w-full flex items-center justify-center px-2 md:px-4">
                                    <img src={tech.image} alt={tech.name} className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-sm hover:scale-105" />
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-black">{tech.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — CTA BANNER ═══════ */}
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
                                Want us to build
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false} delay={0.2}
                            >
                                something like this?
                            </SplitTextReveal>
                        </div>
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
                            type="words" stagger={0.02} once={false} delay={0.3}
                        >
                            Let's talk about your next product.
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
                            <Link
                                to="/schedule-demo"
                                className="group cta-btn w-full sm:w-auto px-10 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-medium text-[15px] transition-all duration-300 hover:border-[#2D6A4F] hover:bg-gray-50 flex items-center justify-center"
                            >
                                <FlipText>Schedule a Demo</FlipText>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VedashiPage;
