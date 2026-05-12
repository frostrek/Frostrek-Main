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

const FAQSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-24 relative overflow-hidden bg-brand-light-bg font-sans">
            <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-[1400px]">
                <div className="text-center max-w-3xl mx-auto mb-16">
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
                    {FAQS.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: (index % 5) * 0.1 }}
                            className={`rounded-2xl border transition-all duration-300 bg-white border-[#E6EFE6] ${
                                activeIndex === index ? 'border-[#2D6A4F]/30 shadow-[0_10px_30px_rgba(45,106,79,0.06)]' : 'hover:border-[#2D6A4F]/20 hover:shadow-md'
                            }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full px-6 py-5 md:py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-4 md:gap-6">
                                    <span className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold bg-brand-badge-bg text-[#2D6A4F] border border-[#c4e0d4]/50">
                                        0{index + 1}
                                    </span>
                                    <span className="text-base md:text-[1.1rem] font-bold text-[#2D6A4F]">
                                        {faq.question}
                                    </span>
                                </div>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeIndex === index ? 'bg-[#2D6A4F] text-white rotate-180' : 'bg-gray-50 text-[#2D6A4F] border border-gray-200'}`}>
                                    {activeIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
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
                    ))}
                </div>

                {/* Still have questions CTA */}
                <div className="mt-16 text-center">
                    <p className="mb-6 text-[15px] font-bold text-gray-400 uppercase tracking-wide">
                        Still have questions? We're here to help.
                    </p>
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
        </section>
    );
};

export default FAQSection;
