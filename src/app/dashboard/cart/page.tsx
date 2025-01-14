"use client"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/app/redux/cartSlice";
import { RootState } from "@/app/redux/store";
import axios from "axios";
const CartPage = () => {
  const { cartItems, status, error } = useSelector((state: RootState) => state.cart);
  useEffect(() => {
   const findCartItems=async() =>{
    const response = await axios.get("/api/cart/cartItems");
    const result = response.data.cartItems;
    addToCart(result);
   }
   findCartItems()
  }, []);
  return (
    <div>
      <h1>Your Cart</h1>
      {/* Loading state */}
      {status === "loading" && <p>Loading cart items...</p>}
      {/* Error state */}
      {status === "failed" && <p>Error: {error}</p>}
      {/* Cart items state when successful */}
      {status === "succeeded" && (
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map((item, index: number) => (
              <li key={index}>
                {/* Display item details */}
                {item.productName} - Quantity: {item.quantity}
              </li>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </ul>
      )}
    </div>
  );
};
export default CartPage;
