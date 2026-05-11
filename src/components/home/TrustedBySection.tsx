import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!section || cards.length === 0) return;

        const ctx = gsap.context(() => {
            gsap.fromTo('.trusted-title',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 80%' } }
            );
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
                <div className="trusted-title text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] mb-4 leading-[1.15] tracking-[-0.01em]">
                        Trusted by <span className="text-[#336B55]">Industry Leaders</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium">
                        Global enterprises choose Frostrek to power their most critical workflows.
                    </p>
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