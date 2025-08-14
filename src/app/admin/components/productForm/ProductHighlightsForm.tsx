"use client"
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
import SubmitError from '@/app/_components/submit/SubmitError'
interface ProductHighlightsFormProps {
  action: "edit" | "add"
}
const ProductHighlightsForm: React.FC<ProductHighlightsFormProps> = ({ action }) => {
  const { register, watch, setValue, formState:{errors,touchedFields,isSubmitted} } = useFormContext<IAddProductFormData>()
  const formValues = watch()
  const handleCheckboxChange = (fieldName: keyof IAddProductFormData) => {
    const currentValue = watch(fieldName)
    setValue(fieldName, !currentValue)
  }
  return (
    <div className="space-y-4">
       <label className='formLabel'>Product Tags</label>
      <div className="flex flex-wrap items-center gap-4">
        {/* New Arrival */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isNewArrivals" 
            checked={watch('isNewArrivals') || false}
            onCheckedChange={() => handleCheckboxChange('isNewArrivals')}
          />
          <label htmlFor="isNewArrivals" className='formLabel'>New Arrivals</label>
        </div>
        {/* Top Seller */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isTopSell" 
            checked={watch('isTopSell') || false}
            onCheckedChange={() => handleCheckboxChange('isTopSell')}
          />
          <label htmlFor="isTopSell" className='formLabel'>Top Seller</label>
        </div>
        {/* Trending */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isTrendingNow" 
            checked={watch('isTrendingNow') || false}
            onCheckedChange={() => handleCheckboxChange('isTrendingNow')}
          />
          <label htmlFor="isTrendingNow" className='formLabel'>Trending</label>
        </div>
        {/* On Offer */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isOfferItem" 
            checked={watch('isOfferItem') || false}
            onCheckedChange={() => handleCheckboxChange('isOfferItem')}
          />
          <label htmlFor="isOfferItem" className='formLabel'>On Offer</label>
        </div>
        {/* Regular */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isRegular" 
            checked={watch('isRegular') || false}
            onCheckedChange={() => handleCheckboxChange('isRegular')}
          />
          <label htmlFor="isRegular" className='formLabel'>Regular</label>
        </div>
      </div>
      {!watch('isNewArrivals') && !watch('isTrendingNow') && !watch('isTopSell') &&
       !watch('isOfferItem') && !watch('isRegular') && isSubmitted &&
        <SubmitError message='At least one highlight item needs to be selected'/> }
    </div>
  )
}
export default ProductHighlightsForm
