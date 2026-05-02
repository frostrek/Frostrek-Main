import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../utils/constants';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import MegaMenu from './MegaMenu';
import { useTheme } from '../../context/ThemeContext';
import { useLenis } from '../providers/SmoothScrollProvider';


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
    const location = useLocation();
    const { theme } = useTheme();
    const ticking = useRef(false);
    const lenis = useLenis();

    useEffect(() => {
        const handleScroll = () => {
            // Throttle scroll events using requestAnimationFrame
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll AND stop Lenis when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
            lenis?.stop();
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            lenis?.start();
        };
    }, [mobileMenuOpen, lenis]);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        setExpandedMobileItem(null);
    }, [location.pathname]);


    return (
        <>
            <header className={cn(
                "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 backdrop-blur-xl rounded-full border w-[92%] sm:w-[95%] max-w-7xl",
                isScrolled
                    ? "top-3 sm:top-4 h-14 sm:h-16 bg-black/40 border-[#2EE1C7]/50 shadow-[0_8px_32px_rgba(46,225,199,0.15)]"
                    : "top-4 sm:top-6 h-16 sm:h-20 bg-black/20 border-[#2EE1C7]/30"
            )}>
                <div className="h-full flex items-center justify-between px-4 sm:px-5 md:px-6">
                    {/* 1. Logo (Left) */}
                    <Link to="/" className="flex items-center gap-2 group min-w-[120px] sm:min-w-[140px] shrink-0">
                        <img
                            src="/logo.png"
                            alt="Frostrek"
                            className="h-8 sm:h-10 w-auto object-contain"
                        />
                        <span className="text-xl sm:text-2xl font-bold font-sans tracking-tight text-white">
                            Frostrek
                        </span>
                    </Link>

                    {/* 2. Desktop Nav (Center) */}
                    <nav className="hidden xl:flex items-center justify-center gap-5 flex-1">
                        {NAV_ITEMS.map((item) => (
                            <div key={item.label} className="relative group">
                                <Link
                                    to={item.href}
                                    className={cn(
                                        "flex items-center gap-1 text-sm font-medium transition-colors py-2 px-4 rounded-full relative z-10",
                                        theme === 'dark'
                                            ? "text-gray-300 hover:text-white"
                                            : "text-background hover:text-primary",
                                        location.pathname === item.href && (theme === 'dark' ? "text-[#2EE1C7]" : "text-primary font-bold")
                                    )}
                                >
                                    {item.label}
                                    {item.megaMenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                                    {location.pathname === item.href && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className={cn(
                                                "absolute inset-0 rounded-full -z-10",
                                                theme === 'dark' ? "bg-[#2EE1C7]/15" : "bg-[#2EE1C7]"
                                            )}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </Link>

                                {/* Mega Menu */}
                                {item.megaMenu && (
                                    <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[600px]">
                                        <MegaMenu sections={item.megaMenu} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* 3. CTAs (Right) */}
                    <div className="hidden xl:flex items-center justify-end gap-3 min-w-[160px] shrink-0">
                        <Link to="/schedule-demo">
                            <Button size="sm" className={cn(
                                "px-6 text-sm rounded-full font-semibold border-none shadow-md whitespace-nowrap",
                                theme === 'dark'
                                    ? "bg-dark-accent text-black hover:bg-dark-accent/90"
                                    : "bg-background text-black"
                            )}>
                                Book a Demo
                            </Button>
                        </Link>

                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className={cn(
                            "xl:hidden p-2 rounded-lg transition-colors flex-shrink-0 ml-2",
                            theme === 'dark' ? "text-dark-text" : "text-primary"
                        )}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu - Rendered outside header as fixed overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Dark backdrop overlay - covers entire screen */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[55]"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu panel - fixed below header */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="fixed top-[72px] sm:top-[88px] left-3 right-3 sm:left-4 sm:right-4 z-[58] border shadow-2xl backdrop-blur-xl bg-black/95 border-[#2EE1C7]/40 rounded-2xl overflow-hidden"
                            onWheel={(e) => e.stopPropagation()}
                            onTouchMove={(e) => e.stopPropagation()}
                            style={{ overscrollBehavior: 'contain' }}
                        >
                            <div className="px-5 py-5 sm:px-6 sm:py-6 flex flex-col gap-0.5 max-h-[calc(100vh-100px)] overflow-y-auto" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
                                {NAV_ITEMS.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.04, duration: 0.2 }}
                                    >
                                        {/* Nav item with optional expandable mega menu */}
                                        {item.megaMenu ? (
                                            <div>
                                                <div className="flex items-center">
                                                    <Link
                                                        to={item.href}
                                                        className={cn(
                                                            "font-medium flex-1 py-3 px-3 rounded-xl transition-all duration-200 text-base",
                                                            location.pathname === item.href
                                                                ? "text-[#2EE1C7] bg-[#2EE1C7]/10"
                                                                : "text-gray-200 hover:text-white hover:bg-white/5"
                                                        )}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                    <button
                                                        onClick={() => setExpandedMobileItem(
                                                            expandedMobileItem === item.label ? null : item.label
                                                        )}
                                                        className="p-2.5 rounded-lg text-gray-400 hover:text-[#2EE1C7] hover:bg-white/5 transition-all"
                                                        aria-label={`Expand ${item.label}`}
                                                    >
                                                        <motion.div
                                                            animate={{ rotate: expandedMobileItem === item.label ? 90 : 0 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            <ChevronRight size={18} />
                                                        </motion.div>
                                                    </button>
                                                </div>

                                                {/* Expandable sub-items */}
                                                <AnimatePresence>
                                                    {expandedMobileItem === item.label && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pl-4 pr-2 pb-2 space-y-0.5">
                                                                {item.megaMenu.map((section) => (
                                                                    <div key={section.title}>
                                                                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#2EE1C7]/60 px-3 pt-2 pb-1">
                                                                            {section.title}
                                                                        </p>
                                                                        {section.items.map((subItem) => (
                                                                            <Link
                                                                                key={subItem.name}
                                                                                to={subItem.href}
                                                                                className="flex flex-col py-2 px-3 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                                                                                onClick={() => setMobileMenuOpen(false)}
                                                                            >
                                                                                <span className="font-medium">{subItem.name}</span>
                                                                                <span className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{subItem.desc}</span>
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                to={item.href}
                                                className={cn(
                                                    "font-medium block py-3 px-3 rounded-xl transition-all duration-200 text-base",
                                                    location.pathname === item.href
                                                        ? "text-[#2EE1C7] bg-[#2EE1C7]/10"
                                                        : "text-gray-200 hover:text-white hover:bg-white/5"
                                                )}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                                <motion.div
                                    className="mt-3 pt-3 border-t border-white/10"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.2 }}
                                >
                                    <Link to="/schedule-demo" onClick={() => setMobileMenuOpen(false)}>
                                        <Button className={cn(
                                            "w-full justify-center text-black font-bold rounded-xl py-3 text-base",
                                            theme === 'dark' ? "bg-dark-accent" : "bg-[#2EE1C7]"
                                        )}>
                                            Request Demo
                                        </Button>
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
