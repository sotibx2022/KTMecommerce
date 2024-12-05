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
      <SearchBar/>
      <SecondaryHeader />
      {/* <ResponsiveHeader/> */}
    </nav>
  )
}
export default NavBar