"use client"
import { useScreenWidth } from '@/app/services/helperFunctions/findScreenWidth'
import Link from 'next/link'
import React from 'react'
const LogoComponent = () => {
    const screenWidth = useScreenWidth()
    return (
        <>
            <Link href="/">
                <img src={screenWidth > 1000 ? '/assets/brand/logo.png' : '/assets/brand/mobilelogo.png'} className='w-auto h-[50px]' alt="Brand Logo"
                  />
            </Link>
        </>
    )
}
export default LogoComponent