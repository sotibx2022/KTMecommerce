import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
interface ProductStatusFormProps {
  action: 'edit' | 'add'
}
const ProductStatusForm: React.FC<ProductStatusFormProps> = ({ action }) => {
  const { setValue, watch } = useFormContext<IAddProductFormData>()
  const status = watch('status')
  return (
    <div className="w-64">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder={status ?? 'Select Status'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="active"
            onClick={() => setValue('status', 'active')}
          >
            Active
          </SelectItem>
          <SelectItem
            value="inActive"
            onClick={() => setValue('status', 'inActive')}
          >
            InActive
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
export default ProductStatusForm
