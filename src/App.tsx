import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Header from './components/layout/Header';
const Footer = lazy(() => import('./components/layout/Footer'));
import SmoothScrollProvider from './components/providers/SmoothScrollProvider';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages to split code chunks and reduce initial bundle sizes
import Home from './pages/Home';
const About = lazy(() => import('./pages/About'));
const ScheduleDemo = lazy(() => import('./pages/ScheduleDemo'));
const HiyringPage = lazy(() => import('./pages/HiyringPage'));
const VedashiPage = lazy(() => import('./pages/VedashiPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FrostyPage = lazy(() => import('./pages/FrostyPage'));
const VettEdgePage = lazy(() => import('./pages/VettEdgePage'));
const ManufacturingOSPage = lazy(() => import('./pages/ManufacturingOSPage'));
const AICallingAgentPage = lazy(() => import('./pages/AICallingAgentPage'));
const WhatsappBotPage = lazy(() => import('./pages/WhatsappBotPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const FintechWalletsPage = lazy(() => import('./pages/FintechWalletsPage'));
const MultivendorDashboardPage = lazy(() => import('./pages/MultivendorDashboardPage'));
const ManufacturingIntelligencePage = lazy(() => import('./pages/ManufacturingIntelligencePage'));
const AIAgentsPage = lazy(() => import('./pages/AIAgentsPage'));
const VoiceAIPage = lazy(() => import('./pages/VoiceAIPage'));
// Lazy load Chatbot to improve LCP - defers 705KB GIF and JS bundle
const Chatbot = lazy(() => import('./components/chat/Chatbot'));

// Placeholder for internal pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen pt-32 pb-20 px-4 container mx-auto text-center">
    <h1 className="text-4xl font-bold mb-6 text-white">{title}</h1>
    <p className="text-gray-400 max-w-2xl mx-auto">This page is under construction. Content coming soon.</p>
  </div>
);

// Loading component for page transitions
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <Loader2 className="w-10 h-10 animate-spin text-[#2D6A4F]" />
  </div>
);

function App() {
  return (
    <Router>
      <ThemeProvider>
        <SmoothScrollProvider>
          <div className="min-h-screen text-primary flex flex-col font-body">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/schedule-demo" element={<ScheduleDemo />} />
                  <Route path="/products/hiyring" element={<HiyringPage />} />
                  <Route path="/products/vedashi-ecommerce" element={<VedashiPage />} />
                  <Route path="/products/frosty-ai" element={<FrostyPage />} />
                  <Route path="/products/vettedge" element={<VettEdgePage />} />
                  <Route path="/products/frostrek-manufacturing-os" element={<ManufacturingOSPage />} />
                  <Route path="/products/ai-calling-agent" element={<AICallingAgentPage />} />
                  <Route path="/products/whatsapp-bot" element={<WhatsappBotPage />} />
                  <Route path="/solutions/fintech-custom-wallets" element={<FintechWalletsPage />} />
                  <Route path="/solutions/multivendor-dashboard" element={<MultivendorDashboardPage />} />
                  <Route path="/solutions/manufacturing-intelligence" element={<ManufacturingIntelligencePage />} />
                  <Route path="/solutions/ai-agents" element={<AIAgentsPage />} />
                  <Route path="/solutions/voice-ai" element={<VoiceAIPage />} />

                  <Route path="/resources/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/blog" element={<BlogIndexPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
                </Routes>
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
              <Chatbot />
            </Suspense>
          </div>
        </SmoothScrollProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;