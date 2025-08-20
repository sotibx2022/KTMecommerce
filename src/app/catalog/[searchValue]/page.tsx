"use client"
import React, { Suspense, useContext, useEffect, useMemo, useState } from 'react'
import AdvanceSearch from './AdvanceSearch'
import CatalogPageLayout from './CatalogPageLayout'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import axios from 'axios'
import { IResponseData } from '@/app/admin/components/products'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
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
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
const page = () => {
  const router = useRouter()
  const context = useContext(SearchContext);
  const searchParams = useSearchParams()
  if (!context) {
    throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
  }
  const { searchValues, setSearchValues } = context
  useEffect(() => {
    setSearchValues(prev => {
      const isOfferItem = searchParams.get('isOfferItem') === "true";
      const isTrendingNow = searchParams.get('isTrendingItem') === "true";
      const isNewArrival = searchParams.get('isNewArrival') === "true";
      const isTopSell = searchParams.get('isTopSell') === "true";
      const isRegular = searchParams.get('isRegular') === "true";
      const highlightedValues =
        isNewArrival ? "New Arrival" :
          isOfferItem ? "Offer Item" :
            isTopSell ? "Top Sell" :
              isTrendingNow ? "Trending Item" :
                isRegular ? "Regular" :
                  "Select";
      return {
        ...prev,
        keyword: searchParams.get('keyword') ?? "",
        categoryValue: searchParams.get('category') ?? prev.categoryValue,
        subCategoryValue: searchParams.get('subcategory') ?? prev.subCategoryValue,
        priceOrder: searchParams.get('priceOrder') as "normal" | "increasing" | "decreasing" ?? prev.priceOrder,
        ratingOrder: searchParams.get('ratingOrder') as "normal" | "increasing" | "decreasing" ?? prev.ratingOrder,
        highlightedValues
      };
    });
  }, [searchParams, setSearchValues]);
  const params = useMemo(() => updateUrl(searchValues), [
    searchValues.keyword,
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
      <Suspense fallback={<LoadingComponent />}>
        {isPending ? (
          <>
            <AdvanceSearchSkeleton />
            <div className="gridCards">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="w-full">
                  <SkeletonSlide />
                </div>
              ))}
            </div>
          </>
        ) : products.length > 0 ? (
          <>
            <div>
              <AdvanceSearch />
              <div className="w-full">
                {searchValues.layout === 'grid' ? (
                  // Grid layout - use a grid container
                  <div className="gridCards">
                    {products.map((product: IProductDisplay) => (
                      <ProductCard key={product._id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {products.map((product: IProductDisplay) => (
                      <VerticalProductCard key={product._id} {...product} />
                    ))}
                  </div>
                )}
                <div className="paginationArea">
                  <div className="container justify-center my-2 flex items-center gap-2">
                    {Array.from({ length: pagination.totalPages }).map((_, index) => (
                      <button
                        key={index}
                        className={`flex h-10 w-10 items-center justify-center rounded-md border ${pagination.currentPage === index + 1
                          ? "bg-primaryDark text-background"
                          : "hover:bg-primaryLight"
                          }`}
                        onClick={() => setSearchValues((prev) => ({ ...prev, pageNumber: index + 1 }))}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <AdvanceSearch />
            <NoData
              icon={<PackageX className="w-12 h-12" />}
              notFoundMessage="There are no Products Matching Search Criteria."
            />
          </>
        )}
      </Suspense>
    </div>
  );
}
export default page