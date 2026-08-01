import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/resources';
import SEO from '../components/seo/SEO';

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen pt-32 pb-20 px-4 container mx-auto text-center bg-brand-light-bg">
                <h1 className="text-4xl font-serif font-bold mb-6 text-[#2D6A4F]">Article Not Found</h1>
                <p className="text-gray-500 max-w-2xl mx-auto mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
                <Link to="/resources/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blogs
                </Link>
            </div>
        );
    }

    const articleSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image?.startsWith('http') ? post.image : `https://www.frostrek.ai/${post.image}`,
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.date).toISOString(),
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "publisher": {
            "@type": "Organization",
            "name": "Frostrek AI",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.frostrek.ai/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.frostrek.ai/resources/blog/${post.slug}`
        }
    });

    // Simple markdown-to-HTML renderer for headings, bold, lists, and paragraphs
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        const elements: React.JSX.Element[] = [];
        let listItems: string[] = [];
        let key = 0;

        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={key++} className="list-disc pl-6 space-y-2 text-gray-600 leading-relaxed mb-6">
                        {listItems.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
                        ))}
                    </ul>
                );
                listItems = [];
            }
        };

        const formatInline = (text: string) => {
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-800 font-semibold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
        };

        for (const line of lines) {
            const trimmed = line.trim();

            if (trimmed.startsWith('## ')) {
                flushList();
                elements.push(
                    <h2 key={key++} className="text-2xl md:text-3xl font-serif font-bold text-[#2D6A4F] mt-10 mb-4">
                        {trimmed.replace('## ', '')}
                    </h2>
                );
            } else if (trimmed.startsWith('### ')) {
                flushList();
                elements.push(
                    <h3 key={key++} className="text-xl md:text-2xl font-serif font-bold text-gray-800 mt-8 mb-3">
                        {trimmed.replace('### ', '')}
                    </h3>
                );
            } else if (trimmed.startsWith('- ')) {
                listItems.push(trimmed.replace('- ', ''));
            } else if (/^\d+\.\s/.test(trimmed)) {
                flushList();
                listItems.push(trimmed.replace(/^\d+\.\s/, ''));
            } else if (trimmed.startsWith('---')) {
                flushList();
                elements.push(<hr key={key++} className="my-10 border-gray-200" />);
            } else if (trimmed === '') {
                flushList();
            } else {
                flushList();
                elements.push(
                    <p key={key++} className="text-gray-600 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
                );
            }
        }
        flushList();
        return elements;
    };

    return (
        <div className="bg-brand-light-bg min-h-screen">
            <SEO
                title={`${post.title} | Frostrek AI Blog`}
                description={post.excerpt}
                path={`/resources/blog/${post.slug}`}
                type="article"
                schema={[articleSchema]}
            />

            {/* Hero */}
            <section className="relative pt-32 pb-12 bg-gradient-to-b from-white via-[#FAFCFB] to-brand-light-bg">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link to="/resources/blog" className="inline-flex items-center gap-2 text-sm font-bold text-[#2D6A4F] hover:text-[#1B4332] mb-8 transition-colors group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Blogs
                        </Link>

                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#E8F5EE] border border-[#2D6A4F]/15 text-[#2D6A4F]">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-serif font-black text-gray-950 leading-tight mb-6">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium pb-8 border-b border-gray-200">
                            <span className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#E8F5EE] text-[#2D6A4F]">
                                    <User className="w-4 h-4" />
                                </div>
                                {post.author}
                            </span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#2D6A4F]/60" /> {post.date}</span>
                            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#2D6A4F]/60" /> {post.readTime}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Hero Image */}
            {post.image && (
                <div className="container mx-auto px-4 md:px-6 max-w-4xl -mt-2 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="rounded-3xl overflow-hidden border border-gray-100 shadow-xl"
                    >
                        <img src={post.image.startsWith('http') || post.image.startsWith('/') ? post.image : `/${post.image}`}
                            alt={post.imageAlt || post.title}
                            className="w-full h-auto" loading="lazy" />
                    </motion.div>
                </div>
            )}

            {/* Article Content */}
            <article className="container mx-auto px-4 md:px-6 max-w-3xl pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="prose prose-lg max-w-none font-body"
                >
                    {renderContent(post.content)}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[#E8F5EE] to-[#F4FAF7] border border-[#2D6A4F]/10"
                >
                    <h3 className="font-serif text-2xl font-bold text-[#2D6A4F] mb-3">Ready to build production-ready AI?</h3>
                    <p className="text-gray-600 mb-6">Talk to our team about how Frostrek AI can help you deploy enterprise-grade AI solutions.</p>
                    <Link
                        to="/schedule-demo"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#2D6A4F] text-white font-medium hover:bg-[#1B4332] transition-colors shadow-lg shadow-[#2D6A4F]/10"
                    >
                        Book a Demo →
                    </Link>
                </motion.div>
            </article>
        </div>
    );
};

export default BlogPostPage;
