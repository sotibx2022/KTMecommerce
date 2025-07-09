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
  const addItemToCart = (cartItemDetails: ICartItem) => {
    try {
      // Guard: Check if cartItemDetails or productId exists
      if (!cartItemDetails?.productId) {
        toast.error("Invalid product data");
        return;
      }
      // Safe comparison with optional chaining
      const isItemInCart = cartItems.some(item => 
        item?.productId?.toString() === cartItemDetails.productId?.toString()
      );
      if (!isItemInCart) {
        mutation.mutate(cartItemDetails);
        dispatch(addToCart(cartItemDetails));
        removeItemFromWishList.mutate(cartItemDetails.productId);
      } else {
        toast.error(`${cartItemDetails.productName || "This item"} is already in your cart. Update the quantity there instead.`);
      }
    } catch (error) {
      toast.error("Failed to process cart item");
    }
  };
  return addItemToCart;
};
export default useAddItemToCart;