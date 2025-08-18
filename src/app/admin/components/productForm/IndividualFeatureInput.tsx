'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { IAddProductFormData } from '../products';
import SubmitError from '@/app/_components/submit/SubmitError';
import { validateSentence } from '@/app/services/helperFunctions/validatorFunctions';
import React, { useState } from 'react';
interface IndividualFeatureInputProps {
  index: number;
  onRemove?: (index: number) => void;
}
const IndividualFeatureInput: React.FC<IndividualFeatureInputProps> = ({
  index,
  onRemove,
}) => {
  const { register, watch, setValue, formState: { errors, touchedFields } } = useFormContext<IAddProductFormData>();
  const formValues = watch();
  const features = formValues.productFeatures || [];
  const featureValue = features[index] || '';
  const handleRemove = () => {
    if (onRemove) {
      onRemove(index);
    } else {
      const newFeatures = [...features];
      newFeatures.splice(index, 1);
      setValue('productFeatures', newFeatures, { shouldValidate: true });
    }
  };
  return (
    <div className="flex items-start gap-2">
      <div className='flex-1 flex flex-col gap-1'>
        <div className="flex gap-2">
          <Input
            placeholder={`Feature ${index + 1}`}
            className="flex-1"
            {...register(`productFeatures.${index}`, {
              validate: (value) => validateSentence("Feature Item", value, 20, 80)
            })}
          />
          <Button
            type="button"
            variant="failure"
            size="icon"
            onClick={handleRemove}
            disabled={index < 3} // First 3 features can't be removed
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
         {errors.productFeatures?.[index]?.message && (
              <SubmitError message={errors.productFeatures[index]?.message} />
            )}
      </div>
    </div>
  );
};
export default IndividualFeatureInput;