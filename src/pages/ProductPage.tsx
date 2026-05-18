import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Rocket, ArrowRight, BadgeCheck } from 'lucide-react';
import { PRODUCT_DATA } from '../utils/productData';
import Card from '../components/ui/Card';
import CuteBackground from '../components/ui/CuteBackground';
import { CapabilitiesSystem } from '../components/product/CapabilitiesSystem';
import ProductHero from '../components/product/ProductHero';
import AllProductsSection from '../components/product/AllProductsSection';
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
    const location = useLocation();
    const product = PRODUCT_DATA[location.pathname] || PRODUCT_DATA['generic'];
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!product) return null;

    const faqSchema = product.faq && product.faq.length > 0 ? JSON.stringify({
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
        <div className="relative min-h-screen bg-white text-gray-900 font-body">
            <SEO 
                title={`${product.title} | Frostrek AI Enterprise Solutions`} 
                description={product.description} 
                path={location.pathname} 
                schema={schemas}
                keywords={product.keywords || "production-ready AI products USA, enterprise AI solutions UK, bespoke AI technology India"}
            />
            {/* Cute Background and Visual Accent */}
            <CuteBackground />

            {/* 1. Hero Section - Styled perfectly in white & forest green */}
            <ProductHero
                title={product.title}
                description={product.description}
                tagline={product.tagline}
                badge={product.badge}
                isCaseStudy={product.isCaseStudy}
            />

            {/* 2. All Products Section - Showcases all available products */}
            {location.pathname === '/products' && <AllProductsSection />}


            {/* 4. Experience Zone / Capabilities */}
            <section className="py-24 overflow-hidden z-10 bg-[#F9FBFA]/80 border-t border-[#2D6A4F]/10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-16 space-y-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/20">
                            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2D6A4F]">Capabilities</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight text-gray-900">
                            Everything you need to <br className="hidden md:block" />
                            <span className="italic text-[#2D6A4F]">scale effortlessly.</span>
                        </h2>
                    </div>

                    <CapabilitiesSystem features={product.features || []} />
                </div>
            </section>

            {/* 5. Use Cases Section */}
            {
                product.useCases && product.useCases.length > 0 && (
                    <section className="py-24 relative z-10 bg-white border-t border-[#2D6A4F]/10">
                        <div className="container mx-auto px-4 md:px-6">
                            <div className="text-center mb-16 space-y-4">
                                <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 leading-tight">Built for Your Industry</h2>
                                <p className="text-base sm:text-lg text-slate-600 font-medium">See how {product.title} adapts to your specific needs.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {product.useCases.map((useCase, idx) => (
                                    <Card key={idx} className="p-8 border transition-all duration-300 hover:-translate-y-1 bg-white border-gray-150 hover:border-[#2D6A4F]/40 hover:shadow-lg hover:shadow-[#2D6A4F]/5">
                                        <div className="mb-6 w-12 h-12 rounded-xl flex items-center justify-center bg-[#E8F5EE]">
                                            {useCase.icon && <useCase.icon className="w-6 h-6 text-[#2D6A4F]" />}
                                        </div>
                                        <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">{useCase.title}</h3>
                                        <p className="text-sm text-slate-600 leading-relaxed font-medium">{useCase.description}</p>
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
                    <section className="py-24 relative z-10 bg-[#F9FBFA]/80 border-t border-[#2D6A4F]/10">
                        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                            <h2 className="text-3xl md:text-4xl font-serif font-black mb-12 text-center text-gray-900">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {product.faq.map((item, idx) => (
                                    <div key={idx} className="rounded-2xl border overflow-hidden bg-white border-gray-200">
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                            className="w-full text-left p-6 flex justify-between items-center transition-colors hover:bg-[#F9FBFA]"
                                        >
                                            <span className="text-lg font-serif font-bold text-gray-900">{item.question}</span>
                                            {openFaqIndex === idx ? (
                                                <Minus className="w-5 h-5 text-[#2D6A4F]" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-[#2D6A4F]" />
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
                                                    <div className="p-6 pt-0 leading-relaxed border-t text-sm text-slate-600 border-gray-100 font-medium">
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
                <section className="py-20 relative z-10 bg-white border-t border-[#2D6A4F]/10">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="max-w-4xl mx-auto rounded-3xl border-2 overflow-hidden bg-gradient-to-br from-[#E8F5EE]/30 via-white to-white border-[#2D6A4F]/25 shadow-xl shadow-[#2D6A4F]/5"
                        >
                            <div className="p-8 md:p-12 text-center space-y-4">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-[#E8F5EE]/80 border-[#2D6A4F]/25">
                                    <BadgeCheck className="w-4 h-4 text-[#2D6A4F]" />
                                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#2D6A4F]">Live Frostrek Build</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 leading-tight">
                                    Want Something Like{' '}
                                    <span className="text-[#2D6A4F]">{product.title}</span>?
                                </h2>
                                <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                                    This is a real product we designed, built, and deployed. Our team can architect
                                    and ship a similar solution tailored to your industry and requirements.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                    <Link to="/contact" className="inline-block">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-8 py-4 rounded-2xl font-extrabold text-base bg-[#2D6A4F] text-white transition-all hover:bg-[#1B4332] hover:shadow-xl hover:shadow-[#2D6A4F]/15 flex items-center gap-2 tracking-wide cursor-pointer"
                                        >
                                            <Rocket className="w-5 h-5 text-white" />
                                            Start Your Project
                                            <ArrowRight className="w-5 h-5 text-white" />
                                        </motion.button>
                                    </Link>
                                    <Link to="/schedule-demo" className="inline-block">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="px-8 py-4 rounded-2xl font-extrabold text-base border border-gray-200 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center gap-2 tracking-wide cursor-pointer"
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
