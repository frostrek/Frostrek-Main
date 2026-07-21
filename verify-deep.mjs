import fs from 'fs';

// Simulate what a crawler sees by stripping tags and checking text
const homepage = fs.readFileSync('dist/index.html', 'utf8');

// Extract text content from a section of HTML by stripping tags
function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// Find the SplitTextReveal sections - they have class="split-text-reveal"
const splitSections = homepage.match(/class="split-text-reveal[^"]*"[^>]*>[\s\S]*?<\/(?:div|p|h[1-6]|span)>/g) || [];

console.log(`Found ${splitSections.length} SplitTextReveal sections\n`);

// Just look at first 10 
for (let i = 0; i < Math.min(splitSections.length, 15); i++) {
  const text = stripTags(splitSections[i]);
  if (text.length > 3) {
    console.log(`  [${i}] "${text}"`);
  }
}

console.log('\n─── Specific phrase checks (stripped tags) ───');

// Check specific phrases that were flagged
const sections = [
  { search: 'agentic', context: 200 },
  { search: 'flagship', context: 200 },
  { search: 'Everything you need', context: 200 },
];

for (const s of sections) {
  const idx = homepage.indexOf(s.search);
  if (idx >= 0) {
    // Find enclosing split-text-reveal element
    const start = Math.max(0, homepage.lastIndexOf('split-text-reveal', idx) - 20);
    const end = Math.min(homepage.length, idx + s.context);
    const chunk = homepage.substring(start, end);
    const text = stripTags(chunk);
    console.log(`\n  Around "${s.search}":`);
    console.log(`    Rendered: "${text}"`);
  }
}

// Case studies canonical check
console.log('\n─── Case Studies Canonical Check ───');
const caseStudies = fs.readFileSync('dist/resources/case-studies/index.html', 'utf8');
const csCanonical = caseStudies.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/);
console.log(`  Canonical: ${csCanonical ? csCanonical[1] : 'NOT FOUND'}`);
console.log(`  Should be: https://www.frostrek.ai/resources/case-studies`);
console.log(`  Match: ${csCanonical && csCanonical[1] === 'https://www.frostrek.ai/resources/case-studies' ? '✅' : '❌ WRONG'}`);

// FAQ specific checks
console.log('\n─── FAQ Deep Checks ───');
const faq = fs.readFileSync('dist/resources/faq/index.html', 'utf8');
// Check FAQ answers are visible (not hidden)
const faqAnswerCount = (faq.match(/faq-answer/g) || []).length;
console.log(`  FAQ answer elements: ${faqAnswerCount}`);
// Check it has actual FAQ content
console.log(`  Has "Frostrek" in body: ${faq.includes('Frostrek') ? '✅' : '❌'}`);
console.log(`  Has FAQ question text: ${faq.includes('What is Frostrek') || faq.includes('How does') ? '✅' : '❌'}`);
