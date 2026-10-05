import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
    ArrowRight, 
    Plus, 
    Minus, 
    Globe, 
    MessageSquare, 
    Sparkles, 
    Target, 
    Layers, 
    FileCode, 
    BarChart3, 
    CheckCircle2, 
    ShieldCheck, 
    Zap
} from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────── DATA ────────────────────────────────── */

const THREE_PILLARS = [
    {
        id: 'ai-powered-seo',
        title: 'AI-Powered SEO',
        subtitle: 'Search Engine Optimization, Reimagined',
        description: 'Next-generation search strategies engineered beyond keyword density. We build entity models, semantic content clusters, and high-authority knowledge graphs that position your brand as the definitive factual answer across Google Search, Google Maps, and AI Overviews, driving sustainable organic conversions from search engines.',
        features: [
            'Entity-based content architecture & semantic modeling',
            'Semantic keyword clustering & intent graph mapping',
            'Technical crawl audits & Core Web Vitals optimization',
            'Google Knowledge Panel entity alignment',
            'SERP feature targeting (Featured Snippets & AI Overviews)',
        ],
        icon: Globe,
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        iconBg: 'bg-[#F0F9FF]',
        spotlight: 'rgba(14, 165, 233, 0.025)',
        accentColor: '#0284C7',
    },
    {
        id: 'answer-engine-optimization',
        title: 'Answer Engine Optimization (AEO)',
        subtitle: 'Get Cited in Conversational AI Responses',
        description: 'Structure your brand knowledge so conversational AI assistants directly cite your business when prospects research solutions. AEO transforms standard web pages into quotable, machine-readable answers optimized for real-time synthesis in Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini, capturing zero-click buyers at the point of decision.',
        features: [
            'Conversational query targeting & answer engineering',
            'Comprehensive JSON-LD markup (FAQ, HowTo, Q&A, Service)',
            'LLM-friendly content formatting & extractable definitions',
            'AI citation monitoring & attribution telemetry',
            'Machine-readable brand knowledge base architecture',
        ],
        icon: MessageSquare,
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        iconBg: 'bg-[#F5F3FF]',
        spotlight: 'rgba(124, 58, 237, 0.025)',
        accentColor: '#6D28D9',
    },
    {
        id: 'generative-engine-optimization',
        title: 'Generative Engine Optimization (GEO)',
        subtitle: 'Shape How AI Engines Recommend Your Brand',
        description: 'Construct unambiguous brand knowledge graphs so generative AI engines accurately understand, validate, and recommend your products. GEO ensures that when multi-modal LLMs synthesize category recommendations, your brand is positioned as the primary authority, preventing competitor bias and AI hallucination across modern answer engines.',
        features: [
            'Brand knowledge graph construction & entity disambiguation',
            'Structured data feeds & clean Markdown ingestion feeds',
            'Generative citation gap analysis & competitive share-of-voice',
            'Topical authority signaling & third-party citation building',
            'Multi-engine visibility (Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini)',
        ],
        icon: Sparkles,
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        iconBg: 'bg-[#F0FDF4]',
        spotlight: 'rgba(34, 197, 94, 0.025)',
        accentColor: '#166534',
    },
];

const COMPARISON_MATRIX = [
    {
        dimension: 'Primary Goal',
        seo: 'Rank on traditional search engine results pages (SERPs)',
        aeo: 'Get cited as a direct answer in conversational AI assistants',
        geo: 'Be recommended by generative AI engines synthesizing queries',
    },
    {
        dimension: 'Target Platform',
        seo: 'Google, Bing, Yahoo',
        aeo: 'ChatGPT, Claude, Perplexity, Google AI Overviews',
        geo: 'Gemini, Copilot, SearchGPT, Perplexity Pro',
    },
    {
        dimension: 'Content Format',
        seo: 'Long-form articles, keywords, metadata tags',
        aeo: 'Structured Q&A, FAQ schema, speakable snippets',
        geo: 'Knowledge graphs, entity relationships, semantic feeds',
    },
    {
        dimension: 'Success Metric',
        seo: 'SERP rankings, organic impressions, CTR',
        aeo: 'Citation frequency, answer inclusion rate',
        geo: 'Brand recommendation share-of-voice in LLMs',
    },
    {
        dimension: 'Key Technique',
        seo: 'Keyword optimization, backlinks, technical crawlability',
        aeo: 'Answer engineering, schema markup, authority signals',
        geo: 'Entity architecture, knowledge feeds, citation audits',
    },
    {
        dimension: 'Evolution Stage',
        seo: 'Keywords → Topics → Entities',
        aeo: 'Pages → Answers → Citations',
        geo: 'Links → Knowledge → Recommendations',
    },
];

