import { useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Compass,
    CheckCircle2,
    Search,
    Plus,
    Minus,
    HelpCircle,
    Layers,
    Cpu,
    Shield,
    Workflow,
    BarChart3,
    FileCheck,
    Database,
    Bot,
    ExternalLink,
    LineChart
} from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────── SCHEMAS ────────────────────────────────── */

const graphSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Organization',
            '@id': 'https://www.frostrek.ai/#organization',
            name: 'Frostrek AI',
            url: 'https://www.frostrek.ai/',
        },
        {
            '@type': 'Service',
            '@id': 'https://www.frostrek.ai/solutions/ai-consulting#service',
            name: 'AI Consulting & Implementation Roadmap for Businesses',
            serviceType: [
                'AI Strategy & Feasibility Assessment',
                'Business Workflow Discovery',
                'AI Architecture & Implementation Roadmap',
                'CRM & ERP AI Integration Advisory',
                'Pilot Planning & Technical Delivery'
            ],
            provider: {
                '@type': 'Organization',
                '@id': 'https://www.frostrek.ai/#organization',
                name: 'Frostrek AI',
            },
            areaServed: ['IN', 'US', 'GB', 'Global'],
            description: 'From AI opportunity assessment and strategy to custom development and deployment. Explore practical AI consulting with Frostrek AI.',
            url: 'https://www.frostrek.ai/solutions/ai-consulting'
        }
    ]
});

/* ────────────────────────────────── DATA ────────────────────────────────── */

const CORE_QUESTIONS = [
    {
        title: 'Repetitive & Expensive Tasks',
        desc: 'Which tasks are repetitive, slow, expensive to review, or prone to avoidable errors?',
        icon: Workflow,
        color: 'text-[#0284C7]',
        bg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]'
    },
    {
        title: 'Human Judgement vs Automation',
        desc: 'Which decisions require human judgement, and which steps can be reliably supported by automation?',
        icon: Shield,
        color: 'text-[#166534]',
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]'
    },
    {
        title: 'Information Storage & Access',
        desc: 'Where is the required information stored—in documents, CRM records, spreadsheets or internal tools?',
        icon: Database,
        color: 'text-[#C2410C]',
        bg: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]'
    },
    {
        title: 'Governance & Quality Checks',
        desc: 'What permissions, privacy rules, exception-handling steps and quality checks apply?',
        icon: FileCheck,
        color: 'text-[#6D28D9]',
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]'
    },
    {
        title: 'Pilot Measurement Framework',
        desc: 'How will the business measure whether a pilot is useful enough to expand?',
        icon: BarChart3,
        color: 'text-[#B45309]',
        bg: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]'
    }
];

const CONSULTING_PROCESS = [
    {
        step: '01',
        title: 'Business workflow discovery',
        desc: 'We review selected operational workflows with the people who run them. The aim is to understand the current process, recurring friction, systems involved, handoffs, volumes where available, and who owns the final decision. This establishes a concrete problem statement rather than a list of fashionable AI tools.',
        tag: 'Phase 1 • Problem Definition'
    },
    {
        step: '02',
        title: 'AI opportunity and feasibility assessment',
        desc: 'Potential use cases are assessed against likely business value, implementation complexity, data availability, integration constraints, risk and operational ownership. Some opportunities may be better addressed with conventional automation, search, or simpler software changes. The priority is a feasible, bounded starting point.',
        tag: 'Phase 2 • Value & Feasibility'
    },
    {
        step: '03',
        title: 'Data, integration and security readiness',
        desc: 'We examine what information a proposed solution would need and whether approved access is available. This may include document quality, API availability, identity and permission boundaries, human approval steps, logging, retention rules, and third-party dependencies. Sensitive use cases require additional privacy and security review before implementation.',
        tag: 'Phase 3 • Technical Readiness'
    },
    {
        step: '04',
        title: 'Solution architecture and implementation roadmap',
        desc: 'After the use case is defined, we can evaluate options such as workflow automation, knowledge assistants, retrieval-augmented generation (RAG), custom AI agents, or integration with existing business applications. A roadmap describes the proposed solution, assumptions, dependencies, staged milestones, responsibilities, testing gates and decisions that must be made before scale-up.',
        tag: 'Phase 4 • Staged Milestones'
    },
    {
        step: '05',
        title: 'Pilot planning and technical delivery',
        desc: 'Frostrek AI can take a selected use case from consulting and roadmap into custom solution development, controlled pilot deployment, testing and post-launch support. Requirements, CRM or ERP interfaces where relevant, acceptance criteria, fallback paths and human oversight are defined in the project scope. Pilot results inform the decision to improve, scale or stop.',
        tag: 'Phase 5 • Controlled Rollout'
    }
];

