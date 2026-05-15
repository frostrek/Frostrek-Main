import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus } from 'lucide-react';
import { PRODUCT_DATA } from '../utils/productData';
import CuteBackground from '../components/ui/CuteBackground';
import SpotlightCard from '../components/ui/SpotlightCard';
import CTASection from '../components/home/CTASection';
import SEO from '../components/seo/SEO';
import SplitTextReveal from '../components/ui/SplitTextReveal';

// Frosty Specific Components
import FrostyHero from '../components/frosty/FrostyHero';
import KnowledgeTraining from '../components/frosty/KnowledgeTraining';
import OmniChannelFlow from '../components/frosty/OmniChannelFlow';
import SmartHandover from '../components/frosty/SmartHandover';
import ROIWidget from '../components/frosty/ROIWidget';
import TrustSecurityGrid from '../components/frosty/TrustSecurityGrid';
import HowItWorks from '../components/frosty/HowItWorks';

gsap.registerPlugin(ScrollTrigger);

const FrostyPage = () => {
    const product = PRODUCT_DATA['/products/frosty-ai'];
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const useCasesRef = useRef<HTMLDivElement>(null);
    const faqRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useGSAP(() => {
        // Use Cases card stagger
        const useCaseCards = useCasesRef.current?.querySelectorAll('.usecase-card');
        if (useCaseCards) {
            gsap.fromTo(useCaseCards,
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: useCasesRef.current,
                        start: 'top 85%',
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );
        }

        // FAQ card stagger
        const faqCards = faqRef.current?.querySelectorAll('.faq-card');
        if (faqCards) {
            gsap.fromTo(faqCards,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: faqRef.current,
                        start: 'top 85%',
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );
        }
    });

    if (!product) return null;

    const faqSchema = product.faq ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": product.faq.map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
            }
        }))
    }) : null;

    return (
        <div className="relative min-h-screen bg-white text-[#2D6A4F] font-body">
            <SEO
                title={`${product.title} | Frostrek Enterprise AI`}
                description={product.description}
                path="/products/frosty-ai"
                schema={faqSchema ? [faqSchema] : []}
            />

            <CuteBackground />

            {/* 1. Hero */}
            <FrostyHero />

            {/* 2. Knowledge Training */}
            <KnowledgeTraining />

            {/* 3. Omni-Channel Flow */}
            <OmniChannelFlow />

            {/* 4. Smart Handover */}
            <SmartHandover />

            {/* 4.5 How It Works */}
            <HowItWorks />

            {/* 5. ROI Widget */}
            <ROIWidget />

            {/* 6. Use Cases (From Product Data) */}
            {product.useCases && product.useCases.length > 0 && (
                <section className="py-24 relative z-10 bg-brand-light-bg border-t border-[#2D6A4F]/10 font-body overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <div>
                                <SplitTextReveal
                                    as="h2"
                                    className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                                    type="chars"
                                    stagger={0.02}
                                    once={false}
                                >
                                    Built for Your Industry
                                </SplitTextReveal>
                            </div>
                            <div className="mt-4">
                                <SplitTextReveal
                                    as="p"
                                    className="max-w-2xl mx-auto text-lg text-gray-500 font-medium"
                                    type="words"
                                    stagger={0.02}
                                    once={false}
                                    delay={0.3}
                                >
                                    See how Frosty AI adapts to your specific needs.
                                </SplitTextReveal>
                            </div>
                        </div>
                        <div ref={useCasesRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {product.useCases.map((useCase, idx) => (
                                <SpotlightCard
                                    key={idx}
                                    className="usecase-card group relative overflow-hidden rounded-[2rem] border p-8 transition-all duration-300 bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)] hover:-translate-y-1"
                                    spotlightColor="rgba(30, 59, 50, 0.03)"
                                >
                                    <div className="relative z-10">
                                        <div className="mb-6 w-14 h-14 rounded-2xl border flex items-center justify-center bg-brand-badge-bg border-[#c4e0d4]/50 transition-transform duration-300 group-hover:scale-110 shadow-sm">
                                            {useCase.icon && <useCase.icon className="text-[#2D6A4F]" size={26} strokeWidth={1.5} />}
                                        </div>
                                        <h3 className="font-serif text-2xl font-bold mb-3 text-[#2D6A4F]">{useCase.title}</h3>
                                        <p className="text-[15px] leading-relaxed text-gray-500 font-medium">{useCase.description}</p>
                                    </div>
                                </SpotlightCard>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 7. FAQ Section (From Product Data) — Matches ProductPage exactly */}
            {product.faq && product.faq.length > 0 && (
                <section className="py-24 relative z-10 bg-[#F9FBFA]/80 border-t border-[#2D6A4F]/10 font-body overflow-hidden">
                    <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                        <div className="text-center mb-12">
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em] text-center"
                                type="chars"
                                stagger={0.02}
                                once={false}
                            >
                                Frequently Asked Questions
                              </SplitTextReveal>
                        </div>
                        <div ref={faqRef} className="space-y-4">
                            {product.faq.map((item, idx) => (
                                <div key={idx} className="faq-card rounded-[1.5rem] border overflow-hidden bg-white border-[#E6EFE6]">
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                        className="w-full text-left p-6 flex justify-between items-center transition-colors hover:bg-[#F4F9F6]"
                                    >
                                        <span className="text-lg font-serif font-bold text-[#2D6A4F]">{item.question}</span>
                                        {openFaqIndex === idx ? (
                                            <Minus className="w-5 h-5 text-[#2D6A4F] flex-shrink-0" />
                                        ) : (
                                            <Plus className="w-5 h-5 text-[#2D6A4F] flex-shrink-0" />
                                        )}
                                    </button>
                                    <AnimatePresence>
                                        {openFaqIndex === idx && (
                                            <div className="p-6 pt-0 leading-relaxed border-t text-sm text-gray-500 border-[#E6EFE6] font-medium">
                                                {item.answer}
                                            </div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* 8. CTA */}
            <CTASection />

            {/* 9. Trust & Security Grid (Footer Level) */}
            <TrustSecurityGrid />
        </div>
    );
};

export default FrostyPage;
