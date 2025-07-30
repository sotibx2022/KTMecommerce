"use client"
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
const SingleSliderItem = () => {
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
        onSuccess: (response) => {
            toast.success(response.message)
            router.push('/admin/sliders')
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
        <form
            className="grid w-full md:grid-cols-2 gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            {addSliderMutation.isPending && <LoadingComponent />}
            <div className='flex flex-col gap-2'>
                <ImagePlaceHolder sendUrlToParent={getSliderURL} />
                {errors.sliderImage?.message && (
                    <SubmitError message={errors.sliderImage.message} />
                )}
            </div>
            <div className='flex flex-col gap-4'>
                <div className="inputItem w-full">
                    <label>Slider Title</label>
                    <input
                        type='text'
                        className='formItem'
                        placeholder=''
                        {...register("sliderTitle", {
                            validate: (value) => validateSentence('Slider Title', value, 20, 50)
                        })}
                    />
                    {errors.sliderTitle?.message && (
                        <SubmitError message={errors.sliderTitle.message} />
                    )}
                </div>
                <div className="inputItem w-full">
                    <label>Slider Slogan</label>
                    <input
                        type='text'
                        placeholder=''
                        className='formItem'
                        {...register('sliderSlogan', {
                            validate: (value) => validateSentence('Slider Slogan', value, 20, 50)
                        })}
                    />
                    {errors.sliderSlogan?.message && (
                        <SubmitError message={errors.sliderSlogan.message} />
                    )}
                </div>
                <PrimaryButton searchText={'Add'} />
            </div>
        </form>
    )
}
export default SingleSliderItem