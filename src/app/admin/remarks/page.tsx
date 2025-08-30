"use client"
import React from 'react'
import TotalReviews from './reviewsComponent/TotalReviews'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IRemarksBase } from '@/app/types/remarks'
import { DateFormator } from '@/app/services/helperFunctions/functions'
import { Check, Star, Trash2 } from 'lucide-react'
import SkeletonReviewsTable from './reviewsComponent/SkletonReviewsTable'
const Page = () => {
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const response = await axios.get('/api/remarks/allRemarks');
      return response.data;
    },
    queryKey: ['allRemarks']
  })
  return (
    <div className="p-4 rounded-xl">
      <TotalReviews />
        <Table>
          <TableCaption>Customer Reviews</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">User</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {isPending ? <SkeletonReviewsTable/>: <TableBody>
            {data && data.allRemarks.map((remark: IRemarksBase, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {remark.reviewedBy.fullName}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <img
                    src={remark.productIdentifier.productImage}
                    alt={remark.productIdentifier.productName}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  {remark.productIdentifier.productName}
                </TableCell>
                <TableCell className="flex items-center gap-1">
                  {remark.rating}
                  <Star className="w-4 h-4 text-helper" />
                </TableCell>
                <TableCell>{remark.reviewSentiment}</TableCell>
                <TableCell>{remark.reviewDescription}</TableCell>
                <TableCell>
                  {DateFormator(remark.createdAt!)}
                </TableCell>
                <TableCell className="flex flex-col gap-4">
                  <span className="flex items-center gap-1 text-red-500 cursor-pointer">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </span>
                  <span className="flex items-center gap-1 text-green-600 cursor-pointer">
                    <Check className="w-4 h-4" />
                    Approve
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>}
        </Table>
    </div>
  )
}
export default Page
