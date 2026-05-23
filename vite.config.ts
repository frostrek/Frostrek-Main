import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

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
