"use client";
import React, { useState, useEffect } from "react";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import UserOptions from "./UserOptions";
import { useDispatch, useSelector } from "react-redux";
import {
  CartState,
  clearCartItems,
  setCart,
  setIsInitialized as setCartInitialized,
} from "@/app/redux/cartSlice";
import {
  clearWishListItems,
  IWishListState,
  setWishList,
  setWishlistInitialized,
} from "@/app/redux/wishListSlice";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import UserProfileImage from "./UserProfileImage";
import { useLogout } from "@/app/hooks/queryHooks/useLogout";
import { useCartItems } from "@/app/hooks/queryHooks/useCartItems";
import { useWishListItems } from "@/app/hooks/queryHooks/useWishListItems";
const RegisteredUsersOption = () => {
  const [showUserOptions, setShowUserOptions] = useState(false);
  const { userDetails } = useUserDetails();
  const logout = useLogout();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);
  const { wishListItems } = useSelector((state: { wishList: IWishListState }) => state.wishList);
  const { data: cartDetails, isPending: isCartPending } = useCartItems();
  const { data: wishlistDetails, isPending: isWishListPending } = useWishListItems();
  // Initialize cart or mark initialized
  useEffect(() => {
    if (!userDetails) {
      dispatch(setCartInitialized(true));
      return;
    }
    if (isCartPending && cartItems.length === 0) {
      dispatch(setCartInitialized(false));
      return;
    }
    if (cartDetails?.success && cartDetails.data && cartItems.length === 0) {
      dispatch(setCart(cartDetails.data));
      dispatch(setCartInitialized(true));
      return;
    }
  }, [cartDetails, isCartPending, userDetails,]);
  // Initialize wishlist or mark initialized
  useEffect(() => {
    if (!userDetails) {
      dispatch(setWishList([]));
      dispatch(setWishlistInitialized(true));
      return;
    }
    if (isWishListPending && wishListItems.length === 0) {
      dispatch(setWishlistInitialized(false));
      return;
    }
    if (wishlistDetails?.success && wishlistDetails.data && wishListItems.length === 0) {
      dispatch(setWishList(wishlistDetails.data));
    }
    dispatch(setWishlistInitialized(true));
  }, [wishlistDetails, isWishListPending, userDetails]);
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
          <span className="text-helper">Welcome</span>{" "}
          {userDetails &&
            (userDetails.fullName.split(" ")[0] || userDetails.email.split("@")[0])}
        </p>
        <FontAwesomeIcon
          icon={showUserOptions ? faCaretUp : faCaretDown}
          className="text-background"
        />
        {showUserOptions && <UserOptions />}
      </div>
      <SecondaryButton text="Log Out" icon={faSignOutAlt} onClick={handleLogout} />
    </div>
  );
};
export default RegisteredUsersOption;
