"use client"
import PageHeader from '@/app/_components/pageHeader/PageHeader';
import { useCategories } from '@/app/hooks/queryHooks/useCategory'
import { ICategory, ISubcategory } from '@/models/categories.model';
import { Grid } from 'lucide-react';
import React, { useState } from 'react'
import CategoriesSkeleton from './CategoriesSkleton';
import { motion, AnimatePresence } from 'framer-motion';
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
                <div className="mb-6 border-b border-backgroundLight pb-4">
                  <h1 className='text-2xl font-semibold text-primaryDark'>{category.category_name}</h1>
                  <p className='text-primaryDark mt-2'>{category.meta_description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.subcategories.map((subCat: ISubcategory, subcategoryIndex: number) => {
                    const isActive = activeSubcategory.categoryIndex === categoryIndex && 
                                    activeSubcategory.subcategoryIndex === subcategoryIndex;
                    return (
                      <motion.div 
                        key={subcategoryIndex}
                        className="bg-background rounded-lg overflow-hidden shadow-primaryLight hover:shadow-helper cursor-pointer"
                        onMouseEnter={() => handleCategoryHover(categoryIndex, subcategoryIndex)}
                        onMouseLeave={handleCategoryLeave}
                        initial={false}
                        animate={{ 
                          height: isActive ? 'auto' : 'auto'
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-5">
                          <h2 className='text-lg font-medium text-primaryDark mb-2'>{subCat.category_name}</h2>
                          <p className='text-primaryDark text-sm'>{subCat.meta_description}</p>
                        </div>
                        <AnimatePresence>
                          {isActive && subCat.image_url && (
                            <motion.div 
                              className="px-5 pb-5"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ 
                                opacity: 1, 
                                height: 'auto',
                                transition: { duration: 0.3 }
                              }}
                              exit={{ 
                                opacity: 0, 
                                height: 0,
                                transition: { duration: 0.3 }
                              }}
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ 
                                  scale: 1,
                                  transition: { 
                                    delay: 0.1, 
                                    duration: 0.3,
                                    ease: "easeOut"
                                  }
                                }}
                                exit={{ 
                                  scale: 0,
                                  transition: { duration: 0.2 }
                                }}
                                className="rounded-md overflow-hidden"
                              >
                                <img 
                                  src={subCat.image_url} 
                                  alt={subCat.category_name} 
                                  className="w-full h-48 object-cover"
                                />
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
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