import { Category } from '@/app/types/categories';
import React from 'react';
import SubDropDownList from './SubDropDownList';
interface DropDownCategory {
    subCategory: Category[]; // Corrected to `Category[]` instead of `[Category]` for proper array typing.
}
const DropDownList: React.FC<DropDownCategory> = ({ subCategory }) => {
    return (
        <div>
            {subCategory.map((subItem: Category, index: number) => (
                <div key={index}>
                    <h1>{subItem.category_name}</h1>
                    {subItem.subcategories && subItem.subcategories.length > 0 && (
                        <SubDropDownList subCategory={subItem.subcategories} />
                    )}
                </div>
            ))}
        </div>
    );
};
export default DropDownList;
