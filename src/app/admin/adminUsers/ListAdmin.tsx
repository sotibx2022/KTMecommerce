"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { IDisplayAdminData } from '@/app/types/admin'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'
import React from 'react'
const ListAdmin = () => {
  const { data: allAdmins, isPending } = useQuery<APIResponseSuccess<IDisplayAdminData[]> | APIResponseError>({
    queryFn: async () => {
      const response = await axios.get('/api/admin/addAdmin');
      return response.data;
    },
    queryKey: ['allAdmins']
  })
  const noAdmins = allAdmins && allAdmins.success && allAdmins?.data?.length===0;
  const admins = allAdmins && allAdmins?.success && allAdmins.data as IDisplayAdminData[]
  return (
    <div className='overflow-x-auto w-full shadow-helper p-4'>
      {isPending && <LoadingComponent />}
      <h2 className='subHeading'>Admins</h2>
      <Table>
        <TableCaption>
          List of Admin Users
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='min-w-[50px]'>SN</TableHead>
            <TableHead className='min-w-[150px]'>Full Name</TableHead>
            <TableHead className='min-w-[100px]'>User Name</TableHead>
            <TableHead className='min-w-[100px]'>Email</TableHead>
            <TableHead className='min-w-[150px]'>Created On</TableHead>
            <TableHead className='min-w-[100px]'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins && admins.map((admin:IDisplayAdminData,index:number)=>{
            return  <TableRow key={index}>
            <TableCell>{index+1}</TableCell>
            <TableCell>{admin.adminFullName}</TableCell>
            <TableCell>{admin.adminUserName}</TableCell>
             <TableCell>{admin.adminEmail}</TableCell>
           <TableCell>{format(new Date(admin.createdAt), 'dd-MM-yy')}</TableCell>
            <TableCell className="min-w-[100px] flex justify-center items-center">
              <Trash2 className="w-4 h-4 text-red-500" />
            </TableCell>
          </TableRow>
          })}
        </TableBody>
      </Table>
    </div>
  )
}
export default ListAdmin