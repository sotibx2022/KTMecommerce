import React from 'react'
import NavBar from './_components/navbar/Navbar'
import HeroLayout from './_components/heroLayout/HeroLayout'
import HomeProducts from './_components/homeProducts/HomeProducts'
import Footer from './_components/footer/Footer'
const page = () => {
  return (
    <>
      <NavBar/>
      <HeroLayout/>
      <HomeProducts/>
      <Footer/>
    </>
  )
}
export default page