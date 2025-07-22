"use client"
import PrimaryButton from "@/app/_components/primaryButton/PrimaryButton";
import { DisplayContext } from "@/app/context/DisplayComponents";
import { Card } from "@/components/ui/card";
import {
    Package,
    SlidersHorizontal,
    FileText,
    UserCog,
    Bell,
    StickyNote,
    ShoppingCart,
    Heart,
    Boxes,
    ListTree,
    LogIn,
    Shield
} from "lucide-react";
import { useContext } from "react";
const Page = () => {
    const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
    const crudFeatures = [
        { name: "Products", icon: Package, description: "Manage inventory" },
        { name: "Sliders", icon: SlidersHorizontal, description: "Homepage banners" },
        { name: "Blogs", icon: FileText, description: "Content creation" },
        { name: "Users", icon: UserCog, description: "User management" }
    ];
    const systemFeatures = [
        { name: "Notifications", icon: Bell, description: "System alerts" },
        { name: "Remarks", icon: StickyNote, description: "Notes & feedback" },
        { name: "Orders", icon: ShoppingCart, description: "Order tracking" },
        { name: "Carts", icon: ShoppingCart, description: "Shopping carts" },
        { name: "Wishlists", icon: Heart, description: "User favorites" },
        { name: "Categories", icon: Boxes, description: "Product categories" },
        { name: "Subcategories", icon: ListTree, description: "Category structure" }
    ];
    return (
        <div className="min-h-screen bg-background container">
            <div className="text-center my-4 flex items-center gap-4 justify-center">
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                            <Shield className="w-10 h-10 text-primaryDark" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-helper rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-primaryDark rounded-full" />
                        </div>
                    </div>
                </div>
                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                    <span className="block bg-gradient-to-r from-primaryDark to-helper bg-clip-text text-transparent">
                        Admin Panel
                    </span>
                </h1>
            </div>
            <div className="ctaButton text-center">
                <PrimaryButton searchText="Admin Login" onClick={() => setVisibleComponent('adminLogin')} />
            </div>
            {/* Features Grid */}
            <div className="max-w-6xl mx-auto">
                {/* CRUD Features Section */}
                <div className="mb-16">
                    <h2 className="subHeading">
                        Core Management
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {crudFeatures.map((feature) => (
                            <Card
                                key={feature.name}
                                className="p-4 text-center hover:shadow-primaryLight transition-all duration-300 bg-background"
                            >
                                <div className="w-16 h-16  rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-8 h-8 text-primaryDark" />
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-primaryDark">{feature.name}</h3>
                            </Card>
                        ))}
                    </div>
                </div>
                {/* System Features Section */}
                <div>
                    <h2 className="subHeading">
                        Detailed Reports
                    </h2>
                    <ul className="list-none grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 text-sm">
                        {systemFeatures.map(({ name, icon: Icon }) => (
                            <li
                                key={name}
                                className="inline-flex items-center px-4 py-2 gap-2 text-sm text-background bg-primaryLight rounded-xl shadow-sm"
                            >
                                <Icon className="w-4 h-4 text-background" />
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default Page;
