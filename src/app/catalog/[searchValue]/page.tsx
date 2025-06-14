"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import CatalogPageLayout from './CatalogPageLayout'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import ProductCard from '@/app/_components/productCard/ProductCard'
import { getSelectedProducts } from '@/app/services/queryFunctions/products'
import { IProductDisplay } from '@/app/types/products'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { IResponseData } from '@/app/admin/components/products'
// Dynamically import SkeletonSlide with loading fallback
const SkeletonSlide = dynamic(
  () => import('@/app/_components/loadingComponent/SkeletonSlide'))
const ProductCardMemo = React.memo(ProductCard)
interface ISearchValues {
  keyword?: string
  category?: string
  subcategory?: string
  page: number
}
const ProductsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValues, setSearchValues] = useState<ISearchValues>({
    category: searchParams?.get('category') ?? undefined,
    subcategory: searchParams?.get('subcategory') ?? undefined,
    keyword: searchParams?.get('keyword') ?? undefined,
    page: Number(searchParams?.get('page')) || 1
  })
  useEffect(() => {
  const category = searchParams?.get('category') ?? undefined
  const subcategory = searchParams?.get('subcategory') ?? undefined
  const keyword = searchParams?.get('keyword') ?? undefined
  const page = Number(searchParams?.get('page')) || 1
  setSearchValues({ category, subcategory, keyword, page })
}, [searchParams])
  const updateURL = (values: ISearchValues) => {
    const params = new URLSearchParams()
    if (values.keyword) params.set('keyword', values.keyword)
    if (values.category) params.set('category', values.category)
    if (values.subcategory) params.set('subcategory', values.subcategory)
    if (values.page && values.page !== 1) params.set('page', values.page.toString())
    router.push(`/catalog/advanceSearch?${params.toString()}`)
  }
  const handlePageChange = (page: number) => {
    const newValues = { ...searchValues, page }
    setSearchValues(newValues)
    updateURL(newValues)
  }
  const productsResponse = useQuery<APIResponseSuccess<IResponseData>|APIResponseError>({
    queryKey: ['selectedProducts', searchValues],
    queryFn: () => getSelectedProducts(searchValues),
    enabled: !!searchValues?.category || !!searchValues?.keyword?.trim(),
  })
  console.log(productsResponse.data);
  const products = productsResponse.data && (productsResponse.data.success && productsResponse.data.data?.products);
  const pagination = productsResponse.data && (productsResponse.data.success && productsResponse.data.data?.pagination)
  if (productsResponse.isError) {
    return <div className="text-center py-8">Error loading products</div>
  }
  return (
  <CatalogPageLayout>
    <div className="container mt-4">
      {productsResponse.isPending ? (
        <div className="flex flex-wrap justify-center sm:justify-between gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonSlide key={index} />
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <>
          <div className="flex flex-wrap justify-center sm:justify-between gap-4">
            {products.map((product: IProductDisplay,index:number) => (
              <div key={index}>
                <ProductCardMemo {...product} />
              </div>
            ))}
          </div>
          {pagination && pagination.totalPages > 1 && (
            <div className="flex gap-2 justify-center mt-4">
              {Array.from({ length: pagination.totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`cursor-pointer px-3 py-1 rounded ${
                    pagination.currentPage === index + 1 ? 'bg-primaryLight text-background font-bold' : 'bg-primaryDark text-background font-bold'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center w-full py-8">
          <p>No products found matching your criteria</p>
        </div>
      )}
    </div>
  </CatalogPageLayout>
)
}
export default ProductsPage