"use client"
import React from 'react';
import { Bell } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton'; // Or your preferred skeleton component
const SkeletonNotifications = () => {
  return (
    <div className="max-w-[400px] mx-auto p-4">
      <div className="flex items-center mb-6">
        <Bell className="h-6 w-6 text-helper mr-2" />
        <h1 className="text-2xl font-bold text-primaryDark">Notifications</h1>
      </div>
      <div className="space-y-4 min-w-[300px]">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 rounded-lg border border-primaryLight">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 bg-primaryLight" />
                <Skeleton className="h-3 w-full bg-primaryLight" />
                <Skeleton className="h-3 w-5/6 bg-primaryLight" />
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SkeletonNotifications;