const ROADMAP_DELIVERABLES = [
    {
        title: 'Workflow & Friction Map',
        desc: 'A map of the selected business workflow and its current bottlenecks.'
    },
    {
        title: 'Prioritized Use-Case Matrix',
        desc: 'A prioritized set of AI/automation use cases with assumptions and feasibility considerations.'
    },
    {
        title: 'Data & Systems Checklist',
        desc: 'A data and integration readiness checklist for the systems involved.'
    },
    {
        title: 'Architecture & Oversight Model',
        desc: 'Architecture options, required controls and a human-oversight model.'
    },
    {
        title: 'Phased Implementation Plan',
        desc: 'A phased implementation plan with dependencies, decision owners and acceptance criteria.'
    },
    {
        title: 'Pilot Measurement Framework',
        desc: 'A measurement framework for pilot quality, effort, turnaround time or other agreed operational outcomes.'
    }
];

const SCENARIOS = [
    {
        title: 'Customer Enquiry & Service Workflows',
        desc: 'Connect approved knowledge, incoming questions and human escalation paths so that teams can respond consistently and retain context. Where appropriate, compare a custom system with an existing product workflow before building from scratch.',
        icon: '/icons/phone-call.png',
        bg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        titleColor: 'text-[#0284C7]'
    },
    {
        title: 'Internal Knowledge & Document Workflows',
        desc: 'Evaluate a searchable assistant that answers approved internal questions from policies, product documents or operating procedures, with source references and access permissions.',
        icon: '/icons/data-analytics.png',
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        titleColor: 'text-[#6D28D9]'
    },
    {
        title: 'CRM & ERP Integration with Business Workflows',
        desc: 'Assess opportunities to connect AI with existing CRM or ERP systems, such as enquiry triage, customer follow-ups, record updates or operational data workflows. Specific integration scope depends on the platform, available APIs, customer permissions, data quality and appropriate testing. No universal compatibility is implied.',
        icon: '/icons/gaps.png',
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        titleColor: 'text-[#166534]'
    },
    {
        title: 'AI Evaluation & Quality Operations',
        desc: 'For AI product teams, define evaluation rubrics, human review checkpoints, coding or STEM subject-matter requirements, and measurable QA processes before a larger managed workstream.',
        icon: '/icons/shield.png',
        bg: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        titleColor: 'text-[#E11D48]'
    }
];

const FAQS = [
    {
        q: 'What is included in AI consulting?',
        a: 'AI consulting can include workflow discovery, opportunity assessment, data and system readiness, risk review, architecture options and a prioritized implementation roadmap. The exact deliverables are set in the project scope.'
    },
    {
        q: 'Do we need a clear AI use case before contacting Frostrek?',
        a: 'No. A discovery discussion can begin with a business process or recurring operational problem. The first objective is to determine whether AI, conventional automation or a software change is appropriate.'
    },
    {
        q: 'How do you select the first use case?',
        a: 'We look for a bounded workflow with an accountable owner, usable information, measurable pain points and a practical way to test performance and exceptions.'
    },
    {
        q: 'Can Frostrek integrate AI with our existing CRM or ERP?',
        a: 'Yes. Frostrek offers CRM and ERP integration as services, subject to platform capabilities, authorized API access, data permissions, security requirements, integration feasibility and an agreed project scope.'
    },
    {
        q: 'Does every business need a custom LLM or AI agent?',
        a: 'No. Depending on the workflow, retrieval-based search, business rules, standard integrations or existing software may be simpler and more reliable.'
    },
    {
        q: 'Can you deliver the implementation as well as the roadmap?',
        a: 'Yes. Frostrek provides end-to-end AI consulting, solution development, deployment, testing and support. Deliverables, timelines and integrations are defined for each engagement. Clients may also use a standalone roadmap with their internal engineering team.'
    },
    {
        q: 'What is the expected project timeline?',
        a: 'Timelines depend on how many workflows and systems are included, data availability, decision-maker access and technical complexity. A schedule should be agreed after discovery rather than promised universally.'
    },
    {
        q: 'How is AI consulting priced?',
        a: 'Commercial terms depend on scope, depth of analysis and the agreed deliverables. Request a project discussion for a tailored proposal.'
    },
    {
        q: 'How do you address AI risks and human oversight?',
        a: 'We identify decision boundaries, access controls, approval needs, exception paths and evaluation criteria during scoping. High-impact decisions should not be automated without suitable review and controls.'
    }
];

