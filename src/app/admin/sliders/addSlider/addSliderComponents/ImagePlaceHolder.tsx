import React, { useEffect, useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import CloseIcon from '@/app/_components/absoluteComponent/CloseIcon'
import ImageCropper from './ImageCropper'
interface IImagePlaceHolder {
  sendUrlToParent: (sliderImage: Blob) => void;
}
const ImagePlaceHolder: React.FC<IImagePlaceHolder> = ({ sendUrlToParent}) => {
  const [file, setFile] = useState<File | null>(null)
  const [sliderItemUrl, setSliderItemUrl] = useState('')
  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setSliderItemUrl(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [file])
  const handleCancel = () => {
    setFile(null)
    setSliderItemUrl('')
  }
  return (
    <div className="relative flex flex-col items-center justify-center max-w-[300px]  w-full h-full min-h-[150px] bg-primaryLight rounded-md border border-dashed border-primaryDark overflow-hidden">
      {file && sliderItemUrl ? (
        <div
          className="fixed w-screen h-[100vh] top-0 left-0 z-50"
          style={{ background: 'var(--gradientwithOpacity)' }}
        >
          <ImageCropper
            image={sliderItemUrl}
            onCropComplete={(blob) => {
              const croppedUrl = URL.createObjectURL(blob)
              setSliderItemUrl(croppedUrl)
              sendUrlToParent(blob);
              setFile(null)
            }}
            onCancel={handleCancel}
          />
        </div>
      ) : sliderItemUrl ? (
        <>
          <img
            src={sliderItemUrl}
            alt="Cropped Preview"
            className="object-cover w-full h-full rounded-md"
          />
          <div className="absolute top-1 right-1 z-10">
            <CloseIcon
              onClick={() => {
                setFile(null)
                setSliderItemUrl('')
              }}
            />
          </div>
        </>
      ) : (
        <div className='h-full w-full flex justify-center items-center flex-col gap-4'>
          <label className="cursor-pointer flex flex-col items-center justify-center ">
            <ImageIcon className="w-10 h-10 text-primaryDark" />
            <p className="primaryParagraph">Browse Slider Image</p>
            <input
              type="file"
              onChange={(e) => {
                const newFile = e.target.files?.[0] || null
                setFile(newFile)
              }}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      )}
    </div>
  )
}
export default ImagePlaceHolder
