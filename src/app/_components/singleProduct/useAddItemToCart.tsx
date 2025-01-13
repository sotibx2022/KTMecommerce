import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { addToCart } from '@/app/redux/cartSlice';
import { APIResponseError, APIResponseSuccess, updatedCartItems } from '@/app/services/queryFunctions/users';
import { ICartItem } from '@/app/types/user';
import { useMutation } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
// Function to update cart in the database
const useAddItemToCart = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("User Details Context is not accessible at the single Product Page");
  }
  const { userDetails, setUserDetails } = context;
  const dispatch = useDispatch();
  // React Query mutation for updating cart in the database
  const mutation = useMutation<APIResponseSuccess | APIResponseError, Error, ICartItem>({
    mutationFn: updatedCartItems,
    onSuccess: (response: APIResponseSuccess | APIResponseError) => {
      toast.success(response.message);
    },
    onError: (error) => {
      console.error("Mutation Error:", error); // Logs error details
      toast.error(error.message);
    },
  });
  const addItemToCart = async (cartItemDetails: ICartItem) => {
    try {
      // Await mutation to ensure successful database update before proceeding
      await mutation.mutateAsync(cartItemDetails);
      // Dispatch to Redux store
      dispatch(addToCart(cartItemDetails));
      // Update Context API
      setUserDetails((prevDetails) => {
        if (!prevDetails) {
          throw new Error("User details are not available");
        }
        // Add new item to the cartItems array without replacing existing items
        const updatedCartItems = [
          ...(prevDetails.carts?.cartItems || []), // Spread existing items
          cartItemDetails, // Add the new item
        ];
        return {
          ...prevDetails,
          carts: {
            ...prevDetails.carts,
            cartItems: updatedCartItems, // Updated cart items
          },
        };
      });
    } catch (error) {
      console.error("Error adding item to the cart:", error);
    }
  };
  return addItemToCart; // Return the function
};
export default useAddItemToCart;
