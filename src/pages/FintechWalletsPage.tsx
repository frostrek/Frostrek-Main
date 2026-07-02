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
        title: 'Digital Wallets',
        description:
            'Web and mobile wallet platforms with fiat-to-crypto on-ramps, multi-currency support, transaction history, and secure user authentication. Built for consumer and B2B use cases.',
        icon: '/icons/wallet.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Payment Infrastructure',
        description:
            'End-to-end payment rails, gateway integrations (Razorpay, Stripe, PayPal), cross-border settlement logic, merchant onboarding systems, and automated payout engines.',
        icon: '/icons/credit-card.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'Stablecoin & Blockchain Integration',
        description:
            'Custom stablecoin deployment (ERC-20, BEP-20, Polygon), smart contract development, DeFi protocol integration, Web3 wallet embedding, and gas optimization strategies.',
        icon: '/icons/blockchain.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Rewards & Loyalty Platforms',
        description:
            'Gamified earning systems, token economies, cashback engines, referral logic, and points-to-currency redemption flows — built into your product experience.',
        icon: '/icons/investment.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
];

const CAPABILITIES_LEFT = [
    'Fiat-to-crypto on/off ramps',
    'Multi-currency wallet architecture',
    'KYC/AML compliance integration',
    'Transaction ledger & audit trails',
    'Payment gateway integration (Razorpay, Stripe, PayPal)',
    'Cross-border payment routing',
    'Merchant payout automation',
    'Recurring billing & subscriptions',
];

const CAPABILITIES_RIGHT = [
    'Custom stablecoin deployment (ERC-20, BEP-20, Polygon)',
    'Smart contract development & auditing',
    'Token economics design',
    'NFT minting & marketplace integration',
    'DeFi protocol integration',
    'Crypto wallet SDK embedding (MetaMask, WalletConnect)',
    'Gas optimization & transaction batching',
    'Multi-sig custody & cold storage architecture',
];

const INDUSTRIES = [
    {
        title: 'Sports & Entertainment',
        description: 'Fan economies, ticketing, merchandise payments, prediction gaming with real crypto payouts.',
        icon: '/icons/sports.png',
        bgColor: 'bg-[#FFF7ED]',
        border: 'border-[#FFEDD5]',
        hoverBorder: 'hover:border-[#F97316]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(249,115,22,0.07)]',
        headingColor: 'text-[#C2410C]',
        iconBorder: 'border-[#FFEDD5]/60',
        spotlight: 'rgba(249, 115, 22, 0.025)',
    },
    {
        title: 'E-Commerce & Marketplaces',
        description: 'Multi-vendor payment splits, escrow systems, cross-border checkout, automated seller payouts.',
        icon: '/icons/shopping-bag.png',
        bgColor: 'bg-[#F0F9FF]',
        border: 'border-[#BAE6FD]',
        hoverBorder: 'hover:border-[#0EA5E9]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(14,165,233,0.07)]',
        headingColor: 'text-[#0284C7]',
        iconBorder: 'border-[#BAE6FD]/60',
        spotlight: 'rgba(14, 165, 233, 0.025)',
    },
    {
        title: 'Remittances & Cross-Border Payments',
        description: 'Low-fee international transfers, crypto-backed remittance corridors, instant settlement.',
        icon: '/icons/credit-card.png',
        bgColor: 'bg-[#F0FDF4]',
        border: 'border-[#BBF7D0]',
        hoverBorder: 'hover:border-[#22C55E]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(34,197,94,0.07)]',
        headingColor: 'text-[#166534]',
        iconBorder: 'border-[#BBF7D0]/60',
        spotlight: 'rgba(34, 197, 94, 0.025)',
    },
    {
        title: 'Gaming & Social Platforms',
        description: 'In-game currencies, rewards systems, social tipping, creator monetization engines.',
        icon: '/icons/controller.png',
        bgColor: 'bg-[#FFF1F2]',
        border: 'border-[#FECDD3]',
        hoverBorder: 'hover:border-[#E11D48]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(225,29,72,0.07)]',
        headingColor: 'text-[#E11D48]',
        iconBorder: 'border-[#FECDD3]/60',
        spotlight: 'rgba(225, 29, 72, 0.025)',
    },
    {
        title: 'SaaS & Subscriptions',
        description: 'Recurring billing, usage-based pricing, automated invoicing, global payment acceptance.',
        icon: '/icons/dashboard.png',
        bgColor: 'bg-[#FFFBEB]',
        border: 'border-[#FEF3C7]',
        hoverBorder: 'hover:border-[#F59E0B]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.07)]',
        headingColor: 'text-[#B45309]',
        iconBorder: 'border-[#FEF3C7]/60',
        spotlight: 'rgba(245, 158, 11, 0.025)',
    },
    {
        title: 'Banking & Lending',
        description: 'Loan origination systems, credit scoring engines, digital banking platforms, lending dashboards.',
        icon: '/icons/bank.png',
        bgColor: 'bg-[#F5F3FF]',
        border: 'border-[#DDD6FE]',
        hoverBorder: 'hover:border-[#7C3AED]/30',
        hoverShadow: 'hover:shadow-[0_15px_40px_rgba(124,58,237,0.07)]',
        headingColor: 'text-[#6D28D9]',
        iconBorder: 'border-[#DDD6FE]/60',
        spotlight: 'rgba(124, 58, 237, 0.025)',
    },
];

