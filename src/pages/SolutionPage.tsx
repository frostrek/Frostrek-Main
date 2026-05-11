import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SOLUTION_DATA } from '../utils/solutionData';
import Button from '../components/ui/Button';
import CommonChallenges from '../components/solution/CommonChallenges';
import FrostrekAdvantage from '../components/solution/FrostrekAdvantage';
import AllSolutionsSection from '../components/solution/AllSolutionsSection';
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

const SolutionPage = () => {
    const { theme } = useTheme();
    const location = useLocation();
    const solution = SOLUTION_DATA[location.pathname] || SOLUTION_DATA['generic'];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (!solution) return null;

    // Optional FAQ schema if solution has FAQs
    const faqSchema = (solution as any).faq ? JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": (solution as any).faq.map((q: any) => ({
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
        <div className={`pt-20 ${theme === 'dark' ? 'bg-brand-light-bg' : ''}`}>
            <SEO 
                title={`${solution.title} | Frostrek Solutions`} 
                description={solution.description} 
                path={location.pathname} 
                schema={schemas}
            />
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-24 pb-32 bg-gradient-to-b from-white via-[#FAFCFB] to-white">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column: Content */}
                        <div className="text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-block px-4 py-1.5 rounded-full border font-bold text-xs mb-6 bg-[#E8F5EE] border-[#2D6A4F]/25 text-[#2D6A4F] uppercase tracking-wider font-body"
                            >
                                Industry Solutions
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-serif font-black mb-6 leading-tight text-gray-950"
                            >
                                {solution.title}: <br />
                                <span className="text-[#2D6A4F]">{solution.subtitle}</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl mb-10 leading-relaxed max-w-xl text-slate-600 font-medium font-body"
                            >
                                {solution.description}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link to="/schedule-demo">
                                    <Button size="lg" className="shadow-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white border-none px-8 py-4 text-sm font-bold rounded-xl transition-all duration-300">
                                        Book a Demo
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Column: Abstract Illustration */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="relative hidden lg:block animate-bounce-slow"
                        >
                            <div className="relative z-10 rounded-3xl border p-6 shadow-2xl bg-white/95 border-[#2D6A4F]/10 backdrop-blur-md">
                                {/* Fake Header */}
                                <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                    </div>
                                    <div className="h-2 w-32 rounded-full bg-slate-100" />
                                </div>
                                {/* Fake Chart / Content */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="rounded-xl p-4 bg-[#FAFCFB] border border-gray-100/50">
                                            <div className="h-1.5 w-8 rounded mb-2 bg-slate-200" />
                                            <div className="h-5 w-16 rounded bg-[#E8F5EE]" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-4 items-end h-32 px-2">
                                    <div className="w-full rounded-t-lg h-[40%] bg-[#E8F5EE]" />
                                    <div className="w-full rounded-t-lg h-[70%] bg-[#2D6A4F]/20" />
                                    <div className="w-full rounded-t-lg h-[50%] bg-[#E8F5EE]" />
                                    <div className="w-full rounded-t-lg h-[80%] bg-[#2D6A4F]/30" />
                                    <div className="w-full rounded-t-lg h-[65%] bg-[#2D6A4F]" />
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-6 -right-6 rounded-2xl p-4.5 shadow-xl z-20 bg-white border border-[#2D6A4F]/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#E8F5EE]">
                                        <CheckCircle2 className="w-5.5 h-5.5 text-[#2D6A4F]" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-body">Efficiency</div>
                                        <div className="text-xl font-bold text-[#2D6A4F] font-serif">+127%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-3xl -z-10 bg-[#E8F5EE]/40" />
                        </motion.div>
                    </div>
                </div>

                {/* Abstract Background with Geometric Patterns */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: 'linear-gradient(#2d6a4f 1px, transparent 1px), linear-gradient(90deg, #2d6a4f 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Radial Glows */}
                    <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] bg-[#E8F5EE]/50" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] bg-[#2D6A4F]/5" />

                    {/* Diagonal Light Streak */}
                    <div className="absolute top-0 right-0 w-[1000px] h-full bg-gradient-to-l from-[#E8F5EE]/10 to-transparent skew-x-12 blur-3xl opacity-35" />
                </div>
            </section>

            {/* All Solutions Section - Only on /solutions */}
            {location.pathname === '/solutions' && <AllSolutionsSection />}

            {/* Challenges vs Solutions */}
            <CommonChallenges key={location.pathname} challenges={solution.challenges} />

            {/* Features / Solution Grid */}
            <FrostrekAdvantage key={`features-${location.pathname}`} features={solution.features} />

            {/* Bottom CTA */}
            <CTASection />
        </div>
    );
};

export default SolutionPage;

