"use client"
import { CartState } from '@/app/redux/cartSlice';
import React from 'react'
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import LinkComponent from '../linkComponent/LinkComponent';
import { IOrderItem } from '@/app/types/orders';
interface CartTableSummaryProps {
  items?: IOrderItem[]; // Make items prop optional
}
const CartTableSummary = ({ items }: CartTableSummaryProps) => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  // Use props if available, otherwise use Redux cart items
  const dataToRender = items || cartItems;
  return (
    <div className="cartTableSummaryContainer">
      {dataToRender ===cartItems && <h2 className="subHeading">Cart Items</h2>}
      <Table className="bg-background my-4 shadow-helper min-w-[500px]">
        <Thead>
          <Tr className="bg-primaryDark text-white h-[50px] flex items-center justify-between px-4">
            <Th className="text-start w-[1/6]">Image</Th>
            <Th className="text-start w-[2/6]">Product Name</Th>
            <Th className="text-start w-[1/6]">Price</Th>
            <Th className="text-start w-[1/6]">Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataToRender.map((item, index) => (
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
                <LinkComponent 
                  href={`/singleProduct/id:${item.productId}&slug:${item.productName}`} 
                  text={item.productName} 
                />
              </Td>
              <Td className="w-[1/6]">${item.price}</Td>
              <Td className="flex gap-4 w-[2/6]">
                <span className="border border-helper py-2 px-4">{item.quantity}</span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}
export default CartTableSummary;