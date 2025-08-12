import { useState, useEffect, RefObject } from 'react';
export function useElementWidth<T extends HTMLElement>(ref: RefObject<T>) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR safety
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
      }
    }
    // Initial measure
    updateWidth();
    // Update on resize
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);
  return width;
}