const FRAMEWORK_STEPS = [
    {
        step: '1',
        title: 'Entity Architecture & Modeling',
        description: 'We map your brand knowledge domain, identify core entity relationships, and align your digital properties with recognized semantic databases. This ensures both traditional search algorithms and generative LLMs unambiguously recognize your company as a verified topical authority in your category.',
        icon: Target,
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
    },
    {
        step: '2',
        title: 'Structured Knowledge Graphs',
        description: 'We implement advanced JSON-LD schemas, Open Graph signals, and semantic markup to build a comprehensive machine-readable graph. AI crawlers parse these interconnected datasets without executing client-side scripts, establishing authoritative factual anchors for your services.',
        icon: Layers,
        iconBg: 'bg-[#F5F3FF]',
        iconBorder: 'border-[#DDD6FE]',
        headingColor: 'text-[#6D28D9]',
    },
    {
        step: '3',
        title: 'Machine-Readable Content Engineering',
        description: 'We format your core value propositions, product documentation, and FAQs into high-entropy, extractable text passages. This architecture provides AI answer engines like Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini with quotable snippets engineered for instant citation.',
        icon: FileCode,
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
    },
    {
        step: '4',
        title: 'Generative Citation Auditing & Defense',
        description: 'Our proprietary telemetry system runs weekly probes across leading LLMs to monitor brand citation frequency, detect hallucinations, and measure competitive share-of-voice. We continuously close citation gaps to expand your brand recommendation dominance over time.',
        icon: BarChart3,
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
    },
];

const PRICING_PLAN = {
    name: 'Complete AI Visibility & Search Engine Optimization',
    subtitle: 'Unified SEO, AEO & GEO Engineering',
    price: '$300',
    currency: 'USD',
    cadence: '/month',
    startingLabel: 'Starting at',
    description: 'Comprehensive brand optimization across traditional search engines and leading AI answer engines. Scoped transparently to your domain footprint with zero lock-in.',
    features: [
        'Full entity architecture & advanced JSON-LD schema deployment',
        '5-Engine AI citation audit & telemetry (Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini)',
        'Traditional technical SEO, crawlability & Core Web Vitals audit',
        'Extractable Markdown brand knowledge feeds & llms.txt integration',
        'Google Knowledge Panel alignment & entity disambiguation',
        'Speakable answer engineering for Google AI Overviews & SearchGPT',
        'Monthly citation share-of-voice & brand attribution reports',
        'Competitor citation gap analysis & prompt displacement',
        'Dedicated AI search specialist & monthly strategy reviews',
        'Continuous prompt performance tracking & gap defense',
    ],
    ctaText: 'Get Started at USD $300',
    ctaLink: '/audit',
    secondaryCtaText: 'Schedule a Consultation',
    secondaryCtaLink: '/contact',
};

interface FAQ {
    question: string;
    answer: string;
}

