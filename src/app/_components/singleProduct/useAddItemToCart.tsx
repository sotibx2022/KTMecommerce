"use client"
import { APIResponseError, APIResponseSuccess, updatedCartItems } from '@/app/services/queryFunctions/users';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import { ICartItem } from '@/app/types/cart';
import { removeFromWishList } from '@/app/redux/wishListSlice';
import { useRemoveWishListFromDB } from '@/app/dashboard/wishlist/useRemoveWIshListFromDB';
import { useContext } from 'react';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
const useAddItemToCart = () => {
  const context = useContext(UserDetailsContext);
  if(!context){
    throw new Error("User Details Context is not defined.")
  }
  const dispatch = useDispatch();
  const removeItemFromWishList = useRemoveWishListFromDB()
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
       mutation.mutate(cartItemDetails);
      dispatch(addToCart(cartItemDetails));
      removeItemFromWishList.mutate(cartItemDetails.productId)
    } catch (error) {
    }
  };
  return addItemToCart; // Return the function
};
export default useAddItemToCart;
