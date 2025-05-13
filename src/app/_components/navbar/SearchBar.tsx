"use client"
import React, { useContext, useState } from 'react';
import PrimaryButton from '../primaryButton/PrimaryButton';
import Link from 'next/link';
import { faHeart, faLuggageCart } from '@fortawesome/free-solid-svg-icons';
import IconButton from '../iconText/IconButton';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { CartState } from '@/app/redux/cartSlice';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import LoginComponent from '../authComponent/LoginComponent';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { config } from '@/config/configuration';
const SearchBar = () => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const user = useContext(UserDetailsContext);
  const [searchValue, setSearchValue] = useState("");
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const {visibleComponent,setVisibleComponent} = useContext(DisplayContext)
  const[activescreen, setActiveScreen] = useState(false)
  const router = useRouter();
  const handleSearch = () => {
    if (searchValue) {
      router.push(`/catalog/advanceSearch?keyword=${searchValue}`);
    }
  };
  const handleProtectedRoute = (path:string) => {
    if (!user?.userDetails) {
      setActiveScreen(true)
      setVisibleComponent('login');
    } else {
      router.push(path);
    }
  };
  return (
    <div className='container flex justify-between items-center gap-4 my-4 flex-wrap'>
      <Link href="/">
        <img src='../assets/brand/logo.png' className='w-auto h-[50px] min-w-[150px]' alt="Brand Logo"/>
      </Link>
      <div className="searchArea flex">
        <input
          type='text'
          placeholder='Search the product'
          className='min-w-[300px] bg-background text-primaryDark border-b-2 border-primaryDark border-solid focus:outline-none focus:placeholder-opacity-0'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <PrimaryButton searchText='Search' onClick={handleSearch} />
      </div>
      <div className="cartIdea flex gap-2 z-0">
        <IconButton
          icon={faLuggageCart}
          name="Cart"
          number={cartItems?.length ?? 0}
          onClick={() => handleProtectedRoute(`/dashboard/cart`)}
        />
        <IconButton
          icon={faHeart}
          name="Wishlist"
          onClick={() => handleProtectedRoute('pages/wishlist')}
        />
      </div>
      {activescreen && visibleComponent === "login" && <LoginComponent/>}
    </div>
  );
};
export default SearchBar;
