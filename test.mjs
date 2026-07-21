import fs from 'fs';
const html = fs.readFileSync('dist/resources/faq/index.html', 'utf8');
const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/);
const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'not found');
console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'not found');
