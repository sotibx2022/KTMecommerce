'use client';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import React, { useEffect } from 'react';
import { IAddProductFormData } from '../products';
import IndividualFeatureInput from './IndividualFeatureInput';
interface ProductFeaturesProps {
  action: "edit" | "add";
}
const ProductFeaturesForm: React.FC<ProductFeaturesProps> = ({ action }) => {
  const { watch, setValue,setError } = useFormContext<IAddProductFormData>();
  const formValues = watch();
  const features = formValues.productFeatures || Array(3).fill('');
  const addNewFeature = () => {
    const newFeatures = [...features, ''];
    setValue('productFeatures', newFeatures);
  };
  useEffect(()=>{},[formValues.productFeatures])
  return (
    <div>
      <Label>Features</Label>
      <div className="space-y-2 mt-2">
        {features.length > 0 ? (
          features.map((_, index) => (
            <IndividualFeatureInput key={index} index={index} />
          ))
        ) : (
          Array.from({ length: 3 }).map((_, index) => (
            <IndividualFeatureInput key={index} index={index} />
          ))
        )}
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