const HOW_WE_WORK = [
    {
        step: '1',
        title: 'Discovery & Scoping',
        description:
            'We audit your requirements, compliance needs, user flows, and existing systems to design the right architecture from Day 1.',
        icon: '/icons/data-analytics.png',
        iconBg: 'bg-[#F0F9FF]',
        iconBorder: 'border-[#BAE6FD]',
        headingColor: 'text-[#0284C7]',
    },
    {
        step: '2',
        title: 'Architecture & Design',
        description:
            'We design payment flows, wallet schema, security models, and tech stack — with compliance, scalability, and user experience in mind.',
        icon: '/icons/innovation.png',
        iconBg: 'bg-[#F0FDF4]',
        iconBorder: 'border-[#BBF7D0]',
        headingColor: 'text-[#166534]',
    },
    {
        step: '3',
        title: 'Build & Integrate',
        description:
            'We develop the platform, integrate payment rails and blockchain layers, run security audits, and deploy to production infrastructure.',
        icon: '/optimized/custom-dev.webp',
        iconBg: 'bg-[#FFF7ED]',
        iconBorder: 'border-[#FFEDD5]',
        headingColor: 'text-[#C2410C]',
    },
    {
        step: '4',
        title: 'Launch & Support',
        description:
            'We go live, monitor transactions in real-time, handle compliance updates, and scale infrastructure as your user base grows.',
        icon: '/icons/collaboration.png',
        iconBg: 'bg-[#FFF1F2]',
        iconBorder: 'border-[#FECDD3]',
        headingColor: 'text-[#E11D48]',
    },
];

