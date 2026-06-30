import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
const outputDir = path.join(publicDir, 'optimized');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Images to optimize: [source, targetWidth, targetHeight, outputName]
// Target sizes are 2× display dimensions for retina
const images = [
    { src: 'chatbot.png',                        w: 160, h: 160, out: 'chatbot.webp' },
    { src: 'vedashi-logo.png',                   w: 230, h: 80,  out: 'vedashi-logo.webp' },
    { src: 'logonew.png',                         w: 90,  h: 90,  out: 'logonew.webp' },
    { src: 'products/vedashi-logo.png',           w: 80,  h: 68,  out: 'vedashi-logo-sm.webp' },
    { src: 'iso.webp',                            w: 100, h: 100, out: 'iso.webp' },
    { src: 'goodfirms.png',                       w: 262, h: 70,  out: 'goodfirms.webp' },
    { src: 'icons/ai-blue.png',                   w: 70,  h: 70,  out: 'ai-blue.webp' },
    { src: 'clutch.png',                          w: 172, h: 70,  out: 'clutch.webp' },
    { src: 'whatsapp.png',                        w: 60,  h: 60,  out: 'whatsapp.webp' },
    { src: 'instagram.png',                       w: 60,  h: 60,  out: 'instagram.webp' },
    { src: 'linkedin.png',                        w: 60,  h: 60,  out: 'linkedin.webp' },
    { src: 'icons/machine-learning-lavender.png', w: 70,  h: 70,  out: 'machine-learning-lavender.webp' },
    { src: 'gmail.png',                           w: 80,  h: 80,  out: 'gmail.webp' },
    { src: 'topDevelopers.webp',                  w: 270, h: 70,  out: 'topDevelopers.webp' },
    // Lighthouse report additions:
    { src: 'images/ai_agents_white_collar.png',  w: 700, h: 700, out: 'ai_agents_white_collar.webp' },
    { src: 'vedashi-info1.jpeg',                 w: 714, h: 700, out: 'vedashi-info1.webp' },
    { src: 'icons/valuation-green.png',          w: 128, h: 128, out: 'valuation-green.webp' },
    { src: 'icons/multivendor-green.png',        w: 128, h: 128, out: 'multivendor-green.webp' },
    { src: 'icons/ai-green.png',                 w: 128, h: 128, out: 'ai-green.webp' },
    { src: 'icons/innovation-green.png',         w: 128, h: 128, out: 'innovation-green.webp' },
    { src: 'icons/fintech-yellow.png',           w: 128, h: 128, out: 'fintech-yellow.webp' },
    { src: 'icons/manufacturing-lavender.png',   w: 128, h: 128, out: 'manufacturing-lavender.webp' },
    { src: 'icons/data-analytics-blue.png',      w: 128, h: 128, out: 'data-analytics-blue.webp' },
    { src: 'icons/Voice ai-green.png',           w: 128, h: 128, out: 'Voice ai-green.webp' },
    { src: 'icons/architecture-green.png',       w: 128, h: 128, out: 'architecture-green.webp' },
    { src: 'icons/ai agents-red.png',            w: 128, h: 128, out: 'ai agents-red.webp' },
    { src: 'icons/data-analytics-green.png',     w: 128, h: 128, out: 'data-analytics-green.webp' },
    { src: 'icons/machine-learning-lavender-filled.png', w: 128, h: 128, out: 'machine-learning-lavender-filled.webp' },
    { src: 'icons/wallet-green.png',             w: 128, h: 128, out: 'wallet-green.webp' },
    { src: 'icons/manufacturing-green.png',      w: 128, h: 128, out: 'manufacturing-green.webp' },
    { src: 'icons/chat-green.png',               w: 128, h: 128, out: 'chat-green.webp' },
    { src: 'icons/machine-learning-green.png',   w: 128, h: 128, out: 'machine-learning-green.webp' },
];

let totalSavedBytes = 0;

for (const img of images) {
    const inputPath = path.join(publicDir, img.src);
    const outputPath = path.join(outputDir, img.out);

    if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  SKIP: ${img.src} not found`);
        continue;
    }

    const originalSize = fs.statSync(inputPath).size;

    try {
        await sharp(inputPath)
            .resize(img.w, img.h, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 65 })
            .toFile(outputPath);

        const newSize = fs.statSync(outputPath).size;
        const saved = originalSize - newSize;
        totalSavedBytes += saved;

        console.log(
            `✅ ${img.src.padEnd(40)} ${(originalSize / 1024).toFixed(1).padStart(8)} KiB → ${(newSize / 1024).toFixed(1).padStart(6)} KiB  (saved ${(saved / 1024).toFixed(1)} KiB)`
        );
    } catch (err) {
        console.error(`❌ Error processing ${img.src}:`, err.message);
    }
}

console.log(`\n🎉 Total saved: ${(totalSavedBytes / 1024).toFixed(1)} KiB (${(totalSavedBytes / 1024 / 1024).toFixed(2)} MiB)`);
