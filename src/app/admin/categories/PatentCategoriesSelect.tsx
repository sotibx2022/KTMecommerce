import { useCategories } from '@/app/hooks/queryHooks/useCategory';
import { Category } from '@/app/types/categories'
import React, { useState } from 'react'
interface categoryValueforParent {
    categorytoSelect: (value: string) => void;
}
const PatentCategoriesSelect: React.FC<categoryValueforParent> = ({ categorytoSelect }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("Select Category")
    const { data: navItems, isPending: categoriesPending } = useCategories();
    function confirmCategorySelection(categoryValue: string): void {
        setSelectedCategory(categoryValue)
        categorytoSelect(categoryValue)
    }
    return (
        <div className="absolute top-0 left-0 z-50">
            <ul className=" bg-white rounded-md shadow-primaryDark py-1 border">
                {navItems.map((item: Category, index: number) => (
                    <li key={index} className="w-full text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
                        onClick={(() => confirmCategorySelection(item.category_name))}>
                        {item.category_name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default PatentCategoriesSelect