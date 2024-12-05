import React from 'react'
import PrimaryButton from '../primaryButton/PrimaryButton'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faLuggageCart } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../iconText/IconButton';
const SearchBar = () => {
  return (
    <div className='container flex justify-between items-center gap-4 my-4 flex-wrap'>
      <Link href="/">
      <img src='../assets/brand/logo.png' className='w-auto h-[50px] min-w-[150px]'/>
      </Link>
      <div className="searchArea flex" >
      <input type='text' placeholder='Search the product' className='min-w-[300px] bg-background text-primaryDark border-b-2 border-primaryDark border-solid focus:outline-none focus:placeholder-opacity-0'/>
      <PrimaryButton searchText='Search'/>
      </div>
      <div className="cartIdea flex gap-2 z-0">
      <IconButton icon={faHeart} name="Wishlist"/>
      <IconButton icon={faLuggageCart} name="Cart" number={3} />
      </div>
    </div>
  )
}
export default SearchBar