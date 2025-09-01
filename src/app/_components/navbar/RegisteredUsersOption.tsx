"use client"
import React, { useEffect, useState } from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserOptions from './UserOptions';
import { useDispatch } from 'react-redux';
import { clearCartItems, setCart } from '@/app/redux/cartSlice';
import { useCartItems } from '@/app/hooks/queryHooks/useCartItems';
import { useWishListItems } from '@/app/hooks/queryHooks/useWishListItems';
import { clearWishListItems, setWishList } from '@/app/redux/wishListSlice';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import UserProfileImage from './UserProfileImage';
import { useLogout } from '@/app/hooks/queryHooks/useLogout';
const RegisteredUsersOption = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const { userDetails } = useUserDetails();
  const logout = useLogout();
  const dispatch = useDispatch();
  const { data: cartItems, isPending: cartPending, isSuccess: cartSuccess } = useCartItems();
  const { data: wishListItems, isPending: wishPending, isSuccess: wishSuccess } = useWishListItems();
  useEffect(() => {
    if (!userDetails) {
      dispatch(clearCartItems());
      dispatch(clearWishListItems());
      return;
    }
    if (cartItems?.success && cartItems.data) {
      dispatch(setCart({
        cartItems: cartItems.data,
        isLoading: false,
        initialized:true,
      }));
    }
    if (wishListItems?.success && wishListItems.data) {
      dispatch(setWishList({
        wishListItems: wishListItems.data,
        wishListLoading: false
      }));
    }
  }, [cartItems, wishListItems, userDetails, dispatch]);
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
      <SecondaryButton
        text="Log Out"
        icon={faSignOutAlt}
        onClick={logout.mutate}
      />
    </div>
  )
}
export default RegisteredUsersOption