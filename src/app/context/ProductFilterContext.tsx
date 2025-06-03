import React, { createContext, useState, ReactNode } from 'react';
// Define the shape of your context
interface FilterState {
  categoryText: string;
  subCategoryText: string;
  price: string;
  stock: string;
  highlights: string;
  rating: string;
  keyword: string;
}
interface ProductFilterContextType {
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
}
// Create context with default values (can be `null` if you handle nulls later)
export const ProductFilterContext = createContext<ProductFilterContextType | null>(null);
const ProductFilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterState, setFilterState] = useState<FilterState>({
    categoryText: 'Category',
    subCategoryText: 'Sub Category',
    price: 'normal',
    stock: 'normal',
    highlights: 'normal',
    rating: 'normal',
    keyword: 'Search Keywords...',
  });
  return (
    <ProductFilterContext.Provider value={{ filterState, setFilterState }}>
      {children}
    </ProductFilterContext.Provider>
  );
};
export default ProductFilterProvider;
