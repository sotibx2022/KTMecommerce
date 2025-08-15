"use client"
interface IAddCategoryData {
    subCategoryName: string,
    metaTitle: string,
    metaDescription: string,
    parentCategory: string,
    parentCategoryId: string,
}
import React, { useEffect, useState } from 'react'
import ImageUpload from '../../components/productForm/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm, useWatch } from 'react-hook-form'
import { validateSentence, validateSingleWord } from '@/app/services/helperFunctions/validatorFunctions'
import SubmitError from '@/app/_components/submit/SubmitError'
import toast from 'react-hot-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Category } from '@/app/types/categories'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import axios from 'axios'
import { useRouter } from 'next/navigation'
interface IAddSubCategoryProps{
    categoryId?:string;
}
const AddSubCategoryTemplate:React.FC<IAddSubCategoryProps> = ({categoryId}) => {
    const router = useRouter()
    const { data: categoryDetails, isPending:subCategoryDataPending } = useQuery({
        queryFn: async () => {
          const response = await axios.get(`/api/categories/singleSubCategory/${categoryId}`);
          return response.data;
        },
        queryKey: ['categoryDetail'],
        enabled: !!categoryId
      })
      const subcategoryData = categoryDetails?.data;
    const addSubCategoryMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post('/api/categories/addSubCategory', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("completed")
        },
        onError: (error) => {
            toast.error("not completed")
        }
    })
    useEffect(() => {
        if (categoryId) {
          setValue("metaDescription", subCategoryDataPending ? "Loading" : subcategoryData ? subcategoryData?.meta_description : "There is not data")
          setValue("metaTitle", subCategoryDataPending ? "Loading" : subcategoryData?.meta_title)
          setValue("subCategoryName", subCategoryDataPending ? "Loading" : subcategoryData?.category_name)
          setValue("parentCategory",subCategoryDataPending ? "Loading" : subcategoryData?.category_name)
        }
      }, [categoryId, subCategoryDataPending])
    const { data: navItems, isPending, isError } = useQuery({
        queryKey: ['allCategories'],
        queryFn: getAllCategories
    })
    const [file, setFile] = useState<File | null>(null)
    const { register, formState: { errors }, handleSubmit, setValue, control } = useForm<IAddCategoryData>({ mode: 'onChange' })
    const getUploadedImage = (file: File) => {
        setFile(file)
    }
    const parentCategory = useWatch({
        control,
        name: 'parentCategory',
    });
    const onSubmit = (data: IAddCategoryData) => {
        const formData = new FormData();
        if (!file) {
            toast.error("Please Upload Category Image")
        } else {
            formData.append('file', file);
            formData.append('subCategoryName', data.subCategoryName);
            formData.append('metaTitle', data.metaTitle);
            formData.append('metaDescription', data.metaDescription)
            formData.append('parentCategory', parentCategory)
            addSubCategoryMutation.mutate(formData);
        }
    }
    return (
        <div className="AddSubCategoryTemplate mt-4 card">
            <form className="addCategoryForm flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}>
                <Card className='card'>
                    <CardHeader>
                        <CardTitle>Add Category</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Category Image Upload */}
                        <div className="categoryImageUpload">
                            <ImageUpload action={'add'} uploadImage={getUploadedImage} text="Category" />
                        </div>
                        {/* Category Form */}
                        <div className="categoryForm">
                            <div>
                            <label className='formLabel'>Category</label>
                            <Select
                                {...register("parentCategory", {
                                    required: "Category is Required"
                                })}
                                onValueChange={(value) => setValue('parentCategory', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={isPending ? "Loading" : parentCategory ? parentCategory : "Select Category"}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {navItems && navItems.map((item: Category) => (
                                        <SelectItem value={item.category_name} key={item.url_slug}>
                                            {item.category_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.parentCategory?.message && <SubmitError message={errors.parentCategory.message} />}
                        </div>
                        <div className="categoryNameInputArea">
                            <label className="formLabel">Sub Category Name</label>
                            <input
                                type="text"
                                placeholder="e.g., Mobile"
                                className="formItem"
                                {...register("subCategoryName", {
                                    validate: (value) => validateSingleWord("Sub-Category Name", value)
                                })}
                            />
                            {errors.subCategoryName?.message && <SubmitError message={errors.subCategoryName.message} />}
                        </div>
                        <div className="categoryNameInputArea">
                            <label className="formLabel">Meta Title</label>
                            <input
                                type="text"
                                placeholder="e.g., Buy Mobile Phones Online – Best Deals"
                                className="formItem"
                                {...register('metaTitle', {
                                    validate: (value) => validateSentence('Meta Title', value, 15, 30)
                                })}
                            />
                            {errors.metaTitle?.message && <SubmitError message={errors.metaTitle.message} />}
                        </div>
                        <div className="categoryNameInputArea">
                            <label className="formLabel">Meta Description</label>
                            <textarea
                                placeholder="e.g., Shop the latest mobile phones online with best prices, offers, and free shipping."
                                className="formItem"
                                {...register("metaDescription", {
                                    validate: (value) => validateSentence("Meta Description", value, 30, 90)
                                })}
                            />
                            {errors.metaDescription?.message && <SubmitError message={errors.metaDescription.message} />}
                        </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" variant="secondary">
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
export default AddSubCategoryTemplate
