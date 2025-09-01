import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';
import { fetchCartFromDatabase } from '@/app/services/apiFunctions/cartItems';
export interface CartState {
  cartItems: ICartItem[];
  loading: boolean;
  initialized: boolean;
  error: string | null;
}
// localStorage key
const CART_STORAGE_KEY = 'cart_items';
// Helper functions for localStorage
const saveCartToLocalStorage = (cartItems: ICartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.warn('Could not save cart to localStorage', error);
  }
};
const loadCartFromLocalStorage = (): ICartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
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
// Async thunk
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetchCartFromDatabase(userId);
      if (response && 'data' in response) {
        return response.data;
      } else {
        const errorMessage = (response as any)?.error || 'Failed to fetch cart items';
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);
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
      localStorage.removeItem(CART_STORAGE_KEY);
      state.loading = false;
      state.error = null;
    },
    clearCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        // Only update if we get new data, otherwise keep localStorage data
        if (action.payload && action.payload.length > 0) {
          state.cartItems = action.payload;
          saveCartToLocalStorage(action.payload);
        }
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload as string;
        // Keep the localStorage items even if fetch fails
      });
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