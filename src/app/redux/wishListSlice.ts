import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWishListItem } from "../types/wishlist";
export interface IWishListState {
  wishListItems: IWishListItem[];
  wishListLoading: boolean;
}
const initialState: IWishListState = {
  wishListItems: [],
  wishListLoading: true,
};
const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    // Replace entire wishlist (e.g., after fetching from API)
    setWishList: (state, action: PayloadAction<IWishListItem[]>) => {
      state.wishListItems = action.payload;
      state.wishListLoading = false;
    },
    addToWishList: (state, action: PayloadAction<IWishListItem>) => {
        state.wishListItems.push(action.payload);
        state.wishListLoading = false;
    },
    removeFromWishList: (state, action: PayloadAction<string>) => {
      state.wishListItems = state.wishListItems.filter(item => item.productId !== action.payload);
      state.wishListLoading = false;
    },
    clearWishListItems: (state) => {
      state.wishListItems = [];
      state.wishListLoading = false;
    },
    setWishListLoading: (state, action: PayloadAction<boolean>) => {
      state.wishListLoading = action.payload;
    },
  },
});
export const {
  setWishList,
  addToWishList,
  removeFromWishList,
  clearWishListItems,
  setWishListLoading,
} = wishListSlice.actions;
export default wishListSlice.reducer;