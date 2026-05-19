import { useRef } from 'react';
import { motion } from 'framer-motion';
import SplitTextReveal from '../ui/SplitTextReveal';
import { Sparkles } from 'lucide-react';

const PRODUCTS = [
    {
        id: 'Vedashi',
        title: 'Vedashi Ecommerce',
        subtitle: 'An global Ecommerce platform empowering Indian Ayurvedic and Wellness brands and startups to scale globally without the complexities of international expansion.',
        description: 'An end-to-end tech and logistics platform that helps Indian wellness, food, and beauty brands go global effortlessly.',
        image: '/images/custom_software_vibe.png',
        icon: <img src="/products/vedashi-logo.png" alt="Vedashi" className="w-12 h-12 object-contain" />,
        bgColor: 'bg-[#F0FDF4]', // Light Green
        textColor: 'text-black',
        borderColor: 'border-green-100',
        colSpan: 'md:col-span-2',
        rowSpan: 'row-span-1',
        imagePos: 'right'
    },
    {
        id: 'VettEdge',
        title: 'VettEdge',
        subtitle: 'Standalone AI-powered financial due diligence, valuation, and investment memo platform - the first product shipped by Frostrek AI on the path to FundOS, the AI operating system for fund managers.',
        description: 'Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.',
        image: '/images/ai_agents_white_collar.png',
        icon: <img src="/icons/ai.png" alt="AI Agents" className="w-10 h-10 object-contain" />,
        bgColor: 'bg-[#FFF7ED]', // Light Orange
        textColor: 'text-black',
        borderColor: 'border-orange-100',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-2',
        imagePos: 'bottom'
    },
    // #FE#f0fbfeff
    {
        id: 'Hiyring',
        title: 'Hiyring',
        description: 'Platform that streamlines hiring process with autonomous AI video interviews. Screen thousands of candidates in minutes, with scientifically focused assessments.',
        icon: <img src="/products/hiyring-logo.png" alt="Hiyring" className="w-12 h-12 object-contain p-0" />,
        bgColor: 'bg-[#f0fbfeff]', // Light Pink/Red
        textColor: 'text-black',
        borderColor: 'border-pink-100',
        colSpan: 'md:col-span-1',
        rowSpan: 'row-span-1',
    },
    {
        id: 'Frosty',
        title: 'Website Chatbot (FROSTY) ',
        description: 'Connect your data streams, automate customer journeys. Our easy to plug chatbot is here to handle the heavy lifting while your team focuses on closing.',
        icon: <img src="/icons/machine-learning.png" alt="AI Model Training" className="w-10 h-10 object-contain" />,
        bgColor: 'bg-[#FFFBEB]', // Light Yellow
        textColor: 'text-black',
        borderColor: 'border-amber-100',
        colSpan: 'md:col-span-1',
        rowSpan: 'row-span-1',
    },
];

const OurProductsSection = () => {
    const sectionRef = useRef(null);

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden bg-white font-body">
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">

                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-widest mb-6"
                    >
                        <Sparkles className="w-4 h-4" />
                        Products
                    </motion.div>

                    <div className="flex flex-col items-center mb-6">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#2D6A4F] leading-tight tracking-tight"
                            type="chars"
                            stagger={0.03}
                            once={false}
                        >
                            Our Products
                        </SplitTextReveal>
                    </div>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        From conversational AI agents to full-stack development - 50+ engineers delivering production-ready systems in 4-8 weeks.
                    </p>
                </div>

                {/* Jumbled Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                    {PRODUCTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`${product.bgColor} ${product.colSpan} ${product.rowSpan} rounded-3xl border ${product.borderColor} overflow-hidden group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 flex flex-col`}
                        >
                            <div className={`flex flex-col h-full ${product.imagePos === 'right' ? 'md:flex-row' : ''} ${product.imagePos === 'left' ? 'md:flex-row-reverse' : ''}`}>

                                {/* Content Area */}
                                <div className={`p-8 md:p-10 flex flex-col relative z-10 ${product.imagePos === 'right' || product.imagePos === 'left'
                                    ? 'md:w-1/2 h-full'
                                    : 'w-full flex-grow basis-1/2'
                                    }`}>
                                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-md bg-white border border-gray-100/50">
                                        {product.icon}
                                    </div>

                                    <div>
                                        <h3 className={`font-serif text-2xl md:text-3xl font-semibold ${product.textColor} mb-4 leading-tight`}>
                                            {product.title}
                                        </h3>

                                        <p className="text-gray-600 font-medium leading-relaxed max-w-prose">
                                            {product.subtitle || product.description}
                                        </p>
                                    </div>

                                    {/* Subtle Glass Highlight */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
                                </div>

                                {/* Image Area */}
                                {product.image && (
                                    <div className={`relative overflow-hidden ${product.imagePos === 'right' || product.imagePos === 'left'
                                        ? 'md:w-1/2 h-64 md:h-full'
                                        : 'w-full flex-grow basis-1/2 min-h-[300px]'
                                        }`}>
                                        <div className={`absolute inset-0 p-4 md:p-6 h-full w-full`}>
                                            <img
                                                src={product.image}
                                                alt=""
                                                className="w-full h-full object-cover rounded-2xl shadow-lg transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurProductsSection;
