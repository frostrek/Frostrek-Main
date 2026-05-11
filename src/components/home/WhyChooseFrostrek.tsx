import { Clock, TrendingUp, IndianRupee, Maximize2, ShieldCheck, Headset } from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightCard from '../ui/SpotlightCard';

const REASONS = [
    {
        title: 'Automate & Save Time',
        desc: 'Streamline operations and save valuable time.',
        icon: Clock,
    },
    {
        title: 'Increase Productivity',
        desc: 'Boost efficiency and get more done with less effort.',
        icon: TrendingUp,
    },
    {
        title: 'Reduce Costs',
        desc: 'Cut operational costs and maximize your ROI.',
        icon: IndianRupee,
    },
    {
        title: 'Scalable for Any Business Size',
        desc: 'Solutions that grow with your business from day one.',
        icon: Maximize2,
    },
    {
        title: 'Secure & Reliable',
        desc: 'Enterprise-grade security you can rely on.',
        icon: ShieldCheck,
    },
    {
        title: '24/7 Dedicated Team',
        desc: "We're here, anytime you need us.",
        icon: Headset,
    }
];

const WhyChooseFrostrek = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-brand-light-bg font-sans">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-badge-bg/50 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E6EFE6]/60 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1400px]">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] mb-4 leading-[1.15] tracking-[-0.01em]">
                            Why Choose <span className="text-[#336B55]">Frostrek?</span>
                        </h2>
                        <p className="text-base md:text-lg text-gray-500 font-medium max-w-2xl mx-auto">
                            We combine deep technical expertise with a focus on real-world business impact.
                        </p>
                    </motion.div>
                </div>

                {/* Vertical Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                    {REASONS.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <SpotlightCard
                                className="h-full group relative p-6 md:p-8 rounded-3xl border bg-white border-[#E6EFE6] transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center hover:border-[#2D6A4F]/30 hover:shadow-[0_20px_40px_rgba(45,106,79,0.06)]"
                                spotlightColor="rgba(30, 59, 50, 0.03)"
                            >
                                <div className="relative z-10 flex flex-col items-center">
                                    {/* Icon Circle */}
                                    <div className="mb-6 w-16 h-16 flex items-center justify-center rounded-2xl border-2 bg-brand-badge-bg border-transparent transition-all duration-500 group-hover:scale-110 group-hover:border-[#2D6A4F]/10 group-hover:bg-[#F4F9F6] shadow-sm">
                                        <reason.icon className="w-7 h-7 text-[#2D6A4F]" strokeWidth={1.5} />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-lg font-bold mb-3 transition-colors duration-300 min-h-[56px] flex items-center justify-center text-[#2D6A4F] group-hover:text-[#336B55] leading-tight">
                                        {reason.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-600 font-medium">
                                        {reason.desc}
                                    </p>
                                </div>
                            </SpotlightCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseFrostrek;
