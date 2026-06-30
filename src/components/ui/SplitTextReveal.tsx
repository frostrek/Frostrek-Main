import { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { cn } from '../../utils/cn';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
    children: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
    type?: 'chars' | 'words' | 'lines';
    stagger?: number;
    duration?: number;
    delay?: number;
    y?: number;
    blur?: boolean;
    once?: boolean;
    scrub?: boolean | number; // If true, animation is tied to scroll position
    trigger?: 'scroll' | 'load' | 'none';
    start?: string; // ScrollTrigger start threshold
    end?: string; // ScrollTrigger end threshold
    parallax?: number; // Optional parallax movement on scroll
}

/**
 * SplitTextReveal - A premium text animation component using GSAP.
 * Provides "god level" smooth reveal animations that react to scroll.
 */
const SplitTextReveal = ({
    children,
    className = '',
    as: Component = 'div',
    type = 'words',
    stagger = 0.02,
    duration = 0.8,
    delay = 0,
    y = 30,
    blur = true,
    once = false, // Default to false for "appear/disappear" behavior
    scrub = false,
    trigger = 'scroll',
    start = 'top 85%',
    end = 'bottom 15%',
    parallax = 0,
}: SplitTextRevealProps) => {
    const containerRef = useRef<HTMLElement>(null);

    // Split text into elements for fine-grained control
    const splitElements = useMemo(() => {
        if (type === 'words') {
            return children.split(' ').map((word, i) => (
                <span key={i} className="inline-block overflow-visible mr-[0.25em] last:mr-0">
                    <span className="split-item inline-block" style={{ 
                        opacity: 0,
                        transform: `translateY(${y}px)`,
                        filter: blur ? 'blur(10px)' : 'none'
                    }}>
                        {word}
                    </span>
                </span>
            ));
        }

        if (type === 'lines') {
            return children.split('\n').map((line, i) => (
                <span key={i} className="block overflow-hidden py-1">
                    <span className="split-item inline-block" style={{ 
                        opacity: 0,
                        transform: `translateY(${y}px)`,
                        filter: blur ? 'blur(10px)' : 'none'
                    }}>
                        {line}
                    </span>
                </span>
            ));
        }

        // Characters (default) - Most premium feel
        return children.split('').map((char, i) => (
            <span key={i} className="inline-block overflow-visible">
                <span
                    className="split-item inline-block"
                    style={{
                        opacity: 0,
                        display: char === ' ' ? 'inline' : 'inline-block',
                        transform: `translateY(${y}px)`,
                        filter: blur ? 'blur(10px)' : 'none'
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            </span>
        ));
    }, [children, type]);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container || trigger === 'none') return;

        const items = container.querySelectorAll('.split-item');
        if (!items.length) return;

        // ─── Initial State ───
        // (Initial state is now handled by inline React styles to prevent layout thrashing)

        if (trigger === 'load') {
            gsap.to(items, {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: duration,
                stagger: stagger,
                delay: delay,
                ease: 'expo.out',
            });
        } else if (trigger === 'scroll') {
            if (scrub) {
                // Scrubbing behavior (tied directly to scroll)
                gsap.to(items, {
                    scrollTrigger: {
                        trigger: container,
                        start: start,
                        end: end,
                        scrub: scrub === true ? 1 : scrub,
                        markers: false,
                    },
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    stagger: stagger,
                    ease: 'none',
                });
            } else {
                // Reveal behavior with "appear and disappear" (toggleActions)
                gsap.to(items, {
                    scrollTrigger: {
                        trigger: container,
                        start: start,
                        end: end,
                        toggleActions: once 
                            ? 'play none none none' 
                            : 'play reverse play reverse', // Reverses on scroll out
                        markers: false,
                    },
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: duration,
                    stagger: stagger,
                    ease: 'expo.out',
                });
            }

            // Optional Parallax Movement
            if (parallax !== 0) {
                gsap.to(container, {
                    scrollTrigger: {
                        trigger: container,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                    y: parallax,
                    ease: 'none',
                });
            }
        }
    }, { dependencies: [children, y, blur, duration, stagger, delay, once, trigger, start, end, scrub, parallax], scope: containerRef });

    return (
        <Component
            ref={containerRef as any}
            className={cn("split-text-reveal relative inline-block", className)}
        >
            {splitElements}
        </Component>
    );
};

export default SplitTextReveal;
