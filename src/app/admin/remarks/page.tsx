"use client"
import React from 'react'
import TotalReviews from './reviewsComponent/TotalReviews'
import UnderDevelopment from '@/app/_components/UnderDevelopment/UnderDevelopment'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const page = () => {
  const { data: allReviews, isPending } = useQuery({
    queryFn: async () => {
      const response = await axios.get('/api/remarks/allRemarks');
      return response.data;
    },
    queryKey: ['allRemarks']
  })
  console.log(allReviews);
  return (
    <div>
      <TotalReviews />
    </div>
  )
}
export default page