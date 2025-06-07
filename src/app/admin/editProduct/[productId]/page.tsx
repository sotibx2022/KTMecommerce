"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getSingleProduct } from '@/app/services/queryFunctions/products'
import ProductDetailsSkeleton from '../../components/ProductDetailsSkeleton'
import { FormProvider, useForm } from 'react-hook-form'
import { IAddProductFormData } from '../../components/products'
import ProductBasicDetailsForm from '../../components/productForm/ProductBasicDetailsForm'
import ProductCategorySelectionForm from '../../components/productForm/ProductCategorySelectionForm'
import ProductFeaturesForm from '../../components/productForm/ProductFeaturesForm'
import ProductHighLightSelection from '../../components/ProductHighLightSelection'
import ProductStatusForm from '../../components/productForm/ProductStatusForm'
import ProductImage from '../../components/productForm/ProductImage'
const EditProduct = () => {
  const searchParams = useSearchParams()
  const [productId] = useState<string>(searchParams.get('productId') ?? "")
  const method = useForm<IAddProductFormData>({mode:'onBlur'})
  const { data: productDatas, isPending, error } = useQuery({
    queryKey: ['specificProduct', productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId
  })
  if (isPending) return <ProductDetailsSkeleton/>
  if (error) return <div>Error loading product</div>
  if (!productDatas?.success) return <h1 className="primaryHeading">Product not found</h1>
  const product = productDatas.data!
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="primaryHeading mb-6">Edit Product</h1>
      <FormProvider {...method}>
      <form className='flex flex-col md:flex-row gap-8'>
        <ProductImage action='edit' imageUrl={product.image}/>
          <ProductBasicDetailsForm/>
          <ProductCategorySelectionForm action='add'/>
          <ProductFeaturesForm/>
          <ProductHighLightSelection/>
          <ProductStatusForm/>
      </form>
      </FormProvider>
    </div>
  )
}
export default EditProduct