import { useRef } from 'react';
import { Globe, FileUp, Database, Settings, Upload, CheckCircle2, RefreshCw, Link as LinkIcon } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SpotlightCard from '../ui/SpotlightCard';
import SplitTextReveal from '../ui/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const KnowledgeTraining = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Card entrance stagger
            const cards = gridRef.current?.querySelectorAll('.knowledge-card');
            if (cards) {
                gsap.fromTo(cards,
                    { y: 60, opacity: 0, scale: 0.95 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }

            // Status items entrance
            const statusItems = statusRef.current?.querySelectorAll('.status-item');
            if (statusItems) {
                gsap.fromTo(statusItems,
                    { x: -30, opacity: 0 },
                    {
                        x: 0, opacity: 1,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: statusRef.current,
                            start: 'top 90%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-[#F9FBFA]/80 border-t border-[#2D6A4F]/10 font-body">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">

                <div className="flex flex-col items-center text-center mb-16">
                    <SplitTextReveal
                        as="h2"
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                        type="chars"
                        stagger={0.02}
                        once={false}
                    >
                        Knowledge Training
                    </SplitTextReveal>
                    <SplitTextReveal
                        as="p"
                        className="max-w-2xl mx-auto text-lg text-gray-500 font-medium mt-4"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        Connect your data sources in seconds to ground Frosty in your business logic.
                    </SplitTextReveal>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(45,106,79,0.04)] border border-[#E6EFE6] p-6 md:p-10">
                    {/* 3 Column Grid */}
                    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                        {/* Source 1: Website URLs */}
                        <SpotlightCard
                            className="knowledge-card group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)] hover:-translate-y-1"
                            spotlightColor="rgba(30, 59, 50, 0.03)"
                        >
                            <div className="flex flex-col items-center h-full relative z-10">
                                <div className="mb-4 w-16 h-16 rounded-2xl border flex items-center justify-center bg-brand-badge-bg border-[#c4e0d4]/50 transition-transform duration-300 group-hover:scale-110 shadow-sm relative">
                                    <Globe className="text-[#2D6A4F]" size={28} strokeWidth={1.5} />
                                    <div className="absolute -bottom-1.5 -right-1.5 bg-white rounded-full p-0.5 border border-[#E6EFE6]">
                                        <LinkIcon className="w-3.5 h-3.5 text-[#2D6A4F]" />
                                    </div>
                                </div>
                                <h3 className="font-serif text-lg font-bold text-[#2D6A4F] mb-2">Website URLs</h3>
                                <p className="text-xs text-gray-500 text-center mb-6 flex-grow font-medium">Enter URLs to sync your site content and knowledge base in real-time.</p>

                                <div className="space-y-3 w-full mt-auto">
                                    <button className="w-full bg-[#2D6A4F] text-white rounded-xl py-2.5 text-sm font-bold transition-colors hover:bg-[#1B4332]">Source Added</button>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Source 2: File Uploads */}
                        <SpotlightCard
                            className="knowledge-card group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)] hover:-translate-y-1"
                            spotlightColor="rgba(30, 59, 50, 0.03)"
                        >
                            <div className="flex flex-col items-center h-full relative z-10">
                                <div className="mb-4 w-16 h-16 rounded-2xl border flex items-center justify-center bg-brand-badge-bg border-[#c4e0d4]/50 transition-transform duration-300 group-hover:scale-110 shadow-sm relative">
                                    <FileUp className="text-[#2D6A4F]" size={28} strokeWidth={1.5} />
                                    <div className="absolute -bottom-1.5 -right-1.5 bg-[#2D6A4F] rounded-full p-0.5 border border-white">
                                        <Upload className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <h3 className="font-serif text-lg font-bold text-[#2D6A4F] mb-2">File Uploads</h3>
                                <p className="text-xs text-gray-500 text-center mb-6 flex-grow font-medium">Upload PDFs, DOCXs, and other text documents.</p>

                                <div className="space-y-3 w-full mt-auto">
                                    <button className="w-full bg-[#F4F9F6] text-[#2D6A4F] border border-[#E6EFE6] rounded-xl py-2.5 text-sm font-bold transition-colors hover:bg-[#E8F5EE]">Add Source</button>
                                </div>
                            </div>
                        </SpotlightCard>

                        {/* Source 3: Database Connection */}
                        <SpotlightCard
                            className="knowledge-card group relative overflow-hidden rounded-[2rem] border p-6 transition-all duration-300 bg-white border-[#E6EFE6] hover:border-[#2D6A4F]/30 hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)] hover:-translate-y-1"
                            spotlightColor="rgba(30, 59, 50, 0.03)"
                        >
                            <div className="flex flex-col items-center h-full relative z-10">
                                <div className="mb-4 w-16 h-16 rounded-2xl border flex items-center justify-center bg-brand-badge-bg border-[#c4e0d4]/50 transition-transform duration-300 group-hover:scale-110 shadow-sm relative">
                                    <Database className="text-[#2D6A4F]" size={28} strokeWidth={1.5} />
                                    <div className="absolute -bottom-1.5 -right-1.5 bg-white rounded-full p-0.5 border border-[#E6EFE6]">
                                        <Settings className="w-3.5 h-3.5 text-[#2D6A4F]" />
                                    </div>
                                </div>
                                <h3 className="font-serif text-lg font-bold text-[#2D6A4F] mb-2">Database Connection</h3>
                                <p className="text-xs text-gray-500 text-center mb-6 flex-grow font-medium">Integrate with SQL databases and internal APIs.</p>

                                <div className="space-y-3 w-full mt-auto">
                                    <button className="w-full bg-[#F4F9F6] text-[#2D6A4F] border border-[#E6EFE6] rounded-xl py-2.5 text-sm font-bold transition-colors hover:bg-[#E8F5EE]">Add Source</button>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>

                    {/* Status List */}
                    <div ref={statusRef} className="space-y-3 mb-8">
                        <div className="status-item flex items-center justify-between py-2.5 border-b border-[#E6EFE6]">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                <Globe className="w-4 h-4 text-[#2D6A4F]/60" /> www.vedashi.com/faq
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5EE] border border-[#c4e0d4]/50 text-[#2D6A4F]">
                                <CheckCircle2 className="w-3 h-3" /> Synced
                            </span>
                        </div>
                        <div className="status-item flex items-center justify-between py-2.5 border-b border-[#E6EFE6]">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                <FileUp className="w-4 h-4 text-[#2D6A4F]/60" /> policy_manual.pdf
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-50 border border-gray-200 text-gray-500">
                                <RefreshCw className="w-3 h-3 animate-spin" /> Processing
                            </span>
                        </div>
                        <div className="status-item flex items-center justify-between py-2.5 border-b border-[#E6EFE6]">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                <FileUp className="w-4 h-4 text-[#2D6A4F]/60" /> product_catalog.pdf
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-50 border border-gray-200 text-gray-500">
                                <RefreshCw className="w-3 h-3 animate-spin" /> Processing
                            </span>
                        </div>
                    </div>

                    {/* Grounding Action */}
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full py-4 rounded-2xl bg-[#2D6A4F] text-white font-bold text-base shadow-lg shadow-[#2D6A4F]/10 flex items-center justify-center gap-2 transition-colors hover:bg-[#1B4332]"
                    >
                        Ground with Frosty
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default KnowledgeTraining;
