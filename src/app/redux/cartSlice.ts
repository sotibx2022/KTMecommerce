import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';
import { fetchCartFromDatabase } from '@/app/services/apiFunctions/cartItems';
export interface CartState {
  cartItems: ICartItem[];
  loading: boolean;
  initialized: boolean;
  error: string | null;
}
const saveCartToLocalStorage = (cartItems: ICartItem[]) => {
  try {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  } catch (error) {
    console.warn('Could not save cart to localStorage', error);
  }
};
const loadCartFromLocalStorage = (): ICartItem[] => {
  try {
    const stored = localStorage.getItem("cart_items");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Could not load cart from localStorage', error);
    return [];
  }
};
// Load initial state from localStorage
const initialCartItems = loadCartFromLocalStorage();
const initialState: CartState = {
  cartItems: initialCartItems,
  loading: false, // Start with false since we have localStorage data
  initialized: initialCartItems.length > 0, // Mark as initialized if we have items
  error: null,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{ cartItems: ICartItem[]; isLoading: boolean; initialized?: boolean }>) => {
      state.cartItems = action.payload.cartItems;
      state.loading = action.payload.isLoading;
      if (action.payload.initialized) {
        state.initialized = true;
      }
      saveCartToLocalStorage(state.cartItems);
    },
    addToCart: (state, action: PayloadAction<ICartItem[]>) => {
      const newItems = action.payload.filter(
        (item) => !state.cartItems.some(ci => ci.productId === item.productId)
      );
      if (newItems.length > 0) {
        state.cartItems = [...state.cartItems, ...newItems];
        saveCartToLocalStorage(state.cartItems);
      }
      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
      saveCartToLocalStorage(state.cartItems);
      state.loading = false;
    },
    updateCartItem: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const idx = state.cartItems.findIndex(item => item.productId === action.payload.productId);
      if (idx !== -1) {
        state.cartItems[idx].quantity = action.payload.quantity;
        saveCartToLocalStorage(state.cartItems);
      }
      state.loading = false;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart_items");
      state.loading = false;
      state.error = null;
    },
    clearCartError: (state) => {
      state.error = null;
    },
  },
});
export const {
  setCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCartItems,
  clearCartError
} = cartSlice.actions;
export default cartSlice.reducer;