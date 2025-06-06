"use client"
import { FormProvider, useForm } from 'react-hook-form'
import { IAddProductFormData } from '../components/products'
import ProductImage from '../components/ProductImage'
import ProductDetailsForm from '../components/ProductDetailsForm'
const AddProduct = () => {
const method = useForm<IAddProductFormData>({mode:'onBlur'})
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="primaryHeading mb-6">Add New Product</h1>
      <FormProvider {...method}>
      <form>
        <div className="flex flex-col md:flex-row gap-8">
          <ProductImage action='add'/>
<ProductDetailsForm action='add'/>          
        </div>
      </form>
      </FormProvider>
    </div>
  )
}
export default AddProduct