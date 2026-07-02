import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SplitTextReveal from '../ui/SplitTextReveal';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRODUCTS = [
    {
        id: 'Vedashi',
        title: 'Vedashi Ecommerce',
        subtitle: 'An global Ecommerce platform empowering Indian Wellness brands to scale globally without the complexities of international expansion.',
        description: 'An end-to-end tech and logistics platform that helps Indian wellness, food, and beauty brands go global effortlessly.',
        image: '/vedashi-info1.jpeg',
        features: [
            "Seamless global market expansion",
            "End-to-end logistics & supply chain",
            "Multi-currency cross-border payments"
        ],
        featureBgColor: "bg-[#E6EFE6]",
        featureIconColor: "text-[#2D6A4F]",
        icon: <img src="/optimized/vedashi-logo-sm.webp" alt="Vedashi" className="w-8 h-8 md:w-12 md:h-12 object-contain" loading="lazy" width={512} height={512} />,
        bgColor: 'bg-white',
        titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500',
        borderColor: 'border-green-200',
        spotlightColor: 'rgba(16, 185, 129, 0.18)',
        colSpan: 'md:col-span-2',
        rowSpan: 'row-span-1',
        imagePos: 'right',
        link: '/products/vedashi-ecommerce',
        arrowColor: 'text-[#2D6A4F]' // Mid-tone Green
    },
    {
        id: 'VettEdge',
        title: 'VettEdge',
        subtitle: 'Standalone AI-powered financial due diligence, valuation, and investment memo platform - the first product shipped by Frostrek AI on the path to FundOS, the AI operating system for fund managers.',
        description: 'Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.',
        features: [
            "AI-powered financial due diligence",
            "Automated valuation models",
            "Instant investment memos"
        ],
        featureBgColor: "bg-sky-50",
        featureIconColor: "text-[#0284C7]",
        image: '/images/ai_agents_white_collar.png',
        icon: <img src="/icons/ai-blue.png" alt="AI Agents" className="w-7 h-7 md:w-10 md:h-10 object-contain" loading="lazy" width={512} height={512} />,
        bgColor: 'bg-white',
        titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600',
        borderColor: 'border-blue-200',
        spotlightColor: 'rgba(14, 165, 233, 0.18)',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-2',
        imagePos: 'bottom',
        link: '/products/vettedge',
        arrowColor: 'text-[#0284C7]' // Mid-tone Blue
    },
    {
        id: 'Hiyring',
        title: 'Hiyring',
        description: 'Platform that streamlines hiring process with autonomous AI video interviews. Screen thousands of candidates in minutes.',
        features: [
            "Autonomous AI video interviews",
            "Screen thousands in minutes",
            "Scientific & unbiased assessments"
        ],
        featureBgColor: "bg-orange-50",
        featureIconColor: "text-[#E95E1C]",
        icon: <img src="/products/hiyring-logo.png" alt="Hiyring" className="w-8 h-8 md:w-12 md:h-12 object-contain p-0" loading="lazy" width={512} height={512} />,
        bgColor: 'bg-white',
        titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500',
        borderColor: 'border-orange-200',
        spotlightColor: 'rgba(249, 115, 22, 0.18)',
        colSpan: 'md:col-span-1',
        rowSpan: 'row-span-1',
        link: '/products/hiyring',
        arrowColor: 'text-[#E95E1C]' // Mid-tone Orange
    },
    {
        id: 'Frosty',
        title: 'Website Chatbot ',
        description: 'Our easy to plug chatbot is here to handle the heavy lifting while your team focuses on closing.',
        features: [
            "Trained on your data",
            "Human-like conversations",
            "Lead capture & CRM integration"
        ],
        featureBgColor: "bg-[#FDF4FA]",
        featureIconColor: "text-[#D67CBA]",
        icon: <img src="/icons/machine-learning-lavender.png" alt="AI Model Training" className="w-7 h-7 md:w-10 md:h-10 object-contain" loading="lazy" width={512} height={512} />,
        bgColor: 'bg-white',
        titleColor: 'text-[#D67CBA]',
        borderColor: 'border-[#F2BAE4]',
        spotlightColor: 'rgba(242, 186, 228, 0.45)',
        colSpan: 'md:col-span-1',
        rowSpan: 'row-span-1',
        link: '/products/frosty-ai',
        arrowColor: 'text-[#D67CBA]'
    },
];

