"use client"
import React, { useContext, } from 'react'
import NavBar from '../navbar/Navbar'
import HeroLayout from '../heroLayout/HeroLayout'
import Footer from '../footer/Footer'
import ResponsiveHeader from '../navbar/responsiveHeader/ResponsiveHeader'
import { DisplayContext } from '@/app/context/DisplayComponents'
import PureSearch from '../pureSearch/PureSearch'
import CategoryCards from '../categoryCards/CategoryCards'
import AllProductsBanner from '../allProductsBanner/AllProductsBanner'
import LoginComponent from '../authComponent/LoginComponent'
import RegisterComponent from '../authComponent/RegisterComponent'
import BrandCaurosel from '../brandCaurosel/BrandCaurosel'
import LoadingComponent from '../loadingComponent/LoadingComponent'
import ResetPasswordComponent from '../authComponent/ResetPasswordComponent'
const ClientPage = () => {
  const { visibleComponent,setVisibleComponent } = useContext(DisplayContext)
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
    <BrandCaurosel/>
      <Footer />
      {visibleComponent === 'responsiveHeader' && <ResponsiveHeader />}
      {visibleComponent === 'login' && <LoginComponent/>}
      {visibleComponent === 'register' && <RegisterComponent />}
      {visibleComponent === 'pureSearch' && <PureSearch/>}
      {visibleComponent ==='loadingComponent' && <LoadingComponent/>}
      {visibleComponent ==='resetPassword' && <ResetPasswordComponent/>}
    </>
  )
}
export default ClientPage
