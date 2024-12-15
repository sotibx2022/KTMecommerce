import React from 'react'
const SearchBySubCategory = () => {
  return (
    <div>
      <label  className="block text-primaryDark font-medium mb-2">Subcategory</label>
      <select id="category" name="category" className="w-full bg-primaryDark text-background p-2  rounded-lg  focus:outline-none focus:bg-primaryDark focus:text-background">
        <option value="" disabled selected>Select a subcategory</option>
        <option value="mobile-phones">Mobile Phones</option>
        <option value="laptops">Laptops</option>
        <option value="clothing">Clothing</option>
      </select>
    </div>
  )
}
export default SearchBySubCategory