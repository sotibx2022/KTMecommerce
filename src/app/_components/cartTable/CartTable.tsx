"use client"
import { CartState, removeFromCart } from '@/app/redux/cartSlice';
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { updateCartItem } from "@/app/redux/cartSlice";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import LinkComponent from '../linkComponent/LinkComponent';
import axios from 'axios';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import { Badge } from '@/components/ui/badge';
import { Rupee } from '../productCard/Rupee';
const CartTable = () => {
  const { userDetails } = useUserDetails()
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  // Update Cart Mutation
  interface IUpdateCartData {
    productId: string;
    quantity: number;
  }
  const updateCart = async (data: IUpdateCartData): Promise<APIResponseSuccess | APIResponseError> => {
    const response = await axios.post('/api/cart/updateCart', data);
    return response.data;
  }
  const updateCartMutation = useMutation<APIResponseSuccess | APIResponseError, Error, IUpdateCartData>({
    mutationFn: updateCart,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"], refetchType: 'active' });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update cart");
    }
  });
  // Delete Cart Mutation
  interface IDeleteCartData {
    productId: string;
  }
  const deleteCartItem = async (data: IDeleteCartData): Promise<APIResponseSuccess | APIResponseError> => {
    const response = await axios.post('/api/cart/removeFromCart', data);
    return response.data;
  }
  const deleteCartMutation = useMutation<APIResponseSuccess | APIResponseError, Error, IDeleteCartData>({
    mutationFn: deleteCartItem,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"], refetchType: 'active' });
      toast.success(response.message || "Item removed from cart!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove item");
    }
  });
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > 10) return;
    dispatch(updateCartItem({ productId, quantity: newQuantity }));
    updateCartMutation.mutate({ productId, quantity: newQuantity });
  };
  const removeCartItemFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
    deleteCartMutation.mutate({ productId });
  };
  return (
    <div className="cart-container">
      {/* Mobile View (Cards) */}
      <div className="md:hidden space-y-4">
        {cartItems.map((item, index) => (
          <div key={index} className="bg-background p-4 rounded-lg shadow-helper border border-helper">
            <div className="flex  flex-col gap-4">
              <div className='flex justify-between items-center'>
                <img
                src={item.image}
                alt={item.productName}
                className="w-20 h-20 object-cover rounded"
              />
              <Badge variant="success">
                      {item.wishersId && userDetails?._id
                        ? item.wishersId.toString() === userDetails._id.toString()
                          ? "For Self"
                          : "For Others"
                        : "N/A" // Fallback if either ID is missing
                      }
                    </Badge>
              </div>
              <div className="flex justify-between items-start">
                  <LinkComponent
                    href={`/singleProduct/productIdentifier?id=${item.productId}&slug=${item.productName}`}
                    text={item.productName}
                  />
                  <button
                    onClick={() => removeCartItemFromCart(item.productId)}
                    className="text-red-500 p-1"
                    aria-label="Remove item"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-lg" />
                  </button>
                </div>
              <div className="flex  items-center gap-2">
                    <button
                      className="bg-primaryDark text-white w-8 h-8 rounded-full flex items-center justify-center"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="border border-helper px-3 py-1">{item.quantity}</span>
                    <button
                      className="bg-primaryDark text-white w-8 h-8 rounded-full flex items-center justify-center"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
              <div className="flex-1">
                <div className="mt-2 text-primaryDark font-semibold"><Rupee price={item.price}/></div>
                <div className="flex items-center justify-between mt-3">
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
              <Th className="text-start p-3 w-[35%]">Product Name</Th>
              <Th className="text-start p-3 w-[15%]">Price</Th>
              <Th className="text-start p-3 w-[20%]">Quantity</Th>
              <Th className="text-start p-3 w-[20%]">Wisher</Th>
              <Th className="text-start p-3 w-[15%]">Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {cartItems.map((item, index) => (
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
                <Td className="p-3"><Rupee price={item.price}/></Td>
                <Td className="p-3">
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-primaryDark text-white w-8 h-8 rounded-full flex items-center justify-center"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="border border-helper px-3 py-1">{item.quantity}</span>
                    <button
                      className="bg-primaryDark text-white w-8 h-8 rounded-full flex items-center justify-center"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>
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
                <Td className="p-3">
                  <button
                    onClick={() => removeCartItemFromCart(item.productId)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove item"
                  >
                    <FontAwesomeIcon icon={faTimes} className="text-lg" />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  )
}
export default CartTable;