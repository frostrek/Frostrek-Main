import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, Mic, MessageSquare, Linkedin, Database, ArrowRight, Sparkles, Play, ChevronRight, Users, Trophy, Factory } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    description: string;
    shortDesc: string;
    icon: React.ElementType;
    href: string;
    features: string[];
    category: 'core' | 'enterprise';
    liveBuild?: boolean;
}

const products: Product[] = [
    {
        id: 'frosty-ai',
        name: 'Frosty AI Agent',
        description: 'Advanced conversational AI for customer service.',
        shortDesc: 'Resolve 80% of inquiries instantly with context-aware responses.',
        icon: Bot,
        href: '/products/frosty-ai',
        features: ['24/7 Support', 'Multi-channel', 'Smart Handoff'],
        category: 'core'
    },
    {
        id: 'voice-ai',
        name: 'Voice AI Agent',
        description: 'Human-like voice interactions for support and sales.',
        shortDesc: 'Ultra-low latency voice AI that sounds natural.',
        icon: Mic,
        href: '/products/voice-ai',
        features: ['Sub-200ms', '40+ Languages', 'Real-time'],
        category: 'core'
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp Agents',
        description: 'Automated WhatsApp business communication.',
        shortDesc: '98% open rate with interactive messaging.',
        icon: MessageSquare,
        href: '/products/whatsapp-agents',
        features: ['98% Open Rate', 'Rich Media', 'Broadcasts'],
        category: 'core'
    },
    {
        id: 'frostrek-web3-commerce',
        name: 'Frostrek Web3 Commerce',
        description: 'Web3 Sports Merchandise Platform.',
        shortDesc: 'Bridging Web3 finance and the global sports merchandise market.',
        icon: Trophy,
        href: '/products/frostrek-web3-commerce',
        features: ['Multi-tenant Clubs', '$TOKEN Payments', 'On-chain Settlement'],
        category: 'enterprise',
        liveBuild: true
    },
    {
        id: 'frostrek-manufacturing-os',
        name: 'Frostrek Manufacturing OS',
        description: 'A complete real-time intelligence platform for 24/7 manufacturing operations. Unifies ERP, WMS, and SCADA.',
        shortDesc: 'Recovering 25+ tonnes of lost production weekly with AI scheduling.',
        icon: Factory,
        href: '/products/frostrek-manufacturing-os',
        features: ['Live Telemetry', 'AI Scheduling', 'Cost Intelligence'],
        category: 'enterprise',
        liveBuild: true
    },
    {
        id: 'linkedin',
        name: 'LinkedIn Automation',
        description: 'Scale your outreach with smart automation.',
        shortDesc: 'AI-powered outreach that converts.',
        icon: Linkedin,
        href: '/products/linkedin-automation',
        features: ['Smart Targeting', 'Auto Follow-up', 'Analytics'],
        category: 'enterprise'
    },
    {
        id: 'hiyring',
        name: 'Hiyring',
        description: 'Transforming talent acquisition through AI-powered interviews.',
        shortDesc: 'Screen thousands of candidates in minutes with AI video interviews.',
        icon: Users,
        href: '/products/hiyring',
        features: ['AI Video Interviews', 'Instant Screening', 'Bias Reduction'],
        category: 'enterprise'
    },
    {
        id: 'erpnext',
        name: 'ERPNext AI Modules',
        description: 'Intelligent add-ons for your ERP system.',
        shortDesc: 'Reduce operational costs by 60%.',
        icon: Database,
        href: '/products/erpnext-ai',
        features: ['Auto Processing', 'Predictions', 'Reports'],
        category: 'enterprise'
    }
];

