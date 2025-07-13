"use client"
import axios from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWishList } from '@/app/redux/wishListSlice';
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
export const useRemoveWishListFromDB = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { userDetails } = useUserDetails();
  const removeItemFromDataBase = async (productId: string) => {
    if (!userDetails?._id) {
      throw new Error("User ID is not available");
    }
    dispatch(removeFromWishList(productId));
    const response = await axios.post('/api/wishList/removeFromWishList', { 
      productId,
    });
    return response.data;
  };
  return useMutation({
    mutationFn: removeItemFromDataBase,
    onSuccess: () => {
      if (userDetails?._id) {
        queryClient.invalidateQueries({ 
          queryKey: ["wishListItems", userDetails._id.toString()],
          refetchType: 'active',
        });
      }
    },
    onError: (error) => {
      console.error('Error removing item from wishlist:', error);
      // Optionally: dispatch an action to revert the optimistic update
    }
  });
};