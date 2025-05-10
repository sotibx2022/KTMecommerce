"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide'
import ProductCard from '@/app/_components/productCard/ProductCard'
import { getSelectedProducts, SearchParams } from '@/app/services/queryFunctions/products'
import { IProductDisplay } from '@/app/types/products'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CatalogPageLayout from './CatalogPageLayout'
const ProductsPage = () => {
  const router = useRouter()
  const newSearchValues: SearchParams = {
    item: undefined,
    keyword: undefined,
    category: undefined,
    subcategory: undefined,
    minprice: undefined,
    maxprice: undefined,
    rating: undefined,
    page: 1
  };
  const [searchValues, setSearchValues] = useState<SearchParams>(newSearchValues);
  // Initialize state from URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      const fragmentUrl = url.split("/").pop()?.split('&');
      // Process each parameter
      fragmentUrl?.forEach(param => {
        const [key, value] = param.split('=');
        switch (key) {
          case 'item':
            newSearchValues.item = value;
            break;
          case 'category':
            newSearchValues.category = value;
            break;
          case 'subcategory':
            newSearchValues.subcategory = value;
            break;
          case 'minprice':
            newSearchValues.minprice = Number(value);
            break;
          case 'maxprice':
            newSearchValues.maxprice = Number(value);
            break;
          case 'rating':
            newSearchValues.rating = Number(value);
            break;
          case 'page':
            newSearchValues.page = Number(value) || 1;
            break;
          case 'keyword':
            newSearchValues.keyword = value;
            break;
        }
      });
      setSearchValues(newSearchValues);
    }
  }, []);
  const { data, isPending, isError } = useQuery({
    queryKey: ['selectedProducts', searchValues],
    queryFn: () => getSelectedProducts({ ...searchValues }),
    enabled: !!searchValues?.category || !!searchValues?.keyword?.trim() || !!searchValues?.item,
  })
  const products = data?.products || []
  const pages = data?.pagination?.totalPages || 0
  const currentPage = searchValues.page || 1
  if (isError) {
    return <div className="text-center py-8">Error loading products</div>
  }
  return (
    <CatalogPageLayout>
      <div className='container mt-4'>
        {isPending ? (
          <div className="flex flex-wrap justify-between gap-4">
            {Array.from({ length: 6 }).map((_, index: number) => (
              <SkeletonSlide key={index} />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-between gap-4">
              {products.map((product: IProductDisplay,index:number) => (
                <div key={index}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
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