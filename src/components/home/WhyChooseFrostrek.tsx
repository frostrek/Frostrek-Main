import { Clock, TrendingUp, IndianRupee, Maximize2, ShieldCheck, Headset } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import SpotlightCard from '../ui/SpotlightCard';

const REASONS = [
    {
        title: 'Automate & Save Time',
        desc: 'Streamline operations and save valuable time.',
        icon: Clock,
        color: 'from-[#2EE1C7] to-[#1CB8A1]'
    },
    {
        title: 'Increase Productivity',
        desc: 'Boost efficiency and get more done with less effort.',
        icon: TrendingUp,
        color: 'from-[#2EE1C7] to-[#1CB8A1]'
    },
    {
        title: 'Reduce Costs',
        desc: 'Cut operational costs and maximize your ROI.',
        icon: IndianRupee,
        color: 'from-[#2EE1C7] to-[#1CB8A1]'
    },
    {
        title: 'Scalable for Any Business Size',
        desc: 'Solutions that grow with your business from day one.',
        icon: Maximize2,
        color: 'from-[#2EE1C7] to-[#1CB8A1]'
    },
    {
        title: 'Secure & Reliable',
        desc: 'Enterprise-grade security you can rely on.',
        icon: ShieldCheck,
        color: 'from-[#2EE1C7] to-[#1CB8A1]'
    },
    {
        title: '24/7 Support & Dedicated Team',
        desc: "We're here, anytime you need us.",
        icon: Headset,
        color: 'from-[#2EE1C7] to-[#1CB8A1]'
    }
];

const WhyChooseFrostrek = () => {
    const { theme } = useTheme();

    return (
        <section className={`py-20 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-black' : 'bg-[#ffffff]'}`}>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2EE1C7]/5 rounded-full  blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2EE1C7]/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className={`text-2xl md:text-4xl font-bold mb-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                            Why Choose <span className={theme === 'dark' ? 'text-dark-accent' : 'text-[#2EE1C7]'}>Frostrek?</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Vertical Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {REASONS.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <SpotlightCard
                                className={`h-full group relative p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-2 flex flex-col items-center text-center ${theme === 'dark' ? 'bg-black border-[#2EE1C7]/20 hover:border-[#2EE1C7]/50 hover:shadow-[0_0_30px_rgba(46,225,199,0.15)]' : 'bg-white border-gray-200 hover:border-[#2EE1C7]/40 hover:shadow-xl'}`}
                                spotlightColor="rgba(46, 225, 199, 0.1)"
                            >
                                <div className="relative z-10 flex flex-col items-center">
                                    {/* Icon Circle */}
                                    <div className={`mb-6 p-4 rounded-full border-2 transition-all duration-500 group-hover:scale-110 ${theme === 'dark' ? 'bg-black border-dark-accent/20 group-hover:border-dark-accent/50' : 'bg-gray-50 border-[#2EE1C7]/20 group-hover:border-[#2EE1C7]/50'}`}>
                                        <reason.icon className={`w-8 h-8 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#2EE1C7]'}`} />
                                    </div>

                                    {/* Content */}
                                    <h3 className={`text-lg font-bold mb-3 transition-colors duration-300 min-h-[56px] flex items-center justify-center ${theme === 'dark' ? 'text-dark-text group-hover:text-dark-accent' : 'text-gray-900 group-hover:text-[#1CB8A1]'}`}>
                                        {reason.title}
                                    </h3>
                                    <p className={`text-sm leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-dark-text-muted group-hover:text-dark-text' : 'text-gray-600 group-hover:text-gray-900'}`}>
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
