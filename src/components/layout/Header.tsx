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
import FlipText from '../ui/FlipText';




const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const location = useLocation();
    const { theme } = useTheme();
    const ticking = useRef(false);
    const lenis = useLenis();

    useEffect(() => {
        const handleScroll = () => {
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
        setActiveMegaMenu(null);
    }, [location.pathname]);

    return (
        <>
            <header className={cn(
                "fixed left-1/2 -translate-x-1/2 z-[60] transition-[height,background-color,box-shadow,top,width] duration-500 backdrop-blur-xl border w-[92%] sm:w-[95%] max-w-7xl overflow-hidden flex flex-col",
                mobileMenuOpen
                    ? "top-3 sm:top-4 bg-white/95 border-gray-200 shadow-2xl rounded-xl sm:rounded-2xl"
                    : isScrolled
                        ? "top-3 sm:top-4 bg-white/80 border-gray-200 shadow-md rounded-xl sm:rounded-2xl"
                        : "top-4 sm:top-6 bg-transparent border-transparent rounded-xl sm:rounded-2xl"
            )}>
                <div className={cn(
                    "flex items-center justify-between px-4 sm:px-5 md:px-6 w-full shrink-0 transition-all duration-500",
                    isScrolled || mobileMenuOpen ? "h-14 sm:h-16" : "h-16 sm:h-20"
                )}>
                    {/* 1. Logo (Left) */}
                    <Link to="/" className="flex items-center gap-2.5 group min-w-[120px] sm:min-w-[140px] shrink-0">
                        <img src="/optimized/logonew.webp"
                            alt="Frostrek AI"
                            className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-110" width={512} height={512} />
                        <FlipText className="text-xl sm:text-2xl font-black font-sans font-bold text-[#2D6A4F]">
                            frostrek
                        </FlipText>
                    </Link>

                    {/* 2. Desktop Nav (Center) */}
                    <nav className="hidden xl:flex items-center justify-center gap-5 flex-1">
                        {NAV_ITEMS.map((item) => (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.megaMenu && setActiveMegaMenu(item.label)}
                                onMouseLeave={() => item.megaMenu && setActiveMegaMenu(null)}
                            >
                                <Link
                                    to={item.megaMenu ? "#" : item.href}
                                    onClick={(e) => {
                                        if (item.megaMenu) {
                                            e.preventDefault();
                                            setActiveMegaMenu(activeMegaMenu === item.label ? null : item.label);
                                        }
                                    }}
                                    className={cn(
                                        "flex items-center gap-1 text-[15px] font-medium transition-colors py-2 px-4 rounded-xl relative z-10 text-gray-600 hover:text-[#2D6A4F] group",
                                        (location.pathname === item.href || activeMegaMenu === item.label) && "text-[#2D6A4F] font-bold"
                                    )}
                                >
                                    <FlipText>{item.label}</FlipText>
                                    {item.megaMenu && (
                                        <ChevronDown
                                            size={14}
                                            className={cn(
                                                "transition-transform duration-300",
                                                activeMegaMenu === item.label && "rotate-180"
                                            )}
                                        />
                                    )}
                                    {location.pathname === item.href && !item.megaMenu && (
                                        <motion.div
                                            layoutId="navbar-active"
                                            className="absolute inset-0 rounded-xl -z-10 bg-gray-100"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </Link>
                            </div>
                        ))}
                    </nav>

                    {/* 3. CTAs & Mobile Toggle (Right) */}
                    <div className="flex items-center justify-end gap-2 sm:gap-3 xl:min-w-[160px] shrink-0">
                        {/* Desktop CTA */}
                        <Link to="/schedule-demo" className="hidden xl:block">
                            <Button size="sm" className="px-6 py-2.5 text-sm rounded-xl font-medium border-none shadow-sm whitespace-nowrap bg-[#336B55] text-white hover:bg-[#1a2d24] transition-colors">
                                Book a demo
                            </Button>
                        </Link>

                        {/* Mobile Pill CTA */}
                        <Link to="/schedule-demo" className="flex xl:hidden items-center">
                            <div className="px-3 py-2 sm:px-4 sm:py-2 text-[12px] sm:text-xs font-bold uppercase tracking-wider rounded-xl bg-[#2D6A4F] text-white shadow-sm whitespace-nowrap flex items-center justify-center transition-all active:scale-95">
                                Book a demo
                            </div>
                        </Link>

                        {/* Mobile Menu Toggles */}
                        <button
                            className={cn(
                                "xl:hidden p-1 sm:p-2 rounded-lg transition-colors flex-shrink-0",
                                theme === 'dark' ? "text-[#2D6A4F]" : "text-primary"
                            )}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                {/* Mobile Menu Content (Expands like a shutter) */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                            className="w-full"
                        >
                            <div className="scrollbar-minimal px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-col gap-0.5 max-h-[calc(100dvh-120px)] overflow-y-auto border-t border-[#2D6A4F]/10 pointer-events-auto" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
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
                                                        to="#"
                                                        className={cn(
                                                            "font-medium flex-1 py-3 px-3 rounded-xl transition-all duration-200 text-base font-body",
                                                            location.pathname === item.href
                                                                ? "text-[#2D6A4F] bg-[#E8F5EE]"
                                                                : "text-gray-700 hover:text-[#2D6A4F] hover:bg-[#F4FAF7]"
                                                        )}
                                                        onClick={(e) => {
                                                            if (item.megaMenu) {
                                                                e.preventDefault();
                                                                setExpandedMobileItem(
                                                                    expandedMobileItem === item.label ? null : item.label
                                                                );
                                                            } else {
                                                                setMobileMenuOpen(false);
                                                            }
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                    <button
                                                        onClick={() => setExpandedMobileItem(
                                                            expandedMobileItem === item.label ? null : item.label
                                                        )}
                                                        className="p-2.5 rounded-lg text-gray-400 hover:text-[#2D6A4F] hover:bg-[#F4FAF7] transition-all"
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
                                                                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F]/60 px-3 pt-2 pb-1 font-body">
                                                                            {section.title}
                                                                        </p>
                                                                        {section.items.map((subItem) => (
                                                                            <Link
                                                                                key={subItem.name}
                                                                                to={subItem.href}
                                                                                className="flex flex-col py-2 px-3 rounded-lg text-sm text-gray-600 hover:text-[#2D6A4F] hover:bg-[#F4FAF7] transition-all font-body"
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
                                                    "font-medium block py-3 px-3 rounded-xl transition-all duration-200 text-base font-body",
                                                    location.pathname === item.href
                                                        ? "text-[#2D6A4F] bg-[#E8F5EE]"
                                                        : "text-gray-700 hover:text-[#2D6A4F] hover:bg-[#F4FAF7]"
                                                )}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── Mega menu panels: rendered OUTSIDE <header> so fixed positioning is relative to true viewport ── */}
            {/* CSS spec: transform on a parent creates a new containing block, breaking fixed children */}
            <AnimatePresence>
                {NAV_ITEMS.map((item) => {
                    if (!item.megaMenu || activeMegaMenu !== item.label) return null;
                    return (
                        <div
                            key={`mega-${item.label}`}
                            onMouseEnter={() => setActiveMegaMenu(item.label)}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                            className={cn(
                                "fixed left-1/2 -translate-x-1/2 z-[70] pt-2 max-w-[95vw]",
                                isScrolled ? "top-[60px] sm:top-[68px]" : "top-[72px] sm:top-[88px]",
                                item.label === 'Products' ? 'w-[1140px]' : 'w-[960px]'
                            )}
                        >
                            <MegaMenu sections={item.megaMenu} onClose={() => setActiveMegaMenu(null)} />
                        </div>
                    );
                })}
            </AnimatePresence>
            {/* Mobile Menu Backdrop */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[55]"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

        </>
    );
};

export default Header;
