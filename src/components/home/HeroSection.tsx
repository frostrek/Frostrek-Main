"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";


const ROTATING_TEXTS = [
    { part1: "Employee Experiences", part2: "AI Copilots" },
    { part1: "Support Workflows", part2: "AI Agents" },
    { part1: "Operations", part2: "Automation" },
];





const HeroSection = () => {
    const [index, setIndex] = useState(0);
    const { theme } = useTheme();

    // Text Rotation Interval - visibility aware
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
        <section className={`relative min-h-[90vh] flex items-center overflow-hidden pt-24 lg:pt-32 pb-8 transition-colors duration-300 bg-transparent`}>
            {/* Decorative Glow Effect - Using specified #2EE1C7 color */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-visible">
                {/* Outer ultra-wide glow */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[800px] rounded-full blur-[180px] -translate-y-[60%] opacity-40 bg-[#2EE1C7]/20" 
                />
                {/* Middle broad glow */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] rounded-full blur-[140px] -translate-y-[50%] bg-[#2EE1C7]/25" 
                />
                {/* Inner concentrated emergent glow */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[100px] -translate-y-[40%] bg-[#2EE1C7]/35" 
                />
            </div>
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">

                    {/* Text Content */}
                    <div className="flex flex-col items-center text-center w-full">
                        {/* Transforming */}
                        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.15] tracking-tight mb-8 w-full flex flex-col items-center transition-colors duration-300 ${theme === 'dark' ? 'text-dark-text' : 'text-primary'}`}>
                            <span className="block">Transforming</span>

                            {/* Line 2: Animated Part 1 */}
                            <div className="h-[1.4em] relative overflow-hidden flex items-center justify-center w-fit min-w-full">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={index}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className={`block whitespace-nowrap pb-1 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#2EE1C7]'}`}
                                    >
                                        {ROTATING_TEXTS[index].part1}
                                    </motion.span>
                                </AnimatePresence>
                            </div>

                            <span className="block whitespace-nowrap">with Conversational</span>

                            {/* Line 4: Animated Part 2 */}
                            <div className="h-[1.4em] relative overflow-hidden flex items-center justify-center w-fit min-w-full">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={index}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                        className={`block whitespace-nowrap pb-1 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#2EE1C7]'}`}
                                    >
                                        {ROTATING_TEXTS[index].part2}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </h1>

                        <p className={`text-lg sm:text-xl mb-10 max-w-2xl leading-relaxed transition-colors duration-300 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-muted'}`}>
                            Harness the power of AI to enhance productivity, streamline workflows, and foster a more engaged workforce across your enterprise.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link to="/schedule-demo" className={`px-8 py-4 text-black rounded-xl font-bold shadow-lg transition-all transform hover:scale-105 w-full sm:w-auto text-center ${theme === 'dark' ? 'bg-dark-accent hover:bg-dark-accent/90 shadow-dark-accent/20' : 'bg-[#2EE1C7] hover:bg-[#2EE1C7] shadow-[#2EE1C7]/20'}`}>
                                Schedule a Demo
                            </Link>
                            <Link to="/contact" className={`px-8 py-4 bg-transparent border-2 rounded-xl font-bold transition-all w-full sm:w-auto hover:scale-105 text-center flex items-center justify-center ${theme === 'dark' ? 'border-dark-accent text-white hover:bg-dark-accent hover:text-black' : 'border-[#2EE1C7] text-white hover:bg-[#2EE1C7] hover:text-black'}`}>
                                Contact Sales
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;

