import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICartItem } from '../types/cart';
export interface CartState {
  cartItems: ICartItem[];
  loading: boolean;
  initialized:boolean;
}
interface ISetCartPayload{
  cartItems:ICartItem[],
isLoading:boolean
}
const initialState: CartState = {
  cartItems: [],
  loading: true,
  initialized:false,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ISetCartPayload>) => {
      state.cartItems = action.payload.cartItems;
      state.loading = action.payload.isLoading;
      if(!state.loading){
state.initialized = true
      }
    },
    addToCart: (state, action: PayloadAction<ICartItem[]>) => {
      const payloadItems = action.payload;
      const newItems = payloadItems.filter(payloadItem =>
        !state.cartItems.some(cartItem =>
          cartItem.productId === payloadItem.productId
        )
      );
      if (newItems.length > 0) {
        state.cartItems = [...state.cartItems, ...newItems];
      }
      state.loading = false;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;
    },
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
  },
});
export const {
  setCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;