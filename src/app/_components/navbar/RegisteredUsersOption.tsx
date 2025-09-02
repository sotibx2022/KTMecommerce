"use client"
import React, { useState, useEffect } from 'react';
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserOptions from './UserOptions';
import { useDispatch, useSelector } from 'react-redux';
import { CartState, clearCartItems, setCart, setIsInitialized } from '@/app/redux/cartSlice';
import { clearWishListItems } from '@/app/redux/wishListSlice';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import UserProfileImage from './UserProfileImage';
import { useLogout } from '@/app/hooks/queryHooks/useLogout';
import { useCartItems } from '@/app/hooks/queryHooks/useCartItems';
const RegisteredUsersOption = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const { userDetails } = useUserDetails();
  const logout = useLogout();
  const dispatch = useDispatch();
  const { cartItems, isInitialized } = useSelector(
    (state: { cart: CartState }) => state.cart
  );
  const { data: cartDetails, isPending, error } = useCartItems();
  // Initialize cart or mark initialized
  useEffect(() => {
    if (userDetails && !isPending) {
      if (cartDetails?.success && cartDetails.data && cartItems.length === 0) {
        dispatch(setCart(cartDetails.data)); // sets isInitialized = true
      } else if (!cartDetails || !cartDetails.success) {
        dispatch(setIsInitialized(true)); // mark initialized even if no data
      }
    }
  }, [cartDetails, dispatch, isPending, userDetails, cartItems]);
  const handleLogout = () => {
    dispatch(clearCartItems());
    dispatch(clearWishListItems());
    logout.mutate();
  };
  // Show loading state until cart is initialized
  if (!isInitialized) {
    return (
      <div className="flex-center gap-4">
        <p className="text-white">Loading cart...</p>
      </div>
    );
  }
  return (
    <div className="flex-center gap-4">
      <div
        className="userDetails flex-center gap-2 relative cursor-pointer"
        onMouseEnter={() => setShowUserOptions(true)}
        onMouseLeave={() => setShowUserOptions(false)}
      >
        <UserProfileImage />
        <p className="text-white capitalize">
          <span className='text-helper'>Welcome</span> {
            userDetails && (userDetails.fullName.split(" ")[0] || userDetails.email.split("@")[0])
          }
        </p>
        <FontAwesomeIcon
          icon={showUserOptions ? faCaretUp : faCaretDown}
          className="text-background"
        />
        {showUserOptions && <UserOptions />}
      </div>
      {/* Display cart count badge */}
      {cartItems.length > 0 && (
        <div className="cart-badge">
          {cartItems.reduce((total, item) => total + item.quantity, 0)}
        </div>
      )}
      <SecondaryButton
        text="Log Out"
        icon={faSignOutAlt}
        onClick={handleLogout}
      />
    </div>
  )
}
export default RegisteredUsersOption;
