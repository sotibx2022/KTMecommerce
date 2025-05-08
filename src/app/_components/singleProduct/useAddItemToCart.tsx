import { APIResponseError, APIResponseSuccess, updatedCartItems } from '@/app/services/queryFunctions/users';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import { ICartItem } from '@/app/types/cart';
const useAddItemToCart = () => {
  const dispatch = useDispatch();
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
    } catch (error) {
      console.error("Error adding item to the cart:", error);
    }
  };
  return addItemToCart; // Return the function
};
export default useAddItemToCart;
