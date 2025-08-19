"use client"
import { CartState } from '@/app/redux/cartSlice';
import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import LinkComponent from '../linkComponent/LinkComponent';
import { IOrderItem } from '@/app/types/orders';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
interface CartTableSummaryProps {
  items?: IOrderItem[];
}
const CartTableSummary = ({ items }: CartTableSummaryProps) => {
  const { userDetails } = useUserDetails()
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const dataToRender = items || cartItems;
  return (
    <div className="cartTableSummaryContainer">
      {dataToRender === cartItems && <h2 className="subHeading text-lg font-semibold mb-3">Cart Items</h2>}
      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {dataToRender.map((item, index) => (
          <div
            key={index}
            className="bg-background p-4 rounded-lg shadow-helper border border-helper"
          >
            <div className="flex gap-4">
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded"
              />
              {/* Product Info */}
              <div className="flex-1 flex flex-col justify-between">
                {/* Product Name */}
                <LinkComponent
                  href={`/singleProduct/id:${item.productId}&slug:${item.productName}`}
                  text={item.productName}
                />
                {/* Price + Qty + Wish Info */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-primaryDark font-semibold">
                      ${item.price}
                    </span>
                    <span className="border border-helper py-1 px-3 rounded text-sm">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-primaryParagraph text-sm">
                      {item.wishersId && userDetails?._id
                        ? item.wishersId.toString() === userDetails._id.toString()
                          ? "For Self"
                          : "For Others"
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Desktop View (Table) */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="bg-background my-4 shadow-helper w-full">
          <Thead>
            <Tr className="bg-primaryDark text-white">
              <Th className="text-start p-3 w-[15%]">Image</Th>
              <Th className="text-start p-3 w-[40%]">Product Name</Th>
              <Th className="text-start p-3 w-[20%]">Price</Th>
              <Th className="text-start p-3 w-[25%]">Quantity</Th>
              <Th className="text-start p-3 w-[25%]">Order For</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataToRender.map((item, index) => (
              <Tr
                key={index}
                className="border-b border-b-helper hover:bg-primaryLight hover:text-background"
              >
                <Td className="p-3">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </Td>
                <Td className="p-3">
                  <LinkComponent
                    href={`/singleProduct/id:${item.productId}&slug:${item.productName}`}
                    text={item.productName}
                  />
                </Td>
                <Td className="p-3">${item.price}</Td>
                <Td className="p-3">
                  <span className="border border-helper py-2 px-4 inline-block">
                    {item.quantity}
                  </span>
                </Td>
                <Td className="p-3">
                  <span className='text-primaryParagraph'>
                    {item.wishersId && userDetails?._id
                      ? item.wishersId.toString() === userDetails._id.toString()
                        ? "For Self"
                        : "For Others"
                      : "N/A" // Fallback if either ID is missing
                    }
                  </span>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  )
}
export default CartTableSummary;