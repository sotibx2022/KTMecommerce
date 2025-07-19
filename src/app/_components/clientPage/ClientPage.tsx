"use client"
import React from 'react'
import NavBar from '../navbar/Navbar'
import HeroLayout from '../heroLayout/HeroLayout'
import Footer from '../footer/Footer'
import CategoryCards from '../categoryCards/CategoryCards'
import AllProductsBanner from '../allProductsBanner/AllProductsBanner'
import BrandCaurosel from '../brandCaurosel/BrandCaurosel'
import ConditionalComponents from '../conditionalVisibleComponents/ConditionalComponents'
const ClientPage = () => {
  return (
    <>
      <NavBar />
      <HeroLayout />
      <AllProductsBanner />
      <CategoryCards
        categoryType="isNewArrival"
        title="New Arrivals in Store"
      />
      <CategoryCards
        categoryType="isTrendingNow"
        title="Latest Trending Items"
      />
      <CategoryCards
        categoryType="isTopSell"
        title="Top Sells of Day"
      />
      <CategoryCards
        categoryType="isOfferItem"
        title="Limited Offer Items"
      />
      <BrandCaurosel />
      <ConditionalComponents />
      <Footer />
    </>
  )
}
export default ClientPage