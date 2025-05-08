"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide'
import ProductCard from '@/app/_components/productCard/ProductCard'
import { getSelectedProducts, SearchParams } from '@/app/services/queryFunctions/products'
import { IProductDisplay } from '@/app/types/products'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
const ProductsPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValues, setSearchValues] = useState<SearchParams>({
    item: undefined,
    keyword: undefined,
    category: undefined,
    subcategory: undefined,
    minprice: undefined,
    maxprice: undefined,
    rating: undefined,
    page: 1
  });
  // Initialize state from URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    setSearchValues({
      item: params.get('item') || undefined,
      keyword: params.get("keyword") || undefined,
      category: params.get("category") || undefined,
      subcategory: params.get("subcategory") || undefined,
      minprice: params.has("minprice") ? parseFloat(params.get("minprice")!) : undefined,
      maxprice: params.has("maxprice") ? parseFloat(params.get("maxprice")!) : undefined,
      rating: params.has("rating") ? parseFloat(params.get("rating")!) : undefined,
      page: params.has("page") ? parseInt(params.get("page")!) : 1
    })
  }, [searchParams])
  const { data, isPending, isError } = useQuery({
    queryKey: ['selectedProducts', searchValues],
    queryFn: () => getSelectedProducts({ ...searchValues }),
    enabled: !!searchValues?.category || !!searchValues?.keyword?.trim() || !!searchValues?.item,
  })
  const products = data?.products || []
  const pages = data?.pagination?.totalPages || 0
  const currentPage = searchValues.page || 1
  const handlePageChange = (pageNumber: number) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('page', pageNumber.toString())
    // Update the URL without page reload
    router.push(`/catalog?${newParams.toString()}`, { scroll: false })
  }
  if (isError) {
    return <div className="text-center py-8">Error loading products</div>
  }
  return (
<>
  <div className='productsPageContainer container flex flex-col justify-between gap-2 my-4 bg-background'>
    {isPending ? (
      <div className="flex flex-wrap justify-between gap-4">
        {Array.from({ length: 6 }).map((_, index: number) => (
          <SkeletonSlide key={index} />
        ))}
      </div>
    ) : products && products.length > 0 ? (
      <>
        <div className="flex flex-wrap justify-between gap-4">
          {products.map((product: IProductDisplay) => (
            <div key={product._id}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        {pages > 1 && (
          <ul className="pagination flex justify-center items-center gap-4 my-4">
            {Array.from({ length: pages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <li 
                  key={pageNumber}
                  className={`text-primaryDark px-4 py-2 cursor-pointer font-bold rounded-md ${
                    currentPage === pageNumber ? 'bg-primaryLight' : 'bg-primaryDark'
                  }`}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </li>
              );
            })}
          </ul>
        )}
      </>
    ) : (
      <div className="text-center w-full py-8">
        <p>No products found matching your criteria</p>
      </div>
    )}
  </div>
</>
  )
}
export default ProductsPage