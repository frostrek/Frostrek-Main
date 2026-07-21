import fs from 'fs';

const pages = [
  { label: 'FAQ',           path: 'dist/resources/faq/index.html' },
  { label: 'Case Studies',  path: 'dist/resources/case-studies/index.html' },
  { label: 'Blog Post',     path: 'dist/resources/blog/future-of-data-operations-agentic-ai/index.html' },
  { label: 'Product (Frosty)', path: 'dist/products/frosty-ai/index.html' },
  { label: 'Solution (AI Agents)', path: 'dist/solutions/ai-agents/index.html' },
  { label: 'Homepage',      path: 'dist/index.html' },
];

console.log('=== COMPREHENSIVE SEO VERIFICATION ===\n');

for (const page of pages) {
  console.log(`─── ${page.label} (${page.path}) ───`);
  
  if (!fs.existsSync(page.path)) {
    console.log('  ❌ FILE DOES NOT EXIST!\n');
    continue;
  }

  const html = fs.readFileSync(page.path, 'utf8');
  const size = (html.length / 1024).toFixed(1);
  
  // 1. Title
  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'NOT FOUND';
  
  // 2. Canonical
  const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/);
  const canonical = canonicalMatch ? canonicalMatch[1] : 'NOT FOUND';
  
  // 3. og:title
  const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"[^>]*>/);
  const ogTitle = ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND';
  
  // 4. Check if it's actually serving homepage content (false positive)
  const hasHomepageHero = html.includes('Enterprise AI Solutions') && html.includes('Frostrek builds');
  const hasH1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  
  // 5. Check nav links
  const navProductsLink = html.match(/href="\/products"/);
  const navSolutionsLink = html.match(/href="\/solutions"/);
  const navFaqLink = html.match(/href="\/resources\/faq"/);
  
  console.log(`  Size: ${size} KB`);
  console.log(`  <title>: ${title}`);
  console.log(`  canonical: ${canonical}`);
  console.log(`  og:title: ${ogTitle}`);
  console.log(`  Title matches og:title: ${title === ogTitle ? '✅' : '❌ MISMATCH'}`);
  console.log(`  Looks like homepage content: ${hasHomepageHero ? '⚠️  YES (possible fallback issue)' : '✅ No'}`);
  console.log(`  Nav has /products link: ${navProductsLink ? '✅' : '❌'}`);
  console.log(`  Nav has /solutions link: ${navSolutionsLink ? '✅' : '❌'}`);
  console.log(`  Nav has /resources/faq link: ${navFaqLink ? '✅' : '❌'}`);
  console.log('');
}

// Check word spacing
console.log('─── WORD SPACING CHECK (Homepage) ───');
const homepage = fs.readFileSync('dist/index.html', 'utf8');

// Check SplitTextReveal words output - look for the actual rendered text
const badSpacing = [
  'AIAgentsandagentic',
  'Threeflagshipplatforms',
  'Everythingyouneedtobuild',
];
for (const bad of badSpacing) {
  if (homepage.includes(bad)) {
    console.log(`  ❌ Found concatenated text: "${bad}"`);
  } else {
    console.log(`  ✅ No concatenated "${bad}" found`);
  }
}

// Check what the SplitTextReveal words look like in the HTML
// The text is wrapped in spans, so check if literal spaces exist between word spans
const agenticContext = homepage.match(/.{0,80}agentic.{0,80}/);
if (agenticContext) {
  // Check if there's a space before "agentic" in the DOM  
  const hasSpaceBefore = agenticContext[0].includes('> agentic') || agenticContext[0].includes('</span> <span');
  console.log(`  Space before "agentic": ${hasSpaceBefore ? '✅' : '⚠️  Check manually'}`);
  console.log(`  Context: ...${agenticContext[0].substring(0, 120)}...`);
}

// Check for "Three flagship platforms" text
const flagshipContext = homepage.match(/.{0,80}flagship.{0,80}/);
if (flagshipContext) {
  console.log(`  Context around "flagship": ...${flagshipContext[0].substring(0, 120)}...`);
}

console.log('');

// Robots.txt check
console.log('─── ROBOTS.TXT CHECK ───');
const robots = fs.readFileSync('dist/robots.txt', 'utf8');
console.log(`  Contains ChatGPT-User: ${robots.includes('ChatGPT-User') ? '✅' : '❌ MISSING'}`);
console.log(`  Contains OAI-SearchBot: ${robots.includes('OAI-SearchBot') ? '✅' : '❌ MISSING'}`);
console.log(`  Contains GPTBot: ${robots.includes('GPTBot') ? '✅' : '❌ MISSING'}`);
console.log(`  Contains ClaudeBot: ${robots.includes('ClaudeBot') ? '✅' : '❌ MISSING'}`);
console.log(`  Contains PerplexityBot: ${robots.includes('PerplexityBot') ? '✅' : '❌ MISSING'}`);
console.log('');
