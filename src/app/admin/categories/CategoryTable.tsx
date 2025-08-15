"use client"
import React, { useContext, useState } from 'react'
import { Category, Subcategory } from '@/app/types/categories';
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from '@/components/ui/table';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import CategoryTableLoading from './CategoryTableLoading';
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AddItemButton from './AddItemButton';
import DeleteConfirmation from '@/app/_components/deleteConfirmation/DeleteConfirmation';
import { DisplayContext } from '@/app/context/DisplayComponents';
import toast from 'react-hot-toast';
import axios from 'axios';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
const CategoryTable = () => {
    const formData = new FormData();
    const [categoryId, setCategoryId] = useState<string | null>(null)
    const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
    const { data: navItems, isPending, isError, refetch } = useQuery({
        queryKey: ['allCategories'],
        queryFn: getAllCategories
    })
    const deleteCategoryMutation = useMutation({
        mutationFn: async (categoryId: string) => {
            const response = await axios.post(`/api/categories/delete/category/${categoryId}`);
            return response.data;
        },
        onMutate: () => {
            setVisibleComponent('loadingComponent')
        },
        onSuccess: (response) => {
            toast.success(response.message)
            refetch();
            setVisibleComponent('')
        },
        onError: (error) => {
            toast.error(error.message)
            setVisibleComponent('')
        }
    })
    function deleteHandler(categoryId: string): void {
        setVisibleComponent('dilaugeBox');
        setCategoryId(categoryId)
    }
    const getConfirmationValue = (value: Boolean) => {
        if (value && categoryId) {
            deleteCategoryMutation.mutate(categoryId)
        }
    }
    return (
        <div>
            <div className="categoryTableHeader flex justify-between items-center">
                <h2 className='subHeading'>Category Lists</h2>
                <AddItemButton item={'Category'} href={'/admin/categories/addCategory'} />
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
            {visibleComponent === 'dilaugeBox' && <DeleteConfirmation message={'Do you want to Delete this Category? The Products inside this category will remain undeleted.'}
                returnConfirmValue={getConfirmationValue}
                loading={deleteCategoryMutation.isPending} />}
        </div>
    )
}
export default CategoryTable