const FAQS: FAQ[] = [
    {
        question: 'What is AI Visibility, and why does my brand need it?',
        answer: 'AI Visibility is the practice of optimizing your brand digital footprint so that conversational assistants and generative search engines—including Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini—accurately cite and recommend your business. As search engines transition to zero-click AI summaries and conversational answers, brands that lack structured entity data risk complete omission from the modern buyer research journey.',
    },
    {
        question: 'What does an AI Visibility engagement cost?',
        answer: 'Our AI Visibility partnerships start at just USD $300 per month. Rather than forcing you into rigid tiers, we scope your engagement around your specific domain footprint, product catalog, and competitor landscape. Every plan includes transparent deliverables, comprehensive AI citation telemetry, and zero long-term lock-in.',
    },
    {
        question: 'How do you measure and verify AI search visibility?',
        answer: 'We measure success through comprehensive attribution telemetry: Citation Share-of-Voice across Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini; Entity Graph Completeness Scores; prompt inclusion frequency for unbranded buyer queries; and downstream referral traffic. Clients receive detailed monthly citation reports and attribution dashboards showing exactly which prompts recommend their brand, how citations evolve, and where competitor gaps have been captured.',
    },
    {
        question: 'What is llms.txt and do I need one?',
        answer: 'llms.txt is an emerging Markdown standard designed to give LLMs and AI agent crawlers a clean, structured index of your website documentation and services. While Google search advocates have clarified that llms.txt is not required for Google AI Overviews (which rely on standard web crawling, entity graphs, and schema markup), it remains a valuable tool for developer documentation, API indexing, and autonomous AI agent workflows.',
    },
    {
        question: 'Can you help with both traditional SEO and AI search optimization?',
        answer: 'Yes. Our AI Visibility service unifies traditional SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO) into a single cohesive architecture. Technical crawlability, entity modeling, and high-authority content work synergistically to improve your traditional search rankings on Google and Bing while simultaneously earning citations inside conversational AI answer engines.',
    },
    {
        question: 'How long does it take to see results from AI Visibility optimization?',
        answer: 'Technical implementations—including structured schema, machine-readable feeds, and entity alignments—are deployed within 2 to 4 weeks. Most clients see measurable citation improvements and AI recommendation pickups within 4 to 8 weeks, as demonstrated by our client AI Shield OS achieving a +340% citation surge in 35 days. Traditional organic SERP rankings compound over 3 to 6 months.',
    },
    {
        question: 'Is this service relevant for B2B companies, or only B2C?',
        answer: 'Both benefit significantly, but B2B enterprises often experience the highest return on investment. Modern B2B buyers and executives routinely use Perplexity, Claude, and ChatGPT to conduct vendor research and generate software shortlists. Ensuring your company is cited as the leading authority in conversational prompt responses directly drives high-value qualified sales conversations.',
    },
];

/* ────────────────────────────────── SCHEMAS ────────────────────────────────── */

const webPageSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Generative Engine Optimization (GEO) & AI Visibility Agency | Frostrek AI',
    description: 'Be found where answers are born. Frostrek optimizes your brand across Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini through advanced GEO, AEO, and AI-powered SEO.',
    url: 'https://www.frostrek.ai/solutions/ai-visibility',
    inLanguage: 'en',
    datePublished: '2026-03-01T08:00:00+00:00',
    dateModified: '2026-09-28T08:00:00+00:00',
    isPartOf: {
        '@type': 'WebSite',
        name: 'Frostrek AI',
        url: 'https://www.frostrek.ai',
    },
    about: [
        { '@type': 'Thing', name: 'Search Engine Optimization', sameAs: 'https://en.wikipedia.org/wiki/Search_engine_optimization' },
        { '@type': 'Thing', name: 'Answer Engine Optimization' },
        { '@type': 'Thing', name: 'Generative Engine Optimization' },
        { '@type': 'Thing', name: 'Artificial Intelligence', sameAs: 'https://en.wikipedia.org/wiki/Artificial_intelligence' },
    ],
    mainEntity: {
        '@type': 'Service',
        name: 'Generative Engine Optimization (GEO) & AI Visibility',
        provider: {
            '@type': 'Organization',
            '@id': 'https://www.frostrek.ai/#organization',
            name: 'Frostrek AI',
            url: 'https://www.frostrek.ai',
        },
    },
    speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#hero-definition', '#hero-hook'],
    },
});

const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
});

const serviceSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Visibility & Generative Engine Optimization (GEO) Services',
    description: 'Comprehensive AI search optimization service covering SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) to maximize brand visibility across Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini.',
    provider: {
        '@type': 'Organization',
        '@id': 'https://www.frostrek.ai/#organization',
        name: 'Frostrek AI',
        url: 'https://www.frostrek.ai',
    },
    serviceType: 'AI Search Optimization',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Visibility Services',
        itemListElement: [
            {
                '@type': 'Offer',
                name: PRICING_PLAN.name,
                description: PRICING_PLAN.description,
                price: '300',
                priceCurrency: 'USD',
                priceSpecification: {
                    '@type': 'UnitPriceSpecification',
                    price: '300',
                    priceCurrency: 'USD',
                    unitText: 'MONTH',
                },
            },
        ],
    },
});

const howToSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Frostrek Optimizes Your Brand for AI Visibility',
    description: 'A 4-step framework to maximize your brand visibility across search engines and AI assistants.',
    step: FRAMEWORK_STEPS.map((s) => ({
        '@type': 'HowToStep',
        position: parseInt(s.step),
        name: s.title,
        text: s.description,
    })),
});

