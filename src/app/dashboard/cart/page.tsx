"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartState, removeFromCart } from "@/app/redux/cartSlice";
import PrimaryButton from "@/app/_components/primaryButton/PrimaryButton";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import Link from "next/link";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkComponent from "@/app/_components/linkComponent/LinkComponent";
import toast from "react-hot-toast";
import LoadingComponent from "@/app/_components/loadingComponent/LoadingComponent";
import axios from "axios";
const Cart = () => {
  const [loadingCompleted, setLoadingCompleted] = useState(false);  // New state to handle delay
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const dispatch = useDispatch();
  const removeCartItemFromCart = async (productId: string) => {
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart!");
    await axios.post("/api/cart/removeFromCart", { productId });
  };
  useEffect(() => {
    // Simulate loading state for at least 2 seconds
    const timer = setTimeout(() => {
      setLoadingCompleted(true);  // Set to true after 2 seconds
    }, 2000);
    // Clean up the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="container">
      {/* Show loading component for at least 2 seconds */}
      {!loadingCompleted ? (
        <div className="flex justify-center items-center h-[200px]">
          <LoadingComponent />
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
          <Table className="bg-background my-4 shadow-helper max-w-[600px]">
            <Thead>
              <Tr className="bg-primaryDark text-white h-[50px] flex items-center justify-between px-4">
                <Th className="text-start w-[1/6]">Image</Th>
                <Th className="text-start w-[2/6]">Product Name</Th>
                <Th className="text-start w-[1/6]">Price</Th>
                <Th className="text-start w-[1/6]">Quantity</Th>
                <Th className="text-start w-[1/6]">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map((item, index) => (
                <Tr
                  key={index}
                  className="border-b border-b-helper hover:bg-primaryLight hover:text-background flex items-center justify-between px-4"
                >
                  <Td className="w-[1/6]">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </Td>
                  <Td className="w-[2/6]">
                    <LinkComponent href={`http://localhost:3000/singleProduct/id:${item.productId}&,slug:${item.productName}`} text={item.productName} />
                  </Td>
                  <Td className="w-[1/6]">${item.price}</Td>
                  <Td className="flex gap-4 w-[2/6]">
                    <div className="cartQuantityIcon bg-primaryDark w-[40px] h-[40px] flex-center rounded-full hover:bg-helper">
                      <FaMinus className="text-white cursor-pointer" />
                    </div>
                    <span className="border border-helper py-2 px-4">{item.quantity}</span>
                    <div className="cartQuantityIcon bg-primaryDark w-[40px] h-[40px] flex-center rounded-full hover:bg-helper">
                      <FaPlus className="text-white cursor-pointer" />
                    </div>
                  </Td>
                  <Td>
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="bg-red-500 text-background p-2 rounded-full cursor-pointer"
                      onClick={() => removeCartItemFromCart(item.productId)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <CartSummary />
        </div>
      )}
    </div>
  );
};
export default Cart;
