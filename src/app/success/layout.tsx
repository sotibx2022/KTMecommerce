import type { Metadata } from "next";
import "./../globals.css";
import PagesLayout from "../pages/PagesLayout";
export const metadata: Metadata = {
    title: "Payment Confirmation Status - KTMEcommerce"
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PagesLayout>
            {children}
        </PagesLayout>
    );
}
