"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ChangeEvent, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
import SubmitError from '@/app/_components/submit/SubmitError'
import FormError from './FormError'
interface ProductImageProps {
    action: "add" | "edit"
    imageUrl?: string
}
const ProductImage: React.FC<ProductImageProps> = ({ action, imageUrl }) => {
    const {register,formState:{errors,touchedFields},setValue} = useFormContext<IAddProductFormData>()
    const [uploadedImage, setUploadedImage] = useState<null | string>(null)
    const [file, setFile] = useState<File | null>(null)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const selectedFile = e.target.files[0]
            setFile(selectedFile)
            setUploadedImage(URL.createObjectURL(selectedFile))
            setValue('file',selectedFile)
        }
    }
    const handleRemoveImageUplaod = () => {
        setFile(null);
        setUploadedImage("");
        setValue('file',null)
    }
    return (
        <div className="md:w-1/2 card">
            <Card className='card'>
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Product Image</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full">
                        <label className={`flex flex-col  w-full border-2 border-dashed rounded-lg cursor-pointer p-6 gap-4 ${errors.image?.message && touchedFields.image && "border-red-500"}`}>
                            {action === 'edit' && imageUrl && (
                                <div className="mb-4 space-y-2 ">
                                    <Label className="text-sm font-medium text-primaryDark">
                                        Current Product Image
                                    </Label>
                                    <img
                                        src={imageUrl}
                                        alt="Product from database"
                                        className="mt-1 max-h-32 object-contain rounded-md"
                                    />
                                </div>
                            )}
                            {/* Newly uploaded image preview */}
                            {uploadedImage ? (
                                <div className="mb-4 space-y-2 relative">
                                    <Label className="text-sm font-medium text-primaryDark flex justify-between items-center">
                                        New Upload Preview
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            onClick={handleRemoveImageUplaod}
                                        />
                                    </Label>
                                    <img
                                        src={uploadedImage}
                                        alt="New upload preview"
                                        className="mt-1 max-h-32 object-contain rounded-md"
                                    />
                                </div>
                            ) : (
                                <div className=" space-y-1">
                                    <Label className="text-muted-foreground">
                                        Upload product image
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG, JPEG up to 5MB
                                    </p>
                                </div>
                            )}
                            <Input
                                id="image"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                {...register("image",{
                                    required:action ==='add'?"Image is Required":false
                                })}
                                onChange={handleImageUpload}
                            />
                        </label>
                    </div>
                     <FormError name='image'/>
                </CardContent>
            </Card>
        </div>
    )
}
export default ProductImage