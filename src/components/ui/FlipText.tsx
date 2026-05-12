import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface FlipTextProps {
    children: React.ReactNode;
    className?: string;
    hoverColor?: string;
}

const FlipText: React.FC<FlipTextProps> = ({ children, className = '', hoverColor }) => {
    const transition: any = {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Use a custom bezier for a more premium feel, avoids string typing issues
    };

    const childrenArray = React.Children.toArray(children);
    const units: { type: 'char' | 'node'; content: string | React.ReactNode }[] = [];
    
    childrenArray.forEach(child => {
        if (typeof child === 'string') {
            child.split("").forEach(char => {
                units.push({ type: 'char', content: char === " " ? "\u00A0" : char });
            });
        } else {
            units.push({ type: 'node', content: child });
        }
    });

    return (
        <motion.span
            initial="initial"
            whileHover="hovered"
            className={cn("relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap h-[1.5em] leading-none", className)}
        >
            {/* Top Layer */}
            <span className="flex items-center justify-center h-full">
                {units.map((unit, i) => (
                    <motion.span
                        key={`top-${i}`}
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: "-150%" },
                        }}
                        transition={{
                            ...transition,
                            delay: i * 0.02,
                        }}
                        className="inline-flex items-center h-full"
                    >
                        {unit.content}
                    </motion.span>
                ))}
            </span>

            {/* Bottom Layer */}
            <span className="absolute inset-0 flex items-center justify-center h-full">
                {units.map((unit, i) => (
                    <motion.span
                        key={`bottom-${i}`}
                        variants={{
                            initial: { y: "150%" },
                            hovered: { y: 0 },
                        }}
                        transition={{
                            ...transition,
                            delay: i * 0.02,
                        }}
                        className={cn("inline-flex items-center h-full", hoverColor || "text-inherit")}
                    >
                        {unit.content}
                    </motion.span>
                ))}
            </span>
        </motion.span>
    );
};

export default FlipText;
