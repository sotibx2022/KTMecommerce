import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../types/cart"; // adjust path based on your project
export interface CartState {
  cartItems: ICartItem[];
  isInitialized: boolean;
}
// Payload type for updating cart item
interface UpdateCartItemPayload {
  productId: string;
  quantity: number;
}
const initialState: CartState = {
  cartItems: [],
  isInitialized: false, // Start as false, will be initialized after fetching from server
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;
      state.isInitialized = true;
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      state.isInitialized = true;
    },
    // Add an item
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      state.cartItems.push(action.payload);
    },
    // Remove item by productId
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },
    // Update item quantity by productId
    updateCartItem: (state, action: PayloadAction<UpdateCartItemPayload>) => {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.cartItems[index].quantity = action.payload.quantity;
      }
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
  },
});
// Export actions
export const {
  setCart,
  clearCartItems,
  addToCart,
  removeFromCart,
  updateCartItem,
  setInitialized,
} = cartSlice.actions;
// Export reducer
export default cartSlice.reducer;