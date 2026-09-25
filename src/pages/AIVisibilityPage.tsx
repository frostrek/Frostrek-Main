import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus, Minus, Globe, MessageSquare, Sparkles, Target, Layers, FileCode, BarChart3, CheckCircle2 } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── DATA ──────────────────── */

const THREE_PILLARS = [
    {
        id: 'ai-powered-seo',
        title: 'AI-Powered SEO',
        subtitle: 'Search Engine Optimization, Reimagined',
        description: 'Next-generation search strategies that go beyond keywords. We leverage entity modeling, semantic search architecture, and topical authority graphs to position your brand as the definitive answer across Google Search, Maps, and AI Overviews.',
        features: [
            'Entity-based content architecture',
            'Semantic keyword clustering & intent mapping',
            'Technical SEO audits (Core Web Vitals, crawlability)',
            'Google Knowledge Panel optimization',
            'SERP feature targeting (Featured Snippets, AI Overviews)',
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
        description: 'Optimize your brand\'s knowledge so AI assistants — ChatGPT, Claude, Perplexity, Google Gemini — directly cite your expertise when users ask questions in your domain. AEO transforms your content into quotable, citable, authoritative answers.',
        features: [
            'Conversational query targeting & answer engineering',
            'Structured data markup (FAQ, HowTo, Q&A schema)',
            'LLM-readable content formatting',
            'AI citation monitoring & attribution tracking',
            'Knowledge base creation for AI consumption',
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
        description: 'Structure your brand\'s knowledge graph so generative AI engines accurately understand, represent, and recommend your brand. GEO ensures that when an AI synthesizes an answer, your brand is part of it.',
        features: [
            'Brand knowledge graph construction',
            'llms.txt & AI-readable feed implementation',
            'Generative citation auditing & gap analysis',
            'Entity disambiguation & authority signals',
            'Multi-engine visibility (Gemini, ChatGPT, Perplexity, Copilot)',
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
        seo: 'Rank on search engine results pages (SERPs)',
        aeo: 'Get cited as a direct answer in AI assistants',
        geo: 'Be recommended by generative AI engines',
    },
    {
        dimension: 'Target Platform',
        seo: 'Google, Bing, Yahoo',
        aeo: 'ChatGPT, Claude, Perplexity, Google SGE',
        geo: 'Gemini, Copilot, AI Overviews, SearchGPT',
    },
    {
        dimension: 'Content Format',
        seo: 'Web pages, blog posts, metadata',
        aeo: 'Structured Q&A, FAQ schema, conversational content',
        geo: 'Knowledge graphs, llms.txt, entity-rich data',
    },
    {
        dimension: 'Success Metric',
        seo: 'Rankings, organic traffic, CTR',
        aeo: 'Citation frequency, answer inclusion rate',
        geo: 'Brand mention rate in AI-generated responses',
    },
    {
        dimension: 'Key Technique',
        seo: 'Keyword optimization, backlinks, technical SEO',
        aeo: 'Answer engineering, schema markup, authority signals',
        geo: 'Entity architecture, knowledge feeds, citation auditing',
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
        title: 'Entity Architecture',
        description: 'We map your brand\'s knowledge domain, identify key entities, and structure your content around semantic relationships that both search engines and AI models understand.',
        icon: Target,
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
    },
    {
        step: '2',
        title: 'Structured Data Graphs',
        description: 'We implement comprehensive structured data — JSON-LD schema, Open Graph, semantic HTML — creating machine-readable knowledge graphs that AI crawlers can parse and cite.',
        icon: Layers,
        iconBg: 'bg-[#F5F3FF]',
        iconBorder: 'border-[#DDD6FE]',
        headingColor: 'text-[#6D28D9]',
    },
    {
        step: '3',
        title: 'LLM Feeds (llms.txt)',
        description: 'We create and maintain AI-readable feeds — including llms.txt, structured knowledge bases, and entity-rich content — that LLM crawlers can directly ingest for accurate brand representation.',
        icon: FileCode,
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
    },
    {
        step: '4',
        title: 'Generative Citation Auditing',
        description: 'We continuously monitor how AI engines represent your brand, audit citation accuracy, identify gaps, and iterate on your knowledge architecture to improve visibility over time.',
        icon: BarChart3,
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
    },
];

interface FAQ {
    question: string;
    answer: string;
}

const FAQS: FAQ[] = [
    {
        question: 'What is AI Visibility, and why does my brand need it?',
        answer: 'AI Visibility is the practice of optimizing your brand\'s digital presence so that AI-powered search engines and conversational assistants — Google AI Overviews, ChatGPT, Perplexity, Gemini — accurately find, cite, and recommend your business. As more users bypass traditional search results and rely on AI-generated answers, brands that aren\'t optimized for these engines risk becoming invisible to their audience.',
    },
    {
        question: 'How is AEO different from traditional SEO?',
        answer: 'Traditional SEO focuses on ranking web pages in search engine results pages (SERPs) through keywords, backlinks, and technical optimization. AEO (Answer Engine Optimization) goes further — it structures your content so that AI assistants can extract and cite your brand as a direct, authoritative answer. While SEO gets you on the page, AEO gets you into the answer.',
    },
    {
        question: 'What is GEO (Generative Engine Optimization)?',
        answer: 'GEO is the practice of structuring your brand\'s knowledge graph, entity relationships, and content feeds so that generative AI engines — Gemini, ChatGPT, Copilot — accurately represent and recommend your brand when synthesizing answers. It goes beyond being found to being correctly understood and recommended.',
    },
    {
        question: 'What is llms.txt and do I need one?',
        answer: 'llms.txt is an emerging standard (similar to robots.txt) that provides a structured, machine-readable summary of your website specifically for LLM crawlers. It helps AI models understand your brand, services, and expertise accurately. If you want AI engines to represent your brand correctly, implementing llms.txt is essential.',
    },
    {
        question: 'Can you help with both traditional SEO and AI search optimization?',
        answer: 'Absolutely. Our AI Visibility service is a unified approach that covers all three pillars — SEO, AEO, and GEO — under a single strategy. We don\'t treat them as separate efforts. Your entity architecture, structured data, and content strategy work together to maximize visibility across both traditional search engines and AI platforms.',
    },
    {
        question: 'How do you measure success in AI search visibility?',
        answer: 'We track multi-dimensional metrics: traditional SEO rankings and organic traffic, citation frequency in AI assistants (ChatGPT, Perplexity, Gemini), brand mention accuracy in AI-generated responses, structured data validation scores, and knowledge graph completeness. We provide regular audits and reports showing your brand\'s visibility trajectory.',
    },
    {
        question: 'How long does it take to see results from AI Visibility optimization?',
        answer: 'Technical foundations like schema markup, llms.txt, and structured data can be implemented within 2-4 weeks. SEO improvements typically show within 3-6 months. AEO and GEO citation improvements depend on crawl frequency of AI models, but most clients see measurable citation improvements within 4-8 weeks of implementation.',
    },
    {
        question: 'Is this service relevant for B2B companies, or only B2C?',
        answer: 'Both. B2B companies often benefit even more because their prospects use AI assistants for research-heavy buying decisions. When a decision-maker asks ChatGPT "Which companies offer enterprise AI agent development?" — you want your brand to be in that answer. Our strategies work for any brand that wants to be discoverable where modern buyers search.',
    },
];

/* ──────────────────── SCHEMAS ──────────────────── */

// WebPage schema — signals to both Google and LLM crawlers what this page is about
const webPageSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'AI Visibility & Search Intelligence (SEO • AEO • GEO)',
    description: 'Be found where answers are born. Frostrek optimizes your brand for Google, ChatGPT, Perplexity & Gemini through AI-Powered SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO).',
    url: 'https://www.frostrek.ai/solutions/ai-visibility',
    inLanguage: 'en',
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
        name: 'AI Visibility & Search Intelligence',
        provider: {
            '@type': 'Organization',
            name: 'Frostrek AI',
            url: 'https://www.frostrek.ai',
            sameAs: 'https://www.wikidata.org/wiki/Q140454089',
        },
    },
    speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#hero-definition', '#hero-hook'],
    },
});

