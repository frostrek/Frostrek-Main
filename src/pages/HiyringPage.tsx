import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Users, Video, Clock, TrendingUp, CheckCircle, Search, FileText, Globe, Shield, Star } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import { ImpactMetrics } from '../components/product/ImpactMetrics';
import { WorkflowBuilder } from '../components/product/WorkflowBuilder';
import { CapabilitiesSystem } from '../components/product/CapabilitiesSystem';
import ProductHero from '../components/product/ProductHero';
import { useTheme } from '../context/ThemeContext';
import CTASection from '../components/home/CTASection';
import SEO from '../components/seo/SEO';

const hiyringStats = [
    { value: '4,500+', label: 'Companies', icon: Users },
    { value: '2.5M+', label: 'Interviews Analyzed', icon: Video },
    { value: '85%', label: 'Faster Time to Hire', icon: Clock },
    { value: '60%', label: 'Reduced Hiring Costs', icon: TrendingUp },
    { value: '98%', label: 'Candidate Satisfaction', icon: Star },
];

const hiyringWorkflow = [
    { step: '01', title: 'Invite Candidates', description: 'Upload your list of candidates and initiate AI video interviews.' },
    { step: '02', title: 'AI Assessment', description: 'Candidates receive responses to your interview questions with AI analysis.' },
    { step: '03', title: 'Smart Ranking', description: 'Score and rank candidate assessments and create shortlists accurately.' },
    { step: '04', title: 'Hire the Best', description: 'Identify and confidently advance the most qualified candidates for further evaluation.' }
];

const hiyringFeatures = [
    { title: 'AI Video Interviews', description: 'Conduct asynchronous AI-powered video interviews with automated language analysis that goes beyond keywords.', icon: Video },
    { title: 'Instant Screening', description: 'Instantly rank the entire pool of candidates to easily remove unfit candidates from your pipeline.', icon: Search },
    { title: 'Advanced Analytics', description: 'Generate detailed candidate reports with rich scoring, sentiment analysis and rich interview dashboards.', icon: FileText },
    { title: 'Bias Reduction', description: 'AI anonymizes candidate evaluations to ensure objective, fair assessments across all applicants.', icon: Shield },
    { title: 'Multi-Language Support', description: 'Conduct interviews in 30+ languages, reaching global candidates, reducing language barriers and more.', icon: Globe },
    { title: 'Enterprise Security', description: 'Enterprise-grade encryption and GDPR compliance. We collect essential audio/video data solely to generate objective candidate evaluation reports for hiring teams.', icon: CheckCircle },
];

const hiyringFaq = [
    { question: 'Is AI Hiring biased against certain kinds of backgrounds?', answer: 'Our AI evaluates candidates based purely on skills and responses. It removes identifiers that typically lead to human bias, ensuring fair assessments for everyone.' },
    { question: 'Can I customize the interview questions?', answer: 'Yes! You can choose from our extensive library of scientifically validated questions or add your own custom questions tailored to specific roles.' },
    { question: 'How do you handle data privacy and security?', answer: 'We are fully GDPR compliant. All audio and video data is encrypted and used solely for candidate evaluation purposes. We do not sell or share candidate data.' },
    { question: 'How long does the AI assessment take?', answer: 'Assessments typically take 10-15 minutes for candidates to complete. The AI analysis and scoring are available to hiring managers almost instantly after completion.' },
    { question: 'Can multiple hiring managers collaborate?', answer: 'Absolutely. Our platform allows you to invite team members, share candidate profiles, and review AI insights collaboratively before making decisions.' },
];

