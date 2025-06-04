"use client"
import React, { createContext, useState, ReactNode } from 'react';
// Define the shape of your context
export interface FilterState {
  categoryText: string;
  subCategoryText: string;
  price: "Price" | "ascending" | "descending";
  stock: "Stock" | "Yes" | "No";
  highlights: string;
  rating: "Rating" | "ascending" | "descending";
  keyword: string;
  page:number;
  loading:boolean,
}
export const defaultFilterState: FilterState = {
  categoryText: 'Category',
  subCategoryText: 'Type',
  price: 'Price',
  stock: 'Stock',
  highlights: 'HighLights',
  rating: 'Rating',
  keyword: 'Search Keywords...',
  page:1,
  loading:true,
};
const defaultContextValue: ProductFilterContextType = {
  filterState: defaultFilterState,
  setFilterState: () => {
    throw new Error("setFilterState called outside of ProductFilterProvider");
  }
};
interface ProductFilterContextType {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}
export const ProductFilterContext = createContext<ProductFilterContextType>(defaultContextValue);
const ProductFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterState, setFilterState] = useState<FilterState>({
    categoryText: 'Category',
    subCategoryText: 'Type',
    price: 'Price',
    stock: 'Stock',
    highlights: 'HighLights',
    rating: 'Rating',
    keyword: 'Search Keywords...',
    page:1,
    loading:true,
  });
  return (
    <ProductFilterContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </ProductFilterContext.Provider>
  );
};
export default ProductFilterProvider;
