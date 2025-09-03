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
  const {
    data: cartDetails,
    isPending: isCartPending,
  } = useCartItems();
  const {
    data: wishlistDetails,
    isPending: isWishListPending,
  } = useWishListItems();
  // Initialize cart or mark initialized
  useEffect(() => {
    if (!userDetails) {
      dispatch(setCartInitialized(true));
      return;
    }
    if (isCartPending) {
      dispatch(setCartInitialized(false));
    } else {
      if (cartDetails?.success && cartDetails.data && cartItems.length === 0) {
        dispatch(setCart(cartDetails.data));
      }
      dispatch(setCartInitialized(true));
    }
  }, [cartDetails, dispatch, isCartPending, userDetails, cartItems]);
  // Initialize wishlist or mark initialized
  useEffect(() => {
    if (!userDetails) {
      dispatch(setWishList({
            wishListItems: [],
            wishListLoading: false,
          }));
      return;
    }
    if (isWishListPending) {
      dispatch(
          setWishList({
            wishListItems: [],
            wishListLoading: true,
          })
        );
    } else {
      if (
        wishlistDetails?.success &&
        wishlistDetails.data &&
        wishListItems.length === 0
      ) {
        dispatch(
          setWishList({
            wishListItems: wishlistDetails.data,
            wishListLoading: false,
          })
        );
      }
     dispatch(setWishList({
            wishListItems: [],
            wishListLoading: false,
          }));
    }
  }, [wishlistDetails, dispatch, isWishListPending, userDetails, wishListItems]);
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
            (userDetails.fullName.split(" ")[0] ||
              userDetails.email.split("@")[0])}
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
  );
};
export default RegisteredUsersOption;
