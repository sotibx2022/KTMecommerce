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
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
interface ProductBasicDetailsFormProps {
  productDatas?: IProductDisplay
  action: "edit" | "add"
}
const ProductBasicDetailsForm: React.FC<ProductBasicDetailsFormProps> = ({ action, productDatas }) => {
  const { register, formState: { errors, touchedFields, isSubmitted }, watch, setValue } = useFormContext<IAddProductFormData>();
  const productTitle = watch('productName')
  const productDetailsGeneratorMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/products/productDetailsGenerator', { productTitle });
      return response.data;
    },
    onSuccess: (response) => {
      console.log(response.data);
      setValue('productDescription', response.data.productDetails.productDescription,{ shouldValidate: true });
      setValue('productFeatures', response.data.productDetails.productFeatures,{ shouldValidate: true });
      setValue('price', response.data.productDetails.price,{ shouldValidate: true })
    }, onError: (error) => {
      console.log(error.message)
    }
  })
  const generateProductDetails = async () => {
    productDetailsGeneratorMutation.mutate()
  }
  return (
    <div className="space-y-4">
      {productDetailsGeneratorMutation.isPending && <LoadingComponent />}
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
        {errors.productName?.message && <SubmitError message={errors.productName.message}/>}
        <Button variant='secondary' onClick={generateProductDetails}>Generate Product Details using AI</Button>
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
        {errors.productDescription?.message && <SubmitError message={errors.productDescription.message}/>}
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
          {errors.price?.message && <SubmitError message={errors.price.message}/>}
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
          {errors.variant?.message && <SubmitError message={errors.variant.message}/>}
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
          {errors.remainingStock?.message && <SubmitError message={errors.remainingStock.message}/>}
        </div>
      </section>
    </div>
  )
}
export default ProductBasicDetailsForm