"use client"
import AdminLogin from "@/app/_components/authComponent/AdminLogin";
import PageHeader from "@/app/_components/pageHeader/PageHeader";
import { Shield } from "lucide-react";
const Page = () => {
    return (
        <div className="min-h-screen bg-background container">
            <PageHeader
                icon={Shield}
                headerText="Admin Panel"
                headerTagline="Manage products, orders, users, and settings with full control and security."
            />
            <div className="adminLogin w-full flex justify-center items-center">
                <AdminLogin />
            </div>
        </div>
    );
};
export default Page;
