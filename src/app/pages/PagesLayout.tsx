"use client";
import React, { ReactNode, useContext } from 'react';
import { DisplayComponents, DisplayContext } from '../context/DisplayComponents';
import { Toaster } from 'react-hot-toast';
import ResponsiveHeader from '../_components/navbar/responsiveHeader/ResponsiveHeader';
import LoginComponent from '../_components/authComponent/LoginComponent';
import RegisterComponent from '../_components/authComponent/RegisterComponent';
import NavBar from '../_components/navbar/Navbar';
import Footer from '../_components/footer/Footer';
import { UserDetailsContextComponent } from '../context/UserDetailsContextComponent';
import AdvanceSearchProvider from '../_components/advaceSearch/AdvanceSearchProvider';
import store from '../redux/store';
import { Provider } from 'react-redux';
interface PagesLayoutProps {
  children: ReactNode;
}
const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
  const { visibleComponent } = useContext(DisplayContext) || {};
  return (
    <Provider store={store}>
    <UserDetailsContextComponent>
      <AdvanceSearchProvider>
        <DisplayComponents>
          <NavBar />
          {children}
          <Toaster />
          <Footer />
          {visibleComponent === 'responsiveHeader' && <ResponsiveHeader />}
          {visibleComponent === 'login' && <LoginComponent />}
          {visibleComponent === 'register' && <RegisterComponent />}
        </DisplayComponents>
      </AdvanceSearchProvider>
    </UserDetailsContextComponent>
    </Provider>
  );
};
export default PagesLayout;
