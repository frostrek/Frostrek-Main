import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.resolve(__dirname, 'src');
const PUBLIC_DIR = path.resolve(__dirname, 'public');

let modifiedFiles = 0;
let totalReplaced = 0;

// Build a map of all png/jpg/jpeg files in public/ to their relative paths
const imageMap = new Map();

function buildImageMap(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file === 'optimized') continue; // skip the optimized folder itself
            buildImageMap(fullPath);
        } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
            const basename = path.basename(file, path.extname(file));
            // Store mapping: basename -> /path/to/file.ext (relative to public)
            const relPath = '/' + path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/');
            imageMap.set(basename, relPath);
        }
    }
}
buildImageMap(PUBLIC_DIR);

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            processFile(fullPath);
        }
    }
}

function processFile(file) {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content;

    // Match anything ending in .webp
    newContent = newContent.replace(/([a-zA-Z0-9_/-]+)\.webp/gi, (match, basepath) => {
        // e.g. /optimized/chat-green
        const basename = path.basename(basepath);
        
        if (imageMap.has(basename)) {
            totalReplaced++;
            return imageMap.get(basename); // e.g. /icons/chat-green.png
        }
        
        return match;
    });

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        modifiedFiles++;
    }
}

walkDir(SRC_DIR);
console.log(`Successfully reverted ${totalReplaced} remaining .webp references across ${modifiedFiles} files.`);
