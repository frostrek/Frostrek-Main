import React from 'react';
import { cn } from '../../utils/cn';

interface FlipTextProps {
    children: React.ReactNode;
    className?: string;
    hoverColor?: string;
}

/**
 * FlipText — CSS-only whole-word flip animation.
 * Replaces the per-character framer-motion version to cut DOM nodes by ~95%
 * and remove framer-motion from the critical render path.
 *
 * On hover the top text slides up and the duplicate slides in from below.
 * Uses CSS transitions with staggered letter-spacing for a premium feel.
 */
const FlipText: React.FC<FlipTextProps> = ({ children, className = '', hoverColor }) => {
    return (
        <span
            className={cn(
                "flip-text-root relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap h-[1.5em] leading-none",
                className
            )}
        >
            {/* Top Layer — visible by default, slides up on hover */}
            <span className="flip-text-top flex items-center justify-center h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {children}
            </span>

            {/* Bottom Layer — starts below, slides into view on hover */}
            <span
                className={cn(
                    "flip-text-bottom absolute inset-0 flex items-center justify-center h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-[150%]",
                    hoverColor || "text-inherit"
                )}
            >
                {children}
            </span>
        </span>
    );
};

export default FlipText;
