"use client"
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getSingleProduct } from '@/app/services/queryFunctions/products'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import ProductDetailsSkeleton from '../../components/ProductDetailsSkeleton'
import { FormProvider, useForm } from 'react-hook-form'
import { IAddProductFormData } from '../../components/products'
import ProductImage from '../../components/ProductImage'
import ProductDetailsForm from '../../components/ProductDetailsForm'
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
<ProductDetailsForm action='edit' productDatas={product}/>        
      </form>
      </FormProvider>
    </div>
  )
}
export default EditProduct