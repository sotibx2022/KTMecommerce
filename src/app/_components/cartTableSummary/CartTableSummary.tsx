"use client"
import { CartState } from '@/app/redux/cartSlice';
import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import LinkComponent from '../linkComponent/LinkComponent';
import { IOrderItem } from '@/app/types/orders';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
interface CartTableSummaryProps {
  items?: IOrderItem[];
}
const CartTableSummary = ({ items }: CartTableSummaryProps) => {
  const userDetailsContext = useContext(UserDetailsContext);
  if (!userDetailsContext) {
    throw new Error("User Details Context is not defined here.")
  }
  const { userDetails } = userDetailsContext
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const dataToRender = items || cartItems;
  return (
    <div className="cartTableSummaryContainer">
      {dataToRender === cartItems && <h2 className="subHeading text-lg font-semibold mb-3">Cart Items</h2>}
      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {dataToRender.map((item, index) => (
          <div key={index} className="bg-background p-4 rounded-lg shadow-helper border border-helper">
            <div className="flex gap-4">
              <img
                src={item.image}
                alt={item.productName}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <LinkComponent
                  href={`/singleProduct/id:${item.productId}&slug:${item.productName}`}
                  text={item.productName}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-primaryDark font-semibold">${item.price}</span>
                  <span className="border border-helper py-1 px-3 rounded">
                    Qty: {item.quantity}
                  </span>
                  <div className="p-3">
  <span className='text-primaryParagraph'>
    {item.wishersId && userDetails?._id 
      ? item.wishersId.toString() === userDetails._id.toString() 
        ? "For Self" 
        : "For Others"
      : "N/A" // Fallback if either ID is missing
    }
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
                  {userDetails?._id?.toString() === item.wishersId?.toString() ? (
                    <span>self Order</span>
                  ) : (
                    <span>Order for others</span>
                  )}
                </Td>
                <Td className="p-3">
                  <span className="border border-helper py-2 px-4 inline-block">
                    {item.quantity}
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