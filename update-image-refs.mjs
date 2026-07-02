import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const SRC_DIR = './src';
let modifiedFiles = 0;

// The images we want to skip updating (because they weren't converted)
const SKIP_REFS = ['logo.png', 'logonew.png'];

function walkDir(dir) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const fullPath = join(dir, file);
    if (statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(file) {
  const content = readFileSync(file, 'utf8');
  
  // Replace .png, .jpg, .jpeg with .webp, UNLESS it's in the skip list
  let newContent = content.replace(/([a-zA-Z0-9_/-]+)\.(png|jpg|jpeg)/gi, (match, path, ext) => {
    const filename = `${path.split('/').pop()}.${ext}`;
    
    // Ignore skip files
    if (SKIP_REFS.includes(filename.toLowerCase())) {
      return match;
    }
    
    return `${path}.webp`;
  });

  // Also replace whitespace encoded versions (e.g. "Space Case.png" -> "Space Case.webp" handled differently or just literal .png)
  newContent = newContent.replace(/\.(png|jpg|jpeg)/gi, (match, ext) => {
     // A slightly riskier blind replace if the file has spaces, but we mostly just need to target strings.
     return match; // Actually the first regex works fine for normal paths
  });

  if (content !== newContent) {
    writeFileSync(file, newContent, 'utf8');
    modifiedFiles++;
    console.log(`Updated ${file}`);
  }
}

walkDir(SRC_DIR);
console.log(`\nUpdated ${modifiedFiles} files with WebP references.`);
