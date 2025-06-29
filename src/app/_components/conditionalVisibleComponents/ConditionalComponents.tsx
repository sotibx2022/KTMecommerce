"use client"
import { DisplayContext } from '@/app/context/DisplayComponents'
import React, { useContext } from 'react'
import ResponsiveHeader from '../navbar/responsiveHeader/ResponsiveHeader'
import LoginComponent from '../authComponent/LoginComponent'
import RegisterComponent from '../authComponent/RegisterComponent'
import PureSearch from '../pureSearch/PureSearch'
import LoadingComponent from '../loadingComponent/LoadingComponent'
import ResetPasswordComponent from '../authComponent/ResetPasswordComponent'
import ProductImage from '../singleProduct/ProductImage'
import AddSingleProductReviews from '../singleProductReviews/AddSingleProductReviews'
import AdvanceSearchMobile from '@/app/catalog/[searchValue]/AdvanceSearchMobile'
import TotalProducts from '@/app/admin/components/ecommerceSummary/TotalProducts'
const ConditionalComponents = () => {
    const { visibleComponent,setVisibleComponent } = useContext(DisplayContext)
  return (
    <div>
        {visibleComponent === 'responsiveHeader' && <ResponsiveHeader />}
      {visibleComponent === 'login' && <LoginComponent/>}
      {visibleComponent === 'register' && <RegisterComponent />}
      {visibleComponent === 'pureSearch' && <PureSearch/>}
      {visibleComponent ==='loadingComponent' && <LoadingComponent/>}
      {visibleComponent ==='resetPassword' && <ResetPasswordComponent/>}
      {visibleComponent ==='advanceSearch' && <AdvanceSearchMobile/>}
      {visibleComponent ==='productsSummary' && <TotalProducts/>}
    </div>
  )
}
export default ConditionalComponents