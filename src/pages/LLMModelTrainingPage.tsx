import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── DATA ──────────────────── */

const WHAT_WE_BUILD = [
    {
        title: 'Supervised Fine-Tuning (SFT)',
        description:
            'Instruction-tune base models on your proprietary data using LoRA, QLoRA, or full fine-tuning — whichever fits your compute budget and accuracy requirements.',
        icon: '/icons/machine-learning-green.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'RLHF & Preference Alignment',
        description:
            'Reward modeling, RLHF, and DPO pipelines that align model behavior with your business rules, tone, and safety requirements — not just generic helpfulness.',
        icon: '/icons/ai-green.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Dataset Preparation & Annotation',
        description:
            'Sourcing, cleaning, deduplication, labeling, and synthetic data generation to turn raw or messy data into training-ready datasets.',
        icon: '/icons/data-analytics-green.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Retrieval-Augmented Generation (RAG)',
        description:
            'Custom retrieval pipelines and vector store integration to ground model outputs in your proprietary knowledge base, reducing hallucination without retraining.',
        icon: '/icons/architecture-green.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Model Evaluation & Red-Teaming',
        description:
            'Custom eval harnesses, benchmark suites, adversarial red-teaming, and bias/safety testing before any model reaches production.',
        icon: '/icons/shield.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'Deployment & MLOps',
        description:
            'Quantization, optimized inference serving, monitoring, and continuous retraining pipelines to keep your model performant and current post-launch.',
        icon: '/icons/innovation-green.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
];

const CAPABILITIES_LEFT = [
    'LoRA / QLoRA parameter-efficient fine-tuning',
    'Full fine-tuning for maximum performance',
    'Instruction dataset curation & templating',
    'Synthetic data generation pipelines',
    'Domain-specific vocabulary injection',
    'Multi-task and multi-turn training',
    'Reward model training & preference collection',
    'DPO / RLHF alignment pipelines',
];

const CAPABILITIES_RIGHT = [
    'Custom RAG pipelines with vector store integration',
    'Embedding model fine-tuning',
    'Automated eval harnesses & benchmark suites',
    'Adversarial red-teaming & safety testing',
    'Model quantization (GGUF, AWQ, GPTQ)',
    'vLLM / TensorRT-LLM serving optimization',
    'Continuous monitoring & drift detection',
    'Retraining cadence & CI/CD for models',
];

const USE_CASES = [
    {
        title: 'Customer Support Automation',
        description: 'Domain-tuned agents that resolve tickets using your product knowledge and tone, not generic scripts.',
        icon: '/icons/chat-green.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#22C55E]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Legal & Compliance Review',
        description: 'Models fine-tuned to flag clauses, summarize contracts, and apply firm-specific review standards.',
        icon: '/icons/shield.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Financial Research Copilots',
        description: 'Models grounded in proprietary research and market data via RAG, tuned for analyst workflows.',
        icon: '/icons/valuation-green.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverBorder: 'hover:border-[#F59E0B]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        title: 'Healthcare Documentation',
        description: 'Fine-tuned models for clinical note summarization and documentation support, with strict safety evaluation.',
        icon: '/icons/health-care.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverBorder: 'hover:border-[#E11D48]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'Internal Knowledge Assistants',
        description: 'Models trained on internal wikis, SOPs, and tickets so employees get accurate, sourced answers instantly.',
        icon: '/icons/collaboration.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverBorder: 'hover:border-[#7C3AED]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
];

const WHY_FROSTREK = [
    {
        title: '200+ Managed Resources',
        description: 'A dedicated, in-house workforce of 200+ annotators, reviewers, and ML engineers — not a revolving door of freelancers. Same team, consistent quality, full accountability.',
        icon: '/icons/collaboration.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Ad-Hoc Delivery Support',
        description: 'Need to scale a dataset overnight or turn around an urgent fine-tuning cycle? Our managed capacity means we can flex up for ad-hoc, time-sensitive delivery without re-onboarding new vendors.',
        icon: '/icons/lightning.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Multi-Level Quality Control',
        description: 'Every dataset and model output passes through a structured review hierarchy — annotator → reviewer → QA lead — catching errors before they ever reach training data or production.',
        icon: '/icons/shield.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        title: 'Lower Cost Than Freelancer Models',
        description: 'A managed, in-house team trained on your project standards costs less than stitching together freelancers — while delivering more consistent quality and faster iteration cycles.',
        icon: '/icons/investment.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
];

const HOW_WE_WORK = [
    {
        step: '1',
        title: 'Discovery & Data Audit',
        description:
            'We assess your use case, existing data assets, compute constraints, and success metrics to scope the right training approach.',
        icon: '/optimized/data-analytics.webp',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
    },
    {
        step: '2',
        title: 'Dataset Curation & Annotation',
        description:
            'We build a clean, labeled, training-ready dataset — sourcing additional data or generating synthetic examples where gaps exist.',
        icon: '/optimized/innovation.webp',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
    },
    {
        step: '3',
        title: 'Fine-Tuning & Alignment',
        description:
            'We run SFT and, where needed, RLHF/DPO alignment cycles, iterating against your defined quality and safety benchmarks.',
        icon: '/optimized/custom-dev.webp',
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
    },
    {
        step: '4',
        title: 'Evaluation & Red-Teaming',
        description:
            'We stress-test the model against custom eval suites, adversarial prompts, and bias/safety checks before sign-off.',
        icon: '/icons/shield.png',
        iconBg: 'bg-[#FFF1F2]',
        iconBorder: 'border-[#FECDD3]',
        headingColor: 'text-[#E11D48]',
    },
    {
        step: '5',
        title: 'Deployment & Monitoring',
        description:
            'We deploy the model into your infrastructure with quantization and serving optimizations, plus monitoring for drift and a retraining cadence.',
        icon: '/icons/collaboration.png',
        iconBg: 'bg-[#F5F3FF]',
        iconBorder: 'border-[#DDD6FE]',
        headingColor: 'text-[#6D28D9]',
    },
];

const TECH_STACK_MARQUEE = [
    { category: 'Training', name: 'PyTorch', image: '/techstack/Python.svg' },
    { category: 'Training', name: 'Hugging Face', image: '/icons/machine-learning-green.png' },
    { category: 'Training', name: 'DeepSpeed', image: '/icons/ai-green.png' },
    { category: 'Base Models', name: 'Llama', image: '/techstack/Meta.svg' },
    { category: 'Base Models', name: 'Mistral', image: '/icons/ai-blue.png' },
    { category: 'Base Models', name: 'GPT / Claude', image: '/icons/ai.png' },
    { category: 'Serving', name: 'vLLM', image: '/icons/lightning.png' },
    { category: 'RAG', name: 'Pinecone', image: '/icons/data-analytics-green.png' },
    { category: 'RAG', name: 'LangChain', image: '/icons/architecture-green.png' },
    { category: 'Tracking', name: 'Weights & Biases', image: '/icons/data-analytics-blue.png' },
    { category: 'Infrastructure', name: 'AWS', image: '/techstack/AWS.svg' },
    { category: 'Infrastructure', name: 'Kubernetes', image: '/techstack/Kubernetes.svg' },
    { category: 'Backend', name: 'FastAPI', image: '/techstack/FastAPI.svg' },
    { category: 'Backend', name: 'PostgreSQL', image: '/techstack/PostgresSQL.svg' },
];

const RESULTS = [
    { metric: '40%', label: 'Reduction in hallucination rate after domain-specific fine-tuning vs. base model' },
    { metric: '3–5×', label: 'Faster time-to-deploy using reusable fine-tuning and eval pipelines' },
    { metric: '90%+', label: 'Task-relevant accuracy on custom benchmark suites post-alignment' },
    { metric: '24/7', label: 'Continuous monitoring pipelines to catch drift before it impacts users' },
];

const FAQS = [
    {
        q: 'Do we need our own data to start?',
        a: "Not necessarily — we can help identify, source, or synthetically generate training data if your existing dataset isn't sufficient.",
    },
    {
        q: 'Which is right for us — fine-tuning or RAG?',
        a: "Often both. RAG grounds the model in your current knowledge base; fine-tuning changes how the model reasons and responds. We'll recommend the right mix based on your use case.",
    },
    {
        q: 'Can you work with closed models like GPT or Claude?',
        a: 'Yes — we support fine-tuning and RAG setups on both open-weight models and commercial APIs that support customization.',
    },
    {
        q: 'How do you handle safety and compliance?',
        a: 'Every model goes through red-teaming and bias/safety evaluation before deployment, with monitoring in place post-launch.',
    },
];

/* ──────────────────── COMPONENT ──────────────────── */

const LLMModelTrainingPage = () => {
    const buildRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const useCasesRef = useRef<HTMLDivElement>(null);
    const whyFrostrekRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const ctaButtonsRef = useRef<HTMLDivElement>(null);
    const processSection = useRef<HTMLElement>(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // What We Build cards
            const buildCards = buildRef.current?.querySelectorAll('.build-card');
            if (buildCards) {
                gsap.fromTo(buildCards, { y: 60, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: buildRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Capabilities checklist items
            const capItems = capabilitiesRef.current?.querySelectorAll('.cap-item');
            if (capItems) {
                gsap.fromTo(capItems, { x: -30, opacity: 0 }, {
                    x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
                    scrollTrigger: { trigger: capabilitiesRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Use case tiles
            const useCaseTiles = useCasesRef.current?.querySelectorAll('.industry-tile');
            if (useCaseTiles) {
                gsap.fromTo(useCaseTiles, { y: 40, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: useCasesRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Why Frostrek tiles
            const whyTiles = whyFrostrekRef.current?.querySelectorAll('.why-tile');
            if (whyTiles) {
                gsap.fromTo(whyTiles, { y: 40, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: whyFrostrekRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
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

            // Results cards
            const resultCards = resultsRef.current?.querySelectorAll('.result-card');
            if (resultCards) {
                gsap.fromTo(resultCards, { y: 40, opacity: 0, scale: 0.9 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: resultsRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // CTA buttons
            const ctaBtns = ctaButtonsRef.current?.querySelectorAll('.cta-btn');
            if (ctaBtns) {
                gsap.fromTo(ctaBtns, { y: 40, opacity: 0, scale: 0.9 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(1.7)',
                    scrollTrigger: { trigger: ctaButtonsRef.current, start: 'top 95%', toggleActions: 'play reverse play reverse' },
                });
            }
        });
        return () => ctx.revert();
    });

    return (
        <div className="relative min-h-screen bg-white text-[#2D6A4F] font-body">
            <SEO
                title="LLM Fine-Tuning & Model Training Services | Frostrek AI"
                description="Frostrek AI delivers custom LLM fine-tuning, RLHF alignment, dataset preparation, and RAG implementation for enterprises and frontier AI teams. From data to deployment."
                keywords="custom LLM fine-tuning enterprise India, managed RLHF alignment services, supervised fine-tuning dataset creation, LLM dataset preparation services, custom Retrieval Augmented Generation setup, model evaluation and red-teaming, LoRA QLoRA fine-tuning, open-source LLM deployment, domain-specific AI model training"
                path="/solutions/llm-model-training"
                schema={[
                    JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "LLM Fine-Tuning & Model Training Services",
                        "description": "Frostrek AI delivers custom LLM fine-tuning, RLHF alignment, dataset preparation, and RAG implementation for enterprises and frontier AI teams.",
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
                            },
                            "contactPoint": {
                                "@type": "ContactPoint",
                                "email": "contact@frostrek.ai",
                                "contactType": "sales"
                            }
                        },
                        "serviceType": ["LLM Fine-Tuning", "RLHF Alignment", "Dataset Preparation", "RAG Implementation", "Model Evaluation", "MLOps"],
                        "areaServed": ["IN", "US", "GB", "AE", "SG"],
                        "url": "https://www.frostrek.ai/solutions/llm-model-training"
                    }),
                    JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": FAQS.map(faq => ({
                            "@type": "Question",
                            "name": faq.q,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.a
                            }
                        }))
                    })
                ]}
            />
            <CuteBackground />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section className="relative pt-28 pb-16 md:pt-48 md:pb-32 overflow-hidden flex flex-col justify-center min-h-[90vh]">
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
                            LLM TRAINING & MODEL SERVICES
                        </motion.div>

                        {/* Headline */}
                        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-8 tracking-tight max-w-5xl mx-auto leading-tight text-[#2D6A4F]">
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                Custom LLM Training & Model Alignment
                            </SplitTextReveal>
                            <br />
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false} delay={0.2}>
                                Built for Production
                            </SplitTextReveal>
                        </div>

                        {/* Subtext */}
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-500"
                            type="words" stagger={0.015} once={false} delay={0.6}
                        >
                            We take foundation models from generic to genuinely useful — fine-tuned on your data, aligned to your standards, and deployed at production scale. From dataset curation to RLHF to evaluation, Frostrek handles the full model training pipeline so your team doesn't have to build ML infrastructure from scratch.
                        </SplitTextReveal>

                        {/* CTA buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                        >
                            <Link
                                to="/contact"
                                id="llm-hero-cta-primary"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Talk to Our ML Team
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <button
                                onClick={() => processSection.current?.scrollIntoView({ behavior: 'smooth' })}
                                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-lg transition-all border border-[#2D6A4F]/20 hover:border-[#2D6A4F]/40 hover:bg-[#F0FDF4] shadow-sm hover:-translate-y-0.5"
                            >
                                See Our Process
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
            </section>

            {/* ═══════ SECTION 2 — WHAT WE BUILD ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
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
                                End-to-end model training capabilities — from raw data to deployed, monitored production models.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={buildRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {WHAT_WE_BUILD.map((item) => (
                            <SpotlightCard
                                key={item.title}
                                className={`build-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${item.bgColor} ${item.border} ${item.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={item.spotlight}
                            >
                                <div className="relative z-10 flex gap-3 md:gap-5 items-start">
                                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${item.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={item.icon} alt={item.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-serif text-[15px] md:text-xl font-bold mb-1 md:mb-2 ${item.headingColor}`}>{item.title}</h3>
                                        <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 3 — OUR CAPABILITIES (Split-view) ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Our LLM Capabilities
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Deep technical expertise across training, alignment, evaluation, and deployment — everything needed to take a model from prototype to production.
                            </SplitTextReveal>
                        </div>
                    </div>

                    {/* Split view: two checklist columns */}
                    <div ref={capabilitiesRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                        {/* Left column — Training & Alignment */}
                        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[1.25rem] md:rounded-[2rem] p-4 md:p-10">
                            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                                <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-[#166534]/10 border border-[#BBF7D0] flex items-center justify-center">
                                    <img src="/icons/machine-learning-green.png" alt="Training" className="w-4 h-4 md:w-6 md:h-6 object-contain" loading="lazy" width={512} height={512} />
                                </div>
                                <h3 className="font-serif text-[15px] md:text-xl font-bold text-[#166534]">Training & Alignment</h3>
                            </div>
                            <ul className="space-y-2.5 md:space-y-4">
                                {CAPABILITIES_LEFT.map((item) => (
                                    <li key={item} className="cap-item flex items-start gap-2 md:gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#166534] flex-shrink-0 mt-0.5" strokeWidth={2} />
                                        <span className="text-gray-700 text-[12px] md:text-sm leading-snug md:leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right column — Evaluation & Deployment */}
                        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-[1.25rem] md:rounded-[2rem] p-4 md:p-10">
                            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                                <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-[#0284C7]/10 border border-[#BAE6FD] flex items-center justify-center">
                                    <img src="/icons/shield.png" alt="Evaluation" className="w-4 h-4 md:w-6 md:h-6 object-contain" loading="lazy" width={512} height={512} />
                                </div>
                                <h3 className="font-serif text-[15px] md:text-xl font-bold text-[#0284C7]">Evaluation & Deployment</h3>
                            </div>
                            <ul className="space-y-2.5 md:space-y-4">
                                {CAPABILITIES_RIGHT.map((item) => (
                                    <li key={item} className="cap-item flex items-start gap-2 md:gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#0284C7] flex-shrink-0 mt-0.5" strokeWidth={2} />
                                        <span className="text-gray-700 text-[12px] md:text-sm leading-snug md:leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4 — USE CASES ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Where We've Applied This
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                LLM training and RAG solutions tailored to the unique needs of different verticals.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={useCasesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {USE_CASES.map((ind) => (
                            <SpotlightCard
                                key={ind.title}
                                className={`industry-tile group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${ind.bgColor} ${ind.border} ${ind.hoverShadow} ${ind.hoverBorder} hover:-translate-y-1`}
                                spotlightColor={ind.spotlight}
                            >
                                <div className="relative z-10">
                                    <div className={`w-9 h-9 md:w-14 md:h-14 rounded-lg md:rounded-2xl border flex items-center justify-center mb-2 md:mb-5 bg-white/40 ${ind.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={ind.icon} alt={ind.title} className="w-4 h-4 md:w-7 md:h-7 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <h3 className={`font-serif text-[14px] md:text-xl font-bold mb-1 md:mb-2 ${ind.headingColor}`}>{ind.title}</h3>
                                    <p className="text-gray-600 text-[11px] md:text-sm leading-snug md:leading-relaxed">{ind.description}</p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4.5 — WHY FROSTREK ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Backed by a Managed Workforce, Not a Freelancer Pool
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Behind every fine-tuning and annotation project is a managed delivery team. We run dataset labeling, review, and QA through a structured, in-house workforce, which means consistent quality, accountable timelines, and the ability to scale up fast when your project needs it.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={whyFrostrekRef} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                        {WHY_FROSTREK.map((item) => (
                            <SpotlightCard
                                key={item.title}
                                className={`why-tile group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-4 md:p-8 transition-all duration-300 ${item.bgColor} ${item.border} ${item.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={item.spotlight}
                            >
                                <div className="relative z-10 flex gap-3 md:gap-5 items-start">
                                    <div className={`w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl border flex items-center justify-center flex-shrink-0 bg-white/40 ${item.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                                        <img src={item.icon} alt={item.title} className="w-5 h-5 md:w-9 md:h-9 object-contain" loading="lazy" width={512} height={512} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className={`font-serif text-[15px] md:text-xl font-bold mb-1 md:mb-2 ${item.headingColor}`}>{item.title}</h3>
                                        <p className="text-[12px] md:text-sm leading-snug md:leading-relaxed text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — HOW WE WORK ═══════ */}
            <section ref={processSection} className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-20">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            How We Work
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                A proven process from discovery to deployment — transparent, collaborative, and engineered for production-grade AI.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={processRef} className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 relative">
                        {/* Connecting dashed line (desktop) */}
                        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] -z-10 border-t border-dashed border-[#2D6A4F]/30" />

                        {HOW_WE_WORK.map((step) => (
                            <div key={step.step} className="process-step flex flex-col items-center text-center relative group">
                                {/* Icon circle */}
                                <div className={`w-14 h-14 md:w-24 md:h-24 rounded-full ${step.iconBg} border ${step.iconBorder} flex items-center justify-center mb-3 md:mb-6 shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md relative z-10`}>
                                    <img src={step.icon} alt={step.title} className="w-6 h-6 md:w-10 md:h-10 object-contain opacity-80" loading="lazy" width={512} height={512} />
                                </div>
                                <h3 className={`font-serif text-[14px] md:text-lg font-bold mb-1.5 md:mb-3 ${step.headingColor}`}>{step.title}</h3>
                                <p className="text-[11px] md:text-sm leading-snug md:leading-relaxed text-gray-500 px-1 md:px-2 mb-3 md:mb-6 min-h-[5rem] md:min-h-[80px]">{step.description}</p>
                                {/* Step number badge */}
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-[#2D6A4F]/30 flex items-center justify-center text-[#2D6A4F] text-xs md:text-sm font-bold bg-[#2D6A4F]/5 mt-auto shadow-sm">
                                    {step.step}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 6 — TECH STACK & INTEGRATIONS (Marquee) ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Tools & Frameworks We Work With
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Industry-standard ML tooling and infrastructure, selected for reliability and performance at scale.
                            </SplitTextReveal>
                        </div>
                    </div>
                </div>

                {/* Marquee reel */}
                <div ref={techRef} className="relative w-full overflow-hidden py-8 group">
                    {/* Left / right fade masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#Fcfcfc] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#Fcfcfc] to-transparent z-10 pointer-events-none" />

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
                                    <span className="text-[10px] md:text-xs font-semibold text-gray-700">{tech.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 7 — RESULTS / METRICS ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Results That Matter
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Directional outcomes from our model training engagements.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={resultsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {RESULTS.map((r) => (
                            <div key={r.metric} className="result-card bg-[#F0FDF4] border border-[#BBF7D0] rounded-[1.25rem] md:rounded-[2rem] p-6 md:p-8 text-center">
                                <div className="text-3xl md:text-5xl font-serif font-black text-[#2D6A4F] mb-3 md:mb-4">{r.metric}</div>
                                <p className="text-[11px] md:text-sm text-gray-600 leading-snug md:leading-relaxed">{r.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 8 — FAQ ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Frequently Asked Questions
                        </SplitTextReveal>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-[1.25rem] md:rounded-[1.5rem] p-5 md:p-8 shadow-sm">
                                <h3 className="font-serif text-[15px] md:text-xl font-bold text-[#2D6A4F] mb-2 md:mb-3">{faq.q}</h3>
                                <p className="text-[12px] md:text-sm text-gray-600 leading-snug md:leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 9 — CLOSING CTA ═══════ */}
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
                                Ready to Train a Model That
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false} delay={0.2}
                            >
                                Actually Knows Your Business?
                            </SplitTextReveal>
                        </div>
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
                            type="words" stagger={0.02} once={false} delay={0.3}
                        >
                            Talk to our ML team about fine-tuning, alignment, or RAG for your use case.
                        </SplitTextReveal>
                        <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                id="llm-cta-talk-ml-team"
                                className="cta-btn group relative flex items-center gap-3 px-10 py-5 bg-[#2D6A4F] text-white rounded-full text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 overflow-hidden"
                            >
                                Talk to Our ML Team
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LLMModelTrainingPage;
