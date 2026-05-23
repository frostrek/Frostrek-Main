import os
import re

path = 'src/components/layout/Header.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

header_old = """            <header className={cn(
                "fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 backdrop-blur-xl rounded-full border w-[92%] sm:w-[95%] max-w-7xl",
                isScrolled
                    ? "top-3 sm:top-4 h-14 sm:h-16 bg-white/80 border-gray-200 shadow-md"
                    : "top-4 sm:top-6 h-16 sm:h-20 bg-transparent border-transparent"
            )}>
                <div className="h-full flex items-center justify-between px-4 sm:px-5 md:px-6">"""

header_new = """            <header className={cn(
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
                )}>"""

if header_old in content:
    content = content.replace(header_old, header_new)
else:
    print("Header block 1 not found! Trying with CRLF/LF variations.")
    # More robust replacement
    idx_start = content.find('<header className={cn(')
    idx_end = content.find('                    {/* 1. Logo (Left) */}')
    if idx_start != -1 and idx_end != -1:
        content = content[:idx_start] + header_new + "\n" + content[idx_end:]

match = re.search(r'\{NAV_ITEMS\.map\(\(item, index\).*?\}\)\)\}', content, re.DOTALL)
if not match:
    print("NAV ITEMS not found!")
    exit(1)
nav_items_block = match.group(0)

# Replace the old ending
idx = content.find('                    </div>\n                </div>\n\n            </header>')
if idx == -1:
    idx = content.find('                    </div>\r\n                </div>\r\n\r\n            </header>')
if idx == -1:
    # Just find </header> and the two preceding </div>
    idx = content.rfind('</div>', 0, content.find('</header>'))
    idx = content.rfind('</div>', 0, idx)

before_end = content[:idx]

new_end = f"""                    </div>
                </div>

                {{/* Mobile Menu Content (Expands within the pill) */}}
                <AnimatePresence>
                    {{mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-full"
                        >
                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-col gap-0.5 max-h-[calc(100vh-120px)] overflow-y-auto border-t border-[#2D6A4F]/10" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
                                {nav_items_block}
                            </div>
                        </motion.div>
                    )}}
                </AnimatePresence>
            </header>

            {{/* ── Mega menu panels: rendered OUTSIDE <header> so fixed positioning is relative to true viewport ── */}}
            <AnimatePresence>
                {{NAV_ITEMS.map((item) => {{
                    if (!item.megaMenu || activeMegaMenu !== item.label) return null;
                    return (
                        <div
                            key={{`mega-${{item.label}}`}}
                            onMouseEnter={{() => setActiveMegaMenu(item.label)}}
                            onMouseLeave={{() => setActiveMegaMenu(null)}}
                            className={{cn(
                                "fixed left-1/2 -translate-x-1/2 z-[70] pt-2 max-w-[95vw]",
                                isScrolled ? "top-[60px] sm:top-[68px]" : "top-[72px] sm:top-[88px]",
                                item.label === 'Products' ? 'w-[1140px]' : 'w-[720px]'
                            )}}
                        >
                            <MegaMenu sections={{item.megaMenu}} onClose={{() => setActiveMegaMenu(null)}} />
                        </div>
                    );
                }})}}
            </AnimatePresence>

            {{/* Mobile Menu Backdrop */}}
            <AnimatePresence>
                {{mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[55]"
                        onClick={{() => setMobileMenuOpen(false)}}
                    />
                )}}
            </AnimatePresence>
        </>
    );
}};

export default Header;
"""

final_content = before_end + new_end

final_content = final_content.replace('to={item.megaMenu ? "#" : item.href}', 'to="#"')

with open(path, 'w', encoding='utf-8') as f:
    f.write(final_content)
print("Done")
