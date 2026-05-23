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
        title: "Cost Per Call Doesn't Scale",
        description: "Every call requires a trained agent. As volume grows, so does headcount, salary, training cost, and attrition. The unit economics break at scale.",
        icon: '/icons/gaps.png',
        bgColor: 'bg-[#FFF7ED]',
        hoverBg: 'hover:bg-[#FFEDD5]',
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#F97316]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.05)]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.02)',
    },
    {
        title: 'Inconsistent Agent Performance',
        description: "Your best agent and your worst agent handle the same call very differently. Script adherence, tone, objection handling — all vary by person, by shift, by mood.",
        icon: '/icons/multivendor.png',
        bgColor: 'bg-[#FFF1F2]',
        hoverBg: 'hover:bg-[#FFE4E6]',
        border: 'border-[#FFE4E6]',
        hoverBorder: 'hover:border-[#E11D48]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.05)]',
        iconBorder: 'border-[#FFE4E6]/60',
        spotlight: 'rgba(225, 29, 72, 0.02)',
    },
    {
        title: 'Follow-Up Falls Through',
        description: "Outbound follow-up campaigns require dedicated dialers. Most businesses under-resource it. Leads go cold. Pipeline shrinks. Revenue leaks.",
        icon: '/icons/Voice ai.png',
        bgColor: 'bg-[#F0FDF4]',
        hoverBg: 'hover:bg-[#DCFCE7]',
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#22C55E]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.05)]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.02)',
    }
];

