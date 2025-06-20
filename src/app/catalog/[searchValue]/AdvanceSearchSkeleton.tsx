import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
const AdvanceSearchSkeleton = () => {
    return (
        <div className='hidden lg:flex container shadow-primaryLight  justify-between items-center p-2 my-4'>
            <Skeleton className='w-[200px] h-[50px] bg-primaryLight border-helper  animate-pulse' />
            <Skeleton className='w-[200px] h-[50px] bg-primaryLight  border-helper animate-pulse' />
            <Skeleton className='w-[200px] h-[50px]  bg-primaryLight border-helper animate-pulse' />
            <Skeleton className='w-[200px] h-[50px]  bg-primaryLight border-helper  animate-pulse' />
            <Skeleton className='w-[200px] h-[50px]  bg-primaryLight border-helper  animate-pulse' />
            <Skeleton className='w-[50px] h-[50px] shadow-helper bg-primaryLight  animate-pulse' />
        </div>
    )
}
export default AdvanceSearchSkeleton