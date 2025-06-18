"use client"
import React, { useContext, useEffect, useMemo, useState } from 'react'
import AdvanceSearch from './AdvanceSearch'
import CatalogPageLayout from './CatalogPageLayout'
import AdvanceSearchContext, { SearchContext } from './AdvanceSearchContext'
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
const page = () => {
  const router = useRouter()
  const { searchValues, setSearchValues } = useContext(SearchContext);
  console.log(searchValues);
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
  console.log(searchValues.layout);
  return (
    <div>
      <CatalogPageLayout>
        <AdvanceSearchContext>
        <AdvanceSearch />
        <div className='container flex justify-between flex-wrap'>
        {products.map((product: IProductDisplay, index: number) => {
          return <div key={index} >
            {searchValues.layout === 'grid' ?
              <div className=''>
                <ProductCard {...product} />
              </div>
              :
              <div className='container'>
                <VerticalProductCard {...product} />
              </div>}
          </div>
        })}
        </div>
        <TableNavigation pagination={pagination} />
        </AdvanceSearchContext>
      </CatalogPageLayout>
    </div>
  )
}
export default page