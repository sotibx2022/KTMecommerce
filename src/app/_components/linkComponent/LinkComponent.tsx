"use client";
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
interface LinkComponentProps {
  href: string;
  text: string;
  className?: string;
}
const LinkComponent: React.FC<LinkComponentProps> = ({ href, text, className }) => {
  return (
    <Link href={href}>
      <motion.div
        className={`flex flex-col overflow-hidden ${className}`}
        whileHover="hover"
        initial="initial"
      >
        <motion.span
          className="cursor-pointer nav1"
          variants={{
            initial: { y: 0 },
            hover: { y: "-1.5rem" },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
        <motion.span
          className="cursor-pointer nav2"
          variants={{
            initial: { y: "1.5rem" },
            hover: { y: "-1.5rem" }, // Changed to y:0 to create proper animation
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {text}
        </motion.span>
      </motion.div>
    </Link>
  );
};
export default LinkComponent;