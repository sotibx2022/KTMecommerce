import { Category } from '@/app/types/categories';
import React, { useState } from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
interface DropDownCategory {
    subCategory: Category[]; // Corrected to `Category[]` instead of `[Category]` for proper array typing.
}
const DropDownList: React.FC<DropDownCategory> = ({ subCategory }) => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    return (
        <div className='absolute top-[100%] left-0 shadow-helper p-4 bg-primaryLight z-10'  >
            {subCategory.map((subItem: Category, index: number) => (
                <div key={index} className='border-b-2 border-primaryDark border-dotted py-2' onMouseEnter={() => setActiveCategory(index)} // Set the current category as active
        onMouseLeave={() => setActiveCategory(null)}>
                    <LinkComponent href={subItem.url_slug} text={subItem.category_name}></LinkComponent>
                </div>
            ))}
        </div>
    );
};
export default DropDownList;
