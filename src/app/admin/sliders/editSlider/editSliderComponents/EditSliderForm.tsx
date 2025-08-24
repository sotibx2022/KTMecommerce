"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import { APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { IDisplaySlideItems, ISliderItem } from '@/app/types/sliders'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ImagePlaceHolder from '../../addSlider/addSliderComponents/ImagePlaceHolder'
import SubmitError from '@/app/_components/submit/SubmitError'
import { validateSentence } from '@/app/services/helperFunctions/validatorFunctions'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import { useSlidersData } from '@/app/hooks/queryHooks/useSlidersData'
interface IEditSliderProps {
    sliderId: string
}
const EditSliderForm: React.FC<IEditSliderProps> = ({ sliderId }) => {
    const { refetch } = useSlidersData()
    const router = useRouter()
    const {
        register,
        formState: { errors },
        handleSubmit,
        setError,
        setValue,
        clearErrors
    } = useForm<ISliderItem>({ mode: 'onBlur' })
    const [imageURL, setImageURL] = useState<Blob | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false) // New state to control submission
    // Completely removed validation from here
    const getSliderURL = (sliderFile: Blob | null) => {
        setImageURL(sliderFile)
        clearErrors('sliderImage')
    }
    const { data: SliderItem, isPending } = useQuery<APIResponseSuccess<IDisplaySlideItems>>({
        queryFn: async () => {
            const response = await axios.get(`/api/sliders/${sliderId}`)
            return response.data
        },
        queryKey: ['sliderItem', sliderId],
        enabled: !!sliderId
    })
    const singleSlideItem = SliderItem?.success && SliderItem.data
    useEffect(() => {
        if (singleSlideItem) {
            setValue('sliderTitle', singleSlideItem.sliderTitle ?? "Loading...")
            setValue('sliderSlogan', singleSlideItem.sliderSlogan ?? "Loading...")
        }
    }, [singleSlideItem, setValue,sliderId])
    const existingImage = singleSlideItem?.sliderImage ?? "https://media.tenor.com/JwPW0tw69vAAAAAj/cargando-loading.gif"
    const editSliderMutation = useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await axios.post(`/api/sliders/${sliderId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return response.data
        },
        onSuccess: async (response) => {
            toast.success(response.message)
            router.push('/admin/sliders')
            await refetch();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || error.message)
            setIsSubmitting(false) // Reset on error
        }
    })
    const onSubmit = async (data: ISliderItem) => {
        setIsSubmitting(true) // Block multiple submissions
        // Validate image only when submitting
        if (!imageURL && !singleSlideItem?.sliderImage) {
            setError('sliderImage', {
                type: 'manual',
                message: "Slider Image is required."
            })
            setIsSubmitting(false)
            return
        }
        const formData = new FormData()
        if (imageURL) {
            formData.append('sliderImage', imageURL)
        }
        formData.append('sliderTitle', data.sliderTitle)
        formData.append('sliderSlogan', data.sliderSlogan)
        if (isSubmitting) {
            editSliderMutation.mutate(formData)
        }
    }
    return (
        <div>
            <form
                className="grid w-full md:grid-cols-2 gap-4 justify-between items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                {editSliderMutation.isPending && <LoadingComponent />}
                <div className='flex flex-col gap-2'>
                    <ImagePlaceHolder sendUrlToParent={getSliderURL} />
                    {errors.sliderImage?.message && (
                        <SubmitError message={errors.sliderImage.message} />
                    )}
                </div>
                <div className='flex flex-col gap-4'>
                    <div className="existingSliderImage w-full h-auto">
                        <img src={existingImage} alt='saved Slider Image' />
                    </div>
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
                    <PrimaryButton
                        searchText={'Update'}
                        disabled={editSliderMutation.isPending || isPending}
                    />
                </div>
            </form>
        </div>
    )
}
export default EditSliderForm