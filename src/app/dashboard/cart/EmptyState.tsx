"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ShoppingBag, History } from "lucide-react";
import NoData from "@/app/_components/noData/NoData";
interface EmptyStateProps {
    icon: React.ReactNode;
    message: string;
    className?: string;
}
const EmptyState: React.FC<EmptyStateProps> = ({ icon, message, className }) => {
    const router = useRouter();
    return (
        <div className={`flex-1 flex flex-col max-w-[500px]`}>
            <NoData icon={icon} notFoundMessage={message} />
            <div className="mt-6 grid grid-cols-1  gap-4">
                {/* Browse Products */}
                <div
                    onClick={() => router.push("/catalog/advanceSearch?highlighted=none")}
                    className="
            flex items-center gap-3 p-4 rounded-2xl cursor-pointer
            border border-[var(--primary)]
            bg-[var(--background)] shadow-sm
            transition-all duration-300
            hover:bg-[var(--primary)] hover:text-[var(--background)]
            hover:shadow-lg hover:scale-[1.02]
            active:scale-95
          "
                >
                    <ShoppingBag className="w-6 h-6 text-[var(--helper)]" />
                    <span className="font-medium">Browse Products</span>
                </div>
                {/* Recently Visited */}
                <div
                    onClick={() => router.push("/pages/recent")}
                    className="
            flex items-center gap-3 p-4 rounded-2xl cursor-pointer
            border border-[var(--primary)]
            bg-[var(--background)] shadow-sm
            transition-all duration-300
            hover:bg-[var(--primary)] hover:text-[var(--background)]
            hover:shadow-lg hover:scale-[1.02]
            active:scale-95
          "
                >
                    <History className="w-6 h-6 text-[var(--helper)]" />
                    <span className="font-medium">Check Recently Visited Products</span>
                </div>
            </div>
        </div>
    );
};
export default EmptyState;
