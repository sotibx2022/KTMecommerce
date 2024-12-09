import React from 'react'
import NavBar from './_components/navbar/Navbar'
import HeroLayout from './_components/heroLayout/HeroLayout'
import HomeProducts from './_components/homeProducts/HomeProducts'
import Footer from './_components/footer/Footer'
import ResponsiveHeader from './_components/navbar/responsiveHeader/ResponsiveHeader'
import LoginComponent from './_components/authComponent/LoginComponent'
import RegisterComponent from './_components/authComponent/RegisterComponent'
const page = () => {
  return (
    <>
      <NavBar/>
      <HeroLayout/>
      <HomeProducts/>
      <Footer/>
      <ResponsiveHeader/> 
      <LoginComponent/>
      <RegisterComponent/>
    </>
  )
}
export default page