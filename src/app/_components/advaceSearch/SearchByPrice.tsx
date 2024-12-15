import React from 'react'
const SearchByPrice = () => {
  return (
    <div>
      <label className="block text-primaryDark font-medium mb-2">Price Range</label>
      <div className="flex space-x-4">
        <input type="number" id="min-price" name="min-price" placeholder="Min" className="w-1/2 border border-primaryDark 00 rounded-lg px-3 py-2 bg-primaryDark text-white focus:outline-none focus:ring-2 focus:helper placeholder:text-white" />
        <input type="number" id="max-price" name="max-price" placeholder="Max" className="w-1/2 border border-primaryDark rounded-lg px-3 py-2 bg-primaryDark text-white focus:outline-none focus:ring-2 focus:helper placeholder:text-white"/>
      </div>
    </div>
  )
}
export default SearchByPrice