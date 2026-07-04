import { useState, useEffect, useRef, Suspense } from 'react';
import type { ReactNode } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  minHeight?: string;
}

export default function LazySection({ 
  children, 
  fallback = null, 
  threshold = 0, 
  rootMargin = '400px',
  minHeight = '300px'
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Force GSAP to recalculate all scroll triggers after the DOM has had a chance to render the new section
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 150);
          
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { rootMargin, threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : minHeight }}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : fallback}
    </div>
  );
}