const HiyringPage = () => {
    const { theme } = useTheme();
    const location = useLocation();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className={`relative min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : ''}`}>
            <SEO 
                title="Hiyring | Autonomous AI Video Interviews | Frostrek" 
                description="Hiyring streamlines your hiring process with autonomous AI video interviews. Screen thousands of candidates in minutes, not weeks, with scientifically focused assessments." 
                path={location.pathname} 
            />
            {theme !== 'dark' && <CuteBackground />}

            <ProductHero
                title="Hiyring"
                description="Hiyring streamlines your hiring process with autonomous AI video interviews. Screen thousands of candidates in minutes, not weeks, with scientifically focused assessments."
                tagline="Hire At the speed of AI with Hiyring"
            />

            <section className={`py-24 transition-colors ${theme === 'dark' ? 'bg-dark-card' : 'bg-brand-green-50'}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h2 className={`text-4xl md:text-5xl font-sans font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>4,500+ companies already using our platform</h2>
                    </div>
                    <ImpactMetrics statistics={hiyringStats} />
                </div>
            </section>

            <section className={`py-24 relative overflow-hidden transition-colors ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Workflow</span>
                        <h2 className={`text-4xl md:text-5xl font-sans font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Streamlined, Scientific, Seamless</h2>
                        <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>We've streamlined every part of hiring so you can focus on building meaningful relationships with your talent.</p>
                    </div>
                    <WorkflowBuilder steps={hiyringWorkflow} />
                </div>
            </section>

            <section className={`py-24 overflow-hidden transition-colors ${theme === 'dark' ? 'bg-dark-card' : 'bg-brand-green-50/30'}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-16">
                        <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>Features</span>
                        <h2 className={`text-4xl md:text-5xl font-serif leading-tight ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Everything you need to <br className="hidden md:block" />hire brilliantly</h2>
                        <p className={`max-w-2xl text-lg mt-4 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>Powerful tools and intelligent approaches designed to revolutionize every step of your interview process.</p>
                    </div>
                    <CapabilitiesSystem features={hiyringFeatures} />
                </div>
            </section>

            {/* For Companies vs For Candidates */}
            <section className={`py-24 transition-colors ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Companies */}
                        <div>
                            <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>FOR COMPANIES</span>
                            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Build world-class teams faster</h2>
                            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>Stop wasting time on manual screening. Let AI identify your best candidates while your team focuses on what matters most in your hiring process.</p>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                        <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Reduce Time-to-Hire by 70%</h4>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>Automate initial screening and let AI handle the first round, cutting timelines.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                        <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Save 40+ Hours Weekly</h4>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>Free your HR team from repetitive interviews so they focus on decisions.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                        <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Better Candidate Quality</h4>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>AI evaluations identify top talent with higher accuracy than manual screening.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                        <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Scale Effortlessly</h4>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>Interview 10 or 10,000 candidates with the same consistency and quality.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* Candidates */}
                        <div>
                            <span className={`font-bold tracking-widest uppercase text-sm mb-4 block ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`}>FOR CANDIDATES</span>
                            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Land your dream job with confidence</h2>
                            <p className={`text-lg mb-8 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}`}>Prepare smarter, interview better, and get the feedback you need to stand out from the competition with our practice suite.</p>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                        <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Interview on Your Terms</h4>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>No more scheduling headaches. Take your interview anytime, anywhere.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                        <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Get Instant Feedback</h4>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>Receive personalized insights on your performance and areas for improvement.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                        <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Fair & Unbiased Process</h4>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>Every candidate gets the same opportunity. AI evaluates your skills objectively.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${theme === 'dark' ? 'bg-dark-accent/20' : 'bg-brand-green-100'}`}>
                                        <CheckCircle className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-brand-green-600'}`} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Practice & Prepare</h4>
                                        <p className={theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'}>Access practice interviews tailored to your target role and industry.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className={`py-24 transition-colors ${theme === 'dark' ? 'bg-dark-card' : 'bg-gray-50'}`}>
                <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {hiyringFaq.map((item, idx) => (
                            <div key={idx} className={`rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                                <button
                                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                    className={`w-full text-left p-6 flex justify-between items-center transition-colors ${theme === 'dark' ? 'hover:bg-dark-card' : 'hover:bg-gray-50'}`}
                                >
                                    <span className={`text-lg font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{item.question}</span>
                                    {openFaqIndex === idx ? (
                                        <Minus className={`w-5 h-5 flex-shrink-0 ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-400'}`} />
                                    ) : (
                                        <Plus className={`w-5 h-5 flex-shrink-0 ${theme === 'dark' ? 'text-dark-accent' : 'text-gray-400'}`} />
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

            <CTASection />
        </div>
    );
};

export default HiyringPage;
