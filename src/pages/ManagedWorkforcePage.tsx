import { useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Users,
    UserCheck,
    Briefcase,
    ShieldCheck,
    FileSpreadsheet,
    Scale,
    CheckCircle2,
    Search,
    Plus,
    Minus,
    HelpCircle,
    Layers,
    Binary,
    BookOpen,
    Globe2,
    Database,
    FileText,
    Workflow
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
            '@id': 'https://www.frostrek.ai/solutions/managed-ai-workforce#service',
            name: 'Managed AI Workforce & Data Operations',
            serviceType: [
                'Managed AI Data Teams',
                'Human Evaluation & Model Calibration',
                'Task Execution & Quality Assurance Operations',
                'Reviewer Onboarding & Delivery Management'
            ],
            provider: {
                '@type': 'Organization',
                '@id': 'https://www.frostrek.ai/#organization',
                name: 'Frostrek AI',
            },
            areaServed: ['IN', 'US', 'GB', 'Global'],
            description: 'Managed AI data teams with reviewer onboarding, task delivery, quality checks and reporting. Explore scoped workforce operations with Frostrek AI.',
            url: 'https://www.frostrek.ai/solutions/managed-ai-workforce'
        }
    ]
});

/* ────────────────────────────────── DATA ────────────────────────────────── */

const DELIVERY_SERVICES = [
    {
        title: 'Workforce planning and reviewer qualification',
        desc: 'Frostrek can recruit, qualify, onboard and train annotators, generalist evaluators, language reviewers, coding/STEM specialists, domain experts and quality leads to match task complexity and volume. Actual qualifications, availability and onboarding schedules are established for each engagement.',
        icon: UserCheck,
        color: 'text-[#0284C7]',
        bg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]'
    },
    {
        title: 'Team leadership and delivery coordination',
        desc: 'Frostrek manages the delivery workflow: staffing, team leadership, task allocation, daily coordination, client reporting, issue escalation and project management. Named leaders and responsibilities are documented during onboarding.',
        icon: Briefcase,
        color: 'text-[#166534]',
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]'
    },
    {
        title: 'Reviewer calibration and process documentation',
        desc: 'AI tasks may involve subjective judgments or incomplete examples. We can structure reviewer onboarding around client-approved rubrics, examples and documented decisions. When guidelines change, teams need version control, explanation of revised rules and a practical process for handling items already in progress.',
        icon: BookOpen,
        color: 'text-[#C2410C]',
        bg: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]'
    },
    {
        title: 'Multi-level quality checks and exception handling',
        desc: 'Our managed QA process can include quality leads, peer review, sampling, independent second-pass checks, issue logs, adjudication, corrective coaching and controlled rework. The client and Frostrek agree on the sampling method and acceptance criteria for each project; no blanket accuracy figure is promised.',
        icon: ShieldCheck,
        color: 'text-[#6D28D9]',
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]'
    },
    {
        title: 'Progress reporting and client communication',
        desc: 'A useful operations report should distinguish assigned, completed, accepted, rejected and reworked items, along with quality trends and unresolved blockers. Frostrek can define reporting and escalation routines with the client based on their tools, decision cycles and data-delivery requirements.',
        icon: FileSpreadsheet,
        color: 'text-[#B45309]',
        bg: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]'
    },
    {
        title: 'Scoped ramp-up and capacity adjustments',
        desc: 'When program volume changes, Frostrek can plan recruitment, training, specialist onboarding and QA coverage to scale the team. Headcount and start dates are confirmed against live availability and project scope; an applicant or recruitment pipeline is not described as active deployed staff.',
        icon: Scale,
        color: 'text-[#BE123C]',
        bg: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]'
    }
];

const WORKSTREAMS = [
    {
        title: 'LLM post-training and alignment',
        desc: 'LLM evaluation, RLHF preference collection, response ranking, supervised fine-tuning (SFT), reward model training and prompt/response generation.',
        icon: Binary,
        color: 'text-[#0284C7]',
        bg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]'
    },
    {
        title: 'Model safety and accuracy',
        desc: 'Response-quality and safety evaluation, AI red teaming, hallucination/factuality checks, and AI-agent or tool-use evaluation.',
        icon: ShieldCheck,
        color: 'text-[#166534]',
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]'
    },
    {
        title: 'Specialist evaluation',
        desc: 'Coding and STEM tasks, plus domain-expert evaluation with appropriately qualified reviewers.',
        icon: Layers,
        color: 'text-[#C2410C]',
        bg: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]'
    },
    {
        title: 'Multilingual and multimodal',
        desc: 'Language-based evaluation, image/audio/video data tasks, voice AI and speech-data annotation.',
        icon: Globe2,
        color: 'text-[#6D28D9]',
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]'
    },
    {
        title: 'Data preparation and benchmarking',
        desc: 'Data annotation and labeling, benchmark dataset creation, dataset curation, cleaning, validation and QA.',
        icon: Database,
        color: 'text-[#B45309]',
        bg: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]'
    },
    {
        title: 'Generalist AI data projects',
        desc: 'Web research and data collection, AI response writing/review, fact checking, classification, content-quality evaluation and routine annotation.',
        icon: FileText,
        color: 'text-[#BE123C]',
        bg: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]'
    }
];