// Animated Product Card with Hover Expansions
const ProductCard = ({ product, index, isActive, onClick }: {
    product: Product;
    index: number;
    isActive: boolean;
    onClick: () => void;
}) => {
    const IconComponent = product.icon as any;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={onClick}
            className={`relative cursor-pointer group ${isActive ? 'z-20' : 'z-10'}`}
        >
            {/* Card */}
            <motion.div
                layout
                className={`relative overflow-hidden rounded-2xl border transition-all duration-500 bg-white ${
                    isActive
                        ? 'border-[#2D6A4F] shadow-2xl shadow-[#2D6A4F]/10'
                        : 'border-gray-200 hover:border-[#2D6A4F]/50 hover:shadow-xl'
                }`}
            >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#E8F5EE]/30 to-transparent" />

                {/* Active Indicator */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            exit={{ scaleX: 0 }}
                            className="absolute top-0 left-0 w-full h-1 origin-left bg-[#2D6A4F]"
                        />
                    )}
                </AnimatePresence>

                <div className="relative p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                        {/* Icon with animated ring */}
                        <motion.div
                            className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 bg-[#E8F5EE]"
                            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                        >
                            {/* Pulse ring when active */}
                            {isActive && (
                                <motion.div
                                    initial={{ scale: 1, opacity: 0.5 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute inset-0 rounded-2xl bg-[#2D6A4F]/30"
                                />
                            )}
                            <IconComponent className="w-7 h-7 relative z-10 text-[#2D6A4F]" />
                        </motion.div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h4 className={`text-lg font-bold transition-colors duration-300 text-gray-900 ${
                                    isActive ? 'text-[#2D6A4F]' : 'group-hover:text-[#2D6A4F]'
                                }`}>
                                    {product.name}
                                </h4>
                                {product.liveBuild && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/25">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
                                        Live Build
                                    </span>
                                )}
                            </div>
                            {/* FIXED: text-slate-500 instead of text-dark-text-muted to ensure crisp contrast */}
                            <p className="text-sm text-slate-500 font-medium">
                                {product.description}
                            </p>
                        </div>

                        {/* Arrow indicator */}
                        <motion.div
                            animate={{ x: isActive ? 0 : -5, opacity: isActive ? 1 : 0 }}
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#E8F5EE]"
                        >
                            <ChevronRight className="w-4 h-4 text-[#2D6A4F]" />
                        </motion.div>
                    </div>

                    {/* Expanded Content */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 border-t border-gray-100">
                                    <p className="text-sm mb-4 text-slate-600 font-medium leading-relaxed">
                                        {product.shortDesc}
                                    </p>

                                    {/* Feature Pills */}
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {product.features.map((feature, i) => (
                                            <motion.span
                                                key={feature}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/15"
                                            >
                                                {feature}
                                            </motion.span>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <Link to={product.href}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 bg-[#2D6A4F] text-white hover:bg-[#1B4332] cursor-pointer"
                                        >
                                            <Play className="w-4 h-4 fill-current text-white" />
                                            Explore {product.name.split(' ')[0]}
                                            <ArrowRight className="w-4 h-4 text-white" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
};

// Connection Line Between Cards
const ConnectionLine = ({ isVisible }: { isVisible: boolean }) => {
    return (
        <motion.div
            className="hidden lg:flex items-center justify-center h-2 -my-1 relative z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
        >
            <motion.div
                className="w-0.5 h-full bg-[#2D6A4F]/20"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isVisible ? 1 : 0 }}
                transition={{ duration: 0.5 }}
            />
            {/* Animated dot */}
            {isVisible && (
                <motion.div
                    className="absolute w-2 h-2 rounded-full bg-[#2D6A4F]"
                    initial={{ y: -20 }}
                    animate={{ y: 20 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            )}
        </motion.div>
    );
};

const AllProductsSection = () => {
    const [activeProduct, setActiveProduct] = useState<string | null>(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const featuredProducts = products.filter(p => p.liveBuild);
    const coreProducts = products.filter(p => p.category === 'core');
    const enterpriseProducts = products.filter(p => p.category === 'enterprise' && !p.liveBuild);

    return (
        <section
            ref={sectionRef}
            className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-[#F9FBFA] font-body"
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl bg-[#2D6A4F]/5"
                />
                <motion.div
                    animate={{ x: [0, -30, 0], y: [0, 50, 0], scale: [1, 1.15, 1] }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute bottom-40 left-10 w-80 h-80 rounded-full blur-3xl bg-[#2D6A4F]/5"
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 space-y-4"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/25"
                    >
                        <Sparkles className="w-4 h-4 text-[#2D6A4F]" />
                        <span className="text-sm font-bold text-[#2D6A4F]">Product Suite</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-gray-900 leading-tight">
                        Explore Our <span className="text-[#2D6A4F]">AI Products</span>
                    </h2>
                    {/* FIXED: text-slate-500 instead of text-dark-text-muted to ensure visibility */}
                    <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-500 font-medium">
                        Click on any product to explore its features and capabilities
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto">

                    {/* ── FEATURED BUILDS ROW ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-3 mb-6"
                    >
                        <div className="w-1.5 h-8 rounded-full bg-[#2D6A4F]" />
                        <span className="text-sm font-extrabold uppercase tracking-wider text-[#2D6A4F]">
                            Featured Builds — Deployed by Frostrek
                        </span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
                        {featuredProducts.map((product, idx) => {
                            const IconComp = product.icon as any;
                            const isActive = activeProduct === product.id;
                            return (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: idx * 0.12 }}
                                    onClick={() => setActiveProduct(isActive ? null : product.id)}
                                    className="cursor-pointer group"
                                >
                                    {/* FIXED: pure white card with glowing emerald border instead of dark-black box */}
                                    <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 bg-white ${
                                        isActive 
                                            ? 'border-[#2D6A4F] shadow-xl shadow-[#2D6A4F]/10' 
                                            : 'border-[#2D6A4F]/15 hover:border-[#2D6A4F]/45 hover:shadow-lg'
                                    }`}>
                                        {/* Gradient bg */}
                                        <div className={`absolute inset-0 bg-gradient-to-br from-[#E8F5EE]/40 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />

                                        {/* Top accent */}
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
                                                    className="absolute top-0 left-0 w-full h-1 origin-left bg-[#2D6A4F]" />
                                            )}
                                        </AnimatePresence>

                                        <div className="relative p-6">
                                            <div className="flex items-start gap-4 mb-3">
                                                <motion.div
                                                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                                                    transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                                                    className="relative w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#E8F5EE]"
                                                >
                                                    {isActive && (
                                                        <motion.div initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.5, opacity: 0 }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                            className="absolute inset-0 rounded-2xl bg-[#2D6A4F]/30" />
                                                    )}
                                                    <IconComp className="w-7 h-7 relative z-10 text-[#2D6A4F]" />
                                                </motion.div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className={`text-lg font-bold transition-colors text-gray-900 ${
                                                            isActive ? 'text-[#2D6A4F]' : 'group-hover:text-[#2D6A4F]'
                                                        }`}>
                                                            {product.name}
                                                        </h4>
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/25">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
                                                            Live Build
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-500 font-medium">{product.description}</p>
                                                </div>

                                                <motion.div
                                                    animate={{ x: isActive ? 0 : -5, opacity: isActive ? 1 : 0 }}
                                                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#E8F5EE]"
                                                >
                                                    <ChevronRight className="w-4 h-4 text-[#2D6A4F]" />
                                                </motion.div>
                                            </div>

                                            {/* Feature pills always visible */}
                                            <div className="flex flex-wrap gap-2 ml-[72px]">
                                                {product.features.map((f) => (
                                                    <span key={f} className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/15">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Expanded CTA */}
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                                                        <div className="pt-4 mt-4 border-t border-gray-150">
                                                            <p className="text-sm mb-4 text-slate-600 font-medium leading-relaxed">{product.shortDesc}</p>
                                                            <Link to={product.href}>
                                                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                                                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[#2D6A4F] text-white hover:bg-[#1B4332] transition-all cursor-pointer border-none">
                                                                    <Play className="w-4 h-4 text-white fill-current" />
                                                                    View Case Study
                                                                    <ArrowRight className="w-4 h-4 text-white" />
                                                                </motion.button>
                                                            </Link>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ── CORE + ENTERPRISE COLUMNS ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Core AI Agents */}
                        <div>
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-8 rounded-full bg-[#2D6A4F]" />
                                <span className="text-sm font-extrabold uppercase tracking-wider text-[#2D6A4F]">Core AI Agents</span>
                            </motion.div>
                            <div className="space-y-4">
                                {coreProducts.map((product, idx) => (
                                    <div key={product.id}>
                                        <ProductCard product={product} index={idx} isActive={activeProduct === product.id}
                                            onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)} />
                                        {idx < coreProducts.length - 1 && <ConnectionLine isVisible={activeProduct === product.id} />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Enterprise Tools */}
                        <div>
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }} className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-8 rounded-full bg-[#2D6A4F]" />
                                <span className="text-sm font-extrabold uppercase tracking-wider text-[#2D6A4F]">Enterprise Tools</span>
                            </motion.div>
                            <div className="space-y-4">
                                {enterpriseProducts.map((product, idx) => (
                                    <div key={product.id}>
                                        <ProductCard product={product} index={idx + 3} isActive={activeProduct === product.id}
                                            onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)} />
                                        {idx < enterpriseProducts.length - 1 && <ConnectionLine isVisible={activeProduct === product.id} />}
                                    </div>
                                ))}
                            </div>

                            {/* CTA Card */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }}
                                className="mt-6 p-6 rounded-2xl border-2 border-dashed border-[#2D6A4F]/25 bg-[#E8F5EE]/30">
                                <div className="text-center space-y-2">
                                    <h4 className="font-serif font-bold text-gray-900 text-lg">Need a Custom Solution?</h4>
                                    <p className="text-sm text-slate-600 font-medium">Let's build something tailored for your business.</p>
                                    <div className="pt-2">
                                        <Link to="/contact">
                                            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                                className="px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mx-auto transition-all duration-300 bg-white text-[#2D6A4F] border border-[#2D6A4F]/25 hover:bg-[#E8F5EE]/50 cursor-pointer">
                                                Contact Us <ArrowRight className="w-4 h-4 text-[#2D6A4F]" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AllProductsSection;
