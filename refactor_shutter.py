import os
import re

path = 'src/components/layout/Header.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract NAV_ITEMS block inside the old mobile menu
match = re.search(r'\{NAV_ITEMS\.map\(\(item, index\).*?\}\)\)\}', content, re.DOTALL)
if not match:
    print("NAV ITEMS not found!")
    exit(1)
nav_items_block = match.group(0)

# 2. Insert into the header end
idx_end_header = content.find('                    </div>\n                </div>\n\n            </header>')
if idx_end_header == -1:
    idx_end_header = content.find('                    </div>\r\n                </div>\r\n\r\n            </header>')
if idx_end_header == -1:
    idx_end_header = content.rfind('</div>', 0, content.find('</header>'))
    idx_end_header = content.rfind('</div>', 0, idx_end_header)

before_end = content[:idx_end_header]

new_end = f"""                    </div>
                </div>

                {{/* Mobile Menu Content (Expands within the pill) */}}
                <AnimatePresence>
                    {{mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
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

with open(path, 'w', encoding='utf-8') as f:
    f.write(before_end + new_end)
print("Done")
