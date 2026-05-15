import { useRef } from 'react';
import { MessageSquare, Bot, Smartphone, Hash } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitTextReveal from '../ui/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

// Channel data
const channels = [
    { icon: Smartphone, label: 'WhatsApp', color: '#25D366', bg: 'bg-green-50', border: 'border-green-100' },
    { icon: Hash, label: 'Slack', color: '#E01E5A', bg: 'bg-pink-50', border: 'border-pink-100' },
    { icon: MessageSquare, label: 'Instagram DM', color: '#E1306C', bg: 'bg-rose-50', border: 'border-rose-100' },
    { icon: MessageSquare, label: 'Web Chat', color: '#2D6A4F', bg: 'bg-[#F4F9F6]', border: 'border-[#E6EFE6]' },
];

const OmniChannelFlow = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const hubRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Hub entrance
            if (hubRef.current) {
                gsap.fromTo(hubRef.current,
                    { scale: 0.7, opacity: 0 },
                    {
                        scale: 1, opacity: 1,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: hubRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }

            // Channel card stagger
            const cards = gridRef.current?.querySelectorAll('.channel-card');
            if (cards) {
                gsap.fromTo(cards,
                    { y: 40, opacity: 0, scale: 0.9 },
                    {
                        y: 0, opacity: 1, scale: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 85%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }

            // Connection lines
            const lines = sectionRef.current?.querySelectorAll('.connection-line');
            if (lines) {
                gsap.fromTo(lines,
                    { scaleX: 0, opacity: 0 },
                    {
                        scaleX: 1, opacity: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 80%',
                            toggleActions: 'play reverse play reverse'
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="py-24 relative overflow-hidden bg-brand-light-bg font-body border-t border-[#2D6A4F]/10">
            <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">

                <div className="flex flex-col items-center text-center mb-16">
                    <SplitTextReveal
                        as="h2"
                        className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2D6A4F] leading-[1.15] tracking-[-0.01em]"
                        type="chars"
                        stagger={0.02}
                        once={false}
                    >
                        One Brain, Every Channel.
                    </SplitTextReveal>
                    <SplitTextReveal
                        as="p"
                        className="max-w-2xl mx-auto text-lg text-gray-500 font-medium mt-4"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        Deploy your Frosty AI agent across all your customer touchpoints instantly.
                    </SplitTextReveal>
                </div>

                {/* Flow Layout — Central Hub + Radiating Channels */}
                <div className="max-w-4xl mx-auto">
                    {/* Central Hub */}
                    <div className="flex justify-center mb-12">
                        <div
                            ref={hubRef}
                            className="relative flex flex-col items-center justify-center w-36 h-36 bg-white rounded-full border-[3px] border-[#2D6A4F] shadow-[0_0_40px_rgba(45,106,79,0.12)] z-10"
                        >
                            <Bot className="w-12 h-12 text-[#2D6A4F] mb-1" strokeWidth={1.5} />
                            <span className="font-serif font-bold text-xs text-[#2D6A4F] tracking-wider">FROSTY AI</span>

                            {/* Pulse ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-[#2D6A4F]/20 animate-ping" style={{ animationDuration: '3s' }} />
                        </div>
                    </div>

                    {/* Connection Lines + Channel Cards */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-0">
                            {channels.map((_, i) => (
                                <div key={i} className="connection-line h-0.5 w-12 md:w-20 bg-gradient-to-r from-[#2D6A4F]/40 to-[#2D6A4F]/10 origin-left" />
                            ))}
                        </div>
                    </div>

                    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {channels.map((channel, idx) => (
                            <div
                                key={idx}
                                className={`channel-card group flex flex-col items-center gap-4 p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer ${channel.bg} ${channel.border} hover:shadow-[0_15px_40px_rgba(45,106,79,0.05)] hover:-translate-y-1`}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl bg-white shadow-md border border-gray-100/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                >
                                    <channel.icon className="w-8 h-8" style={{ color: channel.color }} strokeWidth={1.5} />
                                </div>
                                <span className="text-sm font-bold text-gray-700">{channel.label}</span>
                                <span className="text-[10px] font-bold text-[#2D6A4F] bg-[#E8F5EE] px-2 py-0.5 rounded-full border border-[#c4e0d4]/50">Connected</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OmniChannelFlow;
