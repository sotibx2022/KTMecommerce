"use client"
import { useForm } from 'react-hook-form'
import { IAddProductFormData } from '../components/products'
import { Form } from '@/components/ui/form'
const AddProduct = () => {
const form = useForm<IAddProductFormData>({mode:'onBlur'})
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="primaryHeading mb-6">Add New Product</h1>
      <Form {...form}>
      <form>
        <div className="flex flex-col md:flex-row gap-8">
        </div>
      </form>
      </Form>
    </div>
  )
}
export default AddProduct