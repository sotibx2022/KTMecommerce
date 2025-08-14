import { TableBody, TableRow, TableCell } from '@/components/ui/table'
import React from 'react'
const CategoryTableLoading = () => {
    return (
        <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                    {/* Index Number */}
                    <TableCell>
                        <div className="h-4 w-4 bg-[--backgroundLight] rounded animate-pulse"></div>
                    </TableCell>
                    {/* Image */}
                    <TableCell>
                        <div className="w-10 h-10 bg-[--backgroundLight] rounded animate-pulse"></div>
                    </TableCell>
                    {/* Category Name */}
                    <TableCell>
                        <div className="h-4 w-24 bg-[--backgroundLight] rounded animate-pulse"></div>
                    </TableCell>
                    {/* Subcategories Badges */}
                    <TableCell>
                        <div className="flex gap-2 flex-wrap">
                            {Array.from({ length: 3 }).map((_, subIndex) => (
                                <div
                                    key={subIndex}
                                    className="h-6 w-16 bg-[--backgroundLight] rounded-full animate-pulse"
                                ></div>
                            ))}
                        </div>
                    </TableCell>
                    {/* Actions */}
                    <TableCell>
                        <div className="flex w-full justify-between items-center">
                            <div className="h-8 w-8 bg-[--backgroundLight] rounded-md animate-pulse"></div>
                            <div className="h-8 w-8 bg-[--backgroundLight] rounded-md animate-pulse"></div>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}
export default CategoryTableLoading