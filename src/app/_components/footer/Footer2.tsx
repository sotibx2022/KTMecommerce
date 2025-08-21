"use client";
import React from 'react';
import Link from 'next/link';
import { Category, Subcategory } from '../../types/categories';
import FooterSkeleton from './FooterSkeleton';
import { useInitialCategories } from '@/app/data/categoriesData';
import LinkComponent from '../linkComponent/LinkComponent';
const Footer2 = () => {
    const { data: navigationItems, isPending, isError } = useInitialCategories();
    const navItems = navigationItems ? navigationItems.data : []
    if (isPending) {
        return <FooterSkeleton />
    }
    return (
        <div className="container border-t border-primaryLight">
            <ul className="categories flex flex-wrap justify-between gap-4 mt-4">
                {navItems && navItems.length > 0 && navItems.map((item: Category, index: number) => (
                    <li key={item.url_slug || index} className="flex flex-col p-4 w-full sm:w-auto bg-primaryGradient">
                        <div className="text-white text-lg border-b border-b-primaryLight mb-2 pb-2">
                            <LinkComponent href={`/catalog/advanceSearch?category=${item.category_name}`} text={item.category_name} />
                        </div>
                        <ul className="flex flex-wrap gap-2 mt-2 ">
                            {item.subcategories?.map((subItem: Subcategory, subIndex: number) => (
                                <li key={subItem.url_slug || subIndex} className="text-md px-2 rounded-sm bg-primaryLight hover:bg-helper">
                                    <Link
                                        className='text-white'
                                        href={`/catalog/advanceSearch?category=${item.category_name}&subcategory=${subItem.category_name}`}
                                    >
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
