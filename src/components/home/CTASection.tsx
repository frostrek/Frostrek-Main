import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import FlipText from '../ui/FlipText';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const patternRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                gsap.fromTo(contentRef.current.querySelectorAll('h2, p'),
                    { y: 60, opacity: 0, filter: 'blur(8px)' },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.9,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            const buttons = buttonsRef.current?.querySelectorAll('.cta-button');
            if (buttons) {
                gsap.fromTo(buttons,
                    { y: 40, opacity: 0, scale: 0.9 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: buttonsRef.current,
                            start: 'top 90%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

            if (patternRef.current) {
                gsap.to(patternRef.current, {
                    backgroundPosition: '30px 30px',
                    duration: 20,
                    repeat: -1,
                    ease: 'none'
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-brand-light-bg font-sans">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-badge-bg/80 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-orange-50/60 rounded-full blur-[100px] pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-[1400px]">
                <div ref={contentRef} className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-[3rem] border border-[#E6EFE6] shadow-[0_20px_60px_rgba(45,106,79,0.04)]">
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]">
                        Ready to transform <br className="hidden md:block"/> your business?
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
                        Join forward-thinking enterprises using Frostrek to automate, scale, and innovate.
                    </p>

                    <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            to="/schedule-demo" 
                            className="group cta-button primary-cta w-full sm:w-auto px-10 py-4 bg-[#2D6A4F] text-white rounded-2xl font-medium text-[15px] shadow-lg shadow-[#2D6A4F]/10 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#1E4D38]"
                        >
                            <FlipText>
                                Schedule a Demo
                                <ArrowRight size={18} />
                            </FlipText>
                        </Link>
                        <Link 
                            to="/contact" 
                            className="group cta-button w-full sm:w-auto px-10 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-medium text-[15px] transition-all duration-300 hover:border-[#2D6A4F] hover:bg-gray-50 flex items-center justify-center"
                        >
                            <FlipText>
                                Contact Sales
                            </FlipText>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
