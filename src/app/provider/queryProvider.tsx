"use client"
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getUserDetails } from '../services/helperFunctions/getUserDetails';
import { fetchInitialCategories } from '../data/fetchInitialCategories';
import { fetchCartFromDatabase, fetchWishListFromDashboard } from '../services/apiFunctions/cartItems';
import { useUserDetails } from '../context/UserDetailsContextComponent';
const QueryProvider = ({ children }: { children: ReactNode }) => {
  const { userDetails } = useUserDetails();
  const [queryClient] = useState(new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
      },
    },
  }))
  queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
  })
  queryClient.prefetchQuery({
    queryKey: ['initialCategories'],
    queryFn: fetchInitialCategories,
  })
  if (userDetails) {
    queryClient.prefetchQuery({
      queryKey: ['cartItems'],
      queryFn: () => fetchCartFromDatabase,
    });
    queryClient.prefetchQuery({
      queryKey: ['wishListItems'],
      queryFn: fetchWishListFromDashboard,
    });
  }
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
};
export default QueryProvider;