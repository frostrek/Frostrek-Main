import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://frosty-preview.vercel.app/', { waitUntil: 'networkidle0' });
  const text = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync('preview_text.txt', text);
  await browser.close();
})();
