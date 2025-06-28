"use client"
import { motion } from 'framer-motion';
import React from 'react';
interface ISummaryChild {
    children: React.ReactNode;
}
const SummaryChild: React.FC<ISummaryChild> = ({ children }) => {
    return (
        <div className='relative min-w-[300px] max-w-[500px] min-h-[300px] max-h-[300px]'>
            {/* Animated Border */}
            <motion.div 
                className="absolute -inset-[5px] pointer-events-none z-10 rounded-lg"
                initial={{ opacity: 0, background: "linear-gradient(90deg, transparent 0%, transparent 100%)" }}
                animate={{
                    opacity: 1,
                    background: "linear-gradient(90deg, rgba(83, 28, 29, 0.8) 100%, rgba(83, 28, 29, 0.8) 100%)"
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            {/* Content */}
            <motion.div 
                className='relative h-full z-20 bg-background shadow-primaryLight cursor-pointer'
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </div>
    );
};
export default SummaryChild;