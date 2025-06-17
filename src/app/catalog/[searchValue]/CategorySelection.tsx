import React from 'react'
interface ICategorySelectionProps{
    intialCategory:string
}
 const CategorySelection:React.FC<ICategorySelectionProps> = ({intialCategory}) => {
  return (
    <div>{intialCategory}</div>
  )
}
export default CategorySelection;
