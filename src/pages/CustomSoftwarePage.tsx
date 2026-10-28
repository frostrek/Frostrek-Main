import { useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    Code2,
    LayoutDashboard,
    Database,
    Cpu,
    Webhook,
    Search,
    Plus,
    Minus,
    HelpCircle,
    Bot,
    ExternalLink,
    Workflow,
    GitBranch,
    Boxes
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
            '@id': 'https://www.frostrek.ai/solutions/custom-software-ai-integration#service',
            name: 'Custom Software Development & AI Integration for Business',
            serviceType: [
                'Custom Web Applications & Portals',
                'Operational Dashboards & Reporting',
                'CRM & ERP Integration & Workflow Automation',
                'AI-Enabled Application Features',
                'API & Systems Integration'
            ],
            provider: {
                '@type': 'Organization',
                '@id': 'https://www.frostrek.ai/#organization',
                name: 'Frostrek AI',
            },
            areaServed: ['IN', 'US', 'GB', 'Global'],
            description: 'Build custom web apps, dashboards and CRM- or ERP-connected workflows with Frostrek AI. From development to AI integration, testing and deployment.',
            url: 'https://www.frostrek.ai/solutions/custom-software-ai-integration'
        }
    ]
});

/* ────────────────────────────────── DATA ────────────────────────────────── */

const WHAT_WE_BUILD = [
    {
        title: 'Custom web applications and business portals',
        desc: 'Develop applications for teams, partners or customers when off-the-shelf tools do not match your requirements. Examples include role-based portals, approval workflows, customer-facing interfaces and internal operations tools. Functionality, access rights and data boundaries are defined for each project.',
        icon: Code2,
        color: 'text-[#0284C7]',
        bg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        tag: 'Web & Portals'
    },
    {
        title: 'Operational dashboards and reporting tools',
        desc: 'Bring relevant data into a usable view so teams can monitor work, review exceptions and make informed decisions. We design dashboards around agreed data sources and users rather than presenting disconnected charts without an operational purpose.',
        icon: LayoutDashboard,
        color: 'text-[#166534]',
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        tag: 'Dashboards'
    },
    {
        title: 'CRM and ERP integration and workflow automation',
        desc: 'Connect approved CRM or ERP systems with custom applications, customer-facing tools or business workflows when suitable APIs, permissions and data access are available. Depending on the system, use cases may include enquiry routing, customer-record updates, sales-process visibility, inventory or order-data exchange, operational approvals, and human-reviewed follow-ups. Integration feasibility and supported platforms are assessed project by project.',
        icon: Database,
        color: 'text-[#C2410C]',
        bg: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        tag: 'CRM / ERP Integration'
    },
    {
        title: 'AI-enabled application features',
        desc: 'Add AI only where it solves a defined problem. Depending on the requirements, this might mean document search, contextual answers over approved information, structured content assistance, enquiry triage or guided internal workflows. AI responses, permissions, review requirements and fallback behavior should be tested before release.',
        icon: Cpu,
        color: 'text-[#6D28D9]',
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        tag: 'AI Features'
    },
    {
        title: 'API and system integration',
        desc: 'Build or adapt the application interfaces and data exchanges needed for an agreed workflow. We identify the source of truth, authentication method, error-handling approach and reconciliation rules so integrations remain understandable and maintainable.',
        icon: Webhook,
        color: 'text-[#B45309]',
        bg: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        tag: 'API Engineering'
    }
];

