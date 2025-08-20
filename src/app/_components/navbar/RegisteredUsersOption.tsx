"use client"
import React, { useContext, useEffect, useState } from 'react'
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
  const { data: cartItems, isPending } = useCartItems();
  const { data: wishListItems, isPending: wishListItemsPending } = useWishListItems();
  const cartItemsArray = !isPending && cartItems?.success && cartItems.data && cartItems.data.length > 0;
  const wishListArray = !wishListItemsPending && wishListItems?.success && wishListItems.data && wishListItems.data.length > 0;
  useEffect(() => {
    console.log("---- RegisteredUsersOption useEffect ----");
    console.log("userDetails:", userDetails);
    console.log("cartItems:", cartItems);
    console.log("cartItemsArray:", cartItemsArray);
    console.log("isPending:", isPending);
    if (!userDetails) {
      console.log("User is not logged in, clearing cart and wishlist");
      dispatch(clearCartItems());
      dispatch(clearWishListItems());
    }
    if (cartItemsArray && cartItems.data) {
      console.log("Dispatching setCart with data:", cartItems.data, "isLoading:", isPending);
      dispatch(setCart({ cartItems: cartItems.data, isLoading: isPending }));
    } else {
      console.log("CartItems not ready or empty, skipping setCart dispatch for now");
    }
    if (wishListArray && wishListItems.data) {
      dispatch(setWishList({ wishListItems: wishListItems.data, wishListLoading: wishListItemsPending }));
    }
  }, [cartItems, wishListItems, userDetails]);
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
            userDetails && (userDetails.fullName.split(" ")[0] || userDetails?.email.split("@")[0])
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
