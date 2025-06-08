import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
import SubmitError from '@/app/_components/submit/SubmitError'
interface ProductStatusFormProps {
  action: 'edit' | 'add'
}
const ProductStatusForm: React.FC<ProductStatusFormProps> = ({ action }) => {
  const { setValue, watch,register,formState:{errors} } = useFormContext<IAddProductFormData>()
  const handleValueChange = (value: string) => {
    setValue("status", value)
  }
  console.log(watch('status'));
  const status = watch('status')
  return (
    <div className="w-64">
      <Select {...register("status",{
        required:"Please Select the Status"
      })}
      onValueChange={handleValueChange} >
        <SelectTrigger>
          <SelectValue placeholder={status ?? 'Select Status'} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="active"
          >
            Active
          </SelectItem>
          <SelectItem
            value="inActive"
          >
            InActive
          </SelectItem>
        </SelectContent>
      </Select>
{errors.status?.message&& status === 'status' &&<SubmitError message={errors.status.message}/>}
    </div>
  )
}
export default ProductStatusForm
