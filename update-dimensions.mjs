import fs from 'fs';
import { globSync } from 'glob';

// Map: optimized image path -> [width, height]
const dimensions = {
    '/optimized/chatbot.webp': [160, 160],
    '/optimized/vedashi-logo.webp': [230, 80],
    '/optimized/logonew.webp': [90, 90],
    '/optimized/vedashi-logo-sm.webp': [80, 68],
    '/optimized/iso.webp': [100, 100],
    '/optimized/goodfirms.webp': [262, 70],
    '/optimized/ai-blue.webp': [70, 70],
    '/optimized/clutch.webp': [172, 70],
    '/optimized/whatsapp.webp': [60, 60],
    '/optimized/instagram.webp': [60, 60],
    '/optimized/linkedin.webp': [60, 60],
    '/optimized/machine-learning-lavender.webp': [70, 70],
    '/optimized/gmail.webp': [80, 80],
    '/optimized/topDevelopers.webp': [270, 70],
};

const files = globSync('src/**/*.tsx').concat(globSync('src/**/*.ts'));
let totalModified = 0;

for (const filePath of files) {
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    for (const [imgPath, [w, h]] of Object.entries(dimensions)) {
        // Only process files that contain this image path
        if (!content.includes(imgPath)) continue;

        // Replace width={512} height={512} near the optimized image reference
        // This regex finds img tags with the specific optimized src and replaces their dimensions
        const escapedPath = imgPath.replace(/\//g, '\\/').replace(/\./g, '\\.');
        const regex = new RegExp(
            `(src="${imgPath}"[^>]*?)width=\\{512\\}([^>]*?)height=\\{512\\}`,
            'g'
        );
        content = content.replace(regex, `$1width={${w}}$2height={${h}}`);

        // Also handle reverse order
        const regexReverse = new RegExp(
            `(src="${imgPath}"[^>]*?)height=\\{512\\}([^>]*?)width=\\{512\\}`,
            'g'
        );
        content = content.replace(regexReverse, `$1height={${h}}$2width={${w}}`);

        // Handle when src comes after width/height
        const regex2 = new RegExp(
            `width=\\{512\\}([^>]*?)height=\\{512\\}([^>]*?src="${imgPath.replace(/\//g, '\\/').replace(/\./g, '\\.')}")`,
            'g'
        );
        content = content.replace(regex2, `width={${w}}$1height={${h}}$2`);
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        totalModified++;
        console.log('✅ Updated dimensions:', filePath);
    }
}

console.log('\n🎉 Updated dimensions in ' + totalModified + ' files.');
