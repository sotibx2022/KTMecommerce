"use client"
import { useForm } from 'react-hook-form'
import { IAddProductFormData } from '../components/products'
import { Form } from '@/components/ui/form'
import ProductBasicDetailsForm from '../components/productForm/ProductBasicDetailsForm'
import ProductCategorySelectionForm from '../components/productForm/ProductCategorySelectionForm'
import ProductFeaturesForm from '../components/productForm/ProductFeaturesForm'
import ProductHighLightSelection from '../components/ProductHighLightSelection'
import ProductStatusForm from '../components/productForm/ProductStatusForm'
import ProductImage from '../components/productForm/ProductImage'
import { Card, CardFooter } from '@/components/ui/card'
import ProductAction from '../components/ProductAction'
import { Button } from '@/components/ui/button'
const AddProduct = () => {
const form = useForm<IAddProductFormData>({mode:'onBlur'})
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="primaryHeading mb-6">Add New Product</h1>
      <Form {...form}>
      <form>
        <div className="flex gap-4">
          <ProductImage action='add'/>
            <Card className='p-4 flex flex-col gap-4'>
            <ProductBasicDetailsForm action="add"/>
          <ProductCategorySelectionForm action='add'/>
          <ProductFeaturesForm/>
          <ProductHighLightSelection/>
          <ProductStatusForm/>
          <CardFooter>
            <Button>Submit</Button>
           </CardFooter>
          </Card>
        </div>
      </form>
      </Form>
    </div>
  )
}
export default AddProduct