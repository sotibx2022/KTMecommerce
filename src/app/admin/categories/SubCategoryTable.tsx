import { useQuery } from '@tanstack/react-query'
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from '@/components/ui/table';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import CategoryTableLoading from './CategoryTableLoading';
import axios from 'axios'
import React from 'react'
import { Subcategory } from '@/app/types/categories';
import AddItemButton from './AddItemButton';
const SubCategoryTable = () => {
    const { data: subcategories, isPending } = useQuery({
        queryKey: ['allSubcategories'],
        queryFn: async () => {
            const response = await axios.get('/api/categories/subcategories');
            return response.data.subcategories
        }
    })
    function deleteHandler(arg0: any): void {
        throw new Error('Function not implemented.');
    }
    return (
        <div>
            <div className="categoryTableHeader flex justify-between items-center">
                            <h2 className='secondaryHeading'>Sub-Category Lists</h2>
                            <AddItemButton item={'Sub-Category'} href={'/admin/addCategory'}/>
                        </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>SN</TableHead>
                        <TableHead>Category Icon</TableHead>
                        <TableHead>Category Name</TableHead>
                        <TableHead className='max-w-[300px]'>Parent Category</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                {isPending ? <CategoryTableLoading /> :
                    <TableBody>
                        {subcategories && subcategories.map((navItem: Subcategory, index: number) => {
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
                                    {navItem.parentCategoryName}
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
export default SubCategoryTable