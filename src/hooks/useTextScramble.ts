'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

export function useTextScramble(text: string, interval: number = 4000) {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&*?/\\<>[]{}';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalIterations = text.length * 2;

    const scrambleInterval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' ';
            if (i < iteration / 2) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration++;
      if (iteration > totalIterations) {
        clearInterval(scrambleInterval);
        setDisplayText(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    // First scramble after mount
    const timeout = setTimeout(() => {
      scramble();
      // Then repeat at interval
      intervalRef.current = setInterval(scramble, interval);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scramble, interval]);

  return displayText;
}
