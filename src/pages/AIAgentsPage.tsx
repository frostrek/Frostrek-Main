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

const WHAT_WE_BUILD = [
    {
        title: 'AI Calling Agents',
        description: 'Fully autonomous voice agents that handle inbound and outbound calls. They qualify leads, answer support queries, conduct surveys, follow up on payments, and book appointments — in natural conversational voice, 24/7, at any call volume.',
        icon: '/icons/phone-call.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Conversational Chat Agents',
        description: 'Intelligent chat agents deployed on your website, app, or WhatsApp. They handle customer queries, guide users through complex flows, capture leads, and resolve support tickets — with full memory of the conversation and access to your knowledge base.',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Workflow Automation Agents',
        description: 'Agents that don\'t just talk — they act. Connected to your CRM, ERP, calendar, email, and internal tools. They receive a task, reason through it, query the right systems, and complete multi-step workflows without human intervention.',
        icon: '/icons/gaps.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Domain-Specific Cognitive Assistants',
        description: 'Deeply specialised agents fine-tuned for a specific domain — a sports intelligence assistant, a financial advisory bot, an HR onboarding agent. Built on your proprietary data, trained on your processes, and designed to sound like an expert in your field.',
        icon: '/icons/ai agents.png',
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
        title: 'Large Language Model Backbone',
        description: 'Our agents are built on leading LLMs — GPT-4, Claude, Gemini, or open-source models like LLaMA — selected and configured based on your latency, cost, and compliance requirements.',
        icon: '/optimized/innovation.webp',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Retrieval-Augmented Generation (RAG)',
        description: 'Agents query your knowledge base, documents, and internal data in real time to give accurate, grounded answers — not hallucinated ones. Your data stays yours.',
        icon: '/optimized/data-analytics.webp',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Voice & Speech Integration',
        description: 'Production-grade voice pipelines with real-time speech-to-text, natural language understanding, and text-to-speech. Indistinguishable from a trained human caller in most scenarios.',
        icon: '/icons/Voice ai.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Tool Use & System Integration',
        description: 'Agents use tools — they can query APIs, read from databases, write to CRMs, send emails, create calendar entries, and trigger webhooks — all mid-conversation, without breaking flow.',
        icon: '/optimized/custom-dev.webp',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Memory & Context Management',
        description: 'Short-term conversation memory and long-term user memory. Agents remember what was said, what was agreed, and what the user prefers — across sessions, across channels.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        title: 'Human-in-the-Loop Escalation',
        description: 'When the agent reaches its boundary, it escalates gracefully — handing off to a human with full conversation context, no repetition required. Configurable escalation triggers per use case.',
        icon: '/icons/collaboration.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
];

const USE_CASES = [
    {
        title: 'Sales',
        description: 'Inbound lead qualification, outbound prospecting calls, demo scheduling, follow-up sequences, CRM enrichment — all automated. Your sales team focuses on closing, not chasing.',
        icon: '/optimized/innovation.webp',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Customer Support',
        description: '24/7 first-line support across chat, voice, and WhatsApp. Resolve tier-1 tickets instantly, escalate complex cases with full context, and reduce support cost per ticket dramatically.',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'HR & Recruitment',
        description: 'Candidate screening calls, interview scheduling, onboarding Q&A, policy queries, and employee helpdesk — handled autonomously by agents that know your HR policies and systems.',
        icon: '/icons/collaboration.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Operations',
        description: 'Internal workflow agents that handle approval routing, status updates, data entry, report generation, and cross-system coordination — without involving a human for every step.',
        icon: '/optimized/custom-dev.webp',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'Finance',
        description: 'Payment follow-up calls, invoice query resolution, expense pre-approval, financial report Q&A, and compliance check automation — agents that speak the language of your finance team.',
        icon: '/optimized/data-analytics.webp',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'E-Commerce & Retail',
        description: 'Order tracking, return initiation, product recommendations, abandoned cart recovery, and post-purchase support — agents that convert and retain customers at scale.',
        icon: '/icons/shopping-bag.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
];

const INDUSTRIES = [
    {
        title: 'Financial Services',
        description: 'Lead qualification, loan query handling, KYC pre-screening, investment advisory bots, and customer support automation for banks, lenders, and fintechs.',
        icon: '/icons/bank.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Healthcare',
        description: 'Appointment booking, symptom triage, prescription follow-up, patient onboarding, and insurance query resolution — HIPAA-aware agent architectures.',
        icon: '/icons/health-care.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'E-Commerce & Retail',
        description: 'Order management, returns, product discovery, loyalty programme queries, and post-purchase engagement across chat and voice channels.',
        icon: '/icons/shopping-bag.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Real Estate',
        description: 'Property enquiry handling, viewing scheduling, lead qualification, buyer follow-up, and rental management agents — working across WhatsApp, web, and phone.',
        icon: '/optimized/architecture.webp',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'EdTech & Training',
        description: 'Student onboarding, course guidance, doubt resolution agents, progress tracking, and tutor scheduling — personalised at scale.',
        icon: '/icons/graduation.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Manufacturing & Enterprise',
        description: 'Internal workflow agents, operational Q&A, compliance assistants, shift coordination bots, and supplier communication automation for large organisations.',
        icon: '/icons/manufacturing.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
];

const HOW_WE_BUILD = [
    {
        step: '1',
        title: 'Discovery & Agent Design',
        description: 'We map your use case, define the agent\'s scope, personality, escalation rules, and success metrics. We identify which systems it needs to connect to and what data it needs to be accurate.',
        icon: '/optimized/innovation.webp',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
    },
    {
        step: '2',
        title: 'Data & Knowledge Base Setup',
        description: 'We ingest your documents, FAQs, product data, policies, and system records. We build and test the RAG pipeline to ensure the agent retrieves the right information reliably.',
        icon: '/optimized/data-analytics.webp',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
    },
    {
        step: '3',
        title: 'Build, Integrate & Test',
        description: 'We build the agent, integrate it with your CRM, telephony, chat platform, or internal tools. We run adversarial testing — pushing edge cases, off-topic queries, and error scenarios — before a single real user touches it.',
        icon: '/optimized/custom-dev.webp',
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
    },
    {
        step: '4',
        title: 'Deploy, Monitor & Improve',
        description: 'We deploy to production, monitor every conversation, flag low-confidence responses, and run improvement cycles. Agents get better over time — not worse.',
        icon: '/icons/collaboration.png',
        iconBg: 'bg-[#FFF1F2]',
        iconBorder: 'border-[#FECDD3]',
        headingColor: 'text-[#E11D48]',
    },
];

const TECH_STACK_MARQUEE = [
    { category: 'LLM Providers', name: 'Meta LLaMA', image: '/techstack/Meta.svg' },
    { category: 'Voice & Telephony', name: 'Twilio', image: '/techstack/Twilio.png' },
    { category: 'Voice & Telephony', name: 'ElevenLabs', image: '/icons/Voice ai.png' },
    { category: 'RAG & Vector Search', name: 'Pinecone', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { category: 'Integrations', name: 'HubSpot', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg' },
    { category: 'Backend', name: 'Python', image: '/techstack/Python.svg' },
    { category: 'Backend', name: 'FastAPI', image: '/techstack/FastAPI.svg' },
    { category: 'Backend', name: 'Node.js', image: '/techstack/Node.js.svg' },
    { category: 'Backend', name: 'PostgreSQL', image: '/techstack/PostgresSQL.svg' },
    { category: 'Frontend', name: 'React', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { category: 'Frontend', name: 'Tailwind CSS', image: '/techstack/Tailwind CSS.svg' },
    { category: 'Infrastructure', name: 'AWS', image: '/techstack/AWS.svg' },
    { category: 'Infrastructure', name: 'Docker', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
    { category: 'Infrastructure', name: 'Kubernetes', image: '/techstack/Kubernetes.svg' },
];

export default function AIAgentsPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const buildRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const howWorkRef = useRef<HTMLDivElement>(null);
    const useCasesRef = useRef<HTMLDivElement>(null);
    const industriesRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            if (heroRef.current) {
                gsap.fromTo(
                    '.hero-el',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
                );
            }

            // What We Build cards
            const buildCards = buildRef.current?.querySelectorAll('.build-card');
            if (buildCards) {
                gsap.fromTo(buildCards, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: buildRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Capabilities
            const capCards = capabilitiesRef.current?.querySelectorAll('.cap-card');
            if (capCards) {
                gsap.fromTo(capCards, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power2.out',
                    scrollTrigger: { trigger: capabilitiesRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // How Agents Work
            const flowItems = howWorkRef.current?.querySelectorAll('.flow-item');
            if (flowItems) {
                gsap.fromTo(flowItems, { x: -30, opacity: 0 }, {
                    x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: howWorkRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Use Cases
            const caseCards = useCasesRef.current?.querySelectorAll('.case-card');
            if (caseCards) {
                gsap.fromTo(caseCards, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
                    scrollTrigger: { trigger: useCasesRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Industries
            const indCards = industriesRef.current?.querySelectorAll('.ind-card');
            if (indCards) {
                gsap.fromTo(indCards, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
                    scrollTrigger: { trigger: industriesRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // How We Build It
            const processSteps = processRef.current?.querySelectorAll('.process-step');
            if (processSteps) {
                gsap.fromTo(processSteps, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: processRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-brand-light-bg min-h-screen pt-24 font-body text-primary overflow-x-hidden">
            <SEO
                title="AI Agents | Frostrek AI Solutions"
                description="We design and deploy custom AI agents that think, respond, and act — handling calls, conversations, workflows, and decisions at scale."
                path="/solutions/ai-agents"
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section ref={heroRef} className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden flex items-center justify-center min-h-[85vh]">
                {/* Decorative background elements matching Fintech */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-badge-bg/40 rounded-full blur-[100px] opacity-60 animate-pulse pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E8F5EE]/60 rounded-full blur-[120px] opacity-60 pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1200px]">
                    <div className="flex flex-col items-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="hero-el inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#2D6A4F]/10 shadow-sm mb-8"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" />
                            <span className="text-sm font-bold text-[#2D6A4F] tracking-wide uppercase">Our Solutions</span>
                        </motion.div>

                        <SplitTextReveal
                            as="h1"
                            className="hero-el font-serif text-4xl md:text-6xl lg:text-7xl text-[#2D6A4F] leading-[1.1] tracking-[-0.02em] mb-8"
                            type="chars" stagger={0.02} once={false} delay={0.2}
                        >
                            AI Agents — Intelligent, Autonomous, Built for Your Business
                        </SplitTextReveal>

                        <SplitTextReveal
                            as="p"
                            className="hero-el text-lg md:text-xl text-gray-600 leading-relaxed mb-10 max-w-3xl"
                            type="words" stagger={0.015} once={false} delay={0.5}
                        >
                            We design and deploy custom AI agents that think, respond, and act — handling calls, conversations, workflows, and decisions at scale. Not off-the-shelf chatbots. Purpose-built agents trained on your data, integrated into your systems, and working 24/7 so your team doesn't have to.
                        </SplitTextReveal>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="hero-el w-full sm:w-auto"
                        >
                            <Link
                                to="/contact"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Build Your Agent
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
            </section>


            {/* ═══════ SECTION 3 — WHAT WE BUILD ═══════ */}
            <section ref={buildRef} className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            What We Build
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Four categories of AI agents — each solving a different class of business problem.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                        {WHAT_WE_BUILD.map((agent) => (
                            <SpotlightCard
                                key={agent.title}
                                className={`build-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${agent.bgColor} ${agent.border} ${agent.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={agent.spotlight}
                            >
                                <div className="relative z-10 flex gap-3 md:gap-5 items-start">
                                    <div className={`w-9 h-9 md:w-14 md:h-14 rounded-lg md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${agent.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={agent.icon} alt={agent.title} className="w-4 h-4 md:w-6 md:h-6 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-serif text-[14px] md:text-xl font-bold mb-1 md:mb-3 ${agent.headingColor}`}>{agent.title}</h3>
                                        <p className="text-gray-600 text-[11px] md:text-sm leading-snug md:leading-relaxed">{agent.description}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4 — KEY CAPABILITIES ═══════ */}
            <section ref={capabilitiesRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Key Capabilities
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            The technical building blocks that make our agents genuinely intelligent — not just responsive.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {KEY_CAPABILITIES.map((cap) => (
                            <SpotlightCard
                                key={cap.title}
                                className={`cap-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${cap.bgColor} ${cap.border} ${cap.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={cap.spotlight}
                            >
                                <div className="relative z-10">
                                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border flex items-center justify-center mb-2 md:mb-5 bg-white/40 ${cap.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={cap.icon} alt={cap.title} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <h3 className={`font-serif text-[13px] md:text-lg font-bold mb-1 md:mb-2 ${cap.headingColor}`}>{cap.title}</h3>
                                    <p className="text-gray-600 text-[10px] md:text-xs leading-snug md:leading-relaxed">{cap.description}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — HOW OUR AGENTS WORK ═══════ */}
            <section ref={howWorkRef} className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-b border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            How Our Agents Work
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Under the hood — a purpose-built architecture for reliable, production-grade AI.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="space-y-4 md:space-y-6 bg-white border border-[#2D6A4F]/10 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-10 shadow-sm">
                            <ul className="space-y-4 md:space-y-6">
                                <li className="flow-item flex items-start gap-3 md:gap-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xs md:text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                                    <div>
                                        <h3 className="font-bold text-[14px] md:text-base text-gray-800 mb-0.5 md:mb-1">Understand</h3>
                                        <p className="text-gray-600 text-[12px] md:text-sm leading-snug md:leading-relaxed">Every input — voice or text — passes through natural language understanding. The agent identifies intent, extracts entities, and determines what the user actually needs.</p>
                                    </div>
                                </li>
                                <li className="flow-item flex items-start gap-3 md:gap-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 text-xs md:text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                                    <div>
                                        <h3 className="font-bold text-[14px] md:text-base text-gray-800 mb-0.5 md:mb-1">Retrieve</h3>
                                        <p className="text-gray-600 text-[12px] md:text-sm leading-snug md:leading-relaxed">The agent queries your knowledge base, documents, and connected systems in real time using RAG. It retrieves only what's relevant — grounding every response in your actual data.</p>
                                    </div>
                                </li>
                                <li className="flow-item flex items-start gap-3 md:gap-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs md:text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                                    <div>
                                        <h3 className="font-bold text-[14px] md:text-base text-gray-800 mb-0.5 md:mb-1">Reason</h3>
                                        <p className="text-gray-600 text-[12px] md:text-sm leading-snug md:leading-relaxed">The LLM backbone reasons through the task — deciding what to do, what tools to use, what to say next. Complex multi-step decisions handled in milliseconds.</p>
                                    </div>
                                </li>
                                <li className="flow-item flex items-start gap-3 md:gap-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 text-xs md:text-sm font-bold flex-shrink-0 mt-0.5">4</div>
                                    <div>
                                        <h3 className="font-bold text-[14px] md:text-base text-gray-800 mb-0.5 md:mb-1">Act</h3>
                                        <p className="text-gray-600 text-[12px] md:text-sm leading-snug md:leading-relaxed">The agent calls the right tools — CRM lookup, calendar booking, database query, API call, email trigger — and completes the task autonomously or presents options to the user.</p>
                                    </div>
                                </li>
                                <li className="flow-item flex items-start gap-3 md:gap-4">
                                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 text-xs md:text-sm font-bold flex-shrink-0 mt-0.5">5</div>
                                    <div>
                                        <h3 className="font-bold text-[14px] md:text-base text-gray-800 mb-0.5 md:mb-1">Learn</h3>
                                        <p className="text-gray-600 text-[12px] md:text-sm leading-snug md:leading-relaxed">Every interaction is logged, evaluated, and used to improve the agent over time. We run continuous evaluation loops to catch errors, refine responses, and expand capability.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Right side: Abstract architectural flow */}
                        <div className="flex justify-center items-center relative min-h-[300px] md:min-h-[400px] mt-8 lg:mt-0">
                            <div className="absolute w-[400px] h-[400px] bg-[#E8F5EE] rounded-full blur-[100px] opacity-80 -z-10" />
                            <div className="relative w-full max-w-[450px] bg-white rounded-3xl md:rounded-[2rem] border border-[#2D6A4F]/10 shadow-xl overflow-hidden p-6 md:p-8 hover:-translate-y-2 transition-transform duration-500">
                                <div className="flex flex-col items-center gap-4 md:gap-6">
                                    {/* 1. Understand */}
                                    <div className="w-full flex justify-center">
                                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-sm px-6 py-3 rounded-full shadow-sm text-center w-48">
                                            1. Understand Input
                                        </div>
                                    </div>
                                    <div className="w-px h-6 bg-gray-300"></div>
                                    {/* 2 & 3. Retrieve and Reason (side by side loop) */}
                                    <div className="w-full flex justify-center gap-8 relative">
                                        <div className="absolute top-1/2 left-[25%] right-[25%] h-px bg-gray-300 -z-10 border-t border-dashed"></div>
                                        <div className="bg-sky-50 border border-sky-200 text-sky-800 font-bold text-sm px-4 py-3 rounded-xl shadow-sm text-center w-32">
                                            2. Retrieve Data
                                        </div>
                                        <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold text-sm px-4 py-3 rounded-xl shadow-sm text-center w-32">
                                            3. Reason Logic
                                        </div>
                                    </div>
                                    <div className="w-px h-6 bg-gray-300"></div>
                                    {/* 4. Act */}
                                    <div className="w-full flex justify-center">
                                        <div className="bg-rose-50 border border-rose-200 text-rose-800 font-bold text-sm px-6 py-3 rounded-full shadow-sm text-center w-48">
                                            4. Execute Action
                                        </div>
                                    </div>
                                    <div className="w-px h-6 bg-gray-300"></div>
                                    {/* 5. Learn */}
                                    <div className="w-full flex justify-center">
                                        <div className="bg-amber-50 border border-amber-200 text-amber-800 font-bold text-sm px-6 py-3 rounded-full shadow-sm text-center w-48 border-dashed">
                                            5. Learn & Refine
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — USE CASES BY FUNCTION ═══════ */}
            <section ref={useCasesRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Use Cases by Function
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            AI agents aren't one-size-fits-all. Here's how different teams deploy them.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {USE_CASES.map((useCase) => (
                            <SpotlightCard
                                key={useCase.title}
                                className={`case-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${useCase.bgColor} ${useCase.border} ${useCase.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={useCase.spotlight}
                            >
                                <div className="relative z-10">
                                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border flex items-center justify-center mb-2 md:mb-5 bg-white/40 ${useCase.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={useCase.icon} alt={useCase.title} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <h3 className={`font-serif text-[13px] md:text-xl font-bold mb-1 md:mb-3 ${useCase.headingColor}`}>{useCase.title}</h3>
                                    <p className="text-gray-600 text-[10px] md:text-sm leading-snug md:leading-relaxed">{useCase.description}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 7 — INDUSTRIES WE SERVE ═══════ */}
            <section ref={industriesRef} className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Industries We Serve
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 mt-4">
                            Deployed across industries where speed, accuracy, and scale of communication matter.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {INDUSTRIES.map((ind) => (
                            <SpotlightCard
                                key={ind.title}
                                className={`ind-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${ind.bgColor} ${ind.border} ${ind.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={ind.spotlight}
                            >
                                <div className="relative z-10">
                                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border flex items-center justify-center mb-2 md:mb-5 bg-white/40 ${ind.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={ind.icon} alt={ind.title} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <h3 className={`font-serif text-[13px] md:text-lg font-bold mb-1 md:mb-2 ${ind.headingColor}`}>{ind.title}</h3>
                                    <p className="text-gray-600 text-[10px] md:text-xs leading-snug md:leading-relaxed">{ind.description}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 8 — HOW WE BUILD IT ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-20">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            How We Build It
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                From brief to deployed agent — a structured process that gets it right the first time.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={processRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative">
                        {/* Connecting dashed line (desktop) */}
                        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] -z-10 border-t border-dashed border-[#2D6A4F]/30" />

                        {HOW_WE_BUILD.map((step) => (
                            <div key={step.step} className="process-step flex flex-col items-center text-center relative group">
                                {/* Icon circle */}
                                <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${step.iconBg} border ${step.iconBorder} flex items-center justify-center mb-4 md:mb-6 shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md relative z-10`}>
                                    <img src={step.icon} alt={step.title} className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-80" loading="lazy" width={512} height={512} />
                                </div>
                                <h3 className={`font-serif text-[15px] sm:text-lg md:text-xl font-bold mb-2 md:mb-3 ${step.headingColor}`}>{step.title}</h3>
                                <p className="text-[13px] sm:text-sm leading-relaxed text-gray-500 px-1 sm:px-2 mb-4 md:mb-6 min-h-[5rem] md:min-h-[80px]">{step.description}</p>

                                {/* Step number badge */}
                                <div className="mt-auto flex flex-col items-center gap-3 w-full">
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#2D6A4F]/30 flex items-center justify-center text-[#2D6A4F] text-xs md:text-sm font-bold bg-[#2D6A4F]/5 shadow-sm">
                                        {step.step}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 9 — TECH STACK ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-[#2D6A4F]/5">
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
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Best-in-class tools across every layer of the agent stack.
                            </SplitTextReveal>
                        </div>
                    </div>
                </div>

                {/* Marquee reel */}
                <div ref={techRef} className="relative w-full overflow-hidden py-8 group">
                    {/* Left / right fade masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-light-bg to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-light-bg to-transparent z-10 pointer-events-none" />

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
                                    <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-black/60 mb-1">{tech.category}</span>
                                    <span className="text-[10px] md:text-xs font-medium text-gray-700">{tech.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 10 — CLOSING CTA ═══════ */}
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
                                Ready to Deploy Your
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false} delay={0.2}
                            >
                                First AI Agent?
                            </SplitTextReveal>

                            <SplitTextReveal
                                as="p"
                                className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl"
                                type="words" stagger={0.015} once={false} delay={0.4}
                            >
                                Tell us your use case — sales, support, operations, or something entirely custom. We'll design and build the agent that works for your business.
                            </SplitTextReveal>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <Link
                                    to="/contact"
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                                >
                                    Build Your Agent
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
