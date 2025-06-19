"use client";
import React, { useEffect, useState } from "react";
import { CartState, setCart } from "@/app/redux/cartSlice";
import PrimaryButton from "@/app/_components/primaryButton/PrimaryButton";
import Link from "next/link";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
import CartTable from "@/app/_components/cartTable/CartTable";
import { useDispatch, useSelector } from "react-redux";
import CartSkeleton from "@/app/_components/skeletontext/CartSkleton";
import NoData from "@/app/_components/noData/NoData";
import { ShoppingCart } from "lucide-react";
const Page = () => {
  const dispatch = useDispatch();
  const { cartItems, loading: cartLoading } = useSelector((state: { cart: CartState }) => state.cart);
  return (
    <div className="container">
      {cartLoading ? (
        <CartSkeleton />
      ) : cartItems.length === 0 ? (
        <NoData
          icon={<ShoppingCart className="w-12 h-12 text-gray-400"  />}
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