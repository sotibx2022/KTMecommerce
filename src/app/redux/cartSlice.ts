import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';
export interface CartState {
  cartItems: ICartItem[];
  loading: boolean;
}
const initialState: CartState = {
  cartItems: [],
  loading: true,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Set the entire cart (e.g., after fetching from API)
    setCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;
      state.loading = false;
    },
    // Add a new item to the cart
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const duplicatedCartItem = (state.cartItems.some((cartItem) => {
        return cartItem.productId === action.payload.productId
      }))
      if (!duplicatedCartItem) {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
    },
    // Remove an item from the cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;
    },
    // Update an item's quantity
    updateCartItem: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity = action.payload.quantity;
      }
      state.loading = false;
    },
    // Clear the entire cart
    clearCartItems: (state) => {
      state.cartItems = [];
      state.loading = false;
    },
    // Optional: Set loading state explicitly
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});
export const {
  setCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCartItems,
  setLoading, // Optional, for manual control
} = cartSlice.actions;
export default cartSlice.reducer;