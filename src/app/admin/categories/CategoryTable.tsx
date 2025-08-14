"use client"
import React from 'react'
import { Category, Subcategory } from '@/app/types/categories';
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from '@/components/ui/table';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import CategoryTableLoading from './CategoryTableLoading';
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import { useQuery } from '@tanstack/react-query';
import AddItemButton from './AddItemButton';
const CategoryTable = () => {
    const { data: navItems, isPending, isError } = useQuery({
        queryKey: ['allCategories'],
        queryFn: getAllCategories
    })
    console.log(navItems);
    function deleteHandler(arg0: any): void {
        throw new Error('Function not implemented.');
    }
    return (
        <div>
            <div className="categoryTableHeader flex justify-between items-center">
                <h2 className='subHeading'>Category Lists</h2>
                <AddItemButton item={'Category'} href={'/admin/categories/addCategory'}/>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>SN</TableHead>
                        <TableHead>Category Icon</TableHead>
                        <TableHead>Category Name</TableHead>
                        <TableHead className='max-w-[300px]'>SubCategories</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                {isPending ? <CategoryTableLoading /> :
                    <TableBody>
                        {navItems && navItems.map((navItem: Category, index: number) => {
                            return <TableRow key={index}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>
                                    <img src={navItem.image_url} className='w-10 h-10' />
                                </TableCell>
                                <TableCell>
                                    {navItem.category_name}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 flex-wrap">
                                        {navItem.subcategories.map((category: Subcategory, index: number) => (
                                            <span key={index} className='bg-primaryLight px-4 py-1 rounded-sm text-background'>{category.category_name}</span>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="actionButtons flex w-full h-full justify-between items-center gap-2">
                                        <Link href={`/admin/categories/editCategory/categoryIdentifier?categoryId=${navItem._id!.toString()}`}>
                                            <button className="p-2 rounded-md bg-green-500 hover:bg-green-600 transition-colors">
                                                <Edit size={18} className="text-green-200 cursor-pointer" />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(navItem._id!.toString())}
                                            className="p-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
                                        >
                                            <Trash size={18} className="text-red-200" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                }
            </Table>
        </div>
    )
}
export default CategoryTable