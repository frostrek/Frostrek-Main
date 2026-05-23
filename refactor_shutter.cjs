const fs = require('fs');
const path = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(path, 'utf8');

// 1. TS Fix
code = code.replace(
    '                                                <div className="flex items-center">\r\n                                                    <Link\r\n                                                        to={item.megaMenu ? "#" : item.href}',
    '                                                <div className="flex items-center">\r\n                                                    <Link\r\n                                                        to="#"'
);
code = code.replace(
    '                                                <div className="flex items-center">\n                                                    <Link\n                                                        to={item.megaMenu ? "#" : item.href}',
    '                                                <div className="flex items-center">\n                                                    <Link\n                                                        to="#"'
);

// 2. Header Classes Fix
const headerOldStart1 = `<header className={cn(
                "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 backdrop-blur-xl rounded-full border w-[92%] sm:w-[95%] max-w-7xl",
                isScrolled
                    ? "top-3 sm:top-4 h-14 sm:h-16 bg-white/80 border-gray-200 shadow-md"
                    : "top-4 sm:top-6 h-16 sm:h-20 bg-transparent border-transparent"
            )}>
                <div className="h-full flex items-center justify-between px-4 sm:px-5 md:px-6">`;
const headerOldStart2 = `<header className={cn(\r\n                "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 backdrop-blur-xl rounded-full border w-[92%] sm:w-[95%] max-w-7xl",\r\n                isScrolled\r\n                    ? "top-3 sm:top-4 h-14 sm:h-16 bg-white/80 border-gray-200 shadow-md"\r\n                    : "top-4 sm:top-6 h-16 sm:h-20 bg-transparent border-transparent"\r\n            )}>\r\n                <div className="h-full flex items-center justify-between px-4 sm:px-5 md:px-6">`;

const headerNewStart = `<header className={cn(
                "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 backdrop-blur-xl border w-[92%] sm:w-[95%] max-w-7xl overflow-hidden flex flex-col",
                mobileMenuOpen 
                    ? "top-3 sm:top-4 bg-white/95 border-gray-200 shadow-2xl rounded-[1.75rem] sm:rounded-[2rem]"
                    : isScrolled
                        ? "top-3 sm:top-4 bg-white/80 border-gray-200 shadow-md rounded-[1.75rem] sm:rounded-[2rem]"
                        : "top-4 sm:top-6 bg-transparent border-transparent rounded-[1.75rem] sm:rounded-[2rem]"
            )}>
                <div className={cn(
                    "flex items-center justify-between px-4 sm:px-5 md:px-6 w-full shrink-0 transition-all duration-500",
                    isScrolled || mobileMenuOpen ? "h-14 sm:h-16" : "h-16 sm:h-20"
                )}>`;

if(code.includes(headerOldStart1)) code = code.replace(headerOldStart1, headerNewStart);
else if (code.includes(headerOldStart2)) code = code.replace(headerOldStart2, headerNewStart);

// 3. Extract the mobile map block
const headerEndMarker = '                    </div>\n                </div>\n\n            </header>';
const headerEndMarker2 = '                    </div>\r\n                </div>\r\n\r\n            </header>';
const actualMarker = code.includes(headerEndMarker) ? headerEndMarker : headerEndMarker2;

const startMap = '{NAV_ITEMS.map((item, index) => (';
const endMapStr = '                                ))}';
const mapStartIndex = code.indexOf(startMap);
const mapEndIndex = code.indexOf(endMapStr, mapStartIndex) + endMapStr.length;
const navItemsBlock = code.substring(mapStartIndex, mapEndIndex);

const oldMenuStartStr = '{/* Mobile Menu - Rendered outside header as fixed overlay */}';
const oldMenuEndStr = '            </AnimatePresence>\r\n        </>\r\n    );\r\n};\r\n\r\nexport default Header;';
const oldMenuEndStr2 = '            </AnimatePresence>\n        </>\n    );\n};\n\nexport default Header;';

const oldStart = code.indexOf(oldMenuStartStr);
const actualEndStr = code.includes(oldMenuEndStr) ? oldMenuEndStr : oldMenuEndStr2;
const oldEnd = code.indexOf(actualEndStr) + actualEndStr.length;

if(oldStart === -1 || oldEnd < oldStart) {
    console.error("Could not find old menu block");
    process.exit(1);
}

const codeBeforeOldMenu = code.substring(0, oldStart);

// SHUTTER CHANGE: opacity removed from initial/animate/exit!
const newHeaderInjection = `                    </div>
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
                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-col gap-0.5 max-h-[calc(100vh-120px)] overflow-y-auto border-t border-[#2D6A4F]/10" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
                                ${navItemsBlock}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── Mega menu panels ── */}
            <AnimatePresence>
                {NAV_ITEMS.map((item) => {
                    if (!item.megaMenu || activeMegaMenu !== item.label) return null;
                    return (
                        <div
                            key={\`mega-\${item.label}\`}
                            onMouseEnter={() => setActiveMegaMenu(item.label)}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                            className={cn(
                                "fixed left-1/2 -translate-x-1/2 z-[70] pt-2 max-w-[95vw]",
                                isScrolled ? "top-[60px] sm:top-[68px]" : "top-[72px] sm:top-[88px]",
                                item.label === 'Products' ? 'w-[1140px]' : 'w-[720px]'
                            )}
                        >
                            <MegaMenu sections={item.megaMenu} onClose={() => setActiveMegaMenu(null)} />
                        </div>
                    );
                })}
            </AnimatePresence>`;

let newCode = codeBeforeOldMenu.replace(actualMarker, newHeaderInjection);

newCode += `            {/* Mobile Menu Backdrop */}
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
`;

fs.writeFileSync(path, newCode);
console.log("Done refactoring.");
