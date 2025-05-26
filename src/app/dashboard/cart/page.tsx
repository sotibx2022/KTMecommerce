"use client";
import React, { useEffect, useState } from "react";
import { CartState, setCart } from "@/app/redux/cartSlice";
import PrimaryButton from "@/app/_components/primaryButton/PrimaryButton";
import Link from "next/link";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
import CartTable from "@/app/_components/cartTable/CartTable";
import { useDispatch, useSelector } from "react-redux";
import CartSkeleton from "@/app/_components/skeletontext/CartSkleton";
const Page = () => {
  const dispatch = useDispatch();
  const { cartItems, loading: cartLoading } = useSelector((state: { cart: CartState }) => state.cart);
  return (
    <div className="container">
      {cartLoading ? (
        <CartSkeleton/>
      ) : cartItems.length === 0 ? (
        <div className="flex-center w-full h-full flex flex-col my-4">
          <p className="text-red-500 my-4 text-xl">
            There are no items in the cart. Please browse and add products.
          </p>
          <Link href="/pages/isNewArrivals">
            <PrimaryButton searchText="Browse" />
          </Link>
        </div>
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