import { Category } from '@/app/types/categories'
import React from 'react'
interface DropDownCategory{
    subCategory:[Category]
}
const SubDropDownList:React.FC<DropDownCategory> = ({subCategory}) => {
  return (
    <div>
    {subCategory.map((subItem: Category, index: number) => (
      <h1 key={index}>{subItem.category_name}</h1>
    ))}
  </div>
  )
}
export default SubDropDownList