import CategoryPageComponent from '@/app/_components/categoryPageComponent/CategoryPageComponent'
import React, { Suspense } from 'react'
const page = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading category data...</div>}>
        <CategoryPageComponent categoryName='isTrendingNow'/>
        </Suspense>
    </div>
  )
}
export default page