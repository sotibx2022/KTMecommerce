"use client";
import React, { useState } from 'react';
import CategoryTable from './CategoryTable';
import SubCategoryTable from './SubCategoryTable';
const Page = () => {
  const [showCategoryTable, setShowCategoryTable] = useState(true);
  return (
    <div>
      <span onClick={() => setShowCategoryTable(true)}>Categories</span>
      <span onClick={() => setShowCategoryTable(false)}>Subcategories</span>
      {showCategoryTable ? <CategoryTable /> : <SubCategoryTable />}
    </div>
  );
};
export default Page;
