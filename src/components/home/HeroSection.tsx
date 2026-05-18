import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, Database, PhoneCall, Cpu, Wallet, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import FlipText from '../ui/FlipText';
import SplitTextReveal from '../ui/SplitTextReveal';

interface FloatingIconItem {
  id: number;
  top: string;
  left: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
  shadow: string;
  delay: number;
  title: string;
  tagline: string;
  desc: string;
  badge: string;
  link: string;
}

const floatingIcons: FloatingIconItem[] = [
  { 
    id: 1, 
    top: '20%', 
    left: '15%', 
    icon: Bot, 
    color: 'text-blue-500', 
    bg: 'bg-blue-50/80', 
    border: 'border-blue-100', 
    shadow: 'shadow-blue-500/20', 
    delay: 0,
    title: "Conversational AI Agents",
    tagline: "Intelligent support & sales",
    desc: "Deploy autonomous conversational agents that master complex intent, adapt to brand voice, and automate 24/7 customer workflows.",
    badge: "98% Accuracy",
    link: "/products/frosty-ai"
  },
  { 
    id: 2, 
    top: '25%', 
    left: '80%', 
    icon: Database, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-50/80', 
    border: 'border-emerald-100', 
    shadow: 'shadow-emerald-500/20', 
    delay: 1,
    title: "Enterprise Integrations",
    tagline: "Automate system pipelines",
    desc: "Unify external data pipelines across ERP, CRM, and bespoke operational platforms dynamically in real-time.",
    badge: "Low Latency",
    link: "/solutions"
  },
  { 
    id: 3, 
    top: '45%', 
    left: '10%', 
    icon: Wallet, 
    color: 'text-purple-500', 
    bg: 'bg-purple-50/80', 
    border: 'border-purple-100', 
    shadow: 'shadow-purple-500/20', 
    delay: 2,
    title: "Fintech & Custom Wallets",
    tagline: "Save commissions with closed-loop loyalty",
    desc: "A centralized, closed-loop digital currency engineered specifically for sports fans and affiliated clubs. Functioning as a next-generation digital loyalty programme to completely save on commissions.",
    badge: "Save Commissions",
    link: "/products/frostrek-web3-commerce"
  },
  { 
    id: 4, 
    top: '65%', 
    left: '85%', 
    icon: PhoneCall, 
    color: 'text-orange-500', 
    bg: 'bg-orange-50/80', 
    border: 'border-orange-100', 
    shadow: 'shadow-orange-500/20', 
    delay: 0.5,
    title: "Conversational Voice AI",
    tagline: "Sub-200ms spoken responses",
    desc: "Ultra-low latency spoken voice bots engineered with natural text-to-speech modules for automated booking and inbound dispatch.",
    badge: "Natural Voice",
    link: "/products/voice-ai"
  },
  { 
    id: 5, 
    top: '75%', 
    left: '20%', 
    icon: Cpu, 
    color: 'text-rose-500', 
    bg: 'bg-rose-50/80', 
    border: 'border-rose-100', 
    shadow: 'shadow-rose-500/20', 
    delay: 1.5,
    title: "Manufacturing Intelligence",
    tagline: "Unified factory floor screen",
    desc: "Connect machine PLC nodes, SCADA, ERP, and WMS streams directly to boost OEE performance and simplify handover logs.",
    badge: "Manufacturing",
    link: "/products/frostrek-manufacturing-os"
  },
  { 
    id: 6, 
    top: '85%', 
    left: '70%', 
    icon: LayoutDashboard, 
    color: 'text-indigo-500', 
    bg: 'bg-indigo-50/80', 
    border: 'border-indigo-100', 
    shadow: 'shadow-indigo-500/20', 
    delay: 2.5,
    title: "Multivendor Dashboard",
    tagline: "Unified e-commerce panel",
    desc: "Consolidate sales performance and analytics across global marketplaces including Amazon, Shopify, WooCommerce, and eBay instantly.",
    badge: "E-Commerce",
    link: "/products/multivendor-dashboard"
  },
];

const HeroSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-brand-light-bg text-[#1f3e30] pt-32 pb-20 font-sans">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vw] rounded-[100%] bg-gradient-to-r from-purple-50/40 via-red-50/40 to-blue-50/40 blur-[80px] opacity-70" />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item) => {
        const isHovered = hoveredId === item.id;
        const xDirection = parseFloat(item.left) > 50 ? 10 : -10;

        return (
          <motion.div
            key={item.id}
            className={`absolute hidden md:flex items-center justify-center rounded-2xl shadow-lg w-14 h-14 lg:w-16 lg:h-16 border backdrop-blur-sm z-30 cursor-pointer ${item.bg} ${item.border} ${item.shadow}`}
            style={{ top: item.top, left: item.left }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            animate={{
              y: isHovered ? -10 : [0, -20, 0],
            }}
            transition={{
              y: isHovered 
                ? { duration: 0.2, ease: "easeOut" }
                : { duration: 5, repeat: Infinity, ease: "easeInOut", delay: item.delay }
            }}
          >
            <item.icon className={`w-6 h-6 lg:w-7 lg:h-7 relative z-10 ${item.color}`} strokeWidth={1.5} />

            {/* Premium Solution Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: xDirection }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: xDirection }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`absolute p-5 w-80 rounded-2xl bg-white border border-[#2D6A4F]/15 shadow-[0_20px_50px_rgba(45,106,79,0.15)] backdrop-blur-md pointer-events-auto text-left z-[100]
                    ${parseFloat(item.left) > 50 ? 'right-full mr-4' : 'left-full ml-4'}
                    ${parseFloat(item.top) > 70 ? 'bottom-0' : 'top-1/2 -translate-y-1/2'}`}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#2D6A4F] px-2 py-0.5 rounded bg-[#E8F5EE] border border-[#2D6A4F]/10">
                      {item.badge}
                    </span>
                    <Link to={item.link} className="text-gray-400 hover:text-[#2D6A4F] transition-colors">
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  <h4 className="font-serif font-black text-slate-900 text-[14px] leading-tight mb-0.5">{item.title}</h4>
                  <p className="text-[11px] font-bold text-[#2D6A4F] mb-2">{item.tagline}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mb-3">{item.desc}</p>
                  <Link to={item.link} className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2D6A4F] hover:underline">
                    Explore Solution
                    <ArrowUpRight size={12} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text text-sm font-bold tracking-wide mb-8 border border-[#c4e0d4]/50"
        >
          <span className="text-lg leading-none"></span> ENTERPRISE AI · GURUGRAM, INDIA
        </motion.div>

        {/* Heading */}
        <div className="flex flex-col items-center">
          <SplitTextReveal
            as="h1"
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] tracking-[-0.01em] whitespace-nowrap"
            trigger="load"
            type="chars"
            stagger={0.03}
          >
            Intelligent agents
          </SplitTextReveal>
          <SplitTextReveal
            as="h1"
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] tracking-[-0.01em] whitespace-nowrap"
            trigger="load"
            type="chars"
            stagger={0.03}
            delay={0.4}
          >
            that run your operations.
          </SplitTextReveal>
          <SplitTextReveal
            as="h1"
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] mb-6 leading-[1.1] tracking-[-0.01em] whitespace-nowrap"
            trigger="load"
            type="chars"
            stagger={0.03}
            delay={0.7}
          >
            Not just assist them.
          </SplitTextReveal>
        </div>

        {/* Subtitle */}
        <SplitTextReveal
          as="p"
          className="text-lg md:text-[1.3rem] text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          type="words"
          stagger={0.02}
          delay={0.5}
        >
          Frostrek AI deploys autonomous AI agents across manufacturing, support, and sales — serving 40+ enterprise clients across India, USA, and the UK with sub-200ms response times.
        </SplitTextReveal>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            to="/schedule-demo"
            className="group w-full sm:w-auto px-10 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium tracking-wide hover:bg-[#1B4332] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#2D6A4F]/10 active:translate-y-0.5"
          >
            <FlipText hoverColor="text-white">
              BOOK A DEMO <span className="text-xl font-light">→</span>
            </FlipText>
          </Link>
          <Link
            to="/solutions"
            className="group w-full sm:w-auto px-10 py-4 rounded-xl border-2 border-gray-100 bg-white text-[#2D6A4F] font-medium tracking-wide hover:border-[#2D6A4F] hover:bg-gray-50 transition-all duration-300 shadow-sm active:translate-y-0.5"
          >
            <FlipText>
              EXPLORE SOLUTIONS
            </FlipText>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full h-[12vh] bg-gradient-to-t from-orange-600/90 via-red-500/50 to-transparent blur-3xl pointer-events-none -z-10" />
    </section>
  );
};

export default HeroSection;