const WHAT_WE_BUILD = [
    {
        title: 'Inbound Voice Agents',
        description: 'AI agents that answer every inbound call instantly — no hold time, no IVR maze. They understand the caller\'s intent, handle queries, resolve issues, capture information, and escalate to a human only when genuinely needed. Available 24/7 at any call volume.',
        icon: '/icons/phone-call.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Outbound Calling Agents',
        description: 'Autonomous outbound agents that dial your lead list, qualify prospects, deliver messages, collect responses, and book meetings — all in natural conversational voice. Run campaigns at scale without a single human dialler.',
        icon: '/icons/Voice ai.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'IVR Replacement',
        description: 'Replace press-1-for-billing with a voice agent that actually understands what callers say. No menus. No frustration. Callers state their need in plain language and the agent handles it — or routes it intelligently.',
        icon: '/icons/gaps.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Multilingual Voice Assistants',
        description: 'Voice agents that speak your customers\' language — Hindi, English, Arabic, Spanish, French, and more. Switch languages mid-conversation. Serve global or regional markets without building separate call centre teams per language.',
        icon: '/icons/world.png',
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
        title: 'Real-Time Speech Recognition',
        description: 'Industry-leading STT engines (Deepgram, Whisper, AssemblyAI) with low word-error rates across accents, noise conditions, and call quality levels. What callers say is always understood accurately.',
        icon: '/icons/Mic.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Natural Language Understanding',
        description: 'Beyond transcription — the agent understands intent, extracts key information (name, account number, issue type), handles ambiguity, and knows when to ask a clarifying question vs when to act.',
        icon: '/icons/innovation.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Dynamic Conversation Flows',
        description: 'Conversations are not scripted trees. The agent reasons through each response dynamically — handling unexpected turns, topic switches, objections, and emotional callers without breaking down.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'CRM & System Integration',
        description: 'Mid-call, the agent queries and updates your CRM, booking system, or database. It can pull a caller\'s account history, check appointment availability, log call outcomes, and trigger follow-up actions — all without human intervention.',
        icon: '/icons/custom dev.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Call Recording & Transcription',
        description: 'Every call recorded, transcribed, and stored. Full searchable call logs. Sentiment analysis per call. Automatic flagging of calls that need human review. Complete audit trail.',
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        title: 'Escalation & Warm Transfer',
        description: 'When the agent reaches its boundary — complex complaint, high-value customer, regulatory sensitivity — it escalates with a warm transfer. The human agent receives a live summary before picking up. No repetition for the caller.',
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
        title: 'Sales & Lead Qualification',
        description: 'Outbound agents call fresh leads within seconds of form submission. Qualify, pitch, handle objections, and book demo meetings — before your human sales team even sees the lead.',
        icon: '/icons/innovation.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Customer Support',
        description: 'Handle tier-1 support calls autonomously. Account queries, order status, password resets, policy questions — resolved instantly, without hold time, without a support agent.',
        icon: '/icons/chat.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Debt Collection & Payment Follow-Up',
        description: 'Compliant, consistent outbound calls for payment reminders and collection workflows. Agents negotiate payment plans, confirm payment dates, and escalate only unresolved cases.',
        icon: '/icons/data-analytics.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'HR Screening & Recruitment',
        description: 'Automated first-round screening calls for high-volume hiring. The agent asks your screening questions, evaluates responses, scores candidates, and schedules interviews for shortlisted applicants.',
        icon: '/icons/collaboration.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'Surveys & Feedback Collection',
        description: 'Post-purchase, post-service, or NPS surveys conducted via outbound voice call. Higher response rates than SMS or email. Responses transcribed, analysed, and reported automatically.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Appointment Booking & Reminders',
        description: 'Inbound booking agents handle scheduling in real time. Outbound reminder agents reduce no-show rates with confirmation calls 24 hours before. Integrated directly with your calendar system.',
        icon: '/icons/advisors.png',
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
        title: 'Financial Services & Lending',
        description: 'Lead qualification for loan products, EMI reminder calls, KYC collection calls, customer support for banks and NBFCs — compliant, consistent, and scalable.',
        icon: '/icons/bank.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Healthcare & Clinics',
        description: 'Appointment booking, prescription reminder calls, post-discharge follow-up, patient satisfaction surveys — handling high call volumes without adding front-desk staff.',
        icon: '/icons/health-care.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Real Estate',
        description: 'Instant callback on property enquiries, site visit scheduling, broker follow-up calls, and resale lead reactivation campaigns — running 24/7 without a dedicated calling team.',
        icon: '/icons/architecture.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'E-Commerce & Retail',
        description: 'Order confirmation calls, delivery exception notifications, return initiation, and post-purchase feedback — voice touchpoints that increase trust and reduce support load.',
        icon: '/icons/shopping-bag.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'EdTech & Coaching',
        description: 'Admissions enquiry handling, demo class scheduling, fee reminder calls, and student progress check-ins — voice agents that sound like your counselling team.',
        icon: '/icons/graduation.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Telecom & SaaS',
        description: 'Churn prevention calls, upsell campaigns, renewal reminders, onboarding check-ins, and support escalation handling — at the call volumes that telecoms and SaaS businesses actually operate at.',
        icon: '/icons/phone-call.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
];


const TECH_STACK_MARQUEE = [
    { category: 'Telephony', name: 'Twilio', image: '/techstack/Twilio.png' },
    { category: 'Telephony', name: 'Vonage', image: '/techstack/AWS.svg' },
    { category: 'Speech-to-Text', name: 'Deepgram', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
    { category: 'Text-to-Speech', name: 'ElevenLabs', image: '/icons/Voice ai.png' },
    { category: 'LLM Backbone', name: 'Gemini', image: '/techstack/gemini.png' },
    { category: 'Agent Frameworks', name: 'LangChain', image: '/techstack/Python.svg' },
    { category: 'Backend', name: 'Python', image: '/techstack/Python.svg' },
    { category: 'Backend', name: 'FastAPI', image: '/techstack/FastAPI.svg' },
    { category: 'Infrastructure', name: 'Docker', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
];

export default function VoiceAIPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const problemRef = useRef<HTMLDivElement>(null);
    const buildRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const useCasesRef = useRef<HTMLDivElement>(null);
    const industriesRef = useRef<HTMLDivElement>(null);
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

            // The Problem
            const problemItems = problemRef.current?.querySelectorAll('.problem-item');
            if (problemItems) {
                gsap.fromTo(problemItems, { x: -30, opacity: 0 }, {
                    x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: problemRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
                });
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

        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-brand-light-bg min-h-screen pt-24 font-body text-primary overflow-x-hidden">
            <SEO
                title="Voice AI | Frostrek AI Solutions"
                description="We build custom Voice AI systems that handle inbound calls, run outbound campaigns, and replace legacy IVR."
                path="/solutions/voice-ai"
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section ref={heroRef} className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden flex items-center justify-center min-h-[85vh]">
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
                            Voice AI — Every Call Handled. Every Lead Followed Up. Always On.
                        </SplitTextReveal>

                        <SplitTextReveal
                            as="p"
                            className="hero-el text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-10 max-w-3xl"
                            type="words" stagger={0.015} once={false} delay={0.5}
                        >
                            We build custom Voice AI systems that handle inbound calls, run outbound campaigns, replace legacy IVR, and conduct voice interactions at any scale — in natural, human-sounding speech, 24/7, without a call centre.
                        </SplitTextReveal>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="hero-el w-full sm:w-auto"
                        >
                            <Link
                                to="/contact"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-bold text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Build Your Voice Agent
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* ═══════ SECTION 2 — THE PROBLEM ═══════ */}
            <section ref={problemRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden border-t border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="space-y-4 md:space-y-6">
                            <h2 className="problem-item font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                                The Problem With Human-Only Voice Operations
                            </h2>

                            <div className="flex flex-col gap-4 md:gap-6 pt-2 md:pt-4">
                                {PROBLEMS.map((problem) => (
                                    <SpotlightCard
                                        key={problem.title}
                                        className={`problem-item group relative overflow-hidden rounded-xl md:rounded-2xl border p-4 md:p-6 transition-all duration-300 ${problem.bgColor} ${problem.border} ${problem.hoverShadow} hover:-translate-y-1`}
                                        spotlightColor={problem.spotlight}
                                    >
                                        <div className="relative z-10 flex gap-3 md:gap-5 items-center justify-between">
                                            <div className="flex gap-3 md:gap-5 items-center flex-1">
                                                <div className={`w-10 h-10 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${problem.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                                    <img src={problem.icon} alt={problem.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className={`font-serif text-[15px] md:text-xl font-bold mb-1 md:mb-1.5 text-black`}>{problem.title}</h3>
                                                    <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600 font-medium">{problem.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SpotlightCard>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Abstract Visual */}
                        <div className="problem-item flex justify-center items-center relative min-h-[400px]">
                            <div className="absolute w-[350px] h-[350px] bg-[#E8F5EE] rounded-full blur-[80px] opacity-60 -z-10 animate-pulse" />
                            <div className="relative w-full max-w-[500px] border border-[#2D6A4F]/10 rounded-[2rem] bg-white/80 backdrop-blur-md p-8 shadow-[0_30px_60px_rgba(45,106,79,0.08)] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2D6A4F_1px,transparent_1px)] [background-size:16px_16px] opacity-5"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    {/* Simulated Phone Network illustration */}
                                    <div className="w-full flex justify-center items-center mb-6 relative">
                                        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gradient-to-r from-rose-400 via-emerald-400 to-sky-400 opacity-30 -z-10"></div>
                                        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex flex-col items-center justify-center shadow-sm z-10">
                                            <div className="w-8 h-8 rounded-full bg-rose-200/50 flex items-center justify-center animate-ping"><span className="text-xl">📞</span></div>
                                        </div>
                                        <div className="mx-8 text-slate-400">→</div>
                                        <div className="w-20 h-20 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex flex-col items-center justify-center shadow-lg shadow-emerald-500/20 z-10">
                                            <span className="text-2xl font-black text-emerald-600">AI</span>
                                        </div>
                                        <div className="mx-8 text-slate-400">→</div>
                                        <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-200 flex flex-col items-center justify-center shadow-sm z-10 text-xl">✅</div>
                                    </div>
                                    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-800 shadow-inner overflow-hidden relative">
                                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-[slide_2s_linear_infinite]"></div>
                                        <div className="flex items-center gap-2 mb-3 relative z-10"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[10px] text-slate-400 font-mono">100% Coverage Reached</span></div>
                                        <div className="flex gap-1 items-end h-8 relative z-10">
                                            {[...Array(12)].map((_, i) => (
                                                <div key={i} className="w-full bg-emerald-500/80 rounded-t" style={{ height: `${Math.random() * 80 + 20}%`, opacity: Math.random() * 0.5 + 0.5 }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                className="max-w-2xl mx-auto text-lg text-gray-500 font-medium"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Four categories of Voice AI — each replacing a different voice operation bottleneck.
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
                                        <img src={agent.icon} alt={agent.title} className="w-4 h-4 md:w-6 md:h-6 object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-serif text-[14px] md:text-xl font-bold mb-1 md:mb-3 ${agent.headingColor}`}>{agent.title}</h3>
                                        <p className="text-gray-600 text-[11px] md:text-sm leading-snug md:leading-relaxed font-medium">{agent.description}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════ SECTION 5 — KEY CAPABILITIES ═══════ */}
            <section ref={capabilitiesRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Key Capabilities
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 font-medium mt-4">
                            The technical foundations that make our Voice AI production-ready — not just demo-ready.
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
                                        <img src={cap.icon} alt={cap.title} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" />
                                    </div>
                                    <h3 className={`font-serif text-[13px] md:text-lg font-bold mb-1 md:mb-2 ${cap.headingColor}`}>{cap.title}</h3>
                                    <p className="text-gray-600 text-[10px] md:text-xs leading-snug md:leading-relaxed font-medium">{cap.description}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — USE CASES BY FUNCTION ═══════ */}
            <section ref={useCasesRef} className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Use Cases by Function
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 font-medium mt-4">
                            Voice AI isn't one use case — it's a capability that transforms multiple functions across your business.
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
                                        <img src={useCase.icon} alt={useCase.title} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" />
                                    </div>
                                    <h3 className={`font-serif text-[13px] md:text-xl font-bold mb-1 md:mb-3 ${useCase.headingColor}`}>{useCase.title}</h3>
                                    <p className="text-gray-600 text-[10px] md:text-sm leading-snug md:leading-relaxed font-medium">{useCase.description}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 7 — INDUSTRIES WE SERVE ═══════ */}
            <section ref={industriesRef} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Industries We Serve
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 font-medium mt-4">
                            Any industry where voice is a primary customer touchpoint is a candidate for Voice AI.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {INDUSTRIES.map((industry) => (
                            <SpotlightCard
                                key={industry.title}
                                className={`ind-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${industry.bgColor} ${industry.border} ${industry.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={industry.spotlight}
                            >
                                <div className="relative z-10">
                                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl border flex items-center justify-center mb-2 md:mb-5 bg-white/40 ${industry.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={industry.icon} alt={industry.title} className="w-3.5 h-3.5 md:w-5 md:h-5 object-contain" />
                                    </div>
                                    <h3 className={`font-serif text-[13px] md:text-xl font-bold mb-1 md:mb-3 ${industry.headingColor}`}>{industry.title}</h3>
                                    <p className="text-gray-600 text-[10px] md:text-sm leading-snug md:leading-relaxed font-medium">{industry.description}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>


            {/* ═══════ SECTION 9 — TECH STACK ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-b border-[#2D6A4F]/5">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                            Tech Stack
                        </h2>
                        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-500 font-medium mt-4">
                            The best voice, language, and infrastructure tools — assembled into one production-grade pipeline.
                        </p>
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
                                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false}
                            >
                                Ready to Put Your
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false} delay={0.2}
                            >
                                Phone Lines on Autopilot?
                            </SplitTextReveal>

                            <SplitTextReveal
                                as="p"
                                className="text-base md:text-lg text-gray-500 font-medium mb-10 max-w-2xl"
                                type="words" stagger={0.015} once={false} delay={0.4}
                            >
                                Tell us your call volume, your use case, and your biggest voice ops bottleneck. We'll design and deploy the Voice AI system that handles it.
                            </SplitTextReveal>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <Link
                                    to="/contact"
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-bold text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                                >
                                    Build Your Voice Agent
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
