import http from 'http';

http.get('http://localhost:4173/resources/case-studies', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    const titleMatch = data.match(/<title[^>]*>(.*?)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'not found');
    const canonicalMatch = data.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/);
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'not found');
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
