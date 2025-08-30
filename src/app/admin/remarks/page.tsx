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
const SkeletonTable = () => {
  // let's show 5 placeholder rows
  const rows = Array.from({ length: 5 })
  return (
    <Table>
      <TableCaption>Loading Reviews...</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">User</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Sentiment</TableHead>
          <TableHead>Review</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((_, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <div className="h-4 w-24 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
                <div className="h-4 w-28 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
              </div>
            </TableCell>
            <TableCell>
              <div className="h-4 w-10 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
            </TableCell>
            <TableCell>
              <div className="h-4 w-40 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
            </TableCell>
            <TableCell>
              <div className="h-4 w-20 rounded-md animate-pulse" style={{ background: "var(--primaryLight)" }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
const Page = () => {
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const response = await axios.get('/api/remarks/allRemarks');
      return response.data;
    },
    queryKey: ['allRemarks']
  })
  return (
    <div style={{ background: "var(--primaryDark)" }} className="p-4 rounded-xl">
      <TotalReviews />
      {isPending ? (
        <SkeletonTable />
      ) : (
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
            </TableRow>
          </TableHeader>
          <TableBody>
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
                <TableCell>{remark.rating} ⭐</TableCell>
                <TableCell>{remark.reviewSentiment}</TableCell>
                <TableCell>{remark.reviewDescription}</TableCell>
                <TableCell>
                  {DateFormator(remark.createdAt!)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
export default Page
