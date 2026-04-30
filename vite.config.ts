import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import prerender from '@prerenderer/rollup-plugin'
import sitemap from 'vite-plugin-sitemap'

const routes = [
  '/',
  '/about',
  '/products',
  '/products/frosty-ai',
  '/products/voice-ai',
  '/products/whatsapp-agents',
  '/solutions',
  '/solutions/sales',
  '/solutions/support',
  '/solutions/ecommerce',
  '/solutions/erp',
  '/resources',
  '/contact',
  '/schedule-demo',
  '/experience'
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prerender({
      routes: routes,
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        renderAfterDocumentEvent: 'custom-render-trigger',
        maxConcurrentRoutes: 1, // Optional: useful for avoiding out-of-memory
      },
      postProcess(renderedRoute) {
        // Ignore any redirects.
        renderedRoute.html = renderedRoute.html.trim()
      }
    }),
    sitemap({
      hostname: 'https://www.frostrek.com',
      dynamicRoutes: routes,
    })
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei', 'maath'],
          'vendor-gsap': ['gsap', '@gsap/react'],
          'vendor-ui': ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
})
