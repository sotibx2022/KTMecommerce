import { CartState, removeFromCart } from '@/app/redux/cartSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import {  updateCartItem } from "@/app/redux/cartSlice";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import LinkComponent from '../linkComponent/LinkComponent';
import axios from 'axios';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
const CartTable = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
      const updateQuantity = async(productId: string, newQuantity: number) => {
        if (newQuantity < 1 && newQuantity<10) return; // Prevent quantity from going below 1
        dispatch(updateCartItem({ productId, quantity: newQuantity }));
        await axios.post("/api/cart/updateCart",{productId,quantity:newQuantity});
      };
      const removeCartItemFromCart = async (productId: string) => {
        dispatch(removeFromCart(productId));
        toast.success("Item removed from cart!");
        await axios.post("/api/cart/removeFromCart", { productId });
      };
  return (
    <div>
        <Table className="bg-background my-4 shadow-helper">
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
  <div
    className="cartQuantityIcon bg-primaryDark w-[40px] h-[40px] flex-center rounded-full hover:bg-helper"
    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
  >
    <FaMinus className="text-white cursor-pointer" />
  </div>
  <span className="border border-helper py-2 px-4">{item.quantity}</span>
  <div
    className="cartQuantityIcon bg-primaryDark w-[40px] h-[40px] flex-center rounded-full hover:bg-helper"
    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
  >
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
    </div>
  )
}
export default CartTable