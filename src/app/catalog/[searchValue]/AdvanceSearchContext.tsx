"use client"
import React, { createContext, useState, Dispatch } from 'react';
interface ISearchValues {
    categoryValue: string;
    subCategoryValue: string;
    priceOrder: "normal" | "increasing" | "decreasing";
    ratingOrder: "normal" | "increasing" | "decreasing";
    highlightedValues: "isNewArrival" | "isOfferItem" | "isTopSell" | "isTrendingNow" | "isRegular";
    pageNumber: number;
}
const initialSearchValues: ISearchValues = {
    categoryValue: 'category',
    subCategoryValue: 'subCategory',
    priceOrder: "normal",
    ratingOrder: "normal",
    highlightedValues: "isRegular",
    pageNumber: 1
};
interface ISearchContext {
    searchValues: ISearchValues;
    setSearchValues: Dispatch<React.SetStateAction<ISearchValues>>;
}
interface AdvanceSearchContextProps {
    children: React.ReactNode;
}
export const SearchContext = createContext<ISearchContext>({
    searchValues: initialSearchValues,
    setSearchValues: () => {}
});
const AdvanceSearchContext: React.FC<AdvanceSearchContextProps> = ({ children }) => {
    const [searchValues, setSearchValues] = useState<ISearchValues>(initialSearchValues);
    return (
        <SearchContext.Provider value={{ searchValues, setSearchValues }}>
            {children}
        </SearchContext.Provider>
    );
};
export default AdvanceSearchContext;