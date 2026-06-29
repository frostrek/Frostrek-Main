import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

// Use forward slashes for glob on Windows
const srcDir = 'src';

// Simple find -> replace pairs for src attributes
const srcReplacements = [
    ['"/chatbot.png"', '"/optimized/chatbot.webp"'],
    ['"/vedashi-logo.png"', '"/optimized/vedashi-logo.webp"'],
    ['"/logonew.png"', '"/optimized/logonew.webp"'],
    ['"/products/vedashi-logo.png"', '"/optimized/vedashi-logo-sm.webp"'],
    ['"/iso.webp"', '"/optimized/iso.webp"'],
    ['"/goodfirms.png"', '"/optimized/goodfirms.webp"'],
    ['"/icons/ai-blue.png"', '"/optimized/ai-blue.webp"'],
    ['"/clutch.png"', '"/optimized/clutch.webp"'],
    ['"/whatsapp.png"', '"/optimized/whatsapp.webp"'],
    ['"/instagram.png"', '"/optimized/instagram.webp"'],
    ['"/linkedin.png"', '"/optimized/linkedin.webp"'],
    ['"/icons/machine-learning-lavender.png"', '"/optimized/machine-learning-lavender.webp"'],
    ['"/gmail.png"', '"/optimized/gmail.webp"'],
    ['"/topDevelopers.webp"', '"/optimized/topDevelopers.webp"'],
    // Single-quoted versions (e.g. in constants.ts)
    ["'/chatbot.png'", "'/optimized/chatbot.webp'"],
    ["'/vedashi-logo.png'", "'/optimized/vedashi-logo.webp'"],
    ["'/logonew.png'", "'/optimized/logonew.webp'"],
    ["'/products/vedashi-logo.png'", "'/optimized/vedashi-logo-sm.webp'"],
    ["'/iso.webp'", "'/optimized/iso.webp'"],
    ["'/goodfirms.png'", "'/optimized/goodfirms.webp'"],
    ["'/icons/ai-blue.png'", "'/optimized/ai-blue.webp'"],
    ["'/clutch.png'", "'/optimized/clutch.webp'"],
    ["'/whatsapp.png'", "'/optimized/whatsapp.webp'"],
    ["'/instagram.png'", "'/optimized/instagram.webp'"],
    ["'/linkedin.png'", "'/optimized/linkedin.webp'"],
    ["'/icons/machine-learning-lavender.png'", "'/optimized/machine-learning-lavender.webp'"],
    ["'/gmail.png'", "'/optimized/gmail.webp'"],
    ["'/topDevelopers.webp'", "'/optimized/topDevelopers.webp'"],
];

const files = globSync('src/**/*.tsx').concat(globSync('src/**/*.ts'));
console.log('Found', files.length, 'files');

let totalModified = 0;

for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    for (const [find, replace] of srcReplacements) {
        if (content.includes(find)) {
            content = content.replaceAll(find, replace);
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        totalModified++;
        console.log('✅ Updated:', filePath);
    }
}

console.log('\n🎉 Modified ' + totalModified + ' files.');
