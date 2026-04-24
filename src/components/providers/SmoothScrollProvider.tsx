'use client';

import { useEffect, useRef, createContext, useContext, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceAnimations } from '@/hooks/useDeviceAnimations';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenisScroll() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<ReturnType<typeof gsap.ticker.add> | null>(null);
  const { isMobile, animConfig } = useDeviceAnimations();

  useEffect(() => {
    // Don't initialize Lenis on mobile — native iOS momentum is better
    if (isMobile || animConfig.lenisDuration === 0) {
      // Still need ScrollTrigger refresh for GSAP animations
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(refreshTimer);
    }

    const lenis = new Lenis({
      lerp: animConfig.lenisLerp,
      duration: animConfig.lenisDuration,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);
    rafRef.current = tickerCallback;

    // Delayed ScrollTrigger refresh to fix SSR height miscalculation (fixes 0+ counter bug)
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Debounced resize handler for device rotation / layout shifts
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      }, 300);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      lenis.destroy();
      if (rafRef.current) {
        gsap.ticker.remove(rafRef.current);
      }
      clearTimeout(refreshTimer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      lenisRef.current = null;
    };
  }, [isMobile, animConfig.lenisDuration, animConfig.lenisLerp]);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
