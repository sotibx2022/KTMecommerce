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
import BookCarousel from '../brandCaurosel/BookCaurosel'
import CategoryCards from '../categoryCards/CategoryCards'
import AllProductsBanner from '../allProductsBanner/AllProductsBanner'
const ClientPage = () => {
  const { visibleComponent } = useContext(DisplayContext)
  return (
    <>
      <NavBar />
      <HeroLayout />
      <AllProductsBanner/>
    <CategoryCards 
      categoryType="isNewArrivals"
      title="New Arrivals in Store"
    />
    <CategoryCards 
      categoryType="isTrendingNow"
      title="Latest Tranding Items"
    />
    <CategoryCards 
      categoryType="isTopSell"
      title="Top Sells of Day"
    />
    <CategoryCards 
      categoryType="isOfferItem"
      title="Limited Offer Items"
    />
     <BookCarousel/>
      <Footer />
      {visibleComponent === 'responsiveHeader' && <ResponsiveHeader />}
      {visibleComponent === 'login' && <LoginComponent/>}
      {visibleComponent === 'register' && <RegisterComponent />}
      {visibleComponent === 'pureSearch' && <PureSearch/>}
    </>
  )
}
export default ClientPage
