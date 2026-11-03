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
    HelpCircle,
    Cpu,
    Lock,
    Workflow
} from 'lucide-react';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── 02 · SPECIALIZED MODEL EVALUATION SERVICES ──────────────────── */

const EVAL_SERVICES = [
    {
        title: 'RLHF & Pairwise Preference Alignment',
        badge: 'RLHF · PREFERENCE',
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
        badge: 'SFT · DEMONSTRATIONS',
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
        badge: 'GROUND TRUTH · AUDIT',
        description:
            'Cross-verifying LLM assertions in isolation against authoritative enterprise documents, source databases, and external reference records. We decompose outputs into atomic claims to flag hallucinations, contradicting statements, and subtle factual errors.',
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
        badge: 'RUBRIC ARCHITECTURE',
        description:
            'Designing calibrated, non-negative rubric frameworks with explicit rating anchors, safety guardrails, and completeness checklists. We align human reviewers on consistent criteria across reasoning soundness, tone, and guardrail adherence.',
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
        badge: 'RAG · GROUNDING',
        description:
            'Factual precision auditing for Retrieval-Augmented Generation workflows. We benchmark retrieved contexts against Source Truth references in isolation, ensuring surface fluency does not mask contradictory or ungrounded assertions.',
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
        badge: 'FEASIBILITY · SCOPED',
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

/* ──────────────────── 3-TIER HUMAN QA PIPELINE ──────────────────── */

const QA_PIPELINE = [
    {
        step: '01',
        title: 'Domain Specialist Review',
        description:
            'Annotators and domain specialists execute initial blind evaluations against non-negative rubrics, testing claim isolation, prompt completeness, and guardrail compliance.',
        cardBorder: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0284C7]',
        hoverShadow: 'hover:shadow-[0_12px_35px_rgba(14,165,233,0.08)]',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        badgeColor: 'text-[#0284C7]',
    },
    {
        step: '02',
        title: 'Calibration & Peer Verification',
        description:
            'A sample of multi-annotator tasks undergo cross-review. Inter-annotator agreement (Cohen’s kappa) is monitored daily to detect rubric drift, resolve contradicting ratings, and enforce calibrated scoring.',
        cardBorder: 'border-[#DDD6FE]',
        hoverBorder: 'hover:border-[#6D28D9]',
        hoverShadow: 'hover:shadow-[0_12px_35px_rgba(109,40,217,0.08)]',
        iconBg: 'bg-[#F5F3FF]',
        iconBorder: 'border-[#DDD6FE]',
        badgeColor: 'text-[#6D28D9]',
    },
    {
        step: '03',
        title: 'QA Lead Sign-Off & Arbiter Review',
        description:
            'Senior evaluation leads resolve edge-case disagreements, audit safety guardrails, compile diagnostic root-cause summaries, and sign off on delivered datasets in client-specified JSONL/Parquet formats.',
        cardBorder: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#166534]',
        hoverShadow: 'hover:shadow-[0_12px_35px_rgba(34,197,94,0.08)]',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        badgeColor: 'text-[#166534]',
    },
];

/* ──────────────────── 03 · 5-STEP DELIVERY WORKFLOW ──────────────────── */

const WORKFLOW_STEPS = [
    {
        step: '01',
        title: 'Define & Sample',
        description: 'Confirm non-negative rubrics, define prompt completeness criteria, and establish safety guardrails.',
    },
    {
        step: '02',
        title: 'Calibrate Evaluators',
        description: 'Train domain annotators on claim isolation, run blind calibration trials, and align scoring anchors to minimize inter-annotator drift.',
    },
    {
        step: '03',
        title: 'Primary Labeled Review',
        description: 'Qualified reviewers score candidate outputs against completeness, contradiction filters, and Source Truth standards.',
    },
    {
        step: '04',
        title: 'Peer Calibration & QA Arbiter',
        description: 'Senior QA leads arbitrate edge-case disagreements and track inter-annotator agreement metrics (Cohen’s kappa).',
    },
    {
        step: '05',
        title: 'Delivery & Audit Export',
        description: 'Clean data export with audit records, delivered in client-specified JSONL, Parquet, or CSV schemas.',
    },
];

const SCOPED_DELIVERABLES = [
    'Non-negative rubric scorecards with claim-isolation audits',
    'Ranked preference pairs with rationales (JSONL/Parquet)',
    'QA review logs with inter-annotator agreement metrics (Cohen’s kappa)',
    'Contradiction detection and safety guardrail audit confirmation',
];

/* ──────────────────── 05 · RUBRIC MATRIX DIMENSIONS ──────────────────── */

const RUBRIC_DIMENSIONS = [
    {
        dimension: 'Source Truth Grounding',
        focus: 'Validating assertions in isolation against enterprise documents to eliminate ungrounded hallucinations.',
        target: 'Claim Isolation & Truth',
        icon: Shield,
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        iconColor: 'text-[#0284C7]',
        headingColor: 'text-[#0284C7]',
        tagBg: 'bg-[#E0F2FE]',
        tagBorder: 'border-[#BAE6FD]',
        tagColor: 'text-[#0369A1]',
    },
    {
        dimension: 'Guardrails & Constraints',
        focus: 'Enforcing output guardrails, negative constraints, schema contracts (JSON/XML), and boundary limits.',
        target: 'Strict Guardrail Compliance',
        icon: CheckCircle2,
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        iconColor: 'text-[#166534]',
        headingColor: 'text-[#166534]',
        tagBg: 'bg-[#DCFCE7]',
        tagBorder: 'border-[#BBF7D0]',
        tagColor: 'text-[#15803D]',
    },
    {
        dimension: 'Safety & Policy Refusals',
        focus: 'Stress-testing input guardrails, jailbreak resilience, and ensuring models refuse harmful directives without over-refusal.',
        target: 'Safe Refusal Guardrails',
        icon: Lock,
        iconBg: 'bg-[#FFF1F2]',
        iconBorder: 'border-[#FECDD3]',
        iconColor: 'text-[#E11D48]',
        headingColor: 'text-[#E11D48]',
        tagBg: 'bg-[#FFE4E6]',
        tagBorder: 'border-[#FECDD3]',
        tagColor: 'text-[#BE123C]',
    },
    {
        dimension: 'Completeness & Logic',
        focus: 'Verifying full prompt completeness and non-contradicting logic — ensuring superficial fluency does not mask logical fallacies.',
        target: 'Full Completeness & Logic',
        icon: Cpu,
        iconBg: 'bg-[#F5F3FF]',
        iconBorder: 'border-[#DDD6FE]',
        iconColor: 'text-[#6D28D9]',
        headingColor: 'text-[#6D28D9]',
        tagBg: 'bg-[#EDE9FE]',
        tagBorder: 'border-[#DDD6FE]',
        tagColor: 'text-[#6D28D9]',
    },
    {
        dimension: 'Non-Negative Rubrics',
        focus: 'Applying non-negative rubric anchors across multi-turn dialogue to reward verified quality and prevent sycophancy.',
        target: 'Additive Quality Anchors',
        icon: Sparkles,
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FED7AA]',
        iconColor: 'text-[#C2410C]',
        headingColor: 'text-[#C2410C]',
        tagBg: 'bg-[#FFEDD5]',
        tagBorder: 'border-[#FED7AA]',
        tagColor: 'text-[#C2410C]',
    },
];

