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
  const mutation = useMutation<APIResponseSuccess | APIResponseError, Error, ICartItem>({
    mutationFn: updatedCartItems,
    onSuccess: (response: APIResponseSuccess | APIResponseError) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const addItemToCart = async (cartItemDetails: ICartItem) => {
    try {
      const isItemInCart = cartItems.some(
        (item) => item.productId === cartItemDetails.productId
      ); // Check if item exists (corrected logic)
      if (!isItemInCart) {
        mutation.mutate(cartItemDetails);
        dispatch(addToCart(cartItemDetails));
        removeItemFromWishList.mutate(cartItemDetails.productId);
      } else {
        toast.error(`${cartItemDetails.productName} is already in your cart. Update the quantity there instead.`);
      }
    } catch (error) {
      toast.error("Failed to add item to cart. Please try again.");
    }
  };
  return addItemToCart;
};
export default useAddItemToCart;