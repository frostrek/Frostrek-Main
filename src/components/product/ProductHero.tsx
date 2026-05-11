import { motion } from 'framer-motion';
import { ChevronRight, Rocket } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const ProductHero = ({
    description,
    tagline,
    badge,
    isCaseStudy
}: {
    title: string,
    description: string,
    tagline: string,
    badge?: string,
    isCaseStudy?: boolean
}) => {
    const navigate = useNavigate();
    
    return (
        <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 overflow-hidden bg-transparent font-body z-10">

            {/* Content Container */}
            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">

                {/* Floating Tag */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-[#E8F5EE] border-[#2D6A4F]/20 text-[#2D6A4F] text-sm font-bold mb-8 shadow-sm"
                >
                    <span className="flex h-2 w-2 rounded-full animate-pulse bg-[#2D6A4F]" />
                    {tagline}
                    {badge && (
                        <>
                            <span className="mx-1 text-xs text-[#2D6A4F]/40">·</span>
                            <span className="font-extrabold">{badge}</span>
                        </>
                    )}
                    <ChevronRight className="w-3 h-3 ml-1 text-[#2D6A4F]/60" />
                </motion.div>

                {/* Main Headline - Playfair Display serif font */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black mb-8 tracking-tight max-w-5xl mx-auto leading-tight text-gray-900"
                >
                    {isCaseStudy ? (
                        <>
                            A Real Product{' '}<br />
                            <span className="text-[#2D6A4F]">
                                We Built From Scratch
                            </span>
                        </>
                    ) : (
                        <>
                            AI-Powered Solutions for <br />
                            <span className="text-[#2D6A4F]">
                                Every Kind of Industry
                            </span>
                        </>
                    )}
                </motion.h1>

                {/* Subtext - 100% visible and crisp */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-slate-600 font-medium"
                >
                    {description}
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mb-20"
                >
                    {isCaseStudy ? (
                        <>
                            <Button
                                size="lg"
                                onClick={() => navigate('/contact')}
                                className="font-extrabold rounded-2xl px-8 h-14 text-base shadow-lg transition-all duration-300 flex items-center gap-2 bg-[#2D6A4F] text-white hover:bg-[#1B4332] hover:shadow-xl hover:shadow-[#2D6A4F]/25 cursor-pointer border-none"
                            >
                                <Rocket className="w-5 h-5 text-white" />
                                Build Something Like This
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                onClick={() => navigate('/schedule-demo')}
                                className="rounded-2xl px-8 h-14 text-base border bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all font-extrabold cursor-pointer"
                            >
                                Schedule a Demo
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                size="lg"
                                onClick={() => navigate('/schedule-demo')}
                                className="font-extrabold rounded-2xl px-8 h-14 text-base shadow-lg transition-all duration-300 bg-[#2D6A4F] text-white hover:bg-[#1B4332] hover:shadow-[#2D6A4F]/25 cursor-pointer border-none"
                            >
                                Get Started
                            </Button>
                            <Button
                                size="lg"
                                variant="ghost"
                                className="rounded-2xl px-8 h-14 text-base border bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all font-extrabold cursor-pointer"
                            >
                                14-days Free Trial
                            </Button>
                        </>
                    )}
                </motion.div>
            </div>

            {/* Soft fade at the bottom to transition smoothly to the next section */}
            <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none bg-gradient-to-t from-white to-transparent" />
        </section>
    );
};

export default ProductHero;
