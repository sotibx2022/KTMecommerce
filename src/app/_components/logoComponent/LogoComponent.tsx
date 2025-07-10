import Link from 'next/link'
import React from 'react'
const LogoComponent = () => {
    return (
        <>
        <Link href="/">
            <img src='/assets/brand/logo.png' className='w-auto h-[50px] min-w-[150px]' alt="Brand Logo" />
        </Link>
        </>
    )
}
export default LogoComponent