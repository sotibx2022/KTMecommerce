"use client"
import { useSearchParams } from 'next/navigation';
import React, { createContext, useState, ReactNode } from 'react';
export interface ISearchValues {
    categoryValue: string;
    subCategoryValue: string;
    priceOrder: "normal" | "increasing" | "decreasing";
    ratingOrder: "normal" | "increasing" | "decreasing";
    highlightedValues: "New Arrival" | "Offer Item" | "Top Sell" | "Trending Item" | "Regular" | "Select";
    pageNumber: number;
    layout: "grid" | "list";
    loading: boolean;
    keyword: string;
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
    keyword: "",
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
    const searchParams = useSearchParams()
    const [searchValues, setSearchValues] = useState<ISearchValues>({
        categoryValue: searchParams.get("category") ?? "category",
        subCategoryValue: searchParams.get("subCategory") ?? "subCategory",
        priceOrder: (searchParams.get("priceOrder") as "increasing" | "decreasing") ?? "normal",
        ratingOrder: (searchParams.get("ratingOrder") as "increasing" | "decreasing") ?? "normal",
        highlightedValues: searchParams.get("isNewArrival") ? "New Arrival" :
            searchParams.get("isTopSell") ? "Top Sell" :
                searchParams.get("isTrending") ? "Trending Item" :
                    searchParams.get("isOfferItem") ? "Offer Item" :
                        searchParams.get("isRegular") ? "Regular" : "Select",
        pageNumber: Number(searchParams.get("pageNumber")) || 1,
        layout: "grid",
        loading: false,
        keyword: searchParams.get("keyword") ?? "",
    });
    return (
        <SearchContext.Provider value={{ searchValues, setSearchValues }}>
            {children}
        </SearchContext.Provider>
    );
};
