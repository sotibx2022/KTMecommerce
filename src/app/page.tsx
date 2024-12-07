import React from 'react'
import NavBar from './_components/navbar/Navbar'
import HeroLayout from './_components/heroLayout/HeroLayout'
import HomeProducts from './_components/homeProducts/HomeProducts'
const page = () => {
  return (
    <>
      <NavBar/>
      <HeroLayout/>
      <HomeProducts/>
    </>
  )
}
export default page