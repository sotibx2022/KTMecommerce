// components/ProductFeaturesForm.tsx
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const ProductFeaturesForm = () => {
  return (
    <div>
      <Label>Features</Label>
      <div className="space-y-2 mt-2">
        <div className="flex items-center gap-2">
          <Input placeholder="Feature 1" className="flex-1" />
          <Button type="button" variant="outline" size="sm">Remove</Button>
        </div>
        <Button type="button" variant="outline" size="sm" className="mt-2">Add Feature</Button>
      </div>
    </div>
  )
}
export default ProductFeaturesForm
