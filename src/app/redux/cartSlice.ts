import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../types/user";
// Define the state interface
interface CartState {
  cartItems: ICartItem[];
}
// Initial state
const initialState: CartState = {
  cartItems: [], // The cart starts as empty
};
// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to add an item to the cart
    addToCart(state, action: PayloadAction<ICartItem>) {
      const newItem = action.payload;
        // Add the new item with an initial quantity
        state.cartItems.push({ ...newItem, quantity: 1 });
    },
  },
});
export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
