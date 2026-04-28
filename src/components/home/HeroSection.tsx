"use client";
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import HeroFlowchart from "./HeroFlowchart";

const HeroSection = () => {
    const { theme } = useTheme();

    return (
        <section className={`relative flex flex-col items-center overflow-hidden pt-32 lg:pt-40 pb-16 transition-colors duration-300 bg-transparent`}>
            {/* Decorative Glow Effect - Using specified #2EE1C7 color with breathing animation */}
            <style>{`
              @keyframes breathe-glow {
                0%, 100% { transform: translate(-50%, -60%) scale(1); opacity: 0.4; }
                50% { transform: translate(-50%, -60%) scale(1.1); opacity: 0.7; }
              }
              @keyframes breathe-glow-mid {
                0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                50% { transform: translate(-50%, -50%) scale(1.05); opacity: 0.8; }
              }
            `}</style>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-visible">
                {/* Outer ultra-wide glow */}
                <div
                    className="absolute top-0 left-1/2 w-[1600px] h-[800px] rounded-full blur-[180px] bg-[#2EE1C7]/20"
                    style={{ animation: 'breathe-glow 6s ease-in-out infinite' }}
                />
                {/* Middle broad glow */}
                <div
                    className="absolute top-0 left-1/2 w-[1200px] h-[600px] rounded-full blur-[140px] bg-[#2EE1C7]/25"
                    style={{ animation: 'breathe-glow-mid 5s ease-in-out infinite alternate' }}
                />
                {/* Inner concentrated emergent glow */}
                <div
                    className="absolute top-0 left-1/2 w-[800px] h-[400px] rounded-full blur-[100px] -translate-y-[40%] -translate-x-1/2 bg-[#2EE1C7]/35"
                />
            </div>
            <div className="w-full max-w-[1450px] mx-auto px-4 md:px-6 relative z-10">
                {/* Automation Flowchart with integrated Header */}
                <HeroFlowchart />
            </div>
        </section>
    );
};

export default HeroSection;
