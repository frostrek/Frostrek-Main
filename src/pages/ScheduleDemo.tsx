import { useEffect, useState, useRef } from 'react';
import { MapPin, Clock, Calendar as CalendarIcon, Sparkles, ArrowRight, type LucideIcon } from 'lucide-react';
import SEO from '../components/seo/SEO';
import SplitTextReveal from '../components/ui/SplitTextReveal';

const CALENDLY_URL = 'https://calendly.com/akash-mittal-frostrek/30min';

/* ── Skeleton placeholder mimicking a light, beautiful calendar widget ── */
const CalendarSkeleton = () => {
    const base = 'bg-slate-100';
    const shimmer = 'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
    const pulse = `relative overflow-hidden before:absolute before:inset-0 before:animate-[shimmer_1.8s_infinite] ${shimmer}`;

    return (
        <div className="flex flex-col gap-5 p-6 sm:p-8 bg-white animate-pulse" aria-hidden="true">
            {/* Avatar + name */}
            <div className="flex flex-col items-center gap-3 mb-2">
                <div className={`w-16 h-16 rounded-full ${base} ${pulse}`} />
                <div className={`h-4 w-32 rounded ${base} ${pulse}`} />
                <div className={`h-6 w-48 rounded ${base} ${pulse}`} />
            </div>

            {/* Duration + location lines */}
            <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded ${base} ${pulse}`} />
                <div className={`h-4 w-20 rounded ${base} ${pulse}`} />
            </div>
            <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded ${base} ${pulse}`} />
                <div className={`h-4 w-56 rounded ${base} ${pulse}`} />
            </div>

            {/* Divider */}
            <div className={`h-px w-full ${base} my-1`} />

            {/* "Select a Day" heading */}
            <div className={`h-5 w-28 rounded mx-auto ${base} ${pulse}`} />

            {/* Month nav row */}
            <div className="flex items-center justify-center gap-4">
                <div className={`w-8 h-8 rounded-full ${base} ${pulse}`} />
                <div className={`h-5 w-24 rounded ${base} ${pulse}`} />
                <div className={`w-8 h-8 rounded-full ${base} ${pulse}`} />
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <div key={`wh-${i}`} className={`h-4 rounded ${base} ${pulse}`} />
                ))}
            </div>

            {/* Calendar grid (5 rows × 7 cols) */}
            {Array.from({ length: 5 }).map((_, row) => (
                <div key={`cr-${row}`} className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }).map((_, col) => (
                        <div
                            key={`cd-${row}-${col}`}
                            className={`h-9 rounded-lg ${base} ${pulse}`}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

/* ── Info card component ── */
const InfoCard = ({
    icon: Icon,
    title,
    children,
}: {
    icon: LucideIcon;
    title: string;
    children: React.ReactNode;
}) => (
    <div className="flex items-start gap-4 p-5 rounded-2xl transition-all duration-300 group hover:scale-[1.01] bg-[#FAFCFB] hover:bg-white border border-[#2D6A4F]/5 hover:border-[#2D6A4F]/25 shadow-sm hover:shadow-md">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#E8F5EE] text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white transition-all duration-300 shadow-sm">
            <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
            <h3 className="font-serif font-black text-sm text-gray-950 mb-1">{title}</h3>
            <div className="text-sm text-slate-500 font-medium leading-relaxed font-body">{children}</div>
        </div>
    </div>
);

const ScheduleDemo = () => {
    const [widgetReady, setWidgetReady] = useState(false);
    const messageListenerRef = useRef<((e: MessageEvent) => void) | null>(null);
    const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setWidgetReady(false);

        // Clean up previous listeners
        if (messageListenerRef.current) {
            window.removeEventListener('message', messageListenerRef.current);
        }
        if (fallbackTimerRef.current) {
            clearTimeout(fallbackTimerRef.current);
        }

        // Add Calendly CSS (idempotent)
        if (!document.querySelector('link[href*="calendly.com"]')) {
            const linkEl = document.createElement('link');
            linkEl.href = 'https://assets.calendly.com/assets/external/widget.css';
            linkEl.rel = 'stylesheet';
            document.head.appendChild(linkEl);
        }

        // Add Calendly JS
        const existingScript = document.querySelector('script[src*="calendly.com"]');
        if (existingScript) {
            initCalendly();
        } else {
            const scriptEl = document.createElement('script');
            scriptEl.src = 'https://assets.calendly.com/assets/external/widget.js';
            scriptEl.async = true;
            scriptEl.onload = () => initCalendly();
            document.body.appendChild(scriptEl);
        }

        function initCalendly() {
            const container = document.getElementById('calendly-inline-widget');
            if (!container || !(window as any).Calendly) return;

            container.innerHTML = '';

            // ALWAYS use beautiful premium light style for Calendly Embed to align with white theme
            const bgColor = 'ffffff';
            const textColor = '1a1a1a';
            const primaryColor = '2d6a4f'; // Exact Forest Green BRAND tone

            (window as any).Calendly.initInlineWidget({
                url: `${CALENDLY_URL}?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=${bgColor}&text_color=${textColor}&primary_color=${primaryColor}`,
                parentElement: container,
            });

            // Listen for Calendly ready event
            const onMessage = (e: MessageEvent) => {
                if (
                    e.data?.event === 'calendly.page_height' ||
                    e.data?.event === 'calendly.event_type_viewed'
                ) {
                    setWidgetReady(true);
                }
            };
            messageListenerRef.current = onMessage;
            window.addEventListener('message', onMessage);

            // Fallback: show widget after 3.5s regardless
            fallbackTimerRef.current = setTimeout(() => setWidgetReady(true), 3500);
        }

        return () => {
            if (messageListenerRef.current) {
                window.removeEventListener('message', messageListenerRef.current);
            }
            if (fallbackTimerRef.current) {
                clearTimeout(fallbackTimerRef.current);
            }
        };
    }, []);

    return (
        <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-white via-[#FAFCFB] to-white relative font-body overflow-hidden">
            <SEO
                title="Schedule a Demo | Frostrek"
                description="Meet with our team to discover how Frostrek can transform your business with AI-powered automation."
                path="/schedule-demo"
            />

            {/* Decorative Grid Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] bg-[#E8F5EE]/40" />
                <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] bg-[#E8F5EE]/40" />
                <div className="absolute inset-0 opacity-[0.015]"
                    style={{
                        backgroundImage: 'linear-gradient(#2d6a4f 1px, transparent 1px), linear-gradient(90deg, #2d6a4f 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Hero section with high-contrast visible text */}
            <div className="relative z-10 text-center pt-8 md:pt-12 pb-10 px-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-6 bg-[#E8F5EE] border border-[#2D6A4F]/20 text-[#2D6A4F] font-bold text-[11px] uppercase tracking-wider">
                    <Sparkles size={12} className="animate-pulse" />
                    <span>Book Your Demo</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-gray-950 leading-tight">
                        <SplitTextReveal as="span" type="chars" stagger={0.03} once={false}>
                            Let's Build Something
                        </SplitTextReveal>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D6A4F] via-[#40916C] to-[#1B4332]">
                            <SplitTextReveal as="span" type="chars" stagger={0.03} once={false} delay={0.3}>
                                Amazing
                            </SplitTextReveal>
                        </span>
                    </div>
                </div>
                <SplitTextReveal
                    as="p"
                    className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto mt-4"
                    type="words"
                    stagger={0.015}
                    once={false}
                    delay={0.6}
                >
                    Meet with our team to discover how Frostrek can transform your business with AI-powered enterprise systems and conversational agents.
                </SplitTextReveal>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-4 lg:px-8 pb-12 sm:pb-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-7xl mx-auto items-start">

                    {/* Left Column - Company Info (2 cols) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        {/* Info cards with pristine light theme */}
                        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#2D6A4F]/10 shadow-2xl shadow-[#2D6A4F]/5">
                            <div className="flex flex-col gap-4">
                                <InfoCard icon={Clock} title="Meeting Duration">
                                    <p className="font-semibold text-slate-600">30 minutes</p>
                                </InfoCard>
                                <InfoCard icon={MapPin} title="Meeting Location">
                                    <p className="font-semibold text-slate-600">Microsoft Teams / Google Meet</p>
                                </InfoCard>
                                <InfoCard icon={CalendarIcon} title="What to Expect">
                                    <ul className="space-y-1 font-semibold text-slate-600 mt-1">
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-3.5 h-3.5 text-[#2D6A4F] flex-shrink-0 animate-pulse" />
                                            <span>Product walkthrough</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-3.5 h-3.5 text-[#2D6A4F] flex-shrink-0 animate-pulse" />
                                            <span>Q&A session</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-3.5 h-3.5 text-[#2D6A4F] flex-shrink-0 animate-pulse" />
                                            <span>Custom solution discussion</span>
                                        </li>
                                    </ul>
                                </InfoCard>
                            </div>
                        </div>

                        {/* Trust badge with pristine light card styling */}
                        <div className="rounded-3xl p-7 text-center bg-white border border-[#2D6A4F]/10 shadow-xl">
                            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#2D6A4F] mb-2 font-body">
                                Trusted by enterprises
                            </p>
                            <p className="text-sm font-semibold text-slate-500 font-body leading-relaxed">
                                Join 100+ global brands leveraging Frostrek for high-scale, secure conversational AI integrations.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Calendly Widget Container (3 cols) */}
                    <div className="lg:col-span-3 rounded-3xl overflow-hidden relative bg-white border border-[#2D6A4F]/10 shadow-2xl shadow-[#2D6A4F]/5 p-3 sm:p-4">
                        {/* Skeleton loading state */}
                        {!widgetReady && (
                            <div className="absolute inset-0 z-10">
                                <CalendarSkeleton />
                            </div>
                        )}

                        {/* Calendly inline widget container */}
                        <div
                            id="calendly-inline-widget"
                            className="w-full transition-opacity duration-500"
                            style={{
                                minHeight: '750px',
                                opacity: widgetReady ? 1 : 0,
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Shimmer keyframe + Calendly iframe sizing */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                #calendly-inline-widget iframe {
                    min-height: 750px !important;
                    height: 100% !important;
                    width: 100% !important;
                    border-radius: 18px;
                }
            `}</style>
        </div>
    );
};

export default ScheduleDemo;
