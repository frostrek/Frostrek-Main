const fs = require('fs');
const path = 'src/components/layout/Header.tsx';
let content = fs.readFileSync(path, 'utf8');

const headerStartRegex = /<header className=\{cn\([\s\S]*?"top-4 sm:top-6 h-16 sm:h-20 bg-transparent border-transparent"[\s\S]*?\)\}>\s*<div className="h-full flex items-center justify-between px-4 sm:px-5 md:px-6">/;

const newHeaderStart = `<header className={cn(
                "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 backdrop-blur-xl border w-[92%] sm:w-[95%] max-w-7xl overflow-hidden flex flex-col",
                mobileMenuOpen 
                    ? "top-3 sm:top-4 bg-white/95 border-gray-200 shadow-2xl rounded-[1.5rem] sm:rounded-[2rem]"
                    : isScrolled
                        ? "top-3 sm:top-4 bg-white/80 border-gray-200 shadow-md rounded-full"
                        : "top-4 sm:top-6 bg-transparent border-transparent rounded-full"
            )}>
                <div className={cn(
                    "flex items-center justify-between px-4 sm:px-5 md:px-6 w-full shrink-0 transition-all duration-500",
                    isScrolled || mobileMenuOpen ? "h-14 sm:h-16" : "h-16 sm:h-20"
                )}>`;

content = content.replace(headerStartRegex, newHeaderStart);

const navItemsRegex = /\{NAV_ITEMS\.map\(\(item, index\) => \([\s\S]*?\}\)\)\}\s*<\/div>/;
const navItemsMatch = content.match(navItemsRegex);
if (!navItemsMatch) {
    console.error("Could not find NAV_ITEMS logic.");
    process.exit(1);
}
const navItemsBlock = navItemsMatch[0];

const oldMobileMenuRegex = /\/\* Mobile Menu - Rendered outside header as fixed overlay \*\/[\s\S]*?(?=<\/AnimatePresence>\s*<\/>\s*\);\s*\}\s*;\s*export default Header;)/;
content = content.replace(oldMobileMenuRegex, "");

const headerEndRegex = /<\/div>\s*<\/header>/;
const newHeaderEnd = `</div>
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-full"
                        >
                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-col gap-0.5 max-h-[calc(100vh-120px)] overflow-y-auto border-t border-gray-100/50" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
                                ${navItemsBlock}
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

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
                )}`;

content = content.replace(headerEndRegex, newHeaderEnd);

fs.writeFileSync(path, content);
console.log("Header.tsx refactored successfully.");
