"use client"
import { Plus, FilterX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductSearchBar from './ProductSearchBar'
import { defaultFilterState, ProductFilterContext } from '@/app/context/ProductFilterContext'
import { useContext } from 'react'
import Link from 'next/link'
import TotalProducts from './ecommerceSummary/TotalProducts'
export const ProductsPageHeader = () => {
  const {setFilterState} = useContext(ProductFilterContext)
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-4">
      <TotalProducts/>
      <div className="w-full sm:w-auto">
        <ProductSearchBar />
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
       <Link href='/admin/addProduct'> <Button 
          variant="success" 
          size="default"
          className="gap-2"
          aria-label="Add product"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Product</span>
        </Button></Link>
        <Button 
          variant="failure" 
          size="default"
          className="gap-2"
          aria-label="Reset filters"
          onClick={()=>setFilterState({...defaultFilterState,loading:false})}
        >
          <FilterX className="h-4 w-4" />
          <span className="hidden sm:inline">Reset Filters</span>
        </Button>
      </div>
    </div>
  )
}