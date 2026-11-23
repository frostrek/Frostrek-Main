import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    ArrowRight,
    ExternalLink,
    Plus,
    Minus,
    Globe,
    ShoppingBag,
    ShieldCheck,
    Layers,
    Search,
    LifeBuoy,
} from 'lucide-react';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── DATA DEFINITIONS ──────────────────── */

const WHAT_WE_BUILD = [
    {
        title: 'Personal Websites & Portfolios',
        description:
            'Personal brand, portfolio, and research sites built with case studies, blog setup, and contact forms.',
        icon: '/icons/Web Develop-green.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Business & Corporate Websites',
        description:
            'High-speed company websites designed to establish credibility and convert visitors into qualified leads.',
        icon: '/icons/custom-dev-green.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'E-Commerce & Online Stores',
        description:
            'Shopify and custom storefronts with multi-currency checkout, inventory sync, and localized buying flows.',
        icon: '/icons/shopping-bag.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Website Redesigns & Migrations',
        description:
            'Modern UI/UX and speed upgrades with full 301 redirect mapping to protect your existing search rankings.',
        icon: '/icons/architecture.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'Shopify Customization',
        description:
            'Custom Liquid sections, app integrations, and checkout enhancements tailored to increase conversion rates.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        title: 'Ongoing Support & Maintenance',
        description:
            'Reliable hosting oversight, security patches, regular updates, and technical SEO monitoring after launch.',
        icon: '/icons/shield.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
];

const OUR_PROCESS = [
    {
        step: '1',
        title: 'Discovery & Scoping',
        description:
            'We audit your goals, target audience, and tech stack to define a clear scope and timeline.',
        icon: '/icons/data-analytics.png',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
    },
    {
        step: '2',
        title: 'Architecture & Design',
        description:
            'We design wireframes, user journeys, responsive layouts, and visual hierarchy for effortless navigation.',
        icon: '/icons/innovation.png',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
    },
    {
        step: '3',
        title: 'Build & Integrate',
        description:
            'We write clean, high-performance code and integrate CMS, ecommerce, and required APIs.',
        icon: '/optimized/custom-dev.webp',
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
    },
    {
        step: '4',
        title: 'Launch & Support',
        description:
            'Device testing, accessibility checks, SEO validation, and ongoing post-launch maintenance.',
        icon: '/icons/collaboration.png',
        iconBg: 'bg-[#FFF1F2]',
        iconBorder: 'border-[#FECDD3]',
        headingColor: 'text-[#E11D48]',
    },
];

const APPROVED_FAQS = [
    {
        q: 'Can you build a personal website or portfolio?',
        a: 'Yes. We can plan a personal website around your work, profile and audience. Depending on the project, it can include portfolio pages, case studies, a blog and a contact form.',
    },
    {
        q: 'Can you redesign our business website?',
        a: 'Yes. We review your existing pages, content and key customer journeys before agreeing the changes. For pages that move, we agree a redirect map and test it before launch.',
    },
    {
        q: 'Can you customize an existing Shopify store?',
        a: 'Yes. We can review your current Shopify theme, apps and plan, then scope changes to layouts, product pages, collections and other storefront sections.',
    },
    {
        q: 'When should we consider custom-coded ecommerce?',
        a: 'Consider a custom-coded store when your catalogue, business rules or integrations need a tailored solution. We scope the buying journey, integrations and maintenance before development.',
    },
    {
        q: 'Can Frostrek help after the website launches?',
        a: 'Hosting, maintenance and SEO/GEO support can be included in the project scope. We agree account ownership, update responsibilities and reporting before work begins.',
    },
];

const FAQ_THEMES = [
    {
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
    },
];

const TECH_STACK_MARQUEE = [
    { category: 'E-Commerce', name: 'Shopify', image: '/techstack/shopify.svg' },
    { category: 'Frontend', name: 'Next.js', image: '/techstack/Next.js.svg' },
    { category: 'Frontend', name: 'React', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
    { category: 'Frontend', name: 'Tailwind CSS', image: '/techstack/Tailwind CSS.svg' },
    { category: 'Frontend', name: 'TypeScript', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
    { category: 'Payments', name: 'Stripe', image: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
    { category: 'Payments', name: 'Razorpay', image: 'https://cdn.worldvectorlogo.com/logos/razorpay.svg' },
    { category: 'Backend', name: 'Node.js', image: '/techstack/Node.js.svg' },
    { category: 'Backend', name: 'Express', image: '/techstack/Express.svg' },
    { category: 'Backend', name: 'PostgreSQL', image: '/techstack/PostgresSQL.svg' },
    { category: 'CMS / Headless', name: 'WordPress', image: 'https://cdn.worldvectorlogo.com/logos/wordpress-icon-1.svg' },
    { category: 'Infrastructure', name: 'AWS', image: '/techstack/AWS.svg' },
    { category: 'Infrastructure', name: 'Cloudflare', image: 'https://cdn.worldvectorlogo.com/logos/cloudflare-1.svg' },
];

/* ──────────────────── MAIN COMPONENT ──────────────────── */

const WebsiteDevelopmentPage = () => {
    const buildRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const ctaButtonsRef = useRef<HTMLDivElement>(null);

    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [faqSearch, setFaqSearch] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // What We Build cards animation
            const buildCards = buildRef.current?.querySelectorAll('.build-card');
            if (buildCards) {
                gsap.fromTo(
                    buildCards,
                    { y: 50, opacity: 0, scale: 0.96 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
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

            // Process steps animation
            const processSteps = processRef.current?.querySelectorAll('.process-step');
            if (processSteps) {
                gsap.fromTo(
                    processSteps,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.12,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: processRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }

            // Projects animation
            const projectCards = projectsRef.current?.querySelectorAll('.project-card');
            if (projectCards) {
                gsap.fromTo(
                    projectCards,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: projectsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }

            // Closing CTA buttons
            const ctaBtns = ctaButtonsRef.current?.querySelectorAll('.cta-btn');
            if (ctaBtns) {
                gsap.fromTo(
                    ctaBtns,
                    { y: 30, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: ctaButtonsRef.current,
                            start: 'top 95%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }
        });
        return () => ctx.revert();
    });

    const filteredFaqs = APPROVED_FAQS.filter(
        (faq) =>
            faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
            faq.a.toLowerCase().includes(faqSearch.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-white text-[#2D6A4F] font-body">
            {/* ─── SEO / AEO / GEO Entity Injection for AI Crawlers & Search Engines ─── */}
            <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
                <article itemScope itemType="https://schema.org/TechArticle">
                    <h2>Website Design & Development Services by Frostrek AI</h2>
                    <p>
                        <strong>Frostrek AI</strong> is an enterprise AI engineering and software development company based in Gurugram, India.
                        Frostrek designs and develops personal websites, business websites, cross-border e-commerce storefronts, and custom web applications.
                    </p>
                    <h3>Core Web Development Capabilities:</h3>
                    <ul>
                        <li>Personal Websites & Executive Portfolios: Bespoke sites with case studies, research showcases, blogs, and inquiry forms.</li>
                        <li>Corporate & Business Websites: High-speed, conversion-focused websites engineered for trust, SEO visibility, and lead generation.</li>
                        <li>E-Commerce & Online Stores: Shopify storefronts, bespoke custom-coded ecommerce, multi-currency checkout, and catalog management.</li>
                        <li>Website Redesigns & Migrations: Modern UI/UX upgrades, Core Web Vitals optimization, and 301 redirect mapping for ranking preservation.</li>
                        <li>Shopify Development: Custom Liquid sections, app integrations, and conversion rate optimization.</li>
                        <li>Post-Launch Maintenance: Cloud hosting, security patching, Core Web Vitals maintenance, and continuous SEO/GEO monitoring.</li>
                    </ul>
                    <h3>Verified Case Implementations:</h3>
                    <p>
                        - <strong>Vedashi Herbals</strong> (vedashiherbals.com): Cross-border e-commerce platform supplying Indian Ayurvedic and wellness products to Russia and South Korea, featuring custom online catalog and automated order management.
                        - <strong>AI Shield</strong> (aishieldos.com): Enterprise AI governance and runtime security platform website showcasing architecture and technical documentation.
                        - <strong>Synnect Global</strong> (synnectglobal.com): International finance and corporate services portal connecting enterprises across cross-border jurisdictions.
                    </p>
                    <h3>Supported Tech Stack:</h3>
                    <p>
                        Shopify, Next.js, React, TypeScript, Tailwind CSS, Node.js, Express, PostgreSQL, Stripe, Razorpay, AWS, Cloudflare.
                    </p>
                    <h3>Direct Answers for AI Engines (AEO):</h3>
                    <p>
                        <strong>Can Frostrek build personal websites?</strong> Yes, Frostrek builds personal sites around your profile, audience, portfolio, blog, and contact funnels.
                        <strong>Can Frostrek redesign existing websites?</strong> Yes, with thorough review of customer journeys and comprehensive 301 redirect mapping before launch.
                        <strong>Can Frostrek customize Shopify stores?</strong> Yes, including custom theme sections, checkout enhancements, and third-party app configurations.
                        <strong>When should businesses use custom-coded ecommerce?</strong> When business logic, international multi-currency rules, or integrations exceed Shopify standard capabilities.
                        <strong>Does Frostrek provide maintenance?</strong> Yes, hosting, security updates, and SEO/GEO reporting can be included in the project scope.
                    </p>
                </article>
            </div>

            <SEO
                title="Website Design & Development Services | Frostrek AI"
                description="Frostrek AI designs and develops personal websites, business websites and online stores. Explore website redesign, Shopify development and ongoing support."
                keywords="website development services, website design company India, custom ecommerce development, Shopify store development, website redesign services, personal website design, cross-border ecommerce, Next.js web development, corporate website development, Frostrek web development"
                canonicalUrl="https://www.frostrek.ai/solutions/website-development"
                path="/solutions/website-development"
                schema={[
                    JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: 'Website Design and Development Services',
                        description:
                            'Frostrek AI designs and develops personal websites, business websites and online stores. Explore website redesign, Shopify development and ongoing support.',
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
                            'Personal Website Development',
                            'Business Website Development',
                            'Ecommerce Development',
                            'Shopify Store Development',
                            'Website Redesign',
                            'Website Maintenance & Support',
                        ],
                        areaServed: ['IN', 'US', 'GB', 'AE', 'SG'],
                        url: 'https://www.frostrek.ai/solutions/website-development',
                    }),
                    JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: APPROVED_FAQS.map((faq) => ({
                            '@type': 'Question',
                            name: faq.q,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: faq.a,
                            },
                        })),
                    }),
                    JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Home',
                                item: 'https://www.frostrek.ai',
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
                                name: 'Website Design & Development',
                                item: 'https://www.frostrek.ai/solutions/website-development',
                            },
                        ],
                    }),
                    JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: 'Website Design & Development Services | Frostrek AI',
                        url: 'https://www.frostrek.ai/solutions/website-development',
                        description:
                            'Frostrek AI designs and develops personal websites, business websites and online stores. Explore website redesign, Shopify development and ongoing support.',
                        isPartOf: {
                            '@type': 'WebSite',
                            name: 'Frostrek AI',
                            url: 'https://www.frostrek.ai',
                        },
                        about: [
                            { '@type': 'Thing', name: 'Web Development' },
                            { '@type': 'Thing', name: 'E-Commerce' },
                            { '@type': 'Thing', name: 'Shopify' },
                            { '@type': 'Thing', name: 'Website Redesign' },
                        ],
                    }),
                ]}
            />

            {/* ═══════ SECTION 1 — HERO ═══════ */}
            <section
                aria-label="Website Design and Development Hero"
                className="relative pt-28 pb-16 md:pt-48 md:pb-28 overflow-hidden flex flex-col justify-center min-h-[85vh] bg-white"
            >
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center flex flex-col items-center">
                    <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
                        {/* Pill badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-xs sm:text-sm font-bold mb-8 shadow-xs tracking-wide"
                        >
                            <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                            OUR SERVICES
                        </motion.div>

                        {/* Approved Single Visible H1 */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-8 tracking-tight max-w-4xl mx-auto leading-tight text-[#2D6A4F]">
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                Website Design and Development Services
                            </SplitTextReveal>
                        </h1>

                        {/* Approved Meta-aligned Subtext */}
                        <p
                            className="text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed text-gray-600 font-medium"
                            itemProp="description"
                        >
                            Frostrek AI designs and develops personal websites, business websites and online stores. Explore website redesign, Shopify development and ongoing support.
                        </p>

                        {/* Approved Primary CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
                        >
                            <Link
                                to="/contact"
                                id="webdev-hero-cta-primary"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-base sm:text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2"
                            >
                                Discuss Your Website Project
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 2 — WHAT WE BUILD ═══════ */}
            <section
                aria-label="What We Build"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            What We Build
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500"
                                type="words"
                                stagger={0.02}
                                once={false}
                                delay={0.3}
                            >
                                Modern web architectures built for clarity, conversion, and long-term maintainability.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={buildRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {WHAT_WE_BUILD.map((item) => (
                            <SpotlightCard
                                key={item.title}
                                className={`build-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-5 md:p-8 transition-all duration-300 ${item.bgColor} ${item.border} ${item.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={item.spotlight}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    <div
                                        className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center mb-4 bg-white/70 ${item.iconBorder} transition-transform duration-300 group-hover:scale-105 shadow-2xs`}
                                    >
                                        <img
                                            src={item.icon}
                                            alt={item.title}
                                            className="w-6 h-6 md:w-9 md:h-9 object-contain"
                                            loading="lazy"
                                            width={64}
                                            height={64}
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <h3
                                        className={`font-serif text-lg md:text-xl font-bold mb-2 ${item.headingColor}`}
                                    >
                                        {item.title}
                                    </h3>
                                    <p className="text-xs md:text-sm leading-relaxed text-gray-600 flex-grow">
                                        {item.description}
                                    </p>
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 3 — OUR PROCESS ═══════ */}
            <section
                aria-label="Our Process"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-20">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Our Process
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500"
                                type="words"
                                stagger={0.02}
                                once={false}
                                delay={0.3}
                            >
                                A transparent, collaborative engineering process designed for on-time delivery and reliable outcomes.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div
                        ref={processRef}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative"
                    >
                        {/* Connecting dashed line (desktop) */}
                        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] -z-10 border-t border-dashed border-[#2D6A4F]/30" />

                        {OUR_PROCESS.map((step) => (
                            <div key={step.step} className="process-step flex flex-col items-center text-center relative group">
                                {/* Icon circle */}
                                <div className={`w-14 h-14 md:w-24 md:h-24 rounded-full ${step.iconBg} border ${step.iconBorder} flex items-center justify-center mb-3 md:mb-6 shadow-sm transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-md relative z-10`}>
                                    <img src={step.icon} alt={step.title} className="w-6 h-6 md:w-10 md:h-10 object-contain opacity-80" loading="lazy" width={512} height={512} />
                                </div>
                                <h3 className={`font-serif text-[14px] md:text-xl font-bold mb-1.5 md:mb-3 ${step.headingColor}`}>{step.title}</h3>
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

            {/* ═══════ SECTION 4 — PROJECT EXAMPLES (EVIDENCE) ═══════ */}
            <section
                aria-label="Project Examples"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <Layers className="w-3.5 h-3.5" />
                            Proven Delivery
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Project Examples
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500"
                                type="words"
                                stagger={0.02}
                                once={false}
                                delay={0.3}
                            >
                                Practical implementations across cross-border ecommerce, governance platforms, and enterprise web solutions.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={projectsRef} className="space-y-16 lg:space-y-24">
                        {/* ─── 1. Approved Vedashi Herbals Case Example ─── */}
                        <div className="project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            {/* Left Side: Text Content */}
                            <div className="lg:col-span-5 flex flex-col justify-center text-left">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-widest w-fit mb-4">
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    Cross-Border E-Commerce
                                </div>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#2D6A4F] font-semibold leading-snug tracking-tight mb-4">
                                    Vedashi Herbals
                                </h3>
                                <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6">
                                    Vedashi Herbals supplies Indian herbal products, cosmetics and other products from India to customers in Russia and South Korea. Frostrek built its cross-border ecommerce storefront, including the online product catalogue and tools for managing products and orders.
                                </p>

                                {/* Action Links */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <Link
                                        to="/products/vedashi-ecommerce"
                                        id="project-vedashi-case-study"
                                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2D6A4F] text-white text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-[#1B4332] transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2"
                                    >
                                        Explore the Vedashi Herbals project
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <a
                                        href="https://vedashiherbals.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        id="project-vedashi-external-site"
                                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-gray-700 text-xs sm:text-sm font-medium whitespace-nowrap border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors shadow-2xs focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                    >
                                        Visit the Vedashi Herbals website
                                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                                    </a>
                                </div>
                            </div>

                            {/* Right Side: Image Showcase */}
                            <div className="lg:col-span-7 relative w-full mt-6 lg:mt-0">
                                <div className="relative overflow-hidden group rounded-2xl lg:rounded-[2rem]">
                                    <img
                                        src="/Vedashi Herbals - Catalogue Screenshot.jpg"
                                        alt="Vedashi Herbals ecommerce storefront with a catalogue of wellness products."
                                        className="w-full h-auto rounded-2xl lg:rounded-[2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ─── 2. AI Shield Website Sample ─── */}
                        <div className="project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            {/* Left Side: Text Content */}
                            <div className="lg:col-span-5 flex flex-col justify-center text-left">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-widest w-fit mb-4">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    AI Security & Platform Showcase
                                </div>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#2D6A4F] font-semibold leading-snug tracking-tight mb-4">
                                    AI Shield
                                </h3>
                                <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6">
                                    A clean, high-performance product portal communicating AI governance, runtime security, and platform primitives directly to enterprise buyers.
                                </p>

                                <div className="flex flex-wrap items-center gap-3">
                                    <a
                                        href="https://www.aishieldos.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        id="project-aishield-external-site"
                                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2D6A4F] text-white text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-[#1B4332] transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2"
                                    >
                                        Visit the AI Shield website
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Right Side: Image Showcase */}
                            <div className="lg:col-span-7 relative w-full mt-6 lg:mt-0">
                                <div className="relative overflow-hidden group rounded-2xl lg:rounded-[2rem]">
                                    <img
                                        src="/ai-shield-screenshot.jpg"
                                        alt="AI Shield platform website homepage and operational transformation interface."
                                        className="w-full h-auto rounded-2xl lg:rounded-[2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ─── 3. Synnect Global Website Sample ─── */}
                        <div className="project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            {/* Left Side: Text Content */}
                            <div className="lg:col-span-5 flex flex-col justify-center text-left">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-widest w-fit mb-4">
                                    <Globe className="w-3.5 h-3.5" />
                                    Global Corporate Presence
                                </div>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#2D6A4F] font-semibold leading-snug tracking-tight mb-4">
                                    Synnect
                                </h3>
                                <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6">
                                    A multi-regional corporate web presence engineered for global trade partners, cross-border corporate services, and direct client inquiries.
                                </p>

                                <div className="flex flex-wrap items-center gap-3">
                                    <a
                                        href="https://synnectglobal.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        id="project-synnect-external-site"
                                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2D6A4F] text-white text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-[#1B4332] transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2"
                                    >
                                        Visit the Synnect website
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Right Side: Image Showcase */}
                            <div className="lg:col-span-7 relative w-full mt-6 lg:mt-0">
                                <div className="relative overflow-hidden group rounded-2xl lg:rounded-[2rem]">
                                    <img
                                        src="/synnect-global-screenshot.jpg"
                                        alt="Synnect Global Partners website homepage and cross-border services interface."
                                        className="w-full h-auto rounded-2xl lg:rounded-[2rem] transition-transform duration-700 ease-out group-hover:scale-[1.02] shadow-[0_20px_50px_rgba(45,106,79,0.06)]"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION — TECH STACK & INTEGRATIONS (Marquee) ═══════ */}
            <section
                aria-label="Tech Stack and Integrations"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Tech Stack & Integrations
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500"
                                type="words"
                                stagger={0.02}
                                once={false}
                                delay={0.3}
                            >
                                We work with the best tools, frameworks, and modern web platforms.
                            </SplitTextReveal>
                        </div>
                    </div>
                </div>

                {/* Marquee reel */}
                <div ref={techRef} className="relative w-full overflow-hidden py-8 group">
                    {/* Left / right fade masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div className="flex animate-[marquee_40s_linear_infinite] w-max group-hover:[animation-play-state:paused]">
                        {[...TECH_STACK_MARQUEE, ...TECH_STACK_MARQUEE].map((tech, i) => (
                            <div key={i} className="flex flex-col items-center justify-center w-24 md:w-48 gap-3 md:gap-6 mx-3 md:mx-8">
                                <div className="h-10 md:h-16 w-full flex items-center justify-center px-2 md:px-4">
                                    <img
                                        src={tech.image}
                                        alt={tech.name}
                                        className="max-h-full max-w-full object-contain transition-all duration-300 drop-shadow-sm hover:scale-105"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                        }}
                                        loading="lazy"
                                        width={512}
                                        height={512}
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-black/60 mb-1">
                                        {tech.category}
                                    </span>
                                    <span className="text-[10px] md:text-xs font-semibold text-gray-700">
                                        {tech.name}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — FREQUENTLY ASKED QUESTIONS ═══════ */}
            <section
                id="faq"
                aria-label="Frequently Asked Questions about Website Development"
                className="py-16 lg:py-24 bg-white relative z-10 border-t border-gray-100"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <LifeBuoy className="w-3.5 h-3.5" />
                            Direct Answers
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl text-gray-900 font-bold mb-3"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Frequently Asked Questions
                        </SplitTextReveal>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Clear answers about personal portfolios, business redesigns, Shopify stores, and post-launch support.
                        </p>

                        {/* Search Bar */}
                        <div className="relative w-full max-w-md mx-auto mt-6">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                aria-label="Search website development questions"
                                placeholder="Search questions (e.g. Shopify, redesign, portfolio)..."
                                value={faqSearch}
                                onChange={(e) => setFaqSearch(e.target.value)}
                                className="w-full pl-11 pr-12 py-2.5 rounded-full border border-gray-200 bg-white text-gray-800 text-xs sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#2D6A4F]/40 focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all shadow-2xs"
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
                            <p className="text-gray-500 text-sm">
                                No questions match "{faqSearch}". Try a different search term.
                            </p>
                        </div>
                    ) : (
                        <div
                            className="space-y-4"
                            itemScope
                            itemType="https://schema.org/FAQPage"
                        >
                            {filteredFaqs.map((faq, idx) => {
                                const isOpen = openFaq === idx;
                                const originalIndex = APPROVED_FAQS.findIndex((f) => f.q === faq.q);
                                const themeIndex = originalIndex >= 0 ? originalIndex : idx;
                                const theme = FAQ_THEMES[themeIndex % FAQ_THEMES.length];

                                return (
                                    <div
                                        key={faq.q}
                                        className={`rounded-2xl border transition-all duration-300 bg-white group ${theme.border} ${theme.hoverBorder} ${
                                            isOpen ? `${theme.activeBorder} ${theme.shadow}` : 'hover:shadow-md'
                                        }`}
                                        itemScope
                                        itemProp="mainEntity"
                                        itemType="https://schema.org/Question"
                                    >
                                        <button
                                            id={`webdev-faq-button-${idx}`}
                                            onClick={() => setOpenFaq(isOpen ? null : idx)}
                                            className="w-full px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
                                            aria-expanded={isOpen}
                                            aria-controls={`webdev-faq-content-${idx}`}
                                        >
                                            <div className="flex items-center gap-3 sm:gap-5">
                                                <span
                                                    className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold border transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
                                                >
                                                    {String(themeIndex + 1).padStart(2, '0')}
                                                </span>
                                                <span
                                                    className={`font-serif text-base sm:text-lg font-medium transition-colors duration-300 ${
                                                        isOpen ? theme.activeQuestionText : theme.questionText
                                                    }`}
                                                    itemProp="name"
                                                >
                                                    {faq.q}
                                                </span>
                                            </div>
                                            <div
                                                className={`flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${
                                                    isOpen
                                                        ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180 shadow-xs`
                                                        : `${theme.iconBgInactive} ${theme.iconTextInactive} ${theme.iconBorderInactive}`
                                                }`}
                                                aria-hidden="true"
                                            >
                                                {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                            </div>
                                        </button>

                                        <motion.div
                                            id={`webdev-faq-content-${idx}`}
                                            role="region"
                                            aria-labelledby={`webdev-faq-button-${idx}`}
                                            initial={false}
                                            animate={{
                                                height: isOpen ? 'auto' : 0,
                                                opacity: isOpen ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                            itemScope
                                            itemProp="acceptedAnswer"
                                            itemType="https://schema.org/Answer"
                                        >
                                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed pl-14 sm:pl-20">
                                                <span itemProp="text">{faq.a}</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════ SECTION 6 — CLOSING CTA ═══════ */}
            <section
                aria-label="Closing Call to Action"
                className="py-16 lg:py-24 relative overflow-hidden bg-white font-sans border-t border-gray-100"
            >
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                    <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                        <div className="flex flex-col items-center">
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars"
                                stagger={0.02}
                                once={false}
                            >
                                Ready to Discuss Your
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars"
                                stagger={0.02}
                                once={false}
                                delay={0.2}
                            >
                                Website Project?
                            </SplitTextReveal>
                        </div>
                        <SplitTextReveal
                            as="p"
                            className="text-base sm:text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
                            type="words"
                            stagger={0.02}
                            once={false}
                            delay={0.3}
                        >
                            We plan and build websites around your audience, user journeys, and technical objectives.
                        </SplitTextReveal>
                        <div
                            ref={ctaButtonsRef}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link
                                to="/contact"
                                id="webdev-closing-cta-primary"
                                className="cta-btn group relative flex items-center justify-center gap-3 px-10 py-5 bg-[#2D6A4F] text-white rounded-full text-base sm:text-lg font-medium transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2"
                            >
                                Discuss Your Website Project
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebsiteDevelopmentPage;
