"use client"
import React, { useState } from 'react'
import AdvanceSearch from './AdvanceSearch'
import CatalogPageLayout from './CatalogPageLayout'
import ProductsLayout from './ProductsLayout'
const page = () => {
  const [layout, setLayout] = useState("grid");
  const getLayoutValue = (value: string) => {
    setLayout(value);
  }
  return (
    <div>
      <CatalogPageLayout>
          <AdvanceSearch />
      </CatalogPageLayout>
    </div>
  )
}
export default page