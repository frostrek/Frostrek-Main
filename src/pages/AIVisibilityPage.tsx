import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
    Layers, 
    CheckCircle2, 
    ShieldCheck, 
    ShieldAlert,
    Check,
    X,
    HelpCircle,
    Building2,
    Calendar,
    FileSpreadsheet,
    Compass,
    Search,
    SlidersHorizontal,
    Cpu
} from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';
import { 
    PILLARS_OVERVIEW, 
    ALL_36_SERVICES, 
    ALL_26_FAQS, 
    PROCESS_STAGES, 
    INDUSTRIES_SERVED
} from '../data/aiVisibilityData';

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
            '@id': 'https://www.frostrek.ai/solutions/ai-visibility#service',
            name: 'SEO, GEO, AEO and Advanced Search Visibility Services',
            serviceType: [
                'Technical SEO',
                'On-Page SEO',
                'SEO Content Creation',
                'Off-Page SEO',
                'Local SEO',
                'E-commerce SEO',
                'Generative Engine Optimization (GEO)',
                'Answer Engine Optimization (AEO)',
                'AI Search Visibility Audit',
                'AI Search Monitoring',
                'International SEO and GEO',
                'Search Analytics and CRO',
            ],
            provider: {
                '@id': 'https://www.frostrek.ai/#organization',
            },
            areaServed: [
                'India',
                'United States',
                'United Kingdom',
                'United Arab Emirates',
            ],
            url: 'https://www.frostrek.ai/solutions/ai-visibility',
            description: 'Audit, implementation and monthly management for technical SEO, content, local and e-commerce SEO, GEO, AEO, AI search monitoring, reporting and related advanced optimisation. Custom pricing based on scope.',
        },
        {
            '@type': 'WebPage',
            '@id': 'https://www.frostrek.ai/solutions/ai-visibility#webpage',
            url: 'https://www.frostrek.ai/solutions/ai-visibility',
            name: 'SEO, GEO & AEO Services for Google and AI Search',
            mainEntity: {
                '@id': 'https://www.frostrek.ai/solutions/ai-visibility#service',
            },
        },
    ],
});

/* ────────────────────────────────── FAQ THEMES & CATEGORIES ────────────────────────────────── */

// 5 rotating color themes matching FAQPage.tsx styling (Blue, Green, Pink, Orange, Purple)
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

const FAQ_CATEGORIES = [
    { id: 'all', label: 'All Questions', count: 26 },
    { id: 'seo', label: 'SEO & Technical', count: 8 },
    { id: 'geo', label: 'GEO & AI Citations', count: 6 },
    { id: 'aeo', label: 'AEO & Direct Answers', count: 5 },
    { id: 'governance', label: 'Pricing & Governance', count: 7 },
];

const FAQ_CATEGORY_MAP: Record<number, 'seo' | 'geo' | 'aeo' | 'governance'> = {
    1: 'aeo',
    2: 'aeo',
    3: 'seo',
    4: 'seo',
    5: 'seo',
    6: 'seo',
    7: 'seo',
    8: 'geo',
    9: 'geo',
    10: 'geo',
    11: 'geo',
    12: 'geo',
    13: 'geo',
    14: 'aeo',
    15: 'aeo',
    16: 'aeo',
    17: 'seo',
    18: 'seo',
    19: 'seo',
    20: 'governance',
    21: 'governance',
    22: 'governance',
    23: 'governance',
    24: 'governance',
    25: 'governance',
    26: 'governance',
};

const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_26_FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
});

/* ────────────────────────────────── COMPONENT ────────────────────────────────── */

