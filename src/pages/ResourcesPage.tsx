import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Clock, Calendar, User } from 'lucide-react';
import { CASE_STUDIES, BLOG_POSTS } from '../data/resources';
import type { CaseStudy, BlogPost } from '../data/resources';
import SEO from '../components/seo/SEO';
import FlipText from '../components/ui/FlipText';
import SplitTextReveal from '../components/ui/SplitTextReveal';

const ResourcesHero = () => {
    return (
        <section className="relative min-h-[55vh] flex items-center pt-32 pb-16 overflow-hidden bg-gradient-to-b from-white via-[#FAFCFB] to-white font-body">
            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] font-bold text-xs uppercase tracking-wider"
                >
                    <span className="flex h-2 w-2 rounded-full bg-[#2D6A4F] animate-pulse" />
                    Knowledge Hub
                </motion.div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 tracking-tight text-gray-950 leading-tight">
                    <span className="flex flex-wrap justify-center items-baseline gap-x-3">
                        <SplitTextReveal
                            as="span"
                            type="chars"
                            stagger={0.02}
                            once={false}
                            trigger="load"
                        >
                            Insights &amp;
                        </SplitTextReveal>
                        <motion.span
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D6A4F] via-[#40916C] to-[#1B4332]"
                        >
                            Success Stories
                        </motion.span>
                    </span>
                </h1>

                {/* Subtitle */}
                <SplitTextReveal
                    as="p"
                    className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed"
                    type="words"
                    stagger={0.015}
                    once={false}
                    delay={0.4}
                    trigger="load"
                >
                    Deep dives into how we help enterprises build production-ready AI systems through high-quality data operations and custom machine learning agents.
                </SplitTextReveal>
            </div>

            {/* Subtle Grid Background Overlay */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(#2d6a4f 1px, transparent 1px), linear-gradient(90deg, #2d6a4f 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />
            {/* Radial Glow */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-[#E8F5EE]/45 pointer-events-none" />
        </section>
    );
};

const CaseStudyCard = ({ study, onClick }: { study: CaseStudy; onClick: () => void }) => {
    return (
        <motion.div
            layoutId={`card-${study.id}`}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={onClick}
            className="group cursor-pointer h-full"
        >
            <div className="h-full rounded-3xl border shadow-xl bg-white border-[#2D6A4F]/10 hover:border-[#2D6A4F]/25 hover:shadow-2xl hover:shadow-[#2D6A4F]/5 shadow-gray-100/50 transition-all duration-300 relative overflow-hidden flex flex-col p-8">
                {/* Top slide bar */}
                <div className="absolute top-0 left-0 w-full h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 bg-[#2D6A4F]" />

                <div className="mb-6 flex justify-between items-start">
                    <div className="p-3.5 rounded-2xl bg-[#E8F5EE] text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white transition-all duration-300">
                        <study.icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full border bg-[#E8F5EE]/40 border-[#2D6A4F]/15 text-[#2D6A4F]">
                        {study.category}
                    </span>
                </div>

                <h3 className="text-lg font-serif font-black text-gray-950 mb-3 group-hover:text-[#2D6A4F] transition-colors duration-200 line-clamp-2">
                    {study.title}
                </h3>

                {/* FIXED: high contrast description text-slate-500 prevents invisible body text */}
                <p className="text-sm text-slate-500 font-medium font-body leading-relaxed mb-6 flex-grow">
                    {study.description}
                </p>

                <div className="flex items-center font-bold text-xs uppercase tracking-wider text-[#2D6A4F] group/btn">
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </div>
            </div>
        </motion.div>
    );
};

const BlogCard = ({ post, onClick }: { post: BlogPost; onClick: () => void }) => {
    return (
        <motion.div
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={onClick}
            className="group cursor-pointer h-full"
        >
            <div className="rounded-3xl border shadow-xl bg-white border-[#2D6A4F]/10 hover:border-[#2D6A4F]/25 hover:shadow-2xl hover:shadow-[#2D6A4F]/5 shadow-gray-100/50 transition-all duration-300 overflow-hidden flex flex-col h-full">
                <div className="relative h-52 overflow-hidden">
                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )}
                    <div className="absolute top-4 left-4 backdrop-blur-sm bg-white/90 text-[#2D6A4F] border border-[#2D6A4F]/15 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {post.category}
                    </div>
                </div>

                <div className="p-7 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#2D6A4F]/70" /> {post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#2D6A4F]/70" /> {post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-serif font-black text-gray-950 mb-3 group-hover:text-[#2D6A4F] transition-colors duration-200 line-clamp-2">
                        {post.title}
                    </h3>

                    {/* FIXED: text-slate-500 prevents white-on-white text issues */}
                    <p className="text-sm text-slate-500 font-medium font-body leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-4.5 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#E8F5EE] text-[#2D6A4F]">
                                <User className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-xs font-bold text-slate-600 font-body">{post.author}</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const ResourcesPage = () => {
    const [activeTab, setActiveTab] = useState<'case-studies' | 'blogs'>('case-studies');
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setIsExpanded(false);
    }, [activeTab]);

    useEffect(() => {
        if (selectedStudy || selectedBlog) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [selectedStudy, selectedBlog]);

    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen pb-24 bg-gradient-to-b from-white via-white to-[#FAFCFB] font-body">
            <SEO 
                title="Resources | Frostrek - AI Insights & Success Stories" 
                description="Deep dives into how we help enterprises build production-ready AI systems through high-quality data operations and case studies." 
                path="/resources" 
            />

            <ResourcesHero />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Tabs - Completely rethemed and highly visible */}
                <div className="flex justify-center mb-16">
                    <div className="bg-[#E8F5EE]/45 border border-[#2D6A4F]/15 p-1.5 rounded-full inline-flex shadow-sm">
                        {(['case-studies', 'blogs'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 relative cursor-pointer ${activeTab === tab
                                    ? 'text-white'
                                    : 'text-slate-500 hover:text-[#2D6A4F]'
                                    }`}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-full shadow-md bg-[#2D6A4F]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {tab.replace('-', ' ')}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Panel */}
                <AnimatePresence mode="wait">
                    {activeTab === 'case-studies' ? (
                        <motion.div
                            key="case-studies"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {(isExpanded ? CASE_STUDIES : CASE_STUDIES.slice(0, 6)).map((study) => (
                                    <div key={study.id}>
                                        <CaseStudyCard
                                            study={study}
                                            onClick={() => setSelectedStudy(study)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Innovative CTA Section */}
                            {!isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mt-20"
                                >
                                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-[#FAFCFB] to-white border border-[#2D6A4F]/10 shadow-2xl shadow-[#2D6A4F]/5">
                                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-15 bg-[#E8F5EE]" />
                                            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[80px] opacity-10 bg-[#2D6A4F]/5" />
                                        </div>

                                        <div className="relative z-10 p-8 md:p-14">
                                            <div className="flex flex-col lg:flex-row items-center gap-12">

                                                {/* Left: Stacked Cards Preview */}
                                                <div className="relative w-full lg:w-auto flex-shrink-0">
                                                    <div className="relative h-44 w-full lg:w-80 flex items-center justify-center">
                                                        {[2, 1, 0].map((i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                                className="absolute rounded-2xl shadow-xl bg-white border border-gray-150"
                                                                style={{
                                                                    width: `${210 - i * 20}px`,
                                                                    height: `${140 - i * 15}px`,
                                                                    transform: `translateY(${i * 12}px) rotate(${(i - 1) * 3}deg)`,
                                                                    zIndex: 3 - i,
                                                                }}
                                                            >
                                                                <div className="p-4 h-full flex flex-col justify-between">
                                                                    <div className="w-8 h-8 rounded-lg bg-[#E8F5EE]" />
                                                                    <div className="space-y-2">
                                                                        <div className="h-1.5 rounded-full bg-slate-100" style={{ width: `${80 - i * 10}%` }} />
                                                                        <div className="h-1.5 rounded-full bg-slate-100" style={{ width: `${60 - i * 10}%` }} />
                                                                    </div>
                                                                </div>
                                                             </motion.div>
                                                        ))}
                                                    </div>

                                                    {/* Floating count badge — outside the clipping container */}
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
                                                        className="absolute -top-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-xl bg-[#2D6A4F] text-white border-[3px] border-white z-20"
                                                    >
                                                        <span className="text-base font-extrabold leading-none tracking-tight">+{CASE_STUDIES.length - 6}</span>
                                                    </motion.div>
                                                </div>

                                                {/* Center: Content details */}
                                                <div className="flex-1 text-center lg:text-left space-y-4">
                                                    <h3 className="text-3xl font-serif font-black text-gray-950">
                                                        Unlock All Case Studies
                                                    </h3>
                                                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
                                                        Dive into our complete library of AI transformation stories across every industry.
                                                    </p>

                                                    {/* Category Pills */}
                                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                                        {['Computer Vision', 'NLP', 'Data Ops', 'Automation'].map((cat, i) => (
                                                            <motion.span
                                                                key={cat}
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 0.6 + i * 0.1 }}
                                                                className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/10 rounded-full"
                                                            >
                                                                {cat}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right: CTA Button */}
                                                <div className="flex-shrink-0">
                                                    <motion.button
                                                        onClick={() => setIsExpanded(true)}
                                                        whileTap={{ scale: 0.97 }}
                                                        className="group relative px-8 py-4 rounded-2xl font-medium text-sm bg-[#2D6A4F] hover:bg-[#1B4332] text-white shadow-lg shadow-[#2D6A4F]/10 transition-all duration-300 flex items-center gap-3 cursor-pointer overflow-hidden"
                                                    >
                                                        <FlipText>
                                                            Explore All
                                                            <ArrowUpRight className="w-4 h-4 text-white" />
                                                        </FlipText>
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="blogs"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="relative"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {(isExpanded ? BLOG_POSTS : BLOG_POSTS.slice(0, 6)).map((post) => (
                                    <div key={post.id}>
                                        <BlogCard
                                            post={post}
                                            onClick={() => setSelectedBlog(post)}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Innovative CTA Section */}
                            {!isExpanded && BLOG_POSTS.length > 6 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className="mt-20"
                                >
                                    <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white via-[#FAFCFB] to-white border border-[#2D6A4F]/10 shadow-2xl shadow-[#2D6A4F]/5">
                                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                            <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-15 bg-[#E8F5EE]" />
                                            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[80px] opacity-10 bg-[#2D6A4F]/5" />
                                        </div>

                                        <div className="relative z-10 p-8 md:p-14">
                                            <div className="flex flex-col lg:flex-row items-center gap-12">

                                                {/* Left: Stacked Cards Preview */}
                                                <div className="relative w-full lg:w-auto flex-shrink-0">
                                                    <div className="relative h-44 w-full lg:w-80 flex items-center justify-center overflow-visible">
                                                        {[2, 1, 0].map((i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                                className="absolute rounded-2xl shadow-xl bg-white border border-gray-150"
                                                                style={{
                                                                    width: `${210 - i * 20}px`,
                                                                    height: `${140 - i * 15}px`,
                                                                    transform: `translateY(${i * 12}px) rotate(${(i - 1) * 3}deg)`,
                                                                    zIndex: 3 - i,
                                                                }}
                                                            >
                                                                <div className="p-4 h-full flex flex-col justify-between">
                                                                    <div className="w-8 h-8 rounded-lg bg-[#E8F5EE]" />
                                                                    <div className="space-y-2">
                                                                        <div className="h-1.5 rounded-full bg-slate-100" style={{ width: `${80 - i * 10}%` }} />
                                                                        <div className="h-1.5 rounded-full bg-slate-100" style={{ width: `${60 - i * 10}%` }} />
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    {/* Floating count badge — outside clipping container */}
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
                                                        className="absolute -top-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center shadow-xl bg-[#2D6A4F] text-white border-[3px] border-white z-20"
                                                    >
                                                        <span className="text-base font-extrabold leading-none tracking-tight">+{BLOG_POSTS.length - 6}</span>
                                                    </motion.div>
                                                </div>

                                                {/* Center: Content details */}
                                                <div className="flex-1 text-center lg:text-left space-y-4">
                                                    <h3 className="text-3xl font-serif font-black text-gray-950">
                                                        More Insights Await
                                                    </h3>
                                                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xl">
                                                        Explore deep technical articles and industry perspectives from our core engineering team.
                                                    </p>

                                                    {/* Category Pills */}
                                                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                                        {['Trends', 'Technical', 'Best Practices', 'Research'].map((cat, i) => (
                                                            <motion.span
                                                                key={cat}
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 0.6 + i * 0.1 }}
                                                                className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/10 rounded-full"
                                                            >
                                                                {cat}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right: CTA Button */}
                                                <div className="flex-shrink-0">
                                                    <motion.button
                                                        onClick={() => setIsExpanded(true)}
                                                        whileHover={{ scale: 1.03 }}
                                                        whileTap={{ scale: 0.97 }}
                                                        className="group relative px-8 py-4 rounded-2xl font-bold text-sm bg-[#2D6A4F] hover:bg-[#1B4332] text-white shadow-xl shadow-[#2D6A4F]/15 transition-all duration-300 flex items-center gap-3 cursor-pointer"
                                                    >
                                                        Explore All
                                                        <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Case Study Modal */}
            <AnimatePresence>
                {selectedStudy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-hidden touch-none"
                        onClick={() => setSelectedStudy(null)}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            layoutId={`card-${selectedStudy.id}`}
                            className="rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white border border-[#2D6A4F]/10 overscroll-contain relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedStudy(null)}
                                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-[#E8F5EE] text-[#2D6A4F] hover:scale-105 transition-all duration-200 z-10 cursor-pointer"
                            >
                                <X size={18} />
                            </button>

                            <div className="p-8 md:p-12">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3.5 rounded-2xl bg-[#E8F5EE] text-[#2D6A4F]">
                                        <selectedStudy.icon className="w-6 h-6" />
                                    </div>
                                    <span className="px-3.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full border bg-[#E8F5EE]/40 border-[#2D6A4F]/15 text-[#2D6A4F]">
                                        {selectedStudy.category}
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-serif font-black mb-6 text-gray-950">
                                    {selectedStudy.title}
                                </h2>

                                {/* Metadata Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 rounded-2xl border bg-[#FAFCFB] border-[#2D6A4F]/10">
                                    <div>
                                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1 font-body">Client Type</div>
                                        <div className="text-sm font-bold text-gray-950">{selectedStudy.client}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1 font-body">Duration</div>
                                        <div className="text-sm font-bold text-gray-950">{selectedStudy.duration}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1 font-body">Project Team</div>
                                        <div className="text-sm font-bold text-gray-950">{selectedStudy.team}</div>
                                    </div>
                                </div>

                                <div className="space-y-8 leading-relaxed text-slate-600 font-medium font-body text-base md:text-lg">
                                    <section className="space-y-2">
                                        <h3 className="text-lg font-serif font-black text-gray-950 flex items-center gap-2">
                                            <span className="w-1.5 h-6 rounded-full bg-[#2D6A4F]" />
                                            The Challenge
                                        </h3>
                                        <p className="leading-relaxed text-slate-600">{selectedStudy.challenge}</p>
                                    </section>

                                    <section className="space-y-2">
                                        <h3 className="text-lg font-serif font-black text-gray-950 flex items-center gap-2">
                                            <span className="w-1.5 h-6 rounded-full bg-[#2D6A4F]" />
                                            Our Solution
                                        </h3>
                                        <p className="leading-relaxed text-slate-600">{selectedStudy.solution}</p>
                                    </section>

                                    <section className="space-y-2">
                                        <h3 className="text-lg font-serif font-black text-gray-950 flex items-center gap-2">
                                            <span className="w-1.5 h-6 rounded-full bg-[#2D6A4F]" />
                                            Key Results
                                        </h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
                                            {selectedStudy.outcome.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 p-4 rounded-2xl border bg-[#FAFCFB] border-[#2D6A4F]/10">
                                                    <div className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 bg-[#E8F5EE] text-[#2D6A4F]">
                                                        <Clock size={12} />
                                                    </div>
                                                    <span className="text-sm font-semibold text-slate-700 leading-relaxed">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </section>
                                </div>

                                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                                    <button
                                        onClick={() => navigate('/schedule-demo')}
                                        className="group rounded-2xl font-medium text-sm bg-[#2D6A4F] hover:bg-[#1B4332] text-white py-4 px-8 shadow-lg shadow-[#2D6A4F]/10 transition-all duration-300 cursor-pointer overflow-hidden"
                                    >
                                        <FlipText>
                                            Schedule Similar Project
                                        </FlipText>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Blog Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm overflow-hidden touch-none"
                        onClick={() => setSelectedBlog(null)}
                        onWheel={(e) => e.stopPropagation()}
                    >
                        <motion.div
                            layoutId={`blog-${selectedBlog.id}`}
                            className="rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white border border-[#2D6A4F]/10 overscroll-contain relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedBlog(null)}
                                className="absolute top-5 right-5 p-2 rounded-full bg-white/95 text-[#2D6A4F] shadow-md hover:scale-105 transition-all duration-200 z-10 cursor-pointer"
                            >
                                <X size={18} />
                            </button>

                            <div className="relative h-64 md:h-80 w-full">
                                <img
                                    src={selectedBlog.image}
                                    alt={selectedBlog.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider mb-3 opacity-90">
                                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#52B788]" /> {selectedBlog.date}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#52B788]" /> {selectedBlog.readTime}</span>
                                    </div>
                                    <div className="inline-block px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2D6A4F] text-white shadow-sm">
                                        {selectedBlog.category}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <h2 className="text-3xl md:text-4xl font-serif font-black mb-6 text-gray-950">
                                    {selectedBlog.title}
                                </h2>

                                <div className="flex items-center gap-3.5 mb-8 p-4.5 rounded-2xl border bg-[#FAFCFB] border-[#2D6A4F]/10">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#E8F5EE] text-[#2D6A4F]">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 font-body">Written by</div>
                                        <div className="font-bold text-sm text-gray-950">{selectedBlog.author}</div>
                                    </div>
                                </div>

                                <div className="prose max-w-none text-slate-600 font-medium font-body leading-relaxed text-base md:text-lg">
                                    <p className="text-lg md:text-xl font-bold mb-8 text-slate-800 leading-relaxed border-l-4 border-[#2D6A4F] pl-4">
                                        {selectedBlog.excerpt}
                                    </p>
                                    <div className="space-y-6">
                                        <p>
                                            In the rapidly evolving landscape of artificial intelligence, {selectedBlog.title} represents a pivotal shift.
                                            Enterprises are constantly seeking ways to leverage these advancements to stay ahead of the curve.
                                        </p>
                                        <p>
                                            This article explores the nuances of {selectedBlog.category}, diving deep into the methodologies and frameworks
                                            that drive success. From data infrastructure to model alignment, every component plays a critical role.
                                        </p>
                                        <h3 className="text-xl font-serif font-black text-gray-950 mt-8 mb-4">The Strategic Imperative</h3>
                                        <p>
                                            Understanding the core mechanics is just the beginning. The real value lies in the strategic application of these
                                            technologies to solve real-world business problems. Whether it's through enhanced automation, improved decision-making,
                                            or novel customer experiences, the impact is profound.
                                        </p>
                                        <p>
                                            As we continue to push the boundaries of what's possible, keeping a pulse on these developments is not just beneficial—it's essential
                                            for long-term viability and growth.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                        Posted in <strong className="text-[#2D6A4F]">{selectedBlog.category}</strong>
                                    </span>
                                    <button
                                        onClick={() => window.open('https://medium.com/@frostrek', '_blank')}
                                        className="rounded-xl font-bold text-xs bg-[#E8F5EE] border border-[#2D6A4F]/15 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white py-3 px-5 shadow-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                                    >
                                        Read on Medium <ArrowUpRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResourcesPage;
