import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import FlipText from '../ui/FlipText';

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
    icon: "/icons/machine-learning-green.png",
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
    top: '20%',
    left: '85%',
    icon: "/icons/ai-green.png",
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
    icon: "/optimized/innovation-green.webp",
    color: 'text-amber-600',
    bg: 'bg-amber-50/90',
    border: 'border-amber-200/60',
    shadow: 'shadow-amber-500/25',
    delay: 2,
    title: "LLM Fine-Tuning & Model Training",
    tagline: "From generic to genuinely useful",
    desc: "We train and align custom foundation models that are actually ready for production. Backed by a managed workforce for expert data services.",
    badge: "Specialized AI",
    link: "/solutions/llm-model-training"
  },

  {
    id: 4,
    top: '75%',
    left: '20%',
    icon: "/icons/manufacturing-green.png",
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
    id: 5,
    top: '75%',
    left: '80%',
    icon: "/icons/multivendor-green.png",
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
  {
    id: 7,
    top: '0%', left: '0%',
    icon: "/icons/chat-green.png",
    color: 'text-teal-500',
    bg: 'bg-teal-50/80',
    border: 'border-teal-100',
    shadow: 'shadow-teal-500/20',
    delay: 3,
    title: "Support Automation",
    tagline: "24/7 intelligent ticketing",
    desc: "Automate tier-1 and tier-2 support queries instantly with AI that learns from your documentation and past tickets.",
    badge: "Always On",
    link: "/solutions"
  },
  {
    id: 8,
    top: '0%', left: '0%',
    icon: "/icons/architecture-green.png",
    color: 'text-cyan-500',
    bg: 'bg-cyan-50/80',
    border: 'border-cyan-100',
    shadow: 'shadow-cyan-500/20',
    delay: 4,
    title: "Workflow Automation",
    tagline: "Streamline cross-app tasks",
    desc: "Connect disconnected systems and trigger complex, multi-step actions using natural language or predefined logic.",
    badge: "Efficiency",
    link: "/solutions"
  },
  {
    id: 9,
    top: '0%', left: '0%',
    icon: "/icons/data-analytics-green.png",
    color: 'text-amber-500',
    bg: 'bg-amber-50/80',
    border: 'border-amber-100',
    shadow: 'shadow-amber-500/20',
    delay: 5,
    title: "Data Annotation",
    tagline: "High-quality training data",
    desc: "Prepare and annotate enterprise datasets accurately to build robust foundations for custom LLM training and fine-tuning.",
    badge: "Data Prep",
    link: "/solutions"
  },
  {
    id: 10,
    top: '0%', left: '0%',
    icon: "/icons/innovation-green.png",
    color: 'text-fuchsia-500',
    bg: 'bg-fuchsia-50/80',
    border: 'border-fuchsia-100',
    shadow: 'shadow-fuchsia-500/20',
    delay: 6,
    title: "RLHF / Human Feedback",
    tagline: "Expert human alignment",
    desc: "Refine model behavior with domain experts providing Reinforcement Learning from Human Feedback to ensure safety and accuracy.",
    badge: "Alignment",
    link: "/solutions"
  },
  {
    id: 11,
    top: '0%', left: '0%',
    icon: "/icons/valuation-green.png",
    color: 'text-sky-500',
    bg: 'bg-sky-50/80',
    border: 'border-sky-100',
    shadow: 'shadow-sky-500/20',
    delay: 7,
    title: "Model Evaluation",
    tagline: "Continuous performance monitoring",
    desc: "Rigorously benchmark and evaluate AI models against key metrics to guarantee reliable outputs in production environments.",
    badge: "Benchmarking",
    link: "/solutions"
  }
];

const HeroSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center bg-brand-light-bg text-[#1f3e30] pt-16 lg:pt-20 pb-6 font-sans overflow-x-clip">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vw] rounded-[100%] bg-gradient-to-r from-purple-50/40 via-red-50/40 to-blue-50/40 blur-[80px] opacity-70" />
      </div>

      {/* Left Icons Column */}
      <div className="absolute hidden lg:flex flex-col gap-8 left-6 lg:left-10 xl:left-20 2xl:left-40 top-[50%] -translate-y-1/2 z-40">
        {floatingIcons.filter(item => [1, 3, 5, 7, 8].includes(item.id)).map((item) => {
          const isHovered = hoveredId === item.id;
          return (
            <div key={item.id} className="relative flex items-center gap-4 group cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}>
              <div
                className={`relative flex items-center justify-center rounded-2xl shadow-md w-10 h-10 lg:w-12 lg:h-12 border border-gray-100 bg-white backdrop-blur-sm transition-all duration-300 ${isHovered ? 'shadow-lg scale-105' : ''}`}
              >
                <img src={item.icon} alt={item.title} className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 object-contain" width={24} height={24} loading="lazy" />
              </div>
              <span className="text-xs font-semibold text-gray-500 max-w-[130px] leading-snug">
                {item.title}
              </span>

              {/* Premium Solution Tooltip — CSS transition */}
              {isHovered && (
                <div
                  className="absolute left-full ml-4 p-5 w-80 rounded-2xl bg-white border border-[#2D6A4F]/15 shadow-[0_20px_50px_rgba(45,106,79,0.15)] backdrop-blur-md pointer-events-auto text-left z-[100] top-1/2 -translate-y-1/2 animate-fade-in"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-wide text-[#2D6A4F] px-2 py-0.5 rounded bg-[#E8F5EE] border border-[#2D6A4F]/10">
                      {item.badge}
                    </span>
                    <Link to={item.link} aria-label={`Explore ${item.title}`} className="text-gray-400 hover:text-[#2D6A4F] transition-colors">
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  <h3 className="font-serif font-black text-slate-900 text-[14px] leading-tight mb-0.5">{item.title}</h3>
                  <p className="text-[11px] font-bold text-[#2D6A4F] mb-2">{item.tagline}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mb-3">{item.desc}</p>
                  <Link to={item.link} className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2D6A4F] hover:underline">
                    Explore Solution
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right Icons Column */}
      <div className="absolute hidden lg:flex flex-col gap-8 right-6 lg:right-10 xl:right-20 2xl:right-40 top-[50%] -translate-y-1/2 z-40">
        {floatingIcons.filter(item => [2, 4, 6, 9, 10, 11].includes(item.id)).map((item) => {
          const isHovered = hoveredId === item.id;
          return (
            <div key={item.id} className="relative flex items-center flex-row-reverse gap-4 group cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}>
              <div
                className={`relative flex items-center justify-center rounded-2xl shadow-md w-10 h-10 lg:w-12 lg:h-12 border border-gray-100 bg-white backdrop-blur-sm transition-all duration-300 ${isHovered ? 'shadow-lg scale-105' : ''}`}
              >
                <img src={item.icon} alt={item.title} className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 object-contain" width={24} height={24} loading="lazy" />
              </div>
              <span className="text-xs font-semibold text-gray-500 max-w-[130px] leading-snug text-right">
                {item.title}
              </span>

              {/* Premium Solution Tooltip — CSS transition */}
              {isHovered && (
                <div
                  className="absolute right-full mr-4 p-5 w-80 rounded-2xl bg-white border border-[#2D6A4F]/15 shadow-[0_20px_50px_rgba(45,106,79,0.15)] backdrop-blur-md pointer-events-auto text-left z-[100] top-1/2 -translate-y-1/2 animate-fade-in"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-wide text-[#2D6A4F] px-2 py-0.5 rounded bg-[#E8F5EE] border border-[#2D6A4F]/10">
                      {item.badge}
                    </span>
                    <Link to={item.link} aria-label={`Explore ${item.title}`} className="text-gray-400 hover:text-[#2D6A4F] transition-colors">
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  <h3 className="font-serif font-black text-slate-900 text-[14px] leading-tight mb-0.5">{item.title}</h3>
                  <p className="text-[11px] font-bold text-[#2D6A4F] mb-2">{item.tagline}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-semibold mb-3">{item.desc}</p>
                  <Link to={item.link} className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2D6A4F] hover:underline">
                    Explore Solution
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 w-full mt-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center flex-1 justify-center ">
        {/* Badge
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text text-sm font-bold tracking-wide mb-8 border border-[#c4e0d4]/50"
        >
          <span className="text-lg leading-none"></span> ENTERPRISE AI · GURUGRAM, INDIA
        </motion.div> */}

        {/* Heading — CSS animation instead of Framer Motion for instant LCP */}
        <div className="flex flex-col items-center">
          <h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] tracking-[-0.01em] hero-fade-in"
          >
            Intelligent agents
          </h1>
          <h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] tracking-[-0.01em] hero-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            that run your operations.
          </h1>
          <h1
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black mb-4 leading-[1.1] tracking-[-0.01em] hero-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            Not just assist them.
          </h1>
        </div>

        {/* Subtitles - Answer First SEO */}
        <p
          className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed font-medium hero-fade-in text-balance"
          style={{ animationDelay: '0.2s' }}
          itemProp="description"
        >
          Frostrek AI is an enterprise AI development firm building autonomous agents and custom workflow automation. We help global enterprises across manufacturing, fintech, and e-commerce scale operations without expanding headcount. Our custom AI integrations deliver measurable cost reductions and sub-200ms response times.
        </p>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto hero-fade-in"
          style={{ animationDelay: '0.3s' }}
        >
          <Link
            to="/schedule-demo"
            className="group w-full sm:w-auto px-10 py-4 rounded-xl bg-[#2D6A4F] text-white font-medium tracking-wide hover:bg-[#1B4332] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#2D6A4F]/10 active:translate-y-0.5"
          >
            <FlipText hoverColor="text-white">
              Book a Demo <span className="text-xl font-light">→</span>
            </FlipText>
          </Link>
        </div>

      </div>

      {/* Trusted By Section */}
      <div
        className="mt-auto pt-4 md:pt-6 w-[95vw] md:w-[90vw] mx-auto z-10 relative flex flex-col items-center hero-fade-in"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="w-[100%] xl:w-[100%] max-w-[1100px] bg-[#FAFCFF] rounded-2xl md:rounded-2xl py-3 md:py-4 px-4 md:px-8 lg:px-12 shadow-sm border border-[#D6E9FF] flex flex-col items-center">

          {/* Header Row */}
          <div className="flex items-center justify-center w-full mb-2 md:mb-3 gap-3 md:gap-6">
            <div className="flex-1 max-w-[60px] md:max-w-[120px] h-[2px] bg-[#D6E9FF]"></div>
            <h2 className="font-sans text-[#1A65E6] text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] text-center shrink-0">
              Trusted by Industry Leaders
            </h2>
            <div className="flex-1 max-w-[60px] md:max-w-[120px] h-[2px] bg-[#D6E9FF]"></div>
          </div>

          {/* Logos Row */}
          <div className="w-full flex flex-wrap md:flex-nowrap items-center justify-center md:justify-between gap-4 md:gap-4">
            <img src="/optimized/vedashi-logo.webp" alt="Vedashi" className="h-6 md:h-8 object-contain" width={160} height={32} loading="lazy" />
            <div className="hidden md:block w-[1px] h-6 bg-gray-200"></div>
            <img src="/optimized/clutch.webp" alt="Clutch" className="h-5 md:h-7 object-contain" width={120} height={28} loading="lazy" />
            <div className="hidden md:block w-[1px] h-6 bg-gray-200"></div>
            <img src="/optimized/topDevelopers.webp" alt="TopDevelopers" className="h-5 md:h-7 object-contain" width={120} height={28} loading="lazy" />
            <div className="hidden md:block w-[1px] h-6 bg-gray-200"></div>
            <img src="/optimized/goodfirms.webp" alt="GoodFirms" className="h-5 md:h-7 object-contain" width={120} height={28} loading="lazy" />
            <div className="hidden md:block w-[1px] h-6 bg-gray-200"></div>
            <img src="/optimized/iso.webp" alt="ISO 9001" className="h-7 md:h-10 object-contain" width={80} height={40} loading="lazy" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full h-[12vh] bg-gradient-to-t from-orange-600/90 via-red-500/50 to-transparent blur-3xl pointer-events-none -z-10" />
    </section>
  );
};

export default HeroSection;
