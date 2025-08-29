import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
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
// persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishList', 'recent'], 
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER', 'persist/FLUSH'],
    },
  }),
});
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
