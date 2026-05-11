import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Brain, Workflow, Server, ArrowRight, Factory, Trophy, Mic } from 'lucide-react';

const services = [
  {
    title: "Manufacturing Intelligence",
    description: "Connect every system on your production floor into a single real-time platform.",
    icon: Factory,
  },
  {
    title: "Web3 Ecosystems",
    description: "Multi-tenant Web3 e-commerce with $TOKEN crypto payments and on-chain settlement.",
    icon: Trophy,
  },
  {
    title: "AI Agents",
    description: "Build intelligent AI agents capable of independent reasoning and task execution.",
    icon: Bot,
  },
  {
    title: "Voice AI",
    description: "Low-latency voice bots for natural interactions and support calls.",
    icon: Mic,
  },
  {
    title: "Tailored AI Solutions",
    description: "Create custom-built AI systems designed to solve complex business problems with scalable architectures.",
    icon: Brain,
  },
  {
    title: "Workflow Automation",
    description: "Integrate AI into organizational processes to automate workflows and enhance efficiency.",
    icon: Workflow,
  },
  {
    title: "Platform Development",
    description: "Build production-ready applications and platforms that seamlessly embed AI into operations.",
    icon: Server,
  },
];

const OurServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [radius, setRadius] = useState(280);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setRadius(140);
        setIsMobile(true);
      } else if (window.innerWidth < 1024) {
        setRadius(220);
        setIsMobile(false);
      } else {
        setRadius(300);
        setIsMobile(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="our-services" className="relative py-24 md:py-32 font-sans overflow-hidden bg-brand-light-bg text-[#2D6A4F]">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-light-green/60 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-brand-badge-bg/60 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text text-xs md:text-sm font-bold tracking-wide mb-6 border border-[#c4e0d4]/50"
          >
            <span className="text-base md:text-lg leading-none">✨</span> OUR CAPABILITIES
          </motion.div>
          
          <motion.h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] mb-6 leading-[1.15] tracking-[-0.01em]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Transforming Business<br className="hidden md:block" /> with AI Services
          </motion.h2>
          <motion.p
            className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Cutting-edge AI services engineered for scale, reliability, and real-world impact.
          </motion.p>
        </div>

        {/* Circular Layout */}
        <div className="relative w-full max-w-[900px] mx-auto h-[450px] md:h-[700px] lg:h-[800px] flex items-center justify-center">
          
          {/* Central Logo */}
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute z-20 flex flex-col items-center justify-center w-28 h-28 md:w-40 md:h-40 rounded-full bg-white shadow-[0_10px_40px_rgba(45,106,79,0.08)] border border-[#E6EFE6]"
          >
             <img src="/logo.png" alt="Frostrek Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain mb-1 md:mb-2 brightness-0 invert-0" />
             <span className="font-serif font-bold text-[#2D6A4F] tracking-wider text-[10px] md:text-sm">FROSTREK</span>
          </motion.div>

          {/* Dotted Circles */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute rounded-full border border-dashed border-[#2D6A4F]/20" 
            style={{ width: radius * 2, height: radius * 2 }} 
          />
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute rounded-full border border-dashed border-[#2D6A4F]/10" 
            style={{ width: radius * 1.4, height: radius * 1.4 }} 
          />

          {/* Service Nodes */}
          {services.map((service, index) => {
            // Start from top (-90 deg)
            const angle = (index * (360 / services.length) - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.title}
                className="absolute z-30 flex flex-col items-center justify-center"
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5, type: "spring" }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Node Icon */}
                <div className={`relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md transition-all duration-300 cursor-pointer border-2 ${isHovered ? 'bg-[#2D6A4F] border-[#2D6A4F] text-white scale-110 shadow-xl shadow-[#2D6A4F]/20' : 'bg-white border-white text-[#2D6A4F] hover:border-[#2D6A4F]/30'}`}>
                  <service.icon className="w-5 h-5 md:w-6 md:h-6" />
                  
                  {/* Subtle pulsing ring on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 rounded-full border-2 border-[#2D6A4F] animate-ping opacity-20" />
                  )}
                </div>

                {/* Desktop Hover Panel */}
                {!isMobile && (
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[80px] w-64 bg-white p-5 rounded-2xl shadow-[0_20px_60px_rgba(45,106,79,0.12)] border border-[#E6EFE6] z-50 flex flex-col pointer-events-auto"
                        onMouseEnter={() => setHoveredIndex(index)}
                      >
                        {/* Triangle pointer */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-[#E6EFE6] rotate-45" />
                        
                        <h3 className="font-serif font-bold text-lg text-[#2D6A4F] mb-2 relative z-10 leading-tight">{service.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed mb-4 relative z-10">
                          {service.description}
                        </p>
                        <button className="flex items-center gap-2 text-sm font-bold text-[#2D6A4F] hover:text-brand-badge-text transition-colors relative z-10 group w-fit">
                          View details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
                
                {/* Always-visible Title */}
                <div className={`absolute top-full mt-2 md:mt-3 w-24 md:w-32 text-center transition-opacity duration-300 pointer-events-none ${isHovered && !isMobile ? 'opacity-0' : 'opacity-100'}`}>
                  <span className="text-[10px] md:text-sm font-semibold text-[#2D6A4F] leading-tight block bg-brand-light-bg/80 backdrop-blur-sm rounded-md py-1">
                    {service.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Mobile Fallback Service Details (shown when hovered on mobile since hover panel is disabled) */}
        {isMobile && hoveredIndex !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white p-6 rounded-2xl shadow-lg border border-[#E6EFE6] mx-auto max-w-sm text-center"
          >
            <h3 className="font-serif font-bold text-xl text-[#2D6A4F] mb-3">{services[hoveredIndex].title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">
              {services[hoveredIndex].description}
            </p>
            <button className="flex items-center justify-center gap-2 text-sm font-bold text-white bg-[#2D6A4F] px-6 py-2.5 rounded-full hover:bg-brand-badge-text transition-colors mx-auto group">
              View details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default OurServicesSection;
