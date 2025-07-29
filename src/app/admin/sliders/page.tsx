import React from 'react'
import SlidersPageHeader from './slidersComponents/SlidersPageHeader'
import SlidersTable from './slidersComponents/SlidersTable'
const page = () => {
  return (
    <div className='w-full'>
      <SlidersPageHeader/>
      <SlidersTable/>
    </div>
  )
}
export default page