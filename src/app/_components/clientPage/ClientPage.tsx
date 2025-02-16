"use client"
import React, { useContext, useEffect, useRef } from 'react'
import gsap from 'gsap'
import NavBar from '../navbar/Navbar'
import HeroLayout from '../heroLayout/HeroLayout'
import HomeProducts from '../homeProducts/HomeProducts'
import Footer from '../footer/Footer'
import ResponsiveHeader from '../navbar/responsiveHeader/ResponsiveHeader'
import LoginComponent from '../authComponent/LoginComponent'
import RegisterComponent from '../authComponent/RegisterComponent'
import { DisplayContext } from '@/app/context/DisplayComponents'
import AdvanceSearch from '../advaceSearch/AdvanceSearch'
import PureSearch from '../pureSearch/PureSearch'
import LimitedOffer from '../limitedOffer/LimitedOffer'
import FeaturedItems from '../featuredItems/FeaturedItems'
const ClientPage = () => {
  const { visibleComponent } = useContext(DisplayContext)
  return (
    <>
      <NavBar />
      <HeroLayout />
      <LimitedOffer/>
      <FeaturedItems/>
      <Footer />
      {visibleComponent === 'responsiveHeader' && <ResponsiveHeader />}
      {visibleComponent === 'login' && <LoginComponent/>}
      {visibleComponent === 'register' && <RegisterComponent />}
      {visibleComponent === 'pureSearch' && <PureSearch/>}
    </>
  )
}
export default ClientPage
