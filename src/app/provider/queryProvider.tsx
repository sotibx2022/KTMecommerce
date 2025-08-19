"use client"
import React, { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getUserDetails } from '../services/helperFunctions/getUserDetails';
import { fetchInitialCategories } from '../data/fetchInitialCategories';
const QueryProvider = ({ children }: { children: ReactNode }) => {
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
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
};
export default QueryProvider;