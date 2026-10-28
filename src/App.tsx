import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
const Header = lazy(() => import('./components/layout/Header'));
const Footer = lazy(() => import('./components/layout/Footer'));
const SmoothScrollProvider = lazy(() => import('./components/providers/SmoothScrollProvider'));
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import { ErrorBoundary } from './components/providers/ErrorBoundary';

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

const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const FintechWalletsPage = lazy(() => import('./pages/FintechWalletsPage'));
const MultivendorDashboardPage = lazy(() => import('./pages/MultivendorDashboardPage'));
const ManufacturingIntelligencePage = lazy(() => import('./pages/ManufacturingIntelligencePage'));
const AIAgentsPage = lazy(() => import('./pages/AIAgentsPage'));
const AIConsultingPage = lazy(() => import('./pages/AIConsultingPage'));
const CustomSoftwarePage = lazy(() => import('./pages/CustomSoftwarePage'));
const ManagedWorkforcePage = lazy(() => import('./pages/ManagedWorkforcePage'));
const VoiceAIPage = lazy(() => import('./pages/VoiceAIPage'));
const LLMModelTrainingPage = lazy(() => import('./pages/LLMModelTrainingPage'));
const AIVisibilityPage = lazy(() => import('./pages/AIVisibilityPage'));
const AuditPage = lazy(() => import('./pages/AuditPage'));
import FrostyWidget from './components/chat/FrostyWidget';
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

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
        <div className="min-h-screen text-primary flex flex-col font-body">
          <Suspense fallback={null}>
            <SmoothScrollProvider />
          </Suspense>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="flex-grow">
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <ScrollToTop />
                  <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/schedule-demo" element={<ScheduleDemo />} />
                  <Route path="/products/hiyring" element={<HiyringPage />} />
                  <Route path="/products/vedashi-ecommerce" element={<VedashiPage />} />
                  <Route path="/products/frosty-agent" element={<FrostyPage />} />
                  <Route path="/products/vettedge" element={<VettEdgePage />} />

                  <Route path="/solutions/ai-consulting" element={<AIConsultingPage />} />
                  <Route path="/solutions/custom-software-ai-integration" element={<CustomSoftwarePage />} />
                  <Route path="/solutions/managed-ai-workforce" element={<ManagedWorkforcePage />} />
                  <Route path="/solutions/fintech-custom-wallets" element={<FintechWalletsPage />} />
                  <Route path="/solutions/multivendor-dashboard" element={<MultivendorDashboardPage />} />
                  <Route path="/solutions/manufacturing-intelligence" element={<ManufacturingIntelligencePage />} />
                  <Route path="/solutions/ai-agents" element={<AIAgentsPage />} />
                  <Route path="/solutions/voice-ai" element={<VoiceAIPage />} />
                  <Route path="/solutions/llm-model-training" element={<LLMModelTrainingPage />} />
                  <Route path="/solutions/ai-visibility" element={<AIVisibilityPage />} />
                  <Route path="/audit" element={<AuditPage />} />

                  <Route path="/resources/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/resources/case-studies" element={<ResourcesPage />} />
                  <Route path="/resources/blog" element={<BlogIndexPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/experience" element={<ExperiencePage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/resources/faq" element={<FAQPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
              </ErrorBoundary>
            </main>
            <Suspense fallback={null}>
              <Footer />
              <FrostyWidget />
            </Suspense>
          </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;