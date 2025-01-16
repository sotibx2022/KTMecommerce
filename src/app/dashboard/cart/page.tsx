"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartState } from "@/app/redux/cartSlice";
import PrimaryButton from "@/app/_components/primaryButton/PrimaryButton";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import Link from "next/link";
import LoadingComponent from "@/app/_components/loadingComponent/LoadingComponent";
import { ICartItem } from "@/app/types/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  console.log(cartItems);
  useEffect(() => {
    if (cartItems) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [cartItems]);
  return (
    <div className="container">
      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <p>Loading</p>
        </div>
      ) : cartItems.length === 0 ? (
        <div className="flex-center w-full h-full flex flex-col my-4">
          <p className="text-red-500 my-4 text-xl">There are no items in the cart. Please browse and add products.</p>
          <Link href="/">
            <PrimaryButton searchText="Browse" />
          </Link>
        </div>
      ) : (
        <div className="cartDetailsWrapper flex justify-between items-start">
          <Table className="bg-background my-4 shadow-helper max-w-[600px] ">
          <Thead>
            <Tr className="bg-primaryDark text-white h-[50px] flex items-center justify-between px-4">
              <Th className="text-start ">Image</Th>
              <Th className="text-start">Product Name</Th>
              <Th className="text-start">Price</Th>
              <Th className="text-start">Quantity</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartItems.map((item, index) => (
              <Tr
                key={index}
                className="border-b border-b-helper hover:bg-primaryLight hover:text-background flex items-center justify-between px-4"
              >
                <Td className="">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </Td>
                <Td>{item.productName}</Td>
                <Td>${item.price}</Td>
                <Td className="flex gap-4">
                  <div className="cartQuantityIcon bg-primaryDark w-[40px] h-[40px] flex-center rounded-full hover:bg-helper">
                  <FaMinus className="text-white cursor-pointer" />
                  </div>
                  <span className="border border-helper py-2 px-4">{item.quantity}</span>
                  <div className="cartQuantityIcon bg-primaryDark w-[40px] h-[40px] flex-center rounded-full hover:bg-helper">
                  <FaPlus className="text-white cursor-pointer" />
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <CartSummary/>
        </div>
      )}
    </div>
  );
};
export default Cart;
