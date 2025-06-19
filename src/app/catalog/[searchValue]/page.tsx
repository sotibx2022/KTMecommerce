"use client"
import React, { useContext, useEffect, useMemo, useState } from 'react'
import AdvanceSearch from './AdvanceSearch'
import CatalogPageLayout from './CatalogPageLayout'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import axios from 'axios'
import { IResponseData } from '@/app/admin/components/products'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { updateUrl } from './updateUrl'
import TableNavigation from '@/app/admin/components/TableNavigation'
import { IProductDisplay } from '@/app/types/products'
import ProductCard from '@/app/_components/productCard/ProductCard'
import VerticalProductCard from '@/app/_components/productCard/VertivalProductCard'
import { AdvanceSearchProvider, SearchContext } from '@/app/context/AdvanceSearchContext'
import AdvanceSearchSkeleton from './AdvanceSearchSkeleton'
import ProductDetailsSkeleton from '@/app/admin/components/ProductDetailsSkeleton'
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide'
import NoData from '@/app/_components/noData/NoData'
import { PackageX } from 'lucide-react'
const page = () => {
  const router = useRouter()
 const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
    }
    const {searchValues,setSearchValues} = context
  const params = useMemo(() => updateUrl(searchValues), [
    searchValues.categoryValue,
    searchValues.highlightedValues,
    searchValues.subCategoryValue,
    searchValues.priceOrder,
    searchValues.ratingOrder,
    searchValues.pageNumber
  ])
  const getAllProducts = async (params: URLSearchParams): Promise<APIResponseSuccess<IResponseData> | APIResponseError> => {
    if (params.size === 0) {
      const response = await axios.get('/api/allProducts/displayProducts/all');
      return response.data;
    }
    const response = await axios.get(`/api/allProducts/displayProducts/PARAMS?${params.toString()}`);
    return response.data;
  };
  const queryString = useMemo(() => params.toString(), [params]);
  const { data: productsResponse, isPending } = useQuery({
    queryKey: ['products', queryString],
    queryFn: () => getAllProducts(params),
  });
  useEffect(() => {
    router.replace(`?${params}`, { scroll: false });
  }, [params, router]);
  useEffect(() => {
    if (isPending) {
      setSearchValues((prev) => ({ ...prev, loading: true }))
    } else {
      setSearchValues((prev) => ({ ...prev, loading: false }))
    }
  }, [isPending])
  const products = productsResponse?.success ? productsResponse.data!.products : [];
  const pagination = productsResponse?.success ? productsResponse.data!.pagination : {
    currentPage: 1,
    pageSize: 10,
    totalProducts: 0,
    totalPages: 1
  };
return (
  <div className="container">
    {isPending ? (
      <>
        <AdvanceSearchSkeleton />
        <div className="skeletonSlidesContainer flex justify-between flex-wrap gap-4">
  {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}>
            <SkeletonSlide />
          </div>
        ))}
        </div>
      </>
    ) : products.length > 0 ? (
      <>
      <div className="flex justify-between flex-wrap gap-4 mt-2">
        <AdvanceSearch/>
        {products.map((product: IProductDisplay) => (
          <div key={product._id}>
            {searchValues.layout === 'grid' ? (
              <ProductCard {...product} />
            ) : (
              <VerticalProductCard {...product} />
            )}
          </div>
        ))}
      </div>
      </>
    ) : (
<>
      <AdvanceSearch/>
      <NoData 
  icon={<PackageX className="w-12 h-12" />} 
  notFoundMessage="There are no Products Matching Search Criteria."
/>
</>
    )}
  </div>
);
}
export default page