import { useEffect, useRef } from 'react';

export const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. Skip completely during Puppeteer prerendering / headless builds
    if (
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome|puppeteer/i.test(navigator.userAgent))
    ) {
      return;
    }

    // 2. Skip on touch / mobile devices (< 768px or coarse pointer) for maximum performance & battery life
    const isMobileOrCoarse =
      window.innerWidth < 768 ||
      (typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches);

    if (isMobileOrCoarse) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    let isInitialized = false;
    let idleId: number | null = null;
    let timeoutId: any = null;

    const initFluid = async () => {
      if (isInitialized || !canvas) return;
      isInitialized = true;

      // Clean up interaction triggers
      window.removeEventListener('mousemove', onFirstInteraction);
      window.removeEventListener('scroll', onFirstInteraction);
      if (idleId && typeof (window as any).cancelIdleCallback === 'function') {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      try {
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return;

        // Dynamically load webgl-fluid so it does not block the initial critical JS bundle
        const { default: WebGLFluid } = await import('webgl-fluid');

        WebGLFluid(canvas, {
          TRIGGER: 'hover',
          IMMEDIATE: false,
          AUTO: false,
          INTERVAL: 3000,
          SIM_RESOLUTION: 128,
          DYE_RESOLUTION: 1024,
          CAPTURE_RESOLUTION: 512,
          DENSITY_DISSIPATION: 1.5,
          VELOCITY_DISSIPATION: 1.5,
          PRESSURE: 0.05,
          PRESSURE_ITERATIONS: 20,
          CURL: 8,
          SPLAT_RADIUS: 0.15,
          SPLAT_FORCE: 4000,
          SPLAT_COLOR: { r: 0.02, g: 0.15, b: 0.08 },
          SHADING: false,
          COLORFUL: false,
          COLOR_UPDATE_SPEED: 10,
          PAUSED: false,
          BACK_COLOR: { r: 0, g: 100, b: 255 },
          TRANSPARENT: true,
          BLOOM: false,
          BLOOM_ITERATIONS: 8,
          BLOOM_RESOLUTION: 256,
          BLOOM_INTENSITY: 0.1,
          BLOOM_THRESHOLD: 0.6,
          BLOOM_SOFT_KNEE: 0.7,
          SUNRAYS: false,
          SUNRAYS_RESOLUTION: 196,
          SUNRAYS_WEIGHT: 1.0,
        });
      } catch (err) {
        console.warn('WebGL Fluid initialization skipped:', err);
      }
    };

    const onFirstInteraction = () => {
      void initFluid();
    };

    // Initialize on first mouse move/scroll or when the browser CPU is completely idle
    window.addEventListener('mousemove', onFirstInteraction, { once: true, passive: true });
    window.addEventListener('scroll', onFirstInteraction, { once: true, passive: true });

    if (typeof (window as any).requestIdleCallback === 'function') {
      idleId = (window as any).requestIdleCallback(initFluid, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(initFluid, 1500);
    }

    return () => {
      window.removeEventListener('mousemove', onFirstInteraction);
      window.removeEventListener('scroll', onFirstInteraction);
      if (idleId && typeof (window as any).cancelIdleCallback === 'function') {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
