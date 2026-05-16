import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitTextReveal from '../ui/SplitTextReveal';
import { Sparkles } from 'lucide-react';

const SERVICES = [
    {
        id: 'development',
        title: 'Custom Software Development',
        subtitle: 'Bring your ideas to life with stunning UI, seamless UX, and powerful performance—built for scale and everything in between.',
        description: 'Tailor-made tech to fit your business like a glove. We build the exact tools you need to grow smarter.',
        icon: <img src="/icons/custom dev.png" alt="Custom Software Development" className="w-10 h-10 object-contain" />,
        bgColor: 'bg-[#F0FDF4]', // Light Green
        textColor: 'text-black',
        borderColor: 'border-green-100',
        colSpan: 'md:col-span-2',
        rowSpan: 'row-span-1',
    },
    {
        id: 'agents',
        title: 'AI Agents & Autonomous Systems',
        subtitle: 'Leverage intelligent solutions that learn, adapt, and optimize. Smarter decisions, better outcomes.',
        description: 'Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.',
        icon: <img src="/icons/ai.png" alt="AI Agents" className="w-10 h-10 object-contain" />,
        bgColor: 'bg-[#FFF7ED]', // Light Orange
        textColor: 'text-black',
        borderColor: 'border-orange-100',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-2',
    },
    {
        id: 'automation',
        title: 'Web Development',
        description: 'Fast. Responsive. Scalable. We craft websites that not only look amazing but work beautifully on every device.',
        icon: <img src="/icons/Web Develop.png" alt="Web Development" className="w-10 h-10 object-contain" />,
        bgColor: 'bg-[#FEF2F2]', // Light Pink/Red
        textColor: 'text-black',
        borderColor: 'border-pink-100',
        colSpan: 'md:col-span-1',
        rowSpan: 'row-span-1',
    },
    {
        id: 'training',
        title: 'AI Model Training',
        description: 'Improve AI model outcomes through expert-led training, fine-tuning, and real-world validation for consistent accuracy.',
        icon: <img src="/icons/ai1.png" alt="AI Model Training" className="w-10 h-10 object-contain" />,
        bgColor: 'bg-[#FFFBEB]', // Light Yellow
        textColor: 'text-black',
        borderColor: 'border-amber-100',
        colSpan: 'md:col-span-1',
        rowSpan: 'row-span-1',
    },
];

const OurServicesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

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
                        Services
                    </motion.div>

                    <div className="flex flex-col items-center mb-6">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#2D6A4F] leading-tight tracking-tight"
                            type="chars"
                            stagger={0.03}
                            once={false}
                        >
                            Our Services
                        </SplitTextReveal>
                    </div>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                        Cutting-edge AI services engineered for scale, reliability, and real-world impact.
                    </p>
                </div>

                {/* Jumbled Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`${service.bgColor} ${service.colSpan} ${service.rowSpan} rounded-2xl border ${service.borderColor} p-8 md:p-10 flex flex-col relative overflow-hidden group hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500`}
                        >

                            {/* Content */}
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-8 shadow-sm backdrop-blur-sm bg-white/50">
                                    {service.icon}
                                </div>

                                <div className={`max-w-${service.id === 'development' ? 'md' : 'full'}`}>
                                    <h3 className={`font-serif text-2xl md:text-3xl font-bold ${service.textColor} mb-4 leading-tight`}>
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-600 font-medium mb-8 leading-relaxed max-w-prose">
                                        {service.subtitle || service.description}
                                    </p>
                                </div>


                            </div>

                            {/* Subtle Glass Highlight */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServicesSection;

