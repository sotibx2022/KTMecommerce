"use client"
import React, { useState, useEffect } from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserOptions from './UserOptions';
import { useDispatch, useSelector } from 'react-redux';
import { CartState, clearCartItems, setCart } from '@/app/redux/cartSlice';
import { clearWishListItems } from '@/app/redux/wishListSlice';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import UserProfileImage from './UserProfileImage';
import { useLogout } from '@/app/hooks/queryHooks/useLogout';
import { useCartItems } from '@/app/hooks/queryHooks/useCartItems';
const RegisteredUsersOption = () => {
  console.log("1. Component rendering");
  const [showUserOptions, setShowUserOptions] = useState(false);
  const { userDetails } = useUserDetails();
  const logout = useLogout();
  const dispatch = useDispatch();
  const { cartItems, isInitialized } = useSelector(
    (state: { cart: CartState }) => state.cart
  );
  console.log(userDetails);
  console.log(userDetails?._id)
  console.log("2. Redux state - cartItems:", cartItems, "isInitialized:", isInitialized);
  const { data: cartDetails, isPending, error } = useCartItems();
  console.log("3. useCartItems hook - data:", cartDetails, "isPending:", isPending, "error:", error);
  useEffect(() => {
    console.log("4. useEffect triggered - isPending:", isPending, "cartDetails:", cartDetails);
    if (userDetails) {
      if (!isPending) {
        console.log("5. Data loading completed");
        if (cartDetails) {
          console.log("6. cartDetails exists:", cartDetails);
          if (cartDetails.success && cartDetails.data) {
            console.log("7. Dispatching setCart with data:", cartDetails.data);
            dispatch(setCart(cartDetails.data));
          } else {
            console.log("8. cartDetails missing success or data properties");
          }
        } else {
          console.log("9. cartDetails is null/undefined");
        }
      } else {
        console.log("10. Data is still loading (isPending: true)");
      }
    }
  }, [cartDetails, dispatch, isPending, userDetails]);
  console.log("11. Rendering UI - cartItems length:", cartItems.length);
  const handleLogout = () => {
    console.log("12. Logout clicked");
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