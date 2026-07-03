import fs from 'fs';
import path from 'path';

const SITEMAP_PATH = path.join(process.cwd(), 'public', 'sitemap.xml');
const HOST = 'www.frostrek.ai';
const KEY = '0fc03eb756564a26b5befe301eb58f09';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function main() {
  console.log('\n🚀 Starting IndexNow Submission...\n');

  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('❌ Error: sitemap.xml not found at', SITEMAP_PATH);
    console.log('Please ensure your sitemap has been generated before running this script.');
    process.exit(1);
  }

  const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  
  // Extract URLs from sitemap using regex
  const urlMatches = [...sitemapContent.matchAll(/<loc>(.*?)<\/loc>/g)];
  const urlList = urlMatches.map(match => match[1]);

  if (urlList.length === 0) {
    console.error('❌ Error: No URLs found in sitemap.xml');
    process.exit(1);
  }

  console.log(`📡 Found ${urlList.length} URLs in sitemap. Sending to Bing API...`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      console.log('\n✅ SUCCESS! All URLs submitted to IndexNow (Bing/Yandex).');
      console.log('Bing will process these URLs shortly for instant indexing.');
    } else {
      console.error('\n❌ FAILED to submit to IndexNow. Status:', response.status);
      const text = await response.text();
      console.error('Response details:', text);
    }
  } catch (error) {
    console.error('\n❌ ERROR connecting to IndexNow:', error.message);
  }
  console.log('');
}

main();
