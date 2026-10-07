import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Sparkles, ArrowLeft } from 'lucide-react';
import SEO from '../components/seo/SEO';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-[100dvh] w-full max-h-[100dvh] overflow-hidden bg-white text-gray-900 flex flex-col justify-between items-center relative font-body select-none">
            <SEO
                title="404 — Page Not Found | Frostrek AI"
                description="Unfortunately you have found an elusive 404 error page. The page you were looking for is no longer here."
                path="/404"
                noindex={true}
            />

            {/* Scope override: hide global floating header & footer, lock page to exactly one viewport */}
            <style>{`
                header { display: none !important; }
                footer { display: none !important; }
                #frosty-widget-root { display: none !important; }
                html, body { overflow: hidden !important; height: 100vh !important; height: 100dvh !important; }
            `}</style>

            {/* ────────────────────── MIDDLE / CONTENT SECTION ────────────────────── */}
            <div className="flex-1 w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center z-10 px-4 py-3 sm:py-6 shrink-0">
                <motion.h1
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="font-sans font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-gray-950 uppercase leading-none mb-2.5 sm:mb-3"
                >
                    AHHHHH! YOU FOUND ME!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
                    className="text-xs sm:text-sm md:text-base text-gray-600 max-w-md sm:max-w-lg mx-auto leading-relaxed mb-3 sm:mb-4 font-medium px-2"
                >
                    The page you're looking for doesn't exist or has moved.
                </motion.p>

                {/* Subtle Dotted Divider Line */}
                <div className="w-full max-w-xs sm:max-w-md border-b border-dashed border-gray-300 mb-3 sm:mb-4" />

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.2 }}
                    className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#2D6A4F] text-white text-xs sm:text-sm font-semibold hover:bg-[#1B4332] shadow-sm transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Take Me Home
                    </Link>

                    <Link
                        to="/audit"
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#E8F5EE] text-[#2D6A4F] border border-[#2D6A4F]/20 text-xs sm:text-sm font-semibold hover:bg-[#D8EFE2] transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Free AI Visibility Audit
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-gray-700 border border-gray-200 text-xs sm:text-sm font-semibold hover:bg-gray-50 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        Go Back
                    </button>
                </motion.div>
            </div>

            {/* ────────────────────── BOTTOM ROBOT VISUAL ────────────────────── */}
            <div className="w-full flex justify-center items-end shrink-0 pb-0 overflow-hidden pointer-events-none select-none">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        damping: 22,
                        stiffness: 140,
                        delay: 0.1
                    }}
                    className="flex justify-center items-end w-full"
                >
                    <picture className="flex justify-center items-end max-w-full">
                        <source srcSet="/404-pagerobo.webp" type="image/webp" />
                        <img
                            src="/404-pagerobo.png"
                            alt="Cute Frostrek AI Robot Peeking on 404 Page"
                            className="w-auto h-[38dvh] sm:h-[44dvh] md:h-[48dvh] lg:h-[50dvh] max-h-[38dvh] sm:max-h-[46dvh] md:max-h-[50dvh] max-w-[96vw] sm:max-w-full object-contain object-bottom block pointer-events-auto transition-transform hover:scale-102 duration-300"
                            width={1030}
                            height={710}
                            loading="eager"
                        />
                    </picture>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;