const ENGAGEMENT_STEPS = [
    {
        step: '01',
        title: 'Define tasks, tools and decision owners',
        desc: 'We review sample inputs, desired outputs, accepted/rejected examples, workflow tooling, permitted access and escalation contacts. The scoping discussion separates what Frostrek owns from what the client retains, including rubric decisions, data access approval and acceptance sign-off.',
        tag: 'Stage 1 • Scope'
    },
    {
        step: '02',
        title: 'Establish the team and calibrate reviewers',
        desc: 'Match roles to domain requirements, onboard against representative tasks and check consistency before committing to sustained volume. Document unclear instructions and get approval for interpretation changes rather than relying on informal judgments.',
        tag: 'Stage 2 • Onboard'
    },
    {
        step: '03',
        title: 'Execute a controlled workstream',
        desc: 'Begin with an agreed initial batch or clearly defined recurring delivery cadence. Route new edge cases, technical blockers and policy questions to accountable owners. Where appropriate, separate production activity from quality decisions.',
        tag: 'Stage 3 • Execution'
    },
    {
        step: '04',
        title: 'Apply QA and course correction',
        desc: 'Measure performance using the client-approved sampling plan and acceptance criteria. Record error categories, investigate repeat issues, rework affected items and retrain reviewers or clarify guidelines as the program requires.',
        tag: 'Stage 4 • Quality Controls'
    },
    {
        step: '05',
        title: 'Report outcomes and improve the operating model',
        desc: 'Share agreed operational summaries, workload visibility, QA observations and unresolved exceptions. Adjust staffing mix, calibration material or workflow design based on evidence and approved change requests.',
        tag: 'Stage 5 • Governance'
    }
];

const ENGAGEMENT_MODELS = [
    {
        title: 'Dedicated managed team',
        desc: 'A defined group of reviewers, quality leads and delivery coordination roles assigned to an ongoing workstream, with reporting responsibilities and continuity arrangements documented in the agreement.',
        highlight: 'Ongoing workstreams'
    },
    {
        title: 'Project-based data operations',
        desc: 'A bounded annotation, evaluation or validation program with agreed deliverables, tool access, QA criteria and acceptance procedure. Suitable when volumes and deadlines can be scoped ahead of execution.',
        highlight: 'Fixed-scope programs'
    },
    {
        title: 'Quality-review support',
        desc: 'A focused QA or adjudication workstream alongside a client-operated production team, subject to access permissions, independence requirements and availability of domain-qualified reviewers.',
        highlight: 'Independent second-pass QA'
    }
];

const WHO_WORKS_WITH_US = [
    'AI labs and model-development teams seeking a delivery partner for recurring human evaluation or annotation workstreams.',
    'AI data companies that need a managed downstream delivery team with project ownership and QA accountability.',
    'Enterprise AI teams with changing annotation, review or data-validation workloads.',
    'Procurement, operations and vendor managers who need clear delivery responsibilities, documented checks and a defined reporting cadence.'
];

