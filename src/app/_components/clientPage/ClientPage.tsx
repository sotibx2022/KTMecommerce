"use client"
import React, { useContext, } from 'react'
import NavBar from '../navbar/Navbar'
import HeroLayout from '../heroLayout/HeroLayout'
import Footer from '../footer/Footer'
import ResponsiveHeader from '../navbar/responsiveHeader/ResponsiveHeader'
import { DisplayContext } from '@/app/context/DisplayComponents'
import PureSearch from '../pureSearch/PureSearch'
import BookCarousel from '../brandCaurosel/BookCaurosel'
import CategoryCards from '../categoryCards/CategoryCards'
import AllProductsBanner from '../allProductsBanner/AllProductsBanner'
import LoginComponent from '../authComponent/LoginComponent'
import RegisterComponent from '../authComponent/RegisterComponent'
import ResetPasswordComponent from '../authComponent/ResetPasswordComponent'
const ClientPage = () => {
  const { visibleComponent } = useContext(DisplayContext)
  console.log(visibleComponent);
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
      {visibleComponent === 'resetPassword' && <ResetPasswordComponent />}
      {visibleComponent === 'pureSearch' && <PureSearch/>}
    </>
  )
}
export default ClientPage
