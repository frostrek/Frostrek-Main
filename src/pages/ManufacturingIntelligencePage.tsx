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
        title: 'Fragmented Systems',
        description: 'Your ERP, warehouse system, extruder, and plant controls all generate data — but none of it talks to each other. You\'re flying blind.',
        icon: '/icons/gaps.png',
        bgColor: 'bg-[#F0F9FF]',
        borderColor: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
        iconBg: 'bg-white/60',
        iconBorder: 'border-[#BAE6FD]/60',
        iconColor: 'text-[#0284C7]',
    },
    {
        title: 'WhatsApp as Operations Infrastructure',
        description: 'Shift handovers, quality readings, machine alerts — all buried in chat threads. Unstructured, unsearchable, unaccountable.',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#FFF7ED]',
        borderColor: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
        iconBg: 'bg-white/60',
        iconBorder: 'border-[#FFEDD5]/60',
        iconColor: 'text-[#C2410C]',
    },
    {
        title: 'Zero Real-Time Visibility',
        description: 'You find out about production problems from shift leaders after the shift ends. By then, the loss has already happened.',
        icon: '/icons/shield.png',
        bgColor: 'bg-[#F0FDF4]',
        borderColor: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
        iconBg: 'bg-white/60',
        iconBorder: 'border-[#BBF7D0]/60',
        iconColor: 'text-[#166534]',
    },
    {
        title: 'Gut-Feel Scheduling',
        description: 'Production sequences decided on Excel sheets and experience. The cost of inefficient sequencing is invisible — until you calculate it.',
        icon: '/optimized/custom-dev.webp',
        bgColor: 'bg-[#FFF1F2]',
        borderColor: 'border-[#FECDD3]',
        headingColor: 'text-[#E11D48]',
        iconBg: 'bg-white/60',
        iconBorder: 'border-[#FECDD3]/60',
        iconColor: 'text-[#E11D48]',
    },
];

const THREE_PHASES = [
    {
        step: '1',
        title: 'Real-Time Visibility',
        description: 'Connect all factory systems and deploy a live dashboard. We digitalise shift handovers and quality capture, replacing WhatsApp with structured, real-time data.',
        timeline: 'Timeline: 8 weeks',
        icon: '/icons/dashboard.png',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
    },
    {
        step: '2',
        title: 'Cost & Alerting Intelligence',
        description: 'Activate a live cost-per-kg engine using ERP and machine data. Set configurable alert thresholds for immediate push notifications on parameter drifts.',
        timeline: 'Timeline: 4–6 weeks',
        icon: '/optimized/data-analytics.webp',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
    },
    {
        step: '3',
        title: 'AI Production Optimisation',
        description: 'Our AI constraint engine builds a true changeover matrix, generating weekly production sequences that minimise changeovers without missing delivery deadlines.',
        timeline: 'Timeline: 4–6 weeks',
        icon: '/icons/ai.png',
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
    },
];

