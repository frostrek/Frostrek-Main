import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SplitTextReveal from '../ui/SplitTextReveal';



gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
    { name: 'Clutch', src: '/clutch.png', rating: '4.9', reviews: '50+ reviews' },
    { name: 'Top Developers', src: '/optimized/topDevelopers.webp', rating: '5.0', reviews: '30+ reviews' },
    { name: 'GoodFirms', src: '/goodfirms.png', rating: '4.8', reviews: '45+ reviews' },
    { name: 'ISO Certified', src: '/optimized/iso.webp', rating: 'ISO', reviews: '9001 Certified' },
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
                <div className="text-center mb-10 md:mb-16">
                    <div className="flex flex-row items-center justify-center gap-4 md:gap-6 mb-4">


                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-4xl lg:text-6xl text-[#2D6A4F] leading-[1.15] tracking-[-0.025em]"
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
                                            <img src={logo.src}
                                                alt={logo.name}
                                                className="logo-img h-12 md:h-16 w-auto object-contain transition-all duration-300"
                                                style={{ opacity: 0.85 }}
                                                loading="lazy"
                                                draggable={false} width={512} height={512} />
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