// FAQ schema — enables Google rich snippets and makes FAQ extractable by AI engines
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

// Service schema — tells search engines and AI models exactly what services Frostrek offers here
const serviceSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Visibility & Search Intelligence',
    description: 'Comprehensive AI search optimization service covering SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization) to maximize brand visibility across Google, ChatGPT, Perplexity, and Gemini.',
    provider: {
        '@type': 'Organization',
        name: 'Frostrek AI',
        url: 'https://www.frostrek.ai',
        sameAs: 'https://www.wikidata.org/wiki/Q140454089',
    },
    serviceType: 'AI Search Optimization',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Visibility Services',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'AI-Powered SEO',
                    description: 'Next-gen search strategies leveraging entity modeling and semantic search to rank on Google, Bing, and AI Overviews.',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Answer Engine Optimization (AEO)',
                    description: 'Getting your brand directly cited in conversational AI responses — ChatGPT, Claude, Perplexity, Google Gemini.',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Generative Engine Optimization (GEO)',
                    description: 'Structuring brand knowledge graphs and llms.txt so generative engines accurately recommend your brand.',
                },
            },
        ],
    },
});

// HowTo schema — makes the 4-step framework extractable as a structured process by AI
const howToSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How Frostrek Optimizes Your Brand for AI Visibility',
    description: 'A 4-step framework to maximize your brand\'s visibility across search engines and AI assistants.',
    step: FRAMEWORK_STEPS.map((s) => ({
        '@type': 'HowToStep',
        position: parseInt(s.step),
        name: s.title,
        text: s.description,
    })),
});


