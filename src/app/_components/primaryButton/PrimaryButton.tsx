"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PrimaryButton from '../primaryButton/PrimaryButton'
const SearchBar = () => {
  const[searchValue, setSearchValue] = useState("");
  const router = useRouter();
  return (
    <>
    <div className='container flex justify-center items-center'>
    <div className="logoArea">
      {/* <img src='../assets/brand/logo.png' alt='logo' className='w-[200px] h-[200px]' /> */}
    </div>
    <div className="formItem flex flex-col justify-start gap-4 min-w-[15rem]">
    <input 
    type='text' 
    id="searchInput" 
    placeholder='Book Name, Author, Keyword...'
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
/>
<Link href={`http://localhost:3000/search?searchValue=${searchValue}`}>
  <PrimaryButton text="Search" />
</Link>
    </div>
  </div>
  </>
  )
}
export default SearchBar