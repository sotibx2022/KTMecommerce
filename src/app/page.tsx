import React from 'react'
import { getQueryClient } from './services/helperFunctions/getQueryClient'
import { fetchInitialCategories } from './data/fetchInitialCategories';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import HomePage from './HomePage';
import { getUserDetails } from './services/helperFunctions/getUserDetails';
import axios from 'axios';
import { SpecificProducts } from './services/apiFunctions/productsQuery';
const page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["initialCategories"],
    queryFn: fetchInitialCategories,
  })
  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
  })
  await queryClient.prefetchQuery({
    queryFn: async () => {
      const response = await axios.get('/api/categories/brand');
      return response.data.brandsArray
    },
    queryKey: ['brands'],
  })
  await queryClient.prefetchQuery({
    queryKey: ['categoryType', "isTrendingNow"],
    queryFn: () => SpecificProducts("isTrendingNow", "1", "8")
  })
  await queryClient.prefetchQuery({
    queryKey: ['categoryType', "isNewArrival"],
    queryFn: () => SpecificProducts("isNewArrival", "1", "8")
  })
  await queryClient.prefetchQuery({
    queryKey: ['categoryType', "isTopSell"],
    queryFn: () => SpecificProducts("isTopSell", "1", "8")
  })
  await queryClient.prefetchQuery({
    queryKey: ['categoryType', "isOfferItem"],
    queryFn: () => SpecificProducts("isOfferItem", "1", "8")
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  )
}
export default page