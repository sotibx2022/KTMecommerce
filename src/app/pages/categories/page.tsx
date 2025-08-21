"use client"
import PageHeader from '@/app/_components/pageHeader/PageHeader';
import { useCategories } from '@/app/hooks/queryHooks/useCategory'
import { ICategory, ISubcategory } from '@/models/categories.model';
import { Grid } from 'lucide-react';
import React, { useState } from 'react'
import CategoriesSkeleton from './CategoriesSkleton';
const Page = () => {
  const [activeSubcategory, setActiveSubcategory] = useState<{categoryIndex: number | null, subcategoryIndex: number | null}>({
    categoryIndex: null,
    subcategoryIndex: null
  });
  const { data: categories, isPending } = useCategories();
  function handleCategoryHover(categoryIndex: number, subcategoryIndex: number): void {
    setActiveSubcategory({ categoryIndex, subcategoryIndex });
  }
  function handleCategoryLeave(): void {
    setActiveSubcategory({ categoryIndex: null, subcategoryIndex: null });
  }
  return (
    <div className='container mx-auto px-4 py-8'>
      <PageHeader
        headerText="All Categories"
        icon={Grid}
      />
      {isPending ? (
        <CategoriesSkeleton />
      ) : (
        <div className="space-y-12 mt-8">
          {categories && categories.map((category: ICategory, categoryIndex: number) => {
            return (
              <section key={categoryIndex} className='mb-12'>
                <div className="mb-6 border-b border-gray-100 pb-4">
                  <h1 className='text-2xl font-semibold text-gray-800'>{category.category_name}</h1>
                  <p className='text-gray-600 mt-2'>{category.meta_description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.subcategories.map((subCat: ISubcategory, subcategoryIndex: number) => {
                    const isActive = activeSubcategory.categoryIndex === categoryIndex && 
                                    activeSubcategory.subcategoryIndex === subcategoryIndex;
                    return (
                      <div 
                        key={subcategoryIndex}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        onMouseEnter={() => handleCategoryHover(categoryIndex, subcategoryIndex)}
                        onMouseLeave={handleCategoryLeave}
                      >
                        <div className="p-5">
                          <h2 className='text-lg font-medium text-gray-800 mb-2'>{subCat.category_name}</h2>
                          <p className='text-gray-600 text-sm'>{subCat.meta_description}</p>
                        </div>
                        {isActive && subCat.image_url && (
                          <div className="px-5 pb-5">
                            <div className="rounded-md overflow-hidden">
                              <img 
                                src={subCat.image_url} 
                                alt={subCat.category_name} 
                                className="w-full h-48 object-cover transition-opacity duration-300"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default Page;