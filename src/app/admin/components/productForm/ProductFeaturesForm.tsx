'use client';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import React from 'react';
import SubmitError from '@/app/_components/submit/SubmitError';
interface productFeaturesProps{
  action:"edit" |"add"
}
const ProductFeaturesForm:React.FC<productFeaturesProps> = ({action}) => {
  const { watch, setValue } = useFormContext();
const formValues = watch();
  const handleFeatureChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const features = [...(formValues.productFeatures || [])];
    features[index] = newValue;
    setValue('productFeatures', features);
  };
  const addNewFeature = () => {
    const features = [...(formValues.productFeatures || [])];
    features.push('');
    setValue('productFeatures', features);
  };
  const removeFeature = (index: number) => {
    const features = [...(formValues.productFeatures || [])];
    features.splice(index, 1);
    setValue('productFeatures', features.length ? features : undefined);
  };
  return (
    <div>
      <Label>Features</Label>
      <div className="space-y-2 mt-2">
        {formValues?.productFeatures?.length ? (
          formValues.productFeatures.map((feature: string, index: number) => (
            <div key={index} className="flex items-start gap-2">
              <div className='flex-1 flex flex-col gap-1'>
                <div className="flex gap-2">
                  <Input
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e)}
                  />
                  <Button
                    type="button"
                    variant="failure"
                    size="icon"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {!feature?.trim() && (
                  <SubmitError message="The Product Feature cannot be Empty." />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-start gap-2">
            <div className='flex-1 flex flex-col gap-1'>
              <div className="flex gap-2">
                <Input
                  placeholder="Feature"
                  className="flex-1"
                  onChange={(e) => {
                    setValue('productFeatures', [e.target.value]);
                  }}
                />
                <Button
                  type="button"
                  variant="failure"
                  size="icon"
                  disabled
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {(!formValues?.productFeatures?.[0]?.trim()) && (
                <SubmitError message="The Product Feature cannot be Empty." />
              )}
            </div>
          </div>
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