"use client"
import React from 'react';
import { userOptions } from '../data/userOptions';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation';
import LinkComponent from '../_components/linkComponent/LinkComponent';
const DashboardSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="p-4 rounded-lg max-w-[300px] text-primaryDark space-y-4 shadow-helper">
      {userOptions.map((option, index) => {
        const isActive = pathname === option.href;
        return (
          <div 
            key={index}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              isActive 
                ? 'shadow-primaryLight' 
                : ''
            }`}
          >
            <FontAwesomeIcon 
              icon={option.icon} 
              className={`w-5 h-5`}
            />
            <LinkComponent href={option.href} text={option.title} />
          </div>
        );
      })}
    </div>
  );
};
export default DashboardSidebar;