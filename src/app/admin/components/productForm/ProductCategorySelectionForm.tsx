import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
import SubmitError from '@/app/_components/submit/SubmitError'
import { useCategories } from '@/app/hooks/queryHooks/useCategory'
import { ISubCategoryData, useSubCategory } from '@/app/hooks/queryHooks/useSubCategory'
import { useEffect, useState } from 'react'
const ProductCategorySelectionForm = ({ action, productDatas }: { action: 'add' | 'edit', productDatas?: any }) => {
  const { data: initialCategories, isPending: categoryLoading } = useCategories()
  const { register, setValue, watch, formState: { errors } } = useFormContext<IAddProductFormData>()
  const formValues = watch();
  const { data: subCategories, isPending: subCategoriesLoading } = useSubCategory(formValues.categoryName)
  // ✅ Hydration-safe mount flag
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Category Select */}
      <div>
        <label className='formLabel'>Category</label>
        <Select
          {...register("categoryName", {
            required: "Category is Required"
          })}
          onValueChange={(value) => setValue('categoryName', value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                !isMounted
                  ? "Select Category"
                  : categoryLoading
                    ? "Loading..."
                    : formValues.categoryName ?? "Select Category"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {initialCategories && initialCategories.map((item: { category_name: string }, index: number) => (
              <SelectItem value={item.category_name} key={index}>
                {item.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryName?.message && <SubmitError message={errors.categoryName.message} />}
      </div>
      {/* Subcategory Select */}
      <div>
        <label className='formLabel'>Sub Category</label>
        <Select
          {...register("subCategoryName", {
            required: "Sub Category is Required"
          })}
          onValueChange={(value) => setValue('subCategoryName', value, { shouldValidate: true })}
          disabled={!formValues.categoryName || subCategoriesLoading}
        >
          <SelectTrigger>
            <SelectValue
              placeholder={
                !isMounted
                  ? "Select SubCategory"
                  : !formValues.categoryName
                    ? "Select category first"
                    : subCategoriesLoading
                      ? "Loading..."
                      : formValues.subCategoryName ?? "Select SubCategory"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {subCategories?.success && subCategories.data?.subcategories.map((cat: ISubCategoryData) => (
              <SelectItem value={cat.category_name} key={cat.category_name}>
                {cat.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.subCategoryName?.message && <SubmitError message={errors.subCategoryName.message} />}
      </div>
    </div>
  )
}
export default ProductCategorySelectionForm
