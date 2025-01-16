import { createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../types/user';
// Define the CartState interface
export interface CartState {
  cartItems: ICartItem[];
}
// Initial state
const initialState: CartState = {
  cartItems: [], // cartItems directly in the root of the state
};
// Create cart slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Set the entire cart
    setCart: (state, action) => {
      state.cartItems = action.payload; // Accessing cartItems directly
    },
    // Add a new item to the cart
    addToCart: (state, action) => {
      const { productId, productName, brand, price, image, quantity, userId, category } = action.payload;
      state.cartItems.push({
        productId,
        productName,
        brand,
        price,
        image,
        quantity,
        userId,
        category,
      });
    },
  },
});
// Export actions and reducer
export const { setCart, addToCart } = cartSlice.actions;
export default cartSlice.reducer;
