import { User, LogOut } from 'lucide-react';
import React from 'react';
const SideBarFooterSkeleton = ({ shouldShowText }: { shouldShowText: boolean }) => {
  return (
    <div className="animate-pulse">
      <div className="w-full" style={{ backgroundColor: 'var(--backgroundLight)' }}>
        <div className="space-y-2">
          {/* Admin Profile Skeleton */}
          <div className="flex items-center p-2">
            <div 
              className="rounded-full p-2" 
              style={{ 
                backgroundColor: 'var(--background)', 
                color: 'var(--primaryDark)' 
              }}
            >
              <User className="h-5 w-5" />
            </div>
            {shouldShowText && (
              <div className="ml-3 space-y-1">
                <div 
                  className="h-4 w-24 rounded" 
                  style={{ backgroundColor: 'var(--primaryLight)' }}
                />
                <div 
                  className="h-3 w-20 rounded" 
                  style={{ backgroundColor: 'var(--primaryLight)' }}
                />
                <div 
                  className="h-3 w-32 rounded" 
                  style={{ backgroundColor: 'var(--primaryLight)' }}
                />
              </div>
            )}
          </div>
          {/* Logout Button Skeleton */}
          <div className="flex items-center p-2">
            <div 
              className="rounded-full p-2" 
              style={{ 
                backgroundColor: 'var(--background)', 
                color: 'var(--primaryDark)' 
              }}
            >
              <LogOut className="h-5 w-5" />
            </div>
            {shouldShowText && (
              <div 
                className="ml-3 h-4 w-16 rounded" 
                style={{ backgroundColor: 'var(--primaryLight)' }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBarFooterSkeleton;