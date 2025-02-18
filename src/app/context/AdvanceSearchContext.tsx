"use client"
import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Category } from '../types/categories';
interface AdvanceSearchValues {
  category: Category | null;
  subCategory: Category | null;
  minPrice: string ;
  maxPrice: string ;
  rating: string | undefined;
}
interface AdvanceSearchProps {
  advanceSearchValues: AdvanceSearchValues;
  setAdvanceSearchValues: Dispatch<SetStateAction<AdvanceSearchValues>>;
}
const AdvanceSearchContext = createContext<AdvanceSearchProps | undefined>(undefined);
const AdvanceSearchContextComponent: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [advanceSearchValues, setAdvanceSearchValues] = useState<AdvanceSearchValues>({
    category: null,
    subCategory: null,
    minPrice: "",
    maxPrice: "",
    rating: "",
  });
  return (
    <AdvanceSearchContext.Provider value={{ advanceSearchValues, setAdvanceSearchValues }}>
      {children}
    </AdvanceSearchContext.Provider>
  );
};
export default AdvanceSearchContextComponent;
export { AdvanceSearchContext };
