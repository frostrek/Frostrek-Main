import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import FlipText from '../ui/FlipText';
import SplitTextReveal from '../ui/SplitTextReveal';

const FAQS = [
    {
        question: "How does the AI Project Review process work?",
        answer: "We start with a comprehensive audit of your current infrastructure and goals. Our team then designs a tailored roadmap, selecting the right models and architecture to ensure scalability and ROI."
    },
    {
        question: "Is my data secure with your AI models?",
        answer: "Absolutely. Security is our top priority. We implement enterprise-grade encryption, on-premise deployment options, and strict compliance with global data protection standards (GDPR, ISO)."
    },
    {
        question: "Can you integrate with our existing software?",
        answer: "Yes, our solutions are designed to be agnostic. We build custom APIs and middleware to seamlessly integrate with your CRM, ERP, or legacy systems without disrupting operations."
    },
    {
        question: "What is the typical timeline for an MVP?",
        answer: "Most MVPs are delivered within 4-8 weeks, depending on complexity. We use agile methodologies to ensure rapid iteration and quick time-to-market."
    },
    {
        question: "Do you offer post-deployment support?",
        answer: "We provide 24/7 monitoring and maintenance packages to ensure your AI systems remain efficient, secure, and up-to-date with the latest advancements."
    }
];

const FAQ_THEMES = [
    {
        // 01 Blue Theme
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
        // 02 Green Theme
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
        // 03 Pink Theme
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
        // 04 Orange Theme
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
        // 05 Yellow Theme
        border: 'border-[#FEF3C7]',
        hoverBorder: 'hover:border-[#B45309]/40',
        activeBorder: 'border-[#B45309]/40',
        shadow: 'shadow-[0_10px_35px_rgba(217,119,6,0.06)]',
        badgeBg: 'bg-[#FFFBEB]',
        badgeBorder: 'border-[#FEF3C7]/50',
        badgeText: 'text-[#B45309]',
        questionText: 'text-gray-900 group-hover:text-[#B45309]',
        activeQuestionText: 'text-[#B45309]',
        iconBgActive: 'bg-[#B45309]',
        iconTextActive: 'text-white',
        iconBgInactive: 'bg-[#FFFBEB]',
        iconBorderInactive: 'border-[#FEF3C7]/50',
        iconTextInactive: 'text-[#B45309]',
    }
];

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-24 relative overflow-hidden bg-brand-light-bg font-sans">
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1400px]">
                <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-badge-bg border border-[#c4e0d4]/50 text-brand-badge-text"
                        >
                            Common Queries
                        </motion.span>
                    </div>
                    <SplitTextReveal
                        as="h2"
                        className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                        type="chars"
                        stagger={0.02}
                        once={false}
                    >
                        Frequently Asked Questions
                    </SplitTextReveal>
                    <SplitTextReveal
                        as="p"
                        className="text-lg text-gray-500 font-medium"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        Everything you need to know about our process, security, and delivery.
                    </SplitTextReveal>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {FAQS.map((faq, index) => {
                        const theme = FAQ_THEMES[index % FAQ_THEMES.length];
                        const isActive = activeIndex === index;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
                                className={`rounded-2xl border transition-all duration-500 bg-white group ${theme.border} ${theme.hoverBorder} ${
                                    isActive ? `${theme.activeBorder} ${theme.shadow}` : 'hover:shadow-lg'
                                }`}
                            >
                                <button
                                    onClick={() => setActiveIndex(isActive ? null : index)}
                                    className="w-full px-6 py-5 md:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                                >
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors duration-300 ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                                            0{index + 1}
                                        </span>
                                        <span className={`text-sm sm:text-base md:text-[1.1rem] font-bold transition-colors duration-300 ${
                                            isActive ? theme.activeQuestionText : theme.questionText
                                        }`}>
                                            {faq.question}
                                        </span>
                                    </div>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 border ${
                                        isActive 
                                            ? `${theme.iconBgActive} ${theme.iconTextActive} border-transparent rotate-180 shadow-md` 
                                            : `${theme.iconBgInactive} ${theme.iconTextInactive} ${theme.iconBorderInactive}`
                                    }`}>
                                        {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 pt-2 md:pl-[5.5rem] leading-relaxed text-[15px] text-gray-500 font-medium">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <p className="mb-6 text-[15px] font-bold text-gray-400 uppercase tracking-wide">
                        Still have questions? We're here to help.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/faq" 
                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm bg-[#2D6A4F] text-white transition-all hover:bg-[#1B4332] shadow-lg shadow-[#2D6A4F]/10"
                        >
                            <FlipText hoverColor="text-white">
                                View All FAQs →
                            </FlipText>
                        </Link>
                        <Link 
                            to="/contact" 
                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium text-sm bg-white border-2 border-gray-200 text-gray-700 transition-all hover:border-[#2D6A4F] hover:bg-gray-50"
                        >
                            <FlipText>
                                <HelpCircle size={18} /> Contact Support
                            </FlipText>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
