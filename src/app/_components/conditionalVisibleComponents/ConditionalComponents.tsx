"use client"
import { DisplayContext } from '@/app/context/DisplayComponents'
import React, { useContext, useEffect } from 'react'
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
import ProductRecommendation from '../langchain/ProductRecommendation'
const ConditionalComponents = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (visibleComponent !== '') {
        document.body.style.overflow = 'hidden'; // lock scroll
      } else {
        document.body.style.overflow = 'auto';   // unlock scroll
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'auto'; // always restore on unmount
      }
    };
  }, [visibleComponent]);
  return (
    <div>
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
      {visibleComponent === 'recommendation' && <ProductRecommendation />}
    </div>
  )
}
export default ConditionalComponents