"use client"
import { getAllCategories } from '@/app/services/queryFunctions/categoreis'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import LoadingComponent from '../loadingComponent/LoadingComponent'
import { Category } from '@/models/categories.model'
interface SearchByCategoryProps {
  sendCategoryToParent: (value: Category | null) => void;  // Corrected type to expect null when no category is selected
}
const SearchByCategory: React.FC<SearchByCategoryProps> = ({ sendCategoryToParent }) => {
  const [category, setCategory] = useState<string>("");  // Still using string to hold serialized object
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['categoreis'],
    queryFn: getAllCategories
  });
  const handleSelectInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      const categoryObj = JSON.parse(selectedCategory);  // Parse the string back into an object
      setCategory(selectedCategory);  // Store the serialized object
      sendCategoryToParent(categoryObj);  // Send the full object to parent
    } else {
      setCategory("");  // Reset the category if nothing is selected
      sendCategoryToParent(null);  // Correctly send null when no category is selected
    }
  }
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <div>
      <label className="block text-primaryDark font-medium mb-2">Category</label>
      <select
        className="selectInput"
        value={category}
        onChange={handleSelectInput}
      >
        <option value="">Select One</option>
        {categories.map((category: Category) => {
          return (
            <option
              value={JSON.stringify(category)}  // Serialize the category object to string
              key={category._id}
            >
              {category.category_name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
export default SearchByCategory;
