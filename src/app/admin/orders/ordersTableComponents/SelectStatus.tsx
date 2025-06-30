import {
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
  SelectItem,
} from '@/components/ui/select'
import { TableCell } from '@/components/ui/table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Save, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
interface ISelectStatus {
  status: 'ordered' | 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  orderId: string
}
const orderStatuses = ['ordered', 'pending', 'confirmed', 'delivered', 'cancelled'] as const
type UpdateOrderPayload = {
  orderId: string
  statusValue: string
}
const SelectStatus: React.FC<ISelectStatus> = ({ status, orderId }) => {
  const queryClient = useQueryClient()
  const [statusValue, setStatusValue] = useState(status)
  const updateOrderMutation = useMutation<
    APIResponseSuccess | APIResponseError,
    AxiosError,
    UpdateOrderPayload
  >({
    mutationFn: async ({ orderId, statusValue }) => {
      const response = await axios.post('/api/order/updateOrder', {
        orderId,
        statusValue,
      })
      return response.data
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message)
        queryClient.invalidateQueries({ queryKey: ['allOrders'] })
      } else {
        toast.error(response.message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return (
    <div className="flex gap-2 items-center">
      <Select
        value={statusValue}
        onValueChange={(val) => setStatusValue(val as typeof status)}
        disabled={updateOrderMutation.isPending}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {orderStatuses.map((s) => (
            <SelectItem key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        disabled={status === statusValue || updateOrderMutation.isPending}
        onClick={() => {
          updateOrderMutation.mutate({ orderId, statusValue })
        }}
        className="disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
      >
        {updateOrderMutation.isPending ? (
          <>
            <Loader2 className="text-sm animate-spin text-primaryDark" />
          </>
        ) : (
          <Save className="text-green-500 text-sm hover:text-green-800 transition-all duration-300" />
        )}
      </button>
    </div>
  )
}
export default SelectStatus
