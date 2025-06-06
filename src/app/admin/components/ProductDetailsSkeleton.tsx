import React from 'react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton' // Assuming you're using shadcn/ui
const ProductDetailsSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section Skeleton */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-[150px] secondaryHeading font-bold" />
            </CardHeader>
            <CardContent>
              <Skeleton className="w-full h-[300px] rounded-lg" />
            </CardContent>
          </Card>
        </div>
        {/* Details Section Skeleton */}
        <div className="md:w-2/3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-8 w-[250px] primaryHeading" />
                  <div className="flex gap-2">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-20 rounded-full" />
                    ))}
                  </div>
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Description Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[100px] secondaryHeading" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Separator />
                {/* Features Skeleton */}
                <div className="space-y-2">
                  <Skeleton className="h-6 w-[100px] secondaryHeading" />
                  <div className="space-y-2 pl-5">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4 rounded-full" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                {/* Grid Info Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-5 w-[80px] secondaryHeading" />
                      <Skeleton className="h-6 w-[120px] rounded-full" />
                    </div>
                  ))}
                </div>
                <Separator />
                {/* Date Info Skeleton */}
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-5 w-[100px] secondaryHeading" />
                      <Skeleton className="h-4 w-[150px]" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-md" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default ProductDetailsSkeleton