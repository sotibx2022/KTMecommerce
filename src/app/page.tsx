import React from 'react'
import { getQueryClient } from './services/helperFunctions/getQueryClient'
import { fetchInitialCategories } from './data/fetchInitialCategories';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import HomePage from './HomePage';
const page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["initialCategories"],
    queryFn: fetchInitialCategories,
  })
  const dehydratedState = dehydrate(queryClient)
  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage/>
    </HydrationBoundary>
  )
}
export default page