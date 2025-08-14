"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getSingleProduct } from '@/app/services/queryFunctions/products'
import ProductDetailsSkeleton from '../../components/ProductDetailsSkeleton'
import { FormProvider, useForm } from 'react-hook-form'
import { IAddProductFormData } from '../../components/products'
import ProductBasicDetailsForm from '../../components/productForm/ProductBasicDetailsForm'
import ProductCategorySelectionForm from '../../components/productForm/ProductCategorySelectionForm'
import ProductFeaturesForm from '../../components/productForm/ProductFeaturesForm'
import ProductStatusForm from '../../components/productForm/ProductStatusForm'
import { Card, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ProductHighlightsForm from '../../components/productForm/ProductHighlightsForm'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { IProductDisplay } from '@/app/types/products'
import axios from 'axios'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import toast from 'react-hot-toast'
import ImageUpload from '../../components/productForm/ImageUpload'
const EditProduct = () => {
  const [file, setFile] = useState<File | null>(null)
  const queryClient = useQueryClient()
  const router = useRouter();
  const searchParams = useSearchParams()
  const [productId] = useState<string>(searchParams.get('productId') ?? "")
  const method = useForm<IAddProductFormData>({ mode: 'onBlur' })
  const { data: productDatas, isPending, error } = useQuery({
    queryKey: ['specificProduct', productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
  })
  useEffect(() => {
    if (productDatas && productDatas!.success && productDatas!.data!) {
      (Object.keys(productDatas!.data!) as Array<keyof IAddProductFormData>).forEach((key) => {
        method.setValue(key, productDatas!.data![key]!)
      })
    }
  }, [productDatas, method.setValue])
  const editProduct = async (formData: FormData): Promise<APIResponseSuccess<IProductDisplay> | APIResponseError> => {
    const response = await axios.post('/api/products/editProduct', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data as APIResponseSuccess
  }
  const updateProductMutation = useMutation<
    APIResponseSuccess<IProductDisplay> | APIResponseError,
    Error,
    FormData
  >({
    mutationFn: editProduct,
    onSuccess: async (response: APIResponseSuccess | APIResponseError) => {
      if (response.success && response.data) {
        await queryClient.invalidateQueries({
          queryKey: ['specificProduct', productId],
          refetchType: 'active',
        });
        toast.success(response.message)
        router.push(`/admin/displayProduct/productIdentifier?productId=${response.data._id}&productName=${response.data.productName}`)
      } else {
        toast.error(response.message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const getUploadedImage = (file: File) => {
    setFile(file)
  }
  const onSubmit = (data: IAddProductFormData) => {
    const formData = new FormData()
    formData.append('productId', productDatas?.data?._id!);
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'file' && value !== undefined && value !== null) {
        formData.append(key, typeof value === 'string' ? value : JSON.stringify(value))
      }
    })
    if (file) {
      formData.append('file', file)
    }
    updateProductMutation.mutate(formData)
  }
  if (isPending) return <ProductDetailsSkeleton />
  if (error) return <div>Error loading product</div>
  if (!productDatas?.success) return <h1 className="primaryHeading">Product not found</h1>
  return (
    <div className="container mx-auto px-4 py-8">
      {updateProductMutation.isPending && <LoadingComponent />}
      <h1 className="primaryHeading mb-6">Edit Product</h1>
      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <ImageUpload action='edit' imageUrl={productDatas.data?.image} uploadImage={getUploadedImage} />
            <Card className='p-4 flex flex-col gap-4'>
              <ProductBasicDetailsForm action='edit' />
              <ProductCategorySelectionForm action='edit' />
              <ProductFeaturesForm action="edit" />
              <ProductHighlightsForm action="edit" />
              <ProductStatusForm action="edit" />
              <CardFooter>
                <Button>Submit</Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
export default EditProduct