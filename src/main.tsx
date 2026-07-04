import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')!;


const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

const root = createRoot(rootElement);
root.render(app);

// Dispatch the custom event for prerendering after React has rendered
setTimeout(() => {
  document.dispatchEvent(new Event('custom-render-trigger'));
}, 500);