const SpotlightCard = ({ product, index }: { product: any, index: number }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current || isFocused) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <Link
            to={product.link}
            className={`${product.colSpan} ${product.rowSpan} flex`}
        >
            <motion.div
                ref={divRef}
                onMouseMove={handleMouseMove}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${product.bgColor} w-full rounded-2xl md:rounded-3xl border-2 ${product.borderColor} overflow-hidden group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col relative`}
            >
                {/* Spotlight Gradient */}
                <div
                    className="pointer-events-none absolute -inset-px transition duration-300 z-0 rounded-2xl md:rounded-3xl"
                    style={{
                        opacity,
                        background: `radial-gradient(700px circle at ${position.x}px ${position.y}px, ${product.spotlightColor}, transparent 40%)`,
                    }}
                />

                <div className={`flex flex-col h-full w-full relative z-10 ${product.imagePos === 'right' ? 'md:flex-row' : ''} ${product.imagePos === 'left' ? 'md:flex-row-reverse' : ''}`}>

                    {/* Content Area */}
                    <div className={`p-4 md:p-6 lg:p-8 flex flex-col relative z-10 ${product.imagePos === 'right' || product.imagePos === 'left'
                        ? 'md:w-1/2 md:h-full flex-1'
                        : 'w-full flex-1'
                        }`}>
                        <div className="w-10 h-10 md:w-14 md:h-14 flex items-center mb-4 relative z-10">
                            {product.icon}
                        </div>

                        <div className="relative z-10">
                            <h3 className={`font-serif text-lg md:text-3xl font-semibold ${product.titleColor || 'text-black'} mb-1.5 md:mb-2.5 leading-tight`}>
                                {product.title}
                            </h3>

                            <p className="text-[11px] md:text-[14px] text-gray-600 leading-relaxed max-w-prose">
                                {product.subtitle || product.description}
                            </p>

                            {product.features && (
                                <div className="mt-3.5 md:mt-5 space-y-1.5">
                                    {product.features.map((feature: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2">
                                            <div className={`flex-shrink-0 w-4 h-4 rounded-full ${product.featureBgColor || 'bg-[#E6EFE6]'} flex items-center justify-center`}>
                                                <CheckCircle2 className={`w-3 h-3 ${product.featureIconColor || 'text-[#2D6A4F]'}`} />
                                            </div>
                                            <span className="text-[12px] md:text-[13px] text-gray-600">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Premium Floating Arrow Icon */}
                        <div className="absolute top-4 right-4 md:top-10 md:right-10 transition-all duration-300 group-hover:scale-110 z-10">
                            <ArrowUpRight className={`w-5 h-5 md:w-8 md:h-8 ${product.arrowColor} transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1`} />
                        </div>

                        {/* Subtle Glass Highlight */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none z-0" />
                    </div>

                    {/* Image Area */}
                    {product.image && (
                        <div className={`relative overflow-hidden shrink-0 hidden md:block z-10 ${product.imagePos === 'right' || product.imagePos === 'left'
                            ? 'md:w-1/2 h-56 sm:h-64 md:h-full'
                            : 'w-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px]'
                            }`}>
                            <div className={`absolute inset-0 p-4 md:p-6 h-full w-full`}>
                                <img src={product.image}
                                    alt=""
                                    className="w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-700 group-hover:scale-105 relative z-10" loading="lazy" width={512} height={512} />
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
    );
};

const OurProductsSection = () => {
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} className="relative py-16 md:py-32 overflow-hidden bg-white font-body">
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

                {/* Header */}
                <div className="text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-wide mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Products
                    </motion.div>

                    <div className="flex flex-col items-center mb-6">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-tight tracking-tight"
                            type="chars"
                            stagger={0.03}
                            once={false}
                        >
                            Our Products
                        </SplitTextReveal>
                    </div>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        From conversational AI agents to full-stack development - 50+ engineers delivering production-ready systems in 4-8 weeks.
                    </p>
                </div>

                {/* Jumbled Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 md:auto-rows-fr">
                    {PRODUCTS.map((product, index) => (
                        <SpotlightCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurProductsSection;
