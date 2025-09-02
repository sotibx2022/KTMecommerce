import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../types/cart"; // adjust path based on your project
// Utility: save cart items to local storage
const saveCartToLocalStorage = (cartItems: ICartItem[]) => {
  localStorage.setItem("cart_items", JSON.stringify(cartItems));
};
// Utility: load cart items from local storage
const loadCartFromLocalStorage = (): ICartItem[] => {
  const stored = localStorage.getItem("cart_items");
  return stored ? JSON.parse(stored) : [];
};
export interface CartState {
  cartItems: ICartItem[];
  isInitialized: boolean;
}
const initialCartItems = loadCartFromLocalStorage();
const initialState: CartState = {
  cartItems: initialCartItems,
  isInitialized: true, // ✅ mark as initialized immediately after hydration
};
// Payload type for updating cart item
interface UpdateCartItemPayload {
  productId: string;
  quantity: number;
}
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;
      state.isInitialized = true;
      saveCartToLocalStorage(state.cartItems);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      state.isInitialized = true;
      localStorage.removeItem("cart_items");
    },
    // Add an item
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      state.cartItems.push(action.payload);
      saveCartToLocalStorage(state.cartItems);
    },
    // Remove item by productId
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      saveCartToLocalStorage(state.cartItems);
    },
    // Update item quantity by productId
    updateCartItem: (state, action: PayloadAction<UpdateCartItemPayload>) => {
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.cartItems[index].quantity = action.payload.quantity;
        saveCartToLocalStorage(state.cartItems);
      }
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
} = cartSlice.actions;
// Export reducer
export default cartSlice.reducer;
