"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartState } from "@/app/redux/cartSlice";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
import CartTable from "@/app/_components/cartTable/CartTable";
import CartSkeleton from "@/app/_components/skeletontext/CartSkleton";
import { ShoppingCart } from "lucide-react";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import EmptyState from "./EmptyState";
const Page: React.FC = () => {
  const dispatch = useDispatch();
  const { cartItems, } = useSelector(
    (state: { cart: CartState }) => state.cart
  );
  const { userDetails, userDetailsLoading } = useUserDetails();
  const isLoading =  userDetailsLoading;
  const isEmpty = cartItems.length === 0;
  const hasItems = cartItems.length > 0;
  return (
    <div className="container">
      <h2 className="secondaryHeading">Cart</h2>
      {isLoading ? (
        <CartSkeleton />
      ) : isEmpty ? (
        <EmptyState
          icon={<ShoppingCart />}
          message="There are no items in the cart. Please browse and add products"
        />
      ) : hasItems ? (
        <div className="cartDetailsWrapper">
          <div className="cartTableandSummary">
            <CartTable />
            <CartSummary order={true} />
          </div>
        </div>
      ) : (
        // Show skeleton while we're still initializing
        <CartSkeleton />
      )}
    </div>
  );
};
export default Page;