"use client"
import { useEffect, useState } from "react";
import { debounce } from 'lodash';
export const useScreenWidth = (debounceTime = 100): number => {
  const [screenWidth, setScreenWidth] = useState<number>(0);
  useEffect(() => {
    // Initialize with current width immediately
    setScreenWidth(window.innerWidth);
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