import https from 'https';

const pages = [
  { label: 'Homepage',             url: 'https://www.frostrek.ai/' },
  { label: 'FAQ',                  url: 'https://www.frostrek.ai/resources/faq' },
  { label: 'Case Studies',         url: 'https://www.frostrek.ai/resources/case-studies' },
  { label: 'Blog Post',            url: 'https://www.frostrek.ai/resources/blog/future-of-data-operations-agentic-ai' },
  { label: 'Blog Index',           url: 'https://www.frostrek.ai/resources/blog' },
  { label: 'Product (Frosty)',     url: 'https://www.frostrek.ai/products/frosty-ai' },
];

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, html: data });
      });
    }).on('error', (err) => {
      resolve({ status: 500, html: '', error: err.message });
    });
  });
}

async function run() {
  console.log('=== COMPREHENSIVE LIVE SITE VERIFICATION ===\n');

  for (const page of pages) {
    console.log(`─── Checking ${page.label} (${page.url}) ───`);
    const res = await fetchPage(page.url);

    if (res.status !== 200) {
      console.log(`  ❌ FAIL: Status code is ${res.status}`);
      if (res.error) console.log(`  Error details: ${res.error}`);
      console.log('');
      continue;
    }

    const html = res.html;
    
    // 1. Title
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'NOT FOUND';
    
    // 2. Canonical
    const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/);
    const canonical = canonicalMatch ? canonicalMatch[1] : 'NOT FOUND';
    
    // 3. og:title
    const ogTitleMatch = html.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"[^>]*>/);
    const ogTitle = ogTitleMatch ? ogTitleMatch[1] : 'NOT FOUND';
    
    // 4. Check fallback issue (does this page look like a fallback to homepage?)
    const hasHomepageHero = html.includes('Enterprise AI Solutions') && html.includes('Frostrek builds');
    const isActuallyHomepage = page.label !== 'Homepage' && hasHomepageHero;
    
    console.log(`  Status: ${res.status}`);
    console.log(`  Title: ${title}`);
    console.log(`  Canonical: ${canonical}`);
    console.log(`  OG Title: ${ogTitle}`);
    console.log(`  Title Matches OG Title: ${title === ogTitle ? '✅' : '❌'}`);
    console.log(`  Served Homepage Fallback (SSR Bug): ${isActuallyHomepage ? '❌ YES (Failing SSR)' : '✅ No (Working SSR)'}`);
    console.log('');
  }
}

run();
