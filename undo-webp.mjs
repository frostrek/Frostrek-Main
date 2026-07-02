import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');
const PUBLIC_DIR = path.resolve('public');

let modifiedFiles = 0;
let totalReplaced = 0;

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

    // Match any string ending in .webp that looks like a path
    newContent = newContent.replace(/([a-zA-Z0-9_/-]+)\.webp/gi, (match, basepath) => {
        const relativePath = basepath.startsWith('/') ? basepath.slice(1) : basepath;
        const possibleExtensions = ['.png', '.jpg', '.jpeg'];
        
        for (const ext of possibleExtensions) {
            const checkPath = path.join(PUBLIC_DIR, relativePath + ext);
            if (fs.existsSync(checkPath)) {
                totalReplaced++;
                return `${basepath}${ext}`;
            }
        }
        return match;
    });

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        modifiedFiles++;
    }
}

walkDir(SRC_DIR);
console.log(`Successfully reverted ${totalReplaced} .webp references across ${modifiedFiles} files.`);

