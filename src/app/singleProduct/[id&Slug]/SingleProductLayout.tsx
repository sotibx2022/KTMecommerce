"use client"
import ConditionalComponents from '@/app/_components/conditionalVisibleComponents/ConditionalComponents';
import Footer from '@/app/_components/footer/Footer';
import NavBar from '@/app/_components/navbar/Navbar';
import { DisplayComponents } from '@/app/context/DisplayComponents';
import { UserDetailsContextComponent } from '@/app/context/UserDetailsContextComponent';
import store from '@/app/redux/store';
import React, { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
interface SingleProductLayoutProps {
  children: ReactNode;
}
const SingleProductLayout: React.FC<SingleProductLayoutProps> = ({ children }) => {
  return (
    <DisplayComponents>
      <Provider store={store}>
        <UserDetailsContextComponent>
          <NavBar />
          {children}
          <Footer />
          <Toaster />
        </UserDetailsContextComponent>
      </Provider>
      <ConditionalComponents />
    </DisplayComponents>
  );
};
export default SingleProductLayout;