import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './cartSlice';
import wishListReducer, { IWishListState } from './wishListSlice';
export interface ReduxState{
cart:CartState,
wishList:IWishListState
}
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList:wishListReducer
  },
  devTools:true,
});
export default store;