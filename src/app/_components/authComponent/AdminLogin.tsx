"use client"
import React, { useState } from 'react'
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent'
import { Info, Package, SlidersHorizontal, FileText, UserCog, Bell, StickyNote, ShoppingCart, Boxes, ListTree, Heart, ClipboardList } from 'lucide-react'
import Divider from './Divider'
import PrimaryButton from '../primaryButton/PrimaryButton'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import LoadingComponent from '../loadingComponent/LoadingComponent'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { useRouter } from 'next/navigation'
const crudItems = [
  { label: 'Products', icon: Package },
  { label: 'Sliders', icon: SlidersHorizontal },
  { label: 'Blogs', icon: FileText },
  { label: 'Users', icon: UserCog }
]
const reportItems = [
  { label: 'Notifications', icon: Bell },
  { label: 'Remarks', icon: StickyNote },
  { label: 'Orders', icon: ShoppingCart },
  { label: 'Products', icon: Package },
  { label: 'Carts', icon: ShoppingCart },
  { label: 'Wishlists', icon: Heart },
  { label: 'Categories', icon: Boxes },
  { label: 'Subcategories', icon: ListTree }
]
interface IValidateAdminData {
  adminUserName: string
}
const AdminLogin = () => {
  const [adminUserName, setAdminUserName] = useState<string>("")
  const router = useRouter()
  const validateAdminMutation = useMutation<APIResponseSuccess | APIResponseError, AxiosError, IValidateAdminData>({
    mutationFn: async (adminUserName) => {
      const response = await axios.post('/api/admin/validateAdmin', { ...adminUserName });
      return response.data
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        router.push('/admin/')
      } else {
        toast.error(response.message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const validateAdmin = () => {
    validateAdminMutation.mutate({ adminUserName });
  }
  return (
    <div className="flex flex-col gap-2 max-w-[800px]">
      {validateAdminMutation.isPending && <LoadingComponent />}
      <label className="text-primaryLight flex items-center">
        <Info className="text-primaryLight mr-1 inline-flex" />
        Enter User ID or contact admin.
      </label>
      <input type="text" placeholder="Enter Your UserId" className="formItem mb-3" value={adminUserName} onChange={(e) => setAdminUserName(e.target.value)} />
      <PrimaryButton searchText='Login' onClick={validateAdmin} />
      <div>
        <Divider text='Admin Capebelities' />
        <div>
          <h3 className="text-primaryDark">CRUD Operations:</h3>
          <ul className="list-none grid sm:grid-cols-1 md:grid-cols-2 gap-2 text-sm ml-1">
            {crudItems.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center px-4 py-2 gap-2 text-sm text-background bg-primaryLight rounded-xl shadow-sm"
              >
                <Icon className="w-4 h-4 text-background" />
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-primaryDark">Reports:</h3>
          <ul className="list-none grid sm:grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {reportItems.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center px-4 py-2 gap-2 text-sm text-background bg-primaryLight rounded-xl shadow-sm"
              >
                <Icon className="w-4 h-4 text-background" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default AdminLogin
