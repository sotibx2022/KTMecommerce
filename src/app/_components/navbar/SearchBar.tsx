"use client"
import React, { useState } from 'react'
import PrimaryButton from '../primaryButton/PrimaryButton'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLuggageCart } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../iconText/IconButton';
import { useRouter } from 'next/navigation';
const SearchBar = () => {
  const[searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    console.log(searchValue)
    if(searchValue){
      console.log("condition passed.")
      router.push(`/catalog/keyword=${searchValue}`);
    }
  };
  return (
    <div className='container flex justify-between items-center gap-4 my-4 flex-wrap'>
      <Link href="/">
      <img src='../assets/brand/logo.png' className='w-auto h-[50px] min-w-[150px]'/>
      </Link>
      <div className="searchArea flex" >
      <input type='text' placeholder='Search the product' className='min-w-[300px] bg-background text-primaryDark border-b-2 border-primaryDark border-solid focus:outline-none focus:placeholder-opacity-0'
      value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}/>
      <PrimaryButton searchText='Search' onClick={handleSearch}/>
      </div>
      <div className="cartIdea flex gap-2 z-0">
        <Link href="/pages/cart"><IconButton icon={faLuggageCart} name="Cart" number={3} /></Link>
        <Link href="/pages/wishlist"><IconButton icon={faHeart} name="Wishlist"/></Link>
      </div>
    </div>
  )
}
export default SearchBar