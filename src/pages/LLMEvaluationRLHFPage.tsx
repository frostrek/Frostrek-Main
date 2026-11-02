import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    CheckCircle2,
    Shield,
    Search,
    Plus,
    Minus,
    Layers,
    FileCheck,
    Code,
    Sparkles,
    Check,
    X,
    HelpCircle,
    Cpu,
    CheckCheck,
    AlertCircle
} from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── DATA: CORE EVALUATION SERVICES ──────────────────── */

const EVAL_SERVICES = [
    {
        title: 'Pairwise Preference & DPO',
        description:
            'Side-by-side human evaluation of model outputs. Annotators rank completions on accuracy, conciseness, and instruction adherence to build high-signal alignment datasets.',
        tags: ['DPO & RLHF', 'Side-by-Side', 'Preference Pairs'],
        icon: '/icons/ai-green.webp',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Multi-Turn Dialogue QA',
        description:
            'Deep audits of conversation memory, persona drift, and context retention over extended interactions. We identify where models contradict earlier statements or lose context.',
        tags: ['5–20+ Turns', 'Persona Drift', 'Context Recall'],
        icon: '/icons/machine-learning-green.webp',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Adversarial Red-Teaming',
        description:
            'Systematic stress-testing to catch jailbreak vulnerabilities, prompt injections, and toxic completions before enterprise models reach production.',
        tags: ['Jailbreak Defense', 'Prompt Injection', 'Safety Audits'],
        icon: '/icons/shield.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'Reasoning & Code Verification',
        description:
            'Ground-truth review of multi-step logic, math proofs, SQL, and code synthesis. Subject-matter evaluators test execution traces and unit boundaries.',
        tags: ['Code Syntax', 'Math & Logic', 'Execution Traces'],
        icon: '/icons/architecture-green.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'RAG Grounding & Hallucination',
        description:
            'Factual precision auditing for retrieval architectures. We verify source citation fidelity and eliminate unsupported statements against reference documents.',
        tags: ['Citation Veracity', 'Context Relevance', 'Fact Checking'],
        icon: '/icons/data-analytics-green.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Reward Model Dataset Design',
        description:
            'Architectural scoping and rubric design for scalar scoring. We structure rating anchors and calibration workflows for teams planning reward-model training.',
        tags: ['Rubric Design', 'Scalar Scoring', 'Feasibility Review'],
        icon: '/icons/innovation-green.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
];

/* ──────────────────── DATA: 3-TIER QA PIPELINE ──────────────────── */

const QA_PIPELINE = [
    {
        step: '01',
        title: 'Domain Specialist Review',
        description:
            'Qualified reviewers score completions against custom project rubrics for accuracy, safety, and constraints.',
        badge: 'Independent Review',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        badgeColor: 'text-[#166534]',
    },
    {
        step: '02',
        title: 'Calibration & Peer Checks',
        description:
            'Blind cross-reviews monitor inter-annotator agreement (Cohen’s kappa) daily to eliminate drift and enforce uniform scoring.',
        badge: 'Agreement Tracking',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        badgeColor: 'text-[#0284C7]',
    },
    {
        step: '03',
        title: 'QA Lead Sign-Off',
        description:
            'Senior evaluation arbiters adjudicate edge cases, resolve discrepancies, and export datasets in JSONL or Parquet.',
        badge: 'Verified Delivery',
        iconBg: 'bg-[#F5F3FF]',
        iconBorder: 'border-[#DDD6FE]',
        badgeColor: 'text-[#6D28D9]',
    },
];

/* ──────────────────── DATA: EVALUATION MATRIX ──────────────────── */

const RUBRIC_DIMENSIONS = [
    {
        dimension: 'Factual Grounding',
        focus: 'Eliminating hallucination; ensuring statements match source documents.',
        measurement: 'Binary Pass/Fail on assertions & Faithfulness ratio',
        target: 'Zero ungrounded claims',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
        dimension: 'Constraint Adherence',
        focus: 'Strict compliance with negative constraints, length caps, and JSON schemas.',
        measurement: 'Checklist compliance & schema validation',
        target: '100% rule compliance',
        color: 'bg-blue-50 text-blue-800 border-blue-200',
    },
    {
        dimension: 'Safety & Policy',
        focus: 'Detecting adversarial exploits, prompt injections, and data leakage.',
        measurement: 'Adversarial refusal rate & severity tags',
        target: 'Safe, non-sycophantic refusals',
        color: 'bg-rose-50 text-rose-800 border-rose-200',
    },
    {
        dimension: 'Reasoning Coherence',
        focus: 'Validating intermediate logical steps, math formulas, and code syntax.',
        measurement: 'Step-by-step logic soundness & sandbox execution',
        target: 'Sound reasoning traces',
        color: 'bg-purple-50 text-purple-800 border-purple-200',
    },
    {
        dimension: 'Persona Consistency',
        focus: 'Maintaining brand tone and avoiding sycophancy across long chats.',
        measurement: 'Multi-turn persona drift scoring',
        target: 'Consistent brand register',
        color: 'bg-amber-50 text-amber-800 border-amber-200',
    },
];

/* ──────────────────── DATA: DOMAIN SPECIALIST BENCH ──────────────────── */

const DOMAIN_BENCH = [
    {
        domain: 'Software Engineering & Code',
        skills: ['Python', 'TypeScript', 'SQL', 'Rust', 'Go', 'API Contracts'],
        details: 'Evaluators verify algorithmic logic, syntax validity, security edge cases, and unit test boundaries.',
        icon: Code,
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        textColor: 'text-[#166534]',
    },
    {
        domain: 'STEM & Quantitative Reasoning',
        skills: ['Calculus', 'Statistics', 'Linear Algebra', 'Data Analysis'],
        details: 'Specialists check mathematical precision, computational proofs, and statistical deductions.',
        icon: Cpu,
        bg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        textColor: 'text-[#0284C7]',
    },
    {
        domain: 'Multilingual & Localization',
        skills: ['Cross-lingual Nuance', 'Idiomatic Accuracy', 'Cultural Context'],
        details: 'Native speakers assess dialect integrity, natural phrasing, and localized tone across global deployments.',
        icon: Sparkles,
        bg: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        textColor: 'text-[#C2410C]',
    },
    {
        domain: 'Operations & Enterprise SOPs',
        skills: ['SOP Workflows', 'Customer Support', 'Policy Escalation'],
        details: 'Reviewers test process compliance, support summarization, and corporate documentation handling.',
        icon: FileCheck,
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        textColor: 'text-[#6D28D9]',
    },
];

/* ──────────────────── DATA: FAQS & THEMES ──────────────────── */

const FAQS = [
    {
        q: 'What is human-in-the-loop LLM evaluation, and why is it needed?',
        a: 'Automated metrics like ROUGE or LLM-as-a-judge often miss subtle factual errors and carry self-preference biases. Human evaluation pairs qualified domain reviewers with custom rubrics to catch nuanced errors, safety risks, and business rule violations reliably.',
    },
    {
        q: 'How does Frostrek calibrate reviewers for consistent scoring?',
        a: 'We use daily calibration sessions, concrete positive and negative rubric anchors, and blind cross-checks. Inter-annotator agreement metrics (such as Cohen’s kappa) are monitored continuously to detect and resolve rubric drift.',
    },
    {
        q: 'What is the difference between SFT data and RLHF/DPO preference data?',
        a: 'Supervised Fine-Tuning (SFT) data provides ideal single-turn demonstration answers. RLHF and Direct Preference Optimization (DPO) datasets consist of candidate pairs ranked by humans with rationales, aligning the model with human preferences.',
    },
    {
        q: 'Can you work with our internal tools and preferred data formats?',
        a: 'Yes. Our reviewers work directly in client platforms (like Label Studio or Prodigy) or deliver structured batches via secure cloud buckets in standard JSONL, Parquet, or CSV formats matching your schema.',
    },
    {
        q: 'How do you protect client data and confidentiality?',
        a: 'All evaluation workflows operate under strict confidentiality agreements within access-controlled environments. Reviewers cannot copy data externally, and your data is never used to train external models.',
    },
    {
        q: 'Do you offer reward-model training services?',
        a: 'We design the datasets, rubric anchors, and scalar ranking workflows needed for reward models. Full reward-model training is scoped on a project basis depending on compute feasibility and technical parameters.',
    },
    {
        q: 'How do you audit Retrieval-Augmented Generation (RAG) models?',
        a: 'We benchmark three main factors: Context Relevance (fetching correct documents), Answer Faithfulness (ensuring claims are backed by source text), and Completeness (answering the prompt fully without hallucinations).',
    },
    {
        q: 'What domains can your evaluation teams cover?',
        a: 'Our reviewer network covers software engineering across major languages, STEM and data science, multilingual translation and cultural localization, as well as enterprise operational workflows.',
    },
];

const FAQ_THEMES = [
    {
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/50',
        activeBorder: 'border-[#0EA5E9]',
        shadow: 'shadow-[0_10px_30px_rgba(14,165,233,0.08)]',
        badgeBg: 'bg-[#F0F9FF]',
        badgeText: 'text-[#0284C7]',
        badgeBorder: 'border-[#BAE6FD]',
        questionText: 'text-[#0369A1]',
        activeQuestionText: 'text-[#0284C7]',
        iconBgActive: 'bg-[#0EA5E9]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#F0F9FF]',
        iconTextInactive: 'text-[#0284C7]',
        iconBorderInactive: 'border-[#BAE6FD]',
    },
    {
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#22C55E]/50',
        activeBorder: 'border-[#22C55E]',
        shadow: 'shadow-[0_10px_30px_rgba(34,197,94,0.08)]',
        badgeBg: 'bg-[#F0FDF4]',
        badgeText: 'text-[#166534]',
        badgeBorder: 'border-[#BBF7D0]',
        questionText: 'text-[#15803D]',
        activeQuestionText: 'text-[#166534]',
        iconBgActive: 'bg-[#22C55E]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#F0FDF4]',
        iconTextInactive: 'text-[#166534]',
        iconBorderInactive: 'border-[#BBF7D0]',
    },
    {
        border: 'border-[#FECDD3]',
        hoverBorder: 'hover:border-[#E11D48]/50',
        activeBorder: 'border-[#E11D48]',
        shadow: 'shadow-[0_10px_30px_rgba(225,29,72,0.08)]',
        badgeBg: 'bg-[#FFF1F2]',
        badgeText: 'text-[#E11D48]',
        badgeBorder: 'border-[#FECDD3]',
        questionText: 'text-[#BE123C]',
        activeQuestionText: 'text-[#E11D48]',
        iconBgActive: 'bg-[#E11D48]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#FFF1F2]',
        iconTextInactive: 'text-[#E11D48]',
        iconBorderInactive: 'border-[#FECDD3]',
    },
    {
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#F97316]/50',
        activeBorder: 'border-[#F97316]',
        shadow: 'shadow-[0_10px_30px_rgba(249,115,22,0.08)]',
        badgeBg: 'bg-[#FFF7ED]',
        badgeText: 'text-[#C2410C]',
        badgeBorder: 'border-[#FFEDD5]',
        questionText: 'text-[#C2410C]',
        activeQuestionText: 'text-[#9A3412]',
        iconBgActive: 'bg-[#F97316]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#FFF7ED]',
        iconTextInactive: 'text-[#C2410C]',
        iconBorderInactive: 'border-[#FFEDD5]',
    },
    {
        border: 'border-[#DDD6FE]',
        hoverBorder: 'hover:border-[#7C3AED]/50',
        activeBorder: 'border-[#7C3AED]',
        shadow: 'shadow-[0_10px_30px_rgba(124,58,237,0.08)]',
        badgeBg: 'bg-[#F5F3FF]',
        badgeText: 'text-[#6D28D9]',
        badgeBorder: 'border-[#DDD6FE]',
        questionText: 'text-[#6D28D9]',
        activeQuestionText: 'text-[#5B21B6]',
        iconBgActive: 'bg-[#7C3AED]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#F5F3FF]',
        iconTextInactive: 'text-[#6D28D9]',
        iconBorderInactive: 'border-[#DDD6FE]',
    },
];

/* ──────────────────── COMPONENT ──────────────────── */

const LLMEvaluationRLHFPage = () => {
    const buildRef = useRef<HTMLDivElement>(null);
    const pipelineRef = useRef<HTMLDivElement>(null);
    const domainRef = useRef<HTMLDivElement>(null);
    const ctaButtonsRef = useRef<HTMLDivElement>(null);

    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [faqSearch, setFaqSearch] = useState('');

    const filteredFaqs = useMemo(() => {
        if (!faqSearch.trim()) return FAQS;
        const q = faqSearch.toLowerCase();
        return FAQS.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
    }, [faqSearch]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const serviceCards = buildRef.current?.querySelectorAll('.eval-card');
            if (serviceCards) {
                gsap.fromTo(
                    serviceCards,
                    { y: 40, opacity: 0, scale: 0.98 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: buildRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }

            const steps = pipelineRef.current?.querySelectorAll('.pipeline-step');
            if (steps) {
                gsap.fromTo(
                    steps,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.12,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: pipelineRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }

            const domains = domainRef.current?.querySelectorAll('.domain-card');
            if (domains) {
                gsap.fromTo(
                    domains,
                    { y: 30, opacity: 0, scale: 0.98 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: domainRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }
        });
        return () => ctx.revert();
    });

    const serviceSchema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Enterprise LLM Evaluation, RLHF & AI Data QA Services',
        description:
            'Rigorous human-in-the-loop LLM evaluation, RLHF preference ranking, adversarial red-teaming, and model data quality assurance for enterprise AI teams.',
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
            'LLM Evaluation',
            'RLHF Alignment',
            'AI Data QA',
            'Pairwise Preference Ranking',
            'Model Red-Teaming',
            'RAG Grounding Verification',
            'Direct Preference Optimization Data',
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
        <div className="relative min-h-screen bg-white text-[#2D6A4F] font-body selection:bg-[#E8F5EE] selection:text-[#2D6A4F]">
            <SEO
                title="Enterprise LLM Evaluation & AI Data QA | Frostrek AI"
                description="Rigorous human-in-the-loop LLM evaluation, RLHF preference ranking, and AI data QA. Custom rubrics and calibrated domain reviews for enterprise models."
                keywords="LLM evaluation services, RLHF preference data, direct preference optimization DPO, AI data QA, model red-teaming, RAG hallucination testing, human-in-the-loop evaluation, pairwise ranking"
                path="/solutions/llm-evaluation-rlhf"
                schema={[serviceSchema, breadcrumbSchema, faqSchema]}
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col justify-center min-h-[85vh]">
                {/* Ambient blobs */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8F5EE] rounded-full blur-[140px] translate-x-1/4 -translate-y-1/4 opacity-60" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F0F9FF] rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4 opacity-50" />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center">
                    <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
                        {/* Pill tag */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-xs sm:text-sm font-bold mb-6 shadow-2xs"
                        >
                            <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                            ENTERPRISE EVALUATION & RLHF
                        </motion.div>

                        {/* Clean H1 */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 tracking-tight max-w-4xl mx-auto leading-tight text-[#2D6A4F]">
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                Enterprise LLM Evaluation,
                            </SplitTextReveal>
                            <br />
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false} delay={0.15}>
                                RLHF Alignment & Data QA
                            </SplitTextReveal>
                        </h1>

                        {/* Crisp, Skimmable Subtext */}
                        <p
                            className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-gray-600 font-normal"
                            itemProp="description"
                        >
                            Human-in-the-loop LLM evaluation and RLHF preference ranking. We provide custom rubrics, calibrated domain reviewers, and zero-leakage workflows to ensure your models are accurate and safe.
                        </p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                        >
                            <Link
                                to="/contact"
                                id="eval-hero-cta-primary"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-base sm:text-lg transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Discuss Your Evaluation Project
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/solutions/llm-model-training"
                                id="eval-hero-cta-secondary"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-base sm:text-lg transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-2xs"
                            >
                                Explore Model Training
                            </Link>
                        </motion.div>

                        {/* Sleek Trust Chips */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10 text-xs text-gray-600 font-medium"
                        >
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/80 shadow-2xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> 3-Tier Human QA
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/80 shadow-2xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> Calibrated Domain Bench
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/80 shadow-2xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> Custom Grounding Rubrics
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200/80 shadow-2xs">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> Zero-Data Leakage
                            </span>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
            </section>

            {/* ═══════ SECTION 2 — CORE EVALUATION SERVICES ═══════ */}
            <section className="py-20 lg:py-28 bg-[#FAFCFB] relative z-10 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Layers className="w-3.5 h-3.5" />
                            Core Capabilities
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-3">
                            Specialized Model Evaluation Services
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                            Clear, structured evaluation workflows built to catch hallucinations, calibrate preference data, and protect enterprise deployments.
                        </p>
                    </div>

                    <div ref={buildRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {EVAL_SERVICES.map((item) => (
                            <SpotlightCard
                                key={item.title}
                                className={`eval-card group relative overflow-hidden rounded-2xl border p-6 md:p-7 transition-all duration-300 ${item.bgColor} ${item.border} ${item.hoverShadow} hover:-translate-y-1 flex flex-col justify-between`}
                                spotlightColor={item.spotlight}
                            >
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 bg-white/80 ${item.iconBorder} shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
                                            <img src={item.icon} alt={item.title} className="w-6 h-6 object-contain" loading="lazy" width={64} height={64} />
                                        </div>
                                        <h3 className={`font-serif text-lg font-bold ${item.headingColor}`}>{item.title}</h3>
                                    </div>
                                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600 mb-5">{item.description}</p>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5">
                                    {item.tags.map((tag) => (
                                        <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/70 text-gray-700 border border-black/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 3 — 3-TIER QA PIPELINE ═══════ */}
            <section className="py-20 lg:py-28 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Shield className="w-3.5 h-3.5" />
                            Multi-Level QA
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-3">
                            The 3-Tier Human QA Pipeline
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                            A structured, multi-layer review hierarchy to eliminate reviewer bias and prevent rubric drift.
                        </p>
                    </div>

                    <div ref={pipelineRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {QA_PIPELINE.map((p) => (
                            <div
                                key={p.step}
                                className="pipeline-step bg-[#FAFCFB] border border-gray-200/70 rounded-2xl p-6 sm:p-7 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-5">
                                        <span className={`w-10 h-10 rounded-xl ${p.iconBg} border ${p.iconBorder} flex items-center justify-center font-serif text-base font-bold ${p.badgeColor}`}>
                                            {p.step}
                                        </span>
                                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                                            {p.badge}
                                        </span>
                                    </div>
                                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">{p.description}</p>
                                </div>
                                <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs font-medium text-[#2D6A4F]">
                                    <CheckCheck className="w-4 h-4 text-[#2D6A4F]" />
                                    <span>Audited Delivery Step</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4 — EVALUATION MATRIX (Sleek Visual Cards) ═══════ */}
            <section className="py-20 lg:py-28 bg-[#FAFCFB] relative z-10 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <FileCheck className="w-3.5 h-3.5" />
                            Rubric Architecture
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-3">
                            Evaluation Rubric Dimensions
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                            Granular scoring dimensions applied across conversational trajectories, code generation, and factual retrieval.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {RUBRIC_DIMENSIONS.map((item) => (
                            <div
                                key={item.dimension}
                                className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-serif text-base font-bold text-gray-900">{item.dimension}</h3>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed mb-4">{item.focus}</p>
                                </div>
                                <div className="pt-3 border-t border-gray-100 space-y-2">
                                    <div className="text-[11px] text-gray-500 font-medium">
                                        <span className="text-gray-400">Measure:</span> {item.measurement}
                                    </div>
                                    <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full border ${item.color}`}>
                                        ✓ {item.target}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — DOMAIN BENCH (Clean Skill Pills) ═══════ */}
            <section className="py-20 lg:py-28 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center mb-14 max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Cpu className="w-3.5 h-3.5" />
                            Specialist Coverage
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-3">
                            Domain Reviewer Bench
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500">
                            Project-scoped reviewers with verified competencies across technical, numerical, and operational domains.
                        </p>
                    </div>

                    <div ref={domainRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {DOMAIN_BENCH.map((bench) => {
                            const IconComponent = bench.icon;
                            return (
                                <div
                                    key={bench.domain}
                                    className={`domain-card rounded-2xl border p-6 ${bench.bg} ${bench.border} transition-all duration-300 hover:shadow-xs flex flex-col justify-between`}
                                >
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center flex-shrink-0 shadow-2xs">
                                                <IconComponent className={`w-5 h-5 ${bench.textColor}`} />
                                            </div>
                                            <h3 className={`font-serif text-base font-bold ${bench.textColor}`}>{bench.domain}</h3>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed mb-4">{bench.details}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5">
                                        {bench.skills.map((skill) => (
                                            <span key={skill} className="text-[11px] font-medium px-2 py-0.5 rounded bg-white text-gray-700 border border-black/5">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — SYNTHETIC BENCHMARK TASK F-024 (Playground UI) ═══════ */}
            <section className="py-20 lg:py-28 bg-[#FAFCFB] relative z-10 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-12 max-w-xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FEF3C7] text-xs font-bold uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            Illustrative Example
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-2">
                            Synthetic Benchmark Task F-024
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Sample pairwise comparison demonstrating negative constraints and factual grounding checks.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-7">
                        {/* Header bar */}
                        <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                RAG Grounding & Constraint Check
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                                SYNTHETIC SAMPLE · DEMO ONLY
                            </span>
                        </div>

                        {/* Prompt context */}
                        <div className="bg-gray-50 rounded-xl p-3.5 mb-5 border border-gray-100 text-xs text-gray-700 font-mono">
                            <span className="font-sans font-bold text-gray-500 uppercase tracking-wider block text-[10px] mb-1">Prompt:</span>
                            "Summarize quarterly SLA performance for Vendor Alpha using only the audit log. Constraint: Do not speculate on root causes."
                        </div>

                        {/* Candidates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {/* Candidate A */}
                            <div className="rounded-xl border border-emerald-300 bg-emerald-50/30 p-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-emerald-800">Candidate A (Rank 1 · Preferred)</span>
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-emerald-700 border border-emerald-300 flex items-center gap-1">
                                            <Check className="w-3 h-3 text-emerald-600" /> Grounded
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-700 leading-relaxed mb-3">
                                        "Vendor Alpha recorded 99.82% uptime and an average incident response time of 14 minutes. Zero penalties were triggered."
                                    </p>
                                </div>
                                <span className="text-[10px] text-emerald-700 font-medium">✓ Fully backed by log; zero speculation</span>
                            </div>

                            {/* Candidate B */}
                            <div className="rounded-xl border border-rose-300 bg-rose-50/30 p-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-rose-800">Candidate B (Rank 2 · Rejected)</span>
                                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white text-rose-700 border border-rose-300 flex items-center gap-1">
                                            <X className="w-3 h-3 text-rose-600" /> Hallucination
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-700 leading-relaxed mb-3">
                                        "Vendor Alpha achieved 99.82% uptime. Minor latency blips were likely caused by third-party fiber outages."
                                    </p>
                                </div>
                                <span className="text-[10px] text-rose-700 font-medium">✗ Speculated on fiber outages not in the log</span>
                            </div>
                        </div>

                        {/* Annotator decision summary */}
                        <div className="bg-gray-50 rounded-lg p-3 text-[11px] text-gray-600 flex items-start gap-2 border border-gray-100">
                            <AlertCircle className="w-4 h-4 text-[#2D6A4F] flex-shrink-0 mt-0.5" />
                            <span>
                                <strong className="text-gray-700">Annotator Decision:</strong> Candidate A adhered strictly to negative constraints. Candidate B introduced ungrounded speculation, violating prompt rules. Candidate A ranked first.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 7 — FAQS ACCORDION ═══════ */}
            <section
                id="eval-faq"
                aria-label="Frequently asked questions about LLM evaluation and RLHF"
                className="py-20 lg:py-28 bg-white relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <div className="text-center max-w-xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Direct Answers
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Clear operational answers regarding rubrics, calibration, security, and data formats.
                        </p>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-sm mx-auto mt-6">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={faqSearch}
                                onChange={(e) => setFaqSearch(e.target.value)}
                                className="w-full pl-10 pr-9 py-2 rounded-full border border-gray-200 bg-white text-gray-800 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#2D6A4F]/40 focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all shadow-2xs"
                            />
                            {faqSearch && (
                                <button
                                    onClick={() => setFaqSearch('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-medium"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-10 bg-white rounded-xl border border-gray-100">
                            <p className="text-gray-500 text-sm">No questions match "{faqSearch}". Try different keywords.</p>
                        </div>
                    ) : (
                        <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                            {filteredFaqs.map((faq, idx) => {
                                const isOpen = openFaq === idx;
                                const originalIndex = FAQS.findIndex(f => f.q === faq.q);
                                const themeIndex = originalIndex >= 0 ? originalIndex : idx;
                                const theme = FAQ_THEMES[themeIndex % FAQ_THEMES.length];

                                return (
                                    <div
                                        key={faq.q}
                                        className={`rounded-xl border transition-all duration-300 bg-white ${theme.border} ${theme.hoverBorder} ${
                                            isOpen ? `${theme.activeBorder} ${theme.shadow}` : 'hover:shadow-xs'
                                        }`}
                                        itemScope
                                        itemProp="mainEntity"
                                        itemType="https://schema.org/Question"
                                    >
                                        <button
                                            id={`faq-eval-${idx}`}
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left focus:outline-none"
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-eval-${idx}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                    {String(themeIndex + 1).padStart(2, '0')}
                                                </span>
                                                <span
                                                    className={`font-serif text-[15px] sm:text-[17px] font-medium transition-colors ${
                                                        isOpen ? theme.activeQuestionText : theme.questionText
                                                    }`}
                                                    itemProp="name"
                                                >
                                                    {faq.q}
                                                </span>
                                            </div>
                                            <div
                                                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border ${
                                                    isOpen
                                                        ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180`
                                                        : `${theme.iconBgInactive} ${theme.iconTextInactive} ${theme.iconBorderInactive}`
                                                }`}
                                                aria-hidden="true"
                                            >
                                                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                            </div>
                                        </button>

                                        <motion.div
                                            id={`faq-answer-eval-${idx}`}
                                            initial={false}
                                            animate={{
                                                height: isOpen ? 'auto' : 0,
                                                opacity: isOpen ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                            aria-hidden={!isOpen}
                                            itemScope
                                            itemProp="acceptedAnswer"
                                            itemType="https://schema.org/Answer"
                                            role="region"
                                            aria-labelledby={`faq-eval-${idx}`}
                                        >
                                            <div className="px-5 pb-5 pt-1 md:pl-[4.25rem] leading-relaxed text-xs sm:text-sm text-gray-600 max-w-prose">
                                                <p itemProp="text">{faq.a}</p>
                                            </div>
                                        </motion.div>
                                        {!isOpen && (
                                            <div className="sr-only" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                                                <p itemProp="text">{faq.a}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════ SECTION 8 — CLOSING SIGNATURE CTA ═══════ */}
            <section className="py-20 lg:py-28 relative overflow-hidden bg-white font-sans border-t border-gray-100">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E8F5EE]/60 rounded-full blur-[120px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
                    <div className="bg-[#FAFCFB] p-8 sm:p-12 md:p-16 rounded-3xl border border-[#E6EFE6] shadow-xs">
                        <h2 className="font-serif text-3xl sm:text-4xl text-[#2D6A4F] font-bold mb-4">
                            Ready to Validate Your AI Models?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-xl mx-auto leading-relaxed font-normal">
                            Partner with our specialized evaluation leads and annotator teams to establish repeatable, audit-ready benchmarks.
                        </p>
                        <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                            <Link
                                to="/contact"
                                id="eval-closing-cta-discuss"
                                className="cta-btn group relative flex items-center justify-center gap-2.5 px-8 py-4 bg-[#2D6A4F] text-white rounded-full text-base transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 w-full sm:w-auto font-medium"
                            >
                                Discuss Your Evaluation Project
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/solutions/managed-ai-workforce"
                                id="eval-closing-cta-workforce"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-base transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-2xs"
                            >
                                View Managed Workforce
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LLMEvaluationRLHFPage;
