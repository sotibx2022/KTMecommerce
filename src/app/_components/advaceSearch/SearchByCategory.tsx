import React from 'react'
const SearchByCategory = () => {
  return (
    <div>
    <label  className="block text-primaryDark font-medium mb-2">Category</label>
    <select id="category" name="category" className="w-full bg-primaryDark p-2 text-background rounded-lg  focus:outline-none focus:bg-primaryDark focus:text-background">
      <option value="" disabled selected>Select a category</option>
      <option value="electronics">Electronics</option>
      <option value="fashion">Fashion</option>
      <option value="home-appliances">Home Appliances</option>
    </select>
  </div>
  )
}
export default SearchByCategory