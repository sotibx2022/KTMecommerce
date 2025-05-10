"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide'
import ProductCard from '@/app/_components/productCard/ProductCard'
import { getSelectedProducts, SearchParams } from '@/app/services/queryFunctions/products'
import { IProductDisplay } from '@/app/types/products'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
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
  // Update URL when search values change
  const updateURL = (values: SearchParams) => {
    const params = new URLSearchParams();
    if (values.item) params.set('item', values.item);
    if (values.keyword) params.set('keyword', values.keyword);
    if (values.category) params.set('category', values.category);
    if (values.subcategory) params.set('subcategory', values.subcategory);
    if (values.minprice) params.set('minprice', values.minprice.toString());
    if (values.maxprice) params.set('maxprice', values.maxprice.toString());
    if (values.rating) params.set('rating', values.rating.toString());
    if (values.page && values.page !== 1) params.set('page', values.page.toString());
    router.push(`/catalog/${params.toString()}`);
  };
  // Initialize state from URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      const fragmentUrl = url.split("/").pop()?.split('&');
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
  const handlePageChange = (page: number) => {
    const newValues = { ...searchValues, page };
    setSearchValues(newValues);
    updateURL(newValues);
  };
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
              {products.map((product: IProductDisplay, index: number) => (
                <div key={index}>
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
            <div className="navigation">
              {pages > 1 && (
                <ul className="flex gap-2 justify-center mt-4">
                  {Array.from({ length: pages }).map((_, index) => (
                    <li 
                      key={index} 
                      onClick={() => handlePageChange(index + 1)}
                      className={`cursor-pointer px-3 py-1 rounded ${
                        currentPage === index + 1 ? 'bg-primaryLight text-white' : 'bg-primaryDark'
                      }`}
                    >
                      {index + 1}
                    </li>
                  ))}
                </ul>
              )}
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