"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import HeroFlowchart from "./HeroFlowchart";


const ROTATING_TEXTS = [
    { part1: "Intelligent Systems", part2: "Business Works" },
    { part1: "Support Workflows", part2: "Business Works" },
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
        <section className={`relative flex flex-col items-center overflow-hidden pt-24 lg:pt-28 pb-16 transition-colors duration-300 bg-transparent`}>
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
            <div className="container mx-auto px-4 md:px-6 relative z-10 w-full">
                <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mb-4 lg:mb-4">

                    {/* Text Content */}
                    <div className="flex flex-col items-center text-center w-full">
                        {/* Transforming */}
                        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight mb-6 w-full flex flex-col items-center transition-colors duration-300 ${theme === 'dark' ? 'text-dark-text' : 'text-primary'}`}>
                            {/* <span className="block">Transforming</span> */}

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

                            <span className="block whitespace-nowrap mb-2">built to scale with</span>

                            {/* Line 4: Static + Animated Part 2 */}
                            <div className="flex flex-row items-center justify-center flex-wrap gap-x-3 sm:gap-x-4 w-full">
                                <span className="whitespace-nowrap">how your</span>
                                <div className="h-[1.4em] relative overflow-hidden flex items-center justify-start w-fit min-w-[200px] sm:min-w-[250px]">
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
                            </div>
                        </h1>



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

                {/* Automation Flowchart */}
                <HeroFlowchart />
            </div>
        </section>
    );
};

export default HeroSection;

