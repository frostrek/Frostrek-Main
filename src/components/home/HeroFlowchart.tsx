import { useState, useEffect } from 'react';
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const ROTATING_TEXTS = [
  { part1: "Intelligent Systems", part2: "Business Works" },
  { part1: "Support Workflows", part2: "Business Works" },
];

const HeroFlowchart = () => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    const startInterval = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
      }, 3500);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (interval) clearInterval(interval);
        interval = null;
      } else {
        startInterval();
      }
    };

    startInterval();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center lg:items-start text-center lg:text-left z-30">
      {/* ── Heading ── */}
      <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-[#2D6A4F]' : 'text-primary'}`}>
        <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-x-3 md:gap-x-4 mb-2">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`p1-${index}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`whitespace-nowrap ${theme === 'dark' ? 'text-[#2D6A4F]' : 'text-[#2D6A4F]'}`}
            >
              {ROTATING_TEXTS[index].part1}
            </motion.span>
          </AnimatePresence>
          <span className="whitespace-nowrap">built to scale</span>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-x-3 md:gap-x-4">
          <span className="whitespace-nowrap">how your</span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={`p2-${index}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className={`whitespace-nowrap ${theme === 'dark' ? 'text-[#2D6A4F]' : 'text-[#2D6A4F]'}`}
            >
              {ROTATING_TEXTS[index].part2}
            </motion.span>
          </AnimatePresence>
        </div>
      </h1>
      
      <p className={`text-lg md:text-xl max-w-2xl lg:max-w-none ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-600'} opacity-80`}>
        Deploy autonomous AI agents that handle complex business processes and scale with your growth.
      </p>
      </div>
    
  );
};

export default HeroFlowchart;
