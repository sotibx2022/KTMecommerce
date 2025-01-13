import React, { useContext } from 'react'
import { ICartItem } from '../types/user';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import { UserDetailsContext } from '../context/UserDetailsContextComponent';
const useAddItemToCart = () => {
     const context = useContext(UserDetailsContext);
     if(!context){
        throw new Error("User Details Context is not accessible at the single Product Page")
      }
      const {userDetails,setUserDetails} = context;
      console.log(userDetails);
    const dispatch = useDispatch();
    const addItemToCart = ({ ...cartItemDetails }: ICartItem) => {
        dispatch(addToCart(cartItemDetails));
        // Update Context API
        setUserDetails((prevDetails) => {
          if (!prevDetails) {
            throw new Error("User details are not available");
          }
          return {
            ...prevDetails, // Spread the existing user details
            carts: {
              ...prevDetails.carts, // Spread existing carts object (if any)
              cartItems: [
                ...(prevDetails.carts?.cartItems || []), // Spread existing cartItems
                cartItemDetails, // Add the new cart item
              ],
            },
          };
        });
      };
  return (
    <div>useAddItemToCart</div>
  )
}
export default useAddItemToCart