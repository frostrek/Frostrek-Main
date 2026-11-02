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
    Cpu
} from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── DATA: CORE EVALUATION SERVICES ──────────────────── */

const EVAL_SERVICES = [
    {
        title: 'RLHF & Pairwise Preference Alignment',
        description:
            'Side-by-side human evaluation of candidate model completions. Annotators score and rank pairs against versioned evaluation rubrics, generating high-signal chosen vs. rejected pairs for RLHF and DPO preference pipelines.',
        icon: '/icons/ai-green.webp',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'SFT Data & Golden Response Curation',
        description:
            'High-signal instruction dataset preparation and Golden Response curation. Domain specialists draft and refine verified ground-truth demonstrations that teach models accurate structure, style, and domain logic during Supervised Fine-Tuning (SFT).',
        icon: '/icons/machine-learning-green.webp',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Source Truth & Factual Verification',
        description:
            'Cross-verifying LLM assertions against authoritative enterprise documents, source databases, and external reference records. We establish Source Truth baselines to flag hallucinations, unsupported leaps, and subtle factual errors.',
        icon: '/icons/shield.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'Custom Evaluation Rubrics & Rating Anchors',
        description:
            'Designing calibrated, multidimensional evaluation rubrics with explicit rating anchors, boundary conditions, and tie-breaking heuristics. We align human reviewers on consistent criteria across tone, reasoning, safety, and helpfulness.',
        icon: '/icons/architecture-green.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'RAG Grounding & Source Truth Audits',
        description:
            'Factual precision auditing for Retrieval-Augmented Generation workflows. We benchmark retrieved contexts against Source Truth references and Golden Response standards to systematically prevent hallucination and retrieval drift.',
        icon: '/icons/data-analytics-green.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Reward Model Dataset Architecture',
        description:
            'Architectural scoping and rubric design for scalar preference scoring. We establish rating anchors, scalar feedback distributions, and calibration workflows for teams preparing datasets for RLHF reward-model training.',
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
            'Annotators and domain specialists execute initial blind evaluations against versioned client rubrics, grading completions across precision, safety, and constraint adherence.',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        badgeColor: 'text-[#166534]',
    },
    {
        step: '02',
        title: 'Calibration & Peer Verification',
        description:
            'A sample of multi-annotator tasks undergo cross-review. Inter-annotator agreement (Cohen’s kappa) is monitored daily to detect rubric drift and enforce calibrated scoring.',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        badgeColor: 'text-[#0284C7]',
    },
    {
        step: '03',
        title: 'QA Lead Sign-Off & Arbiter Review',
        description:
            'Senior evaluation leads resolve edge-case disagreements, compile diagnostic root-cause summaries, and sign off on delivered datasets in client-specified JSONL/Parquet formats.',
        iconBg: 'bg-[#F5F3FF]',
        iconBorder: 'border-[#DDD6FE]',
        badgeColor: 'text-[#6D28D9]',
    },
];

/* ──────────────────── DATA: EVALUATION MATRIX ──────────────────── */

const RUBRIC_DIMENSIONS = [
    {
        dimension: 'Source Truth & Factual Grounding',
        focus: 'Eliminating hallucination; ensuring statements align with verified enterprise Source Truth documents and Golden Response standards.',
        measurement: 'Binary Pass/Fail on assertions, Faithfulness % (0.0 to 1.0), Citation accuracy ratio.',
        target: 'Zero ungrounded assertions on retrieval tasks',
    },
    {
        dimension: 'Instruction & Constraint Adherence',
        focus: 'Verifying strict compliance with negative constraints, length caps, output schemas (JSON/XML), and tone mandates.',
        measurement: 'Constraint compliance checklist, formatting validation, regex parser checks.',
        target: '100% adherence to explicit prompt constraints',
    },
    {
        dimension: 'Safety & Policy Compliance',
        focus: 'Detecting adversarial exploits, jailbreak vulnerability, toxic language, and private data leakage.',
        measurement: 'Adversarial refusal rate, policy hazard tags, boundary violation severity (1–5 scale).',
        target: 'Safe refusals without excessive over-censorship',
    },
    {
        dimension: 'Reasoning Coherence & Logic',
        focus: 'Validating intermediate logical steps, mathematical proofs, deductive flow, and code syntax/execution.',
        measurement: 'Step-by-step logic soundness rubric, execution trace sandbox testing, edge-case audit.',
        target: 'Sound reasoning chain from premises to conclusion',
    },
    {
        dimension: 'Persona & Tone Consistency',
        focus: 'Maintaining brand voice, professional register, avoiding sycophancy, and preserving context over long conversations.',
        measurement: 'Multi-turn persona drift score, tone rating anchor comparisons, sycophancy rate.',
        target: 'Consistent brand persona across extended dialogue',
    },
];

