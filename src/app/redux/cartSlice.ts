import { createSlice } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';
export interface CartState {
  cartItems: ICartItem[];
}
const initialState: CartState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
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
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item.productId !== productId);
    },
    updateCartItem: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        item => item.productId === action.payload.productId
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity = action.payload.quantity;
      }
    },
    clearCartItems: (state) => {
      // Simply reset the cartItems array to empty
      state.cartItems = [];
    }
  },
});
// Export the new action
export const { 
  setCart, 
  addToCart, 
  removeFromCart, 
  updateCartItem, 
  clearCartItems // Added here
} = cartSlice.actions;
export default cartSlice.reducer;