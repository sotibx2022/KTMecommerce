"use client"
import React from 'react'
import PrimaryHeader from './PrimaryHeader'
import SearchBar from './SearchBar'
import SecondaryHeader from './SecondaryHeader'
import ResponsiveHeader from './responsiveHeader/ResponsiveHeader'
import MainPrimaryHeader from './MainPrimaryHeader'
const NavBar = () => {
  return (
    <nav>
      <MainPrimaryHeader/>
      {window.innerWidth>700 && <SearchBar/>}
      {window.innerWidth>700 && <SecondaryHeader />}
    </nav>
  )
}
export default NavBar