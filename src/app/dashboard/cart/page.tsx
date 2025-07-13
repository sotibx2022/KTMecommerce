"use client";
import React from "react";
import { CartState } from "@/app/redux/cartSlice";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
import CartTable from "@/app/_components/cartTable/CartTable";
import { useDispatch, useSelector } from "react-redux";
import CartSkeleton from "@/app/_components/skeletontext/CartSkleton";
import NoData from "@/app/_components/noData/NoData";
import { ShoppingCart } from "lucide-react";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
const Page = () => {
  const dispatch = useDispatch();
  const { cartItems, loading: cartLoading } = useSelector((state: { cart: CartState }) => state.cart);
  const { userDetailsLoading } = useUserDetails();
  // ✅ Debug logs to trace render behavior
  console.log("CartPage — cartLoading:", cartLoading);
  console.log("CartPage — userDetailsLoading:", userDetailsLoading);
  console.log("CartPage — cartItems:", cartItems);
  const isLoading = cartLoading || userDetailsLoading;
  const isEmpty = !cartLoading && cartItems.length === 0 && !userDetailsLoading;
  return (
    <div className="container">
      {isLoading ? (
        <>
          {console.log("CartPage — Rendering: CartSkeleton")}
          <CartSkeleton />
        </>
      ) : isEmpty ? (
        <>
          {console.log("CartPage — Rendering: NoData (Cart is empty)")}
          <NoData
            icon={<ShoppingCart className="w-12 h-12 text-gray-400" />}
            notFoundMessage="There are no items in the cart. Please browse and add products"
            buttonText="Browse"
            buttonLink="/catalog/advanceSearch?highlighted=none"
          />
        </>
      ) : (
        <>
          {console.log("CartPage — Rendering: CartTable and CartSummary")}
          <div className="cartDetailsWrapper">
            <div className="cartTableandSummary">
              <CartTable />
              <CartSummary order={true} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Page;