/* ──────────────────── DATA: DOMAIN SPECIALIST BENCH ──────────────────── */

const DOMAIN_BENCH = [
    {
        domain: 'Software Engineering & Code QA',
        coverage: 'Python, TypeScript, SQL, Go, Rust, React, DevOps pipelines',
        details: 'Evaluators inspect code correctness, computational complexity, security vulnerabilities, API contracts, and adherence to modern syntax conventions.',
        icon: Code,
        bg: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        textColor: 'text-[#166534]',
    },
    {
        domain: 'STEM & Quantitative Reasoning',
        coverage: 'Calculus, linear algebra, statistics, physics, chemical formulas',
        details: 'Specialists verify mathematical formulas, numerical precision, symbolic logic, and data analysis steps to ensure models do not make subtle computational errors.',
        icon: Cpu,
        bg: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        textColor: 'text-[#0284C7]',
    },
    {
        domain: 'Multilingual & Localization',
        coverage: 'Cross-lingual nuance, idiomatic accuracy, cultural sensitivity',
        details: 'Native language speakers evaluate translated reasoning, dialect integrity, and contextual appropriateness across global enterprise deployments.',
        icon: Sparkles,
        bg: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        textColor: 'text-[#C2410C]',
    },
    {
        domain: 'Enterprise Operations & Governance',
        coverage: 'SOP compliance, customer support escalation, structured docs',
        details: 'Reviewers validate procedural workflows, policy documentation summaries, and enterprise support dialogue against company operational standards.',
        icon: FileCheck,
        bg: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        textColor: 'text-[#6D28D9]',
    },
];

/* ──────────────────── DATA: FAQS & THEMES ──────────────────── */

