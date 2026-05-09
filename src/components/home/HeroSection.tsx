"use client";
import { useTheme } from "../../context/ThemeContext";
import HeroFlowchart from "./HeroFlowchart";

const HeroSection = () => {
    useTheme();

    return (
        <section className={`relative flex flex-col items-center overflow-hidden pt-24 sm:pt-28 lg:pt-40 pb-10 transition-colors duration-300 bg-transparent`}>
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
              @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
              }
            `}</style>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 overflow-visible">
                {/* Outer ultra-wide glow */}
                <div
                    className="absolute top-0 left-1/2 w-[600px] md:w-[1200px] lg:w-[1600px] h-[400px] md:h-[600px] lg:h-[800px] rounded-full blur-[100px] md:blur-[140px] lg:blur-[180px] bg-[#2EE1C7]/20"
                    style={{ animation: 'breathe-glow 6s ease-in-out infinite' }}
                />
            </div>
            <div className="w-full max-w-[1450px] mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="order-2 lg:order-1">
                        <HeroFlowchart />
                    </div>

                    {/* Right: Hero Image */}
                    <div className="order-1 lg:order-2 relative flex justify-center items-center">
                        <div className="relative w-full max-w-[600px]">
                            {/* Inner glow behind image */}
                            <div className="absolute inset-0 bg-[#2EE1C7]/20 rounded-full blur-[80px] pointer-events-none" />
                            
                            <img 
                                src="/hero-image.png" 
                                alt="Frostrek AI Hero" 
                                className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(46,225,199,0.3)]"
                                style={{ animation: 'float 6s ease-in-out infinite' }}
                            />

                            {/* Additional accent elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#2EE1C7]/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#2EE1C7]/15 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
