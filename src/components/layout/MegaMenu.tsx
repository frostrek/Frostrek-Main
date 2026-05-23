import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

import {
    Bot, Mic, MessageSquare, Database, BarChart,
    ShoppingCart, Headset, Server, TrendingUp,
    Linkedin, Users, Trophy, Factory,
    Mail, FileText, Share2, Globe, PenTool, Search, UserPlus, Brain, ArrowRight,
    Shield, ShoppingBag, Layers
} from 'lucide-react';

const iconMap: Record<string, React.FC<any>> = {
    Bot, Mic, MessageSquare, Database, BarChart,
    ShoppingCart, Headset, Server, TrendingUp,
    Linkedin, Users, Trophy, Factory,
    Mail, FileText, Share2, Globe, PenTool, Search, UserPlus, Brain,
    Shield, ShoppingBag, Layers
};

interface SubItem { name: string; href: string; desc: string; icon?: string; }
interface Section { title: string; items: SubItem[]; }
interface MegaMenuProps { sections: Section[]; onClose?: () => void; }

const MegaMenu: React.FC<MegaMenuProps> = ({ sections, onClose }) => {
    // Layout: 2 cols for ≤2 sections, 3 cols for 3+
    const cols =
        sections.length >= 3 ? 'grid-cols-3' :
        sections.length === 2 ? 'grid-cols-2' :
        'grid-cols-1';

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.99 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full relative group/menu"
        >
            {/* Caret with subtle glow */}
            <div className="flex justify-center -mb-px relative z-10">
                <div className="w-3 h-3 rotate-45 bg-white border-l border-t border-gray-100 rounded-sm" />
            </div>

            <div 
                className="bg-white border border-gray-100/60 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col ring-1 ring-black/[0.02]"
                style={{ maxHeight: 'min(85vh, 850px)' }}
            >
                {/* Top decorative accent bar */}
                <div className="h-1.5 w-full flex-shrink-0 bg-gradient-to-r from-transparent via-[#2D6A4F]/10 to-transparent opacity-40" />

                {/* Custom Scrollable Content - Increased padding for "Elegance" */}
                <div 
                    className="p-10 md:p-12 overflow-y-auto flex-1 custom-scrollbar scroll-smooth overscroll-contain"
                    onWheel={(e) => e.stopPropagation()}
                >
                    <div className={cn("grid gap-x-16 gap-y-12", cols)}>
                        {sections.map((section, idx) => {
                            const numberMatch = section.title.match(/^(\d+)\s+(.+)$/);
                            const displayNum = numberMatch ? numberMatch[1] : `0${idx + 1}`;
                            const displayTitle = numberMatch ? numberMatch[2] : section.title;

                            return (
                                <motion.div 
                                    key={idx} 
                                    className="space-y-8"
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                                >
                                    {/* Section header with high-end typography */}
                                    <div className="flex items-center gap-4 group/title">
                                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#E8F5EE] text-[#2D6A4F] text-[11px] font-black font-serif shadow-sm group-hover/title:scale-110 group-hover/title:bg-[#2D6A4F] group-hover/title:text-white transition-all duration-500">
                                            {displayNum}
                                        </div>
                                        <h3 className="text-[12px] font-bold text-[#2D6A4F]/70 uppercase tracking-[0.2em] font-body relative">
                                            {displayTitle}
                                            <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-[#2D6A4F]/20 transition-all duration-500 group-hover/title:w-full" />
                                        </h3>
                                    </div>

                                    <div className="space-y-3">
                                        {section.items.map((item, itemIdx) => {
                                            const Icon = item.icon ? iconMap[item.icon] : Bot;
                                            return (
                                                <Link
                                                    key={itemIdx}
                                                    to={item.href}
                                                    onClick={onClose}
                                                    className="group flex items-center gap-5 p-4.5 rounded-[1.5rem] transition-all duration-500 hover:bg-[#F4FAF7] hover:translate-x-1 relative overflow-hidden active:scale-[0.98]"
                                                >
                                                    {/* Subtle icon container */}
                                                    <div className="relative z-10 p-3.5 rounded-2xl bg-white shadow-sm border border-gray-100 text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white group-hover:shadow-lg group-hover:shadow-[#2D6A4F]/20 transition-all duration-500 shrink-0">
                                                        <Icon size={20} />
                                                    </div>

                                                    <div className="relative z-10 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-bold text-[15px] text-gray-900 group-hover:text-[#2D6A4F] transition-colors font-body">
                                                                {item.name}
                                                            </h4>
                                                            <ArrowRight size={14} className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#2D6A4F]" />
                                                        </div>
                                                        <p className="text-[13px] text-slate-500/80 mt-1 leading-relaxed font-body line-clamp-1 group-hover:text-slate-600 transition-colors">
                                                            {item.desc}
                                                        </p>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E8F5EE;
                    border-radius: 20px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background: #C8E6DA;
                }
            `}} />
        </motion.div>
    );
};

export default MegaMenu;
