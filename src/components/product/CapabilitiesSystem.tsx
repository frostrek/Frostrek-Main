import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shield, Server, Brain, Activity, Lock, Zap, Database } from 'lucide-react';
import type { ProductFeature } from '../../utils/productData';

const FeatureNode = ({
    feature,
    isActive,
    index,
    onHover
}: {
    feature: ProductFeature,
    isActive: boolean,
    index: number,
    onHover: (idx: number) => void
}) => {
    return (
        <motion.div
            onHoverStart={() => onHover(index)}
            onClick={() => onHover(index)}
            className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-pointer group w-full ${
                isActive
                    ? 'bg-white border-[#2D6A4F] shadow-lg shadow-[#2D6A4F]/5 z-10'
                    : 'bg-white/60 border-gray-150 hover:bg-white hover:border-[#2D6A4F]/35'
            }`}
            whileHover={{ x: 5 }}
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    isActive ? 'bg-[#2D6A4F] text-white' : 'bg-[#E8F5EE] text-[#2D6A4F]'
                }`}>
                    {feature.icon && <feature.icon className="w-5 h-5" />}
                </div>
                <div>
                    <h4 className="text-base font-serif font-bold text-gray-900 mb-1 leading-tight">
                        {feature.title}
                    </h4>
                    {/* FIXED: high-contrast text-slate-500 ensures description text is beautifully visible */}
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        {feature.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const CoreEngine = ({ activeIndex, isAllActive, onToggleAll }: { activeIndex: number, isAllActive: boolean, onToggleAll: () => void }) => {
    // Satellite positions
    const satellites = [
        { x: -120, y: -80, icon: Database, bg: 'bg-[#E8F5EE]', text: 'text-[#2D6A4F]' },
        { x: 120, y: -80, icon: Shield, bg: 'bg-[#E8F5EE]', text: 'text-[#2D6A4F]' },
        { x: -120, y: 80, icon: Server, bg: 'bg-[#E8F5EE]', text: 'text-[#2D6A4F]' },
        { x: 120, y: 80, icon: Zap, bg: 'bg-[#E8F5EE]', text: 'text-[#2D6A4F]' },
        { x: 0, y: -130, icon: Activity, bg: 'bg-[#E8F5EE]', text: 'text-[#2D6A4F]' },
        { x: 0, y: 130, icon: Lock, bg: 'bg-[#E8F5EE]', text: 'text-[#2D6A4F]' }
    ];

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.2]"
                style={{
                    backgroundImage: 'radial-gradient(#2D6A4F 1.2px, transparent 1.2px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Connecting Lines Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                {satellites.map((sat, i) => (
                    <motion.line
                        key={i}
                        x1="50%" y1="50%"
                        x2={`calc(50% + ${sat.x}px)`} y2={`calc(50% + ${sat.y}px)`}
                        stroke={(isAllActive || activeIndex % satellites.length === i) ? "#2D6A4F" : "#E8F5EE"}
                        strokeWidth={(isAllActive || activeIndex % satellites.length === i) ? 3 : 1.5}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                    />
                ))}
            </svg>

            {/* Central Core */}
            <motion.div
                onClick={onToggleAll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative z-20 w-32 h-32 rounded-full border-4 flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 bg-white border-[#2D6A4F]/40 ${
                    isAllActive ? 'ring-4 ring-[#2D6A4F]/20 scale-105' : ''
                }`}
            >
                <div className={`absolute inset-2 rounded-full flex items-center justify-center text-white text-center p-2 shadow-inner transition-all duration-300 bg-[#2D6A4F] ${isAllActive ? 'animate-pulse' : ''}`}>
                    <Brain className={`w-12 h-12 text-white/90 transition-all duration-300 ${isAllActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' : ''}`} />
                </div>

                {/* Orbiting Rings */}
                <div
                    className={`absolute -inset-4 border rounded-full border-dashed border-[#2D6A4F]/30 ${
                        isAllActive ? 'animate-spin-fast border-[#2D6A4F]' : 'animate-spin-slow'
                    }`}
                />
                <div className="absolute -inset-8 border rounded-full animate-spin-slow-reverse border-[#2D6A4F]/10" />
            </motion.div>

            {/* Satellites */}
            {satellites.map((sat, i) => (
                <motion.div
                    key={i}
                    className={`absolute z-20 w-12 h-12 rounded-xl ${sat.bg} flex items-center justify-center shadow-sm border border-[#2D6A4F]/15`}
                    style={{ x: sat.x, y: sat.y }}
                    animate={{
                        scale: (isAllActive || activeIndex % satellites.length === i) ? 1.2 : 1,
                        filter: (isAllActive || activeIndex % satellites.length === i) ? 'grayscale(0%)' : 'grayscale(100%) opacity(0.5)'
                    }}
                >
                    <sat.icon className={`w-6 h-6 ${sat.text}`} />
                </motion.div>
            ))}

            {/* Status Pill */}
            {/* FIXED: high-contrast text-slate-600 instead of text-dark-text-muted to ensure readability on white backdrop */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 backdrop-blur-md px-4.5 py-2 rounded-full border text-xs font-bold flex items-center gap-2 shadow-sm bg-white border-[#2D6A4F]/15 text-slate-600">
                <span className={`w-2 h-2 rounded-full bg-[#2D6A4F] ${isAllActive ? 'animate-ping' : 'animate-pulse'}`} />
                {isAllActive ? 'FULL SYSTEM ACTIVE' : 'SYSTEM OPERATIONAL'}
            </div>
        </div>
    );
};

export const CapabilitiesSystem = ({ features }: { features: ProductFeature[] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAllActive, setIsAllActive] = useState(false);

    const handleToggleAll = () => {
        setIsAllActive(prev => !prev);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center font-body">
            {/* Left Column - Controls */}
            <div className="w-full lg:w-5/12 space-y-2">
                {features.map((feature, idx) => (
                    <FeatureNode
                        key={idx}
                        index={idx}
                        feature={feature}
                        isActive={isAllActive || activeIndex === idx}
                        onHover={(idx) => {
                            if (!isAllActive) setActiveIndex(idx);
                        }}
                    />
                ))}
            </div>

            {/* Right Column - Visualizer */}
            <div className="w-full lg:w-7/12 relative">
                <div className="relative rounded-[3rem] border shadow-2xl backdrop-blur-md overflow-hidden bg-white border-gray-150">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#E8F5EE]/40 to-transparent" />
                    <CoreEngine activeIndex={activeIndex} isAllActive={isAllActive} onToggleAll={handleToggleAll} />
                </div>

                {/* Decorative Blur */}
                <div className={`absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-3xl rounded-full transition-colors duration-500 ${isAllActive ? 'bg-[#2D6A4F]/10' : 'bg-[#2D6A4F]/5'}`} />
            </div>
        </div>
    );
};
