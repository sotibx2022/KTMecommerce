"use client"
import React from "react"
import TotalReviews from "./reviewsComponent/TotalReviews"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IRemarksBaseForDB } from "@/app/types/remarks"
import { DateFormator } from "@/app/services/helperFunctions/functions"
import { Check, MessageCircleQuestion, Star, Trash2 } from "lucide-react"
import SkeletonReviewsTable from "./reviewsComponent/SkletonReviewsTable"
import toast from "react-hot-toast"
import { APIResponseSuccess } from "@/app/services/queryFunctions/users"
import NoData from "@/app/_components/noData/NoData"
import { useSidebar } from "@/components/ui/sidebar"
const Page = () => {
  const { state: sidebarState } = useSidebar()
  const isCollapsed = sidebarState === "collapsed"
  // Fetch all remarks
  const { data, isPending: reviewsListPending, refetch } = useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/remarks/allRemarks")
      return response.data
    },
    queryKey: ["allRemarks"],
  })
  // Mutation for approve/delete
  const updateReviewMutation = useMutation<
    APIResponseSuccess,
    Error,
    { reviewAction: string; reviewId: string }
  >({
    mutationFn: async ({ reviewAction, reviewId }) => {
      const response = await axios.post(
        "/api/remarks/specificRemark",
        {},
        { headers: { reviewAction, reviewId } }
      )
      return response.data
    },
    onSuccess: (response) => {
      toast.success(response.message)
      refetch()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const isPending = reviewsListPending || updateReviewMutation.isPending
  return (
    <div className="p-4 rounded-xl">
      <TotalReviews />
      {isPending ? (
        <SkeletonReviewsTable />
      ) : data && data.allRemarks.length > 0 ? (
        <>
          <h2 className="secondaryHeading mb-4">
            Neutral Remarks - Requires Admin's action
          </h2>
          <Table
            style={{
              maxWidth: isCollapsed ? "85vw" : "70vw",
            }}
          >
            <TableCaption>Customer Reviews</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[100px]">User</TableHead>
                <TableHead className="min-w-[200px]">Product</TableHead>
                <TableHead className="w-[300px]">Review</TableHead>
                <TableHead className="min-w-[100px]">Date</TableHead>
                <TableHead className="min-w-[100px]">Rating</TableHead>
                <TableHead className="min-w-[180px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.allRemarks.map((remark: IRemarksBaseForDB, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{remark.reviewedBy.fullName}</TableCell>
                  <TableCell className="flex items-center gap-2 min-w-0">
                    <img
                      src={remark.productIdentifier.productImage}
                      alt={remark.productIdentifier.productName}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <span className="truncate">{remark.productIdentifier.productName}</span>
                  </TableCell>
                  <TableCell className="w-[300px]">{remark.reviewDescription}</TableCell>
                  <TableCell>{DateFormator(remark.createdAt!)}</TableCell>
                  <TableCell><div className="flex gap-2 justify-between items-center"><span>{remark.rating}</span>
                  <Star className="text-helper"/></div></TableCell>
                    <TableCell className="flex flex-col justify-center items-center gap-4">
  <div
    className="flex items-center gap-1 text-red-500 cursor-pointer"
    onClick={() =>
      updateReviewMutation.mutate({
        reviewAction: "delete",
        reviewId: remark._id!.toString(),
      })
    }
  >
    <Trash2 className="w-4 h-4" />
    <span>Delete</span>
  </div>
  <div
    className="flex items-center gap-1 text-green-600 cursor-pointer"
    onClick={() =>
      updateReviewMutation.mutate({
        reviewAction: "approve",
        reviewId: remark._id!.toString(),
      })
    }
  >
    <Check className="w-4 h-4" />
    <span>Approve</span>
  </div>
</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <NoData
          icon={<MessageCircleQuestion />}
          notFoundMessage={"There are No Neutral Remarks found."}
        />
      )}
    </div>
  )
}
export default Page
