import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import { getCroppedImg } from './cropImage'
import { Button } from '@/components/ui/button'
interface ImageCropperProps {
    image: string
    aspect?: number
    onCropComplete: (croppedBlob: Blob) => void
    onCancel: () => void
}
const ImageCropper: React.FC<ImageCropperProps> = ({
    image,
    aspect = 2 / 1,
    onCropComplete,
    onCancel,
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
    const onCropAreaComplete = useCallback((_croppedArea: Area, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels)
    }, [])
    const handleCropDone = async () => {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels)
        if (croppedImage) onCropComplete(croppedImage)
    }
    return (
        <div className=" w-full h-full"
        style={{ background: 'var(--gradientwithOpacity)' }}>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropAreaComplete}
            />
            <div className="absolute bottom-0 left-1/2 h-[10vh] flex gap-2 -translate-x-1/2">
                <Button onClick={handleCropDone} variant="success">Crop</Button>
                <Button onClick={onCancel} variant="failure">Cancel</Button>
            </div>
        </div>
    )
}
export default ImageCropper
