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
            <img
                src={screenWidth > 1000 ? '/assets/brand/logo.png' : '/assets/brand/mobilelogo.png'}
                alt="Brand Logo"
                className="w-auto h-[50px]"
                style={theme === "dark" ? { filter: 'invert(1) brightness(2)' } : undefined}
            />
        </Link>
    )
}
export default LogoComponent
