import type { Metadata } from "next";
import "./../globals.css";
import DashboardLayout from "./DashboardLayout";
import DashboardSidebar from "./DashboardSidebar";
import { template } from "lodash";
export const metadata: Metadata = {
  title: {
    default: "Dashboard - EcommerceKTM",
    template: "%s | Dashboard - EcommerceKTM",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardLayout>
      <div className="dashboard flex gap-2 container my-4">
        <DashboardSidebar />
        {children}
      </div>
    </DashboardLayout>
  );
}
