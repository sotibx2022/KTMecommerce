"use client"
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide';
import ProductCard from '@/app/_components/productCard/ProductCard';
import CatalogPageLayout from '@/app/catalog/[searchValue]/CatalogPageLayout';
import { useSpecificCataegory } from '@/app/hooks/queryHooks/useSpecificCategory'
import { IProductDisplay } from '@/app/types/products';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
interface CategoryPageComponent{
    categoryName:string
}
const CategoryPageComponent:React.FC<CategoryPageComponent> = ({categoryName}) => {
  const searchParams = useSearchParams()
  const ProductCardMemo = React.memo(ProductCard)
  const[page,setPage] = useState(Number(searchParams.get('page'))||1);
  const [limit,setLimit] = useState(12)
  const {data,isPending} = useSpecificCataegory(categoryName,page,limit)
  const router = useRouter();
  function handlePageChange(page: number): void {
    const stringPage = page.toString()
   router.push(`/pages/isNewArrivals?page=${page}`)
  }
  const products = isPending ? undefined :data?.products || []
  const pages = data?.pagination?.totalPages || 0
  console.log(products);
  return (
    <div className="container mt-4">
      {isPending ? (
        <div className="flex flex-wrap justify-center sm:justify-between  gap-4">
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
          {pages > 1 && (
            <div className="flex gap-2 justify-center mt-4">
              {Array.from({ length: pages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`cursor-pointer px-3 py-1 rounded ${
                    page === index + 1 ? 'bg-primaryLight text-background font-bold' : 'bg-primaryDark text-background font-bold'
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
  )
}
export default CategoryPageComponent