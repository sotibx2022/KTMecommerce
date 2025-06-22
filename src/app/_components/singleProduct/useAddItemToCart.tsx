import { APIResponseError, APIResponseSuccess, updatedCartItems } from '@/app/services/queryFunctions/users';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import { ICartItem } from '@/app/types/cart';
import { removeFromWishList } from '@/app/redux/wishListSlice';
import { useRemoveWishListFromDB } from '@/app/dashboard/wishlist/useRemoveWIshListFromDB';
const useAddItemToCart = (userId:string) => {
  const dispatch = useDispatch();
  const removeItemFromWishList = useRemoveWishListFromDB(userId)
  // React Query mutation for updating cart in the database
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
      console.error("Error adding item to the cart:", error);
    }
  };
  return addItemToCart; // Return the function
};
export default useAddItemToCart;
