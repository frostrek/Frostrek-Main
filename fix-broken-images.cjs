const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('src');
let totalFixed = 0;

// Images that have original png/jpg equivalents - fix these references
const fixMap = {
  '/icons/ai agents.webp': '/icons/ai agents.png',
  '/icons/venture cap.webp': '/icons/venture cap.png',
  '/701 Tillery St 12 3227, Austin, TX 78702, USA.webp': '/701 Tillery St 12 3227, Austin, TX 78702, USA.jpg',
};

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const [from, to] of Object.entries(fixMap)) {
        if (newContent.includes(from)) {
          newContent = newContent.replaceAll(from, to);
          totalFixed++;
          console.log('Fixed: ' + from + ' -> ' + to + ' in ' + path.relative(srcDir, fullPath));
        }
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
      }
    }
  }
}

walkDir(srcDir);
console.log('\nFixed ' + totalFixed + ' broken image references.');
