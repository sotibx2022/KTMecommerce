"use client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import React, { useState } from 'react'
import ImagePlaceHolder from './ImagePlaceHolder'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import { useForm } from 'react-hook-form'
import { validateSentence } from '@/app/services/helperFunctions/validatorFunctions'
import SubmitError from '@/app/_components/submit/SubmitError'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import { ISliderItem } from '@/app/types/sliders'
import { useRouter } from 'next/navigation'
import { truncate } from 'lodash'
import { useSlidersData } from '@/app/hooks/queryHooks/useSlidersData'
import { Button } from "@/components/ui/button";
const SingleSliderItem = () => {
    const {refetch} = useSlidersData();
    const [isSubmitting, setIsSubmitting] = useState(false) // New state to control submission
    const router = useRouter()
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        clearErrors
    } = useForm<ISliderItem>({ mode: 'onBlur' })
    const [imageURL, setImageURL] = useState<Blob | null>(null)
    // Simplified - just stores the image without validation
    const getSliderURL = (sliderFile: Blob | null) => {
        setImageURL(sliderFile)
        clearErrors('sliderImage') // Clear any previous errors when image changes
    }
    const addSliderMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post('/api/sliders/addSlider', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        },
        onSuccess: async(response) => {
            toast.success(response.message)
            router.push('/admin/sliders')
            await refetch()
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || error.message)
        }
    })
    const onSubmit = async (data: ISliderItem) => {
        setIsSubmitting(true)
        // Image validation now happens here at submission time
        if (!imageURL) {
            setError('sliderImage', {
                type: 'manual',
                message: "Slider Image is required."
            })
            setIsSubmitting(false);
            return
        }
        const formData = new FormData()
        formData.append('sliderImage', imageURL)
        formData.append('sliderTitle', data.sliderTitle)
        formData.append('sliderSlogan', data.sliderSlogan)
        if (isSubmitting) {
            addSliderMutation.mutate(formData)
        }
    }
    return (
        <Card className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        {addSliderMutation.isPending && <LoadingComponent />}
        <CardHeader>
          <CardTitle>Add Slider</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {/* Image upload */}
          <div className="flex flex-col gap-2">
            <ImagePlaceHolder sendUrlToParent={getSliderURL} />
            {errors.sliderImage?.message && (
              <SubmitError message={errors.sliderImage.message} />
            )}
          </div>
          {/* Inputs */}
          <div className="flex flex-col gap-6">
            {/* Slider Title */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Slider Title</label>
              <input
                type="text"
                className="formItem"
                {...register("sliderTitle", {
                  validate: (value) =>
                    validateSentence("Slider Title", value, 20, 50),
                })}
              />
              {errors.sliderTitle?.message && (
                <SubmitError message={errors.sliderTitle.message} />
              )}
            </div>
            {/* Slider Slogan */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Slider Slogan</label>
              <input
                type="text"
                className="formItem"
                {...register("sliderSlogan", {
                  validate: (value) =>
                    validateSentence("Slider Slogan", value, 20, 50),
                })}
              />
              {errors.sliderSlogan?.message && (
                <SubmitError message={errors.sliderSlogan.message} />
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" variant="secondary">Add</Button>
        </CardFooter>
      </form>
    </Card>
    )
}
export default SingleSliderItem