export default function AIVisibilityPage() {
    const heroRef = useRef<HTMLDivElement>(null);
    const pillarsRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const trustRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);

    // Interactive states
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'seo' | 'geo' | 'aeo' | 'advanced'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [faqCategory, setFaqCategory] = useState<string>('all');
    const [faqSearch, setFaqSearch] = useState<string>('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            if (heroRef.current) {
                gsap.fromTo(
                    '.hero-el',
                    { y: 25, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out', delay: 0.15 }
                );
            }

            // Pillar cards
            const pillarCards = pillarsRef.current?.querySelectorAll('.pillar-card');
            if (pillarCards) {
                gsap.fromTo(pillarCards, { y: 35, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Process steps
            const procSteps = processRef.current?.querySelectorAll('.proc-step');
            if (procSteps) {
                gsap.fromTo(procSteps, { y: 30, opacity: 0 }, {
                    y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: processRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
                });
            }

            // Trust section
            if (trustRef.current) {
                gsap.fromTo(
                    trustRef.current.querySelector('.trust-card'),
                    { scale: 0.96, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out',
                      scrollTrigger: { trigger: trustRef.current, start: 'top 85%' } }
                );
            }
        });
        return () => ctx.revert();
    }, []);

    // Filter services based on category tab & search
    const filteredServices = useMemo(() => {
        return ALL_36_SERVICES.filter((svc) => {
            const matchesCat = selectedCategory === 'all' || svc.category === selectedCategory;
            const matchesSearch = searchQuery === '' || 
                svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                svc.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                svc.activities.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    // Filter FAQs based on category tab & search
    const filteredFaqs = useMemo(() => {
        return ALL_26_FAQS.filter((faq) => {
            const matchesCat = faqCategory === 'all' || FAQ_CATEGORY_MAP[faq.id] === faqCategory;
            const matchesSearch = faqSearch.trim() === '' || 
                faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [faqCategory, faqSearch]);

    return (
        <article
            className="bg-brand-light-bg min-h-screen pt-24 font-body text-primary overflow-x-hidden"
            itemScope
            itemType="https://schema.org/Service"
        >
            <SEO
                title="SEO, GEO & AEO Services | AI Search Visibility | Frostrek AI"
                description="SEO, GEO and AEO services for Google and AI search: technical SEO, content, answer optimisation, audits and monthly management. Request a free initial audit."
                path="/solutions/ai-visibility"
                keywords="SEO GEO AEO services, generative engine optimization services, answer engine optimization agency, AI visibility audit, technical SEO, React Next.js SEO"
                schema={[graphSchema, faqSchema]}
            />
            <CuteBackground />

            {/* Hidden semantic metadata for AI crawlers */}
            <meta itemProp="name" content="SEO, GEO & AEO Services for Google and AI Search | Frostrek AI" />
            <meta itemProp="serviceType" content="Search Engine, Generative Engine & Answer Engine Optimization" />
            <meta itemProp="url" content="https://www.frostrek.ai/solutions/ai-visibility" />

            {/* ────────────────────── SECTION 1 ── HERO (Orders 1-5) ────────────────────── */}
            <section
                ref={heroRef}
                aria-label="SEO, GEO & AEO services hero"
                className="relative pt-6 sm:pt-8 pb-12 sm:pb-16 overflow-hidden flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]"
            >
                {/* Ambient glow backdrops */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-badge-bg/40 rounded-full blur-[100px] opacity-60 pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#E8F5EE]/60 rounded-full blur-[120px] opacity-60 pointer-events-none" aria-hidden="true" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1200px]">
                    <div className="flex flex-col items-center max-w-4xl mx-auto">
                        
                        {/* Order 1: Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="hero-el inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#2D6A4F]/15 shadow-sm mb-4"
                        >
                            <div className="w-2 h-2 rounded-full bg-[#2D6A4F] animate-pulse" aria-hidden="true" />
                            <span className="text-xs sm:text-sm font-bold text-[#2D6A4F] tracking-wide uppercase">
                                SEO • GEO • AEO • AI SEARCH VISIBILITY
                            </span>
                        </motion.div>

                        {/* Eyebrow descriptor: Practical search optimisation */}
                        <p className="hero-el text-xs sm:text-sm font-medium text-gray-500 mb-3 tracking-wide">
                            Practical search optimisation for Google, AI answers and the questions real customers ask.
                        </p>

                        {/* Order 2: Only H1 on the page */}
                        <SplitTextReveal
                            as="h1"
                            className="hero-el font-serif text-3xl sm:text-5xl md:text-6xl text-[#2D6A4F] leading-[1.12] tracking-[-0.02em] mb-4 sm:mb-5"
                            type="chars" stagger={0.015} once={false} delay={0.15}
                        >
                            SEO, GEO & AEO Services for Google and AI Search
                        </SplitTextReveal>

                        {/* Order 3: Subhead */}
                        <div className="hero-el max-w-3xl mb-8">
                            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 font-serif">
                                From site audit to implementation and monthly improvement
                            </h2>
                            <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-normal">
                                Build a more discoverable, useful and credible online presence. Frostrek AI brings together technical SEO, clear answer-focused content, AI search research and ongoing measurement for businesses in India and international markets. Every engagement has a documented scope, defined owners and realistic reporting.
                            </p>
                        </div>

                        {/* Orders 4 & 5: Primary & Secondary CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="hero-el flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-center justify-center"
                        >
                            {/* Order 4: Exact Approved Primary CTA */}
                            <Link
                                to="/audit"
                                aria-label="Request a Free SEO & AI Visibility Audit"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#2D6A4F] text-white rounded-full font-medium text-sm sm:text-base transition-all hover:bg-[#1B4332] shadow-[0_8px_25px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_35px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Request a Free SEO & AI Visibility Audit
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            {/* Order 5: Exact Approved Secondary CTA */}
                            <Link
                                to="/contact"
                                aria-label="Get a Custom Quote"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#2D6A4F] rounded-full font-medium text-sm sm:text-base transition-all border border-[#2D6A4F]/20 hover:bg-[#F4FAF7] hover:-translate-y-0.5 shadow-sm"
                            >
                                Get a Custom Quote
                            </Link>
                        </motion.div>

                        <p className="hero-el text-[11px] sm:text-xs text-gray-500 mt-4 max-w-xl">
                            Preliminary review of discoverability and sampled AI prompts • Custom scope • No fixed lock-ins
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
            </section>

            {/* ────────────────────── SECTION 2 ── BUYER PROBLEM (Order 6) ────────────────────── */}
            <section
                aria-label="The search discoverability challenge"
                className="py-16 bg-white relative z-10 border-y border-gray-100"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="bg-gradient-to-br from-white via-[#F9FCFA] to-[#F0FDF4]/40 rounded-3xl p-8 sm:p-12 border border-[#2D6A4F]/15 shadow-sm">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <Compass className="w-3.5 h-3.5" />
                            The Real Discoverability Challenge
                        </div>
                        
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-4 leading-snug">
                            Being Online Is Not the Same as Being Found
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mt-6">
                            <div className="md:col-span-8 text-gray-600 text-sm sm:text-base leading-relaxed space-y-3">
                                <p>
                                    Your website might have useful services yet remain difficult for Google to crawl, thin on buyer-focused answers or inconsistently represented across business directories.
                                </p>
                                <p>
                                    AI-generated answers in <strong className="text-gray-900">ChatGPT, Perplexity, Gemini and Google AI Overviews</strong> add another layer where prospective buyers research providers. The practical response is to fix technical gaps, publish accurate information and measure what happens, rather than chase unproven hacks or manufactured rankings.
                                </p>
                            </div>
                            <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3 text-xs">
                                <div className="font-bold text-gray-900 uppercase tracking-wider text-[11px] pb-2 border-b border-gray-100">
                                    Common Search Roadblocks
                                </div>
                                <div className="flex items-start gap-2 text-gray-600">
                                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    <span>Hidden JS rendering & broken crawl paths</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-600">
                                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    <span>Thin pages lacking direct buyer answers</span>
                                </div>
                                <div className="flex items-start gap-2 text-gray-600">
                                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                    <span>Conflicting company facts across directories</span>
                                </div>
                                <div className="flex items-start gap-2 text-[#2D6A4F] font-medium pt-1">
                                    <Check className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                                    <span>Solved via unified technical & editorial rigor</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 3 ── SERVICE OVERVIEW: 3 PILLARS (Orders 7-10) ────────────────────── */}
            <section
                ref={pillarsRef}
                aria-label="One connected strategy: SEO, GEO and AEO"
                className="py-20 relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <header className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <Layers className="w-3.5 h-3.5" />
                            Unified Search Ecosystem
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="block w-full font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.015} once={false}
                        >
                            One Connected Strategy: SEO, GEO and AEO
                        </SplitTextReveal>
                        <div className="mt-4 max-w-3xl mx-auto">
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                SEO improves how people and search engines discover your pages. AEO improves how clearly your content answers buyer questions. GEO evaluates and strengthens the public information that AI-powered search experiences may use. The three overlap: accessible pages, original factual content, accurate brand information and responsible measurement form the common foundation.
                            </p>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PILLARS_OVERVIEW.filter(p => p.id !== 'advanced').map((pillar) => {
                            const IconComp = pillar.iconName === 'Globe' ? Globe : pillar.iconName === 'Sparkles' ? Sparkles : MessageSquare;
                            return (
                                <SpotlightCard
                                    key={pillar.id}
                                    className={`pillar-card flex flex-col p-8 rounded-3xl border ${pillar.borderColor} ${pillar.bgColor} transition-all duration-300 relative overflow-hidden group shadow-sm hover:shadow-md`}
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-xs">
                                            <IconComp className="w-6 h-6" style={{ color: pillar.accentColor }} />
                                        </div>

                                        <h3 className="font-serif text-2xl font-bold mb-1 text-gray-900">
                                            {pillar.title}
                                        </h3>
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
                                            {pillar.subtitle}
                                        </p>
                                        <p className="text-sm leading-relaxed text-gray-600 mb-6">
                                            {pillar.description}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-gray-200/60">
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                                                Primary Ecosystem:
                                            </span>
                                            <p className="text-xs font-medium text-gray-700">
                                                {pillar.focus}
                                            </p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 4 ── COMPLETE 36 SERVICES CATALOGUE (Orders 11-43) ────────────────────── */}
            <section
                ref={servicesRef}
                id="services-catalogue"
                aria-label="Complete 36 SEO, GEO and AEO services"
                className="py-20 relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <header className="flex flex-col items-center text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                            Approved Delivery Framework
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.015} once={false}
                        >
                            Complete 36-Service Delivery Catalogue
                        </SplitTextReveal>
                        <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
                            Our programme includes 36 practical workstreams across SEO, GEO, AEO and Advanced Engineering. Your plan prioritises the work that makes the biggest difference for your domain rather than treating every checklist item as a mandatory recurring charge.
                        </p>

                        {/* Interactive Category Tabs & Search Bar */}
                        <div className="mt-8 flex flex-col items-center gap-4 w-full max-w-4xl">
                            {/* Category Filter Pills */}
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 bg-[#F4FAF7] p-1.5 rounded-2xl sm:rounded-full border border-gray-200/90 shadow-2xs max-w-full overflow-x-auto">
                                {[
                                    { id: 'all', label: 'All Services', count: 36 },
                                    { id: 'seo', label: 'SEO', count: 6 },
                                    { id: 'geo', label: 'GEO', count: 10 },
                                    { id: 'aeo', label: 'AEO', count: 10 },
                                    { id: 'advanced', label: 'Advanced', count: 10 },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setSelectedCategory(tab.id as any)}
                                        className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                                            selectedCategory === tab.id
                                                ? 'bg-[#2D6A4F] text-white shadow-xs'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'
                                        }`}
                                    >
                                        <span>{tab.label}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                                            selectedCategory === tab.id
                                                ? 'bg-white/20 text-white'
                                                : 'bg-gray-200/70 text-gray-600'
                                        }`}>
                                            {tab.count}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Centered Search Bar */}
                            <div className="relative w-full max-w-md">
                                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search 36 services by keyword, activity or deliverable..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-8 py-2.5 text-xs rounded-full border border-gray-200 bg-white focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all text-gray-800 placeholder-gray-400 shadow-2xs"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs w-4 h-4 rounded-full flex items-center justify-center"
                                        title="Clear search"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>
                    </header>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredServices.map((service) => {
                                const badgeColor = 
                                    service.category === 'seo' ? 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]' :
                                    service.category === 'geo' ? 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]' :
                                    service.category === 'aeo' ? 'bg-[#F5F3FF] text-[#6D28D9] border-[#DDD6FE]' :
                                    'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5]';

                                return (
                                    <motion.div
                                        key={service.id}
                                        layout
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.25 }}
                                        className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-[#2D6A4F]/30 hover:shadow-md transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border ${badgeColor}`}>
                                                    <span>{service.code}</span>
                                                    <span className="opacity-40">•</span>
                                                    <span className="uppercase">{service.category}</span>
                                                </span>
                                                <span className="text-[10px] font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-md border border-gray-100">
                                                    {service.stage}
                                                </span>
                                            </div>

                                            <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 leading-snug">
                                                {service.name}
                                            </h3>

                                            <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                                                {service.shortDesc} <span className="text-gray-400 font-normal">Every project is scoped to your website, access and business goals.</span>
                                            </p>

                                            <div className="space-y-3 pt-3 border-t border-gray-100 text-xs">
                                                <div>
                                                    <span className="font-bold text-gray-800 block text-[11px] mb-1">
                                                        Core Activities:
                                                    </span>
                                                    <p className="text-gray-600 text-[11px] leading-relaxed">
                                                        {service.activities}
                                                    </p>
                                                </div>

                                                <div>
                                                    <span className="font-bold text-gray-800 block text-[11px] mb-1">
                                                        Client Deliverable:
                                                    </span>
                                                    <p className="text-gray-600 text-[11px] leading-relaxed">
                                                        {service.deliverable}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-gray-100">
                                            <div className="text-[10px] text-gray-500 italic flex items-start gap-1.5">
                                                <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                                                <span>Guardrail: {service.guardrail}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {filteredServices.length === 0 && (
                        <div className="text-center py-12 text-gray-500 text-sm">
                            No services found matching "{searchQuery}". Try another keyword or switch category tabs.
                        </div>
                    )}
                </div>
            </section>

            {/* ────────────────────── SECTION 5 ── INDUSTRIES SERVED (Order 44) ────────────────────── */}
            <section
                aria-label="Industries we work with"
                className="py-16 relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <Building2 className="w-3.5 h-3.5" />
                            Market Applicability
                        </div>
                        <h2 className="block w-full font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-3">
                            Who We Work With
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                            Our approach can be scoped for SaaS and B2B technology, professional services, local businesses, education and study-abroad providers, healthcare and clinics, real estate, Shopify/WooCommerce stores and other D2C brands. Industry examples describe potential work, not client endorsements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {INDUSTRIES_SERVED.map((ind, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
                                <h3 className="font-serif font-bold text-base text-gray-900 mb-2">
                                    {ind.name}
                                </h3>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                    {ind.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 6 ── 3-STAGE DELIVERY PROCESS (Orders 45-48) ────────────────────── */}
            <section
                ref={processRef}
                aria-label="A clear delivery process"
                className="py-20 relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <header className="flex flex-col items-center text-center mb-16 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <Calendar className="w-3.5 h-3.5" />
                            Structured Execution
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="block w-full font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.015} once={false}
                        >
                            A Clear Delivery Process
                        </SplitTextReveal>
                        <p className="text-sm sm:text-base text-gray-600 mt-4 leading-relaxed">
                            Every project starts by understanding your website, audience and permissions. We provide staged deliverables so your team can see what was found, what changed, and what evidence supports the next decision.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PROCESS_STAGES.map((stg) => (
                            <div
                                key={stg.step}
                                className="proc-step bg-[#F9FCFA] rounded-3xl p-8 border border-[#2D6A4F]/15 flex flex-col justify-between shadow-xs hover:shadow-md transition-all"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-2xl bg-[#E8F5EE] text-[#2D6A4F] font-serif font-bold text-lg flex items-center justify-center mb-6">
                                        {stg.step}
                                    </div>
                                    <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">
                                        {stg.title}
                                    </h3>
                                    <p className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-4">
                                        {stg.subtitle}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                                        {stg.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-2">
                                        Staged Deliverables:
                                    </span>
                                    <ul className="space-y-2">
                                        {stg.deliverables.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-xs text-gray-600 leading-snug">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 7 ── DELIVERABLES MATRIX (Order 49) ────────────────────── */}
            <section
                aria-label="What you receive"
                className="py-16 relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="flex flex-col items-center text-center mb-10 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                            Concrete Work Artifacts
                        </div>
                        <h2 className="block w-full font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-3">
                            What You Receive
                        </h2>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                            Depending on the agreed engagement: an issue-ranked SEO audit; keyword-to-page map; page copy and FAQs; developer implementation tickets; accurate schema; off-page opportunity register; market-specific GEO prompt set; citation capture log; analytics dashboard; and a recurring review with named owners.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {[
                            'Issue-Ranked SEO Audit',
                            'Keyword-to-Page Map',
                            'Approved Copy & FAQs',
                            'Developer QA Tickets',
                            'Accurate Schema JSON-LD',
                            'Off-Page Register',
                            '50–200 GEO Prompt Set',
                            'Citation Capture Log',
                            'Custom Analytics Board',
                            'CRM Lead Event Map',
                            'Consent-Aware QA',
                            'Named Owner Cadence',
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200 text-center text-xs font-medium text-gray-700 shadow-xs flex items-center justify-center">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 8 ── MARKETS & MEASUREMENT (Orders 50-51) ────────────────────── */}
            <section
                aria-label="Markets and measurement"
                className="py-16 relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Order 50: Markets */}
                        <div className="p-8 rounded-3xl bg-[#F9FCFA] border border-gray-200">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                                <Globe className="w-3.5 h-3.5" />
                                Regional Realities
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                                Local Search and International Visibility
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
                                We start with the market your buyers actually use. An Indian service provider may need local Maps and English/Hindi query research, while a US SaaS website or UAE clinic may require different terminology, locations and legal checks. We choose language and site structure based on distinct user needs without mass-generating near-identical country URLs.
                            </p>
                        </div>

                        {/* Order 51: Measurement */}
                        <div className="p-8 rounded-3xl bg-[#F9FCFA] border border-gray-200">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                                <Cpu className="w-3.5 h-3.5" />
                                Data-Backed Baselines
                            </div>
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                                Measure Search Visibility and Business Outcomes
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed space-y-2">
                                We establish a baseline before making performance claims. Typical SEO metrics include impressions, organic clicks, query coverage, index status, Core Web Vitals and qualified enquiries. GEO reports use a dated, defined prompt sample: observed brand mentions, cited URLs and competitor presence. AEO reports focus on question-led content and related search/answer observations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 9 ── CUSTOM PRICING (Order 52) ────────────────────── */}
            <section
                id="pricing"
                aria-label="Custom pricing and clear deliverables"
                className="py-20 relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="bg-gradient-to-b from-white to-[#F4FAF7] rounded-[2.5rem] p-8 sm:p-12 border border-[#2D6A4F]/20 shadow-lg relative overflow-hidden">
                        <div className="flex flex-col items-center max-w-3xl mx-auto text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                                <SlidersHorizontal className="w-3.5 h-3.5" />
                                Transparent Engagements
                            </div>
                            <h2 className="block w-full font-serif text-3xl sm:text-4xl text-gray-900 font-bold mb-4">
                                Custom Pricing, Clear Deliverables
                            </h2>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                Pricing depends on the number of websites and priority URLs, market and language scope, technical condition, content and integration requirements, authority work and the monthly review cadence. We provide a written proposal with the deliverables, exclusions, timeline and approval points rather than a one-size-fits-all package.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-center">
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
                                <div className="text-sm font-bold text-gray-900 mb-1">Tailored Scope</div>
                                <div className="text-xs text-gray-500">Pay only for modules relevant to your domain footprint.</div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
                                <div className="text-sm font-bold text-gray-900 mb-1">Defined Milestones</div>
                                <div className="text-xs text-gray-500">Every sprint backed by reviewable code and copy deliverables.</div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-2xs">
                                <div className="text-sm font-bold text-gray-900 mb-1">Zero Lock-In</div>
                                <div className="text-xs text-gray-500">Monthly retainers with named owners and clear off-ramps.</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/audit"
                                className="w-full sm:w-auto px-8 py-3.5 bg-[#2D6A4F] text-white rounded-full font-medium text-sm sm:text-base hover:bg-[#1B4332] transition-all text-center shadow-md shadow-[#2D6A4F]/20"
                            >
                                Request a Free SEO & AI Visibility Audit
                            </Link>
                            <Link
                                to="/contact"
                                className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#2D6A4F] rounded-full font-medium text-sm sm:text-base border border-[#2D6A4F]/30 hover:bg-gray-50 transition-all text-center"
                            >
                                Get a Custom Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 10 ── TRUST & GUARDRAILS (Order 53: Replaces AI Shield) ────────────────────── */}
            <section
                ref={trustRef}
                aria-label="What we do not promise"
                className="py-16 relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="trust-card bg-[#FBFDFB] rounded-3xl p-8 sm:p-12 border border-[#2D6A4F]/20 relative overflow-hidden">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 border border-red-200">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            Honest Agency Commitments
                        </div>
                        
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-gray-900 font-bold mb-4">
                            What We Do Not Promise
                        </h2>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                            Search engines and AI platforms decide what they crawl, rank, cite and recommend. We do not guarantee a top Google position, a ChatGPT mention, a featured snippet or revenue growth. We do not present unverified case studies or publish paid spam links. Instead, we document responsible implementation and observable progress.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-100">
                                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-gray-600">
                                    <strong className="text-gray-900 block mb-0.5">No Guaranteed AI Placements</strong>
                                    External LLMs choose citations independently based on dynamic model versions and user prompts.
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-100">
                                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-gray-600">
                                    <strong className="text-gray-900 block mb-0.5">No Unverified Outcome Claims</strong>
                                    Every metric shared comes from client-specific baselines, verified GSC data and dated prompt logs.
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-100">
                                <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                <div className="text-xs text-gray-600">
                                    <strong className="text-gray-900 block mb-0.5">No Paid Link Farms or PBNs</strong>
                                    We exclusively support ethical, publisher-first outreach and genuine brand mentions.
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-gray-100">
                                <Check className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
                                <div className="text-xs text-gray-600">
                                    <strong className="text-gray-900 block mb-0.5">Documented Implementation</strong>
                                    Clear developer tickets, validated schema markup, and auditable prompt observation histories.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ────────────────────── SECTION 11 ── INTERACTIVE 26 FAQS (Tab 5) ────────────────────── */}
            <section
                ref={faqRef}
                id="ai-visibility-faq"
                aria-label="Frequently asked questions about SEO, GEO and AEO"
                className="py-20 relative z-10"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <header className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Direct Answers
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="block w-full font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.015} once={false}
                        >
                            26 Common Questions & Honest Answers
                        </SplitTextReveal>
                        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-500 mt-4 leading-relaxed">
                            Practical, human-useful answers regarding search engines, generative AI citations, and our implementation process.
                        </p>

                        {/* Category Filter Tabs */}
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
                            {FAQ_CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setFaqCategory(cat.id);
                                        setOpenFaq(null);
                                    }}
                                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                                        faqCategory === cat.id
                                            ? 'bg-[#2D6A4F] text-white shadow-xs'
                                            : 'bg-white text-gray-600 border border-gray-200/90 hover:border-[#2D6A4F]/40 hover:text-gray-900'
                                    }`}
                                >
                                    {cat.label} <span className="opacity-75 ml-1">({cat.count})</span>
                                </button>
                            ))}
                        </div>

                        {/* Search Bar matching FAQPage.tsx */}
                        <div className="relative w-full max-w-md mx-auto mt-4">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search questions..."
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
                    </header>

                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                            <p className="text-gray-500 text-sm">No questions match "{faqSearch}". Try different keywords or switch categories.</p>
                        </div>
                    ) : (
                        <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                            {filteredFaqs.map((faq, index) => {
                                const isActive = openFaq === faq.id;
                                const theme = FAQ_THEMES[(faq.id - 1) % FAQ_THEMES.length];

                                return (
                                    <motion.div
                                        key={faq.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
                                        className={`rounded-2xl border transition-all duration-500 bg-white group ${theme.border} ${theme.hoverBorder} ${
                                            isActive ? `${theme.activeBorder} ${theme.shadow}` : 'hover:shadow-lg'
                                        }`}
                                        itemScope
                                        itemProp="mainEntity"
                                        itemType="https://schema.org/Question"
                                    >
                                        <button
                                            id={`faq-ai-visibility-${faq.id}`}
                                            onClick={() => setOpenFaq(isActive ? null : faq.id)}
                                            className="w-full px-6 py-5 md:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                                            aria-expanded={isActive}
                                            aria-controls={`faq-answer-${faq.id}`}
                                        >
                                            <div className="flex items-center gap-4 md:gap-6">
                                                <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                                    {String(faq.id).padStart(2, '0')}
                                                </span>
                                                <span
                                                    className={`font-serif text-[18px] sm:text-[20px] font-medium transition-colors duration-300 ${
                                                        isActive ? theme.activeQuestionText : theme.questionText
                                                    }`}
                                                    itemProp="name"
                                                >
                                                    {faq.question}
                                                </span>
                                            </div>
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border ${
                                                    isActive
                                                        ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180 shadow-md`
                                                        : `${theme.iconBgInactive} ${theme.iconTextInactive} ${theme.iconBorderInactive}`
                                                }`}
                                                aria-hidden="true"
                                            >
                                                {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            </div>
                                        </button>

                                        <motion.div
                                            id={`faq-answer-${faq.id}`}
                                            initial={false}
                                            animate={{
                                                height: isActive ? 'auto' : 0,
                                                opacity: isActive ? 1 : 0
                                            }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                            aria-hidden={!isActive}
                                            itemScope
                                            itemProp="acceptedAnswer"
                                            itemType="https://schema.org/Answer"
                                            role="region"
                                            aria-labelledby={`faq-ai-visibility-${faq.id}`}
                                        >
                                            <div className="px-6 pb-6 pt-2 md:pl-[5.5rem] leading-relaxed text-[15px] text-gray-500 max-w-prose">
                                                <p itemProp="text">{faq.answer}</p>
                                            </div>
                                        </motion.div>
                                        {!isActive && (
                                            <div className="sr-only" itemProp="acceptedAnswer" itemScope itemType="https://schema.org/Answer">
                                                <p itemProp="text">{faq.answer}</p>
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ────────────────────── SECTION 12 ── FINAL CONVERSION CTA (Orders 54-55) ────────────────────── */}
            <section
                aria-label="Request a Free SEO and AI Visibility Audit"
                className="py-16 md:py-24 relative overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1240px]">
                    <div
                        className="relative rounded-[32px] p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden text-left text-white shadow-xl shadow-[#2D6A4F]/15"
                        style={{ background: "linear-gradient(150deg, #2D6A4F 0%, #1B4332 100%)" }}
                    >
                        {/* Radial ambient glow */}
                        <div
                            className="absolute -right-24 -top-24 w-96 h-96 rounded-full pointer-events-none"
                            style={{
                                background: "radial-gradient(circle, rgba(255, 255, 255, 0.16), transparent 70%)",
                            }}
                            aria-hidden="true"
                        />

                        {/* Snowflake background watermark */}
                        <img
                            src="/optimized/logonew.webp"
                            alt=""
                            className="absolute -left-16 -bottom-16 w-64 sm:w-72 h-64 sm:h-72 pointer-events-none select-none -rotate-12 opacity-[0.08] filter brightness-0 invert"
                            aria-hidden="true"
                        />

                        <div className="relative z-10 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider mb-4">
                                <Sparkles className="w-3.5 h-3.5" />
                                Initial Opportunity Snapshot
                            </div>

                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-[1.15] tracking-tight mb-4 sm:mb-5 font-normal"
                                type="chars" stagger={0.015} once={false}
                            >
                                Request a Free SEO & AI Visibility Audit
                            </SplitTextReveal>

                            <p className="text-[#C9E0D3] text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-2xl font-normal">
                                Share your website, business category, target countries and priority issue. We will assess the request, explain the preliminary review scope and recommend whether a full audit or ongoing management engagement would be useful.
                            </p>

                            <div className="flex flex-wrap items-center gap-4 relative z-10">
                                {/* Order 55: Primary CTA Button */}
                                <Link
                                    to="/audit"
                                    aria-label="Request a Free SEO & AI Visibility Audit"
                                    className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-[#2D6A4F] rounded-full font-bold text-sm sm:text-base transition-all hover:bg-[#F0FDF4] hover:-translate-y-0.5 shadow-md"
                                >
                                    Request a Free SEO & AI Visibility Audit
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                {/* Order 55: Secondary CTA Button */}
                                <Link
                                    to="/contact"
                                    aria-label="Get a Custom Quote"
                                    className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full font-semibold text-sm sm:text-base transition-all text-white border border-white/30 hover:bg-white/10 hover:-translate-y-0.5"
                                >
                                    Get a Custom Quote
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
    );
}
