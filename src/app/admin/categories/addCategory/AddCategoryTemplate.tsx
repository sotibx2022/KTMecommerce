"use client"
export interface IAddCategoryData {
  categoryName: string,
  metaTitle: string,
  metaDescription: string,
}
import React, { useEffect, useState } from 'react'
import ImageUpload from '../../components/productForm/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { validateFullName, validateSentence, validateSingleWord, validateWord } from '@/app/services/helperFunctions/validatorFunctions'
import SubmitError from '@/app/_components/submit/SubmitError'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
interface AddCategoryTemplateProps {
  categoryId?: string
}
const AddCategoryTemplate: React.FC<AddCategoryTemplateProps> = ({ categoryId }) => {
  const router = useRouter()
  const queryClient = useQueryClient();
  const { data: categoryDetails, isPending } = useQuery({
    queryFn: async () => {
      const response = await axios.get(`/api/categories/singleCategory/${categoryId}`);
      return response.data;
    },
    queryKey: ['categoryDetail'],
    enabled: !!categoryId
  })
  const categoryData = categoryDetails?.data;
  const addCategoryMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post(categoryId ? `/api/categories/singleCategory/${categoryId}` : '/api/categories/addCategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({queryKey:['categories']})
      queryClient.invalidateQueries({queryKey:['initialCategories']})
      toast.success(response.message)
      router.push('/admin/categories')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const [file, setFile] = useState<File | null>(null)
  const { register, formState: { errors }, handleSubmit, setValue } = useForm<IAddCategoryData>({ mode: 'onChange' })
  useEffect(() => {
    if (categoryId) {
      setValue("metaDescription", isPending ? "Loading" : categoryData ? categoryData?.meta_description : "There is not data")
      setValue("metaTitle", isPending ? "Loading" : categoryData?.meta_title)
      setValue("categoryName", isPending ? "Loading" : categoryData?.category_name)
    }
  }, [categoryId, isPending])
  const getUploadedImage = (file: File) => {
    setFile(file)
  }
  const onSubmit = (data: IAddCategoryData) => {
    const formData = new FormData();
    if (!file && !categoryId) {
      toast.error("Please Upload Category Image")
    } else {
      if (file) {
        formData.append('file', file);
      }
      formData.append('categoryName', data.categoryName);
      formData.append('metaTitle', data.metaTitle);
      formData.append('metaDescription', data.metaDescription)
      addCategoryMutation.mutate(formData);
    }
  }
  return (
    <div className="addCategoryTemplate mt-4 card">
      {addCategoryMutation.isPending && <LoadingComponent />}
      <form className="addCategoryForm flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}>
        <Card className='card'>
          <CardHeader>
            <CardTitle>Add Category</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category Image Upload */}
            <div className="categoryImageUpload">
              <ImageUpload action={categoryId ? "edit" : "add"} uploadImage={getUploadedImage} text="Category"
                imageUrl={isPending ? "https://media.tenor.com/JwPW0tw69vAAAAAj/cargando-loading.gif" : categoryData?.image_url} />
            </div>
            {/* Category Form */}
            <div className="categoryForm">
              <div className="categoryNameInputArea">
                <label className="formLabel">Category Name</label>
                <Input
                  type="text"
                  placeholder="e.g., Mobile"
                  className="formItem"
                  {...register("categoryName", {
                    validate: (value) => validateSingleWord("Category Name", value)
                  })}
                />
                {errors.categoryName?.message && <SubmitError message={errors.categoryName.message} />}
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
export default AddCategoryTemplate
