"use client"
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useState } from 'react'
import { ShortableTableHead } from './ShortableTableHead'
import { Menu } from 'lucide-react'
import ProductHighLightSelection from './ProductHighLightSelection'
import SubCategorySelection from './SubCategoriesSelection'
import CategoriesSelection from './CategoreisSelection'
import StockSelection from './StockSelection'
import SelectableTableHeader from './SelectableTableHeader'
const TableTop = () => {
      const[priceSortState,setPriceSortState] = useState<"normal" | "ascending" | "descending">("normal")
      const[showCategories,setShowCategories] = useState(false);
      const[showSubCategories,setShowSubCategories] = useState(false);
      const[showProductHighlights,setShowProductHighlights] = useState(false);
      const[showStockSelection,setShowStockSelection] = useState(false);
      const[ratingSortState,setRatingSortState] = useState<"normal" | "ascending" | "descending">("normal")
      const UpdatePriceSorting = () => {
  setPriceSortState(prevState => 
    prevState === "ascending" ? "descending" : "ascending"
  );
}
const UpdateRatingSorting = () => {
  setRatingSortState(prevState => 
    prevState === "ascending" ? "descending" : "ascending"
  );
}
  return (
        <TableHeader className='overflow-x-auto'>
          <TableRow>
            <TableHead>SN.</TableHead>
            <TableHead className='min-w-[100px]'>Image</TableHead>
            <TableHead className="min-w-[150px]">Product Name</TableHead>
            <ShortableTableHead label="Price" onClick={UpdatePriceSorting} state={priceSortState}/>
<SelectableTableHeader title="Category"/>
<SelectableTableHeader title="Sub Category"/>
<SelectableTableHeader title="Stock"/>
<SelectableTableHeader title="Highlights"/>
            <ShortableTableHead label="Rating" onClick={UpdateRatingSorting} state={ratingSortState}/>
            <TableHead className="min-w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
  )
}
export default TableTop