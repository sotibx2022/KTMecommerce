import React from 'react'
import PrimaryHeader from './PrimaryHeader'
import SearchBar from './SearchBar'
import SecondaryHeader from './SecondaryHeader'
const NavBar = () => {
  return (
    <nav>
      <PrimaryHeader/>
      <SearchBar/>
      <SecondaryHeader />
    </nav>
  )
}
export default NavBar