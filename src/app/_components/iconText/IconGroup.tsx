"use client"
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, Heart } from 'lucide-react'; // Import Lucide icons
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import { DisplayContext } from '@/app/context/DisplayComponents';
import IconButton from './IconButton';
const IconGroup = () => {
  const { setVisibleComponent } = useContext(DisplayContext)
  const { userDetails, userDetailsLoading } = useUserDetails();
  const router = useRouter();
  const { cartItems, isInitialized } = useSelector((state: { cart: any }) => state.cart);
  const { wishListItems, wishListLoading } = useSelector((state: { wishList: any }) => state.wishList);
  const handleProtectedRoute = (path: string) => {
    if (!userDetails) setVisibleComponent('login')
    else router.push(path)
  }
  return (
    <div className='flex gap-2'>
      <IconButton
        icon={<ShoppingCart />} // Lucide icon as JSX
        name="Cart"
        onClick={() => handleProtectedRoute('/dashboard/cart')}
        number={userDetails ? cartItems.length : 0}
        loading={userDetailsLoading ? (userDetailsLoading||!isInitialized) : false}
      />
      <IconButton
        icon={<Heart />} // Lucide icon as JSX
        name="Wishlist"
        onClick={() => handleProtectedRoute('/dashboard/wishlist')}
        number={userDetails ? wishListItems.length : 0}
        loading={userDetailsLoading ? (userDetailsLoading || wishListLoading):false}
      />
    </div>
  );
}
export default IconGroup;