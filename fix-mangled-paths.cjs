const fs = require('fs');
const path = require('path');

const srcDir = path.resolve('src');
let totalFixed = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;

      // Fix Mangled Voice AI paths
      newContent = newContent.replaceAll('/icons/Voice /icons/ai.png', '/icons/Voice-ai.png');
      newContent = newContent.replaceAll('/icons/Voice /icons/ai-green.png', '/icons/Voice-ai-green.png');
      newContent = newContent.replaceAll('/optimized/Voice /icons/ai-green.png', '/icons/Voice-ai-green.png');
      newContent = newContent.replaceAll('/optimized/Voice /icons/ai.png', '/icons/Voice-ai.png');
      
      // Fix paths with spaces
      newContent = newContent.replaceAll('/icons/Voice ai.png', '/icons/Voice-ai.png');
      newContent = newContent.replaceAll('/icons/Voice ai-green.png', '/icons/Voice-ai-green.png');
      newContent = newContent.replaceAll('/icons/ai agents.png', '/icons/ai-agents.png');
      newContent = newContent.replaceAll('/icons/ai agents.webp', '/icons/ai-agents.png');
      newContent = newContent.replaceAll('/optimized/ai agents-red.webp', '/icons/ai-agents-red.png');

      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        totalFixed++;
      }
    }
  }
}

walkDir(srcDir);
console.log('Fixed paths in ' + totalFixed + ' files.');