/* ────────────────────────────────── COMPONENT ────────────────────────────────── */

export default function AIVisibilityPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const pillarsRef = useRef<HTMLDivElement>(null);
    const comparisonRef = useRef<HTMLDivElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const frameworkRef = useRef<HTMLDivElement>(null);
    const pricingRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [activeComparison, setActiveComparison] = useState(0);

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

            // Pillar cards
            const pillarCards = pillarsRef.current?.querySelectorAll('.pillar-card');
            if (pillarCards) {
                gsap.fromTo(pillarCards, { y: 40, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power2.out',
                    scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Comparison table
            const compRows = comparisonRef.current?.querySelectorAll('.comp-row');
            if (compRows) {
                gsap.fromTo(compRows, { x: -20, opacity: 0 }, {
                    x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out',
                    scrollTrigger: { trigger: comparisonRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Framework steps
            const fwSteps = frameworkRef.current?.querySelectorAll('.fw-step');
            if (fwSteps) {
                gsap.fromTo(fwSteps, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: frameworkRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // FAQ items
            const faqItems = faqRef.current?.querySelectorAll('.faq-item');
            if (faqItems) {
                gsap.fromTo(faqItems, { y: 20, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out',
                    scrollTrigger: { trigger: faqRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <article
            className="bg-brand-light-bg min-h-screen pt-24 font-body text-primary overflow-x-hidden"
            itemScope
            itemType="https://schema.org/Service"
        >
            <SEO
                title="Generative Engine Optimization (GEO) & AI Visibility Agency | Frostrek AI"
                description="Be found where answers are born. Frostrek optimizes your brand across Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini through advanced GEO, AEO, and AI-powered SEO."
                path="/solutions/ai-visibility"
                schema={[webPageSchema, faqSchema, serviceSchema, howToSchema]}
            />
            <CuteBackground />

            {/* Semantic metadata for AI crawlers */}
            <meta itemProp="name" content="Generative Engine Optimization (GEO) & AEO Agency by Frostrek AI" />
            <meta itemProp="serviceType" content="AI Search Optimization" />
            <meta itemProp="url" content="https://www.frostrek.ai/solutions/ai-visibility" />

            {/* ────────────────────── SECTION 1 ── ANSWER-FIRST HERO ────────────────────── */}
            <section
                ref={heroRef}
                aria-label="AI Visibility hero"
                className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden flex items-center justify-center min-h-[85vh]"
            >
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-badge-bg/40 rounded-full blur-[100px] opacity-60 animate-pulse pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E8F5EE]/60 rounded-full blur-[120px] opacity-60 pointer-events-none" aria-hidden="true" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1200px]">
                    <div className="flex flex-col items-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="hero-el inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#2D6A4F]/10 shadow-sm mb-8"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" aria-hidden="true" />
                            <span className="text-sm font-bold text-[#2D6A4F] tracking-wide uppercase">
                                <abbr title="Search Engine Optimization">SEO</abbr> • <abbr title="Answer Engine Optimization">AEO</abbr> • <abbr title="Generative Engine Optimization">GEO</abbr>
                            </span>
                        </motion.div>

                        <SplitTextReveal
                            as="h1"
                            className="hero-el font-serif text-4xl md:text-6xl lg:text-7xl text-[#2D6A4F] leading-[1.1] tracking-[-0.02em] mb-6"
                            type="chars" stagger={0.02} once={false} delay={0.2}
                        >
                            Generative Engine Optimization (GEO) & AI Visibility
                        </SplitTextReveal>

                        {/* Answer-First Quotable Hook */}
                        <motion.blockquote
                            id="hero-hook"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.7 }}
                            className="hero-el relative text-lg md:text-xl text-gray-600 italic font-medium mb-8 max-w-3xl px-6"
                            cite="https://www.frostrek.ai/solutions/ai-visibility"
                        >
                            <span className="absolute -left-1 top-0 text-4xl text-[#2D6A4F]/20 font-serif" aria-hidden="true">"</span>
                            Be Found Where Answers Are Born — Optimizing Your Brand for <strong className="font-medium not-italic">Google (AI Overviews)</strong>, <strong className="font-medium not-italic">ChatGPT</strong>, <strong className="font-medium not-italic">Perplexity</strong>, <strong className="font-medium not-italic">Claude</strong> & <strong className="font-medium not-italic">Gemini</strong>.
                            <span className="absolute -right-1 bottom-0 text-4xl text-[#2D6A4F]/20 font-serif" aria-hidden="true">"</span>
                        </motion.blockquote>

                        {/* Answer-First Definition (Dense, extractable 75 words) */}
                        <p
                            id="hero-definition"
                            className="hero-el text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl font-medium"
                            itemProp="description"
                        >
                            <dfn><strong className="font-semibold text-gray-700">AI Visibility</strong></dfn> is the specialized discipline of optimizing digital brand authority for both search engines and generative AI answer platforms. Today, modern buyers actively rely on conversational AI assistants like <strong className="font-semibold text-gray-700">Google (AI Overviews)</strong>, <strong className="font-semibold text-gray-700">ChatGPT</strong>, <strong className="font-semibold text-gray-700">Perplexity</strong>, <strong className="font-semibold text-gray-700">Claude</strong>, and <strong className="font-semibold text-gray-700">Gemini</strong> to synthesize answers and evaluate solutions. Frostrek AI provides unified <abbr title="Search Engine Optimization">SEO</abbr>, <abbr title="Answer Engine Optimization">AEO</abbr>, and <abbr title="Generative Engine Optimization">GEO</abbr> architectures that ensure your brand is cited and recommended as the primary industry answer.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="hero-el flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                        >
                            <Link
                                to="/audit"
                                aria-label="Claim your free AI Visibility audit delivered in 5 to 7 days"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Get Your Free AI Visibility Audit
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <a
                                href="#pricing"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-lg transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5"
                            >
                                View Pricing (From USD $300)
                            </a>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
            </section>

            {/* ────────────────────── SECTION 2 ── THE THREE PILLARS ────────────────────── */}
            <section
                ref={pillarsRef}
                aria-label="Three pillars of AI Visibility: SEO, AEO, and GEO"
                className="py-20 bg-white relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <header className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            The Three Pillars of AI Visibility
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                A unified strategy covering search engine discovery, conversational citations, and generative brand recommendations.
                            </SplitTextReveal>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {THREE_PILLARS.map((pillar) => {
                            const IconComponent = pillar.icon;
                            return (
                                <SpotlightCard
                                    key={pillar.id}
                                    spotlightColor={pillar.spotlight}
                                    className={`pillar-card flex flex-col p-8 rounded-3xl border ${pillar.border} ${pillar.bgColor} ${pillar.hoverShadow} transition-all duration-300 relative overflow-hidden group`}
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className={`w-14 h-14 rounded-2xl ${pillar.iconBg} border ${pillar.iconBorder} flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 group-hover:scale-105`}>
                                            <IconComponent className="w-7 h-7" style={{ color: pillar.accentColor }} />
                                        </div>

                                        <h3 className={`font-serif text-2xl font-bold mb-2 ${pillar.headingColor}`}>
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                                            {pillar.subtitle}
                                        </p>
                                        <p className="text-sm leading-relaxed text-gray-600 mb-8 min-h-[6rem]">
                                            {pillar.description}
                                        </p>

                                        <div className="mt-auto pt-6 border-t border-gray-100">
                                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-3">
                                                Core Capabilities
                                            </span>
                                            <ul className="space-y-2.5">
                                                {pillar.features.map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-2.5 text-xs text-gray-600 leading-snug">
                                                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#2D6A4F]" />
                                                        <span>{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 3 ── COMPARISON MATRIX ────────────────────── */}
            <section
                ref={comparisonRef}
                aria-label="SEO vs AEO vs GEO comparison"
                className="py-20 bg-brand-light-bg relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <header className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            SEO vs. AEO vs. GEO: At a Glance
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                How search engines, answer engines, and generative models evaluate and recommend your brand.
                            </SplitTextReveal>
                        </div>
                    </header>

                    {/* Desktop Comparison Table */}
                    <div className="hidden md:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="grid grid-cols-4 p-5 bg-[#F4FAF7] border-b border-[#2D6A4F]/10 text-xs font-bold uppercase tracking-wider text-[#2D6A4F]">
                            <div>Dimension</div>
                            <div>SEO (Search)</div>
                            <div>AEO (Answers)</div>
                            <div>GEO (Generative)</div>
                        </div>
                        <div className="divide-y divide-gray-100 text-sm text-gray-600">
                            {COMPARISON_MATRIX.map((row) => (
                                <div key={row.dimension} className="comp-row grid grid-cols-4 p-5 items-center hover:bg-gray-50/50 transition-colors">
                                    <div className="font-semibold text-gray-900 text-xs uppercase tracking-wider">{row.dimension}</div>
                                    <div className="pr-4">{row.seo}</div>
                                    <div className="pr-4 font-medium text-[#6D28D9]">{row.aeo}</div>
                                    <div className="font-medium text-[#166534]">{row.geo}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Tabbed View */}
                    <div className="md:hidden">
                        <div className="flex gap-2 mb-6 overflow-x-auto pb-2" role="tablist" aria-label="SEO, AEO, GEO comparison tabs">
                            {(['SEO', 'AEO', 'GEO'] as const).map((tab, i) => (
                                <button
                                    key={tab}
                                    role="tab"
                                    aria-selected={activeComparison === i}
                                    aria-controls={`comparison-panel-${tab.toLowerCase()}`}
                                    onClick={() => setActiveComparison(i)}
                                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeComparison === i
                                        ? 'bg-[#2D6A4F] text-white shadow-md'
                                        : 'bg-white border border-gray-200 text-gray-600 hover:border-[#2D6A4F]/30'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div
                            role="tabpanel"
                            id={`comparison-panel-${['seo', 'aeo', 'geo'][activeComparison]}`}
                            className="space-y-3"
                        >
                            {COMPARISON_MATRIX.map((row) => (
                                <div key={row.dimension} className="comp-row bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
                                    <div className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F]/60 mb-2">{row.dimension}</div>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {activeComparison === 0 ? row.seo : activeComparison === 1 ? row.aeo : row.geo}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 4 ── 4-STEP FRAMEWORK ────────────────────── */}
            <section
                ref={frameworkRef}
                aria-label="Frostrek 4-step AI Visibility framework"
                className="py-20 bg-white relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <header className="text-center mb-20">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Our 4-Step Optimization Framework
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                A structured engineering approach to establishing permanent brand authority across AI models.
                            </SplitTextReveal>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FRAMEWORK_STEPS.map((step) => {
                            const IconComponent = step.icon;
                            return (
                                <div
                                    key={step.step}
                                    className="fw-step flex flex-col items-center text-center p-6 md:p-8 rounded-3xl bg-brand-light-bg border border-gray-100 shadow-sm relative group hover:border-[#2D6A4F]/30 transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-2xl ${step.iconBg} border ${step.iconBorder} flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform`}>
                                        <IconComponent className="w-7 h-7" style={{ color: '#2D6A4F' }} />
                                    </div>
                                    <h3 className={`font-serif text-lg md:text-xl font-bold mb-3 ${step.headingColor}`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600 mb-6">
                                        {step.description}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="w-8 h-8 rounded-full border border-[#2D6A4F]/30 flex items-center justify-center text-[#2D6A4F] text-xs font-bold bg-[#2D6A4F]/5 shadow-sm" aria-hidden="true">
                                            {step.step}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ────────────────────── CLIENT RESULT SPOTLIGHT: AI SHIELD ────────────────────── */}
            <section
                ref={resultsRef}
                aria-label="Client results spotlight"
                className="py-20 bg-gradient-to-b from-white via-[#F4FAF7] to-white relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#2D6A4F]/20 shadow-xl shadow-[#2D6A4F]/5 relative overflow-hidden">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                                    <ShieldCheck className="w-4 h-4" />
                                    Client Case Study • 35-Day Turnaround
                                </div>
                                <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 font-bold">
                                    AI Shield OS: From Unlisted to #1 Cited Brand in 35 Days
                                </h2>
                            </div>
                            <div className="shrink-0">
                                <span className="inline-block px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold uppercase tracking-wide">
                                    Enterprise AI Advisory
                                </span>
                            </div>
                        </div>

                        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                            <div className="md:col-span-7 space-y-4">
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    Before partnering with Frostrek AI, <strong className="text-gray-900">AI Shield OS</strong> had zero visibility in conversational answer engines. When prospects asked ChatGPT and Perplexity for strategic AI operational advisory firms, competitors were cited exclusively.
                                </p>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    Frostrek engineered a complete entity knowledge graph, structured machine-readable executive bios, and implemented high-entropy answer snippets. Within 35 days of deployment, AI Shield OS captured category dominance across leading models.
                                </p>
                            </div>

                            {/* Metrics Grid */}
                            <div className="md:col-span-5 grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-center">
                                    <div className="text-2xl sm:text-3xl font-serif font-black text-[#166534] mb-1">
                                        +340%
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">
                                        AI Citation Volume (ChatGPT & Perplexity)
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] text-center">
                                    <div className="text-2xl sm:text-3xl font-serif font-black text-[#0284C7] mb-1">
                                        94%
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">
                                        Answer Engine Inclusion Rate
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#F5F3FF] border border-[#DDD6FE] text-center">
                                    <div className="text-2xl sm:text-3xl font-serif font-black text-[#6D28D9] mb-1">
                                        #1
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">
                                        Recommended Brand in Claude
                                    </div>
                                </div>
                                <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-[#FFEDD5] text-center">
                                    <div className="text-2xl sm:text-3xl font-serif font-black text-[#C2410C] mb-1">
                                        35 Days
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">
                                        To Google AI Overview Feature
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <span className="text-xs text-gray-500">
                                Verified via live conversational engine audits across 50+ standardized enterprise prompts.
                            </span>
                            <Link
                                to="/audit"
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#2D6A4F] hover:text-[#1B4332] group"
                            >
                                Benchmark your brand citations
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 5 ── TRANSPARENT PRICING ────────────────────── */}
            <section
                ref={pricingRef}
                id="pricing"
                aria-label="AI Visibility pricing"
                className="py-20 bg-white relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <header className="flex flex-col items-center text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <Zap className="w-3.5 h-3.5" />
                            Transparent Pricing
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            AI Visibility Investment
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                No rigid tiers or agency markups. Complete AI search and citation optimization starting at just USD $300 per month.
                            </SplitTextReveal>
                        </div>
                    </header>

                    <div className="max-w-5xl mx-auto bg-gradient-to-b from-white to-[#F9FCFA] rounded-[2.5rem] p-8 sm:p-10 md:p-12 border border-[#2D6A4F]/20 shadow-xl shadow-[#2D6A4F]/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F5EE]/60 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 items-center">
                            {/* Left: Pricing & CTA */}
                            <div className="lg:col-span-5 flex flex-col justify-between">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                                        Starting at USD $300
                                    </div>
                                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                        {PRICING_PLAN.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 font-medium mb-6">
                                        {PRICING_PLAN.subtitle}
                                    </p>

                                    <div className="p-6 rounded-2xl bg-white border border-[#2D6A4F]/15 shadow-sm mb-6">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
                                            {PRICING_PLAN.startingLabel}
                                        </span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl sm:text-6xl font-black font-serif text-[#2D6A4F]">
                                                {PRICING_PLAN.price}
                                            </span>
                                            <span className="text-lg font-bold text-gray-700">
                                                {PRICING_PLAN.currency}
                                            </span>
                                            <span className="text-sm font-semibold text-gray-500">
                                                {PRICING_PLAN.cadence}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Billed monthly • Flexible month-to-month • Zero long-term lock-in
                                        </p>
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                                        {PRICING_PLAN.description}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <Link
                                        to={PRICING_PLAN.ctaLink}
                                        className="w-full py-4 px-6 rounded-full font-medium text-base transition-all flex items-center justify-center gap-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white shadow-md shadow-[#2D6A4F]/20 hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        <span>{PRICING_PLAN.ctaText}</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        to={PRICING_PLAN.secondaryCtaLink}
                                        className="w-full py-3.5 px-6 rounded-full font-medium text-sm transition-all flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#2D6A4F] border border-[#2D6A4F]/20 hover:border-[#2D6A4F]/40"
                                    >
                                        <span>{PRICING_PLAN.secondaryCtaText}</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Right: Included Deliverables */}
                            <div className="lg:col-span-7 bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-[#2D6A4F]/10 shadow-sm flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                                            Everything Included in Your Starting Package:
                                        </span>
                                        <span className="text-xs font-semibold text-[#2D6A4F] bg-[#E8F5EE] px-2.5 py-0.5 rounded-full">
                                            10 Core Deliverables
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                        {PRICING_PLAN.features.map((feat, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#F4FAF7]/70 border border-[#2D6A4F]/10 hover:border-[#2D6A4F]/25 transition-colors"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                                                <span className="text-xs text-gray-700 font-medium leading-snug">
                                                    {feat}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-xl bg-[#E8F5EE] flex items-center justify-center shrink-0 text-[#2D6A4F]">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-900">Custom Enterprise Scaling</div>
                                            <div className="text-[11px] text-gray-500">Multi-region catalogs & high-velocity answer feeds scoped on request.</div>
                                        </div>
                                    </div>
                                    <Link
                                        to="/contact"
                                        className="text-xs font-bold text-[#2D6A4F] hover:text-[#1B4332] whitespace-nowrap inline-flex items-center gap-1 shrink-0"
                                    >
                                        Enterprise Inquiries <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 6 ── INTERACTIVE FAQ ────────────────────── */}
            <section
                ref={faqRef}
                id="ai-visibility-faq"
                aria-label="Frequently asked questions about AI Visibility"
                className="py-20 bg-brand-light-bg relative z-10 overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <header className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Frequently Asked Questions
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Everything you need to know about Generative Engine Optimization and our engineering approach.
                            </SplitTextReveal>
                        </div>
                    </header>

                    <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
                        {FAQS.map((faq, index) => (
                            <div
                                key={index}
                                className="faq-item"
                                itemScope
                                itemProp="mainEntity"
                                itemType="https://schema.org/Question"
                            >
                                <button
                                    id={`faq-ai-visibility-${index}`}
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className={`w-full flex items-center justify-between gap-4 p-5 md:p-6 rounded-2xl text-left transition-all duration-300 group ${openFaq === index
                                        ? 'bg-[#F4FAF7] border border-[#2D6A4F]/15 shadow-sm'
                                        : 'bg-white border border-gray-100 hover:border-[#2D6A4F]/15 hover:bg-[#F4FAF7]/50'
                                        }`}
                                    aria-expanded={openFaq === index}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <span
                                        className="font-serif font-semibold text-sm md:text-base text-gray-800 pr-4"
                                        itemProp="name"
                                    >
                                        {faq.question}
                                    </span>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index
                                        ? 'bg-[#2D6A4F] text-white rotate-0'
                                        : 'bg-gray-100 text-gray-500 group-hover:bg-[#2D6A4F]/10 group-hover:text-[#2D6A4F]'
                                        }`} aria-hidden="true">
                                        {openFaq === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <motion.div
                                    id={`faq-answer-${index}`}
                                    initial={false}
                                    animate={{
                                        height: openFaq === index ? 'auto' : 0,
                                        opacity: openFaq === index ? 1 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                    itemScope
                                    itemProp="acceptedAnswer"
                                    itemType="https://schema.org/Answer"
                                    role="region"
                                    aria-labelledby={`faq-ai-visibility-${index}`}
                                >
                                    <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2">
                                        <p
                                            className="text-sm md:text-base text-gray-600 leading-relaxed"
                                            itemProp="text"
                                        >
                                            {faq.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 7 ── FINAL HIGH-CONVERTING CTA ────────────────────── */}
            <section
                aria-label="Schedule an audit"
                className="py-20 relative overflow-hidden bg-white font-sans border-t border-[#2D6A4F]/10"
            >
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-badge-bg/80 rounded-full blur-[120px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                    <div className="max-w-4xl mx-auto bg-brand-light-bg p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-[#2D6A4F]/15 shadow-sm">
                        <div className="flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-6">
                                Delivered in 5 to 7 Days • Zero Commitment
                            </div>

                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em] mb-6"
                                type="chars" stagger={0.02} once={false}
                            >
                                Ready to Be Found Where Answers Are Born?
                            </SplitTextReveal>

                            <SplitTextReveal
                                as="p"
                                className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl leading-relaxed"
                                type="words" stagger={0.015} once={false} delay={0.4}
                            >
                                Let's audit your current AI citation footprint across Google (AI Overviews), ChatGPT, Perplexity, Claude, and Gemini. Receive a comprehensive report and a 60-day roadmap in 5 to 7 days.
                            </SplitTextReveal>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link
                                    to="/audit"
                                    aria-label="Request your AI Visibility audit report"
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                                >
                                    Get Your Free AI Audit (5-7 Days)
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    to="/contact"
                                    aria-label="Contact Frostrek AI team"
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-lg transition-all border border-[#2D6A4F]/20 hover:border-[#2D6A4F]/40 hover:bg-[#F4FAF7] hover:-translate-y-0.5"
                                >
                                    Talk to an Expert
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
