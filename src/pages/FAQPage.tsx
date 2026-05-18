import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search } from 'lucide-react';
import SEO from '../components/seo/SEO';
import SplitTextReveal from '../components/ui/SplitTextReveal';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQCategory {
    title: string;
    faqs: FAQ[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
    {
        title: 'General',
        faqs: [
            {
                question: "What does Frostrek AI do?",
                answer: "Frostrek AI is an enterprise AI company headquartered in Gurugram, India, with offices in Austin, TX and London, UK. We build conversational AI agents, workflow automation systems, and custom LLM solutions for enterprises across manufacturing, e-commerce, fintech, and healthcare. Founded in 2019, we serve 40+ enterprise clients globally with a team of 50+ engineers."
            },
            {
                question: "What industries do you serve?",
                answer: "We serve enterprises across manufacturing (with our Manufacturing OS platform), e-commerce (AI-powered search and customer support), fintech (custom wallet and loyalty systems), healthcare (precision data operations for medical AI), and autonomous driving (computer vision data pipelines). Our solutions are industry-agnostic at the infrastructure level but deeply customized at the application layer."
            },
            {
                question: "Where are your offices located?",
                answer: "Our headquarters is at 4th Floor, JMD Empire, Sector 62, Gurugram, Haryana, India. We also have offices at 701 Tillery Street, Austin, Texas 78702, USA and 24-26 Arcadia Avenue, London, N3 2JU, United Kingdom. Our teams operate across these time zones to provide 24/7 coverage for global clients."
            },
            {
                question: "How does the AI Project Review process work?",
                answer: "We start with a comprehensive audit of your current infrastructure and goals. Our team then designs a tailored roadmap, selecting the right models and architecture to ensure scalability and ROI. This typically takes 1-2 weeks and results in a detailed implementation plan with timelines, resource estimates, and expected outcomes."
            }
        ]
    },
    {
        title: 'Security & Compliance',
        faqs: [
            {
                question: "Is my data secure with your AI models?",
                answer: "Absolutely. Security is our top priority. We implement enterprise-grade encryption at rest and in transit, on-premise deployment options, and strict compliance with global data protection standards including GDPR, ISO 27001, SOC 2 Type II, and India's DPDP Act. All annotation staff undergo background checks, and we maintain complete audit logging of all data access events."
            },
            {
                question: "Do you offer on-premise deployments?",
                answer: "Yes. For clients with strict data residency requirements, we offer fully on-premise deployments where your data never leaves your infrastructure. We also support hybrid models where the AI inference runs on your servers while management and monitoring tools are cloud-hosted. This is particularly popular with our manufacturing and healthcare clients."
            },
            {
                question: "What compliance certifications do you hold?",
                answer: "Frostrek maintains compliance with ISO 27001 for information security management, GDPR for European data protection, SOC 2 Type II for enterprise trust controls, and India's Digital Personal Data Protection Act (DPDP). Our secure annotation facilities feature access controls, no personal devices policies, and CCTV monitoring with 90-day retention."
            }
        ]
    },
    {
        title: 'Technical',
        faqs: [
            {
                question: "Can you integrate with our existing software?",
                answer: "Yes, our solutions are designed to be agnostic. We build custom APIs and middleware to seamlessly integrate with your CRM, ERP, or legacy systems without disrupting operations. We've successfully integrated with ERPNext, Salesforce, SAP, custom SCADA systems, and numerous proprietary platforms."
            },
            {
                question: "What is the typical timeline for an MVP?",
                answer: "Most MVPs are delivered within 4-8 weeks, depending on complexity. We use agile methodologies to ensure rapid iteration and quick time-to-market. For our Manufacturing OS deployments, the full three-phase rollout (live dashboards → cost intelligence → AI scheduling) typically takes 3-6 months."
            },
            {
                question: "What AI models and frameworks do you use?",
                answer: "We are model-agnostic and select the best tools for each use case. Our stack includes OpenAI GPT-4, Anthropic Claude, open-source models (LLaMA, Mistral), and custom fine-tuned models. For voice AI, we use proprietary sub-200ms response pipelines. For computer vision, we work with YOLO, Detectron2, and custom architectures depending on the application."
            },
            {
                question: "How do you ensure AI model quality?",
                answer: "We implement multi-layer quality assurance at every stage: training data validation (95%+ sustained accuracy), model evaluation using domain-specific benchmarks, red-team testing with adversarial prompts, and continuous monitoring with human-in-the-loop escalation. Our managed workforce programs maintain quality through hierarchical QA architectures with dedicated team leads and project managers."
            }
        ]
    },
    {
        title: 'Pricing & Support',
        faqs: [
            {
                question: "Do you offer post-deployment support?",
                answer: "We provide 24/7 monitoring and maintenance packages to ensure your AI systems remain efficient, secure, and up-to-date with the latest advancements. Our support tiers range from basic monitoring to fully managed operations with dedicated engineering teams and guaranteed SLAs."
            },
            {
                question: "How is pricing structured?",
                answer: "Pricing varies by project scope and model. For AI agent deployments, we typically work on a project-based fee with optional ongoing maintenance contracts. For managed data operations, we offer dedicated team models with monthly retainers. For consulting and strategy work, we charge on a time-and-materials basis. Contact us at contact@frostrek.ai for a custom quote."
            },
            {
                question: "Can you scale teams quickly for urgent projects?",
                answer: "Yes. We've successfully scaled teams from 10 to 85+ people within 3 weeks with zero productivity loss. Our rapid onboarding protocols include pre-built training modules, calibration exercises, and graduated complexity workflows. For our Urgent High-Volume Data Delivery program, we deployed 60 annotators and delivered 400,000+ labeled data points in just 6 weeks."
            }
        ]
    }
];

// Flatten all FAQs for the schema
const allFAQs = FAQ_CATEGORIES.flatMap(cat => cat.faqs);

const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredCategories = FAQ_CATEGORIES.map(cat => ({
        ...cat,
        faqs: cat.faqs.filter(
            faq =>
                faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.faqs.length > 0);

    return (
        <div className="bg-brand-light-bg min-h-screen font-body">
            <SEO
                title="Frequently Asked Questions | Frostrek AI"
                description="Find answers to common questions about Frostrek AI's enterprise AI solutions, security protocols, pricing, and technical capabilities."
                path="/faq"
                schema={[faqSchema]}
            />

            {/* Hero */}
            <section className="relative pt-32 pb-16 bg-gradient-to-b from-white via-[#FAFCFB] to-brand-light-bg overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] text-xs font-bold uppercase tracking-wider mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-[#2D6A4F] animate-pulse" />
                        Help Center
                    </motion.div>

                    <SplitTextReveal
                        as="h1"
                        className="font-serif text-4xl md:text-6xl text-[#2D6A4F] leading-tight tracking-tight mb-6"
                        type="chars"
                        stagger={0.02}
                        once={false}
                        trigger="load"
                    >
                        Frequently Asked Questions
                    </SplitTextReveal>

                    <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto mb-10">
                        Everything you need to know about our AI solutions, security, pricing, and technical capabilities.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-lg mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#2D6A4F]/40 focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* Background */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-[#E8F5EE]/45 pointer-events-none" />
            </section>

            {/* FAQ Content */}
            <section className="pb-24">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    {filteredCategories.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">No questions match your search. Try different keywords.</p>
                        </div>
                    ) : (
                        filteredCategories.map((category) => (
                            <div key={category.title} className="mb-12">
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="font-serif text-2xl font-bold text-[#2D6A4F] mb-6 pl-1"
                                >
                                    {category.title}
                                </motion.h2>

                                <div className="space-y-3">
                                    {category.faqs.map((faq, index) => {
                                        const faqKey = `${category.title}-${index}`;
                                        const isActive = activeIndex === faqKey;

                                        return (
                                            <motion.div
                                                key={faqKey}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                                className={`rounded-2xl border transition-all duration-300 bg-white ${
                                                    isActive
                                                        ? 'border-[#2D6A4F]/30 shadow-[0_10px_30px_rgba(45,106,79,0.06)]'
                                                        : 'border-gray-100 hover:border-[#2D6A4F]/20 hover:shadow-md'
                                                }`}
                                            >
                                                <button
                                                    onClick={() => setActiveIndex(isActive ? null : faqKey)}
                                                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                                                >
                                                    <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                                        isActive ? 'bg-[#2D6A4F] text-white rotate-180' : 'bg-[#E8F5EE] text-[#2D6A4F]'
                                                    }`}>
                                                        {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                                    </div>
                                                </button>

                                                <AnimatePresence>
                                                    {isActive && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                                                                {faq.answer}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-8 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#E8F5EE] to-[#F4FAF7] border border-[#2D6A4F]/10 text-center"
                    >
                        <h3 className="font-serif text-2xl font-bold text-[#2D6A4F] mb-3">Still have questions?</h3>
                        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                            Our team is ready to help. Reach out to us directly and we'll get back to you within 24 hours.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="mailto:contact@frostrek.ai"
                                className="px-8 py-3.5 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors shadow-lg shadow-[#2D6A4F]/10"
                            >
                                Email Us →
                            </a>
                            <a
                                href="https://wa.me/17574722491"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3.5 rounded-xl border-2 border-[#2D6A4F]/20 text-[#2D6A4F] font-medium hover:border-[#2D6A4F] hover:bg-white transition-all"
                            >
                                WhatsApp Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;