const FAQS = [
    {
        q: 'What is human-in-the-loop LLM evaluation, and why is automated benchmarking not enough?',
        a: 'Automated metrics like ROUGE or BLEU only measure superficial text overlap, while LLM-as-a-judge approaches can perpetuate self-preference biases and overlook subtle factual hallucinations. Human-in-the-loop (HITL) evaluation pairs qualified human domain reviewers with customized rubrics to assess nuance, logical correctness, safety boundaries, and customer-specific business guidelines that automated tools cannot reliably detect.',
    },
    {
        q: 'How does Frostrek calibrate annotators to maintain consistent scoring?',
        a: 'We implement daily calibration sessions, comprehensive rubric onboarding guides with concrete positive and negative examples, and blind multi-annotator cross-checks. We calculate inter-annotator agreement metrics such as Cohen’s kappa and Krippendorff’s alpha. Tasks with high disagreement are flagged for QA lead adjudication and rubric refinement.',
    },
    {
        q: 'What is the difference between SFT data and RLHF/DPO preference data?',
        a: 'Supervised Fine-Tuning (SFT) data consists of high-quality prompt-and-demonstration pairs, featuring verified Golden Responses that teach models how to structure answers. Reinforcement Learning from Human Feedback (RLHF) and Direct Preference Optimization (DPO) data consist of prompts paired with candidate outputs ranked against custom rubrics, where human reviewers generate preference pairs to align model behavior with human intent.',
    },
    {
        q: 'Can you work with our internal annotation platforms and data formats?',
        a: 'Yes. Our delivery teams work inside client-provided annotation environments (such as Label Studio, Prodigy, or custom proprietary web tools) or deliver structured batches via secure cloud buckets in JSONL, Parquet, or CSV formats adhering to your exact schema requirements.',
    },
    {
        q: 'How do you handle confidentiality and proprietary data security?',
        a: 'All evaluation workflows operate under strict confidentiality agreements and secure access controls. Reviewers work in access-managed environments with no external copy capabilities, and client data is never repurposed, trained upon, or shared outside the authorized project scope.',
    },
    {
        q: 'Do you offer reward-model training services?',
        a: 'We design the datasets, rubric anchors, and scalar ranking workflows required for reward modeling. While we help clients scope the feasibility and dataset architecture for reward models, full reward-model training is evaluated as a custom scoped engagement based on technical feasibility and compute parameters.',
    },
    {
        q: 'How do you test Retrieval-Augmented Generation (RAG) models for hallucination?',
        a: 'We evaluate RAG completions against three core dimensions: Retrieval Relevance (did the system fetch the right source context?), Answer Faithfulness against Source Truth (is every statement in the answer explicitly supported by the verified retrieved references?), and Answer Completeness (did the model answer the entire question without ungrounded extrapolation?).',
    },
    {
        q: 'What domains and subject matter areas can your evaluation teams cover?',
        a: 'Our reviewer network covers software engineering across major programming languages, STEM fields including mathematics and data science, multilingual translation and cultural localization, as well as enterprise operations and customer support workflows.',
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
            // Service Cards
            const serviceCards = buildRef.current?.querySelectorAll('.eval-card');
            if (serviceCards) {
                gsap.fromTo(
                    serviceCards,
                    { y: 50, opacity: 0, scale: 0.96 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: buildRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }

            // Pipeline Steps
            const steps = pipelineRef.current?.querySelectorAll('.pipeline-step');
            if (steps) {
                gsap.fromTo(
                    steps,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: pipelineRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }

            // Domain Cards
            const domains = domainRef.current?.querySelectorAll('.domain-card');
            if (domains) {
                gsap.fromTo(
                    domains,
                    { y: 40, opacity: 0, scale: 0.96 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
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
            'SFT Data Operations',
            'Golden Response Curation',
            'Source Truth Verification',
            'Custom Evaluation Rubrics',
            'AI Data QA',
            'Pairwise Preference Ranking',
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
        <div className="relative min-h-screen bg-white text-[#2D6A4F] font-body">
            <SEO
                title="Enterprise LLM Evaluation & AI Data QA | Frostrek AI"
                description="Rigorous human-in-the-loop LLM evaluation, RLHF preference ranking, and AI data QA. Custom rubrics and calibrated domain reviews for enterprise models."
                keywords="LLM evaluation services, RLHF preference data, direct preference optimization DPO, AI data QA, model red-teaming, RAG hallucination testing, human-in-the-loop evaluation, pairwise ranking"
                path="/solutions/llm-evaluation-rlhf"
                schema={[serviceSchema, breadcrumbSchema, faqSchema]}
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section className="relative pt-28 pb-16 md:pt-48 md:pb-28 overflow-hidden flex flex-col justify-center min-h-[90vh]">
                {/* Ambient blobs */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
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
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-xs sm:text-sm font-bold mb-6 shadow-xs"
                        >
                            <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                            ENTERPRISE EVALUATION & RLHF
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-6 tracking-tight max-w-5xl mx-auto leading-tight text-[#2D6A4F]">
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                Enterprise LLM Evaluation,
                            </SplitTextReveal>
                            <br />
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false} delay={0.15}>
                                RLHF Alignment & Data QA
                            </SplitTextReveal>
                        </h1>

                        {/* Answer-First SEO / AEO Paragraph */}
                        <p
                            className="text-base md:text-lg mb-8 max-w-3xl mx-auto leading-relaxed text-gray-600 font-medium"
                            itemProp="description"
                        >
                            Frostrek AI provides rigorous human-in-the-loop LLM evaluation, RLHF preference ranking, and SFT data operations. We curate verified Golden Responses, design versioned rubrics, and benchmark model assertions against enterprise Source Truth standards to eliminate hallucinations before production.
                        </p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                        >
                            <Link
                                to="/contact"
                                id="eval-hero-cta-primary"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-base sm:text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Discuss Your Evaluation Project
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/solutions/llm-model-training"
                                id="eval-hero-cta-secondary"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-base sm:text-lg transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-xs"
                            >
                                Explore Model Training
                            </Link>
                        </motion.div>

                        {/* Key Trust Micro-Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-8 pt-4 border-t border-gray-100/80 text-xs sm:text-sm text-gray-500"
                        >
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]">
                                <CheckCircle2 className="w-3.5 h-3.5" /> SFT & RLHF Alignment
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Golden Response Curation
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#C2410C] border border-[#FFEDD5]">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Source Truth & Custom Rubrics
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE]">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Triple-Tier QA Pipeline
                            </span>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
            </section>

            {/* ═══════ SECTION 2 — CORE EVALUATION SERVICES ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Layers className="w-3.5 h-3.5" />
                            Comprehensive Evaluation Suite
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Specialized Model Evaluation Services
                        </SplitTextReveal>
                        <div className="mt-4">
                            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
                                Structured evaluation methodologies engineered around SFT datasets, RLHF preference ranking, custom rubrics, and source-truth verification.
                            </p>
                        </div>
                    </div>

                    <div ref={buildRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {EVAL_SERVICES.map((item) => (
                            <SpotlightCard
                                key={item.title}
                                className={`eval-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-5 md:p-8 transition-all duration-300 ${item.bgColor} ${item.border} ${item.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={item.spotlight}
                            >
                                <div className="relative z-10 flex gap-4 md:gap-5 items-start">
                                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/60 ${item.iconBorder} transition-transform duration-300 group-hover:scale-105 shadow-xs`}>
                                        <img src={item.icon} alt={item.title} className="w-6 h-6 md:w-8 md:h-8 object-contain" loading="lazy" width={64} height={64} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-serif text-lg md:text-xl font-bold mb-2 ${item.headingColor}`}>{item.title}</h3>
                                        <p className="text-xs sm:text-sm leading-relaxed text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 3 — 3-TIER QA PIPELINE ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Shield className="w-3.5 h-3.5" />
                            Rigorous Governance
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            The 3-Tier Human QA Pipeline
                        </SplitTextReveal>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
                            Every evaluation dataset passes through a verifiable three-tier quality hierarchy to prevent rubric drift and eliminate reviewer bias.
                        </p>
                    </div>

                    <div ref={pipelineRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {QA_PIPELINE.map((p) => (
                            <div
                                key={p.step}
                                className={`pipeline-step relative bg-white border border-gray-200/80 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className={`w-12 h-12 rounded-xl ${p.iconBg} border ${p.iconBorder} flex items-center justify-center font-serif text-lg font-bold ${p.badgeColor}`}>
                                            {p.step}
                                        </div>
                                        <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Phase Gate</span>
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">{p.description}</p>
                                </div>
                                <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-medium text-[#2D6A4F]">
                                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                                    <span>Verified Audit Trail & Calibration</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4 — EVALUATION MATRIX & SCORING RUBRICS ═══════ */}
            <section className="py-16 lg:py-24 bg-[#FAFCFB] relative z-10 border-y border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <FileCheck className="w-3.5 h-3.5" />
                            Rubric Architecture
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-4">
                            Standardized Evaluation Rubric Dimensions
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Structured scoring criteria applied across conversational trajectories, code generation, and factual retrieval benchmarks.
                        </p>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-2xl md:rounded-3xl border border-gray-200 shadow-xs">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-700 text-xs sm:text-sm font-semibold uppercase tracking-wider">
                                    <th className="py-4 px-5 sm:px-6">Rubric Dimension</th>
                                    <th className="py-4 px-5 sm:px-6">Evaluation Focus</th>
                                    <th className="py-4 px-5 sm:px-6">Measurement Methodology</th>
                                    <th className="py-4 px-5 sm:px-6">Quality Target</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-gray-600">
                                {RUBRIC_DIMENSIONS.map((row) => (
                                    <tr key={row.dimension} className="hover:bg-[#F0FDF4]/30 transition-colors">
                                        <td className="py-4 px-5 sm:px-6 font-semibold text-gray-900 whitespace-nowrap">
                                            {row.dimension}
                                        </td>
                                        <td className="py-4 px-5 sm:px-6 leading-relaxed max-w-xs">{row.focus}</td>
                                        <td className="py-4 px-5 sm:px-6 leading-relaxed">{row.measurement}</td>
                                        <td className="py-4 px-5 sm:px-6">
                                            <span className="inline-block px-2.5 py-1 rounded-full bg-[#E8F5EE] text-[#166534] font-medium text-xs">
                                                {row.target}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — DOMAIN BENCH ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Cpu className="w-3.5 h-3.5" />
                            Specialist Coverage
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Calibrated Domain Reviewer Bench
                        </SplitTextReveal>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
                            Project-scoped reviewers with verified domain competencies across technical, numerical, linguistic, and operational disciplines.
                        </p>
                    </div>

                    <div ref={domainRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {DOMAIN_BENCH.map((bench) => {
                            const IconComponent = bench.icon;
                            return (
                                <div
                                    key={bench.domain}
                                    className={`domain-card rounded-2xl md:rounded-3xl border p-6 md:p-8 ${bench.bg} ${bench.border} transition-all duration-300 hover:shadow-md`}
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center flex-shrink-0 shadow-2xs">
                                            <IconComponent className={`w-6 h-6 ${bench.textColor}`} />
                                        </div>
                                        <div>
                                            <h3 className={`font-serif text-lg md:text-xl font-bold ${bench.textColor}`}>{bench.domain}</h3>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{bench.coverage}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{bench.details}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — SYNTHETIC BENCHMARK TASK F-024 ═══════ */}
            <section className="py-16 lg:py-24 bg-[#FAFCFB] relative z-10 border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFBEB] text-[#B45309] border border-[#FEF3C7] text-xs font-bold uppercase tracking-wider mb-3">
                            <FileCheck className="w-3.5 h-3.5" />
                            Illustrative Benchmark Walkthrough
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-3">
                            Synthetic Benchmark Task F-024
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                            Sample pairwise comparison demonstrating how annotators apply negative constraints, grounding rules, and rubric scoring.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 md:p-10 relative overflow-hidden">
                        {/* Synthetic watermark header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#166534]" />
                                <span className="text-xs sm:text-sm font-semibold text-gray-900">Task Type: RAG Grounding & Factual Synthesis</span>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200">
                                SYNTHETIC SAMPLE · DEMONSTRATION ONLY
                            </span>
                        </div>

                        {/* Input context */}
                        <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 mb-6 text-xs sm:text-sm text-gray-700 space-y-2 border border-gray-200/60 font-mono">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">Prompt & Context Constraints:</p>
                            <p className="text-gray-800">
                                "Summarize the quarterly SLA performance for Vendor Alpha using ONLY the provided audit log. Include uptime %, incident response time, and penalty status. Constraint: Do not speculate on root causes."
                            </p>
                        </div>

                        {/* Pairwise completions side-by-side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                            {/* Candidate A (Preferred) */}
                            <div className="rounded-2xl border-2 border-[#BBF7D0] bg-[#F0FDF4]/40 p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-bold text-xs uppercase tracking-wider text-[#166534]">Candidate A (Rank 1 · Golden Response)</span>
                                        <span className="flex items-center gap-1 text-xs font-bold text-[#166534] bg-white px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                                            <Check className="w-3.5 h-3.5 text-[#166534]" /> Grounded
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                                        "Vendor Alpha recorded a 99.82% uptime SLA and an average incident response time of 14 minutes in Q3. No penalty clauses were triggered under the master service contract."
                                    </p>
                                </div>
                                <div className="text-[11px] text-[#166534] font-medium pt-3 border-t border-[#BBF7D0]/60 space-y-1">
                                    <p>✓ All assertions directly supported by Source Truth audit log</p>
                                    <p>✓ Strict adherence to negative constraint (no speculation)</p>
                                </div>
                            </div>

                            {/* Candidate B (Rejected) */}
                            <div className="rounded-2xl border border-[#FECDD3] bg-[#FFF1F2]/40 p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="font-bold text-xs uppercase tracking-wider text-[#E11D48]">Candidate B (Rank 2 · Rejected)</span>
                                        <span className="flex items-center gap-1 text-xs font-bold text-[#E11D48] bg-white px-2 py-0.5 rounded-full border border-[#FECDD3]">
                                            <X className="w-3.5 h-3.5 text-[#E11D48]" /> Constraint Violation
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                                        "Vendor Alpha achieved 99.82% uptime with a 14-minute response time. While zero penalties occurred, the minor latency blips were likely caused by third-party fiber outages."
                                    </p>
                                </div>
                                <div className="text-[11px] text-[#E11D48] font-medium pt-3 border-t border-[#FECDD3]/60 space-y-1">
                                    <p>✗ Violated negative constraint by speculating on root causes</p>
                                    <p>✗ Hallucinated fiber outages not in provided Source Truth log</p>
                                </div>
                            </div>
                        </div>

                        {/* Annotator Rationale & Export Preview */}
                        <div className="rounded-xl bg-gray-50 border border-gray-200/80 p-4 text-xs text-gray-600 space-y-2">
                            <span className="font-bold text-gray-700 uppercase tracking-wider block text-[11px]">Annotator Decision Rationale:</span>
                            <p>
                                Candidate A matches the Golden Response standard and strictly adhered to Source Truth grounding constraints. Candidate B introduced ungrounded speculation regarding external fiber outages, violating the explicit prompt prohibition. Candidate A is ranked first with full confidence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 7 — FAQS ACCORDION ═══════ */}
            <section
                id="eval-faq"
                aria-label="Frequently asked questions about LLM evaluation and RLHF"
                className="py-16 lg:py-24 bg-white relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Direct Operational Answers
                        </div>
                        <h2 className="font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Clear, operational answers regarding evaluation rubrics, reviewer calibration, confidentiality, and data delivery formats.
                        </p>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-md mx-auto mt-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search evaluation questions..."
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
                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
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
                                        className={`rounded-2xl border transition-all duration-300 bg-white group ${theme.border} ${theme.hoverBorder} ${
                                            isOpen ? `${theme.activeBorder} ${theme.shadow}` : 'hover:shadow-md'
                                        }`}
                                        itemScope
                                        itemProp="mainEntity"
                                        itemType="https://schema.org/Question"
                                    >
                                        <button
                                            id={`faq-eval-${idx}`}
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full px-6 py-5 md:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-answer-eval-${idx}`}
                                        >
                                            <div className="flex items-center gap-4 md:gap-6">
                                                <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                    {String(themeIndex + 1).padStart(2, '0')}
                                                </span>
                                                <span
                                                    className={`font-serif text-[17px] sm:text-[19px] font-medium transition-colors duration-300 ${
                                                        isOpen ? theme.activeQuestionText : theme.questionText
                                                    }`}
                                                    itemProp="name"
                                                >
                                                    {faq.q}
                                                </span>
                                            </div>
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                                                    isOpen
                                                        ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180 shadow-xs`
                                                        : `${theme.iconBgInactive} ${theme.iconTextInactive} ${theme.iconBorderInactive}`
                                                }`}
                                                aria-hidden="true"
                                            >
                                                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            </div>
                                        </button>

                                        <motion.div
                                            id={`faq-answer-eval-${idx}`}
                                            initial={false}
                                            animate={{
                                                height: isOpen ? 'auto' : 0,
                                                opacity: isOpen ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                            aria-hidden={!isOpen}
                                            itemScope
                                            itemProp="acceptedAnswer"
                                            itemType="https://schema.org/Answer"
                                            role="region"
                                            aria-labelledby={`faq-eval-${idx}`}
                                        >
                                            <div className="px-6 pb-6 pt-2 md:pl-[5.5rem] leading-relaxed text-sm sm:text-base text-gray-600 max-w-prose">
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

            {/* ═══════ SECTION 8 — CLOSING SIGNATURE CTA ═══════ */}
            <section className="py-16 lg:py-24 relative overflow-hidden bg-white font-sans border-t border-gray-100">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E8F5EE]/70 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#F0F9FF]/60 rounded-full blur-[100px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                                type="chars"
                                stagger={0.02}
                                once={false}
                            >
                                Ready to Validate & Align
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-tight"
                                type="chars"
                                stagger={0.02}
                                once={false}
                                delay={0.2}
                            >
                                Your Enterprise AI Models?
                            </SplitTextReveal>
                        </div>
                        <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Partner with our specialized evaluation leads and annotator teams to establish repeatable, audit-ready benchmarks for your models.
                        </p>
                        <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                id="eval-closing-cta-discuss"
                                className="cta-btn group relative flex items-center justify-center gap-3 px-9 py-4 sm:py-5 bg-[#2D6A4F] text-white rounded-full text-base sm:text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 overflow-hidden w-full sm:w-auto"
                            >
                                Discuss Your Evaluation Project
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/solutions/managed-ai-workforce"
                                id="eval-closing-cta-workforce"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 sm:py-5 bg-white text-[#2D6A4F] rounded-full font-medium text-base sm:text-lg transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-xs"
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
