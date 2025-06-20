"use client"
import React, { createContext, useState, ReactNode } from 'react';
export interface ISearchValues {
    categoryValue: string;
    subCategoryValue: string;
    priceOrder: "normal" | "increasing" | "decreasing";
    ratingOrder: "normal" | "increasing" | "decreasing";
    highlightedValues: "New Arrival" | "Offer Item" | "Top Sell" | "Trending Item" | "Regular"|"Select";
    pageNumber: number;
    layout: "grid" | "list";
    loading: boolean;
    keyword:string;
}
export const defaultSearchValues: ISearchValues = {
    categoryValue: 'category',
    subCategoryValue: 'subCategory',
    priceOrder: "normal",
    ratingOrder: "normal",
    highlightedValues: "Select",
    pageNumber: 1,
    layout: "grid",
    loading: false,
    keyword:"",
};
const defaultContextValue: SearchFilterContextType = {
    searchValues: defaultSearchValues,
    setSearchValues: () => {
        throw new Error("setSearchValues called outside of SearchFilterProvider");
    }
};
interface SearchFilterContextType {
    searchValues: ISearchValues;
    setSearchValues: React.Dispatch<React.SetStateAction<ISearchValues>>;
}
export const SearchContext = createContext<SearchFilterContextType>(defaultContextValue);
export const AdvanceSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [searchValues, setSearchValues] = useState<ISearchValues>({
        categoryValue: 'category',
        subCategoryValue: 'subCategory',
        priceOrder: "normal",
        ratingOrder: "normal",
        highlightedValues: "Select",
        pageNumber: 1,
        layout: "grid",
        loading: false,
        keyword:""
    });
    return (
        <SearchContext.Provider value={{ searchValues, setSearchValues }}>
            {children}
        </SearchContext.Provider>
    );
};
