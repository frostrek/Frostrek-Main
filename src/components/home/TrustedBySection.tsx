import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import SplitTextReveal from '../ui/SplitTextReveal';

// ─── Observe.ai-style arrow SVG (Exact paths) ─────────────────────
const CurlyArrow = ({ className = '', flip = false }: { className?: string, flip?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 84"
        width="150"
        height="84"
        preserveAspectRatio="xMidYMid meet"
        className={className}
        aria-hidden
        fill="none"
        style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    >
        <g transform="matrix(1.203660011291504,0,0,1.203660011291504,78.125,34.75)" opacity="1">
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="miter"
                    fillOpacity="0"
                    strokeMiterlimit="4"
                    stroke="currentColor"
                    strokeOpacity="1"
                    strokeWidth="4"
                    d="M55.5,31.5 C55.5,31.5 -11.319000244140625,37.178001403808594 -9.857999801635742,-2.484999895095825 C-9.092000007629395,-23.27400016784668 24.405000686645508,-27.20800018310547 29.908000946044922,-5.761000156402588 C31.027999877929688,-1.3949999809265137 32.67499923706055,20.930999755859375 -1.75,24.5 C-31.881999969482422,27.624000549316406 -52.4640007019043,-9.656000137329102 -51.5,-18.334999084472656 C-51.375,-18.834999084472656 -36.25,-9.375 -36.25,-9.375"
                />
            </g>
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fillOpacity="0"
                    stroke="currentColor"
                    strokeOpacity="1"
                    strokeWidth="4"
                    d="M-59.96900177001953,-3.303999900817871 C-59.96900177001953,-3.303999900817871 -51.46900177001953,-18.304000854492188 -51.46900177001953,-18.304000854492188"
                />
            </g>
        </g>
    </svg>
);

gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
    { name: 'Clutch', src: '/clutch.webp', rating: '4.9', reviews: '50+ reviews' },
    { name: 'Top Developers', src: '/topDevelopers.webp', rating: '5.0', reviews: '30+ reviews' },
    { name: 'GoodFirms', src: '/goodfirms.webp', rating: '4.8', reviews: '45+ reviews' },
    { name: 'ISO Certified', src: '/iso.webp', rating: 'ISO', reviews: '9001 Certified' },
    { name: 'Vedashi', src: '/vedashi-logo.png', rating: '★★★★★', reviews: 'Trusted Client' },
];

const TrustedBySection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseEnter = (card: HTMLDivElement) => {
        gsap.to(card, { scale: 1.1, y: -5, duration: 0.4, ease: 'power2.out' });
        gsap.to(card.querySelector('.logo-img'), { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = (card: HTMLDivElement) => {
        gsap.to(card, { scale: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        gsap.to(card.querySelector('.logo-img'), { opacity: 0.85, duration: 0.3 });
    };

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Marquee initialization or other logic can go here
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative pt-16 pb-8 md:pt-20 md:pb-12 overflow-hidden bg-brand-light-bg font-sans"
        >
            <div className="container mx-auto px-6 relative z-10">
                {/* Title */}
                <div className="text-center mb-16">
                    <div className="flex flex-row items-center justify-center gap-4 md:gap-6 mb-4">
                        {/* Curly arrow — slides in from right after text, flipped to be on left */}
                        <motion.div
                            initial={{ opacity: 0, x: 20, rotate: 15 }}
                            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                            className="flex-shrink-0"
                        >
                            <CurlyArrow flip className="w-12 h-7 md:w-16 md:h-10 text-[#3D8B6E]/65" />
                        </motion.div>

                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.02}
                            once={false}
                        >
                            Trusted by Industry Leaders
                        </SplitTextReveal>
                    </div>
                    <SplitTextReveal
                        as="p"
                        className="max-w-2xl mx-auto text-lg text-gray-500 font-medium"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        Global enterprises choose Frostrek to power their most critical workflows.
                    </SplitTextReveal>
                </div>

                {/* Marquee */}
                <div className="relative -mx-6 overflow-hidden">
                    <div ref={marqueeRef} className="flex gap-12 py-6 animate-marquee" style={{ width: 'max-content' }}>
                        {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => {
                            return (
                                <div
                                    key={`${logo.name}-${i}`}
                                    ref={el => { cardRefs.current[i] = el; }}
                                    className="marquee-item relative cursor-default select-none"
                                    onMouseEnter={e => handleMouseEnter(e.currentTarget)}
                                    onMouseLeave={e => handleMouseLeave(e.currentTarget)}
                                >
                                    <div className="relative p-6 md:p-8 transition-all duration-300 min-w-[180px] flex flex-col items-center justify-center">
                                        <div className="transition-all duration-300 relative">
                                            <img
                                                src={logo.src}
                                                alt={logo.name}
                                                className="logo-img h-12 md:h-16 w-auto object-contain transition-all duration-300"
                                                style={{ opacity: 0.85 }}
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustedBySection;