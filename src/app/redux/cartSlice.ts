import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';
import { fetchCartFromDatabase } from '@/app/services/apiFunctions/cartItems';
import { APIResponseSuccess, APIResponseError } from '@/app/services/queryFunctions/users';
export interface CartState {
  cartItems: ICartItem[];
  loading: boolean;
  initialized: boolean;
  error: string | null;
}
// Define the return type for the async thunk
interface FetchCartResult {
  data: ICartItem[];
  error?: string;
}
// Async thunk with proper typing
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (userId: string, { rejectWithValue }): Promise<ICartItem[] | ReturnType<typeof rejectWithValue>> => {
    try {
      const response = await fetchCartFromDatabase();
      // Handle the API response structure
      if (response.success) {
        return response.data!; // Return the actual cart items array
      } else {
        return rejectWithValue('Failed to fetch cart items');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);
const initialState: CartState = {
  cartItems: [],
  loading: true,
  initialized: false,
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
    },
    addToCart: (state, action: PayloadAction<ICartItem[]>) => {
      const newItems = action.payload.filter(
        (item) => !state.cartItems.some(ci => ci.productId === item.productId)
      );
      if (newItems.length > 0) {
        state.cartItems = [...state.cartItems, ...newItems];
      }
      state.loading = false;
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
      .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<ICartItem[]>) => {
        state.loading = false;
        state.initialized = true;
        state.cartItems = action.payload;
        state.error = null;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.payload as string;
        state.cartItems = state.cartItems.length > 0 ? state.cartItems : [];
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