/* ──────────────────── 06 · DOMAIN SPECIALIST BENCH ──────────────────── */

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

/* ──────────────────── OPERATING PRINCIPLES ──────────────────── */

const OPERATING_PRINCIPLES = [
    {
        title: 'Non-Negative Rubric Frameworks',
        tag: 'RUBRIC INTEGRITY',
        description:
            'We test against explicit positive criteria, prompt completeness, and calibrated anchors, eliminating subjective reviewer drift and punitive scoring bias.',
        icon: Layers,
    },
    {
        title: 'Accountable Data QA & Isolation',
        tag: 'CALIBRATED OPS',
        description:
            'Every deliverable undergoes claim-by-claim isolation audits, contradiction detection, Cohen’s kappa tracking, and senior lead sign-off.',
        icon: Shield,
    },
    {
        title: 'Enterprise Safety Guardrails',
        tag: 'ZERO LEAKAGE',
        description:
            'Work is conducted inside access-managed secure environments with comprehensive PII guardrails and verified, encrypted export formats.',
        icon: Lock,
    },
];

/* ──────────────────── 07 · FAQS & THEMES ──────────────────── */

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
    const heroRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const pipelineRef = useRef<HTMLDivElement>(null);
    const workflowRef = useRef<HTMLDivElement>(null);
    const exampleRef = useRef<HTMLDivElement>(null);
    const domainRef = useRef<HTMLDivElement>(null);

    const [openFaq, setOpenFaq] = useState<number | null>(0);
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
            const cards = servicesRef.current?.querySelectorAll('.eval-card');
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

            const pipelineSteps = pipelineRef.current?.querySelectorAll('.pipeline-step');
            if (pipelineSteps) {
                gsap.fromTo(
                    pipelineSteps,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: pipelineRef.current,
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
            'Frostrek AI provides high-precision human-in-the-loop LLM evaluation, RLHF preference ranking, and SFT data operations. Verified Golden Responses, versioned rubrics, and Source Truth verification.',
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
        <div className="relative min-h-screen bg-[#ffffff] text-[#2D6A4F] font-body selection:bg-[#E8F5EE]">
            <SEO
                title="Enterprise LLM Evaluation & AI Data QA | Frostrek AI"
                description="Task-scoped human LLM evaluation, RLHF preference data, and data QA across custom workflows. Focused review teams, explicit rubrics, and traceable review logs."
                keywords="LLM evaluation services, RLHF preference data, SFT data curation, Golden Response, Source Truth verification, AI data QA, model rubrics"
                path="/solutions/llm-evaluation-rlhf"
                schema={[serviceSchema, breadcrumbSchema, faqSchema]}
            />

            {/* ══════════════════════════════════════════════════════════════════
                01 · HERO: CLEAN 2-COLUMN STRUCTURE + RICH CONTENT + LIVE CARD
            ══════════════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#ffffff]">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                        {/* Left column: Rich content + Headings + CTA */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left">
                            {/* Eyebrow Pill */}
                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs"
                            >
                                <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                                ENTERPRISE EVALUATION · SFT & RLHF · SOURCE TRUTH
                            </motion.div>

                            {/* Headline */}
                            <SplitTextReveal
                                as="h1"
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#2D6A4F] tracking-tight leading-[1.14] mb-5"
                                type="chars"
                                stagger={0.015}
                                once={false}
                            >
                                Enterprise LLM Evaluation, RLHF Alignment & Data QA
                            </SplitTextReveal>

                            {/* Rich, authoritative answer-first explanation */}
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mb-8 font-medium">
                                Frostrek AI provides rigorous human-in-the-loop LLM evaluation, RLHF preference ranking, and SFT data operations. We curate verified Golden Responses, design versioned rubrics, and benchmark model assertions against enterprise Source Truth standards to eliminate hallucinations before production.
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
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> SFT & RLHF Alignment
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="inline-flex items-center gap-1.5 text-gray-600">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> Golden Response Curation
                                </span>
                                <span className="text-gray-300">•</span>
                                <span className="inline-flex items-center gap-1.5 text-gray-600">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" /> Source Truth & Custom Rubrics
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
                                        <span className="font-medium text-gray-700">Source Truth &amp; Isolation:</span>
                                        <span className="text-[#166534] font-semibold flex items-center gap-1">
                                            <Check className="w-3.5 h-3.5 text-[#166534]" /> Grounded
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600 py-1 border-b border-gray-50">
                                        <span className="font-medium text-gray-700">Guardrails &amp; Completeness:</span>
                                        <span className="text-[#166534] font-semibold flex items-center gap-1">
                                            <Check className="w-3.5 h-3.5 text-[#166534]" /> Maintained
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-gray-600 py-1">
                                        <span className="font-medium text-gray-700">Non-negative rubric rating:</span>
                                        <span className="text-[#166534] font-semibold flex items-center gap-1">
                                            <Check className="w-3.5 h-3.5 text-[#166534]" /> Passed
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
                02 · SPECIALIZED EVALUATION SERVICES (CLEAN, FOCUSED GRID)
            ══════════════════════════════════════════════════════════════════ */}
            <section ref={servicesRef} className="py-16 md:py-24 bg-white border-y border-gray-100 relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Layers className="w-3.5 h-3.5" />
                            Specialized Services
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                            type="chars"
                            stagger={0.015}
                            once={false}
                        >
                            Specialized Model Evaluation Services
                        </SplitTextReveal>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mt-4 leading-relaxed">
                            Structured evaluation methodologies engineered around SFT datasets, RLHF preference ranking, custom rubrics, and Source Truth verification.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {EVAL_SERVICES.map((item) => (
                            <SpotlightCard
                                key={item.title}
                                className={`eval-card group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${item.bgColor} ${item.border} ${item.hoverShadow} hover:-translate-y-1 flex flex-col justify-between`}
                                spotlightColor={item.spotlight}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 bg-white/70 ${item.iconBorder} shadow-2xs`}>
                                            <img src={item.icon} alt={item.title} className="w-6 h-6 object-contain" loading="lazy" width={48} height={48} />
                                        </div>
                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 border border-gray-200 text-gray-600 tracking-wider">
                                            {item.badge}
                                        </span>
                                    </div>
                                    <h3 className={`font-serif text-lg font-bold mb-2 ${item.headingColor}`}>{item.title}</h3>
                                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600">{item.description}</p>
                                </div>
                                <div className="pt-4 mt-4 border-t border-gray-200/50 flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F]" />
                                    <span>Calibrated rubric scoring</span>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>

                    {/* Factual Scope Note */}
                    <div className="mt-8 rounded-xl bg-gray-50 border border-gray-200 p-4 text-xs text-gray-600 text-center max-w-4xl mx-auto">
                        <span className="font-bold text-gray-800">Separate feasibility review:</span> Direct reward-model training is assessed as a separate scoped feasibility engagement based on compute parameters and dataset readiness; we do not advertise completed client training projects.
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                03 · THE 3-TIER HUMAN QA PIPELINE (RIGOROUS GOVERNANCE)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white relative z-10 overflow-hidden border-t border-gray-100">
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
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mt-4 leading-relaxed">
                            Every evaluation dataset passes through a verifiable three-tier quality hierarchy to prevent rubric drift and eliminate reviewer bias.
                        </p>
                    </div>

                    <div ref={pipelineRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {QA_PIPELINE.map((p) => (
                            <div
                                key={p.step}
                                className={`pipeline-step relative bg-white border ${p.cardBorder} ${p.hoverBorder} rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xs ${p.hoverShadow} hover:shadow-md transition-all duration-300 flex flex-col`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${p.iconBg} border ${p.iconBorder} flex items-center justify-center font-serif text-lg font-bold ${p.badgeColor} mb-6`}>
                                    {p.step}
                                </div>
                                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{p.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                03 · DELIVERY WORKFLOW: 5 STEPS + SCOPED DELIVERABLES LIST
            ══════════════════════════════════════════════════════════════════ */}
            <section ref={workflowRef} className="py-16 md:py-24 bg-[#ffffff] border-t border-gray-100 relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                        {/* Left column: Overview + Deliverables */}
                        <div className="lg:col-span-5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                                <Workflow className="w-3.5 h-3.5" />
                                Delivery Approach
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl text-[#2D6A4F] font-bold mb-4 leading-[1.2] tracking-tight">
                                A clear review process from task definition to handoff
                            </h2>
                            <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6">
                                We organize the evaluation cycle around calibrated instructions, structured review gates, and traceable audit logs to give engineering teams high-confidence datasets.
                            </p>

                            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-2xs">
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
                                    className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex items-start gap-4 shadow-2xs hover:border-[#BBF7D0] transition-colors"
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
                04 · EVALUATION EXAMPLE: SYNTHETIC TASK F-024
            ══════════════════════════════════════════════════════════════════ */}
            <section id="eval-example" ref={exampleRef} className="py-16 md:py-24 bg-white border-y border-gray-100 relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <FileCheck className="w-3.5 h-3.5" />
                            Illustrative Benchmark
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                            type="chars"
                            stagger={0.015}
                            once={false}
                        >
                            See how an evaluation review can work
                        </SplitTextReveal>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mt-4 leading-relaxed">
                            A clear look at how annotators score pairwise completions against negative constraints, followed by the exact QA record fields retained for traceability.
                        </p>
                    </div>

                    {/* Single Clean Centered Benchmark Card */}
                    <div className="bg-[#ffffff] rounded-3xl border border-gray-200/90 p-6 sm:p-8 md:p-10 shadow-xs">
                        <div className="flex items-center justify-between pb-3 mb-6 border-b border-gray-200/80">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                                <span>Task Type: RAG Grounding &amp; Factual Synthesis</span>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                                SYNTHETIC TASK F-024 · DEMO ONLY
                            </span>
                        </div>

                        {/* Prompt */}
                        <div className="bg-gray-50/70 rounded-2xl border border-gray-200/70 p-4 sm:p-5 mb-6 text-xs sm:text-sm font-mono text-gray-700">
                            <span className="font-bold text-gray-500 uppercase block font-sans text-[10px] sm:text-xs mb-1.5 tracking-wider">Prompt &amp; Constraints:</span>
                            "Summarize Q3 SLA performance using only provided audit log. Negative constraint &amp; guardrail: Do not speculate on root causes. Completeness: Address uptime %, response latency, and penalty status."
                        </div>

                        {/* Completions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                            {/* Response A */}
                            <div className="rounded-2xl border border-rose-200 bg-rose-50/30 p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-rose-200/60">
                                        <span className="font-bold text-xs uppercase tracking-wider text-rose-700">
                                            Response A (Turned Down)
                                        </span>
                                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100/80 text-rose-700 border border-rose-200">
                                            ✕ Guardrail &amp; Completeness Failure
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                                        "Vendor Alpha achieved 99.82% uptime. Latency blips were likely caused by third-party fiber outages."
                                    </p>
                                </div>
                                <div className="space-y-1.5 pt-3 border-t border-rose-200/50 text-xs text-rose-700 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <span>✕</span>
                                        <span>Violated negative constraint &amp; guardrail by speculating on root causes</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span>✕</span>
                                        <span>Hallucinated fiber outages — claims fail verification in isolation against log</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span>✕</span>
                                        <span>Incomplete: omitted incident response latency and penalty clause status</span>
                                    </div>
                                </div>
                            </div>

                            {/* Response B */}
                            <div className="rounded-2xl border border-emerald-300 bg-[#F0FDF4]/40 p-5 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-200/60">
                                        <span className="font-bold text-xs uppercase tracking-wider text-[#166534]">
                                            Response B (Golden Response)
                                        </span>
                                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
                                            ✓ Grounded &amp; Complete
                                        </span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-4">
                                        "Vendor Alpha recorded 99.82% uptime with 14 min average response time. Zero penalty clauses triggered."
                                    </p>
                                </div>
                                <div className="space-y-1.5 pt-3 border-t border-emerald-200/50 text-xs text-emerald-800 font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <span>✓</span>
                                        <span>100% prompt completeness: all metrics addressed accurately</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span>✓</span>
                                        <span>Verified in isolation: assertions directly supported with zero contradictions</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span>✓</span>
                                        <span>Strict adherence to guardrails &amp; negative constraints (zero speculation)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Verdict */}
                        <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-4 sm:p-5 text-xs sm:text-sm text-emerald-950">
                            <span className="font-bold block mb-1 text-emerald-900 uppercase text-[11px] tracking-wider">Evaluator Verdict (Non-Negative Rubric):</span>
                            Response B satisfies full prompt completeness, passes claim isolation verification against Source Truth without contradicting the audit log, and respects safety guardrails. Ranked first with highest confidence under our non-negative rubric.
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                05 · STANDARDIZED EVALUATION RUBRIC MATRIX (CONNECTED PROCESS)
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white relative z-10 border-b border-gray-100">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <FileCheck className="w-3.5 h-3.5" />
                            Rubric Architecture
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                            type="chars"
                            stagger={0.015}
                            once={false}
                        >
                            Standardized Evaluation Rubric Dimensions
                        </SplitTextReveal>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mt-4 leading-relaxed">
                            Explicit, multi-dimensional scoring anchors applied across model completions to guarantee objective, verifiable evaluation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative">
                        {/* Connecting dashed line (desktop) */}
                        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] z-0 border-t border-dashed border-[#2D6A4F]/25 pointer-events-none" />

                        {RUBRIC_DIMENSIONS.map((dim) => {
                            const IconComponent = dim.icon;
                            return (
                                <div key={dim.dimension} className="flex flex-col items-center text-center relative group">
                                    {/* Icon circle */}
                                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${dim.iconBg} border ${dim.iconBorder} flex items-center justify-center mb-5 md:mb-6 shadow-2xs transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md relative z-10`}>
                                        <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${dim.iconColor}`} />
                                    </div>
                                    <h3 className={`font-serif text-base sm:text-lg font-bold mb-2.5 ${dim.headingColor}`}>
                                        {dim.dimension}
                                    </h3>
                                    <p className="text-xs sm:text-sm leading-relaxed text-gray-500 px-1 sm:px-2 mb-4 min-h-[3.5rem] sm:min-h-[4rem]">
                                        {dim.focus}
                                    </p>

                                    {/* Target pill */}
                                    <div className="mt-auto">
                                        <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full ${dim.tagBg} ${dim.tagColor} border ${dim.tagBorder}`}>
                                            {dim.target}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                06 · DOMAIN SPECIALIST BENCH & OPERATING PRINCIPLES
            ══════════════════════════════════════════════════════════════════ */}
            <section ref={domainRef} className="py-16 md:py-24 bg-white relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Cpu className="w-3.5 h-3.5" />
                            Specialist Coverage
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                            type="chars"
                            stagger={0.015}
                            once={false}
                        >
                            Calibrated Domain Reviewer Bench
                        </SplitTextReveal>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mt-4 leading-relaxed">
                            Project-scoped reviewers with verified domain competencies across technical, numerical, linguistic, and operational disciplines.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
                        {DOMAIN_BENCH.map((bench) => {
                            const IconComponent = bench.icon;
                            return (
                                <div
                                    key={bench.domain}
                                    className={`rounded-2xl border p-6 ${bench.bg} ${bench.border} transition-all duration-300 hover:shadow-xs`}
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/60 flex items-center justify-center flex-shrink-0 shadow-2xs">
                                            <IconComponent className={`w-5 h-5 ${bench.textColor}`} />
                                        </div>
                                        <div>
                                            <h3 className={`font-serif text-base sm:text-lg font-bold ${bench.textColor}`}>{bench.domain}</h3>
                                            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{bench.coverage}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{bench.details}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Operating Principles */}
                    <div className="border-t border-gray-100 pt-16 md:pt-20">
                        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                                <Shield className="w-3.5 h-3.5" />
                                Operating Principles
                            </div>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                                type="chars"
                                stagger={0.015}
                                once={false}
                            >
                                Designed around your task, not generic promises
                            </SplitTextReveal>
                            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mt-4 leading-relaxed">
                                Clear rubrics, transparent QA oversight, and strict data confidentiality.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
                            {OPERATING_PRINCIPLES.map((op) => {
                                const IconComponent = op.icon;
                                return (
                                    <div key={op.title} className="bg-[#ffffff] rounded-2xl border border-gray-200 p-6 shadow-2xs">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-[#E8F5EE] flex items-center justify-center text-[#166534]">
                                                <IconComponent className="w-5 h-5" />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{op.tag}</span>
                                        </div>
                                        <h4 className="font-serif text-base sm:text-lg font-bold text-gray-900 mb-2">{op.title}</h4>
                                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{op.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                07 · FAQS: COMPREHENSIVE BUYER FAQS (ACCORDION WITH SEARCH)
            ══════════════════════════════════════════════════════════════════ */}
            <section id="eval-faq" className="py-16 md:py-24 bg-[#ffffff] border-t border-gray-100 relative z-10">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Direct Answers
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-tight"
                            type="chars"
                            stagger={0.015}
                            once={false}
                        >
                            Frequently Asked Questions
                        </SplitTextReveal>
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mt-4 leading-relaxed">
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

                    <div className="space-y-3.5" itemScope itemType="https://schema.org/FAQPage">
                        {filteredFaqs.map((faq, idx) => {
                            const isOpen = openFaq === idx;
                            const originalIndex = FAQS.findIndex(f => f.q === faq.q);
                            const themeIndex = originalIndex >= 0 ? originalIndex : idx;
                            const theme = FAQ_THEMES[themeIndex % FAQ_THEMES.length];

                            return (
                                <div
                                    key={faq.q}
                                    className={`rounded-2xl border transition-all duration-300 bg-white ${
                                        isOpen ? `${theme.activeBorder} ${theme.shadow}` : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                    itemScope
                                    itemProp="mainEntity"
                                    itemType="https://schema.org/Question"
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                                        className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left focus:outline-none"
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-center gap-3.5 sm:gap-5">
                                            <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                {String(themeIndex + 1).padStart(2, '0')}
                                            </span>
                                            <span className="font-serif text-base sm:text-lg font-medium text-gray-900" itemProp="name">
                                                {faq.q}
                                            </span>
                                        </div>
                                        <div
                                            className={`w-7 h-7 rounded-full flex items-center justify-center border flex-shrink-0 transition-transform ${
                                                isOpen ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180` : 'bg-gray-50 border-gray-200 text-gray-400'
                                            }`}
                                        >
                                            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                        </div>
                                    </button>

                                    {isOpen && (
                                        <div
                                            className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100"
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
                08 · CLOSING CTA BANNER: CLEAN HIGH-IMPACT FROSTREK BANNER
            ══════════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white relative overflow-hidden font-sans border-t border-gray-100">
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-5xl">
                    <div className="bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] text-white p-8 sm:p-12 md:p-16 rounded-[2rem] md:rounded-[2.5rem] shadow-xl">
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white leading-tight">
                            Have a model or dataset that needs human review?
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Discuss task scope, rubrics, and deliverable format with our team. We're ready to review your prompt sets and evaluation requirements.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                id="eval-closing-cta-discuss"
                                className="group inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-base hover:bg-emerald-50 transition-all shadow-md hover:-translate-y-0.5"
                            >
                                Discuss Your Evaluation Project
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                        <p className="text-xs text-emerald-200/70 mt-6">
                            Direct project inquiries: <a href="mailto:contact@frostrek.com" className="underline hover:text-white">contact@frostrek.com</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LLMEvaluationRLHFPage;
