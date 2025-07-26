"use client"
import React, { useContext, useState } from 'react'
import { ActionIcons } from './responsiveHeader/ActionIcons'
import { CartState } from '@/app/redux/cartSlice';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useSelector } from 'react-redux';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import { useRouter } from 'next/navigation';
const MobileFooterMenu = () => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const { userDetails } = useUserDetails();
  const [activeScreen, setActiveScreen] = useState(false);
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter();
  const handleProtectedRoute = (path: string) => {
    if (!userDetails) {
      setVisibleComponent('login');
      setActiveScreen(true);
    } else {
      router.push(path);
    }
  };
  return (
    <div className="lg:hidden w-full flex justify-between  fixed bottom-0  shadow-primaryDark z-50"
      style={{background:'var(--backgroundGradientWithHelper)'}}
    >
      <div className="mobileFooterMenuItems container py-2">
        <ActionIcons
          onSearch={() => setVisibleComponent('advanceSearch')}
          onCart={() => handleProtectedRoute('dashboard/cart')}
          onWishlist={() => handleProtectedRoute('dashboard/wishlist')}
          cartCount={cartItems?.length ?? 0}
        />
      </div>
    </div>
  )
}
export default MobileFooterMenu