/* ──────────────────── COMPONENT ──────────────────── */

export default function AIVisibilityPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const pillarsRef = useRef<HTMLDivElement>(null);
    const comparisonRef = useRef<HTMLDivElement>(null);
    const frameworkRef = useRef<HTMLDivElement>(null);
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
                title="AI Visibility & Search Intelligence (SEO • AEO • GEO) | Frostrek AI"
                description="Be found where answers are born. Frostrek optimizes your brand for Google, ChatGPT, Perplexity & Gemini through AI-Powered SEO, Answer Engine Optimization (AEO), and Generative Engine Optimization (GEO)."
                path="/solutions/ai-visibility"
                keywords="AI SEO, AEO, Answer Engine Optimization, GEO, Generative Engine Optimization, AI search optimization, llms.txt, ChatGPT SEO, Perplexity optimization, Gemini visibility, AI-powered SEO, search intelligence, knowledge graph optimization, structured data, schema markup, Frostrek AI"
                schema={[webPageSchema, faqSchema, serviceSchema, howToSchema]}
            />
            <CuteBackground />

            {/* Hidden semantic metadata for AI crawlers — entity anchoring */}
            <meta itemProp="name" content="AI Visibility & Search Intelligence by Frostrek AI" />
            <meta itemProp="serviceType" content="AI Search Optimization" />
            <meta itemProp="url" content="https://www.frostrek.ai/solutions/ai-visibility" />
            <div itemProp="provider" itemScope itemType="https://schema.org/Organization" className="hidden">
                <meta itemProp="name" content="Frostrek AI" />
                <meta itemProp="url" content="https://www.frostrek.ai" />
                <link itemProp="sameAs" href="https://www.wikidata.org/wiki/Q140454089" />
                <link itemProp="sameAs" href="https://www.linkedin.com/company/frostrek" />
            </div>

            {/* ═══════ SECTION 1 — ANSWER-FIRST HERO ═══════ */}
            <section
                ref={heroRef}
                aria-label="AI Visibility hero"
                className="relative pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden flex items-center justify-center min-h-[85vh]"
            >
                {/* Decorative background elements */}
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
                            AI Visibility & Search Intelligence
                        </SplitTextReveal>

                        {/* Answer-First Quotable Hook — speakable, snippet-friendly */}
                        <motion.blockquote
                            id="hero-hook"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.7 }}
                            className="hero-el relative text-lg md:text-xl text-gray-600 italic font-medium mb-8 max-w-3xl px-6"
                            cite="https://www.frostrek.ai/solutions/ai-visibility"
                        >
                            <span className="absolute -left-1 top-0 text-4xl text-[#2D6A4F]/20 font-serif" aria-hidden="true">"</span>
                            Be Found Where Answers Are Born — Optimizing Your Brand for <strong className="font-medium not-italic">Google</strong>, <strong className="font-medium not-italic">ChatGPT</strong>, <strong className="font-medium not-italic">Perplexity</strong> & <strong className="font-medium not-italic">Gemini</strong>.
                            <span className="absolute -right-1 bottom-0 text-4xl text-[#2D6A4F]/20 font-serif" aria-hidden="true">"</span>
                        </motion.blockquote>

                        {/* Answer-First Definition — AEO-structured paragraph for LLM extraction */}
                        <p
                            id="hero-definition"
                            className="hero-el text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-3xl font-medium"
                            itemProp="description"
                        >
                            <dfn><strong className="font-semibold text-gray-700">AI Visibility</strong></dfn> is the practice of optimizing your brand for both traditional search engines and AI-powered answer engines. Today, AI assistants like <strong className="font-semibold text-gray-700">ChatGPT</strong>, <strong className="font-semibold text-gray-700">Perplexity</strong>, and <strong className="font-semibold text-gray-700">Google Gemini</strong> synthesize answers from across the web — and your brand needs to be in those answers. <Link to="/about" className="text-[#2D6A4F] underline decoration-[#2D6A4F]/30 hover:decoration-[#2D6A4F] transition-colors">Frostrek AI</Link>'s AI Visibility service combines next-gen <abbr title="Search Engine Optimization">SEO</abbr>, <abbr title="Answer Engine Optimization">AEO</abbr>, and <abbr title="Generative Engine Optimization">GEO</abbr> into a unified strategy that ensures your brand is found, cited, and recommended wherever your customers search.
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="hero-el w-full sm:w-auto"
                        >
                            <Link
                                to="/schedule-demo"
                                aria-label="Schedule a free AI Visibility audit with Frostrek"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Get Your AI Visibility Audit
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
            </section>


            {/* ═══════ SECTION 2 — THE 3 SEARCH PILLARS ═══════ */}
            <section
                ref={pillarsRef}
                id="three-pillars"
                aria-label="The three pillars of modern search: SEO, AEO, and GEO"
                className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-[#2D6A4F]/5"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <header className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            The 3 Pillars of Modern Search
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Search has evolved from keywords to citations. Here's how we optimize across every axis.
                            </SplitTextReveal>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6" role="list">
                        {THREE_PILLARS.map((pillar) => {
                            const IconComponent = pillar.icon;
                            return (
                                <SpotlightCard
                                    key={pillar.id}
                                    className={`pillar-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-5 md:p-8 transition-all duration-300 ${pillar.bgColor} ${pillar.border} ${pillar.hoverShadow} hover:-translate-y-1`}
                                    spotlightColor={pillar.spotlight}
                                >
                                    <div className="relative z-10" role="listitem" id={pillar.id}>
                                        <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl border flex items-center justify-center mb-4 md:mb-6 bg-white/60 ${pillar.iconBorder} transition-transform duration-300 group-hover:scale-110 shadow-sm`} aria-hidden="true">
                                            <IconComponent className="w-5 h-5 md:w-7 md:h-7" style={{ color: pillar.accentColor }} />
                                        </div>
                                        <h3 className={`font-serif text-lg md:text-xl font-bold mb-1 ${pillar.headingColor}`}>{pillar.title}</h3>
                                        <p className="text-xs text-gray-400 font-medium mb-3"><em>{pillar.subtitle}</em></p>
                                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-5">{pillar.description}</p>

                                        {/* Feature list — semantic <ul> for crawlers */}
                                        <ul className="space-y-2" aria-label={`${pillar.title} features`}>
                                            {pillar.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-600">
                                                    <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: pillar.accentColor }} aria-hidden="true" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>

                    {/* Cross-link for internal authority — SEO best practice */}
                    <p className="text-center mt-10 text-sm text-gray-400">
                        Frostrek already practices what we preach — see our <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-[#2D6A4F] underline decoration-[#2D6A4F]/30 hover:decoration-[#2D6A4F] transition-colors font-medium">llms.txt</a> file,
                        our <Link to="/resources/faq" className="text-[#2D6A4F] underline decoration-[#2D6A4F]/30 hover:decoration-[#2D6A4F] transition-colors font-medium">schema-rich FAQ page</Link>, and
                        our <Link to="/solutions/ai-agents" className="text-[#2D6A4F] underline decoration-[#2D6A4F]/30 hover:decoration-[#2D6A4F] transition-colors font-medium">AI Agents solutions</Link>.
                    </p>
                </div>
            </section>


            {/* ═══════ SECTION 3 — INTERACTIVE COMPARISON MATRIX ═══════ */}
            <section
                ref={comparisonRef}
                id="seo-vs-aeo-vs-geo"
                aria-label="Comparison of SEO, AEO, and GEO"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <header className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            SEO vs. AEO vs. GEO
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                How search has evolved from keywords to citations — a side-by-side comparison.
                            </SplitTextReveal>
                        </div>
                    </header>

                    {/* Desktop: Semantic <table> — crawlable, accessible, AEO-extractable */}
                    <div className="hidden md:block">
                        <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <table className="w-full border-collapse" aria-label="SEO vs AEO vs GEO comparison">
                                <thead>
                                    <tr className="bg-[#2D6A4F]/5">
                                        <th scope="col" className="p-4 lg:p-6 text-left font-serif font-bold text-sm text-[#2D6A4F]">Dimension</th>
                                        <th scope="col" className="p-4 lg:p-6 text-left font-serif font-bold text-sm text-[#0284C7]">
                                            <span className="flex items-center gap-2"><Globe className="w-4 h-4" aria-hidden="true" /> <abbr title="Search Engine Optimization">SEO</abbr></span>
                                        </th>
                                        <th scope="col" className="p-4 lg:p-6 text-left font-serif font-bold text-sm text-[#6D28D9]">
                                            <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" aria-hidden="true" /> <abbr title="Answer Engine Optimization">AEO</abbr></span>
                                        </th>
                                        <th scope="col" className="p-4 lg:p-6 text-left font-serif font-bold text-sm text-[#166534]">
                                            <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" aria-hidden="true" /> <abbr title="Generative Engine Optimization">GEO</abbr></span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {COMPARISON_MATRIX.map((row, i) => (
                                        <tr
                                            key={row.dimension}
                                            className={`comp-row transition-colors hover:bg-[#F4FAF7]/50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'} ${i < COMPARISON_MATRIX.length - 1 ? 'border-b border-gray-100' : ''}`}
                                        >
                                            <th scope="row" className="p-4 lg:p-6 font-semibold text-sm text-gray-800 text-left">{row.dimension}</th>
                                            <td className="p-4 lg:p-6 text-sm text-gray-600 leading-relaxed">{row.seo}</td>
                                            <td className="p-4 lg:p-6 text-sm text-gray-600 leading-relaxed">{row.aeo}</td>
                                            <td className="p-4 lg:p-6 text-sm text-gray-600 leading-relaxed">{row.geo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Card View — still has all content available for crawlers */}
                    <div className="md:hidden">
                        {/* Tab selector */}
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

                        {/* Hidden full table for mobile crawlability — all comparison data is always in the DOM */}
                        <div className="sr-only" aria-hidden="true">
                            <table aria-label="Full SEO vs AEO vs GEO comparison (screen reader)">
                                <thead>
                                    <tr><th>Dimension</th><th>SEO</th><th>AEO</th><th>GEO</th></tr>
                                </thead>
                                <tbody>
                                    {COMPARISON_MATRIX.map((row) => (
                                        <tr key={row.dimension}>
                                            <td>{row.dimension}</td>
                                            <td>{row.seo}</td>
                                            <td>{row.aeo}</td>
                                            <td>{row.geo}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>


            {/* ═══════ SECTION 4 — FROSTREK'S 4-STEP OPTIMIZATION FRAMEWORK ═══════ */}
            <section
                id="optimization-framework"
                aria-label="Frostrek's 4-step AI visibility optimization framework"
                className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden border-t border-[#2D6A4F]/5"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
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
                                A structured approach to making your brand the definitive answer — everywhere.
                            </SplitTextReveal>
                        </div>
                    </header>

                    <div ref={frameworkRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative" role="list">
                        {/* Connecting dashed line (desktop) */}
                        <div className="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] -z-10 border-t border-dashed border-[#2D6A4F]/30" aria-hidden="true" />

                        {FRAMEWORK_STEPS.map((step) => {
                            const IconComponent = step.icon;
                            return (
                                <div key={step.step} className="fw-step flex flex-col items-center text-center relative group" role="listitem">
                                    {/* Icon circle */}
                                    <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full ${step.iconBg} border ${step.iconBorder} flex items-center justify-center mb-4 md:mb-6 shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md relative z-10`} aria-hidden="true">
                                        <IconComponent className="w-7 h-7 md:w-10 md:h-10 opacity-70" style={{ color: '#2D6A4F' }} />
                                    </div>
                                    <h3 className={`font-serif text-[15px] sm:text-lg md:text-xl font-bold mb-2 md:mb-3 ${step.headingColor}`}>
                                        <span className="sr-only">Step {step.step}: </span>{step.title}
                                    </h3>
                                    <p className="text-[13px] sm:text-sm leading-relaxed text-gray-500 px-1 sm:px-2 mb-4 md:mb-6 min-h-[5rem] md:min-h-[80px]">{step.description}</p>

                                    {/* Step number badge */}
                                    <div className="mt-auto flex flex-col items-center gap-3 w-full">
                                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-[#2D6A4F]/30 flex items-center justify-center text-[#2D6A4F] text-xs md:text-sm font-bold bg-[#2D6A4F]/5 shadow-sm" aria-hidden="true">
                                            {step.step}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* ═══════ SECTION 5 — INTERACTIVE FAQ ═══════ */}
            <section
                ref={faqRef}
                id="ai-visibility-faq"
                aria-label="Frequently asked questions about AI Visibility"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden"
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
                                Everything you need to know about AI Visibility and how we approach it.
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


            {/* ═══════ SECTION 6 — HIGH-CONVERTING CTA ═══════ */}
            <section
                aria-label="Schedule a consultation"
                className="py-16 lg:py-24 relative overflow-hidden bg-brand-light-bg font-sans border-t border-[#2D6A4F]/5"
            >
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-badge-bg/80 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#E8F5EE]/60 rounded-full blur-[100px]" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-10 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em] mb-6"
                                type="chars" stagger={0.02} once={false}
                            >
                                Ready to Be Found Where Answers Are Born?
                            </SplitTextReveal>

                            <SplitTextReveal
                                as="p"
                                className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl"
                                type="words" stagger={0.015} once={false} delay={0.4}
                            >
                                Let's audit your current AI visibility and build a strategy that puts your brand in the answers — across Google, ChatGPT, Perplexity, and Gemini.
                            </SplitTextReveal>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <Link
                                    to="/schedule-demo"
                                    aria-label="Schedule your AI Visibility audit with Frostrek"
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                                >
                                    Schedule Your AI Visibility Audit
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    to="/contact"
                                    aria-label="Contact Frostrek AI to talk to an expert"
                                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#2D6A4F] rounded-full font-medium text-lg transition-all border border-[#2D6A4F]/20 hover:border-[#2D6A4F]/40 hover:bg-[#F4FAF7] hover:-translate-y-0.5"
                                >
                                    Talk to an Expert
                                </Link>
                            </motion.div>

                            {/* Related solutions cross-links — builds internal link authority */}
                            <nav aria-label="Related Frostrek solutions" className="mt-10 pt-8 border-t border-gray-100 w-full">
                                <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wider">Related Solutions</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <Link to="/solutions/ai-agents" className="text-sm text-gray-500 hover:text-[#2D6A4F] transition-colors px-3 py-1.5 rounded-full border border-gray-100 hover:border-[#2D6A4F]/20">AI Agents</Link>
                                    <Link to="/solutions/voice-ai" className="text-sm text-gray-500 hover:text-[#2D6A4F] transition-colors px-3 py-1.5 rounded-full border border-gray-100 hover:border-[#2D6A4F]/20">Voice AI</Link>
                                    <Link to="/solutions/llm-model-training" className="text-sm text-gray-500 hover:text-[#2D6A4F] transition-colors px-3 py-1.5 rounded-full border border-gray-100 hover:border-[#2D6A4F]/20">LLM Model Training</Link>
                                    <Link to="/products/frosty-agent" className="text-sm text-gray-500 hover:text-[#2D6A4F] transition-colors px-3 py-1.5 rounded-full border border-gray-100 hover:border-[#2D6A4F]/20">Frosty Agent</Link>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