const DEVELOPMENT_PROCESS = [
    {
        step: '01',
        title: 'Requirements and workflow discovery',
        desc: 'Review the existing process with business owners and end users. Capture user roles, key screens, approval points, edge cases, available data and technical constraints. Prioritize the features that are essential to the first release.',
        tag: 'Stage 1 • Discovery'
    },
    {
        step: '02',
        title: 'Architecture, design and project scope',
        desc: 'Define the solution approach, integration boundaries, security considerations and acceptance criteria. Agree on scope, dependencies, milestones and change-control expectations before implementation.',
        tag: 'Stage 2 • Architecture'
    },
    {
        step: '03',
        title: 'Software and AI feature development',
        desc: 'Build the agreed application modules and interfaces. Where AI is involved, define its data sources, permissions, uncertainty handling and human-review requirements. Business rules and conventional automation remain valid choices where they are more reliable.',
        tag: 'Stage 3 • Engineering'
    },
    {
        step: '04',
        title: 'Integration, QA and user acceptance',
        desc: 'Test functions, permissions, data exchanges, failure handling and representative user workflows. Resolve critical issues against agreed acceptance criteria before release. Security testing depth and third-party validation depend on the project scope.',
        tag: 'Stage 4 • Quality Assurance'
    },
    {
        step: '05',
        title: 'Deployment and support handover',
        desc: 'Prepare release steps, operational ownership, documentation and monitoring responsibilities. Maintenance and enhancements are discussed as part of the commercial scope, not assumed to be universally included.',
        tag: 'Stage 5 • Deployment'
    }
];

