const fs = require('fs');
const path = 'src/components/layout/Header.tsx';
let code = fs.readFileSync(path, 'utf8');

const markerStart = '{/* Mobile Menu - Rendered outside header as fixed overlay */}';
const markerEnd = '                )}\r\n            </AnimatePresence>\r\n        </>\r\n    );\r\n};\r\n\r\nexport default Header;';
const markerEnd2 = '                )}\n            </AnimatePresence>\n        </>\n    );\n};\n\nexport default Header;';

let startIndex = code.indexOf(markerStart);
let endIndex = code.indexOf(markerEnd);
let actualEnd = markerEnd;

if (endIndex === -1) {
    endIndex = code.indexOf(markerEnd2);
    actualEnd = markerEnd2;
}

if (startIndex !== -1 && endIndex !== -1) {
    // Delete everything from markerStart up to but excluding the closing fragment tags
    const before = code.substring(0, startIndex);
    // Include the closing tags
    const after = `        </>
    );
};

export default Header;
`;
    fs.writeFileSync(path, before + after);
    console.log("Successfully removed old menu block!");
} else {
    console.log("Markers not found.");
    if (startIndex === -1) console.log("Start marker missing.");
    if (endIndex === -1) console.log("End marker missing.");
}
