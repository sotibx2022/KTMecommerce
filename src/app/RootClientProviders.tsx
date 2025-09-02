// RootClientProviders.tsx (client component)
"use client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Suspense } from "react";
import LoadingComponent from "./_components/loadingComponent/LoadingComponent";
import { AdvanceSearchProvider } from "./context/AdvanceSearchContext";
import { AdminDetailsContext } from "./context/AdminDetailsContext";
import QueryProvider from "./provider/queryProvider";
import { UserDetailsContextComponent } from "./context/UserDetailsContextComponent";
import { DisplayComponents } from "./context/DisplayComponents";
export default function RootClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
        <UserDetailsContextComponent>
            <DisplayComponents>
      <QueryProvider>
        <Suspense fallback={<LoadingComponent />}>
          <AdvanceSearchProvider>
            <AdminDetailsContext>{children}</AdminDetailsContext>
          </AdvanceSearchProvider>
        </Suspense>
      </QueryProvider>
      </DisplayComponents>
      </UserDetailsContextComponent>
    </Provider>
  );
}
