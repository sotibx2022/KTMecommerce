"use client"
import { useEffect, useState } from "react";
import { debounce } from 'lodash';
const getInitialWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth;
  }
  return 0; // Fallback for SSR
};
export const useScreenWidth = (debounceTime = 100) => {
  const [screenWidth, setScreenWidth] = useState<number>(getInitialWidth);
  useEffect(() => {
    const handleResize = debounce(() => {
      setScreenWidth(window.innerWidth);
    }, debounceTime);
    window.addEventListener('resize', handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, [debounceTime]);
  return screenWidth;
};
