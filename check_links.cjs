const fs = require('fs');
const path = require('path');

const validRoutes = [
  '/', '/schedule-demo', '/products/hiyring', '/products/vedashi-ecommerce', 
  '/products/frosty-ai', '/products/vettedge', '/products/frostrek-manufacturing-os', 
  '/products/ai-calling-agent', '/products/whatsapp-bot', '/solutions/fintech-custom-wallets', 
  '/solutions/multivendor-dashboard', '/solutions/manufacturing-intelligence', 
  '/solutions/ai-agents', '/solutions/voice-ai', '/solutions/llm-model-training', 
  '/resources/case-studies', '/resources/blog', '/about', '/experience', 
  '/careers', '/contact', '/resources/faq'
];

function isRouteValid(route) {
  // Remove hash or query params if any
  route = route.split('#')[0].split('?')[0];
  if (validRoutes.includes(route)) return true;
  if (route.startsWith('/resources/blog/')) return true;
  if (route.startsWith('/pdf/')) return true; // Static assets
  if (route.startsWith('/icons/')) return true; // Static assets
  if (route.startsWith('/optimized/')) return true; // Static assets
  return false;
}

function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        filelist = walkSync(filepath, filelist);
      }
    } else {
      if (filepath.endsWith('.tsx') || filepath.endsWith('.ts') || filepath.endsWith('.jsx') || filepath.endsWith('.js')) {
        filelist.push(filepath);
      }
    }
  }
  return filelist;
}

const allFiles = walkSync(path.join(__dirname, 'src'));
const brokenLinks = [];

const regexes = [
  /(?:to|href|link)\s*[:=]\s*['"`](\/[^'"`]*)['"`]/g,
  /link:\s*['"`](\/[^'"`]*)['"`]/g
];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const regex of regexes) {
      let match;
      const re = new RegExp(regex); // reset lastIndex
      while ((match = re.exec(line)) !== null) {
        const route = match[1];
        if (!isRouteValid(route)) {
          brokenLinks.push({
            file: path.relative(__dirname, file),
            line: i + 1,
            route: route
          });
        }
      }
    }
  }
}

// Deduplicate and print
const unique = [...new Set(brokenLinks.map(b => `${b.route} (in ${b.file}:${b.line})`))];
console.log(unique.join('\n'));
