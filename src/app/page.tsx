import React from 'react'
import { getQueryClient } from './services/helperFunctions/getQueryClient'
import { fetchInitialCategories } from './data/fetchInitialCategories';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import HomePage from './HomePage';
import { getUserDetails } from './services/helperFunctions/getUserDetails';
import axios from 'axios';
import { SpecificProducts } from './services/apiFunctions/productsQuery';
import { config } from '@/config/configuration';
import { fetchCartFromDatabase, fetchWishListFromDashboard } from './services/apiFunctions/cartItems';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const page = async () => {
  const queryClient = getQueryClient();
  await Promise.all([
    // Prefetch categories
    queryClient.prefetchQuery({
      queryKey: ["initialCategories"],
      queryFn: fetchInitialCategories,
    }),
    // Prefetch cart items
    queryClient.prefetchQuery({
      queryKey: ['cartItems'],
      queryFn: fetchCartFromDatabase,
    }),
    // Prefetch wishlist items
    queryClient.prefetchQuery({
      queryKey: ['wishListItems'],
      queryFn: fetchWishListFromDashboard,
    }),
    // Prefetch user details
    queryClient.prefetchQuery({
      queryKey: ['user'],
      queryFn: getUserDetails,
    }),
    // Prefetch brands
    queryClient.prefetchQuery({
      queryKey: ['brands'],
      queryFn: async () => {
        const response = await axios.get(`${config.websiteUrl}/api/categories/brand`);
        return response.data.brandsArray;
      },
    }),
    // Prefetch product types
    ...["isTrendingNow", "isNewArrival", "isTopSell", "isOfferItem"].map((categoryItem: string) =>
      queryClient.prefetchQuery({
        queryKey: ['categoryType', categoryItem],
        queryFn: () => SpecificProducts(categoryItem, "1", "8")
      })
    ),
    // Prefetch sliders data
    queryClient.prefetchQuery({
      queryKey: ['slidersData'],
      queryFn: async () => {
        const response = await axios.get(`${config.websiteUrl}/api/sliders`);
        return response.data.data;
      }
    })
  ]);
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <Provider store={store}>
      <HomePage />
      </Provider>
    </HydrationBoundary>
  )
}
export default page