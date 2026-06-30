import fs from 'fs';
import { globSync } from 'glob';

// Map: original image path -> [optimized path, width, height]
const imageReplacements = {
    '/FrostrekTeam2.png': ['/optimized/FrostrekTeam2.webp', 460, 346],
    '/office1.png': ['/optimized/office1.webp', 460, 346],
    '/office2.jpeg': ['/optimized/office2.webp', 460, 346],
    '/office5.jpeg': ['/optimized/office5.webp', 460, 346],
    '/icons/innovation.png': ['/optimized/innovation.webp', 80, 80],
    '/icons/custom dev.png': ['/optimized/custom-dev.webp', 80, 80],
    '/icons/data-analytics.png': ['/optimized/data-analytics.webp', 80, 80],
    '/icons/architecture.png': ['/optimized/architecture.webp', 80, 80],
    '/icons/lightning.png': ['/optimized/lightning.webp', 80, 80],
    '/icons/machine-learning.png': ['/optimized/machine-learning.webp', 80, 80]
};

const files = globSync('src/**/*.{tsx,ts}');
let totalModified = 0;

for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    for (const [origPath, [newPath, w, h]] of Object.entries(imageReplacements)) {
        // Replace exact src strings (both single and double quotes)
        if (content.includes(`"${origPath}"`)) {
            content = content.replaceAll(`"${origPath}"`, `"${newPath}"`);
        }
        if (content.includes(`'${origPath}'`)) {
            content = content.replaceAll(`'${origPath}'`, `'${newPath}'`);
        }
        
        // Replace width={512} height={512} near the new optimized image reference if it's an <img> tag
        // Since we just replaced origPath with newPath, we look for newPath
        if (content.includes(newPath)) {
            const escapedPath = newPath.replace(/\//g, '\\/').replace(/\./g, '\\.');
            
            // src="..." width={512} height={512}
            const regex1 = new RegExp(`(src="${escapedPath}"[^>]*?)width=\\{512\\}([^>]*?)height=\\{512\\}`, 'g');
            content = content.replace(regex1, `$1width={${w}}$2height={${h}}`);

            // src="..." height={512} width={512}
            const regex2 = new RegExp(`(src="${escapedPath}"[^>]*?)height=\\{512\\}([^>]*?)width=\\{512\\}`, 'g');
            content = content.replace(regex2, `$1height={${h}}$2width={${w}}`);

            // width={512} height={512} ... src="..."
            const regex3 = new RegExp(`width=\\{512\\}([^>]*?)height=\\{512\\}([^>]*?src="${escapedPath}")`, 'g');
            content = content.replace(regex3, `width={${w}}$1height={${h}}$2`);
        }
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        totalModified++;
        console.log('✅ Updated:', filePath);
    }
}

console.log(`\n🎉 Updated ${totalModified} files.`);
