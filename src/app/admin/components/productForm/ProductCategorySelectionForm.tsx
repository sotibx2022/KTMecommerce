import { Label } from '@/components/ui/label'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { useFormContext } from 'react-hook-form'
import { IAddProductFormData } from '../products'
import SubmitError from '@/app/_components/submit/SubmitError'
import { useCategories } from '@/app/hooks/queryHooks/useCategory'
import { ISubCategoryData, useSubCategory } from '@/app/hooks/queryHooks/useSubCategory'
import { initialCategories } from '@/app/data/categoriesData'
import { Category } from '@/app/types/categories'
import { useEffect } from 'react'
const ProductCategorySelectionForm = ({ action, productDatas }: { action: 'add' | 'edit', productDatas?: any }) => {
  const { data: navItems = initialCategories, isPending: categoryLoading } = useCategories()
  const { register, setValue, watch, formState: { errors } } = useFormContext<IAddProductFormData>()
  const formValues = watch()
  const { data: subCategories, isPending: subCategoriesLoading } = useSubCategory(formValues.categoryName)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Category Select */}
      <div>
        <Label htmlFor="categoryName">Category</Label>
        <Select 
        {...register("categoryName",{
          required:"Category is Required"
        })}
        onValueChange={(value)=>setValue('categoryName',value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={categoryLoading ? "Loading..." : "Select category"} />
          </SelectTrigger>
          <SelectContent>
            {navItems.map((item: Category) => (
              <SelectItem value={item.category_name} key={item.url_slug}>
                {item.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.categoryName?.message && <SubmitError message={errors.categoryName.message} />}
      </div>
      {/* Subcategory Select */}
      <div>
        <Label htmlFor="subCategoryName">Subcategory</Label>
        <Select
        {...register("subCategoryName",{
          required:"Sub Category is Required"
        })}
        onValueChange={(value)=>setValue('subCategoryName',value)}
          disabled={!formValues.categoryName || subCategoriesLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder={
              !formValues.categoryName ? "Select category first" :
              (subCategoriesLoading ? "Loading..." : "Select subcategory")
            } />
          </SelectTrigger>
          <SelectContent>
            {subCategories?.success && subCategories.data?.subcategories.map((cat: ISubCategoryData) => (
              <SelectItem value={cat.category_name} key={cat.category_name}>
                {cat.category_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors?.subCategoryName?.message && <SubmitError message={errors.subCategoryName.message} />}
      </div>
    </div>
  )
}
export default ProductCategorySelectionForm