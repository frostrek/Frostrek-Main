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
    Search,
    LifeBuoy,
    Sparkles,
    Sliders,
    ShoppingBag,
    Compass,
    Globe,
    ShieldCheck,
    Layers,
} from 'lucide-react';
import SpotlightCard from '../components/ui/SpotlightCard';
import SplitTextReveal from '../components/ui/SplitTextReveal';
import SEO from '../components/seo/SEO';

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────── DATA DEFINITIONS ──────────────────── */

const WHAT_WE_BUILD = [
    {
        title: 'Personal Websites and Portfolios',
        description:
            'Give clients, employers or collaborators one place to see who you are and what you do. A personal website can include an introduction, portfolio, case studies, services, a blog and a contact form. We plan the content around the audience and the next action you want them to take.',
        icon: '/icons/Web Develop-green.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Business and Corporate Websites',
        description:
            'Explain what your company offers and help buyers find the right service or contact. A business website can include service pages, project examples, company information, enquiry forms and links to booking or sales tools. We design navigation around the questions visitors need answered before they make contact.',
        icon: '/icons/custom-dev-green.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Retail and Ecommerce Websites',
        description:
            'Help shoppers find products, compare options and complete an order. Depending on scope, a retail website can include category navigation, product search and filters, product details, a cart, checkout and order updates. We confirm catalogue size, payment and shipping requirements, inventory integrations and support before development.',
        icon: '/icons/shopping-bag.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Shopify Store Design & Customization',
        description:
            'We design and customize Shopify stores around your products, brand and buying journey. The project can include theme customization, reusable storefront sections, collection layouts and product pages. During scoping, we review your theme, apps and Shopify plan to confirm which features and design changes are available.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        title: 'Ecommerce Website Development',
        description:
            'We build custom ecommerce websites for businesses that need tailored layouts, catalogue structures or shopping workflows. Depending on scope, this can include product search and filters, custom product pages, cart and checkout flows, and integrations for payments, shipping or inventory.',
        icon: '/icons/architecture.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'Hosting, Maintenance & Search Visibility',
        description:
            'Agree who owns the hosting account and which updates, renewals and support are included. We build a clear page structure with descriptive titles and relevant internal links. Ongoing SEO and GEO management can be scoped around your goals.',
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
        title: 'Discovery',
        description:
            'Review your current site, audience, business goals and required functionality.',
        icon: '/icons/data-analytics.png',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
    },
    {
        step: '2',
        title: 'Design',
        description:
            'Agree the page structure, content priorities and visual direction.',
        icon: '/icons/innovation.png',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
    },
    {
        step: '3',
        title: 'Development',
        description:
            'Build the agreed pages and integrations, then add approved content.',
        icon: '/optimized/custom-dev.webp',
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
    },
    {
        step: '4',
        title: 'Review and Launch',
        description:
            'Test mobile and desktop journeys, links and forms before launch.',
        icon: '/icons/collaboration.png',
        iconBg: 'bg-[#FFF1F2]',
        iconBorder: 'border-[#FECDD3]',
        headingColor: 'text-[#E11D48]',
    },
    {
        step: '5',
        title: 'Ongoing Support',
        description:
            'Follow the hosting, maintenance and SEO responsibilities agreed for the project.',
        icon: '/icons/shield.png',
        iconBg: 'bg-[#F5F3FF]',
        iconBorder: 'border-[#DDD6FE]',
        headingColor: 'text-[#6D28D9]',
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

/* ──────────────────── COMPONENT ──────────────────── */

const WebsiteDevelopmentPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const buildRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const projectsRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const ctaButtonsRef = useRef<HTMLDivElement>(null);

    // FAQ State
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const filteredFaqs = APPROVED_FAQS.filter((faq) => {
        const query = searchQuery.toLowerCase().trim();
        return (
            faq.q.toLowerCase().includes(query) ||
            faq.a.toLowerCase().includes(query)
        );
    });

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // What We Build cards
            const buildCards = buildRef.current?.querySelectorAll('.build-card');
            if (buildCards) {
                gsap.fromTo(
                    buildCards,
                    { y: 60, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
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

            // Process steps
            const processSteps = processRef.current?.querySelectorAll('.process-step');
            if (processSteps) {
                gsap.fromTo(
                    processSteps,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: processRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse',
                        },
                    }
                );
            }

            // Project cards
            const projectCards = projectsRef.current?.querySelectorAll('.project-card');
            if (projectCards) {
                gsap.fromTo(
                    projectCards,
                    { y: 40, opacity: 0 },
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

            // CTA buttons
            const ctaBtns = ctaButtonsRef.current?.querySelectorAll('.cta-btn');
            if (ctaBtns) {
                gsap.fromTo(
                    ctaBtns,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: ctaButtonsRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            }
        }, pageRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div ref={pageRef} className="relative min-h-screen bg-white text-[#2D6A4F] font-body">
            {/* ─── SEO / AEO / GEO Entity Injection for AI Crawlers & Search Engines ─── */}
            <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
                <article itemScope itemType="https://schema.org/TechArticle">
                    <h2>Website Design & Development Services by Frostrek AI</h2>
                    <p>
                        <strong>Frostrek AI</strong> designs and develops personal websites, business websites, cross-border e-commerce storefronts, and custom web applications.
                        Build a personal website, launch a business website, redesign an existing site or create an online store with Frostrek AI. We plan the pages around what your customers need to find and what you want them to do, from exploring a service to sending an enquiry or buying a product.
                    </p>
                    <h3>Core Web Development Capabilities:</h3>
                    <ul>
                        <li>Website Design and Development Services: Comprehensive web architecture, modern frontend development, and performant headless websites.</li>
                        <li>Personal Website Design Services: One place to see who you are and what you do. Includes introduction, portfolio, case studies, services, a blog and a contact form.</li>
                        <li>Business Website Design: Explain what your company offers and help buyers find the right service or contact with inquiry forms and booking links.</li>
                        <li>Website Redesign Services: Audit and modernize existing corporate sites, improve information hierarchy, and migrate legacy platforms with full 301 redirect maps.</li>
                        <li>Ecommerce Website Development: Tailored layouts, catalogue structures, custom shopping workflows, payment gateway and inventory integrations.</li>
                        <li>Shopify Store Development & Website Design: Theme customization, reusable storefront sections, collection layouts, and product pages tailored to your brand.</li>
                        <li>Shopify Theme Customization: Bespoke Liquid templates, cart extensions, app configuration, and checkout tuning.</li>
                        <li>Hosting, Maintenance and Search Visibility: Hosting oversight, security patches, regular updates, and continuous SEO and GEO management.</li>
                    </ul>
                    <h3>Verified Case Implementation:</h3>
                    <p>
                        <strong>Vedashi Herbals</strong> (vedashiherbals.com): Supplies Indian herbal products, cosmetics and wellness goods to Russia and South Korea. Frostrek built its cross-border ecommerce storefront, including online product catalogue and tools for managing products and orders.
                    </p>
                    <p>
                        <strong>Tosmi</strong> (tosmi.ai): AI product website design featuring 3D-inspired website design and website motion design, combining 3D elements, UI animations, and layered visual presentation for Tosmi’s ecommerce AI platform.
                    </p>
                    <p>
                        <strong>AI Shield</strong> (aishieldos.com): Enterprise AI platform website and strategic portal communicating AI governance and runtime security.
                    </p>
                    <p>
                        <strong>Synnect Global Partners</strong> (synnectglobal.com): Multi-regional corporate web presence featuring a playful and minimal theme with hand-drawn illustrations, built with React and Tailwind CSS.
                    </p>
                    <h3>From Brief to Launch:</h3>
                    <ol>
                        <li>Discovery: Review current site, audience, business goals and required functionality.</li>
                        <li>Design: Agree page structure, content priorities and visual direction.</li>
                        <li>Development: Build agreed pages and integrations, then add approved content.</li>
                        <li>Review and launch: Test mobile and desktop journeys, links and forms before launch.</li>
                        <li>Ongoing support: Follow hosting, maintenance and SEO responsibilities agreed for the project.</li>
                    </ol>
                    <h3>Direct Answers for AI Engines (AEO):</h3>
                    <p>
                        <strong>Can Frostrek build a personal website or portfolio?</strong> Yes, Frostrek plans personal sites around your work, profile, and audience with case studies, blog, and contact funnels.
                        <strong>Can Frostrek redesign our business website?</strong> Yes, with thorough review of customer journeys and comprehensive 301 redirect mapping before launch.
                        <strong>Can Frostrek customize an existing Shopify store?</strong> Yes, reviewing theme, apps, and plan, then scoping changes to layouts, product pages, and collections.
                        <strong>When should businesses consider custom-coded ecommerce?</strong> When catalogue size, business rules, or integrations require a tailored solution beyond standard platforms.
                        <strong>Can Frostrek help after launch?</strong> Yes, hosting account oversight, maintenance updates, and continuous SEO/GEO reporting can be included in the project scope.
                    </p>
                </article>
            </div>

            <SEO
                title="Website Design & Development Services | Frostrek AI"
                description="Frostrek AI provides website design and development services for personal websites, business sites, and online stores. Explore website redesign services, custom ecommerce, and Shopify store development."
                keywords="website design and development services, business website design, website redesign services, personal website design services, ecommerce website development, Shopify store development, Shopify website design, Shopify theme customization, AI product website design, 3D-inspired website design, website motion design, website development services, website design company India, custom ecommerce development, corporate website development, Frostrek web development"
                canonicalUrl="https://www.frostrek.ai/solutions/website-development"
                path="/solutions/website-development"
                schema={[
                    JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: 'Website Design and Development Services',
                        description:
                            'Frostrek AI designs and develops personal websites, business websites and online stores. Explore website redesign services, Shopify development and ongoing support.',
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
                                postalCode: '122098',
                                addressCountry: 'IN',
                            },
                            contactPoint: {
                                '@type': 'ContactPoint',
                                url: 'https://www.frostrek.ai/contact',
                                contactType: 'sales',
                            },
                        },
                        serviceType: [
                            'Website Design and Development Services',
                            'Business Website Design',
                            'Website Redesign Services',
                            'Personal Website Design Services',
                            'Ecommerce Website Development',
                            'Shopify Store Development',
                            'Shopify Website Design',
                            'Shopify Theme Customization',
                            'AI Product Website Design',
                            'Website Maintenance & Search Visibility',
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

                        {/* Owner-Approved Hero Body Copy */}
                        <p
                            className="text-base md:text-lg mb-10 max-w-3xl mx-auto leading-relaxed text-gray-600 font-normal"
                            itemProp="description"
                        >
                            Build a personal website, launch a business website, redesign an existing site or create an online store with Frostrek AI. We plan the pages around what your customers need to find and what you want them to do, from exploring a service to sending an enquiry or buying a product.
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

            {/* ═══════ SECTION 2 — HOW WE DESIGN WEBSITES ═══════ */}
            <section
                aria-label="How We Design Websites"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden border-t border-gray-100"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <Compass className="w-3.5 h-3.5" />
                            Design Philosophy
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            How We Design Websites
                        </SplitTextReveal>
                        <div className="mt-4">
                            <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
                                We start by mapping what visitors need to find and do, from viewing a portfolio to sending an enquiry or buying a product. We sketch the page structure and navigation, then create mobile and desktop previews so you can review the layout before development. Before launch, we test navigation, key buttons and any forms or checkout included in the project.
                            </p>
                        </div>
                    </div>

                    {/* Dual Architecture Cards: AI in Design & Methods/Deliverables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
                        {/* Card 1: Where AI Fits in the Design Process */}
                        <div className="p-7 sm:p-9 rounded-3xl bg-[#F0FDF4]/50 border border-[#BBF7D0] flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EE] text-[#166534] text-xs font-bold uppercase tracking-wider mb-4">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    AI-Assisted Workflow
                                </div>
                                <h3 className="font-serif text-2xl text-[#166534] font-bold mb-3">
                                    Where AI Fits in the Design Process
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    Where useful, we use AI to explore layout variations, outline page content and surface questions customers may ask. Our team checks these suggestions against your brand, business facts and customer needs before incorporating them into the design.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Design Methods, Tools and Deliverables */}
                        <div className="p-7 sm:p-9 rounded-3xl bg-[#F0F9FF]/50 border border-[#BAE6FD] flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F2FE] text-[#0284C7] text-xs font-bold uppercase tracking-wider mb-4">
                                    <Sliders className="w-3.5 h-3.5" />
                                    Delivery Standards
                                </div>
                                <h3 className="font-serif text-2xl text-[#0284C7] font-bold mb-3">
                                    Design Methods, Tools & Deliverables
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    We choose the tools around your existing website, the people who will manage it and the features you need. Designs can include a sitemap, user flows, wireframes, mobile and desktop prototypes, and reusable components for navigation, buttons and forms. During review, we check readable typography, keyboard access, image loading, enquiry forms and checkout where included. The handover records who manages the website, where content is edited and what support is included.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 3 — WHAT WE DO / WEBSITE SERVICES ═══════ */}
            <section
                aria-label="What We Do"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden border-t border-gray-100"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Website Services
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            What We Do
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
                                Core website design, development, and maintenance capabilities tailored to your goals.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={buildRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {WHAT_WE_BUILD.map((item) => (
                            <SpotlightCard
                                key={item.title}
                                className={`build-card group relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] border p-6 md:p-8 transition-all duration-300 ${item.bgColor} ${item.border} ${item.hoverShadow} hover:-translate-y-1`}
                                spotlightColor={item.spotlight}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    <div
                                        className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl border flex items-center justify-center mb-5 bg-white/80 ${item.iconBorder} transition-transform duration-300 group-hover:scale-105 shadow-2xs`}
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
                                        className={`font-serif text-lg md:text-xl font-bold mb-3 ${item.headingColor}`}
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

            {/* ═══════ SECTION 4 — WHICH APPROACH FITS YOUR STORE? ═══════ */}
            <section
                aria-label="Which Approach Fits Your Store"
                className="py-16 lg:py-20 bg-white relative z-10 overflow-hidden border-t border-gray-100"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-3xl md:text-4xl text-[#2D6A4F] font-bold mb-4">
                            Which Approach Fits Your Store?
                        </h2>
                        <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed">
                            Share your current store, product range and required buying flow so we can scope the best fit.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Option A: Shopify */}
                        <div className="p-6 sm:p-8 rounded-3xl border border-[#DDD6FE] bg-[#F5F3FF]/40 flex flex-col justify-between">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE9FE] text-[#6D28D9] text-xs font-bold uppercase mb-4">
                                    Shopify Development
                                </div>
                                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#6D28D9] mb-3">
                                    When Shopify is the Best Fit
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                                    Shopify is an option if you want to manage products and orders on Shopify and customize the storefront around your brand. Ideal for fast go-to-market, out-of-the-box merchant tooling, and proven app ecosystem integrations.
                                </p>
                            </div>
                            <ul className="text-xs text-gray-500 space-y-1.5 pt-4 border-t border-[#DDD6FE]/80">
                                <li className="flex items-center gap-2">✓ Native inventory, discount and order management</li>
                                <li className="flex items-center gap-2">✓ Custom Liquid sections and collection pages</li>
                                <li className="flex items-center gap-2">✓ Shopify App Store extension support</li>
                            </ul>
                        </div>

                        {/* Option B: Custom Ecommerce */}
                        <div className="p-6 sm:p-8 rounded-3xl border border-[#BBF7D0] bg-[#F0FDF4]/40 flex flex-col justify-between">
                            <div>
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BBF7D0] text-[#166534] text-xs font-bold uppercase mb-4">
                                    Custom Ecommerce
                                </div>
                                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#166534] mb-3">
                                    When Custom-Coded is the Best Fit
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                                    A custom-coded build is an option when your catalogue, business rules or integrations need more control over how the store works. Tailored workflows, custom multi-currency checkout, and bespoke ERP/warehouse connections.
                                </p>
                            </div>
                            <ul className="text-xs text-gray-500 space-y-1.5 pt-4 border-t border-[#BBF7D0]/80">
                                <li className="flex items-center gap-2">✓ Tailored checkout funnels and custom pricing rules</li>
                                <li className="flex items-center gap-2">✓ Cross-border catalogue logic and international routing</li>
                                <li className="flex items-center gap-2">✓ Direct integrations with internal legacy databases</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 5 — FROM BRIEF TO LAUNCH (OUR PROCESS) ═══════ */}
            <section
                aria-label="From Brief to Launch"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden border-t border-gray-100"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-4">
                            <Compass className="w-3.5 h-3.5" />
                            Structured Execution
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            From Brief to Launch
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
                                A transparent 5-step process designed for predictable delivery, robust quality, and smooth launch.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div
                        ref={processRef}
                        className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8 relative"
                    >
                        {/* Connecting dashed line (desktop) */}
                        <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] -z-10 border-t border-dashed border-[#2D6A4F]/30" />

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

                        {/* ─── 2. Tosmi Project Reference ─── */}
                        <div className="project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                            {/* Left Side: Text Content */}
                            <div className="lg:col-span-5 flex flex-col justify-center text-left">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-widest w-fit mb-4">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    AI Product Website Design
                                </div>
                                <h3 className="font-serif text-2xl sm:text-3xl text-[#2D6A4F] font-semibold leading-snug tracking-tight mb-4">
                                    Tosmi — AI Product Website with 3D-Inspired Design
                                </h3>
                                <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6">
                                    An immersive product experience crafted for Tosmi’s ecommerce AI platform, combining 3D elements, fluid UI animations, and layered visual storytelling.
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <a
                                        href="https://tosmi.ai/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        id="project-tosmi-external-site"
                                        className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2D6A4F] text-white text-xs sm:text-sm font-medium whitespace-nowrap hover:bg-[#1B4332] transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:ring-offset-2"
                                    >
                                        Visit the Tosmi website
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                            {/* Right Side: Image Showcase */}
                            <div className="lg:col-span-7 relative w-full mt-6 lg:mt-0">
                                <div className="relative overflow-hidden group rounded-2xl lg:rounded-[2rem]">
                                    <img
                                        src="/tosmi-screenshot.jpg"
                                        alt="Tosmi — AI product website with 3D-inspired design and layered visuals."
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
                                    A multi-regional corporate web presence engineered for global trade partners, cross-border corporate services, and direct client inquiries. The site features a playful and minimal theme with custom hand-drawn visuals, built with React and Tailwind CSS for an approachable, high-performance experience.
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

            {/* ═══════ SECTION 8 — FREQUENTLY ASKED QUESTIONS ═══════ */}
            <section
                aria-label="Frequently Asked Questions"
                className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden border-t border-gray-100"
                itemScope
                itemType="https://schema.org/FAQPage"
            >
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-3">
                            <LifeBuoy className="w-3.5 h-3.5" />
                            Questions & Answers
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Frequently Asked Questions
                        </SplitTextReveal>
                        <div className="mt-4">
                            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500">
                                Clear answers about scope, technologies, Shopify store changes, and ongoing maintenance.
                            </p>
                        </div>
                    </div>

                    {/* FAQ Search Bar */}
                    <div className="relative mb-8 max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter questions (e.g. personal, shopify, redesign)..."
                            className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all shadow-xs"
                            aria-label="Search frequently asked questions"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 font-semibold"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* FAQ Items */}
                    {filteredFaqs.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 text-sm">
                            No questions match &ldquo;{searchQuery}&rdquo;. Try another term or{' '}
                            <Link to="/contact" className="text-[#2D6A4F] font-semibold underline">
                                contact our team directly
                            </Link>
                            .
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => {
                                const isOpen = openIndex === index;
                                const originalIndex = APPROVED_FAQS.indexOf(faq);
                                const theme = FAQ_THEMES[originalIndex % FAQ_THEMES.length];
                                const numBadge = String(originalIndex + 1).padStart(2, '0');

                                return (
                                    <div
                                        key={faq.q}
                                        itemScope
                                        itemProp="mainEntity"
                                        itemType="https://schema.org/Question"
                                        className={`rounded-2xl border transition-all duration-500 bg-white group ${theme.border} ${theme.hoverBorder} ${isOpen ? `${theme.activeBorder} ${theme.shadow}` : 'hover:shadow-lg'
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(index)}
                                            className="w-full px-5 py-5 sm:px-6 sm:py-6 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
                                            aria-expanded={isOpen}
                                        >
                                            <div className="flex items-center gap-4 sm:gap-6 min-w-0 pr-2">
                                                <span
                                                    className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold border transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
                                                >
                                                    {numBadge}
                                                </span>
                                                <span
                                                    itemProp="name"
                                                    className={`font-serif text-[17px] sm:text-[19px] font-medium transition-colors duration-300 leading-snug ${isOpen ? theme.activeQuestionText : theme.questionText
                                                        }`}
                                                >
                                                    {faq.q}
                                                </span>
                                            </div>
                                            <div
                                                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border ${isOpen
                                                    ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180 shadow-md`
                                                    : `${theme.iconBgInactive} ${theme.iconTextInactive} ${theme.iconBorderInactive}`
                                                    }`}
                                            >
                                                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            </div>
                                        </button>

                                        <motion.div
                                            initial={false}
                                            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                            itemScope
                                            itemProp="acceptedAnswer"
                                            itemType="https://schema.org/Answer"
                                            aria-hidden={!isOpen}
                                        >
                                            <div className="px-5 pb-6 pt-1 sm:px-6 sm:pb-6 leading-relaxed text-[14px] sm:text-[15px] text-gray-500 pl-16 sm:pl-20 max-w-prose">
                                                <span itemProp="text">{faq.a}</span>
                                            </div>
                                        </motion.div>
                                        {!isOpen && <div className="sr-only">{faq.a}</div>}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════ SECTION 9 — TELL US ABOUT YOUR WEBSITE PROJECT (CLOSING CTA) ═══════ */}
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
                                Tell Us About Your
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars"
                                stagger={0.02}
                                once={false}
                                delay={0.2}
                            >
                                Website Project
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
                            Share your current website, if you have one, the type of site you need and the main action you want visitors to take.
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
