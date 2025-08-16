import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Table, TableHeader, TableBody, TableCell, TableRow, TableHead } from '@/components/ui/table';
import { Edit, SquareMousePointer, Trash } from 'lucide-react';
import Link from 'next/link';
import CategoryTableLoading from './CategoryTableLoading';
import axios from 'axios';
import React, { useContext, useMemo, useState } from 'react';
import { ISubcategory } from '@/models/categories.model';
import AddItemButton from './AddItemButton';
import { DisplayContext } from '@/app/context/DisplayComponents';
import toast from 'react-hot-toast';
import DeleteConfirmation from '@/app/_components/deleteConfirmation/DeleteConfirmation';
import PatentCategoriesSelect from './PatentCategoriesSelect';
const SubCategoryTable = () => {
    const [categoryValue, setCategoryValue] = useState<string>("Parent Category");
    const [showDropDown, setShowDropDown] = useState(false);
    const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
    const [categoryId, setCategoryId] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const queryClient = useQueryClient()
    // Corrected useMemo syntax
    const queryUrl = useMemo(() => {
        return categoryValue === "Parent Category"
            ? '/api/categories/subcategories'
            : `/api/categories/subcategories?parentCategory=${categoryValue}`;
    }, [categoryValue]);
    const { data: subcategories = [], isPending } = useQuery({
        queryKey: ['allSubcategories', queryUrl],
        queryFn: async () => {
            try {
                const response = await axios.get(queryUrl);
                // Make sure you return an array even if the response is empty
                return response.data?.subcategories || [];
            } catch (error) {
                console.error("Failed to fetch subcategories:", error);
                return []; // fallback value so query never returns undefined
            }
        },
    });
    const deleteCategoryMutation = useMutation({
        mutationFn: async (categoryId: string) => {
            const response = await axios.post(`/api/categories/delete/category/${parentCategoryId}`, { subCategoryId: categoryId });
            return response.data;
        },
        onMutate: () => setVisibleComponent('loadingComponent'),
        onSuccess: (response) => {
            toast.success(response.message);
            setVisibleComponent('');
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['allSubcategories'] })
            queryClient.invalidateQueries({ queryKey: ['initialCategories'] })
        },
        onError: (error: any) => {
            toast.error(error.message);
            setVisibleComponent('');
        }
    });
    const getConfirmationValue = (value: boolean) => {
        if (value) deleteCategoryMutation.mutate(categoryId);
    };
    function deleteHandler(navItem: ISubcategory): void {
        setVisibleComponent('dilaugeBox');
        setCategoryId(navItem.categoryId);
        setParentCategoryId(navItem.parentCategoryId);
    }
    const selectedCategory = (category_name: string) => {
        setCategoryValue(category_name);
        setShowDropDown(false);
    };
    return (
        <div>
            <div className="categoryTableHeader flex justify-between items-center my-4">
                <h2 className='secondaryHeading'>Sub-Category Lists</h2>
                <AddItemButton item={'Sub-Category'} href={'/admin/categories/addSubCategory'} />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>SN</TableHead>
                        <TableHead>Category Icon</TableHead>
                        <TableHead>Category Name</TableHead>
                        <TableHead className='relative'>
                            {showDropDown ? (
                                <PatentCategoriesSelect categorytoSelect={selectedCategory} />
                            ) : (
                                <div onClick={() => setShowDropDown(!showDropDown)} className='cursor-pointer flex items-center gap-2'>
                                    {categoryValue}
                                    <SquareMousePointer className='w-4 h-4 text-helper' />
                                </div>
                            )}
                        </TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                {isPending ? (
                    <CategoryTableLoading />
                ) : (
                    <TableBody>
                        {subcategories?.map((navItem: ISubcategory, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <img src={navItem.image_url} className='w-10 h-10' />
                                </TableCell>
                                <TableCell>{navItem.category_name}</TableCell>
                                <TableCell>{navItem.parentCategoryName}</TableCell>
                                <TableCell>
                                    <div className="actionButtons flex w-full h-full justify-center items-center gap-2">
                                        <Link href={`/admin/categories/editSubCategory/categoryIdentifier?categoryId=${navItem._id!.toString()}`}>
                                            <button className="p-2 rounded-md bg-green-500 hover:bg-green-600 transition-colors">
                                                <Edit size={18} className="text-green-200 cursor-pointer" />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(navItem)}
                                            className="p-2 rounded-md bg-red-500 hover:bg-red-600 transition-colors"
                                        >
                                            <Trash size={18} className="text-red-200" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                )}
            </Table>
            {visibleComponent === 'dilaugeBox' && (
                <DeleteConfirmation
                    message={'Do you want to Delete this Category? The Products inside this category will remain undeleted.'}
                    returnConfirmValue={getConfirmationValue}
                    loading={deleteCategoryMutation.isPending}
                />
            )}
        </div>
    );
};
export default SubCategoryTable;
