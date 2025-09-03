"use client"
import React, { useContext, useEffect, useRef } from 'react'
import { throttle, debounce } from 'lodash'
import { motion, useAnimation } from 'framer-motion'
import { ActionIcons } from './responsiveHeader/ActionIcons'
import { CartState } from '@/app/redux/cartSlice'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { useSelector } from 'react-redux'
import { useUserDetails } from '@/app/context/UserDetailsContextComponent'
import { useRouter } from 'next/navigation'
import { IWishListState } from '@/app/redux/wishListSlice'
const MobileFooterMenu = () => {
  const controls = useAnimation()
  const { userDetails, userDetailsLoading } = useUserDetails()
  const { setVisibleComponent } = useContext(DisplayContext)
  const router = useRouter()
  const { cartItems,isInitialized } = useSelector((state: { cart: CartState }) => state.cart)
  const { wishListItems, initialized:isWishlistInitialized } = useSelector((state: { wishList: IWishListState }) => state.wishList)
  // Animation variants
  const footerMenuVariant = {
    hidden: { y: 100, transition: { duration: 0.3 } },
    visible: { y: 0, transition: { duration: 0.3 } }
  }
  // Protected route handler
  const handleProtectedRoute = (path: string) => {
    if (!userDetails) setVisibleComponent('login')
    else router.push(path)
  }
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      const currentScrollY = window.scrollY
      if (currentScrollY > 50) {
        controls.start("hidden")
      }
    }
    // Show after scrolling stops (debounced)
    const showFooter = debounce(() => controls.start("visible"), 500)
    // Combined scroll handler
    const scrollHandler = throttle(() => {
      handleScroll()
      showFooter()
    }, 100)
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [controls])
  return (
    <motion.div
      initial="visible"
      animate={controls}
      variants={footerMenuVariant}
      className="lg:hidden w-full fixed bottom-0 shadow-primaryDark z-[40] rounded-tl-lg rounded-tr-lg"
      style={{ background: 'var(--backgroundGradientWithHelper)' }}
    >
      <div className="container py-2">
        <ActionIcons
          onSearch={() => setVisibleComponent('advanceSearch')}
          onCart={() => handleProtectedRoute('/dashboard/cart')}
          onWishlist={() => handleProtectedRoute('/dashboard/wishlist')}
          cartCount={userDetails ? (cartItems?.length ?? 0) : 0}
          wishlistCount={userDetails ? (wishListItems.length ?? 0) : 0}
          wishlistLoading={userDetails ? (!isWishlistInitialized||userDetailsLoading) : false}
          cartListLoading={userDetails? (userDetailsLoading || !isInitialized):false}
        />
      </div>
    </motion.div>
  )
}
export default MobileFooterMenu