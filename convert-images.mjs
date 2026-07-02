/**
 * Bulk image optimization script
 * Converts large PNG/JPG images in /public to WebP format
 * Uses sharp (already in devDependencies)
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const PUBLIC_DIR = './public';
const MIN_SIZE_KB = 50; // Only convert files > 50KB

// Files to skip (already optimized or needed in original format)
const SKIP_FILES = new Set([
  'logonew.png',       // favicon - keep as PNG
  'logo.png',          // og:image - keep as PNG for compatibility
  'googleae3090eeea2c3c2e.html',
]);

async function convertImages() {
  const files = await readdir(PUBLIC_DIR);
  const results = [];

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    if (SKIP_FILES.has(file)) continue;

    const filePath = join(PUBLIC_DIR, file);
    const fileStat = await stat(filePath);
    const sizeKB = fileStat.size / 1024;

    if (sizeKB < MIN_SIZE_KB) continue;

    const webpName = basename(file, ext) + '.webp';
    const webpPath = join(PUBLIC_DIR, webpName);

    try {
      const info = await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      const savedKB = sizeKB - (info.size / 1024);
      const savedPct = ((savedKB / sizeKB) * 100).toFixed(1);
      results.push({
        original: file,
        webp: webpName,
        originalKB: sizeKB.toFixed(0),
        webpKB: (info.size / 1024).toFixed(0),
        savedPct: savedPct + '%'
      });
      console.log(`✅ ${file} (${sizeKB.toFixed(0)}KB) → ${webpName} (${(info.size / 1024).toFixed(0)}KB) — saved ${savedPct}%`);
    } catch (err) {
      console.error(`❌ ${file}: ${err.message}`);
    }
  }

  console.log(`\n📊 Converted ${results.length} images`);
  console.log(`\n📝 File mapping for reference updates:`);
  results.forEach(r => {
    console.log(`   "${r.original}" → "${r.webp}"`);
  });
}

convertImages();
