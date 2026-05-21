import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import SplitTextReveal from '../ui/SplitTextReveal';

// ─── Exact observe.ai arrow SVG ─────────────────────────────────────────────
const CurlyArrow = ({ className = '' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 84" width="150" height="84" preserveAspectRatio="xMidYMid meet" className={className} aria-hidden fill="none">
        <g transform="matrix(1.203660011291504,0,0,1.203660011291504,78.125,34.75)" opacity="1">
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                <path strokeLinecap="round" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="4" stroke="currentColor" strokeOpacity="1" strokeWidth="4" d="M55.5,31.5 C55.5,31.5 -11.319000244140625,37.178001403808594 -9.857999801635742,-2.484999895095825 C-9.092000007629395,-23.27400016784668 24.405000686645508,-27.20800018310547 29.908000946044922,-5.761000156402588 C31.027999877929688,-1.3949999809265137 32.67499923706055,20.930999755859375 -1.75,24.5 C-31.881999969482422,27.624000549316406 -52.4640007019043,-9.656000137329102 -51.5,-18.334999084472656 C-51.375,-18.834999084472656 -36.25,-9.375 -36.25,-9.375" />
            </g>
            <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                <path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="currentColor" strokeOpacity="1" strokeWidth="4" d="M-59.96900177001953,-3.303999900817871 C-59.96900177001953,-3.303999900817871 -51.46900177001953,-18.304000854492188 -51.46900177001953,-18.304000854492188" />
            </g>
        </g>
    </svg>
);

const COMPARISONS = [
    {
        title: "System Architecture",
        before: "Siloed ERP, WMS, and PLCs running blindly across the factory floor.",
        after: "Unified real-time intelligence platform accessible on a single screen.",
    },
    {
        title: "Financial Visibility",
        before: "Cost-per-unit calculated weeks later at month-end financial reviews.",
        after: "Live cost-per-unit tracking to identify and stop bleeding instantly.",
    },
    {
        title: "Quality Control",
        before: "Manual WhatsApp updates sent long after errors have already occurred.",
        after: "Automated, AI-driven deviation alerts triggering immediately.",
    },
    {
        title: "Customer Engagement",
        before: "Generic chatbots that frustrate customers and require human handoff.",
        after: "Context-aware conversational AI Agents with human-like reasoning.",
    }
];

const ImpactComparison = () => {
    // Unique color system matching light blue, light green, light pink, and light orange
    // The bottom after section is white with high-tech pastel highlights
    const themes = [
        {
            beforeBg: 'bg-[#F0F9FF]',
            beforeBorder: 'border-[#BAE6FD]',
            topLine: 'bg-[#0EA5E9]/20',
            titleColor: 'text-[#0284C7]',
            xIconColor: 'text-[#0EA5E9]',

            arrowHoverColor: 'group-hover:text-[#0EA5E9]',
            arrowBorder: 'border-[#BAE6FD]',

            afterBg: 'bg-white',
            afterBorder: 'border-[#BAE6FD]',
            afterShadow: 'shadow-[0_15px_30px_rgba(14,165,233,0.04)] lg:shadow-sm lg:group-hover:shadow-[0_15px_30px_rgba(14,165,233,0.04)]',
            glowColor: 'bg-[#0EA5E9]/10 lg:bg-[#0EA5E9]/5 lg:group-hover:bg-[#0EA5E9]/10',
            checkIconColor: 'text-[#0EA5E9]',
            labelColor: 'text-[#0EA5E9]',
            afterTextColor: 'text-gray-900'
        },
        {
            beforeBg: 'bg-[#F0FDF4]',
            beforeBorder: 'border-[#BBF7D0]',
            topLine: 'bg-[#10B981]/20',
            titleColor: 'text-[#047857]',
            xIconColor: 'text-[#10B981]',

            arrowHoverColor: 'group-hover:text-[#10B981]',
            arrowBorder: 'border-[#BBF7D0]',

            afterBg: 'bg-white',
            afterBorder: 'border-[#BBF7D0]',
            afterShadow: 'shadow-[0_15px_30px_rgba(16,185,129,0.04)] lg:shadow-sm lg:group-hover:shadow-[0_15px_30px_rgba(16,185,129,0.04)]',
            glowColor: 'bg-[#10B981]/10 lg:bg-[#10B981]/5 lg:group-hover:bg-[#10B981]/10',
            checkIconColor: 'text-[#10B981]',
            labelColor: 'text-[#10B981]',
            afterTextColor: 'text-gray-900'
        },
        {
            beforeBg: 'bg-[#FFF1F2]',
            beforeBorder: 'border-[#FFE4E6]',
            topLine: 'bg-[#FB7185]/20',
            titleColor: 'text-[#BE123C]',
            xIconColor: 'text-[#FB7185]',

            arrowHoverColor: 'group-hover:text-[#FB7185]',
            arrowBorder: 'border-[#FFE4E6]',

            afterBg: 'bg-white',
            afterBorder: 'border-[#FFE4E6]',
            afterShadow: 'shadow-[0_15px_30px_rgba(251,113,133,0.04)] lg:shadow-sm lg:group-hover:shadow-[0_15px_30px_rgba(251,113,133,0.04)]',
            glowColor: 'bg-[#FB7185]/10 lg:bg-[#FB7185]/5 lg:group-hover:bg-[#FB7185]/10',
            checkIconColor: 'text-[#FB7185]',
            labelColor: 'text-[#FB7185]',
            afterTextColor: 'text-gray-900'
        },
        {
            beforeBg: 'bg-[#FFF7ED]',
            beforeBorder: 'border-[#FFEDD5]',
            topLine: 'bg-[#F97316]/20',
            titleColor: 'text-[#C2410C]',
            xIconColor: 'text-[#F97316]',

            arrowHoverColor: 'group-hover:text-[#F97316]',
            arrowBorder: 'border-[#FFEDD5]',

            afterBg: 'bg-white',
            afterBorder: 'border-[#FFEDD5]',
            afterShadow: 'shadow-[0_15px_30px_rgba(249,115,22,0.04)] lg:shadow-sm lg:group-hover:shadow-[0_15px_30px_rgba(249,115,22,0.04)]',
            glowColor: 'bg-[#F97316]/10 lg:bg-[#F97316]/5 lg:group-hover:bg-[#F97316]/10',
            checkIconColor: 'text-[#F97316]',
            labelColor: 'text-[#F97316]',
            afterTextColor: 'text-gray-900'
        }
    ];

    return (
        <section className="py-24 bg-brand-light-bg font-sans overflow-hidden border-y border-[#E6EFE6]/50">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-badge-bg text-brand-badge-text text-xs md:text-sm font-bold tracking-wide mb-6 border border-[#c4e0d4]/50"
                    >
                        <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                        <span className="text-[#2D6A4F] text-xs font-bold uppercase tracking-widest">AI-DRIVEN OUTCOMES</span>
                    </motion.div>

                    <div className="flex flex-col items-center justify-center mb-6">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-5">
                            <SplitTextReveal
                                as="h2"
                                className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] tracking-[-0.01em]"
                                type="chars"
                                stagger={0.03}
                                once={false}
                            >
                                AI-Driven Outcomes
                            </SplitTextReveal>

                            {/* Curly arrow — slides in from left after text */}
                            <motion.div
                                initial={{ opacity: 0, x: -20, rotate: -15 }}
                                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                                className="flex-shrink-0 hidden md:block"
                            >
                                <CurlyArrow className="w-12 h-7 md:w-20 md:h-12 text-[#3D8B6E]/65" />
                            </motion.div>
                        </div>
                        <SplitTextReveal
                            as="h2"
                            className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#2D6A4F] leading-[1.1] tracking-[-0.01em]"
                            type="chars"
                            stagger={0.03}
                            once={false}
                            delay={0.4}
                        >
                            We Deliver
                        </SplitTextReveal>
                    </div>

                    <SplitTextReveal
                        as="p"
                        className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto font-medium"
                        type="words"
                        stagger={0.02}
                        once={false}
                        delay={0.3}
                    >
                        Stop relying on outdated workflows. Here is why enterprise leaders upgrade to Frostrek's AI ecosystem.
                    </SplitTextReveal>
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {COMPARISONS.map((item, i) => {
                        const theme = themes[i % themes.length];

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col group cursor-default"
                            >
                                {/* Before Card */}
                                <div className={`p-4 md:p-6 lg:p-8 rounded-t-2xl md:rounded-t-3xl border border-b-0 relative overflow-hidden flex-1 min-h-[140px] md:min-h-[180px] transition-all duration-300 ${theme.beforeBg} ${theme.beforeBorder}`}>
                                    <div className={`absolute top-0 left-0 w-full h-1 ${theme.topLine}`} />

                                    <div className="mb-4">
                                        <h4 className="text-sm md:text-base lg:text-lg font-bold font-serif mb-1 leading-snug text-black">
                                            {item.title}
                                        </h4>
                                        <div className="flex items-center gap-1 md:gap-1.5 mt-1.5 md:mt-2.5">
                                            <XCircle className={`w-3 h-3 md:w-3.5 md:h-3.5 ${theme.xIconColor}`} />
                                            <span className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${theme.titleColor}`}>The Old Way</span>
                                        </div>
                                    </div>

                                    <p className="text-xs md:text-[14px] font-medium text-gray-600 lg:text-gray-500 leading-relaxed lg:group-hover:text-gray-600 transition-colors duration-300">
                                        {item.before}
                                    </p>
                                </div>

                                {/* Middle Connector Pivot */}
                                <div className="h-0 relative z-10 hidden lg:flex justify-center">
                                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border shadow-[0_4px_10px_rgba(0,0,0,0.02)] flex items-center justify-center -translate-y-4 md:-translate-y-5 group-hover:rotate-90 group-hover:scale-110 transition-all duration-500 ${theme.beforeBorder}`}>
                                        <ArrowRight className={`w-4 h-4 md:w-5 md:h-5 text-gray-300 transition-colors duration-300 ${theme.arrowHoverColor}`} />
                                    </div>
                                </div>

                                {/* After Card */}
                                <div className={`p-4 md:p-6 lg:p-8 rounded-b-2xl md:rounded-b-3xl border relative overflow-hidden flex-1 min-h-[130px] md:min-h-[190px] transition-all duration-500 -translate-y-2 lg:translate-y-0 lg:group-hover:-translate-y-2 ${theme.afterBg} ${theme.afterBorder} ${theme.afterShadow}`}>
                                    {/* Decorative background glow */}
                                    <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-[40px] -mr-12 -mt-12 transition-colors duration-500 ${theme.glowColor}`} />

                                    <div className="flex items-center gap-2 mb-4 relative z-10">
                                        <CheckCircle2 className={`w-3.5 h-3.5 md:w-4 md:h-4 ${theme.checkIconColor}`} />
                                        <span className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${theme.labelColor}`}>With Frostrek</span>
                                    </div>
                                    <h4 className={`text-xs md:text-[16px] font-medium leading-relaxed relative z-10 ${theme.afterTextColor}`}>
                                        {item.after}
                                    </h4>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ImpactComparison;
