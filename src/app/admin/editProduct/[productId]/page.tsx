"use client"
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getSingleProduct } from '@/app/services/queryFunctions/products'
import ProductDetailsSkeleton from '../../components/ProductDetailsSkeleton'
import { FormProvider, useForm } from 'react-hook-form'
import { IAddProductFormData } from '../../components/products'
import ProductBasicDetailsForm from '../../components/productForm/ProductBasicDetailsForm'
import ProductCategorySelectionForm from '../../components/productForm/ProductCategorySelectionForm'
import ProductFeaturesForm from '../../components/productForm/ProductFeaturesForm'
import ProductStatusForm from '../../components/productForm/ProductStatusForm'
import ProductImage from '../../components/productForm/ProductImage'
import { Card, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ProductHighlightsForm from '../../components/productForm/ProductHighlightsForm'
const EditProduct = () => {
  const searchParams = useSearchParams()
  const [productId] = useState<string>(searchParams.get('productId') ?? "")
  const method = useForm<IAddProductFormData>({mode:'onBlur'})
  const { data: productDatas, isPending, error } = useQuery({
    queryKey: ['specificProduct', productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes (data becomes stale after this time)
    gcTime: 30 * 60 * 1000, // 30 minutes (data is removed from cache after this time)
})
useEffect(()=>{
   if(productDatas && productDatas!.success && productDatas!.data!){
  (Object.keys(productDatas!.data!)as Array<keyof IAddProductFormData>).forEach((key)=>{
    method.setValue(key,productDatas!.data![key]!)
  })
 }
},[productDatas,method.setValue])
const onSubmit = (data:IAddProductFormData) =>{
  console.log(data);
}
  if (isPending) return <ProductDetailsSkeleton/>
  if (error) return <div>Error loading product</div>
  if (!productDatas?.success) return <h1 className="primaryHeading">Product not found</h1>
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="primaryHeading mb-6">Edit Product</h1>
      <FormProvider {...method}>
       <form onSubmit={method.handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <ProductImage action='edit' imageUrl={productDatas.data?.image}/>
            <Card className='p-4 flex flex-col gap-4'>
            <ProductBasicDetailsForm action='edit'/>
          <ProductCategorySelectionForm action='edit'/>
          <ProductFeaturesForm action="edit"/>
          <ProductHighlightsForm action="edit"/>
          <ProductStatusForm action="edit"/>
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