const FAQS = [
    {
        q: 'What is a managed AI workforce?',
        a: 'It is a coordinated delivery setup where qualified team members work within an agreed process and defined reporting structure. Instead of buying individual annotation hours, the customer scopes how work, quality checks and escalation are managed.'
    },
    {
        q: 'Does Frostrek provide annotators as well as team and quality leads?',
        a: 'A project can be structured with annotators or evaluators, a quality-review function and delivery coordination roles. The staffing structure and named responsibilities are confirmed according to the engagement.'
    },
    {
        q: 'How large a team can Frostrek provide?',
        a: 'Capacity depends on required expertise, availability, project timing and onboarding needs. We confirm actual staffed and deployable capacity before quoting a headcount or ramp-up commitment.'
    },
    {
        q: 'Can the team scale as volume changes?',
        a: 'Scaling can be planned, but it requires role qualification, access approvals, training and QA coverage. We discuss ramp requirements and a feasible schedule before committing.'
    },
    {
        q: 'How is quality measured?',
        a: 'The client and delivery team agree on the rubric, sample selection, acceptance criteria, error definitions, rework workflow and reporting metrics. This prevents misleading comparisons between unlike task types.'
    },
    {
        q: 'Can Frostrek work in our existing data platform?',
        a: 'We review tooling requirements, permissions, workflow fit and security restrictions during onboarding. Client-owned tools and output formats can be considered where the engagement supports them.'
    },
    {
        q: 'Do you cover LLM evaluation, RLHF and coding/STEM projects?',
        a: 'These are relevant workstream categories. Actual support depends on confirmed domain skills, evaluator qualification, required tools and an agreed task specification. Detailed evaluation services are described on the dedicated page.'
    },
    {
        q: 'Do you guarantee 24/7 availability or a fixed SLA?',
        a: 'Coverage hours and service levels depend on the agreed staffing plan and contract. They are not assumed for every managed-workforce engagement.'
    },
    {
        q: 'Does Frostrek handle generalist work as well as coding and STEM tasks?',
        a: 'Yes. Frostrek manages both generalist operations (research, classification, fact checking, content evaluation and annotation) and specialist AI data workstreams. Reviewer qualifications, QA plans and staffing are matched to each task.'
    },
    {
        q: 'How are project data and confidentiality handled?',
        a: 'We agree permitted systems, access controls, confidentiality requirements, handling rules, reviewer permissions and reporting before a program starts. Project-specific security and data-retention terms depend on the client agreement.'
    },
    {
        q: 'What information should we share to request a proposal?',
        a: 'Share the task type, representative examples, expected volume, domain expertise, tool environment, data-security rules, proposed schedule and quality criteria. This helps define an appropriate operating model.'
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

export default function ManagedWorkforcePage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [faqSearch, setFaqSearch] = useState('');

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.workforce-hero-el',
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
            {/* Note: excludeIsoCredentials strictly set to true as required by founder release gate */}
            <SEO
                title="Managed AI Workforce & Data Operations | Frostrek AI"
                description="Managed AI data teams with reviewer onboarding, task delivery, quality checks and reporting. Explore scoped workforce operations with Frostrek AI."
                path="/solutions/managed-ai-workforce"
                keywords="managed AI workforce, AI data operations, human evaluation, RLHF workforce, data annotation team, AI reviewer onboarding, Frostrek AI"
                schema={[graphSchema, faqSchema]}
                excludeIsoCredentials={true}
            />
            <CuteBackground />

            {/* Semantic metadata */}
            <meta itemProp="name" content="Managed AI Workforce & Data Operations" />
            <meta itemProp="serviceType" content="Managed AI Data Teams & Human Evaluation Operations" />
            <meta itemProp="url" content="https://www.frostrek.ai/solutions/managed-ai-workforce" />

            {/* ══════════════ SECTION 1: HERO ══════════════ */}
            <section
                ref={heroRef}
                aria-label="Managed AI Workforce Hero"
                className="relative pt-6 sm:pt-10 pb-16 sm:pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[82vh]"
            >
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-badge-bg/40 rounded-full blur-[100px] opacity-60 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E8F5EE]/60 rounded-full blur-[120px] opacity-60 pointer-events-none" aria-hidden="true" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1200px]">
                    <div className="flex flex-col items-center max-w-4xl mx-auto">
                        
                        {/* Eyebrow badge */}
                        <div className="workforce-hero-el inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#2D6A4F]/15 shadow-xs mb-4">
                            <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" aria-hidden="true" />
                            <span className="text-xs sm:text-sm font-bold text-[#2D6A4F] tracking-wide uppercase">
                                Operations & Delivery Governance
                            </span>
                        </div>

                        {/* Exact Approved H1 */}
                        <SplitTextReveal
                            as="h1"
                            className="workforce-hero-el font-serif text-3xl sm:text-5xl md:text-6xl text-[#2D6A4F] leading-[1.14] tracking-[-0.02em] mb-4 sm:mb-6"
                            type="chars" stagger={0.015} once={false} delay={0.15}
                        >
                            Managed AI Workforce & Data Operations
                        </SplitTextReveal>

                        {/* Approved Subheading */}
                        <p className="workforce-hero-el text-lg sm:text-xl md:text-2xl font-serif text-gray-800 font-semibold mb-6">
                            Managed AI data teams. Specialist and generalist workstreams. Accountable delivery.
                        </p>

                        {/* Approved Public Intro Copy */}
                        <div className="workforce-hero-el text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl space-y-4">
                            <p>
                                Scaling AI data and LLM projects takes more than allocating tasks. Buyers need the right specialists and generalist reviewers, consistent instructions, quality leads, transparent reporting and accountable operations. Frostrek AI provides managed teams for AI training data, human evaluation, model-quality programs and broader data operations.
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-gray-500">
                                Our managed delivery model can cover hiring, screening, training, calibration, task execution, quality review, escalation, reporting and day-to-day delivery management. Team size and ramp-up are scoped to the project; we do not advertise an unverified fixed bench or guaranteed headcount.
                            </p>
                        </div>

                        {/* Primary & Secondary Actions */}
                        <div className="workforce-hero-el flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center">
                            <Link
                                to="/contact"
                                aria-label="Discuss Your Managed AI Data Project"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-base transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Discuss Your Managed AI Data Project
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/solutions/llm-model-training"
                                aria-label="Explore LLM Model Training"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-base transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-xs"
                            >
                                Explore LLM Model Training
                            </Link>
                        </div>

                        <p className="workforce-hero-el text-[11px] sm:text-xs text-gray-400 mt-4">
                            Qualified annotators & leads • Client rubrics • Multi-level QA • Accountable reporting
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
            </section>

            {/* ══════════════ SECTION 2: MANAGED DELIVERY SERVICES ══════════════ */}
            <section aria-label="Managed delivery services" className="py-20 bg-white relative z-10 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Users className="w-3.5 h-3.5" />
                            Core Delivery Pillars
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-4">
                            Managed delivery services
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Structured human operations ensuring task consistency, quality compliance, and responsive escalation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {DELIVERY_SERVICES.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <SpotlightCard
                                    key={idx}
                                    className={`rounded-2xl md:rounded-3xl border p-6 sm:p-7 transition-all duration-300 ${item.bg} ${item.border} hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between`}
                                    spotlightColor="rgba(45, 106, 79, 0.03)"
                                >
                                    <div>
                                        <div className="w-12 h-12 rounded-xl bg-white/90 border border-gray-200/50 flex items-center justify-center mb-4 shadow-2xs">
                                            <IconComponent className={`w-6 h-6 ${item.color}`} />
                                        </div>
                                        <h3 className="font-serif text-lg font-bold text-gray-900 mb-2.5">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="mt-5 pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                                        <span>Delivery component 0{idx + 1}</span>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 3: WORKSTREAMS ══════════════ */}
            <section aria-label="Managed AI services and project workstreams" className="py-20 bg-brand-light-bg relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Workflow className="w-3.5 h-3.5" />
                            Workstream Domains
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#2D6A4F] font-bold mb-4">
                            Managed AI services and project workstreams
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                            Qualified staffing models across LLM alignment, specialist evaluation, and high-volume data operations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                        {WORKSTREAMS.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`p-6 rounded-2xl border ${item.border} ${item.bg} transition-all duration-300 hover:shadow-md flex flex-col justify-between`}
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
                                </div>
                            );
                        })}
                    </div>

                    {/* Disclaimer box */}
                    <div className="p-6 rounded-2xl bg-white border border-[#2D6A4F]/20 text-center max-w-3xl mx-auto shadow-xs">
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            These workstreams may require different skills, tooling and security controls. We qualify the team for the agreed task rather than assuming every role can do every task. For technical methods, explore our{' '}
                            <Link to="/solutions/llm-model-training" className="font-semibold text-[#2D6A4F] hover:underline">
                                LLM Model Training & Alignment page
                            </Link>; this page focuses on managed staffing, QA and delivery operations.
                        </p>
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 4: HOW IT WORKS ══════════════ */}
            <section aria-label="How a managed AI workforce engagement works" className="py-20 bg-white relative z-10 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Workflow className="w-3.5 h-3.5" />
                            Delivery Framework
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-4">
                            How a managed AI workforce engagement works
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                            A clear five-step governance process from initial task definition to iterative operational refinement.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {ENGAGEMENT_STEPS.map((stage, idx) => {
                            const theme = STAGE_THEMES[idx % STAGE_THEMES.length];
                            return (
                                <SpotlightCard
                                    key={stage.step}
                                    className={`group relative overflow-hidden rounded-2xl md:rounded-3xl border bg-white p-6 sm:p-8 transition-all duration-300 ${theme.border} ${theme.hoverBorder} ${theme.shadow} hover:-translate-y-0.5`}
                                    spotlightColor={theme.spotlight}
                                >
                                    <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                                        <div className="flex items-center gap-3 md:flex-col md:items-center">
                                            <span className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl font-serif font-black text-xl md:text-2xl flex items-center justify-center border shadow-xs transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                {stage.step}
                                            </span>
                                            <span className={`text-[11px] font-bold uppercase tracking-wider md:hidden px-2.5 py-0.5 rounded-full border ${theme.tagBg} ${theme.tagText} ${theme.tagBorder}`}>
                                                {stage.tag}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className={`hidden md:inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border ${theme.tagBg} ${theme.tagText} ${theme.tagBorder}`}>
                                                {stage.tag}
                                            </div>
                                            <h3 className={`font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-3 transition-colors duration-300 ${theme.titleHover}`}>
                                                {stage.title}
                                            </h3>
                                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                {stage.desc}
                                            </p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 5: ENGAGEMENT MODELS & CONTROLS ══════════════ */}
            <section aria-label="Engagement models that can be scoped" className="py-20 bg-brand-light-bg relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Scale className="w-3.5 h-3.5" />
                            Commercial Flexibility
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#2D6A4F] font-bold mb-4">
                            Engagement models that can be scoped
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                            Flexible operational structures matched to ongoing or project-based delivery needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {ENGAGEMENT_MODELS.map((model, idx) => (
                            <div
                                key={idx}
                                className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between"
                            >
                                <div>
                                    <span className="text-[11px] font-bold text-[#2D6A4F] uppercase tracking-wider bg-[#E8F5EE] px-2.5 py-0.5 rounded-full inline-block mb-3">
                                        {model.highlight}
                                    </span>
                                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">
                                        {model.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                        {model.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-center text-gray-500 italic mb-12">
                        Commercial terms, working hours, geography, team sizes and supported platforms are discussed case by case. These models describe engagement options, not guaranteed off-the-shelf packages.
                    </p>

                    {/* Quality and Data Handling Controls */}
                    <div className="p-8 sm:p-10 rounded-3xl bg-white border border-gray-200/90 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] text-[#2D6A4F] flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-gray-900">
                                Quality and data-handling controls
                            </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            Project access, confidentiality, approved tools, reviewer permissions, handling and retention requirements are agreed for each engagement. Quality checks, exception escalation and reporting are set against the client-approved workflow and acceptance criteria. No blanket certification, regulatory or outcome guarantee is implied.
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed pt-2 border-t border-gray-100">
                            Before delivery, agree how reviewer disagreements are resolved, who approves rubric changes, when quality exceptions escalate, and what evidence is retained for acceptance review. Project-specific controls remain essential; certification does not itself guarantee that a particular AI dataset or outcome meets any accuracy threshold.
                        </p>
                    </div>

                    {/* Who works with us */}
                    <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-white via-[#F9FCFA] to-[#E8F5EE]/40 border border-[#2D6A4F]/20">
                        <div className="text-center max-w-xl mx-auto mb-6">
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900">
                                Who works with us
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {WHO_WORKS_WITH_US.map((text, idx) => (
                                <div key={idx} className="flex gap-3 items-start p-4 rounded-xl bg-white/80 border border-gray-100">
                                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                                    <span className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                                        {text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 6: 11 FAQS ══════════════ */}
            <section
                id="managed-workforce-faq"
                aria-label="Frequently asked questions about managed AI workforce"
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
                            Clear, operational answers regarding staffing structure, scaling, tooling, and data governance.
                        </p>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-md mx-auto mt-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search workforce questions..."
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
                                            id={`faq-workforce-${idx}`}
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full px-6 py-5 md:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-workforce-${idx}`}
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
                                            id={`faq-answer-workforce-${idx}`}
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
                                            aria-labelledby={`faq-workforce-${idx}`}
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

            {/* ══════════════ SECTION 7: CLOSING CTA ══════════════ */}
            <section className="py-20 bg-brand-light-bg relative overflow-hidden font-sans">
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1200px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                                Request Proposal
                            </div>
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D6A4F] font-bold leading-tight mb-4">
                                Discuss your managed data delivery requirements
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mb-8">
                                Tell us the task type, representative examples, expected volume, domain requirements, systems, data-security controls, timing and quality criteria. We can scope the team, QA workflow and delivery governance for your AI data operations.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center">
                                <Link
                                    to="/contact"
                                    className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-base transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                                >
                                    Discuss Your Managed AI Data Project
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    to="/solutions/llm-model-training"
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-base transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-xs"
                                >
                                    Explore LLM Model Training
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
