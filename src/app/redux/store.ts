import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './cartSlice';
import wishListReducer, { IWishListState } from './wishListSlice';
import recentRecucer, { IRecentState } from './recentSlice'
export interface ReduxState{
cart:CartState,
wishList:IWishListState
recent:IRecentState
}
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList:wishListReducer,
    recent:recentRecucer
  },
  devTools:true,
});
export default store;