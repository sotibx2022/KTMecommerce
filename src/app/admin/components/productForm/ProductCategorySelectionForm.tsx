// components/ProductCategorySelectionForm.tsx
import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
import SubmitError from '@/app/_components/submit/SubmitError'
import { useCategories } from '@/app/hooks/queryHooks/useCategory'
import { ISubCategoryData, useSubCategory } from '@/app/hooks/queryHooks/useSubCategory'
import { initialCategories } from '@/app/data/categoriesData'
import { Category } from '@/app/types/categories'
const ProductCategorySelectionForm = ({ action, productDatas }: { action: 'add' | 'edit', productDatas?: any }) => {
  const { data: navItems = initialCategories } = useCategories()
  const { register, setValue, watch, formState: { errors } } = useFormContext<IAddProductFormData>()
  const selectedCategory = watch('categoryName')
  const { data: subCategories } = useSubCategory(action === 'edit' ? productDatas?.category || "" : selectedCategory || "")
  return (
    <>
      <div>
        <Label htmlFor="categoryName">Category</Label>
        <Select {...register("categoryName", {
          required: { value: true, message: "You need to Select Category" }
        })}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {navItems.map((item: Category, index: number) => (
              <SelectItem value={item.category_name} key={index}>{item.category_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.categoryName?.message && <SubmitError message={errors.categoryName?.message} />}
      </div>
      <div>
        <Label htmlFor="subCategoryName">Subcategory</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select subcategory" />
          </SelectTrigger>
          <SelectContent>
            {subCategories?.success && subCategories.data?.subcategories.map((cat: ISubCategoryData, index: number) => (
              <SelectItem value={cat.category_name} key={index}>{cat.category_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}
export default ProductCategorySelectionForm