const FAQS = [
    {
        q: 'What types of custom software does Frostrek build?',
        a: 'Project scope may include web applications, internal business portals, operational dashboards, customer-facing tools and CRM- or ERP-connected workflows. We recommend confirming the intended users and required functionality before selecting a platform or development approach.'
    },
    {
        q: 'Can you integrate AI into our existing application?',
        a: 'Yes, AI-enabled application features can be scoped and developed where the existing software, data access, security requirements and architecture permit. Some workflows may be better solved by conventional automation rather than AI.'
    },
    {
        q: 'Can you connect a new application to our CRM or ERP?',
        a: 'Yes. CRM and ERP integrations are available services, subject to the client’s system, approved APIs and permissions, data quality, security requirements, integration testing and agreed project scope. Specific platforms should be named only after delivery capability is verified.'
    },
    {
        q: 'Can you build dashboards for our business?',
        a: 'Yes. A custom dashboard can be designed around defined metrics, dependable source data, authorized access and the decisions the dashboard needs to support.'
    },
    {
        q: 'What is the usual project delivery process?',
        a: 'We typically define requirements and architecture, agree an implementation scope, develop features, test the workflows, complete acceptance steps and prepare deployment and support handover. The exact sequence depends on the project.'
    },
    {
        q: 'How do you address software and data security?',
        a: 'Security needs are mapped to the systems and information involved. They can include authentication, role-based permissions, logging, secure integration access, test controls and environment-specific deployment checks. No certification or security outcome is guaranteed in this draft.'
    },
    {
        q: 'Do you maintain software after it is launched?',
        a: 'Maintenance, bug fixing, monitoring and further improvements can be discussed as part of an agreed support scope. Terms and coverage depend on the engagement.'
    },
    {
        q: 'How much does custom software development cost?',
        a: 'Cost depends on features, integrations, data readiness, testing requirements, delivery stages and ongoing support needs. We scope requirements before estimating commercial terms.'
    },
    {
        q: 'How long will it take to build?',
        a: 'Timelines depend on project scope, technical dependencies, stakeholder availability, integration access and testing requirements. We agree milestones after requirements are understood rather than advertise a universal delivery promise.'
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

export default function CustomSoftwarePage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [faqSearch, setFaqSearch] = useState('');

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.software-hero-el',
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
                title="Custom Software Development & AI Integration | Frostrek AI"
                description="Build custom web apps, dashboards and CRM- or ERP-connected workflows with Frostrek AI. From development to AI integration, testing and deployment."
                path="/solutions/custom-software-ai-integration"
                keywords="custom software development, AI integration, business portals, operational dashboards, CRM ERP integration, API development, Frostrek AI"
                schema={[graphSchema, faqSchema]}
            />
            <CuteBackground />

            {/* Semantic metadata */}
            <meta itemProp="name" content="Custom Software Development & AI Integration for Business" />
            <meta itemProp="serviceType" content="Custom Software Engineering & AI Systems Integration" />
            <meta itemProp="url" content="https://www.frostrek.ai/solutions/custom-software-ai-integration" />

            {/* ══════════════ SECTION 1: HERO ══════════════ */}
            <section
                ref={heroRef}
                aria-label="Custom Software Hero"
                className="relative pt-6 sm:pt-10 pb-16 sm:pb-20 overflow-hidden flex flex-col items-center justify-center min-h-[82vh]"
            >
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-badge-bg/40 rounded-full blur-[100px] opacity-60 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E8F5EE]/60 rounded-full blur-[120px] opacity-60 pointer-events-none" aria-hidden="true" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1200px]">
                    <div className="flex flex-col items-center max-w-4xl mx-auto">
                        
                        {/* Eyebrow badge */}
                        <div className="software-hero-el inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#2D6A4F]/15 shadow-xs mb-4">
                            <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" aria-hidden="true" />
                            <span className="text-xs sm:text-sm font-bold text-[#2D6A4F] tracking-wide uppercase">
                                Engineering & AI Systems Integration
                            </span>
                        </div>

                        {/* Exact Approved H1 */}
                        <SplitTextReveal
                            as="h1"
                            className="software-hero-el font-serif text-3xl sm:text-5xl md:text-6xl text-[#2D6A4F] leading-[1.14] tracking-[-0.02em] mb-4 sm:mb-6"
                            type="chars" stagger={0.015} once={false} delay={0.15}
                        >
                            Custom Software Development & AI Integration for Business
                        </SplitTextReveal>

                        {/* Approved Subheading */}
                        <p className="software-hero-el text-lg sm:text-xl md:text-2xl font-serif text-gray-800 font-semibold mb-6">
                            Software built around your workflows—not the other way around.
                        </p>

                        {/* Approved Public Intro Copy */}
                        <div className="software-hero-el text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-8 max-w-3xl space-y-4">
                            <p>
                                When teams rely on disconnected tools, manual spreadsheet updates or workarounds between departments, important work becomes harder to track and scale. Frostrek AI designs and develops custom business software that fits your workflows, connects approved systems and makes room for AI where it adds practical value.
                            </p>
                            <p className="text-xs sm:text-sm md:text-base text-gray-500">
                                We handle both custom software development and AI integration—from internal dashboards and customer portals to CRM- and ERP-connected workflows and AI-enabled features. Our team can support requirements, design, development, quality assurance and deployment, with support arrangements agreed upfront.
                            </p>
                        </div>

                        {/* Primary & Secondary CTAs */}
                        <div className="software-hero-el flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center">
                            <Link
                                to="/contact"
                                aria-label="Discuss Your Project"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-base transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Discuss Your Project
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

                        <p className="software-hero-el text-[11px] sm:text-xs text-gray-400 mt-4">
                            Web apps • Dashboards • CRM/ERP workflows • Tested APIs • Staged delivery
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
            </section>

            {/* ══════════════ SECTION 2: WHAT WE CAN BUILD ══════════════ */}
            <section aria-label="What we can build" className="py-20 bg-white relative z-10 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Boxes className="w-3.5 h-3.5" />
                            Engineering Capabilities
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-4">
                            What we can build
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Bespoke software engineered to remove departmental friction, connect siloed tools, and embed practical intelligence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {WHAT_WE_BUILD.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <SpotlightCard
                                    key={idx}
                                    className={`rounded-2xl md:rounded-3xl border p-6 sm:p-7 transition-all duration-300 ${item.bg} ${item.border} hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between`}
                                    spotlightColor="rgba(45, 106, 79, 0.03)"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-white/90 border border-gray-200/50 flex items-center justify-center shadow-2xs">
                                                <IconComponent className={`w-6 h-6 ${item.color}`} />
                                            </div>
                                            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-white/70 px-2.5 py-0.5 rounded-full border border-black/5">
                                                {item.tag}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-lg font-bold text-gray-900 mb-2.5">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="mt-5 pt-3 border-t border-black/5 flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
                                        <span>Scoped to business specification</span>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 3: WHEN CUSTOM SOFTWARE MAKES SENSE ══════════════ */}
            <section aria-label="When custom software makes sense" className="py-20 bg-brand-light-bg relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#2D6A4F]/20 shadow-sm space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider">
                            <Workflow className="w-3.5 h-3.5" />
                            Decision Framework
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold">
                            When custom software makes sense
                        </h2>
                        <div className="text-sm sm:text-base text-gray-600 leading-relaxed space-y-4">
                            <p>
                                A custom build may be worth considering when an essential workflow cannot be handled safely or efficiently by existing tools, when teams are repeatedly exporting and re-entering data, or when employees and customers need a unified interface across several approved processes. Not every requirement needs bespoke engineering: where a standard product is sufficient, using it may be the better decision.
                            </p>
                            <p>
                                A useful project brief identifies the problem, users, success measures, essential integrations, constraints and what can wait until a later release.
                            </p>
                        </div>
                        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <span className="text-xs text-gray-500 italic">
                                Need help scoping feasibility and trade-offs first?
                            </span>
                            <Link
                                to="/solutions/ai-consulting"
                                className="text-xs sm:text-sm font-semibold text-[#2D6A4F] hover:underline inline-flex items-center gap-1.5"
                            >
                                Explore AI Consulting & Roadmap <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 4: 5-STAGE DEVELOPMENT PROCESS ══════════════ */}
            <section aria-label="Our development and delivery process" className="py-20 bg-white relative z-10 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <GitBranch className="w-3.5 h-3.5" />
                            Delivery Framework
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-4">
                            Our development and delivery process
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                            Clear gates, defined acceptance criteria, and predictable milestone handover.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {DEVELOPMENT_PROCESS.map((stage, idx) => {
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

            {/* ══════════════ SECTION 5: BUILT FOR BUSINESS & IN-HOUSE EXPERIENCE ══════════════ */}
            <section aria-label="Built for practical business requirements" className="py-20 bg-brand-light-bg relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-12">
                        {/* Practical Business Needs */}
                        <div className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                                    Target Market
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                                    Built for practical business requirements
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                                    Frostrek AI works with B2B startups, growing businesses and mid-market teams internationally, with enterprise engagements considered according to project requirements. We aim to connect business and engineering decisions so the delivered solution addresses a clear operational need.
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                    Whether your priority is a customer portal, a business dashboard or a CRM- or ERP-connected workflow, the first conversation should clarify the actual users, existing systems and business outcome you want the software to support.
                                </p>
                            </div>
                        </div>

                        {/* Frosty Agent In-House Product Showcase */}
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#F0F9FF] via-white to-[#F0FDF4] border border-[#BAE6FD] shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
                                    <Bot className="w-3.5 h-3.5" />
                                    In-House Showcase
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                                    Our own product engineering experience
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                                    Frosty Agent is an AI sales and customer-engagement product built by Frostrek AI. It is an example of our in-house product development work, rather than an external client case study. Visit{' '}
                                    <a
                                        href="https://frostyagent.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-semibold text-[#0284C7] hover:underline inline-flex items-center gap-0.5"
                                    >
                                        frostyagent.com <ExternalLink className="w-3 h-3" />
                                    </a>{' '}
                                    to explore the product.
                                </p>
                                <p className="text-[11px] sm:text-xs text-gray-500 italic border-l-2 border-[#0284C7] pl-3 py-1">
                                    Public descriptions must reflect the current verified release; e-commerce Phase 2 functionality remains a testing-stage capability until formally launched.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════ SECTION 6: 9 FAQS ══════════════ */}
            <section
                id="custom-software-faq"
                aria-label="Frequently asked questions about custom software development"
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
                            Clear, technical and commercial answers regarding our custom software and AI integration engagements.
                        </p>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-md mx-auto mt-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search software development questions..."
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
                                            id={`faq-software-${idx}`}
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full px-6 py-5 md:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-software-${idx}`}
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
                                            id={`faq-answer-software-${idx}`}
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
                                            aria-labelledby={`faq-software-${idx}`}
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
                                Get Started
                            </div>
                            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2D6A4F] font-bold leading-tight mb-4">
                                Start with the workflow you need to improve
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mb-8">
                                Tell us what your team is trying to build or connect, what systems you use today and which workflow is creating delays. Frostrek AI can discuss a practical project scope, software options and the right way to approach development and integration.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center">
                                <Link
                                    to="/contact"
                                    className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-base transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                                >
                                    Discuss Your Project
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
