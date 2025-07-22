"use client"
import AdminLogin from "@/app/_components/authComponent/AdminLogin";
import { Shield } from "lucide-react";
const Page = () => {
    return (
        <div className="min-h-screen bg-background container">
            <div className="text-center my-4 flex items-center gap-4 justify-center">
                <div className="mb-8">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                            <Shield className="w-10 h-10 text-primaryDark" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-helper rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-primaryDark rounded-full" />
                        </div>
                    </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                    <span className="block bg-gradient-to-r from-primaryDark to-helper bg-clip-text text-transparent">
                        Admin Panel
                    </span>
                </h1>
            </div>
            <div className="adminLogin w-full flex justify-center items-center">
                <AdminLogin />
            </div>
        </div>
    );
};
export default Page;
