"use client";
import { Suspense } from 'react';
import { DisplayComponents } from './context/DisplayComponents';
import ClientPage from './_components/clientPage/ClientPage';
import { Toaster } from 'react-hot-toast';
import { UserDetailsContextComponent } from './context/UserDetailsContextComponent';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import LoadingComponent from './_components/loadingComponent/LoadingComponent';
const Page = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingComponent />} persistor={persistor}>
        <UserDetailsContextComponent>
          <DisplayComponents>
            <Suspense fallback={<LoadingComponent />}>
              <ClientPage />
            </Suspense>
          </DisplayComponents>
          <Toaster />
        </UserDetailsContextComponent>
      </PersistGate>
    </Provider>
  )
};
export default Page;
