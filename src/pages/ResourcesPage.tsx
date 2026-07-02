import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Clock, Download } from 'lucide-react';
import { CASE_STUDIES } from '../data/resources';
import type { CaseStudy } from '../data/resources';
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
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#2D6A4F] leading-[1.05] tracking-tight flex flex-col items-center mb-6">
                    <SplitTextReveal
                        as="span"
                        type="chars"
                        stagger={0.03}
                        once={false}
                        trigger="load"
                    >
                        Insights &amp;
                    </SplitTextReveal>
                    <motion.span
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[#2D6A4F] mt-1"
                    >
                        Knowledge Hub
                    </motion.span>
                </h1>

                {/* Subtitle */}
                <SplitTextReveal
                    as="p"
                    className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
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

const RESOURCE_COLORS = [
    { // Blue
        bg: 'bg-[#F0F9FF]', border: 'border-[#0284C7]/20 hover:border-[#0284C7]/40', iconBg: 'bg-[#E0F2FE]', iconColor: 'text-[#0284C7]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#0284C7]/20', hoverBg: 'group-hover:bg-[#0284C7]', hoverText: 'group-hover:text-[#0284C7]', shadow: 'hover:shadow-[#0284C7]/10', topBar: 'bg-[#0284C7]'
    },
    { // Green
        bg: 'bg-[#F0FDF4]', border: 'border-[#16A34A]/20 hover:border-[#16A34A]/40', iconBg: 'bg-[#DCFCE7]', iconColor: 'text-[#16A34A]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#16A34A]/20', hoverBg: 'group-hover:bg-[#16A34A]', hoverText: 'group-hover:text-[#16A34A]', shadow: 'hover:shadow-[#16A34A]/10', topBar: 'bg-[#16A34A]'
    },
    { // Pink
        bg: 'bg-[#FDF4FA]', border: 'border-[#DB2777]/20 hover:border-[#DB2777]/40', iconBg: 'bg-[#FCE7F3]', iconColor: 'text-[#DB2777]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#DB2777]/20', hoverBg: 'group-hover:bg-[#DB2777]', hoverText: 'group-hover:text-[#DB2777]', shadow: 'hover:shadow-[#DB2777]/10', topBar: 'bg-[#DB2777]'
    },
    { // Orange
        bg: 'bg-[#FFF7ED]', border: 'border-[#EA580C]/20 hover:border-[#EA580C]/40', iconBg: 'bg-[#FFEDD5]', iconColor: 'text-[#EA580C]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#EA580C]/20', hoverBg: 'group-hover:bg-[#EA580C]', hoverText: 'group-hover:text-[#EA580C]', shadow: 'hover:shadow-[#EA580C]/10', topBar: 'bg-[#EA580C]'
    },
    { // Yellow (Replaced with Green theme)
        bg: 'bg-[#F0FDF4]', border: 'border-[#16A34A]/20 hover:border-[#16A34A]/40', iconBg: 'bg-[#DCFCE7]', iconColor: 'text-[#16A34A]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#16A34A]/20', hoverBg: 'group-hover:bg-[#16A34A]', hoverText: 'group-hover:text-[#16A34A]', shadow: 'hover:shadow-[#16A34A]/10', topBar: 'bg-[#16A34A]'
    },
    { // Purple
        bg: 'bg-[#F5F3FF]', border: 'border-[#7C3AED]/20 hover:border-[#7C3AED]/40', iconBg: 'bg-[#EDE9FE]', iconColor: 'text-[#7C3AED]', badgeBg: 'bg-white/60', badgeBorder: 'border-[#7C3AED]/20', hoverBg: 'group-hover:bg-[#7C3AED]', hoverText: 'group-hover:text-[#7C3AED]', shadow: 'hover:shadow-[#7C3AED]/10', topBar: 'bg-[#7C3AED]'
    }
];

const CaseStudyCard = ({ study, onClick, index = 0 }: { study: CaseStudy; onClick: () => void; index?: number }) => {
    const color = RESOURCE_COLORS[index % RESOURCE_COLORS.length];
    return (
        <motion.div
            layoutId={`card-${study.id}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            onClick={onClick}
            className="group cursor-pointer h-full"
        >
            <div className={`h-full rounded-3xl border shadow-xl ${color.bg} ${color.border} hover:shadow-2xl ${color.shadow} shadow-gray-100/50 transition-all duration-300 relative overflow-hidden flex flex-col p-8`}>
                {/* Top slide bar */}
                <div className={`absolute top-0 left-0 w-full h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${color.topBar}`} />

                <div className="mb-6 flex justify-between items-start">
                    <div className={`p-3.5 rounded-2xl ${color.iconBg} ${color.iconColor} ${color.hoverBg} group-hover:text-white transition-all duration-300`}>
                        <study.icon className="w-5 h-5" />
                    </div>
                    <span className={`px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full border ${color.badgeBg} ${color.badgeBorder} ${color.iconColor}`}>
                        {study.category}
                    </span>
                </div>

                <h3 className={`text-lg font-serif font-black text-gray-950 mb-3 ${color.hoverText} transition-colors duration-200 line-clamp-2`}>
                    {study.title}
                </h3>

                {/* FIXED: high contrast description text-slate-500 prevents invisible body text */}
                <p className="text-sm text-slate-500 font-body leading-relaxed mb-6 flex-grow">
                    {study.description}
                </p>

                <div className={`flex items-center font-bold text-xs uppercase tracking-wider ${color.iconColor} group/btn`}>
                    View Case Study
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </div>
            </div>
        </motion.div>
    );
};

export const ResourcesPage = () => {
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (selectedStudy) {
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
    }, [selectedStudy]);

    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen pb-24 bg-gradient-to-b from-white via-white to-[#FAFCFB] font-body">
            <SEO
                title="Resources | Frostrek AI - Insights & Success Stories"
                description="Deep dives into how Frostrek AI helps enterprises build production-ready AI systems through high-quality data operations and citable case studies."
                path="/resources"
            />

            <ResourcesHero />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Case Studies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CASE_STUDIES.map((study, index) => (
                        <div key={study.id}>
                            <CaseStudyCard
                                study={study}
                                index={index}
                                onClick={() => setSelectedStudy(study)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── PDF Casebooks Section ─── */}
            <section className="pt-10 pb-4 bg-gradient-to-b from-white to-[#FAF9F6] relative z-10">
                <div className="container mx-auto px-4 md:px-6">
                    <style>{`
                        .pdf-iframe-wrapper iframe::-webkit-scrollbar { display: none; }
                        .pdf-iframe-wrapper iframe { scrollbar-width: none; -ms-overflow-style: none; }
                        .pdf-iframe-wrapper { overflow: hidden; }
                    `}</style>
                    <div className="text-center mb-14">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] font-bold text-xs uppercase tracking-wider">
                                <span className="flex h-2 w-2 rounded-full bg-[#2D6A4F] animate-pulse" />
                                Downloadable Casebooks
                            </span>
                        </motion.div>
                        
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-tight tracking-tight mb-4">
                            <SplitTextReveal
                                as="span"
                                type="chars"
                                stagger={0.03}
                                once={false}
                            >
                                Explore Our Detailed Casebooks
                            </SplitTextReveal>
                        </h2>
                        
                        <SplitTextReveal
                            as="p"
                            className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
                            type="words"
                            stagger={0.015}
                            once={false}
                            delay={0.2}
                        >
                            In-depth documentation of our enterprise AI engagements — from strategy to deployment outcomes.
                        </SplitTextReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 max-w-5xl mx-auto items-stretch">
                        {/* AI Agent Casebook */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="group h-full"
                        >
                            <div className="rounded-3xl border border-[#0284C7]/20 hover:border-[#0284C7]/40 bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] hover:shadow-[#0284C7]/10 transition-all duration-300 overflow-hidden relative" style={{ height: 560 }}>
                                {/* PDF Preview — fills entire card */}
                                <a
                                    href="/pdf/AI Agent CASEBOOK — Frostrek LLP (2).pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block absolute inset-0 cursor-pointer"
                                >
                                    <div className="pdf-iframe-wrapper w-full h-full" style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
                                        <iframe
                                            src="/pdf/AI Agent CASEBOOK — Frostrek LLP (2).pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=100"
                                            style={{ width: 'calc(100% + 40px)', height: 'calc(100% + 30px)', border: 'none', display: 'block', margin: '-16px 0 0 -16px', padding: 0, overflow: 'hidden', pointerEvents: 'none' }}
                                            title="AI Agent Casebook Preview"
                                            scrolling="no"
                                        />
                                    </div>
                                    {/* Progressive blur overlay — clear at top, blurry after title */}
                                    <div className="absolute inset-0 pointer-events-none" style={{
                                        background: 'linear-gradient(to bottom, transparent 45%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0.5) 85%, rgba(255,255,255,0.7) 100%)',
                                    }} />
                                    <div className="absolute inset-0 pointer-events-none" style={{
                                        maskImage: 'linear-gradient(to bottom, transparent 45%, black 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 45%, black 100%)',
                                        backdropFilter: 'blur(2px)',
                                    }} />
                                    <div className="absolute inset-0 pointer-events-none" style={{
                                        maskImage: 'linear-gradient(to bottom, transparent 65%, black 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 65%, black 100%)',
                                        backdropFilter: 'blur(4px)',
                                    }} />
                                    {/* Hover overlay with preview icon */}
                                    <div className="absolute inset-0 bg-[#0284C7]/0 group-hover:bg-[#0284C7]/10 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-white/90 backdrop-blur-sm text-[#0284C7] font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
                                            <ArrowUpRight className="w-4 h-4" />
                                            Open Full Preview
                                        </span>
                                    </div>
                                </a>

                                {/* Download Button — centered, theme green */}
                                <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                                    <a
                                        href="/pdf/AI Agent CASEBOOK — Frostrek LLP (2).pdf"
                                        download
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D6A4F] text-white text-sm font-semibold hover:bg-[#1B4332] hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[#2D6A4F]/25"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Full PDF
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* LLM Model Casebook */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="group h-full"
                        >
                            <div className="rounded-3xl border border-[#7C3AED]/20 hover:border-[#7C3AED]/40 bg-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] hover:shadow-[#7C3AED]/10 transition-all duration-300 overflow-hidden relative" style={{ height: 560 }}>
                                {/* PDF Preview — fills entire card */}
                                <a
                                    href="/pdf/LLM Model CASEBOOK — Frostrek LLP (1).pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block absolute inset-0 cursor-pointer"
                                >
                                    <div className="pdf-iframe-wrapper w-full h-full" style={{ overflow: 'hidden', margin: 0, padding: 0 }}>
                                        <iframe
                                            src="/pdf/LLM Model CASEBOOK — Frostrek LLP (1).pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=100"
                                            style={{ width: 'calc(100% + 40px)', height: 'calc(100% + 30px)', border: 'none', display: 'block', margin: '-16px 0 0 -16px', padding: 0, overflow: 'hidden', pointerEvents: 'none' }}
                                            title="LLM Model Casebook Preview"
                                            scrolling="no"
                                        />
                                    </div>
                                    {/* Progressive blur overlay — clear at top, blurry after title */}
                                    <div className="absolute inset-0 pointer-events-none" style={{
                                        background: 'linear-gradient(to bottom, transparent 45%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0.5) 85%, rgba(255,255,255,0.7) 100%)',
                                    }} />
                                    <div className="absolute inset-0 pointer-events-none" style={{
                                        maskImage: 'linear-gradient(to bottom, transparent 45%, black 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 45%, black 100%)',
                                        backdropFilter: 'blur(2px)',
                                    }} />
                                    <div className="absolute inset-0 pointer-events-none" style={{
                                        maskImage: 'linear-gradient(to bottom, transparent 65%, black 100%)',
                                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 65%, black 100%)',
                                        backdropFilter: 'blur(4px)',
                                    }} />
                                    {/* Hover overlay with preview icon */}
                                    <div className="absolute inset-0 bg-[#7C3AED]/0 group-hover:bg-[#7C3AED]/10 transition-colors duration-300 flex items-center justify-center">
                                        <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 bg-white/90 backdrop-blur-sm text-[#7C3AED] font-bold text-sm px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
                                            <ArrowUpRight className="w-4 h-4" />
                                            Open Full Preview
                                        </span>
                                    </div>
                                </a>

                                {/* Download Button — centered, theme green */}
                                <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
                                    <a
                                        href="/pdf/LLM Model CASEBOOK — Frostrek LLP (1).pdf"
                                        download
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D6A4F] text-white text-sm font-semibold hover:bg-[#1B4332] hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-[#2D6A4F]/25"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Full PDF
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

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
                            className="rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] bg-white border border-[#2D6A4F]/10 relative overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedStudy(null)}
                                className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-[#E8F5EE] text-[#2D6A4F] hover:scale-105 transition-all duration-200 z-20 cursor-pointer"
                            >
                                <X size={18} />
                            </button>

                            <div className="overflow-y-auto overscroll-contain p-8 md:p-12 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
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
                                        <div className="text-[12px] font-bold mb-1 text-black uppercase font-body">Client Type</div>
                                        <div className="text-sm text-gray-600">{selectedStudy.client}</div>
                                    </div>
                                    <div>
                                        <div className="text-[12px] font-bold mb-1 text-black uppercase font-body">Duration</div>
                                        <div className="text-sm text-gray-600">{selectedStudy.duration}</div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="text-[12px] font-bold mb-1 text-black uppercase font-body">Project Team</div>
                                        <div className="text-sm text-gray-600">{selectedStudy.team}</div>
                                    </div>
                                </div>

                                <div className="space-y-8 leading-relaxed text-slate-600 font-body text-base md:text-lg">
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


        </div>
    );
};

export default ResourcesPage;
