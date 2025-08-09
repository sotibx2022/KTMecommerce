"use client"
import { DisplayContext } from '@/app/context/DisplayComponents'
import React, { useContext } from 'react'
import ResponsiveHeader from '../navbar/responsiveHeader/ResponsiveHeader'
import LoginComponent from '../authComponent/LoginComponent'
import RegisterComponent from '../authComponent/RegisterComponent'
import PureSearch from '../pureSearch/PureSearch'
import LoadingComponent from '../loadingComponent/LoadingComponent'
import ResetPasswordComponent from '../authComponent/ResetPasswordComponent'
import AdvanceSearchMobile from '@/app/catalog/[searchValue]/AdvanceSearchMobile'
import TotalProducts from '@/app/admin/components/ecommerceSummary/TotalProducts'
import DeleteUser from '@/app/dashboard/settings/DashboardSettingComponents/DeleteUser'
import PublicWishlist from '@/app/dashboard/wishlist/PublicWishlist'
import AdminLogin from '../authComponent/AdminLogin'
import DeleteConfirmation from '../deleteConfirmation/DeleteConfirmation'
import ProductRecommendation from '../langchain/ProductRecommendation'
import RecommendationTrigger from '../langchain/RecommendationTrigger'
const ConditionalComponents = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
  return (
    <div>
      <div className="recommendationTrigger fixed top-1/2 left-0 -translate-y-1/2 z-50">
        <RecommendationTrigger/>
      </div>
      {visibleComponent === 'responsiveHeader' && <ResponsiveHeader />}
      {visibleComponent === 'login' && <LoginComponent />}
      {visibleComponent === 'register' && <RegisterComponent />}
      {visibleComponent === 'pureSearch' && <PureSearch />}
      {visibleComponent === 'loadingComponent' && <LoadingComponent />}
      {visibleComponent === 'resetPassword' && <ResetPasswordComponent />}
      {visibleComponent === 'advanceSearch' && <AdvanceSearchMobile />}
      {visibleComponent === 'productsSummary' && <TotalProducts />}
      {visibleComponent === 'deleteUser' && <DeleteUser />}
      {visibleComponent === 'publicWishlist' && <PublicWishlist />}
      {visibleComponent === 'adminLogin' && <AdminLogin />}
      {visibleComponent==='recommendation' && <ProductRecommendation/>}
    </div>
  )
}
export default ConditionalComponents