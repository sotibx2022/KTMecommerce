"use client"
import React, { useEffect, useState } from 'react'
import PrimaryButton from '../primaryButton/PrimaryButton'
import BannerHeading from './BannerHeading'
import Link from 'next/link'
const AllProductsBanner = () => {
  const findScreenSize = () => {
    if (window.innerWidth > 760) {
      setSmallScreen(false)
    } else {
      setSmallScreen(true)
    }
  }
  window.addEventListener('resize', findScreenSize)
  useEffect(() => {
    findScreenSize()
    // Cleanup event listener
    return () => window.removeEventListener('resize', findScreenSize)
  }, [])
  const [smallScreen, setSmallScreen] = useState(false)
  return (
    <div className='screen-max-width min-h-[90vh] flex-center flex-col'>
      <div className="bannerHeading mb-4 flex flex-col justify-center items-center">
      </div>
      <video 
        autoPlay 
        muted 
        playsInline={true} 
        src={smallScreen ? "/assets/videos/smallHero.mp4" : "/assets/videos/hero.mp4"} 
        className='max-h-[50vh] mb-4' 
      />
      <BannerHeading 
  text1="Explore Our Full Range" 
  text2="Discover All Innovations"
/>
<Link href='/pages/allProducts'><PrimaryButton searchText='Browse'/></Link>
    </div>
  )
}
export default AllProductsBanner