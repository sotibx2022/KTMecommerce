"use client"
import React, { useContext } from 'react'
import { IPagination } from './products'
import {ProductFilterContext} from '@/app/context/ProductFilterContext'
interface ITableNavigation{
    pagination:IPagination
}
const TableNavigation:React.FC<ITableNavigation> = ({pagination}) => {
  const {setFilterState} = useContext(ProductFilterContext);
      const handlePageChange=(pageNumber:number)=>{
        setFilterState((prev)=>({...prev,page:pageNumber}))
  }
  return (
     <div className="container justify-center my-2 flex items-center gap-2">
      {Array.from({ length: pagination.totalPages }).map((_, index) => (
        <button
          key={index}
          className={`flex h-10 w-10 items-center justify-center rounded-md border ${
            pagination.currentPage === index + 1
              ? "bg-primaryDark text-background"
              : "hover:bg-primaryLight"
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}
export default TableNavigation