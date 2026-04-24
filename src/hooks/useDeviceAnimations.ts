'use client';

import { useState, useEffect } from 'react';

export interface AnimConfig {
  duration: { fast: number; normal: number; slow: number };
  stagger: number;
  ease: string;
  scrollStart: string;
  enableHorizontalScroll: boolean;
  enableMagneticCursor: boolean;
  enableParallax: boolean;
  enablePreloader: boolean;
  lenisDuration: number;
  lenisLerp: number;
}

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  reducedMotion: boolean;
  isLowEnd: boolean;
  animConfig: AnimConfig;
}

const DESKTOP_CONFIG: AnimConfig = {
  duration: { fast: 0.3, normal: 0.6, slow: 1.2 },
  stagger: 0.12,
  ease: 'power3.out',
  scrollStart: 'top 80%',
  enableHorizontalScroll: true,
  enableMagneticCursor: true,
  enableParallax: true,
  enablePreloader: true,
  lenisDuration: 1.4,
  lenisLerp: 0.08,
};

const TABLET_CONFIG: AnimConfig = {
  duration: { fast: 0.25, normal: 0.5, slow: 0.9 },
  stagger: 0.08,
  ease: 'power2.out',
  scrollStart: 'top 85%',
  enableHorizontalScroll: false,
  enableMagneticCursor: false,
  enableParallax: false,
  enablePreloader: true,
  lenisDuration: 1.2,
  lenisLerp: 0.1,
};

const MOBILE_CONFIG: AnimConfig = {
  duration: { fast: 0.2, normal: 0.35, slow: 0.6 },
  stagger: 0.06,
  ease: 'power2.out',
  scrollStart: 'top 90%',
  enableHorizontalScroll: false,
  enableMagneticCursor: false,
  enableParallax: false,
  enablePreloader: false,
  lenisDuration: 0,
  lenisLerp: 0,
};

const REDUCED_MOTION_CONFIG: AnimConfig = {
  duration: { fast: 0.01, normal: 0.01, slow: 0.01 },
  stagger: 0,
  ease: 'none',
  scrollStart: 'top 95%',
  enableHorizontalScroll: false,
  enableMagneticCursor: false,
  enableParallax: false,
  enablePreloader: false,
  lenisDuration: 0,
  lenisLerp: 0,
};

// SSR-safe default (assumes desktop for hydration)
const SSR_DEFAULT: DeviceInfo = {
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isTouch: false,
  reducedMotion: false,
  isLowEnd: false,
  animConfig: DESKTOP_CONFIG,
};

export function useDeviceAnimations(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>(SSR_DEFAULT);

  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth;
      const isTouch = navigator.maxTouchPoints > 0;
      const isMobile = w < 768;
      const isTablet = w >= 768 && w < 1024;
      const isDesktop = w >= 1024;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Low-end device detection
      const cores = (navigator as { hardwareConcurrency?: number }).hardwareConcurrency ?? 8;
      const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
      const isLowEnd = cores < 4 || memory < 4;

      let animConfig: AnimConfig;
      if (reducedMotion || isLowEnd) {
        animConfig = reducedMotion ? REDUCED_MOTION_CONFIG : {
          ...MOBILE_CONFIG,
          duration: { fast: 0.15, normal: 0.25, slow: 0.4 },
        };
      } else if (isMobile) {
        animConfig = MOBILE_CONFIG;
      } else if (isTablet) {
        animConfig = TABLET_CONFIG;
      } else {
        animConfig = DESKTOP_CONFIG;
      }

      setDevice({ isMobile, isTablet, isDesktop, isTouch, reducedMotion, isLowEnd, animConfig });
    };

    detect();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(detect, 300);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return device;
}
