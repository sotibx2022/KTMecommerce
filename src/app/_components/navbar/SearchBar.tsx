import React from 'react'
import PrimaryButton from '../primaryButton/PrimaryButton'
import Link from 'next/link'
const SearchBar = () => {
  return (
    <div className='container flex justify-between items-center gap-4 my-4'>
      <Link href="/">
      <img src='../assets/brand/logo.png' className='w-auto h-[50px]'/>
      </Link>
      <div className="searchArea flex" >
      <input type='text' placeholder='Search the product' className='min-w-[300px] bg-background text-primaryDark border-b-2 border-primaryDark border-solid focus:outline-none focus:placeholder-opacity-0'/>
      <PrimaryButton searchText='Search'/>
      </div>
    </div>
  )
}
export default SearchBar