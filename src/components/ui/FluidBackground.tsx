import { useEffect, useRef } from 'react';
import WebGLFluid from 'webgl-fluid';

export const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // Override addEventListener to force passive touch events, preventing the library from blocking scroll
      const originalAddEventListener = canvas.addEventListener;
      canvas.addEventListener = function (type: any, listener: any, options?: any) {
        if (type === 'touchstart' || type === 'touchmove') {
          originalAddEventListener.call(canvas, type, listener, { passive: true });
        } else {
          originalAddEventListener.call(canvas, type, listener, options);
        }
      } as typeof canvas.addEventListener;

      WebGLFluid(canvas, {
        TRIGGER: 'hover',
        IMMEDIATE: false,
        AUTO: false,
        INTERVAL: 3000,
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 1.5, // Lower dissipation makes the color much more intense and dark
        VELOCITY_DISSIPATION: 1.5,
        PRESSURE: 0.05,
        PRESSURE_ITERATIONS: 20,
        CURL: 8,
        SPLAT_RADIUS: 0.15,
        SPLAT_FORCE: 4000,
        SPLAT_COLOR: { r: 0.02, g: 0.15, b: 0.08 }, // Much darker green to increase intensity
        SHADING: false,
        COLORFUL: false,
        COLOR_UPDATE_SPEED: 10,
        PAUSED: false,
        BACK_COLOR: { r: 0, g: 100, b: 255 }, // Blue color that will tint the core/transparent areas
        TRANSPARENT: true, // Keep the page background white by making the canvas transparent
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
      // Restore original after initialization
      canvas.addEventListener = originalAddEventListener;
    }
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
