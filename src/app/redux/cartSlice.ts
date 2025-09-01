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
const initialState: CartState = {
  cartItems: [],
  loading: true,
  initialized: false,
};
// Helper functions for localStorage
const CART_STORAGE_KEY = 'cart';
const getCartFromLocalStorage = (): ICartItem[] => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};
const setCartToLocalStorage = (cartItems: ICartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
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
      // Save to localStorage whenever cart is set
      setCartToLocalStorage(state.cartItems);
    },
    addToCart: (state, action: PayloadAction<ICartItem[]>) => {
      const newItems = action.payload.filter(
        (item) => !state.cartItems.some(ci => ci.productId === item.productId)
      );
      if (newItems.length > 0) {
        state.cartItems = [...state.cartItems, ...newItems];
        // Save to localStorage after adding items
        setCartToLocalStorage(state.cartItems);
      }
      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(item => item.productId !== action.payload);
      state.loading = false;
      // Save to localStorage after removing item
      setCartToLocalStorage(state.cartItems);
    },
    updateCartItem: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const idx = state.cartItems.findIndex(item => item.productId === action.payload.productId);
      if (idx !== -1) {
        state.cartItems[idx].quantity = action.payload.quantity;
        // Save to localStorage after updating item
        setCartToLocalStorage(state.cartItems);
      }
      state.loading = false;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      state.loading = false;
      // Clear from localStorage
      setCartToLocalStorage(state.cartItems);
    },
    // New action to load cart from localStorage
    loadCartFromStorage: (state) => {
      const storedCart = getCartFromLocalStorage();
      state.cartItems = storedCart;
      state.initialized = true;
      state.loading = false;
    },
  },
});
export const { 
  setCart, 
  addToCart, 
  removeFromCart, 
  updateCartItem, 
  clearCartItems, 
  loadCartFromStorage 
} = cartSlice.actions;
export default cartSlice.reducer;