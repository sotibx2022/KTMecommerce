import React from 'react';
interface ISubCategoriesSelectionProps {
  initialSubCategory: string;
}
const SubCategoriesSelection: React.FC<ISubCategoriesSelectionProps> = ({ 
  initialSubCategory 
}) => {
  return (
    <div>{initialSubCategory}</div>
  );
};
export default SubCategoriesSelection;