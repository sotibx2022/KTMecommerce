"use client"
import PageHeader from '@/app/_components/pageHeader/PageHeader';
import { useCategories } from '@/app/hooks/queryHooks/useCategory'
import { ICategory, ISubcategory } from '@/models/categories.model';
import { Grid } from 'lucide-react';
import React, { useState } from 'react'
import CategoriesSkeleton from './CategoriesSkleton';
const page = () => {
  const [categoryNumber, setCategoryNumber] = useState<number | null>(null);
  const [subcategoryNumber, setSubcategoryNumber] = useState<number | null>(null)
  const { data: categories, isPending } = useCategories();
  function handleCategoryImage(categoryIndex: number | null, subCategoryIndex: number | null): void {
    setCategoryNumber(categoryIndex);
    setSubcategoryNumber(subCategoryIndex)
  }
  return (
    <div className='container'>
      <PageHeader
        headerText="All Categories"
        icon={Grid}
      />
      {isPending ? <CategoriesSkeleton /> : (categories && categories.map((category: ICategory, categoryIndex: number) => {
        return <div key={categoryIndex} className='mb-4'>
          <h1 className='primaryHeading'>{category.category_name}</h1>
          <h2 className='secondaryHeading mb-4'>{category.meta_description}</h2>
          <ul className="flex flex-col gap-4">
            {category.subcategories.map((subCat: ISubcategory, subCategoryIndex: number) => {
              return <li key={subCategoryIndex} className='flex justify-between items-center gap-4 p-4 shadow-helper cursor-pointer duration-300 hover:shadow-[var(--primaryDark)] ' onMouseEnter={() => handleCategoryImage(categoryIndex, subCategoryIndex)}
                onMouseLeave={() => handleCategoryImage(null, null)}>
                <div>
                  <h2 className='secondaryHeading'>{subCat.category_name}</h2>
                  <p className='primaryParagraph'>{subCat.meta_description}</p>
                </div>
                {categoryIndex === categoryNumber && subCategoryIndex === subcategoryNumber && < img src={subCat.image_url} alt={subCat.category_name} height={100} className='max-h-[100px]' />}
              </li>
            })}
          </ul>
        </div>
      }))}
    </div>
  )
}
export default page