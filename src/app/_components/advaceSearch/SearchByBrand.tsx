import React from 'react'
const SearchByBrand = () => {
  return (
    <div>
    <label  className="block text-primaryDark font-medium mb-2">Brand</label>
    <select id="category" name="category" className="w-full bg-primaryDark text-background p-2  rounded-lg  focus:outline-none focus:bg-primaryDark focus:text-background">
      <option value="" disabled selected>Select a brand</option>
      <option value="apple">Apple</option>
      <option value="samsung">Samsung</option>
      <option value="sony">Sony</option>
    </select>
  </div>
  )
}
export default SearchByBrand