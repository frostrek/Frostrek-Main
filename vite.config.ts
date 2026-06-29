import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

/**
 * Custom Vite plugin: Converts render-blocking CSS to async preload pattern.
 * This eliminates the ~230ms render-blocking penalty flagged by Lighthouse.
 * 
 * Transforms:   <link rel="stylesheet" href="/assets/index-xxx.css">
 * Into:         <link rel="preload" href="/assets/index-xxx.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
 *               <noscript><link rel="stylesheet" href="/assets/index-xxx.css"></noscript>
 */
function asyncCssPlugin(): Plugin {
  return {
    name: 'vite-plugin-async-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Match <link rel="stylesheet" ...href="/assets/...css"...> tags (Vite-generated app CSS)
      return html.replace(
        /<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/[^"]+\.css)"[^>]*>/g,
        (_, href) =>
          `<link rel="preload" href="${href}" as="style" crossorigin onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" href="${href}" crossorigin></noscript>`
      );
    },
  };
}

const routes = [
  '/',
  '/about',
  '/products',
  '/products/frosty-ai',
  '/products/voice-ai',
  '/products/whatsapp-agents',
  '/products/hiyring',
  '/products/linkedin-automation',
  '/products/erpnext-ai',
  '/solutions',
  '/solutions/sales',
  '/solutions/support',
  '/solutions/ecommerce',
  '/solutions/erp',
  '/resources',
  '/contact',
  '/schedule-demo',
  '/experience',
  '/faq',
  '/resources/blog/future-of-data-operations-agentic-ai',
  '/resources/blog/rlhf-critical-enterprise-model-safety',
  '/resources/blog/scaling-annotation-teams-without-losing-quality',
  '/resources/blog/navigating-ai-ethics-data-collection',
  '/resources/blog/rise-of-multimodal-ai-models',
  '/resources/blog/optimizing-voice-ai-regional-dialects',
  '/resources/blog/enterprise-grade-data-security-protocols',
  '/resources/blog/enduring-role-human-in-the-loop',
  '/resources/blog/accelerating-medical-ai-precision-data',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.frostrek.ai',
      dynamicRoutes: routes,
    }),
    asyncCssPlugin(),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-motion': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
