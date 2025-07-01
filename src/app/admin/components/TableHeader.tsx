"use client"
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useContext } from 'react'
import { ShortableTableHead } from './ShortableTableHead'
import SelectableTableHeader from './SelectableTableHeader'
import { ProductFilterContext } from '@/app/context/ProductFilterContext'
const TableTop = () => {
  const { filterState, setFilterState } = useContext(ProductFilterContext)
  const UpdatePriceSorting = () => {
    setFilterState((prev) => ({
      ...prev,
      price: prev.price === "ascending" ? "descending" : "ascending",
    }))
  }
  const UpdateRatingSorting = () => {
    setFilterState(prevState => ({
      ...prevState,
      rating: prevState.rating === "ascending" ? "descending" : "ascending"
    }))
  }
  return (
    <TableHeader >
      <TableRow >
        <TableHead className={`min-w-[50px]`}>
          SN.
        </TableHead>
        <TableHead className={` min-w-[100px]`}>
          Image
        </TableHead>
        <TableHead className={` min-w-[150px]`}>
          Product Name
        </TableHead>
        <ShortableTableHead 
          label="Price" 
          onClick={UpdatePriceSorting} 
          state={filterState.price === "Price" ? "normal" : filterState.price}
        />
        <SelectableTableHeader  
          title="Stock" 
        />
        <SelectableTableHeader 
          title="Category" 
        />
        <SelectableTableHeader
          title="Type" 
        />
        <SelectableTableHeader 
          title="Highlights" 
        />
        <ShortableTableHead 
          label="Rating" 
          onClick={UpdateRatingSorting} 
          state={filterState.rating === "Rating" ? "normal" : filterState.rating}
        />
        <TableHead >
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
export default TableTop