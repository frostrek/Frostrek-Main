import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../utils/constants';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import MegaMenu from './MegaMenu';
import { useTheme } from '../../context/ThemeContext';


const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const { theme } = useTheme();
    const ticking = useRef(false);

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


    return (
        <header className={cn(
            "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 backdrop-blur-xl rounded-full border w-[95%] max-w-7xl",
            isScrolled
                ? "top-4 h-16 bg-black/40 border-[#2EE1C7]/50 shadow-[0_8px_32px_rgba(46,225,199,0.15)]"
                : "top-6 h-20 bg-black/20 border-[#2EE1C7]/30"
        )}>
            <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
                {/* 1. Logo (Left) */}
                <Link to="/" className="flex items-center gap-2 group min-w-[140px]">
                    <img
                        src="/logo.png"
                        alt="Frostrek"
                        className="h-10 w-auto object-contain"
                    />
                    <span className="text-2xl font-bold font-sans tracking-tight text-white">
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
                        "xl:hidden p-2 transition-colors",
                        theme === 'dark' ? "text-dark-text" : "text-primary"
                    )}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "xl:hidden absolute top-full left-1/2 -translate-x-1/2 w-[95%] max-w-7xl border shadow-xl z-50 backdrop-blur-xl bg-black/90 border-[#2EE1C7]/50 rounded-2xl mt-4 overflow-hidden"
                        )}
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
                            {NAV_ITEMS.map((item) => (
                                <div key={item.label}>
                                    <Link
                                        to={item.href}
                                        className={cn(
                                            "font-medium block py-2 border-b last:border-0",
                                            theme === 'dark' ? "text-dark-text border-dark-accent/20 hover:text-dark-accent" : "text-primary border-gray-100"
                                        )}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                            <div className="mt-4 flex flex-col gap-3">
                                <Link to="/schedule-demo" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className={cn(
                                        "w-full justify-center text-black font-bold",
                                        theme === 'dark' ? "bg-dark-accent" : "bg-[#2EE1C7]"
                                    )}>
                                        Request Demo
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
};

export default Header;
