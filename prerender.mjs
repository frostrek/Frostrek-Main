/**
 * prerender.mjs — Build-time prerendering for Frostrek SPA
 *
 * Runs AFTER `vite build`. Launches a local static server on dist/,
 * visits every route with headless Puppeteer, captures the fully-rendered
 * HTML, and writes it back as static .html files so crawlers get real content.
 *
 * Usage: node prerender.mjs
 */

import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');
const PORT = 4173;

// ─── All routes to prerender (synced with App.tsx) ──────────────────
const routes = [
  '/',
  '/about',
  '/schedule-demo',
  '/contact',
  '/experience',
  '/careers',
  '/resources/faq',
  '/resources/blog',
  '/resources/case-studies',
  // Products
  '/products/hiyring',
  '/products/vedashi-ecommerce',
  '/products/frosty-agent',
  '/products/vettedge',

  // Solutions
  '/solutions/fintech-custom-wallets',
  '/solutions/multivendor-dashboard',
  '/solutions/manufacturing-intelligence',
  '/solutions/ai-agents',
  '/solutions/voice-ai',
  '/solutions/llm-model-training',
  // Blog posts
  '/resources/blog/future-of-data-operations-agentic-ai',
  '/resources/blog/rlhf-critical-enterprise-model-safety',
  '/resources/blog/scaling-annotation-teams-without-losing-quality',
  '/resources/blog/navigating-ai-ethics-data-collection',
  '/resources/blog/rise-of-multimodal-ai-models',
  '/resources/blog/optimizing-voice-ai-regional-dialects',
  '/resources/blog/enterprise-grade-data-security-protocols',
  '/resources/blog/enduring-role-human-in-the-loop',
  '/resources/blog/accelerating-medical-ai-precision-data',
];

// ─── MIME types for the static server ───────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.woff2':'font/woff2',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
};

