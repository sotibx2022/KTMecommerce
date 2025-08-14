"use client"
export interface IAddCategoryData {
  categoryName: string,
  metaTitle: string,
  metaDescription: string,
}
import React, { useState } from 'react'
import ImageUpload from '../../components/productForm/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { validateFullName, validateSentence, validateSingleWord, validateWord } from '@/app/services/helperFunctions/validatorFunctions'
import SubmitError from '@/app/_components/submit/SubmitError'
import toast from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
const AddCategoryTemplate = () => {
  const addCategoryMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axios.post('/api/categories/addCategory', formData, {
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
  const [file, setFile] = useState<File | null>(null)
  const { register, formState: { errors }, handleSubmit } = useForm<IAddCategoryData>({ mode: 'onChange' })
  const getUploadedImage = (file: File) => {
    setFile(file)
    console.log(file)
  }
  const onSubmit = (data: IAddCategoryData) => {
    const formData = new FormData();
    if (!file) {
      toast.error("Please Upload Category Image")
    } else {
      formData.append('file', file);
      formData.append('categoryName', data.categoryName);
      formData.append('metaTitle', data.metaTitle);
      formData.append('metaDescription', data.metaDescription)
      addCategoryMutation.mutate(formData);
    }
  }
  return (
    <div className="addCategoryTemplate mt-4 card">
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
              <div className="categoryNameInputArea">
              <label className="formLabel">Category Name</label>
              <input
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
export default AddCategoryTemplate
