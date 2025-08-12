"use client"
interface ISearchParams {
  createdSorting: "normal" | "assending" | "dessending",
  status: "registered" | "updated" | "customer"
}
const initialSearchParams = {
  createdSorting: "normal",
  status: "status"
}
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import UserTableSkeleton from "./UserTableSkleton"
import { IUser } from "@/app/types/user"
import { APIResponseError, APIResponseSuccess } from "@/app/services/queryFunctions/users"
import { Select, SelectValue, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { ChevronDown } from "lucide-react"
import { ShortableTableHead } from "../components/ShortableTableHead"
import { useRouter, useSearchParams } from "next/navigation"
const page = () => {
  const [status, setStatus] = useState("Status")
  const [createdSorting, setCreatedSorting] = useState<"ascending" | "descending" | "normal">("normal")
  const router = useRouter();
  const params = useMemo(() => {
    const params = new URLSearchParams();
    params.set("status", status);
    params.set("createdSorting", createdSorting);
    return params;
  }, [status, createdSorting]);
  const queryString = useMemo(() => { return params.toString().toLowerCase() }, [params])
  useEffect(() => {
    router.replace(`/admin/users?${queryString}`)
  }, [router, queryString])
  const { data, isPending } = useQuery<APIResponseSuccess<IUser[] | APIResponseError>>({
    queryFn: async () => {
      const response = await axios.get(`/api/users?${queryString}`);
      return response.data;
    },
    queryKey: ['users', queryString]
  })
  const usersData = data?.success ? data.data : []
  let arrayofStatus: string[] = ["registered", "updated", "customer"]
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Profile</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>
              {isPending ? <span>Status</span> : <Select onValueChange={(value) => setStatus(value)}>
                <SelectTrigger className="flex items-center justify-between">
                  <span>{status}</span>
                </SelectTrigger>
                <SelectContent className="bg-background">
                  {arrayofStatus.map((status, index) => (
                    <SelectItem value={status} key={index} onChange={() => setStatus(status)}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>}
            </TableHead>
            <ShortableTableHead label="Created On" onClick={() => setCreatedSorting(createdSorting === "ascending" ? "descending" : "ascending")} state={createdSorting} loading={isPending} />
          </TableRow>
        </TableHeader>
        {isPending ? <UserTableSkeleton /> : data ?
          <TableBody>
            {usersData && Array.isArray(usersData) && usersData.map((user: IUser, index: number) => (
              <TableRow key={index}>
                <TableCell>
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.fullName}
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <h1 className="text-primaryDark uppercase bg-background w-[40px] h-[40px] flex-center text-xl rounded-full border-2 border-helper">
                      {user.email?.charAt(0).toUpperCase()}
                    </h1>
                  )}
                </TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.accountStatus}</TableCell>
                <TableCell>{new Date(user.createdAt!).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody> : <TableBody>
            <TableRow>
              <TableCell>There is no data available.</TableCell>
            </TableRow>
          </TableBody>}
      </Table>
    </div>
  )
}
export default page