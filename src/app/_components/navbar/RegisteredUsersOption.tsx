"use client"
import React, { useContext, useEffect, useState } from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserOptions from './UserOptions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { clearCartItems, setCart } from '@/app/redux/cartSlice';
import { useDispatch } from 'react-redux';
import { fetchCartFromDatabase } from '@/app/services/apiFunctions/cartItems';
import { useCartItems } from '@/app/hooks/queryHooks/useCartItems';
import toast from 'react-hot-toast';
import { truncateCharacters, truncateText } from '@/app/services/helperFunctions/functions';
import { useLogout } from '@/app/hooks/queryHooks/useLogout';
import { useWishListItems } from '@/app/hooks/queryHooks/useWishListItems';
import { clearWishListItems, setWishList } from '@/app/redux/wishListSlice';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
const RegisteredUsersOption = () => {
  const queryClient = useQueryClient();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const { userDetails, setUserDetails } = useUserDetails();
  const logout = useLogout()
  const dispatch = useDispatch();
  const { data: cartItems, isPending } = useCartItems();
  const { data: wishListItems, isPending: wishListItemsPending } = useWishListItems();
 useEffect(() => {
  if (!userDetails) {
    dispatch(clearCartItems());
    dispatch(clearWishListItems());
  }
  if (cartItems?.success && cartItems.data && Array.isArray(cartItems.data) && cartItems.data.length > 0 && !isPending) {
    dispatch(setCart({ cartItems:cartItems.data, isLoading:isPending }));
  }
  if (wishListItems && Array.isArray(wishListItems) && wishListItems.length > 0 && !wishListItemsPending) {
    dispatch(setWishList(wishListItems));
  }
}, [cartItems, wishListItems, userDetails]);
  return (
    <div className="flex-center gap-4">
      <div
        className="userDetails flex-center gap-2 relative cursor-pointer"
        onMouseEnter={() => setShowUserOptions(true)}
        onMouseLeave={() => setShowUserOptions(false)}
      >
        {userDetails?.profileImage ? (
          <img
            src={userDetails.profileImage}
            alt="User Profile"
            className="w-[30px] h-[30px] rounded-full"
          />
        ) : (
          <h1 className="text-primaryDark text-upperCase bg-background w-[30px] h-[30px] flex-center text-xl rounded-full">
            {userDetails && userDetails.fullName[0].toUpperCase()}
          </h1>
        )}
        <p className="text-white capitalize">
          <span className='text-helper'>Welcome</span> {
            userDetails && userDetails.fullName.split(" ")[0]}
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