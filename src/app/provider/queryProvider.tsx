"use client"
import React, { ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getAllCategories } from '../services/queryFunctions/categoreis';
import { fetchCartFromDatabase } from '../services/apiFunctions/cartItems';
import { SpecificProducts } from '../services/apiFunctions/productsQuery';
const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
      },
    },
  });
 useEffect(()=>{
  const prefetchCreticalDatas=async()=>{
    await Promise.all([
      queryClient.prefetchQuery({queryKey:['categories'],queryFn:getAllCategories}),
      queryClient.prefetchQuery({queryKey: ['categoryType',"isNewArrivals"],queryFn:()=>SpecificProducts("isNewArrivals")}),
      queryClient.prefetchQuery({queryKey: ['categoryType',"isTrendingNow"],queryFn:()=>SpecificProducts("isTrendingNow")}),
      queryClient.prefetchQuery({queryKey: ['categoryType',"isTopSell"],queryFn:()=>SpecificProducts("isTopSell")}),
      queryClient.prefetchQuery({queryKey: ['categoryType',"isOfferItem"],queryFn:()=>SpecificProducts("isOfferItem")})
    ],
  )
  }
  prefetchCreticalDatas()
 },[queryClient])
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
export default QueryProvider;