import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    CheckCircle2,
    Shield,
    Plus,
    Minus,
    Check,
    HelpCircle,
    Sliders,
    Sparkles,
    FileCheck2,
    Users,
    Layers,
    Lock
} from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── 02 · 4 GROUPED SERVICES ──────────────────── */

const CORE_SERVICES = [
    {
        title: 'Human LLM Evaluation',
        badge: '01 · EVALUATION',
        description:
            'Task-driven evaluation against explicit client rubrics across accuracy, groundedness, style, and domain constraints. Reviewers grade model outputs to pinpoint regression and hallucination patterns.',
        icon: Users,
        iconBg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        textColor: 'text-[#166534]',
        badgeBg: 'bg-[#E8F5EE]',
    },
    {
        title: 'RLHF Preference Data',
        badge: '02 · ALIGNMENT',
        description:
            'Side-by-side preference comparisons, ranked completions, and structured rationales for RLHF and DPO pipelines. Evaluators identify preferred outputs to align model behavior with business criteria.',
        icon: Sliders,
        iconBg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        textColor: 'text-[#0284C7]',
        badgeBg: 'bg-[#E0F2FE]',
    },
    {
        title: 'Annotation & Data QA',
        badge: '03 · DATA OPS',
        description:
            'Multi-stage data operations: instruction-response datasets, verified Golden Response curation, multi-turn dialogue review, and systematic auditing against client Source Truth records.',
        icon: FileCheck2,
        iconBg: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        textColor: 'text-[#C2410C]',
        badgeBg: 'bg-[#FFEDD5]',
    },
    {
        title: 'Specialist Evaluations',
        badge: '04 · DOMAIN BENCH',
        description:
            'Project-scoped technical review across coding, STEM, financial reasoning, and multilingual localization. Domain reviewers verify execution traces, mathematical logic, and nuanced terminology.',
        icon: Sparkles,
        iconBg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        textColor: 'text-[#6D28D9]',
        badgeBg: 'bg-[#EDE9FE]',
    },
];

/* ──────────────────── 03 · 5-STEP DELIVERY WORKFLOW ──────────────────── */

const WORKFLOW_STEPS = [
    {
        step: '01',
        title: 'Define & Sample',
        description: 'Confirm rubric criteria, select representative prompt and response sets, and define edge-case boundaries.',
    },
    {
        step: '02',
        title: 'Calibrate Evaluators',
        description: 'Train domain annotators, run blind calibration trials, and align scoring anchors to minimize inter-annotator drift.',
    },
    {
        step: '03',
        title: 'Primary Labeled Review',
        description: 'Qualified reviewers score and rank candidate outputs against approved rubrics and Source Truth standards.',
    },
    {
        step: '04',
        title: 'Review & Spot-Check',
        description: 'Senior QA leads arbitrate edge-case disagreements and track inter-annotator agreement (Cohen’s kappa).',
    },
    {
        step: '05',
        title: 'Delivery & Export',
        description: 'Clean data export with audit records, delivered in client-specified JSONL, Parquet, or CSV schemas.',
    },
];

const SCOPED_DELIVERABLES = [
    'Sample-calibrated evaluation scorecards',
    'Ranked preference pairs with rationales (JSONL/Parquet)',
    'QA review logs with inter-annotator agreement metrics',
    'Source-truth alignment and constraint confirmation',
];

/* ──────────────────── 05 · OPERATING PRINCIPLES ──────────────────── */

const OPERATING_PRINCIPLES = [
    {
        title: 'Clear Evaluation Rubrics',
        tag: 'RUBRIC INTEGRITY',
        description:
            'We test against explicit criteria and rating anchors, eliminating subjective reviewer drift and ambiguous guesswork.',
        icon: Layers,
    },
    {
        title: 'Accountable Data QA',
        tag: 'CALIBRATED OPS',
        description:
            'Every deliverable undergoes multi-stage verification with inter-annotator agreement tracking and senior lead sign-off.',
        icon: Shield,
    },
    {
        title: 'Agreed Access & Confidentiality',
        tag: 'ZERO LEAKAGE',
        description:
            'Work is conducted inside client-approved secure environments or delivered in verified, encrypted export formats with no retention.',
        icon: Lock,
    },
];

