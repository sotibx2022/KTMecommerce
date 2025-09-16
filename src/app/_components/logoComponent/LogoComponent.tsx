"use client"
import { useScreenWidth } from '@/app/services/helperFunctions/findScreenWidth'
import Link from 'next/link'
import React from 'react'
interface LogoComponentProps {
    theme?: "light" | "dark"
}
const LogoComponent: React.FC<LogoComponentProps> = ({ theme }) => {
    const screenWidth = useScreenWidth()
    return (
        <Link href="/">
            {screenWidth > 1000 ? (
                <div className='flex align-items-center gap-2'>
                    <img
                        src='/assets/brand/mobilelogo.png'
                        alt='mobile logo'
                        style={theme === "dark" ? { filter: 'invert(1) brightness(2)' } : undefined}
                        className='w-auto h-[50px]'
                    />
                    <img
                        src='assets/brand/textlogo.png'
                        alt='text logo'
                        style={theme === "dark" ? { filter: 'invert(1) brightness(2)' } : undefined}
                        className='w-auto h-[50px]'
                    />
                </div>
            ) : (
                <img
                    src='/assets/brand/mobilelogo.png'
                    alt='mobile logo'
                    style={theme === "dark" ? { filter: 'invert(1) brightness(2)' } : undefined}
                    className='w-auto h-[50px]'
                />
            )}
        </Link>
    )
}
export default LogoComponent