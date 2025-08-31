"use client";
import { Suspense } from 'react';
import { DisplayComponents } from './context/DisplayComponents';
import { Toaster } from 'react-hot-toast';
import { UserDetailsContextComponent } from './context/UserDetailsContextComponent';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import LoadingComponent from './_components/loadingComponent/LoadingComponent';
import HomeContent from './_components/homeContent/HomeContent';
const HomePage = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={<LoadingComponent />} persistor={persistor}>
                <UserDetailsContextComponent>
                    <DisplayComponents>
                        <Suspense fallback={<LoadingComponent />}>
                        <HomeContent/>
                        </Suspense>
                    </DisplayComponents>
                    <Toaster />
                </UserDetailsContextComponent>
            </PersistGate>
        </Provider>
    )
};
export default HomePage;