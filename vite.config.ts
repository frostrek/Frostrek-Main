import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

const routes = [
  '/',
  '/about',
  '/schedule-demo',
  '/contact',
  '/experience',
  '/faq',
  '/blog',
  '/resources',
  // Products
  '/products/hiyring',
  '/products/vedashi-ecommerce',
  '/products/frosty-ai',
  '/products/vettedge',
  '/products/frostrek-manufacturing-os',
  '/products/ai-calling-agent',
  '/products/whatsapp-bot',
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
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://www.frostrek.ai',
      dynamicRoutes: routes,
      generateRobotsTxt: false, // Preserve custom public/robots.txt
    }),
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