const SYSTEMS_WE_CONNECT = [
    {
        title: 'ERP Systems',
        description: 'Direct read-only SQL connection to on-premise ERP databases. Pulls orders, job cards, inventory, raw material costs, and finished goods records. Pull frequency: every 10 minutes.',
        icon: '/optimized/architecture.webp',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Warehouse Management Systems',
        description: 'REST API integration with cloud-hosted WMS platforms. Job card status, stock movements, warehouse data. Pull frequency: every 5 minutes. Manual fallback form if API unavailable.',
        icon: '/icons/manufacturing.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'PLC-Controlled Production Machines',
        description: 'EtherNet/IP protocol connection to Allen Bradley and compatible PLCs over factory LAN. Reads machine parameters — screw speed, temperatures, watt readings, throughput, downtime events. Pull frequency: every 30 seconds. Read-only.',
        icon: '/icons/ai agents.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Plant SCADA & Equipment Systems',
        description: 'MQTT subscription to plant-wide equipment data. OPC-UA fallback where MQTT is unavailable. Real-time event-based data from broader plant systems — equipment status, alarm states.',
        icon: '/icons/controller.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
];

const KEY_CAPABILITIES = [
    {
        title: 'Live Factory Dashboard',
        description: 'Real-time machine parameters, plant equipment status, and order progress — all in one screen. WebSocket-powered. Updates every 30 seconds without a page refresh.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Digital Shift Handover',
        description: 'Replaces WhatsApp shift reporting with a structured digital form. Products run, output in kg, changeovers completed, machine issues, quality observations — all captured, stored, and searchable.',
        icon: '/icons/collaboration.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Quality Data Capture',
        description: 'Quality controllers enter NIR readings, moisture, bulk density, and protein percentages directly into the platform. Results linked to job cards and products. Replaces photo-in-WhatsApp reporting.',
        icon: '/icons/health-care.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Live Cost Per Kg Engine',
        description: 'Real-time cost calculation per product line, per shift, per team. Combines raw material cost from ERP, energy cost from machine watt readings, and labour cost from shift records.',
        icon: '/icons/valuation.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Sensor Alert System',
        description: 'Configurable thresholds per product per parameter. When any reading drifts out of range — push notification, email, and WhatsApp alert fired instantly to shift supervisor and management.',
        icon: '/optimized/lightning.webp',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        title: 'AI Production Scheduler',
        description: 'Constraint optimisation engine analyses historical changeover data and generates the weekly production sequence that minimises total changeover time while meeting all delivery deadlines. Human approval always required.',
        icon: '/icons/ai agents.png',
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
        title: 'Mid-Size Manufacturers',
        description: 'You run a real factory with real output targets — but your operations still run on spreadsheets, WhatsApp, and tribal knowledge. You need visibility without a six-figure ERP upgrade.',
        icon: '/icons/manufacturing.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Food & Feed Processors',
        description: 'High product variety, frequent changeovers, tight quality tolerances, and compliance requirements. You lose capacity every week to unoptimised sequencing and manual quality tracking.',
        icon: '/icons/health-care.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Multi-Shift Operations',
        description: 'Three shifts, three teams, no structured handover. Information falls through the gaps between shifts. You find out about yesterday\'s problems today.',
        icon: '/icons/world.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Factories Running on Excel & WhatsApp',
        description: 'Your systems exist — ERP, WMS, machine controllers — but nothing is connected. You\'re making decisions on data that\'s hours or days old. You need a live picture of your own factory.',
        icon: '/optimized/custom-dev.webp',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
];



const TECH_STACK_MARQUEE = [
    { category: 'Integration', name: 'pyodbc (SQL)', image: '/techstack/Python.svg' },
    { category: 'Integration', name: 'EtherNet/IP', image: '/icons/controller.png' },
    { category: 'Integration', name: 'MQTT', image: '/icons/controller.png' },
    { category: 'Integration', name: 'OPC-UA', image: '/icons/manufacturing.png' },
    { category: 'Backend', name: 'Python', image: '/techstack/Python.svg' },
    { category: 'Backend', name: 'FastAPI', image: '/techstack/FastAPI.svg' },
    { category: 'Backend', name: 'Node.js', image: '/techstack/Node.js.svg' },
    { category: 'Backend', name: 'PostgreSQL', image: '/techstack/PostgresSQL.svg' },
    { category: 'Backend', name: 'Redis', image: '/techstack/Redis.svg' },
    { category: 'AI & ML', name: 'Google OR-Tools', image: '/techstack/OR-tools.png' },
    { category: 'AI & ML', name: 'TensorFlow', image: 'https://cdn.worldvectorlogo.com/logos/tensorflow-2.svg' },
    { category: 'Frontend', name: 'Next.js', image: '/techstack/Next.js.svg' },
    { category: 'Frontend', name: 'React', image: 'https://cdn.worldvectorlogo.com/logos/react-2.svg' },
    { category: 'Frontend', name: 'Tailwind CSS', image: '/techstack/Tailwind CSS.svg' },
    { category: 'Alerting', name: 'Twilio', image: '/techstack/Twilio.png' },
    { category: 'Infrastructure', name: 'AWS', image: '/techstack/AWS.svg' },
    { category: 'Infrastructure', name: 'Docker', image: 'https://cdn.worldvectorlogo.com/logos/docker.svg' },
    { category: 'Infrastructure', name: 'Kubernetes', image: '/techstack/Kubernetes.svg' },
];

/* ──────────────────── COMPONENT ──────────────────── */

const ManufacturingIntelligencePage = () => {
    const challengeRef = useRef<HTMLDivElement>(null);
    const buildRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const systemsRef = useRef<HTMLDivElement>(null);
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

            // Process steps
            const processSteps = processRef.current?.querySelectorAll('.process-step');
            if (processSteps) {
                gsap.fromTo(processSteps, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out',
                    scrollTrigger: { trigger: processRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Systems we connect
            const systemCards = systemsRef.current?.querySelectorAll('.system-card');
            if (systemCards) {
                gsap.fromTo(systemCards, { y: 50, opacity: 0, scale: 0.96 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out',
                    scrollTrigger: { trigger: systemsRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
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
                title="Manufacturing Intelligence & AI Production Scheduling | Frostrek AI"
                description="Connect your factory systems into a single real-time intelligence platform. We deliver live visibility, cost engines, sensor alerts, and AI-driven production optimization without hardware disruption."
                keywords="manufacturing intelligence platform, factory floor visibility, ERP WMS integration factory, PLC SCADA connection platform, AI production scheduling, google OR-tools manufacturing, live cost per kg engine, digital shift handover, real-time machine parameters, plant equipment status"
                path="/solutions/manufacturing-intelligence"
                schema={[
                    JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Manufacturing Intelligence Platform",
                        "description": "Frostrek AI builds custom manufacturing intelligence platforms that connect existing ERP, WMS, PLC, and SCADA systems without new hardware to deliver real-time operational visibility and AI-driven production scheduling.",
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
                        "serviceType": ["Manufacturing Intelligence", "AI Production Scheduling", "ERP/WMS Integration", "SCADA Integration", "Live Factory Dashboard", "Real-Time Visibility"],
                        "areaServed": ["IN", "US", "GB", "AE", "SG"],
                        "url": "https://www.frostrek.ai/solutions/manufacturing-intelligence"
                    }),
                    JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Do we need to install new sensors or hardware?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "No. We connect directly to your existing ERP, WMS, PLC, and SCADA systems using protocols like REST API, EtherNet/IP, and MQTT. No new hardware, no disruption to production."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How long does it take to implement?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "We build in three phases: Phase 1 (Real-Time Visibility) takes 8 weeks. Phase 2 (Cost & Alerting) takes 4-6 weeks. Phase 3 (AI Optimisation) takes 4-6 weeks after accumulating historical data."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How does the AI Production Scheduler work?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "It analyzes your real changeover data to build a duration matrix between product pairs, then uses Google OR-Tools constraint optimization to recommend a weekly schedule that minimizes changeover time while respecting delivery deadlines."
                                }
                            }
                        ]
                    })
                ]}
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden flex flex-col justify-center min-h-[90vh]">
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
                        <div className="text-[32px] leading-[1.2] sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 md:mb-8 tracking-tight max-w-5xl mx-auto text-[#2D6A4F]">
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="words" stagger={0.02} once={false}>
                                Manufacturing Intelligence
                            </SplitTextReveal>
                            <br className="hidden md:block" />
                            <span className="md:hidden"> </span>
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="words" stagger={0.02} once={false} delay={0.2}>
                                From Factory Floor to Full Visibility
                            </SplitTextReveal>
                        </div>

                        {/* Subtext */}
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-500"
                            type="words" stagger={0.015} once={false} delay={0.5}
                        >
                            Most factories aren't limited by their machines — they're limited by what they can't see. We connect your existing ERP, WMS, PLC, and SCADA systems into a single real-time intelligence platform that eliminates guesswork, replaces WhatsApp operations, and unlocks capacity you already own.
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
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Build Your Platform
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* ═══════ SECTION 2 — THE PROBLEM WE SOLVE (Split-view) ═══════ */}
            <section ref={challengeRef} className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-b border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            The Problem We Solve
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            Running a modern factory on disconnected systems and WhatsApp is not a strategy — it's a liability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Left Side: 4 Problem Points */}
                        <div className="space-y-4 md:space-y-6">
                            {PROBLEM_POINTS.map((pt, idx) => {
                                return (
                                    <div key={idx} className={`challenge-item flex items-center gap-3 md:gap-5 p-4 md:p-6 border rounded-[1.25rem] md:rounded-[1.5rem] shadow-sm hover:shadow-md transition-all duration-300 ${pt.bgColor} ${pt.borderColor}`}>
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center flex-shrink-0 border ${pt.iconBorder} ${pt.iconBg}`}>
                                            <img src={pt.icon} alt={pt.title} className="w-5 h-5 md:w-6 md:h-6 object-contain" loading="lazy" width={512} height={512} />
                                        </div>
                                        <div>
                                            <h3 className={`font-serif text-[15px] md:text-lg font-bold mb-1 ${pt.headingColor}`}>{pt.title}</h3>
                                            <p className="text-gray-600 text-[12px] md:text-sm leading-snug md:leading-relaxed">{pt.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Right Side: Abstract Visual */}
                        <div className="challenge-visual flex justify-center items-center relative min-h-[400px]">
                            {/* Ambient background glow */}
                            <div className="absolute w-[350px] h-[350px] bg-[#E8F5EE] rounded-full blur-[80px] opacity-60 -z-10 animate-pulse" />

                            <div className="relative w-full max-w-[500px] border border-[#2D6A4F]/10 rounded-[2rem] bg-white/80 backdrop-blur-md p-6 shadow-[0_30px_60px_rgba(45,106,79,0.08)] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2D6A4F_1px,transparent_1px)] [background-size:16px_16px] opacity-5"></div>
                                <div className="relative z-10 flex flex-col gap-4">
                                    <div className="w-full h-16 rounded-xl border border-dashed border-sky-300 bg-sky-50 flex items-center justify-center text-sky-700 font-bold opacity-70">ERP: Database</div>
                                    <div className="w-full flex justify-between gap-4">
                                        <div className="w-1/2 h-20 rounded-xl border border-dashed border-rose-300 bg-rose-50 flex flex-col items-center justify-center text-rose-700 font-bold opacity-70"><span>WMS</span><span className="text-xs font-normal">No API Link</span></div>
                                        <div className="w-1/2 h-20 rounded-xl border border-dashed border-amber-300 bg-amber-50 flex flex-col items-center justify-center text-amber-700 font-bold opacity-70"><span>PLC</span><span className="text-xs font-normal">Offline</span></div>
                                    </div>
                                    <div className="w-full h-32 rounded-xl border border-[#2D6A4F]/20 bg-[#2D6A4F]/5 flex items-center justify-center flex-col gap-2 relative overflow-hidden">
                                        <div className="w-full px-4 flex justify-between items-center opacity-40">
                                            <div className="w-2/3 h-4 rounded bg-gray-300"></div>
                                            <div className="w-6 h-6 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="w-full px-4 flex justify-between items-center opacity-40">
                                            <div className="w-1/2 h-4 rounded bg-gray-300"></div>
                                            <div className="w-6 h-6 rounded-full bg-red-500"></div>
                                        </div>
                                        <span className="absolute font-bold text-gray-500 font-serif">Disconnected Floor</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 3 — WHAT WE BUILD ═══════ */}
            <section ref={buildRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Left Column: Descriptive Content */}
                        <div className="lg:col-span-5 space-y-6">
                            <h2 className="build-el font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                                What We Build
                            </h2>
                            <h3 className="build-el font-sans text-base md:text-lg text-gray-600">
                                A unified manufacturing intelligence platform — built on your existing systems, with zero hardware installation.
                            </h3>
                            <p className="build-el text-gray-600 text-base md:text-lg">
                                We build the connection layer your factory is missing. We integrate directly with your ERP (read-only SQL), your warehouse management system (REST API), your PLC-controlled production machines (EtherNet/IP or OPC-UA), and your plant SCADA systems (MQTT).
                            </p>
                            <div className="build-el pt-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#2D6A4F] text-white rounded-full font-medium text-md transition-all hover:bg-[#1B4332] shadow-md hover:-translate-y-0.5"
                                >
                                    Build Your Platform
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
                                    <span className="text-[10px] text-white/30 ml-4 font-mono font-medium">factory-hub.internal</span>
                                </div>

                                {/* Mockup layout */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Active Job</span>
                                            <div className="text-lg font-bold text-white mt-1">JC-8824A</div>
                                            <span className="text-[9px] text-emerald-400 font-semibold flex items-center mt-1">Status: Running</span>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Extruder Temp</span>
                                            <div className="text-lg font-bold text-white mt-1">195°C</div>
                                            <span className="text-[9px] text-emerald-400 font-semibold flex items-center mt-1">Target: 200°C</span>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Line Speed</span>
                                            <div className="text-lg font-bold text-white mt-1">45 m/min</div>
                                            <span className="text-[9px] text-white/40 font-semibold mt-1">Optimal</span>
                                        </div>
                                    </div>

                                    {/* Simulated wave charts */}
                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 h-48 flex flex-col justify-between relative">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-bold text-white">Live Production Throughput</span>
                                            <div className="flex gap-2 text-[9px] font-bold text-white/60">
                                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />Target</span>
                                                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" />Actual</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 w-full flex items-end gap-1.5 pt-4">
                                            <div className="bg-sky-400/80 w-full h-[60%] rounded-t-sm" />
                                            <div className="bg-sky-400/80 w-full h-[65%] rounded-t-sm" />
                                            <div className="bg-sky-400/80 w-full h-[55%] rounded-t-sm" />
                                            <div className="bg-sky-400/80 w-full h-[75%] rounded-t-sm" />
                                            <div className="bg-sky-400/80 w-full h-[90%] rounded-t-sm" />
                                            <div className="bg-sky-400/80 w-full h-[80%] rounded-t-sm" />
                                            <div className="bg-sky-400/80 w-full h-[95%] rounded-t-sm" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-[11px] bg-white/5 p-2.5 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                                <span className="text-white font-bold">Line 1 - Extruder</span>
                                            </div>
                                            <span className="text-white/60 font-semibold">Running</span>
                                            <span className="text-emerald-400 font-bold">OEE 85%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4 — THREE PHASE DELIVERY ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-20">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Three Phase Delivery
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                We don't drop a system and disappear. We build in phases — each one delivering value before the next begins.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={processRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 relative">
                        {/* Connecting dashed line (desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16.5%] right-[16.5%] h-[1px] -z-10 border-t border-dashed border-[#2D6A4F]/30" />

                        {THREE_PHASES.map((step) => (
                            <div key={step.step} className="process-step flex flex-col items-center text-center relative group">
                                {/* Icon circle */}
                                <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${step.iconBg} border ${step.iconBorder} flex items-center justify-center mb-4 md:mb-6 shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md relative z-10`}>
                                    <img src={step.icon} alt={step.title} className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-80" loading="lazy" width={512} height={512} />
                                </div>
                                <h3 className={`font-serif text-[15px] sm:text-lg md:text-xl font-bold mb-2 md:mb-3 ${step.headingColor}`}>{step.title}</h3>
                                <p className="text-[13px] sm:text-sm leading-relaxed text-gray-500 px-1 sm:px-2 mb-4 md:mb-6 min-h-[5rem] md:min-h-[80px]">{step.description}</p>

                                {/* Timeline & Step number */}
                                <div className="mt-auto flex flex-col items-center gap-3 w-full">
                                    <span className="text-[10px] md:text-xs font-bold text-[#2D6A4F] bg-[#2D6A4F]/5 px-2 md:px-3 py-1 rounded-md">{step.timeline}</span>
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#2D6A4F]/30 flex items-center justify-center text-[#2D6A4F] text-xs md:text-sm font-bold bg-[#2D6A4F]/5 shadow-sm">
                                        {step.step}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — SYSTEMS WE CONNECT ═══════ */}
            <section ref={systemsRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Systems We Connect
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            We integrate with the systems your factory already runs — read-only, non-disruptive, and secure.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                        {SYSTEMS_WE_CONNECT.map((sys) => (
                            <SpotlightCard
                                key={sys.title}
                                className={`system-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${sys.bgColor} ${sys.border} ${sys.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={sys.spotlight}
                            >
                                <div className="relative z-10 flex gap-3 md:gap-5 items-start">
                                    <div className={`w-9 h-9 md:w-14 md:h-14 rounded-lg md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${sys.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={sys.icon} alt={sys.title} className="w-4 h-4 md:w-6 md:h-6 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-serif text-[14px] md:text-xl font-bold mb-1 md:mb-3 ${sys.headingColor}`}>{sys.title}</h3>
                                        <p className="text-gray-600 text-[11px] md:text-sm leading-snug md:leading-relaxed">{sys.description}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — KEY CAPABILITIES ═══════ */}
            <section ref={capabilitiesRef} className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-b border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Key Capabilities
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            Six core capabilities delivered across three phases — each solving a specific operational problem.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {KEY_CAPABILITIES.map((cap) => (
                            <SpotlightCard
                                key={cap.title}
                                className={`cap-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${cap.bgColor} ${cap.border} ${cap.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={cap.spotlight}
                            >
                                <div className="relative z-10 flex gap-3 md:gap-5 items-start">
                                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${cap.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={cap.icon} alt={cap.title} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-serif text-[13px] md:text-lg font-bold mb-1 md:mb-2 ${cap.headingColor}`}>{cap.title}</h3>
                                        <p className="text-gray-600 text-[10px] md:text-xs leading-snug md:leading-relaxed">{cap.description}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 7 — WHO IT'S FOR ═══════ */}
            <section ref={audienceRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Who It's For
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            Built for manufacturers who know their machines are capable — but can't see what's holding them back.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {AUDIENCE_CARDS.map((aud) => (
                            <SpotlightCard
                                key={aud.title}
                                className={`audience-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${aud.bgColor} ${aud.border} ${aud.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={aud.spotlight}
                            >
                                <div className="relative z-10">
                                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border flex items-center justify-center mb-2 md:mb-5 bg-white/40 ${aud.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={aud.icon} alt={aud.title} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <h3 className={`font-serif text-[13px] md:text-lg font-bold mb-1 md:mb-2 ${aud.headingColor}`}>{aud.title}</h3>
                                    <p className="text-gray-600 text-[10px] md:text-xs leading-snug md:leading-relaxed">{aud.description}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════ SECTION 9 — TECH STACK ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
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
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Enterprise-grade tools. Factory-floor reliability.
                            </SplitTextReveal>
                        </div>
                    </div>
                </div>

                {/* Marquee reel */}
                <div ref={techRef} className="relative w-full overflow-hidden py-8 group">
                    {/* Left / right fade masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="flex animate-[marquee_40s_linear_infinite] w-max group-hover:[animation-play-state:paused]">
                        {[...TECH_STACK_MARQUEE, ...TECH_STACK_MARQUEE].map((tech, i) => (
                            <div key={i} className="flex flex-col items-center justify-center w-24 md:w-48 gap-3 md:gap-6 mx-3 md:mx-8">
                                <div className="h-10 md:h-16 w-full flex items-center justify-center px-2 md:px-4">
                                    <img src={tech.image}
                                        alt={tech.name}
                                        className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-sm hover:scale-105"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} loading="lazy" width={512} height={512} />
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

            {/* ═══════ SECTION 10 — CLOSING CTA ═══════ */}
            <section ref={ctaRef} className="py-16 lg:py-24 relative overflow-hidden bg-brand-light-bg font-sans border-t border-[#2D6A4F]/5">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-badge-bg/80 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#E8F5EE]/60 rounded-full blur-[100px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                                Ready to See Your
                            </h2>
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                                Factory in Real Time?
                            </h2>
                        </div>
                        <p className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Let's talk about connecting your systems, recovering your capacity, and putting AI to work on your production floor.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                className="cta-btn group relative flex items-center gap-3 px-10 py-5 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 overflow-hidden"
                            >
                                Build Your Platform
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ManufacturingIntelligencePage;
