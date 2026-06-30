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
    // Lighthouse replacements:
    ['"/images/ai_agents_white_collar.png"', '"/optimized/ai_agents_white_collar.webp"'],
    ['"/vedashi-info1.jpeg"', '"/optimized/vedashi-info1.webp"'],
    ['"/icons/valuation-green.png"', '"/optimized/valuation-green.webp"'],
    ['"/icons/multivendor-green.png"', '"/optimized/multivendor-green.webp"'],
    ['"/icons/ai-green.png"', '"/optimized/ai-green.webp"'],
    ['"/icons/innovation-green.png"', '"/optimized/innovation-green.webp"'],
    ['"/icons/fintech-yellow.png"', '"/optimized/fintech-yellow.webp"'],
    ['"/icons/manufacturing-lavender.png"', '"/optimized/manufacturing-lavender.webp"'],
    ['"/icons/data-analytics-blue.png"', '"/optimized/data-analytics-blue.webp"'],
    ['"/icons/Voice ai-green.png"', '"/optimized/Voice ai-green.webp"'],
    ['"/icons/architecture-green.png"', '"/optimized/architecture-green.webp"'],
    ['"/icons/ai agents-red.png"', '"/optimized/ai agents-red.webp"'],
    ['"/icons/data-analytics-green.png"', '"/optimized/data-analytics-green.webp"'],
    ['"/icons/machine-learning-lavender-filled.png"', '"/optimized/machine-learning-lavender-filled.webp"'],
    ['"/icons/wallet-green.png"', '"/optimized/wallet-green.webp"'],
    ['"/icons/manufacturing-green.png"', '"/optimized/manufacturing-green.webp"'],
    ['"/icons/chat-green.png"', '"/optimized/chat-green.webp"'],
    ['"/icons/machine-learning-green.png"', '"/optimized/machine-learning-green.webp"'],
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
    // Lighthouse replacements:
    ["'/images/ai_agents_white_collar.png'", "'/optimized/ai_agents_white_collar.webp'"],
    ["'/vedashi-info1.jpeg'", "'/optimized/vedashi-info1.webp'"],
    ["'/icons/valuation-green.png'", "'/optimized/valuation-green.webp'"],
    ["'/icons/multivendor-green.png'", "'/optimized/multivendor-green.webp'"],
    ["'/icons/ai-green.png'", "'/optimized/ai-green.webp'"],
    ["'/icons/innovation-green.png'", "'/optimized/innovation-green.webp'"],
    ["'/icons/fintech-yellow.png'", "'/optimized/fintech-yellow.webp'"],
    ["'/icons/manufacturing-lavender.png'", "'/optimized/manufacturing-lavender.webp'"],
    ["'/icons/data-analytics-blue.png'", "'/optimized/data-analytics-blue.webp'"],
    ["'/icons/Voice ai-green.png'", "'/optimized/Voice ai-green.webp'"],
    ["'/icons/architecture-green.png'", "'/optimized/architecture-green.webp'"],
    ["'/icons/ai agents-red.png'", "'/optimized/ai agents-red.webp'"],
    ["'/icons/data-analytics-green.png'", "'/optimized/data-analytics-green.webp'"],
    ["'/icons/machine-learning-lavender-filled.png'", "'/optimized/machine-learning-lavender-filled.webp'"],
    ["'/icons/wallet-green.png'", "'/optimized/wallet-green.webp'"],
    ["'/icons/manufacturing-green.png'", "'/optimized/manufacturing-green.webp'"],
    ["'/icons/chat-green.png'", "'/optimized/chat-green.webp'"],
    ["'/icons/machine-learning-green.png'", "'/optimized/machine-learning-green.webp'"],
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
