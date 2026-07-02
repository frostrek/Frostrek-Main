import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')!;
const isPrerendered = rootElement.hasAttribute('data-prerendered');

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

if (isPrerendered) {
  // Page was prerendered at build time — hydrate to attach
  // React to the existing DOM without discarding it
  hydrateRoot(rootElement, app);
} else {
  // Dev mode or first client render — create fresh root
  const root = createRoot(rootElement);
  root.render(app);
}

// Dispatch the custom event for prerendering after React has rendered
setTimeout(() => {
  document.dispatchEvent(new Event('custom-render-trigger'));
}, 500);
