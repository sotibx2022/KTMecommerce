"use client"
import { TableHead } from '@/components/ui/table'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import CategoriesSelection from './CategoreisSelection'
import SubCategorySelection from './SubCategoriesSelection'
import ProductHighLightSelection from './ProductHighLightSelection'
import StockSelection from './StockSelection'
import { ProductFilterContext } from '@/app/context/ProductFilterContext'
import SubCategoriesSelection from './SubCategoriesSelection'
interface SelectableTableHeader {
    title: String
}
const SelectableTableHeader: React.FC<SelectableTableHeader> = ({ title }) => {
    const dropdownRef = useRef<HTMLDivElement>(null) // Added proper type
    const [showAbsoluteComponent, setShowAbsoluteComponent] = useState(false)
    const { filterState } = useContext(ProductFilterContext)
    const [clickedEvent, setClickedEvent] = useState<MouseEvent | null>(null)
    const toggleAbsoluteComponent = () => {
        setShowAbsoluteComponent(prev => !prev)
    }
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowAbsoluteComponent(false)
            setClickedEvent(event)
        }
    }
    useEffect(() => {
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [clickedEvent])
    return (
        <TableHead className={`relative  ${title === 'Sub Category'}?" min-w-[150px]":""`}>
            <div className="flex items-center gap-2" ref={dropdownRef}>
                <>
                    {title === "Category" && <span >{filterState.categoryText}</span>}
                    {title === "Sub-Category" && <span className='min-w-[100px]'>{filterState.categoryText === "Category" ? "Sub-Category" : filterState.subCategoryText}</span>}
                    {title === "Highlights" && <span className='relative'>{filterState.highlights}</span>}
                    {title === "Stock" && <span>{filterState.stock}</span>}
                </>
                {!filterState.loading && (title !== "Sub-Category") && <Menu
                    className="h-4 w-4 cursor-pointer hover:text-helper transition-transform  duration-200"
                    onClick={toggleAbsoluteComponent}
                />}
                {!filterState.loading && title ==='Sub-Category'  && filterState.categoryText !=='Category' && <Menu
                    className="h-4 w-4 cursor-pointer hover:text-helper transition-transform  duration-200"
                    onClick={toggleAbsoluteComponent}
                />}
                {showAbsoluteComponent && (
                    <div onClick={toggleAbsoluteComponent}>
                        {title === "Category" && <CategoriesSelection />}
                        {title === "Sub-Category" && <SubCategoriesSelection />}
                        {title === "Highlights" && <ProductHighLightSelection />}
                        {title === "Stock" && <StockSelection />}
                    </div>
                )}
            </div>
        </TableHead>
    )
}
export default SelectableTableHeader