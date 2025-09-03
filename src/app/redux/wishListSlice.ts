import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWishListItemDisplay } from "../types/wishlist";
export interface IWishListState {
  wishListItems: IWishListItemDisplay[];
  initialized: boolean;
}
const initialState: IWishListState = {
  wishListItems: [],
  initialized: false,
};
const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<IWishListItemDisplay[]>) => {
      state.wishListItems = action.payload;
    },
    addToWishList: (state, action: PayloadAction<IWishListItemDisplay>) => {
      state.wishListItems.push(action.payload);
    },
    removeFromWishList: (state, action: PayloadAction<string>) => {
      state.wishListItems = state.wishListItems.filter(
        (item) => item.productId !== action.payload
      );
    },
    clearWishListItems: (state) => {
      state.wishListItems = [];
    },
    setWishlistInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
});
export const {
  setWishList,
  addToWishList,
  removeFromWishList,
  clearWishListItems,
  setWishlistInitialized,
} = wishListSlice.actions;
export default wishListSlice.reducer;
