"use client"
import React, { useEffect, useState } from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserOptions from './UserOptions';
import { useDispatch } from 'react-redux';
import { clearCartItems } from '@/app/redux/cartSlice';
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
  useEffect(() => {
    const storeItems = localStorage.getItem("cart_items");
    if (!storeItems) {
      const { data: cartDetails } = useCartItems();
      if (cartDetails?.success && cartDetails.data) {
        localStorage.setItem("cart_items", JSON.stringify(cartDetails?.data))
      }
    }
  }, [
  ])
  const handleLogout = () => {
    dispatch(clearCartItems());
    dispatch(clearWishListItems());
    logout.mutate();
  };
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
        onClick={handleLogout}
      />
    </div>
  )
}
export default RegisteredUsersOption;