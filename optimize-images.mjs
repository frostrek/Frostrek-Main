import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import sizeOf from 'image-size';

const srcDir = path.resolve('src');
const publicDir = path.resolve('public');

const files = globSync(`${srcDir}/**/*.tsx`);
let modifiedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Process <img ... />
    // Regex that strictly looks for the closing slash of the img tag
    const imgRegex = /<img([\s\S]*?)\/>/g;
    
    content = content.replace(imgRegex, (match, attrs) => {
        let newAttrs = attrs.trim();
        
        // 1. loading="lazy"
        const isAboveFold = file.includes('HeroSection') || file.includes('Header') || file.includes('MegaMenu');
        if (!isAboveFold && !newAttrs.includes('loading=')) {
            newAttrs += ' loading="lazy"';
        }
        
        // 2. Extract static src to get dimensions
        const srcMatch = newAttrs.match(/src=["']([^"']+)["']/);
        let width = null;
        let height = null;
        
        if (srcMatch && srcMatch[1]) {
            const imgSrc = srcMatch[1];
            if (imgSrc.startsWith('/')) {
                try {
                    const imgPath = path.join(publicDir, imgSrc);
                    if (fs.existsSync(imgPath)) {
                        const dimensions = sizeOf(imgPath);
                        width = dimensions.width;
                        height = dimensions.height;
                    }
                } catch (e) {}
            }
        }
        
        // 3. Fallback for dynamic sources
        if (!width || !height) {
            width = 512;
            height = 512;
        }
        
        // Remove old width/height if we already added them during the corrupted pass
        newAttrs = newAttrs.replace(/\s+width=\{\d+\}/, '');
        newAttrs = newAttrs.replace(/\s+height=\{\d+\}/, '');
        
        // Add width and height
        if (!newAttrs.includes('width=')) {
            newAttrs += ` width={${width}}`;
        }
        if (!newAttrs.includes('height=')) {
            newAttrs += ` height={${height}}`;
        }
        
        return `<img ${newAttrs} />`;
    });
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Successfully modified ${modifiedCount} files.`);
