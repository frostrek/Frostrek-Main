import { FluidBackground } from '../ui/FluidBackground';
import { InteractiveMobileMockup } from '../ui/InteractiveMobileMockup';


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
    icon: "/icons/machine-learning-green.webp",
    color: 'text-blue-500',
    bg: 'bg-blue-50/80',
    border: 'border-blue-100',
    shadow: 'shadow-blue-500/20',
    delay: 0,
    title: "Conversational AI Agents",
    tagline: "Intelligent support & sales",
    desc: "Deploy autonomous conversational agents that master complex intent, adapt to brand voice, and automate 24/7 customer workflows.",
    badge: "98% Accuracy",
    link: "/products/frosty-agent"
  },
  {
    id: 2,
    top: '20%',
    left: '85%',
    icon: "/icons/ai-green.webp",
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

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-brand-light-bg text-[#1f3e30] pt-16 lg:pt-20 pb-6 font-sans overflow-x-clip overflow-y-hidden">
      <FluidBackground />
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vw] rounded-[100%] bg-gradient-to-r from-purple-50/40 via-red-50/40 to-blue-50/40 blur-[80px] opacity-70" />
      </div>


      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center flex-1 justify-center pointer-events-none">
        {/* Badge
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text text-sm font-bold tracking-wide mb-8 border border-[#c4e0d4]/50"
        >
          <span className="text-lg leading-none"></span> ENTERPRISE AI · GURUGRAM, INDIA
        </motion.div> */}

        {/* Main Hero Content - Split Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-8">
          {/* Left Side: Heading */}
          <div className="flex flex-col items-start text-left lg:w-[55%] shrink-0 hero-fade-in pointer-events-none">
            <h1 className="text-6xl sm:text-7xl md:text-[80px] lg:text-[75px] xl:text-[100px] leading-[0.95] drop-shadow-[0_4px_10px_rgba(255,255,255,1)] [text-shadow:_0_0_20px_#ffffff,_0_0_40px_#ffffff] uppercase tracking-normal text-black" style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400 }}>
              <span className="block relative z-10 mb-2">TIME IS MONEY.</span>
              <span className="block relative z-10" style={{ animationDelay: '0.1s' }}>SAVE BOTH.</span>
            </h1>

            <p className="mt-6 md:mt-8 text-gray-800 text-lg md:text-[22px] max-w-lg leading-relaxed relative z-10 font-medium [text-shadow:_0_0_10px_#ffffff,_0_0_20px_#ffffff]" style={{ animationDelay: '0.2s', fontFamily: "'Quicksand', sans-serif" }}>
              Your AI workforce never sleeps—handling repetitive tasks, accelerating operations, and reducing dependency on manual processes.
            </p>
          </div>

          {/* Right Side: Mobile Mockup */}
          <div className="lg:w-[45%] flex items-center justify-center lg:justify-end hero-fade-in shrink-0 z-20 relative" style={{ animationDelay: '0.2s' }}>
            <div className="lg:-translate-x-20 lg:translate-y-4">
              <InteractiveMobileMockup />
            </div>
          </div>
        </div>


        {/* Mobile Features Marquee (Hidden on Desktop) */}
        <div className="w-[100vw] max-w-[100vw] shrink-0 mt-10 sm:mt-12 lg:hidden hero-fade-in overflow-hidden anim-delay-400">
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes mobile-marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-mobile-marquee {
              animation: mobile-marquee 30s linear infinite;
              will-change: transform;
            }
            .animate-mobile-marquee:active {
              animation-play-state: paused;
            }
          `}} />
          <div className="flex w-max animate-mobile-marquee gap-3 pb-4 pt-2">
            {[...floatingIcons, ...floatingIcons].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="shrink-0 flex items-center gap-3 bg-white/90 backdrop-blur-md border border-[#2D6A4F]/10 p-2 pr-5 rounded-full shadow-[0_8px_20px_rgba(45,106,79,0.06)]"
              >
                <img src={item.icon} alt={item.title} className="w-9 h-9 p-2 rounded-full bg-white shadow-sm border border-gray-50 object-contain shrink-0" loading="lazy" />
                <span className="text-[12px] font-bold text-[#1f3e30] whitespace-nowrap tracking-wide">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

      </div>




      {/* Frostrek Green Circle at very corner (1/4 visible) */}
      <div className="absolute -bottom-[450px] -right-[400px] w-[800px] h-[800px] lg:-bottom-[700px] lg:-right-[600px] lg:w-[1200px] lg:h-[1200px] rounded-full bg-[#347858] z-0" />

      <div className="absolute bottom-0 w-full h-[12vh] bg-gradient-to-t from-orange-600/90 via-red-500/50 to-transparent blur-3xl pointer-events-none -z-10" />
    </section>
  );
};

export default HeroSection;
