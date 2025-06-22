"use client";
import React from 'react';
import Link from 'next/link';
import {Category, Subcategory} from '../../types/categories';
import { useCategories } from '@/app/hooks/queryHooks/useCategory';
import FooterSkeleton from './FooterSkeleton';
const Footer2 = () => {
    const { data: navItems,isPending } = useCategories();
    if(isPending){
      return <FooterSkeleton/>
    }
    return (
        <div className="container border-t border-primaryLight">
            <ul className="categories flex flex-wrap justify-between gap-4 mt-4">
                {navItems && navItems.length>0 && navItems.map((item: Category, index: number) => (
                    <li key={item.url_slug || index} className="flex flex-col">
                        <div className="categoryHeader flex justify-between items-center text-xl text-primaryDark">
                            <Link className='text-white' 
                                href={`/catalog/advanceSearch?category=${item.category_name}`}>
                                {item.category_name}
                            </Link>
                        </div>
                        <ul className="flex flex-col gap-2 pt-1">
                            {item.subcategories?.map((subItem: Subcategory, subIndex: number) => (
                                <li key={subItem.url_slug || subIndex} className="text-md">
                                    <Link className='text-white'
                                        href={`/catalog/advanceSearch?category=${item.category_name}&subcategory=${subItem.category_name}`}>
                                        {subItem.category_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Footer2;