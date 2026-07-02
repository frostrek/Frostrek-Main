import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/resources';
import type { BlogPost } from '../data/resources';
import SEO from '../components/seo/SEO';
import SplitTextReveal from '../components/ui/SplitTextReveal';

const RESOURCE_COLORS = [
    { bg: 'bg-[#F0F9FF]', border: 'border-[#0284C7]/20 hover:border-[#0284C7]/40', iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0284C7]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#0284C7]/20', hoverBg: 'group-hover:bg-[#0284C7]', hoverText: 'group-hover:text-[#0284C7]', shadow: 'hover:shadow-[#0284C7]/10' },
    { bg: 'bg-[#F0FDF4]', border: 'border-[#16A34A]/20 hover:border-[#16A34A]/40', iconBg: 'bg-[#DCFCE7]', iconColor: 'text-[#16A34A]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#16A34A]/20', hoverBg: 'group-hover:bg-[#16A34A]', hoverText: 'group-hover:text-[#16A34A]', shadow: 'hover:shadow-[#16A34A]/10' },
    { bg: 'bg-[#FDF4FA]', border: 'border-[#DB2777]/20 hover:border-[#DB2777]/40', iconBg: 'bg-[#FCE7F3]', iconColor: 'text-[#DB2777]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#DB2777]/20', hoverBg: 'group-hover:bg-[#DB2777]', hoverText: 'group-hover:text-[#DB2777]', shadow: 'hover:shadow-[#DB2777]/10' },
    { bg: 'bg-[#FFF7ED]', border: 'border-[#EA580C]/20 hover:border-[#EA580C]/40', iconBg: 'bg-[#FFEDD5]', iconColor: 'text-[#EA580C]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#EA580C]/20', hoverBg: 'group-hover:bg-[#EA580C]', hoverText: 'group-hover:text-[#EA580C]', shadow: 'hover:shadow-[#EA580C]/10' },
    { bg: 'bg-[#F5F3FF]', border: 'border-[#7C3AED]/20 hover:border-[#7C3AED]/40', iconBg: 'bg-[#EDE9FE]', iconColor: 'text-[#7C3AED]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#7C3AED]/20', hoverBg: 'group-hover:bg-[#7C3AED]', hoverText: 'group-hover:text-[#7C3AED]', shadow: 'hover:shadow-[#7C3AED]/10' }
];

const BlogCard = ({ post, index = 0 }: { post: BlogPost; index?: number }) => {
    const color = RESOURCE_COLORS[index % RESOURCE_COLORS.length];
    return (
        <Link to={`/resources/blog/${post.slug}`}>
            <motion.div
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group cursor-pointer h-full"
            >
                <div className={`rounded-3xl border shadow-xl ${color.bg} ${color.border} hover:shadow-2xl ${color.shadow} shadow-gray-100/50 transition-all duration-300 overflow-hidden flex flex-col h-full`}>
                    <div className="relative h-52 overflow-hidden">
                        {post.image && (
                            <img src={post.image.startsWith('http') || post.image.startsWith('/') ? post.image : `/${post.image}`}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={512} height={512} />
                        )}
                        <div className={`absolute top-4 left-4 backdrop-blur-sm bg-white/90 ${color.iconColor} border ${color.badgeBorder} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                            {post.category}
                        </div>
                    </div>

                    <div className="p-7 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                            <span className="flex items-center gap-1"><Calendar className={`w-3.5 h-3.5 opacity-70 ${color.iconColor}`} /> {post.date}</span>
                            <span className="flex items-center gap-1"><Clock className={`w-3.5 h-3.5 opacity-70 ${color.iconColor}`} /> {post.readTime}</span>
                        </div>

                        <h2 className={`text-lg font-serif font-black text-gray-950 mb-3 ${color.hoverText} transition-colors duration-200 line-clamp-2`}>
                            {post.title}
                        </h2>

                        <p className="text-sm text-slate-500 font-body leading-relaxed mb-6 line-clamp-3">
                            {post.excerpt}
                        </p>

                        <div className="mt-auto flex items-center justify-between pt-4.5 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${color.iconBg} ${color.iconColor}`}>
                                    <User className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-xs font-bold text-slate-600 font-body">{post.author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const BlogIndexPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="relative min-h-screen pb-24 bg-gradient-to-b from-white via-white to-[#FAFCFB] font-body">
            <SEO
                title="Blog | Frostrek AI Insights"
                description="Read the latest insights, technical deep dives, and industry trends on Artificial Intelligence, Workflow Automation, and Data Operations from the Frostrek team."
                path="/blog"
                noindex={true}
            />

            <section className="relative min-h-[45vh] flex items-center pt-32 pb-16 overflow-hidden bg-gradient-to-b from-white via-[#FAFCFB] to-white">
                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] font-bold text-xs uppercase tracking-wider"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-[#2D6A4F] animate-pulse" />
                        Our Blog
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#2D6A4F] leading-[1.05] tracking-tight mb-6">
                        <SplitTextReveal
                            as="span"
                            type="chars"
                            stagger={0.03}
                            once={false}
                            trigger="load"
                        >
                            Insights &amp; Perspectives
                        </SplitTextReveal>
                    </h1>

                    <SplitTextReveal
                        as="p"
                        className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
                        type="words"
                        stagger={0.015}
                        once={false}
                        delay={0.4}
                        trigger="load"
                    >
                        Explore technical articles and industry trends from our core engineering team.
                    </SplitTextReveal>
                </div>
                
                {/* Radial Glow */}
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] bg-[#E8F5EE]/45 pointer-events-none" />
            </section>

            <div className="container mx-auto px-4 md:px-6 relative z-10 pt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.map((post, index) => (
                            <BlogCard
                                key={post.id}
                                post={post}
                                index={index}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default BlogIndexPage;
