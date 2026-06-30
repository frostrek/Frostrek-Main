import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve('public');
const OPTIMIZED_DIR = path.join(PUBLIC_DIR, 'optimized');

// Ensure the optimized directory exists
if (!fs.existsSync(OPTIMIZED_DIR)) {
    fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

// Map of source images to target dimensions
const IMAGES_TO_OPTIMIZE = {
    // Massive About page photos (displayed around 230x173, so let's render 460x346 for retina 2x)
    'FrostrekTeam2.png': { width: 460, height: 346, fit: 'cover' },
    'office1.png': { width: 460, height: 346, fit: 'cover' },
    'office2.jpeg': { width: 460, height: 346, fit: 'cover' },
    'office5.jpeg': { width: 460, height: 346, fit: 'cover' },
    
    // Icons (displayed at 40x40, so 80x80 for retina)
    'icons/innovation.png': { width: 80, height: 80, fit: 'contain' },
    'icons/custom dev.png': { width: 80, height: 80, fit: 'contain' },
    'icons/data-analytics.png': { width: 80, height: 80, fit: 'contain' },
    'icons/architecture.png': { width: 80, height: 80, fit: 'contain' },
    'icons/lightning.png': { width: 80, height: 80, fit: 'contain' },
    'icons/machine-learning.png': { width: 80, height: 80, fit: 'contain' }
};

async function optimizeImages() {
    let totalSaved = 0;

    for (const [relativePath, options] of Object.entries(IMAGES_TO_OPTIMIZE)) {
        const sourcePath = path.join(PUBLIC_DIR, relativePath);
        
        // Extract filename without extension, replace spaces with hyphens
        const basename = path.basename(relativePath, path.extname(relativePath)).replace(/\s+/g, '-');
        const targetFilename = `${basename}.webp`;
        const targetPath = path.join(OPTIMIZED_DIR, targetFilename);

        try {
            if (!fs.existsSync(sourcePath)) {
                console.warn(`⚠️ Source file missing: ${relativePath}`);
                continue;
            }

            const sourceStats = fs.statSync(sourcePath);
            const sourceSize = sourceStats.size;

            await sharp(sourcePath)
                .resize({
                    width: options.width,
                    height: options.height,
                    fit: options.fit,
                    background: { r: 0, g: 0, b: 0, alpha: 0 } // Transparent background for icons
                })
                .webp({ quality: 80, effort: 6 })
                .toFile(targetPath);

            const targetStats = fs.statSync(targetPath);
            const targetSize = targetStats.size;

            const saved = sourceSize - targetSize;
            totalSaved += saved;

            const savedPercentage = ((saved / sourceSize) * 100).toFixed(1);
            console.log(`✅ Optimized ${relativePath} -> ${targetFilename} | Saved ${(saved / 1024).toFixed(1)} KiB (${savedPercentage}%)`);

        } catch (error) {
            console.error(`❌ Failed to optimize ${relativePath}:`, error);
        }
    }

    console.log(`\n🎉 Total savings: ${(totalSaved / 1024).toFixed(1)} KiB (${(totalSaved / 1024 / 1024).toFixed(2)} MB)`);
}

optimizeImages();
