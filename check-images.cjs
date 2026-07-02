const fs = require('fs');
const path = require('path');

const publicDir = path.resolve('public');
const missing = [];
const refs = [
  '/701 Tillery St 12 3227, Austin, TX 78702, USA.webp',
  '/agent1.webp', '/CompanyOffice.webp', '/enterprise_ai_suite.webp',
  '/icons/ai agents.webp', '/icons/venture cap.webp',
  '/optimized/ai agents-red.webp', '/optimized/architecture-green.webp',
  '/optimized/chatbot-rafiki.webp', '/optimized/custom-dev.webp',
  '/optimized/data-analytics.webp', '/optimized/frostrek_VA.webp',
  '/optimized/innovation.webp', '/optimized/valuation-green.webp',
  '/optimized/vedashi-logo-sm.webp',
  '/pcc-dashboard.webp', '/pcc-hero.webp', '/saf-dashboard.webp',
  '/saf-hero.webp', '/vn1.webp', '/wp1.webp', '/wp2.webp'
];

for (const ref of refs) {
  const filePath = path.join(publicDir, ref);
  if (!fs.existsSync(filePath)) {
    // Check if original png/jpg exists
    const base = ref.replace('.webp', '');
    const pngPath = path.join(publicDir, base + '.png');
    const jpgPath = path.join(publicDir, base + '.jpg');
    const jpegPath = path.join(publicDir, base + '.jpeg');
    const origExists = fs.existsSync(pngPath) ? '.png' : fs.existsSync(jpgPath) ? '.jpg' : fs.existsSync(jpegPath) ? '.jpeg' : null;
    missing.push({ ref, webpExists: false, origExt: origExists });
    console.log('MISSING: ' + ref + (origExists ? '  (has ' + origExists + ')' : '  (NO ORIGINAL FOUND)'));
  } else {
    console.log('OK: ' + ref);
  }
}
console.log('\nTotal missing: ' + missing.length);
