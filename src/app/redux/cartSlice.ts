import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';
export interface CartState {
  cartItems: ICartItem[];
  loading: boolean;
  initialized: boolean;
}
interface ISetCartPayload {
  cartItems: ICartItem[];
  isLoading: boolean;
  initialized?: boolean;
}
// localStorage key
const CART_STORAGE_KEY = 'cart_state';
// Helper functions for localStorage
const saveCartToLocalStorage = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(CART_STORAGE_KEY, serializedState);
  } catch (error) {
    console.warn('Could not save cart to localStorage', error);
  }
};
const loadCartFromLocalStorage = (): CartState | null => {
  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedState === null) return null;
    return JSON.parse(serializedState);
  } catch (error) {
    console.warn('Could not load cart from localStorage', error);
    return null;
  }
};
// Load initial state from localStorage or use default
const savedState = loadCartFromLocalStorage();
const initialState: CartState = savedState || {
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
        state.initialized = true;
      }
      saveCartToLocalStorage(state); // Save to localStorage
    },
    addToCart: (state, action: PayloadAction<ICartItem[]>) => {
      const newItems = action.payload.filter(
        (item) => !state.cartItems.some(ci => ci.productId === item.productId)
      );
      if (newItems.length > 0) {
        state.cartItems = [...state.cartItems, ...newItems];
      }
      state.loading = false;
      saveCartToLocalStorage(state); // Save to localStorage
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
      state.loading = false;
      saveCartToLocalStorage(state); // Save to localStorage
    },
    updateCartItem: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const idx = state.cartItems.findIndex(item => item.productId === action.payload.productId);
      if (idx !== -1) state.cartItems[idx].quantity = action.payload.quantity;
      state.loading = false;
      saveCartToLocalStorage(state); // Save to localStorage
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      state.loading = false;
      saveCartToLocalStorage(state); // Save to localStorage
    },
    // Optional: Clear localStorage specifically
    clearCartStorage: () => {
      localStorage.removeItem(CART_STORAGE_KEY);
      return initialState;
    },
  },
});
export const { 
  setCart, 
  addToCart, 
  removeFromCart, 
  updateCartItem, 
  clearCartItems, 
  clearCartStorage 
} = cartSlice.actions;
export default cartSlice.reducer;