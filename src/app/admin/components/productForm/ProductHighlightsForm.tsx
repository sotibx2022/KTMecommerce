// components/ProductHighlightsForm.tsx
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
import { useEffect, useState } from 'react'
const ProductHighlightsForm = () => {
  const { register, watch } = useFormContext<IAddProductFormData>()
  const [showError, setShowError] = useState(false)
  const values = watch(["isNewArrivals", "isTopSell", "isTrendingNow", "isOfferItem", "isRegular"])
  useEffect(() => {
    setShowError(values.every(v => !v))
  }, [values])
  return (
    <div className="space-y-4">
      <Label>Product Tags</Label>
      <div className="flex flex-wrap items-center gap-4">
        {[
          ["isNewArrivals", "New Arrival"],
          ["isTopSell", "Top Seller"],
          ["isTrendingNow", "Trending"],
          ["isOfferItem", "On Offer"],
          ["isRegular", "Regular"]
        ].map(([id, label]) => (
          <div className="flex items-center space-x-2" key={id}>
            <Checkbox id={id} {...register(id as keyof IAddProductFormData)} />
            <Label htmlFor={id}>{label}</Label>
          </div>
        ))}
      </div>
      {showError && <p className="text-sm text-red-500">Select at least one tag</p>}
    </div>
  )
}
export default ProductHighlightsForm