/* ──────────────────── 06 · 6 COMPACT BUYER FAQS ──────────────────── */

const FAQS = [
    {
        q: 'What does human LLM evaluation include?',
        a: 'Human LLM evaluation involves qualified domain specialists assessing model responses against custom rubrics. We test for factual accuracy, adherence to prompt constraints, tone, safety boundaries, and reasoning coherence—catching subtle hallucinations and logic errors that automated metrics miss.',
    },
    {
        q: 'How is RLHF preference labeling different from reward-model training?',
        a: 'RLHF preference labeling is the creation of calibrated comparison datasets where human evaluators score and rank candidate outputs (chosen vs. rejected) with structured rationales. Reward-model training is the computational ML process of training a separate reward model on that preference data. Frostrek provides the human-labeled preference datasets; direct reward-model training is evaluated as a separate scoped feasibility engagement.',
    },
    {
        q: 'Can Frostrek help with SFT data curation and Golden Responses?',
        a: 'Yes. We curate high-signal instruction datasets and draft verified Golden Response demonstrations. Domain specialists write and refine ideal reference answers that teach base models accurate structure, domain logic, and brand persona during Supervised Fine-Tuning (SFT).',
    },
    {
        q: 'How do you handle disagreement between reviewers?',
        a: 'We track inter-annotator agreement using statistical metrics such as Cohen’s kappa. Tasks with divergent scores undergo blind secondary review and are escalated to senior evaluation leads for rubric-anchored arbitration and root-cause logging.',
    },
    {
        q: 'Can you work with our annotation platform and data format?',
        a: 'Yes. Our teams operate directly inside client-provided tools (such as Label Studio, Prodigy, or custom proprietary internal environments) or deliver structured batches via secure cloud storage in JSONL, Parquet, or CSV formats matching your exact schema.',
    },
    {
        q: 'What should we share to request a proposal?',
        a: 'To scope an evaluation project, sharing your target use case, sample prompts or task types, evaluation rubric (or criteria you want tested), estimated volume, and deliverable format requirements helps our team provide an accurate turnaround and delivery plan.',
    },
];

/* ──────────────────── COMPONENT ──────────────────── */

