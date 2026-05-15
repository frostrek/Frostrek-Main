import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, BrainCircuit, Blocks, Bot, Server, Cog, Factory } from 'lucide-react';
import SplitTextReveal from '../ui/SplitTextReveal';

const SERVICES = [
    {
        id: 'talent',
        title: 'AI Talent Acquisition & Deployment',
        description: 'Identify and place experienced AI professionals who align precisely with your project goals, technical needs, and delivery schedules.',
        icon: Users,
    },
    {
        id: 'training',
        title: 'AI Model Training & Optimization',
        description: 'Improve AI model outcomes through expert-led training, fine-tuning, and real-world validation for consistent accuracy and impact.',
        icon: BrainCircuit,
    },
    {
        id: 'development',
        title: 'Tailored AI Development Solutions',
        description: 'Create custom-built AI systems designed to solve complex business problems with scalable, dependable, and efficient architectures.',
        icon: Blocks,
    },
    {
        id: 'agents',
        title: 'AI Agents & Autonomous Systems',
        description: 'Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.',
        icon: Bot,
    },
    {
        id: 'platform',
        title: 'AI Platform Development',
        description: 'Build production-ready applications and platforms that seamlessly embed AI into everyday business operations.',
        icon: Server,
    },
    {
        id: 'automation',
        title: 'Workflow Automation & Integration',
        description: 'Integrate AI into organizational processes to automate workflows, enhance efficiency, and enable seamless coordination.',
        icon: Cog,
    },
    {
        id: 'manufacturing',
        title: 'Manufacturing Intelligence',
        description: 'Real-time visibility across your entire operation. AI scheduling that recovers lost production without replacing existing systems.',
        icon: Factory,
    }
];

const OurServicesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden bg-white font-sans">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#E8F5EE]/40 via-white to-white pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text text-sm font-bold tracking-wide mb-6 border border-[#c4e0d4]/50"
                    >
                        <span className="text-lg leading-none">✨</span> SERVICES
                    </motion.div>

                    <div className="flex flex-col items-center">
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] tracking-[-0.01em] whitespace-nowrap mb-6"
                            type="chars"
                            stagger={0.03}
                            once={false}
                        >
                            Our Services
                        </SplitTextReveal>
                    </div>
                    <SplitTextReveal
                        as="p"
                        className="text-lg text-gray-500 max-w-2xl mx-auto font-medium"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        Cutting-edge AI services engineered for scale, reliability, and real-world impact.
                    </SplitTextReveal>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                    {SERVICES.map((service, index) => {
                        const Icon = service.icon;
                        const isBottomRow = index >= 4;
                        const lgCol = isBottomRow ? "lg:col-span-4" : "lg:col-span-3";

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group relative p-8 rounded-3xl bg-white border border-[#E6EFE6] hover:border-[#C8E6DA] hover:shadow-[0_20px_50px_rgba(45,106,79,0.08)] transition-all duration-500 flex flex-col h-full overflow-hidden md:col-span-1 ${lgCol}`}
                            >
                                {/* Hover background effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#F4FAF7] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="relative mb-8 self-start">
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-[#2D6A4F] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full" />
                                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8F5EE] to-[#C8E6DA] border border-[#C8E6DA] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
                                            <Icon className="w-8 h-8 text-[#2D6A4F]" />
                                        </div>
                                    </div>

                                    <h3 className="font-serif text-[22px] font-bold text-[#2D6A4F] mb-4 leading-[1.3]">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-500 text-[15px] leading-[1.6] font-medium mb-6 flex-1">
                                        {service.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurServicesSection;
