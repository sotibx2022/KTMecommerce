"use client"
import React from 'react'
import SearchBar from './SearchBar'
import SecondaryHeader from './SecondaryHeader'
import MainPrimaryHeader from './MainPrimaryHeader'
const NavBar = () => {
  return (
    <nav>
      <MainPrimaryHeader/>
      <div className="hidden lg:block">
  <SearchBar />
  <SecondaryHeader />
</div>
    </nav>
  )
}
export default NavBar