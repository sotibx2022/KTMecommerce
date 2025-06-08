'use client';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import React from 'react';
import { IAddProductFormData } from '../products';
import IndividualFeatureInput from './IndividualFeatureInput';
interface ProductFeaturesProps {
  action: "edit" | "add";
}
const ProductFeaturesForm: React.FC<ProductFeaturesProps> = ({ action }) => {
  const { watch, setValue } = useFormContext<IAddProductFormData>();
  const formValues = watch();
  // Initialize with 3 empty features if empty
  const features = formValues.productFeatures || Array(3).fill('');
  const addNewFeature = () => {
    const newFeatures = [...features, ''];
    setValue('productFeatures', newFeatures);
  };
  const removeFeature = (index: number) => {
    if (index < 3) return; // Prevent removing first 3 features
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setValue('productFeatures', newFeatures);
  };
  return (
    <div>
      <Label>Features</Label>
      <div className="space-y-2 mt-2">
        {features.map((_, index) => (
          <IndividualFeatureInput 
            key={index} 
            index={index}
            onRemove={removeFeature}
          />
        ))}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="success"
            size="icon"
            onClick={addNewFeature}
          >
            <Plus className="w-4 h-4" />
          </Button>
          <span className="text-muted-foreground text-sm">Add Feature</span>
        </div>
      </div>
    </div>
  );
};
export default ProductFeaturesForm;