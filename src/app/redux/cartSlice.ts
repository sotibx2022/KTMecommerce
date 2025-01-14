import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../types/user";
import axios from "axios";
// Define the state interface
interface CartState {
  cartItems: ICartItem[];
  status: "idle" | "loading" | "succeeded" | "failed"; // Add status to manage loading state
  error: string | null; // To manage errors
}
// Initial state
const initialState: CartState = {
  cartItems: [], // Initially empty
  status: "idle", // Default status
  error: null, // No errors initially
};
// Async thunk for fetching cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems", // The action name
  async (_, { rejectWithValue }) => {
    console.log("fetchCartItems async thunk started"); // Log when the async function starts
    try {
      const response = await axios.get("/api/cart/cartItems");
      console.log("Response from API:", response); // Log the response from the API
      console.log("Fetched cart items:", response.data.cartItems); // Log the fetched cart items
      return response.data.cartItems; // Return the fetched cart items
    } catch (error) {
      console.error("Error fetching cart items:", error); // Log the error if any
      return rejectWithValue("An error occurred while fetching the cart items.");
    }
  }
);
// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const newItem = action.payload;
      console.log("Adding new item to cart:", newItem); // Log the new item being added to the cart
      state.cartItems.push({ ...newItem, quantity: 1 });
      console.log("Updated cartItems after addition:", state.cartItems); // Log the updated cartItems
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        console.log("Fetching cart items: pending"); // Log when the fetch starts (pending state)
        state.status = "loading"; // Set status to loading when fetching
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        console.log("Fetching cart items: fulfilled"); // Log when the fetch is successful
        console.log("Fetched cart items:", action.payload); // Log the fetched cart items from action.payload
        state.status = "succeeded"; // Set status to succeeded when fetching is successful
        state.cartItems = action.payload; // Set the fetched items in the state
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        console.log("Fetching cart items: rejected"); // Log when the fetch fails (rejected state)
        console.log("Error message:", action.payload); // Log the error message from the rejected action
        state.status = "failed"; // Set status to failed if the fetch fails
        state.error = action.payload as string; // Set the error message
      });
  },
});
// Export the actions
export const { addToCart } = cartSlice.actions;
// Export the reducer
export default cartSlice.reducer;
