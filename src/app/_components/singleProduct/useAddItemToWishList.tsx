import { APIResponseError, APIResponseSuccess, updatedCartItems } from '@/app/services/queryFunctions/users';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/app/redux/cartSlice';
import { ICartItem } from '@/app/types/cart';
import { updateWishListItem } from '@/app/services/queryFunctions/wishList';
import { IWishListItem, IWishListItemDisplay } from '@/app/types/wishlist';
import { addToWishList } from '@/app/redux/wishListSlice';
import { ReduxState } from '@/app/redux/store';
const useAddItemToWishList = () => {
  const dispatch = useDispatch();
  const { wishListItems, wishListLoading } = useSelector((state: ReduxState) => state.wishList);
  const mutation = useMutation<APIResponseSuccess | APIResponseError, Error, IWishListItemDisplay>({
    mutationFn: updateWishListItem,
    onSuccess: (response: APIResponseSuccess | APIResponseError) => {
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const addItemsToWishList = async (wishItemDetails: IWishListItemDisplay) => {
    try {
      mutation.mutate(wishItemDetails);
      dispatch(addToWishList(wishItemDetails));
    } catch (error) {
      toast.error("Error adding item to the wishlist");
    }
  };
  return addItemsToWishList;
};
export default useAddItemToWishList;