"use client"
import React, { useState } from 'react'
import { Category } from '@/app/types/categories'
interface SearchBySubCategoryProps{
  category:Category|null,
  sendSubCategoryToParent:(value:Category|null)=>void;
}
const SearchBySubCategory:React.FC<SearchBySubCategoryProps> = ({category,sendSubCategoryToParent}) => {
  const [subcategory, setSubCategory] = useState("")
  const handleSelectChange=(e:React.ChangeEvent<HTMLSelectElement>)=>{
    const selectedSubCategory = e.target.value;
    const subCategoryObj = JSON.parse(selectedSubCategory);
    if(selectedSubCategory){
      setSubCategory(selectedSubCategory);
      sendSubCategoryToParent(subCategoryObj)
    }else{
setSubCategory("");
sendSubCategoryToParent(null)
    }
  }
  return (
    <div>
      <label  className="block text-primaryDark font-medium mb-2">Subcategory</label>
      <select disabled={!category} className="selectInput" value={subcategory} onChange={handleSelectChange}>
       <option>Select One</option>
       {category && category.subcategories && category.subcategories.length>0 && category.subcategories.map((category:Category,index)=>{
        return <option key={index} value={JSON.stringify(category)}>{category.category_name}</option>
       })}
      </select>
    </div>
  )
}
export default SearchBySubCategory