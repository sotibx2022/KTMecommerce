import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
interface ProductHighlightsFormProps {
  action: "edit" | "add"
}
const ProductHighlightsForm: React.FC<ProductHighlightsFormProps> = ({ action }) => {
  const { register, watch, setValue } = useFormContext<IAddProductFormData>()
  // Handler for checkbox changes
  const handleCheckboxChange = (fieldName: keyof IAddProductFormData) => {
    const currentValue = watch(fieldName)
    setValue(fieldName, !currentValue)
  }
  return (
    <div className="space-y-4">
      <Label>Product Tags</Label>
      <div className="flex flex-wrap items-center gap-4">
        {/* New Arrival */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isNewArrivals" 
            checked={watch('isNewArrivals') || false}
            onCheckedChange={() => handleCheckboxChange('isNewArrivals')}
          />
          <Label htmlFor="isNewArrivals">New Arrival</Label>
        </div>
        {/* Top Seller */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isTopSell" 
            checked={watch('isTopSell') || false}
            onCheckedChange={() => handleCheckboxChange('isTopSell')}
          />
          <Label htmlFor="isTopSell">Top Seller</Label>
        </div>
        {/* Trending */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isTrendingNow" 
            checked={watch('isTrendingNow') || false}
            onCheckedChange={() => handleCheckboxChange('isTrendingNow')}
          />
          <Label htmlFor="isTrendingNow">Trending</Label>
        </div>
        {/* On Offer */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isOfferItem" 
            checked={watch('isOfferItem') || false}
            onCheckedChange={() => handleCheckboxChange('isOfferItem')}
          />
          <Label htmlFor="isOfferItem">On Offer</Label>
        </div>
        {/* Regular */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="isRegular" 
            checked={watch('isRegular') || false}
            onCheckedChange={() => handleCheckboxChange('isRegular')}
          />
          <Label htmlFor="isRegular">Regular</Label>
        </div>
      </div>
    </div>
  )
}
export default ProductHighlightsForm