// Rotating color themes matching site FAQ design (Blue, Green, Pink, Orange, Purple)
const FAQ_THEMES = [
    {
        // Blue Theme
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/40',
        activeBorder: 'border-[#0EA5E9]/40',
        shadow: 'shadow-[0_10px_35px_rgba(14,165,233,0.06)]',
        badgeBg: 'bg-[#F0F9FF]',
        badgeBorder: 'border-[#BAE6FD]/50',
        badgeText: 'text-[#0284C7]',
        questionText: 'text-gray-900 group-hover:text-[#0284C7]',
        activeQuestionText: 'text-[#0284C7]',
        iconBgActive: 'bg-[#0284C7]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#F0F9FF]',
        iconBorderInactive: 'border-[#BAE6FD]/50',
        iconTextInactive: 'text-[#0284C7]',
    },
    {
        // Green Theme
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#2D6A4F]/40',
        activeBorder: 'border-[#2D6A4F]/40',
        shadow: 'shadow-[0_10px_35px_rgba(45,106,79,0.06)]',
        badgeBg: 'bg-[#F0FDF4]',
        badgeBorder: 'border-[#BBF7D0]/50',
        badgeText: 'text-[#047857]',
        questionText: 'text-gray-900 group-hover:text-[#047857]',
        activeQuestionText: 'text-[#047857]',
        iconBgActive: 'bg-[#047857]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#F0FDF4]',
        iconBorderInactive: 'border-[#BBF7D0]/50',
        iconTextInactive: 'text-[#047857]',
    },
    {
        // Pink Theme
        border: 'border-[#FFE4E6]',
        hoverBorder: 'hover:border-[#BE123C]/40',
        activeBorder: 'border-[#BE123C]/40',
        shadow: 'shadow-[0_10px_35px_rgba(244,63,94,0.06)]',
        badgeBg: 'bg-[#FFF1F2]',
        badgeBorder: 'border-[#FFE4E6]/50',
        badgeText: 'text-[#BE123C]',
        questionText: 'text-gray-900 group-hover:text-[#BE123C]',
        activeQuestionText: 'text-[#BE123C]',
        iconBgActive: 'bg-[#BE123C]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#FFF1F2]',
        iconBorderInactive: 'border-[#FFE4E6]/50',
        iconTextInactive: 'text-[#BE123C]',
    },
    {
        // Orange Theme
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#C2410C]/40',
        activeBorder: 'border-[#C2410C]/40',
        shadow: 'shadow-[0_10px_35px_rgba(234,88,12,0.06)]',
        badgeBg: 'bg-[#FFF7ED]',
        badgeBorder: 'border-[#FFEDD5]/50',
        badgeText: 'text-[#C2410C]',
        questionText: 'text-gray-900 group-hover:text-[#C2410C]',
        activeQuestionText: 'text-[#C2410C]',
        iconBgActive: 'bg-[#C2410C]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#FFF7ED]',
        iconBorderInactive: 'border-[#FFEDD5]/50',
        iconTextInactive: 'text-[#C2410C]',
    },
    {
        // Purple Theme
        border: 'border-[#DDD6FE]',
        hoverBorder: 'hover:border-[#6D28D9]/40',
        activeBorder: 'border-[#6D28D9]/40',
        shadow: 'shadow-[0_10px_35px_rgba(109,40,217,0.06)]',
        badgeBg: 'bg-[#F5F3FF]',
        badgeBorder: 'border-[#DDD6FE]/50',
        badgeText: 'text-[#6D28D9]',
        questionText: 'text-gray-900 group-hover:text-[#6D28D9]',
        activeQuestionText: 'text-[#6D28D9]',
        iconBgActive: 'bg-[#6D28D9]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#F5F3FF]',
        iconBorderInactive: 'border-[#DDD6FE]/50',
        iconTextInactive: 'text-[#6D28D9]',
    }
];

