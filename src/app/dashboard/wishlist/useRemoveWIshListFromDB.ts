import axios from 'axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromWishList } from '@/app/redux/wishListSlice';
import { useDispatch } from 'react-redux';
export const useRemoveWishListFromDB = (userId: string) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const removeItemFromDataBase = async (productId: string) => {
    dispatch(removeFromWishList(productId));
    const response = await axios.post('/api/wishList/removeFromWishList', { productId });
    return response.data;
  };
  return useMutation({
    mutationFn: removeItemFromDataBase,
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ["wishListItems", userId],
        refetchType: 'active',
      });
    },
    onError: (error) => {
      console.error('Error removing item from wishlist:', error);
    }
  });
};