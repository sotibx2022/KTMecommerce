"use client"
interface ISliderItem {
    sliderImage?: Blob,
    sliderTitle: string,
    sliderSlogan: string,
}
import React, { useState } from 'react'
import ImagePlaceHolder from './ImagePlaceHolder'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import { useForm } from 'react-hook-form'
import { validateSentence } from '@/app/services/helperFunctions/validatorFunctions'
import SubmitError from '@/app/_components/submit/SubmitError'
const SingleSliderItem = () => {
    const { register, formState: { errors }, handleSubmit, setError } = useForm<ISliderItem>({ mode: 'onBlur' })
    const [imageURL, setImageURL] = useState<Blob | null>(null)
    const getSliderURL = (sliderFile: Blob) => {
        setImageURL(sliderFile)
    }
    const onSubmit = async (data: ISliderItem) => {
        const formData = new FormData();
        if (!imageURL) {
            setError('sliderImage', {
                type: 'manual',
                message: "Slider Image is required."
            });
            return; // Stop submission if no image
        }
        formData.append('sliderImage', imageURL);
        formData.append('sliderTitle', data.sliderTitle);
        formData.append('sliderSlogan', data.sliderSlogan);
        console.log(formData);
    };
    return (
        <form className="grid w-full md:grid-cols-2 gap-4"
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2'>
                <ImagePlaceHolder sendUrlToParent={getSliderURL} />
                {errors.sliderImage?.message && <SubmitError message={errors.sliderImage.message} />}
            </div>
            <div className=' flex flex-col gap-4'>
                <div className="inputItem w-full">
                    <label>Slider Title</label>
                    <input type='text' className='formItem' placeholder=''
                        {...register("sliderTitle", {
                            validate: (value) => validateSentence('slider Title', value, 20, 50)
                        })} />
                    {errors.sliderTitle?.message && <SubmitError message={errors.sliderTitle.message} />}
                </div>
                <div className="inputItem w-full">
                    <label>Slider Slogen</label>
                    <input type='text' placeholder='' className='formItem'
                        {...register('sliderSlogan', {
                            validate: (value) => validateSentence('slider Slogan', value, 20, 50)
                        })} />
                    {errors.sliderSlogan?.message && <SubmitError message={errors.sliderSlogan.message} />}
                </div>
                <PrimaryButton searchText={'Add'} />
            </div>
        </form>
    )
}
export default SingleSliderItem