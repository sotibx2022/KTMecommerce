"use client";
import { motion } from "framer-motion";
const BrandItemSkeleton = () => {
    return (
        <motion.div
            className="w-auto h-[80px] flex-center cursor-wait"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
            <div className="w-[100px] h-[60px] bg-backgroundLight rounded-md animate-pulse" />
        </motion.div>
    );
};
export default BrandItemSkeleton;
