"use client";
import React, { useEffect, useState} from "react";
import {CartState, setCart } from "@/app/redux/cartSlice";
import PrimaryButton from "@/app/_components/primaryButton/PrimaryButton";
import Link from "next/link";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
import LoadingComponent from "@/app/_components/loadingComponent/LoadingComponent";
import CartTable from "@/app/_components/cartTable/CartTable";
import { useQuery } from "@tanstack/react-query";
import { fetchCartFromDatabase } from "@/app/services/apiFunctions/cartItems";
import { useDispatch, useSelector } from "react-redux";
const page = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  return (
    <div className="container">
        {cartItems.length === 0 && <div className="flex-center w-full h-full flex flex-col my-4">
          <p className="text-red-500 my-4 text-xl">There are no items in the cart. Please browse and add products.</p>
          <Link href="/">
            <PrimaryButton searchText="Browse" />
          </Link>
        </div>}
    {cartItems.length>0 && <div className="cartDetailsWrapper ">
          <div className="cartTableandSummary">
          <CartTable/>
          <CartSummary order={true} />
          </div>
          <Link href="/dashboard/cartProcess">
          </Link>
        </div>}
    </div>
  );
};
export default page;
