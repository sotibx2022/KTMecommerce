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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
interface IAddSubCategoryProps {
    categoryId?: string;
}
const AddSubCategoryTemplate: React.FC<IAddSubCategoryProps> = ({ categoryId }) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const upateSubCategoryAPIURl = categoryId ? `/api/categories/singleSubCategory/${categoryId}` : `/api/categories/addSubCategory`
    const { data: categoryDetails, isPending: subCategoryDataPending } = useQuery({
  queryFn: async () => {
    const response = await axios.get(`/api/categories/singleSubCategory/${categoryId}`);
    return response.data;
  },
  queryKey: ['categoryDetail', categoryId],
  enabled: !!categoryId,
});
    const subcategoryData = categoryDetails?.data;
    const categoryImageUrl = subCategoryDataPending ? "https://media.tenor.com/JwPW0tw69vAAAAAj/cargando-loading.gif" : subcategoryData?.image_url
    const addSubCategoryMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post(upateSubCategoryAPIURl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        },
        onSuccess: (response) => {
            toast.success(response.message)
            router.push('/admin/categories')
            queryClient.invalidateQueries({ queryKey: ['categories'] })
            queryClient.invalidateQueries({ queryKey: ['initialCategories'] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    useEffect(() => {
        if (categoryId) {
            setValue("metaDescription", subCategoryDataPending ? "Loading" : subcategoryData ? subcategoryData?.meta_description : "There is not data")
            setValue("metaTitle", subCategoryDataPending ? "Loading" : subcategoryData?.meta_title)
            setValue("subCategoryName", subCategoryDataPending ? "Loading" : subcategoryData?.category_name)
            setValue("parentCategory", subCategoryDataPending ? "Loading" : subcategoryData?.parentCategory)
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
        if (!file && !categoryId) {
            toast.error("Please Upload Category Image")
        } else {
            if (file) {
                formData.append('file', file);
            }
            formData.append('subCategoryName', data.subCategoryName);
            formData.append('metaTitle', data.metaTitle);
            formData.append('metaDescription', data.metaDescription)
            formData.append('parentCategory', parentCategory)
            addSubCategoryMutation.mutate(formData);
        }
    }
    return (
        <div className="AddSubCategoryTemplate mt-4 card">
            {addSubCategoryMutation.isPending && <LoadingComponent />}
            <form className="addCategoryForm flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}>
                <Card className='card'>
                    <CardHeader>
                        <CardTitle>Add Sub-Category</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Category Image Upload */}
                        <div className="categoryImageUpload">
                            <ImageUpload action={categoryId ? "edit" : "add"} uploadImage={getUploadedImage} text="Category"
                                imageUrl={categoryImageUrl} />
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
                                        {navItems && navItems.map((item: Category, index: number) => (
                                            <SelectItem value={item.category_name} key={index}>
                                                {item.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.parentCategory?.message && <SubmitError message={errors.parentCategory.message} />}
                            </div>
                            <div className="categoryNameInputArea">
                                <label className="formLabel">Sub Category Name</label>
                                <Input
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
                                <Input
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
                                <Textarea
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