const LLMEvaluationRLHFPage = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const workflowRef = useRef<HTMLDivElement>(null);
    const exampleRef = useRef<HTMLDivElement>(null);

    const [openFaq, setOpenFaq] = useState<number | null>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const cards = servicesRef.current?.querySelectorAll('.service-card');
            if (cards) {
                gsap.fromTo(
                    cards,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: servicesRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }
        });
        return () => ctx.revert();
    });

    const scrollToExample = () => {
        const el = document.getElementById('eval-example');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const serviceSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Enterprise LLM Evaluation, RLHF & AI Data QA Services',
        description:
            'Task-scoped human LLM evaluation, RLHF preference data, and data QA across custom enterprise workflows. Focused review teams and explicit rubrics.',
        provider: {
            '@type': 'Organization',
            name: 'Frostrek AI',
            url: 'https://www.frostrek.ai',
            logo: 'https://www.frostrek.ai/logonew.png',
            address: {
                '@type': 'PostalAddress',
                streetAddress: '4th Floor, Unit No. 455, JMD Empire, Sector 62',
                addressLocality: 'Gurugram',
                addressRegion: 'Haryana',
                postalCode: '122102',
                addressCountry: 'IN',
            },
            contactPoint: {
                '@type': 'ContactPoint',
                url: 'https://www.frostrek.ai/contact',
                contactType: 'sales',
            },
        },
        serviceType: [
            'Human LLM Evaluation',
            'RLHF Preference Data',
            'SFT Data Operations',
            'Golden Response Curation',
            'Source Truth Verification',
            'Custom Evaluation Rubrics',
            'AI Data QA',
        ],
        areaServed: ['IN', 'US', 'GB', 'AE', 'SG'],
        url: 'https://www.frostrek.ai/solutions/llm-evaluation-rlhf',
    });

    const breadcrumbSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.frostrek.ai/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Solutions',
                item: 'https://www.frostrek.ai/#solutions',
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: 'LLM Evaluation & RLHF',
                item: 'https://www.frostrek.ai/solutions/llm-evaluation-rlhf',
            },
        ],
    });

    const faqSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQS.map(faq => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
            },
        })),
    });

    return (
        <div className="relative min-h-screen bg-[#FDFCF9] text-[#2D6A4F] font-body selection:bg-[#E8F5EE]">
            <SEO
                title="Enterprise LLM Evaluation & AI Data QA | Frostrek AI"
                description="Task-scoped human LLM evaluation, RLHF preference data, and data QA across custom workflows. Focused review teams, explicit rubrics, and traceable review logs."
                keywords="LLM evaluation services, RLHF preference data, SFT data curation, Golden Response, Source Truth verification, AI data QA, model rubrics"
                path="/solutions/llm-evaluation-rlhf"
                schema={[serviceSchema, breadcrumbSchema, faqSchema]}
            />
            <CuteBackground />

            {/* ══════════════════════════════════════════════════════════════════
                01 · HERO: REFINED 2-COLUMN LAYOUT WITH VISUAL PREVIEW CARD
            ══════════════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        {/* Left column: Headings, 2-line intro, 1 primary CTA + anchor */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left">
                            {/* Eyebrow Pill */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs"
                            >
                                <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                                HUMAN LLM EVALUATION · PREFERENCE DATA · DATA QA
                            </motion.div>

                            {/* Headline */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2D6A4F] tracking-tight leading-[1.12] mb-5">
                                <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.015} once={false}>
                                    More useful feedback
                                </SplitTextReveal>
                                <br />
                                <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.015} once={false} delay={0.15}>
                                    for better AI evaluation.
                                </SplitTextReveal>
                            </h1>

                            {/* Crisp 2-line explanation */}
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mb-8 font-medium">
                                Frostrek delivers task-scoped human LLM evaluation, RLHF preference data, and data QA across custom workflows. Focused review teams, explicit rubrics, and traceable review logs to scale model alignment with real confidence.
                            </p>

                            {/* Primary CTA + Secondary Anchor */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
                                <Link
                                    to="/contact"
                                    id="eval-hero-cta-primary"
                                    className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#2D6A4F] text-white rounded-full font-medium text-base transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                                >
                                    Discuss Your Evaluation Project
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <button
                                    onClick={scrollToExample}
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#2D6A4F] rounded-full font-medium text-base transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-2xs"
                                >
                                    See an evaluation example
                                </button>
                            </div>

                            {/* Trust micro-pills */}
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-2">
                                <span className="inline-flex items-center gap-1.5 text-gray-600">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> Task-specific human review
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="inline-flex items-center gap-1.5 text-gray-600">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> Tracked rubric versions
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="inline-flex items-center gap-1.5 text-gray-600">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> No unverified claims
                                </span>
                            </div>
                        </div>

                        {/* Right column: Clean preview card "Human review, made clear." */}
                        <div className="lg:col-span-5 w-full">
                            <div className="bg-white rounded-3xl border border-gray-200/90 shadow-[0_15px_40px_rgba(45,106,79,0.06)] p-6 sm:p-7 relative overflow-hidden">
                                <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-100">
                                    <div>
                                        <span className="text-xs uppercase font-bold text-gray-400 tracking-wider block">Live Preview</span>
                                        <h3 className="font-serif text-lg font-bold text-gray-900">Human review, made clear.</h3>
                                    </div>
                                    <span className="px-2.5 py-1 rounded-full bg-[#E8F5EE] text-[#166534] text-[11px] font-bold border border-[#BBF7D0]">
                                        ILLUSTRATIVE REVIEW
                                    </span>
                                </div>

                                {/* Comparison Preview */}
                                <div className="grid grid-cols-2 gap-3 mb-5">
                                    <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3 text-xs">
                                        <div className="flex items-center justify-between font-bold text-rose-700 mb-1.5">
                                            <span>Response A</span>
                                            <span className="text-[10px] bg-rose-100 px-1.5 py-0.5 rounded text-rose-800">Needs correction</span>
                                        </div>
                                        <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-3">
                                            Contains ungrounded speculation on server fiber outages not supported by logs.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3 text-xs">
                                        <div className="flex items-center justify-between font-bold text-emerald-800 mb-1.5">
                                            <span>Response B</span>
                                            <span className="text-[10px] bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-800">Preferred</span>
                                        </div>
                                        <p className="text-gray-600 text-[11px] leading-relaxed line-clamp-3">
                                            Strictly grounded in Source Truth audit log with zero unsupported claims.
                                        </p>
                                    </div>
                                </div>

                                {/* Checklist items */}
                                <div className="space-y-2 text-xs border-t border-gray-100 pt-4 mb-4">
                                    <div className="flex items-center justify-between text-gray-600 py-1 border-b border-gray-50">
                                        <span className="font-medium text-gray-700">Source Truth alignment:</span>
                                        <span className="text-[#166534] font-semibold flex items-center gap-1">
                                            <Check className="w-3.5 h-3.5 text-[#166534]" /> Grounded
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600 py-1 border-b border-gray-50">
                                        <span className="font-medium text-gray-700">Constraint compliance:</span>
                                        <span className="text-[#166534] font-semibold flex items-center gap-1">
                                            <Check className="w-3.5 h-3.5 text-[#166534]" /> Maintained
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600 py-1">
                                        <span className="font-medium text-gray-700">Persona & style register:</span>
                                        <span className="text-[#166534] font-semibold flex items-center gap-1">
                                            <Check className="w-3.5 h-3.5 text-[#166534]" /> Consistent
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-gray-50 p-2.5 text-[11px] text-gray-500 leading-normal border border-gray-100">
                                    💡 Evaluators score against explicit rubric anchors, not subjective impressions.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                02 · SERVICES: 4 GROUPED FOCUSED CARDS + SCOPE NOTE
            ══════════════════════════════════════════════════════════════════ */}
            <section ref={servicesRef} className="py-16 md:py-20 bg-white border-y border-gray-100 relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-2">
                            <Layers className="w-3.5 h-3.5" />
                            Core Services
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-3">
                            Focused services for evaluation teams
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            We deliver task-driven human review, preference datasets, and multi-stage QA across custom enterprise workflows.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {CORE_SERVICES.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <SpotlightCard
                                    key={item.title}
                                    className={`service-card rounded-2xl border ${item.border} p-6 bg-white hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                                                <IconComponent className={`w-5 h-5 ${item.textColor}`} />
                                            </div>
                                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${item.badgeBg} ${item.textColor} tracking-wider`}>
                                                {item.badge}
                                            </span>
                                        </div>
                                        <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">{item.description}</p>
                                    </div>
                                    <div className="pt-3 border-t border-gray-100 text-[11px] font-semibold text-[#2D6A4F] flex items-center gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Rubric-anchored review
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>

                    {/* Factual Scope Note (No completed reward-model claims) */}
                    <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200/80 p-4 text-xs text-gray-600 text-center max-w-4xl mx-auto">
                        <span className="font-bold text-gray-800">Separate feasibility review:</span> Direct reward-model training is assessed as a separate scoped feasibility engagement based on compute parameters and dataset readiness; we do not advertise completed client training projects.
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                03 · DELIVERY WORKFLOW: 5 STEPS + SCOPED DELIVERABLES LIST
            ══════════════════════════════════════════════════════════════════ */}
            <section ref={workflowRef} className="py-16 md:py-24 bg-[#FAFCFB] relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                        {/* Left column: Narrative + Deliverables list */}
                        <div className="lg:col-span-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                                Delivery Approach
                            </div>
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-4 leading-tight">
                                A clear review process from task definition to handoff
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                                We organize the evaluation cycle around calibrated instructions, structured review gates, and traceable audit logs to give engineering teams high-confidence datasets.
                            </p>

                            <div className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-2xs">
                                <span className="text-xs font-bold text-gray-800 uppercase tracking-wider block mb-3">
                                    Typical Scoped Deliverables:
                                </span>
                                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                                    {SCOPED_DELIVERABLES.map((del) => (
                                        <li key={del} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                                            <span>{del}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right column: 5 Short Linear Steps */}
                        <div className="lg:col-span-7 space-y-3.5">
                            {WORKFLOW_STEPS.map((step) => (
                                <div
                                    key={step.step}
                                    className="bg-white rounded-xl border border-gray-200/80 p-4 sm:p-5 flex items-start gap-4 shadow-2xs hover:border-[#BBF7D0] transition-colors"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-[#E8F5EE] text-[#166534] font-serif font-bold text-sm flex items-center justify-center flex-shrink-0">
                                        {step.step}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-serif text-base font-bold text-gray-900 mb-1">{step.title}</h3>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                04 · EVALUATION EXAMPLE: SYNTHETIC TASK F-024 + QA RECORD CHECKLIST
            ══════════════════════════════════════════════════════════════════ */}
            <section id="eval-example" ref={exampleRef} className="py-16 md:py-24 bg-white border-y border-gray-100 relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FEF3C7] text-xs font-bold uppercase tracking-wider mb-2">
                            Illustrative Benchmark
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-3">
                            See how an evaluation review can work
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            A readable look at how evaluators score pairwise completions against negative constraints, followed by the exact QA record fields retained for traceability.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* Left Card: 1 Clean A/B Comparison */}
                        <div className="lg:col-span-7 bg-[#FAFCFB] rounded-2xl border border-gray-200 p-6 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200/80">
                                    <span className="font-serif text-sm font-bold text-gray-900">Comparing Two Model Responses</span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                                        SYNTHETIC TASK F-024 · DEMO ONLY
                                    </span>
                                </div>

                                {/* Prompt */}
                                <div className="bg-white rounded-lg border border-gray-200/70 p-3 mb-4 text-xs font-mono text-gray-700">
                                    <span className="font-bold text-gray-500 uppercase block font-sans text-[10px] mb-1">Prompt & Constraint:</span>
                                    "Summarize Q3 SLA performance using only provided audit log. Constraint: Do not speculate on root causes."
                                </div>

                                {/* Completions */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                    <div className="rounded-lg border border-rose-200 bg-white p-3 text-xs flex flex-col justify-between">
                                        <div>
                                            <span className="font-bold text-rose-700 block mb-1">Response A (Turned Down)</span>
                                            <p className="text-gray-600 leading-relaxed text-[11px]">
                                                "Vendor Alpha achieved 99.82% uptime. Latency blips were likely caused by third-party fiber outages."
                                            </p>
                                        </div>
                                        <span className="text-[10px] text-rose-600 mt-2 font-medium">✗ Hallucinated fiber outages</span>
                                    </div>

                                    <div className="rounded-lg border border-emerald-300 bg-emerald-50/40 p-3 text-xs flex flex-col justify-between">
                                        <div>
                                            <span className="font-bold text-emerald-800 block mb-1">Response B (Preferred)</span>
                                            <p className="text-gray-700 leading-relaxed text-[11px]">
                                                "Vendor Alpha recorded 99.82% uptime with 14 min average response time. Zero penalty clauses triggered."
                                            </p>
                                        </div>
                                        <span className="text-[10px] text-emerald-700 mt-2 font-medium">✓ Fully grounded; zero speculation</span>
                                    </div>
                                </div>
                            </div>

                            {/* Verdict */}
                            <div className="rounded-lg bg-emerald-100/60 border border-emerald-200 p-3 text-xs text-emerald-900">
                                <span className="font-bold block mb-0.5">Evaluator Verdict:</span>
                                Response B ranked first. Fully grounded in Source Truth audit log and adheres strictly to negative constraint without speculation.
                            </div>
                        </div>

                        {/* Right Card: Traceable Review Record Elements */}
                        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between">
                            <div>
                                <span className="text-xs uppercase font-bold text-gray-400 tracking-wider block mb-1">Quality Architecture</span>
                                <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">What a traceable review record contains</h3>

                                <div className="space-y-3 text-xs sm:text-sm">
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-gray-800">Rubric Version:</span>
                                            <p className="text-gray-500 text-xs">Grounding & Negative Constraint v2.1</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-gray-800">Review Status:</span>
                                            <p className="text-gray-500 text-xs">Primary review completed, second-check verified</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-gray-800">Inter-Annotator Agreement:</span>
                                            <p className="text-gray-500 text-xs">Cohen’s kappa tracked across multi-annotator sets</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-gray-800">Constraint Violation Flag:</span>
                                            <p className="text-gray-500 text-xs">Tagged on Response A (unsupported speculation)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-gray-800">Delivered Schema:</span>
                                            <p className="text-gray-500 text-xs">Validated JSONL export with rationale fields</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-400 mt-5 pt-3 border-t border-gray-100">
                                Verified client evidence is withheld until formal owner and data-rights clearance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                05 · WHY/HOW WE WORK: 3 FACTUAL PRINCIPLES + FEASIBILITY NOTE
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-[#FAFCFB] relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-2">
                            Operating Principles
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-3">
                            Designed around your task, not generic promises
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            We organize human review around clear rubrics, transparent QA, and strict data confidentiality.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
                        {OPERATING_PRINCIPLES.map((op) => {
                            const IconComponent = op.icon;
                            return (
                                <div key={op.title} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-2xs">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] flex items-center justify-center text-[#166534]">
                                            <IconComponent className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{op.tag}</span>
                                    </div>
                                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{op.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{op.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="rounded-xl bg-white border border-gray-200 p-4 text-xs text-gray-500 text-center max-w-3xl mx-auto">
                        <span className="font-semibold text-gray-700">Reward-model training note:</span> Proposed as a separate feasibility assessment based on compute parameters and data requirements. Direct model training is evaluated as a scoped offering, not past completed project experience.
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                06 · FAQS: 6 COMPACT BUYER FAQS (CLEAN ACCORDION)
            ══════════════════════════════════════════════════════════════════ */}
            <section id="eval-faq" className="py-16 md:py-24 bg-white border-t border-gray-100 relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-2">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Direct Answers
                        </div>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-3">
                            Frequently asked questions
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Clear, operational answers regarding evaluation scope, reviewer calibration, data formats, and project intake.
                        </p>
                    </div>

                    <div className="space-y-3.5" itemScope itemType="https://schema.org/FAQPage">
                        {FAQS.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            return (
                                <div
                                    key={faq.q}
                                    className={`rounded-xl border transition-all duration-200 bg-white ${
                                        isOpen ? 'border-[#2D6A4F]/40 shadow-xs' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    itemScope
                                    itemProp="mainEntity"
                                    itemType="https://schema.org/Question"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left focus:outline-none"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="font-serif text-base sm:text-lg font-medium text-gray-900" itemProp="name">
                                            {faq.q}
                                        </span>
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center border flex-shrink-0 transition-transform ${
                                                isOpen ? 'bg-[#E8F5EE] border-[#BBF7D0] text-[#166534]' : 'bg-gray-50 border-gray-200 text-gray-400'
                                            }`}
                                        >
                                            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div
                                            className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100"
                                            itemScope
                                            itemProp="acceptedAnswer"
                                            itemType="https://schema.org/Answer"
                                        >
                                            <p itemProp="text">{faq.a}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                07 · CLOSING CTA BANNER: EXACT COPY & SINGLE CONTACT CTA
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] text-white relative overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
                        Have a model or dataset that needs human review?
                    </h2>
                    <p className="text-sm sm:text-base text-emerald-100/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Discuss task scope, rubrics, and deliverable format with our team. We're ready to review your prompt sets and evaluation requirements.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            to="/contact"
                            id="eval-closing-cta-discuss"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#2D6A4F] rounded-full font-medium text-base hover:bg-emerald-50 transition-all shadow-md hover:-translate-y-0.5"
                        >
                            Discuss Your Evaluation Project
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                    <p className="text-xs text-emerald-200/70 mt-6">
                        Inquiries: <a href="mailto:contact@frostrek.com" className="underline hover:text-white">contact@frostrek.com</a>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default LLMEvaluationRLHFPage;
