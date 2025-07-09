"use client";
import { APIResponseError, APIResponseSuccess, updatedCartItems } from '@/app/services/queryFunctions/users';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, CartState } from '@/app/redux/cartSlice';
import { ICartItem } from '@/app/types/cart';
import { removeFromWishList } from '@/app/redux/wishListSlice';
import { useRemoveWishListFromDB } from '@/app/dashboard/wishlist/useRemoveWIshListFromDB';
import { useContext } from 'react';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
const useAddItemToCart = () => {
  const { cartItems, loading: cartLoading } = useSelector((state: { cart: CartState }) => state.cart);
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("UserDetailsContext is not defined.");
  }
  const dispatch = useDispatch();
  const removeItemFromWishList = useRemoveWishListFromDB();
  const mutation = useMutation<APIResponseSuccess | APIResponseError, Error, ICartItem[]>({
    mutationFn: updatedCartItems,
    onSuccess: (response: APIResponseSuccess | APIResponseError) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const addItemToCart = (cartItemDetails: ICartItem[]) => {
    try {
      // Validate all items first
      for (const item of cartItemDetails) {
        if (!item?.productId) {
          toast.error("One or more items have invalid product data");
          return;
        }
      }
      // Filter out items already in cart
      const newItems = cartItemDetails.filter(item => 
        !cartItems.some(cartItem => 
          cartItem?.productId?.toString() === item?.productId?.toString()
        )
      );
      if (newItems.length === 0) {
        toast.error("All items are already in your cart. Update quantities there instead.");
        return;
      }
      // Add only new items
      mutation.mutate(newItems);
      newItems.forEach(item => {
        dispatch(addToCart(item));
        removeItemFromWishList.mutate(item.productId);
      });
    } catch (error) {
      toast.error("Failed to process cart items");
    }
  };
  return addItemToCart;
};
export default useAddItemToCart;