/**
 * Spin up a minimal static file server that serves dist/ and falls
 * back to index.html for SPA routes (mimicking production behavior).
 */
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split('?')[0]);
      let filePath = join(DIST, urlPath);

      // If directory, try index.html inside it
      if (!extname(filePath)) {
        const indexPath = join(filePath, 'index.html');
        if (existsSync(indexPath)) {
          filePath = indexPath;
        } else {
          // SPA fallback
          filePath = join(DIST, 'index_template.html');
        }
      }

      if (!existsSync(filePath)) {
        filePath = join(DIST, 'index_template.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not Found');
      }
    });

    server.listen(PORT, () => {
      console.log(`  ✓ Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

/**
 * Prerender a single route: navigate Puppeteer to the URL, wait for
 * React to render, then capture the full HTML and write it to disk.
 */
async function prerenderRoute(browser, route) {
  const page = await browser.newPage();

  // Block heavy resources and third-party trackers that crawlers don't need
  // and that block network idle indefinitely
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const url = req.url();
    const type = req.resourceType();
    
    if (
      ['image', 'media', 'font'].includes(type) ||
      url.includes('googletagmanager.com') ||
      url.includes('google-analytics.com') ||
      url.includes('doubleclick.net') ||
      url.includes('facebook.net') ||
      url.includes('hotjar.com')
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  const url = `http://localhost:${PORT}${route}`;

  try {
    // Navigate with domcontentloaded (fast — doesn't wait for all resources)
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });

    // Wait for JS chunks to load (lazy imports). Use a lenient timeout —
    // some pages have persistent connections (GSAP, chatbot) that never
    // fully idle, so networkidle0 would hang forever.
    try {
      await page.waitForNetworkIdle({ timeout: 5000 });
    } catch {
      // Ignore — proceed with what's loaded
    }

    // Wait for Suspense lazy loading to finish:
    // The spinner (.animate-spin) must be gone AND real content must exist.
    // This prevents capturing the Suspense fallback (spinner) instead of
    // the actual page component.
    try {
      await page.waitForFunction(() => {
        const root = document.getElementById('root');
        if (!root) return false;
        const hasLoader = !!root.querySelector('.animate-spin');
        if (hasLoader) return false;
        const hasH1 = !!root.querySelector('h1');
        const hasArticle = !!root.querySelector('article');
        const hasSections = (root.querySelectorAll('section') || []).length >= 2;
        return hasH1 || hasArticle || hasSections;
      }, { timeout: 10000 });
    } catch {
      // Proceed anyway — page may have rendered without an h1
    }

    // Short delay for react-helmet-async to inject <head> meta tags
    await new Promise(r => setTimeout(r, 300));

    // Capture the full document HTML
    let html = await page.content();

    // ── Validation: ensure we didn't capture the wrong page ──────
    // For non-root routes, verify the HTML contains route-specific content.
    // If the wrong page was captured (e.g. homepage instead of blog post),
    // retry with a longer wait.
    if (route !== '/') {
      const routeSegments = route.split('/').filter(Boolean);
      const lastSegment = routeSegments[routeSegments.length - 1];
      const words = lastSegment.replace(/-/g, ' ');
      const hasCanonical = html.includes(route);
      const hasRelevantContent = words.split(' ').some(w =>
        w.length > 3 && html.toLowerCase().includes(w.toLowerCase())
      );
      
      if (!hasCanonical && !hasRelevantContent) {
        console.warn(`  ⚠ ${route} — wrong content captured, retrying...`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        try { await page.waitForNetworkIdle({ timeout: 8000 }); } catch {}
        await new Promise(r => setTimeout(r, 2000));
        html = await page.content();
      }
    }

    // Determine output path
    let outDir, outFile, flatFile;
    if (route === '/') {
      outDir = DIST;
      outFile = join(DIST, 'index.html');
    } else {
      outDir = join(DIST, route.slice(1));
      outFile = join(outDir, 'index.html');
      flatFile = join(DIST, `${route.slice(1)}.html`);
    }

    // Create directory if needed
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }

    // Mark the root div as prerendered so React can hydrate
    const finalHtml = html.replace(
      '<div id="root">',
      '<div id="root" data-prerendered="true">'
    );

    writeFileSync(outFile, finalHtml, 'utf-8');
    
    // Also write a flat .html file for AWS Amplify / S3 clean URL compatibility
    if (flatFile) {
      // Ensure the directory for the flat file exists (e.g. /resources/ for /resources/faq.html)
      const flatDir = join(DIST, route.slice(1).split('/').slice(0, -1).join('/'));
      if (!existsSync(flatDir)) {
        mkdirSync(flatDir, { recursive: true });
      }
      writeFileSync(flatFile, finalHtml, 'utf-8');
    }
    
    console.log(`  ✓ ${route}`);
  } catch (err) {
    console.error(`  ✗ ${route} — ${err.message}`);
  } finally {
    await page.close();
  }
}

// ─── Main ───────────────────────────────────────────────────────────
async function main() {
  console.log('\n🔧 Frostrek Prerenderer\n');
  console.log(`  Routes to prerender: ${routes.length}`);

  // Create a backup of the original index.html to use as the clean SPA fallback
  const indexFile = join(DIST, 'index.html');
  const templateFile = join(DIST, 'index_template.html');
  if (existsSync(indexFile) && !existsSync(templateFile)) {
    writeFileSync(templateFile, readFileSync(indexFile, 'utf-8'), 'utf-8');
  }

  const server = await startServer();

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      protocolTimeout: 60000, // Prevent CDP protocol timeouts
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });
  } catch (launchErr) {
    console.warn(`\n  ⚠ Could not launch browser: ${launchErr.message}`);
    console.warn('  ⏭ Skipping prerendering (SPA will still work via client-side routing).\n');
    server.close();
    return;
  }

  console.log('  ✓ Puppeteer launched\n');
  console.log('  Prerendering routes:\n');

  const startTime = Date.now();

  // Process routes sequentially to avoid overwhelming the system
  for (const route of routes) {
    await prerenderRoute(browser, route);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n  ✅ Done! ${routes.length} routes prerendered in ${elapsed}s\n`);

  await browser.close();
  server.close();
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});

