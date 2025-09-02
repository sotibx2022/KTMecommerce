export interface CartState {
  cartItems: ICartItem[];
  isInitialized: boolean; // Add this flag
}
const initialState: CartState = {
  cartItems: initialCartItems,
  isInitialized: false, // Start as false
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;
      state.isInitialized = true; // Set to true when cart is set
      saveCartToLocalStorage(state.cartItems);
    },
    // ... other reducers ...
    clearCartItems: (state) => {
      state.cartItems = [];
      state.isInitialized = true; // Also set to true on clear
      localStorage.removeItem("cart_items");
    },
    // Add a new action to just set the initialized flag
    markCartAsInitialized: (state) => {
      state.isInitialized = true;
    },
  },
});
// Export the new action
export const { markCartAsInitialized, /* ... other actions ... */ } = cartSlice.actions;