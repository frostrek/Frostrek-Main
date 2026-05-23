const fs = require('fs');
const path = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(path, 'utf8');

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

const newHeaderInjection = `                    </div>
                </div>

                {/* Mobile Menu Content (Expands within the pill) */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="w-full"
                        >
                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 flex flex-col gap-0.5 max-h-[calc(100vh-120px)] overflow-y-auto border-t border-[#2D6A4F]/10" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }}>
                                ${navItemsBlock}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>`;

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
