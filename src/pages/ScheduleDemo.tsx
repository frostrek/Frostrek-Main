import { useEffect, useState, useRef } from 'react';
import { MapPin, Clock, Calendar as CalendarIcon, Sparkles, ArrowRight } from 'lucide-react';
import CuteBackground from '../components/ui/CuteBackground';
import { useTheme } from '../context/ThemeContext';
import SEO from '../components/seo/SEO';

const CALENDLY_URL = 'https://calendly.com/akash-mittal-frostrek/30min';

/* ── Skeleton placeholder mimicking a calendar widget ── */
const CalendarSkeleton = ({ isDark }: { isDark: boolean }) => {
    const base = isDark ? 'bg-[#2EE1C7]/[0.06]' : 'bg-gray-200/70';
    const shimmer = isDark
        ? 'before:bg-gradient-to-r before:from-transparent before:via-[#2EE1C7]/[0.03] before:to-transparent'
        : 'before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
    const pulse = `relative overflow-hidden before:absolute before:inset-0 before:animate-[shimmer_1.8s_infinite] ${shimmer}`;

    return (
        <div className="flex flex-col gap-5 p-6 sm:p-8 animate-pulse" aria-hidden="true">
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
    isDark,
}: {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
    isDark: boolean;
}) => (
    <div className={`flex items-start gap-4 p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] ${
        isDark
            ? 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.04]'
            : 'bg-gray-50 hover:bg-gray-100/80 border border-gray-100'
    }`}>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isDark
                ? 'bg-[#2EE1C7]/10 group-hover:bg-[#2EE1C7]/20 shadow-[0_0_20px_rgba(46,225,199,0.08)]'
                : 'bg-[#2EE1C7]/10 group-hover:bg-[#2EE1C7]/20'
        }`}>
            <Icon className="w-5 h-5 text-[#2EE1C7]" />
        </div>
        <div>
            <h3 className={`font-semibold text-sm mb-0.5 ${isDark ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <div className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{children}</div>
        </div>
    </div>
);

const ScheduleDemo = () => {
    const { theme } = useTheme();
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
            // Script already in DOM, just init
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

            const isDark = theme === 'dark';
            // Use Calendly's dark color scheme matching our theme
            const bgColor = isDark ? '0d1117' : 'f9fafb';
            const textColor = isDark ? 'e6edf3' : '1a1a1a';

            (window as any).Calendly.initInlineWidget({
                url: `${CALENDLY_URL}?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=${bgColor}&text_color=${textColor}&primary_color=2EE1C7`,
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
    }, [theme]);

    const isDark = theme === 'dark';

    return (
        <div className={`min-h-screen pt-20 relative ${isDark ? 'bg-dark-bg' : 'bg-gray-50'}`}>
            <SEO
                title="Schedule a Demo | Frostrek"
                description="Meet with our team to discover how Frostrek can transform your business with AI-powered automation."
                path="/schedule-demo"
            />
            {!isDark && <CuteBackground />}

            {/* Hero section */}
            <div className="relative z-10 text-center pt-10 sm:pt-16 pb-6 sm:pb-10 px-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 border"
                    style={{
                        background: isDark ? 'rgba(46,225,199,0.08)' : 'rgba(46,225,199,0.1)',
                        borderColor: isDark ? 'rgba(46,225,199,0.2)' : 'rgba(46,225,199,0.3)',
                        color: '#2EE1C7',
                    }}
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    Book Your Demo
                </div>
                <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Let's Build Something{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2EE1C7] to-[#1AB3A0]">
                        Amazing
                    </span>
                </h1>
                <p className={`text-base sm:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Meet with our team to discover how Frostrek can transform your business with AI-powered cold chain automation.
                </p>
            </div>

            {/* Main content */}
            <div className="container mx-auto px-3 sm:px-4 pb-12 sm:pb-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 max-w-7xl mx-auto">

                    {/* Left Column - Company Info (2 cols) */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {/* Info cards */}
                        <div className={`rounded-2xl p-5 sm:p-6 ${
                            isDark
                                ? 'bg-[#0d1117] border border-[#2EE1C7]/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
                                : 'bg-white border border-gray-200/60 shadow-lg shadow-gray-200/30'
                        }`}>
                            <div className="flex flex-col gap-3">
                                <InfoCard icon={Clock} title="Meeting Duration" isDark={isDark}>
                                    <p>30 minutes</p>
                                </InfoCard>
                                <InfoCard icon={MapPin} title="Meeting Location" isDark={isDark}>
                                    <p>Microsoft Teams / Google Meet</p>
                                </InfoCard>
                                <InfoCard icon={CalendarIcon} title="What to Expect" isDark={isDark}>
                                    <ul className="space-y-0.5">
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3 text-[#2EE1C7] flex-shrink-0" />
                                            Product walkthrough
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3 text-[#2EE1C7] flex-shrink-0" />
                                            Q&A session
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <ArrowRight className="w-3 h-3 text-[#2EE1C7] flex-shrink-0" />
                                            Custom solution discussion
                                        </li>
                                    </ul>
                                </InfoCard>
                            </div>
                        </div>

                        {/* Trust badge */}
                        <div className={`rounded-2xl p-5 text-center ${
                            isDark
                                ? 'bg-[#0d1117] border border-[#2EE1C7]/10'
                                : 'bg-white border border-gray-200/60 shadow-lg shadow-gray-200/30'
                        }`}>
                            <p className={`text-xs font-medium uppercase tracking-wider mb-2 ${isDark ? 'text-[#2EE1C7]/60' : 'text-[#2EE1C7]'}`}>
                                Trusted by enterprises
                            </p>
                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                                Join 100+ companies using Frostrek for intelligent cold chain management.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Calendly Widget (3 cols) */}
                    <div className={`lg:col-span-3 rounded-2xl overflow-hidden relative ${
                        isDark
                            ? 'bg-[#0d1117] border border-[#2EE1C7]/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
                            : 'bg-white border border-gray-200/60 shadow-lg shadow-gray-200/30'
                    }`}>
                        {/* Skeleton loading state */}
                        {!widgetReady && (
                            <div className="absolute inset-0 z-10">
                                <CalendarSkeleton isDark={isDark} />
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
                    border-radius: 16px;
                }
            `}</style>
        </div>
    );
};

export default ScheduleDemo;
