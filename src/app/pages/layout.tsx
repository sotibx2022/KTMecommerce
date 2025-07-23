import type { Metadata } from "next";
import "./../globals.css";
import PagesLayout from "./PagesLayout";
export const metadata: Metadata = {
  title:{
    default:"Page | ECommerce-KTM",
    template:"%s | Ecommerce-KTM"
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <PagesLayout>{children}</PagesLayout>
  );
}
