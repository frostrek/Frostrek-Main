import https from 'https';

https.get('https://frosty-preview.vercel.app/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Title:', data.match(/<title[^>]*>(.*?)<\/title>/)?.[1]);
    console.log('Description:', data.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/)?.[1]);
    console.log('Canonical:', data.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]);
    console.log('OG Title:', data.match(/<meta[^>]*property="og:title"[^>]*content="([^"]+)"/)?.[1]);
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
