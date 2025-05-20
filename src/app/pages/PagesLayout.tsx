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
import store from '../redux/store';
import { Provider } from 'react-redux';
import ConditionalComponents from '../_components/conditionalVisibleComponents/ConditionalComponents';
interface PagesLayoutProps {
  children: ReactNode;
}
const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
  const { visibleComponent } = useContext(DisplayContext) || {};
  return (
    <Provider store={store}>
    <UserDetailsContextComponent>
        <DisplayComponents>
          <NavBar />
          {children}
          <Toaster />
          <Footer />
          <ConditionalComponents/>
        </DisplayComponents>
    </UserDetailsContextComponent>
    </Provider>
  );
};
export default PagesLayout;
