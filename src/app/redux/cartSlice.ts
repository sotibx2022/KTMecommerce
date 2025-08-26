import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';
export interface CartState {
  cartItems: ICartItem[];
  loading: boolean;
  initialized: boolean; // true only after hydration
}
interface ISetCartPayload {
  cartItems: ICartItem[];
  isLoading: boolean;
  initialized?: boolean; // optional, only true when hydration done
}
const initialState: CartState = {
  cartItems: [],
  loading: true,
  initialized: false,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ISetCartPayload>) => {
      state.cartItems = action.payload.cartItems;
      state.loading = action.payload.isLoading;
      if (action.payload.initialized) {
        state.initialized = true; // only set after hydration
      }
    },
    addToCart: (state, action: PayloadAction<ICartItem[]>) => {
      const newItems = action.payload.filter(
        (item) => !state.cartItems.some(ci => ci.productId === item.productId)
      );
      if (newItems.length > 0) {
        state.cartItems = [...state.cartItems, ...newItems];
      }
      state.loading = false; // keep initialized untouched
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
      state.loading = false;
    },
    updateCartItem: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const idx = state.cartItems.findIndex(item => item.productId === action.payload.productId);
      if (idx !== -1) state.cartItems[idx].quantity = action.payload.quantity;
      state.loading = false;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      state.loading = false;
    },
  },
});
export const { setCart, addToCart, removeFromCart, updateCartItem, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
