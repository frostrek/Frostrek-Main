import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SplitTextReveal from '../ui/SplitTextReveal';

const SERVICES = [
    {
        id: 'talent',
        title: 'AI Talent Acquisition & Deployment',
        description: 'Identify and place experienced AI professionals who align precisely with your project goals, technical needs, and delivery schedules.',
        image: '/images/services/ai_talent.png',
    },
    {
        id: 'training',
        title: 'AI Model Training & Optimization',
        description: 'Improve AI model outcomes through expert-led training, fine-tuning, and real-world validation for consistent accuracy and impact.',
        image: '/images/services/ai_training.png',
    },
    {
        id: 'development',
        title: 'Tailored AI Development Solutions',
        description: 'Create custom-built AI systems designed to solve complex business problems with scalable, dependable, and efficient architectures.',
        image: '/images/services/ai_tailored.png',
    },
    {
        id: 'agents',
        title: 'AI Agents & Autonomous Systems',
        description: 'Build intelligent AI agents capable of independent reasoning, decision-making, and task execution across operational workflows.',
        image: '/images/services/ai_agents.png',
    },
    {
        id: 'platform',
        title: 'AI Platform Development',
        description: 'Build production-ready applications and platforms that seamlessly embed AI into everyday business operations.',
        image: '/images/services/ai_platform.png',
    },
    {
        id: 'automation',
        title: 'Workflow Automation & Integration',
        description: 'Integrate AI into organizational processes to automate workflows, enhance efficiency, and enable seamless coordination.',
        image: '/images/services/ai_automation.png',
    },
    {
        id: 'manufacturing',
        title: 'Manufacturing Intelligence',
        description: 'Real-time visibility across your entire operation. AI scheduling that recovers lost production without replacing existing systems.',
        image: '/images/services/ai_manufacturing.png',
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
                        const isBottomRow = index >= 4;
                        const lgCol = isBottomRow ? "lg:col-span-4" : "lg:col-span-3";

                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`group relative rounded-3xl bg-white border border-[#E6EFE6] shadow-[0_4px_20px_rgba(51,107,85,0.08)] hover:border-[#C8E6DA] hover:shadow-[0_12px_40px_rgba(51,107,85,0.2)] transition-all duration-500 flex flex-col h-full overflow-hidden md:col-span-1 ${lgCol}`}
                            >


                                {/* Image with gradient overlay */}
                                <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    {/* Gradient overlay: image fades into white card */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(255,255,255,0.4) 55%, rgba(255,255,255,0.85) 75%, #ffffff 100%)',
                                        }}
                                    />
                                </div>

                                {/* Text content */}
                                <div className="relative z-10 flex flex-col flex-1 px-7 pb-7 pt-2">
                                    <h3 className="font-serif text-[22px] font-bold text-[#2D6A4F] mb-3 leading-[1.3]">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-500 text-[15px] leading-[1.6] font-medium flex-1">
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
