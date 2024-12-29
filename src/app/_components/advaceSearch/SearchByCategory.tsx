"use client"
import React, { useState } from 'react'
const SearchByCategory = () => {
  return (
    <div>
      <label className="block text-primaryDark font-medium mb-2">Category</label>
      <select className="selectInput">
        <option value="">Select One</option>
      </select>
    </div>
  );
}
export default SearchByCategory;
