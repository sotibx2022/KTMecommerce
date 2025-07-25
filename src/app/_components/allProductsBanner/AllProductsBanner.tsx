"use client"
import React, { useEffect, useState, useCallback } from 'react'
import PrimaryButton from '../primaryButton/PrimaryButton'
import BannerHeading from './BannerHeading'
import Link from 'next/link'
import PageHeader from '../pageHeader/PageHeader'
import { Boxes } from 'lucide-react'
const AllProductsBanner = () => {
  const [smallScreen, setSmallScreen] = useState(false)
  const findScreenSize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setSmallScreen(window.innerWidth <= 760)
    }
  }, [])
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      findScreenSize()
      window.addEventListener('resize', findScreenSize)
      // Cleanup listener
      return () => window.removeEventListener('resize', findScreenSize)
    }
  }, [findScreenSize])
  return (
    <div className='screen-max-width mt-4 flex-center flex-col'>
      <div className="bannerHeading flex flex-col justify-center items-center">
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline={true}
        src={smallScreen ? "/assets/videos/smallHero.mp4" : "/assets/videos/hero.mp4"}
        className='max-h-[50vh] mb-4'
      />
      <PageHeader headerText={'Explore Our Full Range'}/>
      <Link href='/catalog/advanceSearch?category=mobile'>
        <PrimaryButton searchText='Browse' /></Link>
    </div>
  )
}
export default AllProductsBanner