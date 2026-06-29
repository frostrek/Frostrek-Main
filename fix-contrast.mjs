import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';

const srcDir = path.resolve('src');
const files = globSync(`${srcDir}/**/*.tsx`);

let modifiedCount = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    // Bump contrast for WCAG AA compliance (4.5:1 minimum)
    content = content.replace(/text-gray-(300|400|500)/g, (match, level) => {
        if (level === '300') return 'text-gray-400';
        if (level === '400') return 'text-gray-500';
        if (level === '500') return 'text-gray-600';
        return match;
    });
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
    }
});

console.log(`Successfully bumped contrast in ${modifiedCount} files.`);
