import "../../../app/globals.css";
import SingleProductLayout from "./SingleProductLayout";
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
          <SingleProductLayout>
            {children}
          </SingleProductLayout>
    );
  }
