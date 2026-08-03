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
            'Hit your accuracy targets within your compute budget by instruction-tuning base models on proprietary data via LoRA, QLoRA, or full fine-tuning.',
        icon: '/icons/machine-learning-green.webp',
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
            'Lock in your exact business rules, tone, and safety requirements—not just generic helpfulness—through custom reward modeling, RLHF, and DPO pipelines.',
        icon: '/icons/ai-green.webp',
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
            'Turn raw, messy data into high-signal, training-ready datasets through expert sourcing, cleaning, deduplication, labeling, and synthetic generation.',
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
            'Eliminate hallucination without retraining by grounding model outputs in your proprietary knowledge base using custom retrieval pipelines and vector stores.',
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
            'Prove your model is safe and production-ready before launch through custom eval harnesses, benchmark suites, adversarial red-teaming, and bias testing.',
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
            'Keep your model performant and current post-launch with quantization, optimized inference serving, active drift monitoring, and continuous retraining pipelines.',
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
        description: 'Stop relying on generic scripts. We train domain-tuned agents to resolve tickets using your exact product knowledge and brand tone.',
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
        description: 'By fine-tuning models on firm-specific review standards, we automate the flagging of risky clauses and complex contract summarization.',
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
        description: 'Accelerate analyst workflows with custom RAG setups that ground answers directly in your proprietary market data and internal research.',
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
        description: 'Clinical note summarization and documentation support you can actually trust, backed by rigorous safety evaluations and compliance checks.',
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
        description: 'Give your employees instant, sourced answers. We train models on your internal wikis, SOPs, and past tickets to cut through the noise.',
        icon: '/icons/collaboration.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverBorder: 'hover:border-[#7C3AED]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
    {
        title: 'Frontier Model Refinement',
        description: 'Build AI that actually solves hard problems. We deliver the specialized fine-tuning required for complex coding assistants, reasoning models, and refined AI avatars.',
        icon: '/icons/innovation-green.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#F97316]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
];

const WHY_FROSTREK = [
    {
        title: '200+ Managed Resources',
        description: 'A dedicated, in-house workforce of 200+ annotators, reviewers, and ML engineers — not a revolving door of freelancers. Same team, rigorous oversight, zero excuses.',
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
        description: 'Every single dataset and model output survives a strict review hierarchy — annotator → reviewer → QA lead. We catch hallucinations and errors long before they hit production.',
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
        description: 'A managed, in-house team trained on your standards is inherently more efficient than stitching together anonymous freelancers. You get faster iteration cycles and superior results, for less.',
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
            'First, our ML engineers assess your use case, existing data assets, compute constraints, and success metrics to scope the optimal training approach.',
        icon: '/optimized/data-analytics.webp',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
    },
    {
        step: '2',
        title: 'Dataset Curation & Annotation',
        description:
            'Next comes the ground truth. This phase delivers a clean, labeled, training-ready dataset by sourcing additional data or generating synthetic examples to cover edge cases.',
        icon: '/optimized/innovation.webp',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
    },
    {
        step: '3',
        title: 'Fine-Tuning & Alignment',
        description:
            'With data in hand, training begins. The model undergoes SFT and targeted RLHF/DPO alignment cycles, iterating strictly against your defined quality benchmarks.',
        icon: '/optimized/custom-dev.webp',
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
    },
    {
        step: '4',
        title: 'Evaluation & Red-Teaming',
        description:
            'Before any deployment, the candidate model is aggressively stress-tested against custom eval suites, adversarial prompts, and bias checks to guarantee safety.',
        icon: '/icons/shield.png',
        iconBg: 'bg-[#FFF1F2]',
        iconBorder: 'border-[#FECDD3]',
        headingColor: 'text-[#E11D48]',
    },
    {
        step: '5',
        title: 'Deployment & Monitoring',
        description:
            'Finally, the optimized model drops into your infrastructure alongside quantization, serving enhancements, active drift monitoring, and a continuous retraining schedule.',
        icon: '/icons/collaboration.png',
        iconBg: 'bg-[#F5F3FF]',
        iconBorder: 'border-[#DDD6FE]',
        headingColor: 'text-[#6D28D9]',
    },
];



const RESULTS = [
    { metric: '40%', label: 'Reduction in hallucination rate after domain-specific fine-tuning vs. base model' },
    { metric: '3–5×', label: 'Faster time-to-deploy using reusable fine-tuning and eval pipelines' },
    { metric: '90%+', label: 'Task-relevant accuracy on custom benchmark suites post-alignment' },
    { metric: '24/7', label: 'Continuous monitoring pipelines to catch drift before it impacts users' },
];



/* ──────────────────── COMPONENT ──────────────────── */

const LLMModelTrainingPage = () => {
    const buildRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const useCasesRef = useRef<HTMLDivElement>(null);
    const whyFrostrekRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);

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
                description="We take foundation models from generic to genuinely useful. Expert LLM fine-tuning, RLHF alignment, and RAG deployment for enterprises and frontier AI teams."
                keywords="custom LLM fine-tuning, enterprise RLHF alignment, supervised fine-tuning data, RAG implementation, model red-teaming, LoRA QLoRA training, open-source LLM deployment, domain-specific AI"
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
                                "url": "https://www.frostrek.ai/contact",
                                "contactType": "sales"
                            }
                        },
                        "serviceType": ["LLM Fine-Tuning", "RLHF Alignment", "Dataset Preparation", "RAG Implementation", "Model Evaluation", "MLOps"],
                        "areaServed": ["IN", "US", "GB", "AE", "SG"],
                        "url": "https://www.frostrek.ai/solutions/llm-model-training"
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
                                We Train and Align Custom LLMs
                            </SplitTextReveal>
                            <br />
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false} delay={0.2}>
                                That Are Actually Ready for Production
                            </SplitTextReveal>
                        </div>

                        {/* Answer-First SEO Subtext */}
                        <p
                            className="text-base md:text-lg mb-10 max-w-3xl mx-auto leading-relaxed text-gray-600 font-medium"
                            itemProp="description"
                        >
                            We provide end-to-end LLM fine-tuning, RLHF alignment, and dataset preparation services. Tailored for enterprise teams, we transform generic foundation models into highly specialized, domain-specific AI. By rigorously preparing your proprietary data, we ensure your deployments are accurate, safe, and production-ready.
                        </p>

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
                            What We Offer
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
                                    <img src="/icons/machine-learning-green.webp" alt="Training" className="w-4 h-4 md:w-6 md:h-6 object-contain" loading="lazy" width={512} height={512} />
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
                                The track record we bring to every new model deployment.
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
