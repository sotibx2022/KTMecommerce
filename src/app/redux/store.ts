import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer, { CartState } from './cartSlice';
import wishListReducer, { IWishListState } from './wishListSlice';
import recentReducer, { IRecentState } from './recentSlice';
export interface ReduxState {
  cart: CartState;
  wishList: IWishListState;
  recent: IRecentState;
}
// combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  wishList: wishListReducer,
  recent: recentReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;