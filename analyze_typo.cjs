const fs = require('fs');
const path = require('path');
const components = [
  'src/components/home/HeroSection.tsx',
  'src/components/home/OurProductsSection.tsx',
  'src/components/home/AISolutionsShowcase.tsx',
  'src/components/home/WhatWeDoSection.tsx',
  'src/components/home/ImpactComparison.tsx',
  'src/components/home/TrustedBySection.tsx',
  'src/components/home/FeaturesSection.tsx',
  'src/components/home/FAQSection.tsx',
  'src/components/home/CTASection.tsx'
];

let output = '';

components.forEach(file => {
  const p = path.join(process.cwd(), file);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf-8');
    output += '\n--- ' + path.basename(file) + ' ---\n';
    
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      // Find lines that have a tag and text/font classes
      if (line.match(/className=.*(text-[a-z0-9\[\]\-]+|font-[a-z0-9\[\]\-]+)/) && line.match(/<(h[1-6]|p|span|div|a|button|li)/)) {
        
        let cleaned = line.trim();
        // Remove trailing tags
        cleaned = cleaned.replace(/<\/[^>]+>.*$/, '');
        // Extract content and classes
        let match = cleaned.match(/<([a-zA-Z0-9]+)[^>]*className=[\"\'\`]([^\`\"\'\}]+)[\"\'\`\}][^>]*>(.*)/);
        
        if (match) {
            const tag = match[1];
            const classes = match[2];
            const innerText = match[3] ? match[3].substring(0, 40) : '';
            
            const relevant = classes.split(' ').filter(c => c.startsWith('text-') || c.startsWith('font-')).join(' ');
            if (relevant) {
                output += `<${tag}> uses [${relevant}] => "${innerText}"\n`;
            }
        }
      }
    });
  }
});

fs.writeFileSync('typography_analysis.txt', output);
console.log('Analysis saved to typography_analysis.txt');
