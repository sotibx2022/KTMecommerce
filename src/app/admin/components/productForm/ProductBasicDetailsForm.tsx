// components/ProductBasicDetailsForm.tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
import SubmitError from '@/app/_components/submit/SubmitError'
import { validateSentence, validateWord, validateNumber } from '@/app/services/helperFunctions/validatorFunctions'
import { IProductDisplay } from '@/app/types/products'
import { useEffect } from 'react'
interface ProductBasicDetailsFormProps {
  productDatas?: IProductDisplay
  action: "edit" | "add"
}
const ProductBasicDetailsForm: React.FC<ProductBasicDetailsFormProps> = ({ action, productDatas }) => {
  const { register, formState: { errors, touchedFields, isSubmitted }, watch } = useFormContext<IAddProductFormData>()
  return (
    <div className="space-y-4">
      {/* Product Name */}
      <div>
        <label className='formLabel'>Product Name</label>
        <Input
          id="productName"
          placeholder="Enter product name"
          {...register('productName', {
            validate: (value) => validateSentence("ProductName", value, 10, 100)
          })}
        />
      </div>
      {/* Description */}
      <div>
        <label className='formLabel'>Product Description</label>
        <Textarea
          id="productDescription"
          placeholder="Enter product description"
          rows={4}
          {...register('productDescription', {
            validate: (value) => validateSentence("Product Description", value, 100, 500)
          })}
        />
      </div>
      {/* Three-column section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Price */}
        <div>
          <label className='formLabel'>Price $</label>
          <Input
            id="price"
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('price', {
              validate: (value) => validateNumber("Price", value, 1, 4)
            })}
          />
        </div>
        {/* Variant */}
        <div>
          <label className='formLabel'>Variant</label>
          <Input
            id="variant"
            placeholder="Color, Size, etc."
            {...register("variant", {
              validate: (value) => validateSentence("Variant", value, 3, 20)
            })}
          />
        </div>
        {/* Stock Quantity */}
        <div>
          <label className='formLabel'>Stock</label>
          <Input
            id="stockQuantity"
            type="number"
            placeholder="eg.7"
            {...register("remainingStock", {
              validate: (value) => validateNumber("Remaining Stock", value, 1, 3)
            })}
          />
        </div>
      </section>
    </div>
  )
}
export default ProductBasicDetailsForm