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
import {persistor, store} from '../redux/store';
import { Provider } from 'react-redux';
import ConditionalComponents from '../_components/conditionalVisibleComponents/ConditionalComponents';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingComponent from '../_components/loadingComponent/LoadingComponent';
interface PagesLayoutProps {
  children: ReactNode;
}
const PagesLayout: React.FC<PagesLayoutProps> = ({ children }) => {
  const { visibleComponent } = useContext(DisplayContext) || {};
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
    <UserDetailsContextComponent>
        <DisplayComponents>
          <NavBar />
          {children}
          <Toaster />
          <Footer />
          <ConditionalComponents/>
        </DisplayComponents>
    </UserDetailsContextComponent>
    </PersistGate>
    </Provider>
  );
};
export default PagesLayout;
