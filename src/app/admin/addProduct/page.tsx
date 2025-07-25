"use client"
import { FormProvider, useForm } from 'react-hook-form'
import { IAddProductFormData } from '../components/products'
import ProductBasicDetailsForm from '../components/productForm/ProductBasicDetailsForm'
import ProductCategorySelectionForm from '../components/productForm/ProductCategorySelectionForm'
import ProductFeaturesForm from '../components/productForm/ProductFeaturesForm'
import ProductStatusForm from '../components/productForm/ProductStatusForm'
import ProductImage from '../components/productForm/ProductImage'
import { Card, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ProductHighlightsForm from '../components/productForm/ProductHighlightsForm'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { APIResponseSuccess, APIResponseError } from '@/app/services/queryFunctions/users'
import { IProductDisplay } from '@/app/types/products'
import { Router } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import { useState } from 'react'
import ConfettiComponent from '@/app/_components/submit/ConfettiComponent'
const AddProduct = () => {
  const[showConfetti,setShowConfetti] = useState(false);
  const[productId,setProductId] = useState("");
  const[productName,setProductName] = useState("")
  const router = useRouter()
  const methods = useForm<IAddProductFormData>({ mode: 'onChange' })
  const addNewProduct = async (formData: FormData): Promise<APIResponseSuccess<IProductDisplay>|APIResponseError> => {
    const response = await axios.post('/api/products/addProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data as APIResponseSuccess
  }
  const createProductMutation = useMutation<
    APIResponseSuccess<IProductDisplay> | APIResponseError,
    Error,
    FormData
  >({
    mutationFn: addNewProduct,
    onSuccess: (response:APIResponseSuccess | APIResponseError) => {
if(response.success && response.data){
  setProductId(response.data._id);
 setProductName(response.data.productName)
  setShowConfetti(true);
}else{
  toast.error(response.message)
}
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const onSubmit = (data: IAddProductFormData) => {
    const formData = new FormData()
    // Append all fields except file
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'file' && value !== undefined && value !== null) {
        formData.append(key, typeof value === 'string' ? value : JSON.stringify(value))
      }
    })
    // Append file if exists
    if (data.file instanceof File) {
      formData.append('file', data.file)
    }
    createProductMutation.mutate(formData)
  }
  return (
    <>
    <div className="container mx-auto px-4 py-8">
      {createProductMutation.isPending && <LoadingComponent/>}
      <h1 className="primaryHeading mb-6">Add New Product</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex gap-4 flex-col md:flex-row">
            <ProductImage action="add" />
            <Card className="p-4 flex flex-col gap-4">
              <ProductBasicDetailsForm action="add" />
              <ProductCategorySelectionForm action="add" />
              <ProductFeaturesForm action="add" />
              <ProductHighlightsForm action="add" />
              <ProductStatusForm action="add" />
              <CardFooter>
                <Button type="submit">
                  submit
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </FormProvider>
    </div>
    {showConfetti && <ConfettiComponent link={`/admin/displayProduct/productIdentifier?productId=${productId}&productName=${productName}`} message={'Congratulation, new Product Created!'}/>}
    </>
  )
}
export default AddProduct