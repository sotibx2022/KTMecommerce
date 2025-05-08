"use client";
import React, { ReactNode, useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import AdvanceSearch from '../AdvanceSearch';
type Props = {
  children: ReactNode;
};
const ProductsPageLayout: React.FC<Props> = ({ children }) => {
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const receiveShowSearchValue = (value: boolean) => {
    setShowAdvanceSearch(value);
  };
  // Animate width shift
  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        width: showAdvanceSearch ? 'calc(100% - 300px)' : '100%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [showAdvanceSearch]);
  return (
    <div className="flex container">
      <AdvanceSearch getShowSearchValue={receiveShowSearchValue} />
      <div
        ref={contentRef}
        className="bg-red-500 min-h-screen transition-all w-full"
      >
        {children}
      </div>
    </div>
  );
};
export default ProductsPageLayout;