// 5 rotating color themes for Delivery Framework stages (Blue, Green, Pink, Orange, Purple)
const STAGE_THEMES = [
    {
        // Blue Theme - Stage 01
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/60',
        shadow: 'hover:shadow-[0_12px_35px_rgba(14,165,233,0.12)]',
        badgeBg: 'bg-[#F0F9FF]',
        badgeText: 'text-[#0284C7]',
        badgeBorder: 'border-[#BAE6FD]/80',
        tagBg: 'bg-[#E0F2FE]',
        tagText: 'text-[#0284C7]',
        tagBorder: 'border-[#BAE6FD]/60',
        titleHover: 'group-hover:text-[#0284C7]',
        spotlight: 'rgba(14, 165, 233, 0.05)',
    },
    {
        // Green Theme - Stage 02
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#047857]/60',
        shadow: 'hover:shadow-[0_12px_35px_rgba(4,120,87,0.12)]',
        badgeBg: 'bg-[#F0FDF4]',
        badgeText: 'text-[#047857]',
        badgeBorder: 'border-[#BBF7D0]/80',
        tagBg: 'bg-[#DCFCE7]',
        tagText: 'text-[#047857]',
        tagBorder: 'border-[#BBF7D0]/60',
        titleHover: 'group-hover:text-[#047857]',
        spotlight: 'rgba(4, 120, 87, 0.05)',
    },
    {
        // Pink Theme - Stage 03
        border: 'border-[#FFE4E6]',
        hoverBorder: 'hover:border-[#BE123C]/60',
        shadow: 'hover:shadow-[0_12px_35px_rgba(190,18,60,0.12)]',
        badgeBg: 'bg-[#FFF1F2]',
        badgeText: 'text-[#BE123C]',
        badgeBorder: 'border-[#FFE4E6]/80',
        tagBg: 'bg-[#FFE4E6]',
        tagText: 'text-[#BE123C]',
        tagBorder: 'border-[#FECDD3]/60',
        titleHover: 'group-hover:text-[#BE123C]',
        spotlight: 'rgba(190, 18, 60, 0.05)',
    },
    {
        // Orange Theme - Stage 04
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#C2410C]/60',
        shadow: 'hover:shadow-[0_12px_35px_rgba(194,65,12,0.12)]',
        badgeBg: 'bg-[#FFF7ED]',
        badgeText: 'text-[#C2410C]',
        badgeBorder: 'border-[#FFEDD5]/80',
        tagBg: 'bg-[#FFEDD5]',
        tagText: 'text-[#C2410C]',
        tagBorder: 'border-[#FED7AA]/60',
        titleHover: 'group-hover:text-[#C2410C]',
        spotlight: 'rgba(194, 65, 12, 0.05)',
    },
    {
        // Purple Theme - Stage 05
        border: 'border-[#DDD6FE]',
        hoverBorder: 'hover:border-[#6D28D9]/60',
        shadow: 'hover:shadow-[0_12px_35px_rgba(109,40,217,0.12)]',
        badgeBg: 'bg-[#F5F3FF]',
        badgeText: 'text-[#6D28D9]',
        badgeBorder: 'border-[#DDD6FE]/80',
        tagBg: 'bg-[#EDE9FE]',
        tagText: 'text-[#6D28D9]',
        tagBorder: 'border-[#DDD6FE]/60',
        titleHover: 'group-hover:text-[#6D28D9]',
        spotlight: 'rgba(109, 40, 217, 0.05)',
    },
];