const TECH_STACK_MARQUEE = [
    { category: 'Blockchain', name: 'Ethereum', image: '/techstack/blockchain.png' },
    { category: 'Payments', name: 'Razorpay', image: 'https://cdn.worldvectorlogo.com/logos/razorpay.svg' },
    { category: 'Payments', name: 'Stripe', image: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
    { category: 'Payments', name: 'PayPal', image: 'https://cdn.worldvectorlogo.com/logos/paypal-2.svg' },
    { category: 'Crypto Wallets', name: 'MetaMask', image: 'https://cdn.worldvectorlogo.com/logos/metamask.svg' },
    { category: 'KYC / AML', name: 'Sumsub', image: '/icons/shield.png' },
    { category: 'Backend', name: 'Node.js', image: '/techstack/Node.js.svg' },
    { category: 'Backend', name: 'FastAPI', image: '/techstack/FastAPI.svg' },
    { category: 'Backend', name: 'PostgreSQL', image: '/techstack/PostgresSQL.svg' },
    { category: 'Backend', name: 'Redis', image: '/techstack/Redis.svg' },
    { category: 'Frontend', name: 'Next.js', image: '/techstack/Next.js.svg' },
    { category: 'Frontend', name: 'Tailwind CSS', image: '/techstack/Tailwind CSS.svg' },
    { category: 'Infrastructure', name: 'AWS', image: '/techstack/AWS.svg' },
    { category: 'Infrastructure', name: 'Python', image: '/techstack/Python.svg' },
];

/* ──────────────────── COMPONENT ──────────────────── */

const FintechWalletsPage = () => {
    const buildRef = useRef<HTMLDivElement>(null);
    const capabilitiesRef = useRef<HTMLDivElement>(null);
    const industriesRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const techRef = useRef<HTMLDivElement>(null);
    const ctaButtonsRef = useRef<HTMLDivElement>(null);

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

            // Industry tiles
            const industryTiles = industriesRef.current?.querySelectorAll('.industry-tile');
            if (industryTiles) {
                gsap.fromTo(industryTiles, { y: 40, opacity: 0, scale: 0.95 }, {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: { trigger: industriesRef.current, start: 'top 85%', toggleActions: 'play reverse play reverse' },
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
                title="Fintech & Custom Wallets | Development Services | Frostrek AI"
                description="Frostrek builds production-grade digital wallets, payment infrastructure, and stablecoin platforms. Engineered for real money, real compliance, and real users."
                keywords="fintech development company India, custom digital wallet development, payment infrastructure development, stablecoin development ERC-20 BEP-20 Polygon, blockchain integration services, DeFi protocol integration, KYC AML compliance integration, Web3 wallet development, crypto payment gateway, Razorpay Stripe PayPal integration, smart contract development"
                path="/solutions/fintech-custom-wallets"
                schema={[
                    JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "name": "Fintech & Custom Wallet Development",
                        "description": "Frostrek AI builds production-grade digital wallets, payment infrastructure, stablecoin platforms, and DeFi integrations — engineered for real money, real compliance, and real users.",
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
                                "email": "contact@frostrek.com",
                                "contactType": "sales"
                            }
                        },
                        "serviceType": ["Digital Wallet Development", "Payment Infrastructure", "Stablecoin Development", "Blockchain Integration", "DeFi Integration", "KYC/AML Compliance", "Smart Contract Development"],
                        "areaServed": ["IN", "US", "GB", "AE", "SG"],
                        "url": "https://www.frostrek.ai/solutions/fintech-custom-wallets"
                    }),
                    JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What fintech solutions does Frostrek build?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Frostrek builds digital wallets (web & mobile), payment infrastructure with Razorpay, Stripe and PayPal integrations, custom stablecoin platforms (ERC-20, BEP-20, Polygon), DeFi protocol integrations, and rewards & loyalty platforms — all with KYC/AML compliance built in."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Can Frostrek build a custom digital wallet with crypto support?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes. Frostrek engineers multi-currency wallets with fiat-to-crypto on-ramps, Web3 wallet embedding (MetaMask, WalletConnect), transaction ledgers, and secure user authentication — for both consumer and B2B use cases."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Does Frostrek handle KYC and AML compliance integration?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes. Frostrek integrates leading KYC/AML providers including Sumsub, Onfido, and Jumio into payment and wallet platforms, ensuring regulatory compliance from Day 1."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "What blockchain networks does Frostrek develop on?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Frostrek develops on Ethereum, Polygon, Binance Smart Chain (BSC), and Solana. Services include smart contract development & auditing, stablecoin deployment, NFT minting, gas optimization, and multi-sig custody architecture."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "How long does it take to build a fintech platform with Frostrek?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Frostrek follows a 4-step process: Discovery & Scoping → Architecture & Design → Build & Integrate → Launch & Support. Timeline depends on scope, but most MVP fintech platforms ship within 8–16 weeks."
                                }
                            }
                        ]
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
                            OUR SERVICES
                        </motion.div>

                        {/* Headline */}
                        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mb-8 tracking-tight max-w-5xl mx-auto leading-tight text-[#2D6A4F]">
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false}>
                                Fintech & Custom Wallets
                            </SplitTextReveal>
                            <br />
                            <SplitTextReveal as="span" className="text-[#2D6A4F]" type="chars" stagger={0.02} once={false} delay={0.2}>
                                Built for Scale, Secured for Trust
                            </SplitTextReveal>
                        </div>

                        {/* Answer-First SEO Subtext */}
                        <p
                            className="text-base md:text-lg mb-10 max-w-3xl mx-auto leading-relaxed text-gray-600 font-medium"
                            itemProp="description"
                        >
                            We build production-grade digital wallets, custom stablecoin platforms, and secure payment infrastructure. Designed for sports franchises, marketplaces, and SaaS companies, our multi-currency architecture allows you to bypass traditional gateway fees. Take full ownership of your transaction data and significantly reduce commission costs.
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
                                id="fintech-hero-cta-primary"
                                className="group relative w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#2D6A4F] text-white rounded-full font-medium text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5"
                            >
                                Talk to Us
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
                            What We Build
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                End-to-end fintech solutions across wallets, payments, blockchain, and rewards.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={buildRef} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
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

            {/* ═══════ SECTION 3 — OUR FINTECH CAPABILITIES (Split-view) ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Our Fintech Capabilities
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Deep technical expertise across payments, blockchain, and compliance — everything needed to build financial infrastructure that works.
                            </SplitTextReveal>
                        </div>
                    </div>

                    {/* Split view: two checklist columns */}
                    <div ref={capabilitiesRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
                        {/* Left column — Wallet & Payments */}
                        <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-[1.25rem] md:rounded-[2rem] p-4 md:p-10">
                            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                                <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-[#0284C7]/10 border border-[#BAE6FD] flex items-center justify-center">
                                    <img src="/icons/credit-card.png" alt="Wallet & Payments" className="w-4 h-4 md:w-6 md:h-6 object-contain" loading="lazy" width={512} height={512} />
                                </div>
                                <h3 className="font-serif text-[15px] md:text-xl font-bold text-[#0284C7]">Wallet & Payments</h3>
                            </div>
                            <ul className="space-y-2.5 md:space-y-4">
                                {CAPABILITIES_LEFT.map((item) => (
                                    <li key={item} className="cap-item flex items-start gap-2 md:gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#0284C7] flex-shrink-0 mt-0.5" strokeWidth={2} />
                                        <span className="text-gray-700 text-[12px] md:text-sm leading-snug md:leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right column — Blockchain & Tokenization */}
                        <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[1.25rem] md:rounded-[2rem] p-4 md:p-10">
                            <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                                <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-[#166534]/10 border border-[#BBF7D0] flex items-center justify-center">
                                    <img src="/icons/blockchain.png" alt="Blockchain" className="w-4 h-4 md:w-6 md:h-6 object-contain" loading="lazy" width={512} height={512} />
                                </div>
                                <h3 className="font-serif text-[15px] md:text-xl font-bold text-[#166534]">Blockchain & Tokenization</h3>
                            </div>
                            <ul className="space-y-2.5 md:space-y-4">
                                {CAPABILITIES_RIGHT.map((item) => (
                                    <li key={item} className="cap-item flex items-start gap-2 md:gap-3">
                                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#166534] flex-shrink-0 mt-0.5" strokeWidth={2} />
                                        <span className="text-gray-700 text-[12px] md:text-sm leading-snug md:leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION 4 — INDUSTRIES WE SERVE ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Industries We Serve
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                Fintech solutions tailored to the unique needs of different verticals.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={industriesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                        {INDUSTRIES.map((ind) => (
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

            {/* ═══════ SECTION 5 — HOW WE WORK ═══════ */}
            <section className="py-16 lg:py-24 bg-white relative z-10 overflow-hidden">
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
                                A proven process from discovery to deployment — transparent, collaborative, and engineered for scale.
                            </SplitTextReveal>
                        </div>
                    </div>

                    <div ref={processRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 relative">
                        {/* Connecting dashed line (desktop) */}
                        <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[1px] -z-10 border-t border-dashed border-[#2D6A4F]/30" />

                        {HOW_WE_WORK.map((step) => (
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

            {/* ═══════ SECTION 6 — TECH STACK & INTEGRATIONS (Marquee) ═══════ */}
            <section className="py-16 lg:py-24 bg-brand-light-bg relative z-10 overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars" stagger={0.02} once={false}
                        >
                            Tech Stack & Integrations
                        </SplitTextReveal>
                        <div className="mt-4">
                            <SplitTextReveal
                                as="p"
                                className="max-w-2xl mx-auto text-lg text-gray-500"
                                type="words" stagger={0.02} once={false} delay={0.3}
                            >
                                We work with the best tools and platforms in fintech and blockchain.
                            </SplitTextReveal>
                        </div>
                    </div>
                </div>

                {/* Marquee reel — identical structure to HiyringPage */}
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

            {/* ═══════ SECTION 7 — CLOSING CTA ═══════ */}
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
                                Ready to Build Your
                            </SplitTextReveal>
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                type="chars" stagger={0.02} once={false} delay={0.2}
                            >
                                Fintech Platform?
                            </SplitTextReveal>
                        </div>
                        <SplitTextReveal
                            as="p"
                            className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed"
                            type="words" stagger={0.02} once={false} delay={0.3}
                        >
                            Let's talk about your wallet, payment system, or blockchain integration.
                        </SplitTextReveal>
                        <div ref={ctaButtonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/contact"
                                id="fintech-cta-start-project"
                                className="cta-btn group relative flex items-center gap-3 px-10 py-5 bg-[#2D6A4F] text-white rounded-full text-lg transition-all hover:bg-[#1B4332] shadow-[0_10px_30px_rgba(45,106,79,0.2)] hover:shadow-[0_10px_40px_rgba(45,106,79,0.3)] hover:-translate-y-0.5 overflow-hidden"
                            >
                                Start a Project
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FintechWalletsPage;
