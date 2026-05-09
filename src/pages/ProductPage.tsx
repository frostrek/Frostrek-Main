import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Rocket, ArrowRight, BadgeCheck } from 'lucide-react';
import { PRODUCT_DATA } from '../utils/productData';
import Card from '../components/ui/Card';
import CuteBackground from '../components/ui/CuteBackground';
import { ImpactMetrics } from '../components/product/ImpactMetrics';
import { WorkflowBuilder } from '../components/product/WorkflowBuilder';
import { CapabilitiesSystem } from '../components/product/CapabilitiesSystem';
import ProductHero from '../components/product/ProductHero';
import AllProductsSection from '../components/product/AllProductsSection';
import { useTheme } from '../context/ThemeContext';
import CTASection from '../components/home/CTASection';
import SEO from '../components/seo/SEO';

const softwareSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Frostrek AI Platform",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Contact for enterprise pricing"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
});

const ProductPage = () => {
    const { theme } = useTheme();
    const location = useLocation();
    const product = PRODUCT_DATA[location.pathname] || PRODUCT_DATA['generic'];
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

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

    const schemas = [softwareSchema];
    if (faqSchema) schemas.push(faqSchema);

    return (
        <div className={`relative min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
            <SEO 
                title={`${product.title} | Frostrek Enterprise AI`} 
                description={product.description} 
                path={location.pathname} 
                schema={schemas}
            />
            {/* CuteBackground - placed at root level with proper z-indexing */}
            {theme !== 'dark' && <CuteBackground />}

            {/* 1. Hero Section - Premium Dark */}
            <ProductHero
                title={product.title}
                description={product.description}
                tagline={product.tagline}
                badge={product.badge}
                isCaseStudy={product.isCaseStudy}
            />

            {/* 2. All Products Section - Showcases all available products */}
            {location.pathname === '/products' && <AllProductsSection />}

            {/* 2. Stats Section - "Turn Efficiency into Profit" */}
            <section className={`py-24 transition-colors ${theme === 'dark' ? 'bg-dark-card' : 'bg-brand-green-50'}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Impact</span>
                        <h2 className={`text-4xl md:text-5xl font-sans font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Turn Efficiency into Profit</h2>
                        <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>Real results from companies that switched to {product.title}.</p>
                    </div>

                    <div className="mt-12">
                        <ImpactMetrics statistics={product.statistics || []} />
                    </div>
                </div>
            </section>

            {/* 3. Workflow / Process Section - SIMPLIFY YOUR WORKFLOW */}
            <section className={`py-24 relative overflow-hidden transition-colors ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Workflow</span>
                        <h2 className={`text-4xl md:text-5xl font-sans font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Simplify Your Workflow</h2>
                        <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>From concept to execution, we streamline every step.</p>
                    </div>

                    <WorkflowBuilder steps={product.process || []} />
                </div>
            </section>

            {/* 4. Experience Zone / Capabilities */}
            <section className={`py-24 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-dark-card' : 'bg-brand-green-50/30'}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-16">
                        <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Capabilities</span>
                        <h2 className={`text-4xl md:text-5xl font-serif leading-tight ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                            Everything you need to <br className="hidden md:block" />
                            <span className={`italic ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>scale effortlessly.</span>
                        </h2>
                    </div>

                    <CapabilitiesSystem features={product.features || []} />
                </div>
            </section>

            {/* 5. Use Cases Section */}
            {
                product.useCases && product.useCases.length > 0 && (
                    <section className={`py-24 transition-colors ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="text-center mb-16">
                                <h2 className={`text-3xl md:text-4xl font-sans font-bold mb-4 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Built for Your Industry</h2>
                                <p className={`text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>See how {product.title} adapts to your specific needs.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {product.useCases.map((useCase, idx) => (
                                    <Card key={idx} className={`p-8 border transition-all hover:-translate-y-1 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20 hover:border-dark-accent' : 'border-gray-100 hover:border-gray-300'}`}>
                                        <div className="mb-6">
                                            {useCase.icon && <useCase.icon className={`w-10 h-10 ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-900'}`} />}
                                        </div>
                                        <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{useCase.title}</h3>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>{useCase.description}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* 6. FAQ Section */}
            {
                product.faq && product.faq.length > 0 && (
                    <section className={`py-24 transition-colors ${theme === 'dark' ? 'bg-dark-card' : 'bg-gray-50'}`}>
                        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                            <h2 className={`text-3xl md:text-4xl font-sans font-bold mb-12 text-center ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {product.faq.map((item, idx) => (
                                    <div key={idx} className={`rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                            className={`w-full text-left p-6 flex justify-between items-center transition-colors ${theme === 'dark' ? 'hover:bg-dark-card' : 'hover:bg-gray-50'}`}
                                        >
                                            <span className={`text-lg font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{item.question}</span>
                                            {openFaqIndex === idx ? (
                                                <Minus className={`w-5 h-5 ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-400'}`} />
                                            ) : (
                                                <Plus className={`w-5 h-5 ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-400'}`} />
                                            )}
                                        </button>
                                        <AnimatePresence>
                                            {openFaqIndex === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className={`p-6 pt-0 leading-relaxed border-t ${theme === 'dark' ? 'text-dark-text-muted border-dark-accent/10' : 'text-gray-600 border-gray-50'}`}>
                                                        {item.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )
            }

            {/* Case Study CTA — only for live builds */}
            {product.isCaseStudy && (
                <section className={`py-20 transition-colors ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className={`max-w-4xl mx-auto rounded-3xl border-2 overflow-hidden ${
                                theme === 'dark'
                                    ? 'bg-gradient-to-br from-[#2EE1C7]/5 via-dark-card to-dark-card border-[#2EE1C7]/20'
                                    : 'bg-gradient-to-br from-[#2EE1C7]/5 via-white to-white border-[#2EE1C7]/30'
                            }`}
                        >
                            <div className="p-8 md:p-12 text-center">
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 ${
                                    theme === 'dark'
                                        ? 'bg-[#2EE1C7]/10 border-[#2EE1C7]/30'
                                        : 'bg-[#2EE1C7]/10 border-[#2EE1C7]/40'
                                }`}>
                                    <BadgeCheck className="w-4 h-4 text-[#2EE1C7]" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-[#2EE1C7]">Live Frostrek Build</span>
                                </div>

                                <h2 className={`text-3xl md:text-4xl font-black mb-4 ${
                                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                                }`}>
                                    Want Something Like{' '}
                                    <span className="text-[#2EE1C7]">{product.title}</span>?
                                </h2>
                                <p className={`text-base md:text-lg mb-8 max-w-2xl mx-auto ${
                                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    This is a real product we designed, built, and deployed. Our team can architect
                                    and ship a similar solution tailored to your industry and requirements.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link to="/contact">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-8 py-4 rounded-2xl font-bold text-base bg-[#2EE1C7] text-black transition-all hover:shadow-lg hover:shadow-[#2EE1C7]/30 flex items-center gap-2"
                                        >
                                            <Rocket className="w-5 h-5" />
                                            Start Your Project
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.button>
                                    </Link>
                                    <Link to="/schedule-demo">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className={`px-8 py-4 rounded-2xl font-bold text-base border transition-all flex items-center gap-2 ${
                                                theme === 'dark'
                                                    ? 'border-white/20 text-white hover:border-white/40'
                                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            Talk to Our Team
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* 7. Final Call to Action */}
            <CTASection />
        </div>
    );
};

export default ProductPage;

