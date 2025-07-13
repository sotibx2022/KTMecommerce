"use client";
import React from "react";
import { CartState } from "@/app/redux/cartSlice";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
import CartTable from "@/app/_components/cartTable/CartTable";
import { useSelector } from "react-redux";
import CartSkeleton from "@/app/_components/skeletontext/CartSkleton";
import NoData from "@/app/_components/noData/NoData";
import { ShoppingCart } from "lucide-react";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
const Page = () => {
  const { cartItems, loading: cartLoading, initialized } = useSelector(
    (state: { cart: CartState }) => state.cart
  );
  const { userDetailsLoading } = useUserDetails();
  const isLoading = cartLoading || userDetailsLoading || !initialized;
  const isEmpty = !isLoading && cartItems.length === 0;
  return (
    <div className="container">
      {isLoading ? (
        <CartSkeleton />
      ) : isEmpty ? (
        <NoData
          icon={<ShoppingCart className="w-12 h-12 text-gray-400" />}
          notFoundMessage="There are no items in the cart. Please browse and add products"
          buttonText="Browse"
          buttonLink="/catalog/advanceSearch?highlighted=none"
        />
      ) : (
        <div className="cartDetailsWrapper">
          <div className="cartTableandSummary">
            <CartTable />
            <CartSummary order={true} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
