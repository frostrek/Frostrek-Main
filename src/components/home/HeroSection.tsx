import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bot, Database, PhoneCall, Cpu, Network, Server } from 'lucide-react';
import FlipText from '../ui/FlipText';
import SplitTextReveal from '../ui/SplitTextReveal';

const floatingIcons = [
  { id: 1, top: '20%', left: '15%', icon: Bot, color: 'text-blue-500', bg: 'bg-blue-50/80', border: 'border-blue-100', shadow: 'shadow-blue-500/20', delay: 0 },
  { id: 2, top: '25%', left: '80%', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-50/80', border: 'border-emerald-100', shadow: 'shadow-emerald-500/20', delay: 1 },
  { id: 3, top: '45%', left: '10%', icon: Network, color: 'text-purple-500', bg: 'bg-purple-50/80', border: 'border-purple-100', shadow: 'shadow-purple-500/20', delay: 2 },
  { id: 4, top: '65%', left: '85%', icon: PhoneCall, color: 'text-orange-500', bg: 'bg-orange-50/80', border: 'border-orange-100', shadow: 'shadow-orange-500/20', delay: 0.5 },
  { id: 5, top: '75%', left: '20%', icon: Cpu, color: 'text-rose-500', bg: 'bg-rose-50/80', border: 'border-rose-100', shadow: 'shadow-rose-500/20', delay: 1.5 },
  { id: 6, top: '85%', left: '70%', icon: Server, color: 'text-indigo-500', bg: 'bg-indigo-50/80', border: 'border-indigo-100', shadow: 'shadow-indigo-500/20', delay: 2.5 },
];

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-brand-light-bg text-[#1f3e30] pt-32 pb-20 font-sans">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vw] rounded-[100%] bg-gradient-to-r from-purple-50/40 via-red-50/40 to-blue-50/40 blur-[80px] opacity-70" />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute hidden md:flex items-center justify-center rounded-2xl shadow-lg w-14 h-14 lg:w-16 lg:h-16 border backdrop-blur-sm z-0 ${item.bg} ${item.border} ${item.shadow}`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay
          }}
        >
          <item.icon className={`w-6 h-6 lg:w-7 lg:h-7 relative z-10 ${item.color}`} strokeWidth={1.5} />
        </motion.div>
      ))}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text text-sm font-bold tracking-wide mb-8 border border-[#c4e0d4]/50"
        >
          <span className="text-lg leading-none">✨</span> AI WORKFLOWS THAT SCALE
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
                Support Workflows
            </SplitTextReveal>
            <SplitTextReveal
                as="h1"
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] tracking-[-0.01em] whitespace-nowrap"
                trigger="load"
                type="chars"
                stagger={0.03}
                delay={0.4}
            >
                Built to Scale
            </SplitTextReveal>
            <SplitTextReveal
                as="h1"
                className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D6A4F] mb-6 leading-[1.1] tracking-[-0.01em] whitespace-nowrap"
                trigger="load"
                type="chars"
                stagger={0.03}
                delay={0.7}
            >
                How Your Business Works
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
            Deploy autonomous AI agents that handle complex business processes and scale with your growth.
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
