"use client"
import React, { useState } from 'react'
import { faArrowRight, faBars, faHeart, faMinus, faPlus, faSearch, faShoppingCart, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import { Category } from '@/models/categories.model';
import LinkComponent from '../../linkComponent/LinkComponent';
import Link from 'next/link';
const ResponsiveHeader = () => {
    const { data: NavItems = [] } = useQuery({ queryKey: ['categories'], queryFn: getAllCategories });
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const toggleCategory = (index: number) => {
        setActiveCategory(prevState => (prevState === index ? null : index)); // Toggle the active category
    }
    return (
        <div className='absolute top-0 left-0 w-full h-full bg-primaryDark flex'>
            <div className="responsiveleftBar flex-1 justify-center items-center">
            </div>
            <div className="responsiveSidebar w-[400px] h-full bg-background p-4">
                <div className="responsiveLogoArea  justify-self-center">
                <Link href="/">
      <img src='../assets/brand/logo.png' className='w-auto h-[50px] min-w-[150px]'/>
      </Link>
                </div>
                <div className="responsiveIcons flex justify-between items-center p-4 border-b-2 border-solid border-primaryDark">
                    <FontAwesomeIcon icon={faTimes} className='responsiveHeaderIcon' />
                    <FontAwesomeIcon icon={faSearch} className='responsiveHeaderIcon' />
                    <FontAwesomeIcon icon={faHeart} className='responsiveHeaderIcon' />
                    <FontAwesomeIcon icon={faShoppingCart} className='responsiveHeaderIcon' />
                </div>
                <ul className="categories flex flex-col gap-4 mt-4">
                    {NavItems.map((item: Category, index: number) => (
                        <li key={item.url_slug || index}>
                            <div className="categoryHeader flex justify-between items-center text-xl text-primaryDark shadow-helper p-2">
                                <LinkComponent href={item.url_slug} text={item.category_name} />
                                <FontAwesomeIcon
                                    icon={index === activeCategory ? faMinus : faPlus}
                                    onClick={() => toggleCategory(index)} 
                                    className='bg-helper p-4 rounded-full cursor-pointer text-background'
                                />
                            </div>
                            {/* Check if there are subcategories */}
                            {item.subcategories && item.subcategories.length > 0 && index === activeCategory && (
                                <ul className='ml-8 flex flex-col gap-4 pt-2'>
                                    {item.subcategories.map((subItem: Category, subIndex: number) => (
                                        <li key={subItem.url_slug || subIndex} className='text-xl text-primaryDark'>
                                            <LinkComponent href={subItem.url_slug} text={subItem.category_name} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
export default ResponsiveHeader;