export default function AIConsultingPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [faqSearch, setFaqSearch] = useState('');

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.consulting-hero-el',
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    const filteredFaqs = useMemo(() => {
        if (!faqSearch.trim()) return FAQS;
        const q = faqSearch.toLowerCase();
        return FAQS.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
    }, [faqSearch]);

    const faqSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: f.a
            }
        }))
    });

    return (
        <article
            className="bg-brand-light-bg min-h-screen pt-24 font-body text-primary overflow-x-hidden"
            itemScope
            itemType="https://schema.org/Service"
        >
            <SEO
                title="AI Consulting & Implementation Roadmap | Frostrek AI"
                description="From AI opportunity assessment and strategy to custom development and deployment. Explore practical AI consulting with Frostrek AI."
                path="/solutions/ai-consulting"
                keywords="AI consulting, AI implementation roadmap, AI strategy for business, AI opportunity assessment, CRM ERP AI integration, Frostrek AI"
                schema={[graphSchema, faqSchema]}
            />
            <CuteBackground />

            {/* Semantic metadata for bots & AI engines */}
            <meta itemProp="name" content="AI Consulting & Implementation Roadmap for Businesses" />
            <meta itemProp="serviceType" content="AI Opportunity Assessment, Strategy & Implementation Roadmap" />
            <meta itemProp="url" content="https://www.frostrek.ai/solutions/ai-consulting" />

            {/* ══════════════ SECTION 1: HERO ══════════════ */}
            <section
                ref={heroRef}
                aria-label="AI Consulting Hero"
                className="relative pt-6 sm:pt-10 pb-16 sm:pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[82vh]"
            >
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-badge-bg/40 rounded-full blur-[100px] opacity-60 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E8F5EE]/60 rounded-full blur-[120px] opacity-60 pointer-events-none" aria-hidden="true" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1200px]">
                    <div className="flex flex-col items-center max-w-4xl mx-auto">
                        
                        {/* Eyebrow badge */}
                        <div className="consulting-hero-el inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#2D6A4F]/15 shadow-xs mb-4">
                            <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" aria-hidden="true" />
                            <span className="text-xs sm:text-sm font-bold text-[#2D6A4F] tracking-wide uppercase">
                                Strategic AI Advisory & Delivery
                            </span>
                        </div>

                        {/* Exact Approved H1 */}
                        <SplitTextReveal
                            as="h1"
                            className="consulting-hero-el font-serif text-3xl sm:text-5xl md:text-6xl text-[#2D6A4F] leading-[1.14] tracking-[-0.02em] mb-4 sm:mb-6"
                            type="chars" stagger={0.015} once={false} delay={0.15}
                        >
                            AI Consulting & Implementation Roadmap for Businesses
                        </SplitTextReveal>

                        {/* Approved Subheading */}
                        <p className="consulting-hero-el text-lg sm:text-xl md:text-2xl font-serif text-gray-800 font-semibold mb-6">
                            Turn AI ideas into a practical plan your team can act on.
                        </p>

                        {/* Approved Public Intro Copy */}
                        <div className="consulting-hero-el text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl space-y-4">
                            <p>
                                Your business does not need another generic AI demo. It needs clarity on which workflows are worth improving, what data and systems are ready, where human oversight matters, and how to move from an idea to a tested solution. Frostrek AI helps businesses assess AI opportunities, prioritize feasible use cases, and define a practical path to implementation.
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-gray-500">
                                For international SMEs and mid-sized businesses, we offer a practical path from opportunity assessment and AI strategy to custom development, CRM or ERP integration, deployment and support. Enterprise teams can engage Frostrek for scoped AI programs and specialist engineering delivery.
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 italic">
                                Whether you are exploring your first AI project or trying to connect an existing prototype with day-to-day operations, our consulting approach starts with the business problem—not a predetermined model or software platform.
                            </p>
                        </div>

                        {/* Primary & Secondary CTAs */}
                        <div className="consulting-hero-el flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center">
                            <Link
                                to="/contact"
                                aria-label="Discuss Your AI Project"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-base transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Discuss Your AI Project
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/solutions/ai-agents"
                                aria-label="Explore AI Agents"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-base transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-xs"
                            >
                                Explore AI Agents
                            </Link>
                        </div>

                        <p className="consulting-hero-el text-[11px] sm:text-xs text-gray-400 mt-4">
                            Workflow discovery • Feasibility scoring • Scoped roadmap • No predetermined stack
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
            </section>

            {/* ══════════════ SECTION 2: WHERE TO START ══════════════ */}
            <section aria-label="Where should your business start with AI" className="py-16 md:py-20 bg-white relative z-10 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Compass className="w-3.5 h-3.5" />
                            Discovery Framework
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-4">
                            Where should your business start with AI?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            AI can support customer enquiries, employee knowledge access, document-heavy operations, and repetitive work between software systems. But not every problem calls for an AI agent or a custom model. A useful first step is understanding how work moves today and what successful improvement would look like.
                        </p>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-center text-[#2D6A4F] uppercase tracking-wider mb-6">
                        We help teams ask the right questions before they commit to development:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {CORE_QUESTIONS.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`p-5 rounded-2xl border ${item.border} ${item.bg} transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between`}
                                >
                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-white/80 border border-gray-200/50 flex items-center justify-center mb-3 shadow-2xs">
                                            <IconComponent className={`w-5 h-5 ${item.color}`} />
                                        </div>
                                        <h3 className="font-serif text-base font-bold text-gray-900 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-2 text-[11px] font-semibold text-gray-400">
                                        <span>Key Assessment Point {idx + 1}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 3: 5-STEP CONSULTING PROCESS ══════════════ */}
            <section aria-label="What our AI consulting process covers" className="py-20 bg-brand-light-bg relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Workflow className="w-3.5 h-3.5" />
                            Delivery Framework
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#2D6A4F] font-bold mb-4">
                            What our AI consulting process covers
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                            A structured five-step progression from ambiguous business friction to a tested, deployable AI solution.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {CONSULTING_PROCESS.map((step, idx) => {
                            const theme = STAGE_THEMES[idx % STAGE_THEMES.length];
                            return (
                                <SpotlightCard
                                    key={step.step}
                                    className={`group relative overflow-hidden rounded-2xl md:rounded-3xl border bg-white p-6 sm:p-8 transition-all duration-300 ${theme.border} ${theme.hoverBorder} ${theme.shadow} hover:-translate-y-0.5`}
                                    spotlightColor={theme.spotlight}
                                >
                                    <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                                        <div className="flex items-center gap-3 md:flex-col md:items-center">
                                            <span className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl font-serif font-black text-xl md:text-2xl flex items-center justify-center border shadow-xs transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                {step.step}
                                            </span>
                                            <span className={`text-[11px] font-bold uppercase tracking-wider md:hidden px-2.5 py-0.5 rounded-full border ${theme.tagBg} ${theme.tagText} ${theme.tagBorder}`}>
                                                {step.tag}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className={`hidden md:inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border ${theme.tagBg} ${theme.tagText} ${theme.tagBorder}`}>
                                                {step.tag}
                                            </div>
                                            <h3 className={`font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300 ${theme.titleHover}`}>
                                                {step.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 4: ROADMAP DELIVERABLES ══════════════ */}
            <section aria-label="What you can receive from an AI roadmap engagement" className="py-20 bg-white relative z-10 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <FileCheck className="w-3.5 h-3.5" />
                            Agreed Scoping
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-4">
                            What you can receive from an AI roadmap engagement
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Deliverables are agreed during scoping rather than assumed to be identical for every company. Depending on the engagement, the working package may include:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ROADMAP_DELIVERABLES.map((d, i) => (
                            <div
                                key={i}
                                className="flex gap-4 p-5 rounded-2xl bg-[#F8FAF9] border border-[#E6EFE6] hover:border-[#2D6A4F]/30 transition-all"
                            >
                                <CheckCircle2 className="w-5 h-5 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-serif text-base font-bold text-gray-900 mb-1">
                                        {d.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        {d.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Disclaimers & Clarifications */}
                    <div className="mt-8 p-6 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-center max-w-3xl mx-auto">
                        <p className="text-xs sm:text-sm text-[#166534] font-medium leading-relaxed">
                            The roadmap is designed to help stakeholders make an informed implementation decision. It is not a guarantee of a particular ROI, delivery date, or model accuracy.
                        </p>
                    </div>

                    {/* End-to-end Section */}
                    <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-white via-[#F9FCFA] to-[#E8F5EE]/40 border border-[#2D6A4F]/20 text-center max-w-4xl mx-auto">
                        <h3 className="font-serif text-2xl font-bold text-[#2D6A4F] mb-3">
                            From consulting to a deployed AI solution
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Frostrek provides an end-to-end engagement when required: opportunity assessment, AI roadmap, solution architecture, custom development, testing and QA, deployment, and ongoing support. Work can also be scoped to a discovery or roadmap-only engagement. CRM and ERP integrations are available where the client’s systems, permissions and APIs allow them.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <Link
                                to="/solutions/custom-software-ai-integration"
                                className="text-xs sm:text-sm font-semibold text-[#2D6A4F] hover:underline inline-flex items-center gap-1.5"
                            >
                                Explore Custom Software & Integration <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 5: IMPLEMENTATION SCENARIOS ══════════════ */}
            <section aria-label="Common AI implementation scenarios" className="py-20 bg-brand-light-bg relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Layers className="w-3.5 h-3.5" />
                            Practical Applications
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#2D6A4F] font-bold mb-4">
                            Common AI implementation scenarios
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 italic max-w-xl mx-auto">
                            The examples below are illustrative possibilities, not claims about completed customer projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SCENARIOS.map((item, idx) => (
                            <SpotlightCard
                                key={idx}
                                className={`rounded-2xl md:rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${item.bg} ${item.border} hover:-translate-y-1 hover:shadow-lg`}
                                spotlightColor="rgba(45, 106, 79, 0.03)"
                            >
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-xl bg-white/80 border border-gray-200/50 flex items-center justify-center flex-shrink-0 shadow-xs">
                                        <img src={item.icon} alt={item.title} className="w-6 h-6 object-contain" width={24} height={24} loading="lazy" />
                                    </div>
                                    <div>
                                        <h3 className={`font-serif text-lg sm:text-xl font-bold mb-2 ${item.titleColor}`}>
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 6: IN-HOUSE PRODUCT SHOWCASE (FROSTY) ══════════════ */}
            <section aria-label="In-house AI product example: Frosty Agent" className="py-16 bg-white relative z-10 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="rounded-3xl p-8 sm:p-12 border border-[#BAE6FD] bg-gradient-to-br from-[#F0F9FF] via-white to-[#F0FDF4] shadow-sm relative overflow-hidden">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                            <div className="max-w-xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-3">
                                    <Bot className="w-3.5 h-3.5" />
                                    In-House Product Engineering
                                </div>
                                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                                    In-house AI product example: Frosty Agent
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                                    Frosty Agent is an AI-powered sales and customer engagement product developed by Frostrek AI. It is an example of our in-house AI product engineering and workflow-automation work. Learn more at{' '}
                                    <a
                                        href="https://frostyagent.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#0284C7] hover:underline inline-flex items-center gap-0.5"
                                    >
                                        frostyagent.com <ExternalLink className="w-3 h-3" />
                                    </a>. Features and integrations displayed in a public demo must match the current production release; e-commerce Phase 2 capabilities should remain marked as pilot or planned until approved.
                                </p>
                                <p className="text-[11px] sm:text-xs text-gray-500 italic border-l-2 border-[#0284C7] pl-3 py-1">
                                    This is an in-house product showcase—not an external client case study, independent proof of consulting outcomes, or a claim of guaranteed business results.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <Link
                                    to="/products/frosty-agent"
                                    className="px-6 py-3 rounded-full bg-white text-[#0284C7] border border-[#BAE6FD] font-semibold text-xs sm:text-sm hover:bg-[#F0F9FF] transition-all shadow-xs inline-flex items-center gap-2"
                                >
                                    View Frosty Overview <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 7: DESIGNED FOR BUSINESS & TECHNICAL TEAMS ══════════════ */}
            <section aria-label="Designed for business and technical teams" className="py-20 bg-brand-light-bg relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
                                <Cpu className="w-3.5 h-3.5" />
                                Stakeholder Alignment
                            </div>
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#2D6A4F] font-bold leading-tight">
                                Designed for business and technical teams
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Business leaders need to understand the likely operational value, dependencies and delivery decisions. Technical teams need clarity on data boundaries, APIs, security controls, test cases and ownership. A useful AI roadmap aligns both groups around the same scope.
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                Frostrek can work end-to-end, from discovery through development and deployment, or provide a roadmap for a client’s existing engineering team. Our approach is designed to help growing international businesses move from uncertainty to implementation without forcing every company toward the same AI stack.
                            </p>
                        </div>

                        {/* Measurement Framework Callout */}
                        <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#2D6A4F] flex items-center justify-center">
                                    <LineChart className="w-5 h-5" />
                                </div>
                                <h3 className="font-serif text-lg font-bold text-gray-900">
                                    How we measure whether a pilot is working
                                </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                Success measures should match the workflow. Examples include response quality against an approved rubric, time spent on a repeatable task, escalation accuracy, rework frequency, handoff completeness, or user adoption.
                            </p>
                            <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-3">
                                A baseline and evaluation method should be agreed before results are interpreted. Outcomes depend on the use case and implementation; no universal improvement percentage is promised.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 8: 9 FAQS ══════════════ */}
            <section
                id="ai-consulting-faq"
                aria-label="Frequently asked questions about AI consulting"
                className="py-20 bg-[#FAFCFB] relative z-10 border-y border-gray-100"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Direct Answers
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-3">
                            Frequently asked questions
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Clear, practical answers regarding scope, timelines, pricing, and system integration.
                        </p>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-md mx-auto mt-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search consulting questions..."
                                value={faqSearch}
                                onChange={(e) => setFaqSearch(e.target.value)}
                                className="w-full pl-11 pr-10 py-2.5 rounded-full border border-gray-200 bg-white text-gray-800 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#2D6A4F]/40 focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all shadow-2xs"
                            />
                            {faqSearch && (
                                <button
                                    onClick={() => setFaqSearch('')}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-medium"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <p className="text-gray-500 text-sm">No questions match "{faqSearch}". Try different keywords.</p>
                        </div>
                    ) : (
                        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                            {filteredFaqs.map((faq, idx) => {
                                const isOpen = openFaq === idx;
                                const originalIndex = FAQS.findIndex(f => f.q === faq.q);
                                const themeIndex = originalIndex >= 0 ? originalIndex : idx;
                                const theme = FAQ_THEMES[themeIndex % FAQ_THEMES.length];

                                return (
                                    <motion.div
                                        key={faq.q}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: (idx % 6) * 0.04 }}
                                        className={`rounded-2xl border transition-all duration-500 bg-white group ${theme.border} ${theme.hoverBorder} ${
                                            isOpen ? `${theme.activeBorder} ${theme.shadow}` : 'hover:shadow-lg'
                                        }`}
                                        itemScope
                                        itemProp="mainEntity"
                                        itemType="https://schema.org/Question"
                                    >
                                        <button
                                            id={`faq-consulting-${idx}`}
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full px-6 py-5 md:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-consulting-${idx}`}
                                        >
                                            <div className="flex items-center gap-4 md:gap-6">
                                                <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                    {String(themeIndex + 1).padStart(2, '0')}
                                                </span>
                                                <span
                                                    className={`font-serif text-[18px] sm:text-[20px] font-medium transition-colors duration-300 ${
                                                        isOpen ? theme.activeQuestionText : theme.questionText
                                                    }`}
                                                    itemProp="name"
                                                >
                                                    {faq.q}
                                                </span>
                                            </div>
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border ${
                                                    isOpen
                                                        ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180 shadow-md`
                                                        : `${theme.iconBgInactive} ${theme.iconTextInactive} ${theme.iconBorderInactive}`
                                                }`}
                                                aria-hidden="true"
                                            >
                                                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            </div>
                                        </button>

                                        <motion.div
                                            id={`faq-answer-consulting-${idx}`}
                                            initial={false}
                                            animate={{
                                                height: isOpen ? 'auto' : 0,
                                                opacity: isOpen ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                            aria-hidden={!isOpen}
                                            itemScope
                                            itemProp="acceptedAnswer"
                                            itemType="https://schema.org/Answer"
                                            role="region"
                                            aria-labelledby={`faq-consulting-${idx}`}
                                        >
                                            <div className="px-6 pb-6 pt-2 md:pl-[5.5rem] leading-relaxed text-[15px] text-gray-500 max-w-prose">
                                                <p itemProp="text">{faq.a}</p>
                                            </div>
                                        </motion.div>
                                        {!isOpen && (
                                            <div className="sr-only" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                                                <p itemProp="text">{faq.a}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ══════════════ SECTION 9: CLOSING CTA ══════════════ */}
            <section className="py-20 bg-brand-light-bg relative overflow-hidden font-sans">
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1200px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                                Next Step
                            </div>
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D6A4F] font-bold leading-tight mb-4">
                                Move from AI exploration to a clear next decision
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mb-8">
                                Tell us which business workflow you want to improve and how your team works today. Frostrek AI can help assess the opportunity, create a roadmap, develop the right solution and support deployment. The first step is a focused project discussion.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center">
                                <Link
                                    to="/contact"
                                    className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-base transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                                >
                                    Discuss Your AI Project
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    to="/solutions/ai-agents"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-base transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-xs"
                                >
                                    Explore AI Agents
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
