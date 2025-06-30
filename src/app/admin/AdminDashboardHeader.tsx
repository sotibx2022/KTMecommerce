'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
const AdminDashboardHeader = () => {
  const pathname = usePathname()
  const pathSegments = pathname.split("/")[2]
  return (
    <div className='container flex justify-between items-center px-4'>
      <span className='subHeading'>{pathSegments}</span> 
      <img src='../../assets/brand/logo.png' className='h-[50px]'/>
    </div>
  )
}
export default AdminDashboardHeader