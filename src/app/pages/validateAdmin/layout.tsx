import type { Metadata } from "next";
import "../../../app/globals.css";
export const metadata: Metadata = {
    title:"Validate Admin",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>{children}</div>
    );
}
