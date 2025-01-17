import { createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';
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
    removeFromCart: (state, action) => {
      const productId  = action.payload;
      const existingItemIndex = state.cartItems.findIndex((item: ICartItem) => {
        return item.productId === productId;
      });
      if (existingItemIndex !== -1) {
        state.cartItems.splice(existingItemIndex, 1);
      }
    }
  },
});
// Export actions and reducer
export const { setCart, addToCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
