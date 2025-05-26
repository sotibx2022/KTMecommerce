"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { userOptions } from '../data/userOptions';
import { usePathname } from 'next/navigation';
import MobileSideBar from './MobileSideBar';
import LargeSideBar from './LargeSideBar';
const DashboardSidebar = () => {
  const pathname = usePathname();
  const [smallDevice, setSmallDevice] = useState(true);
  const handleResize = useCallback(() => {
    setSmallDevice(typeof window !== 'undefined' && window.innerWidth <= 1000);
  }, []);
  useEffect(() => {
    // Initial check
    handleResize();
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  return (
    <div className={`text-primaryDark flex-col`}>
      {userOptions.map((option, index) => {
        const isActive = pathname === option.href;
        return (
          <div className="ConditionalSideBar" key={index}>
            {smallDevice ? 
              <MobileSideBar isActive={isActive} option={option} /> : 
              <LargeSideBar isActive={isActive} option={option} />
            }
          </div>
        );
      })}
    </div>
  );
};
export default DashboardSidebar;