const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('src');
const publicDir = path.resolve('public');
const missing = new Set();

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Match common image paths
      const regex = /['"](\/(?:icons|optimized|)[^\/'"]+\.(png|webp|jpg|jpeg|svg))['"]/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        let imgPath = match[1];
        // handle cases like '/icons/...'
        const diskPath = path.join(publicDir, imgPath);
        
        // Check if file exists
        if (!fs.existsSync(diskPath)) {
            missing.add(imgPath + ' (in ' + path.relative(srcDir, fullPath) + ')');
        }
      }
    }
  }
}

walkDir(srcDir);
console.log('Missing images:\n' + Array.from(missing).join('\n'));
