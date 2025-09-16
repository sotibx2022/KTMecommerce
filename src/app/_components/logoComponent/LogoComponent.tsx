"use client";
import Link from "next/link";
import React from "react";
interface LogoComponentProps {
  theme?: "light" | "dark";
}
const LogoComponent: React.FC<LogoComponentProps> = ({ theme }) => {
  return (
    <Link href="/">
      <div className="hidden md:flex md:items-center md:gap-2">
        <img
          src="/assets/brand/mobilelogo.png"
          alt="mobile logo"
          style={theme === "dark" ? { filter: "invert(1) brightness(2)" } : undefined}
          className="w-auto h-[50px]"
        />
        <img
          src="/assets/brand/textlogo.png"
          alt="text logo"
          style={theme === "dark" ? { filter: "invert(1) brightness(2)" } : undefined}
          className="w-auto h-[30px]"
        />
      </div>
      <img
        src="/assets/brand/mobilelogo.png"
        alt="mobile logo"
        style={theme === "dark" ? { filter: "invert(1) brightness(2)" } : undefined}
        className="w-auto h-[50px] md:hidden"
      />
    </Link>
  );
};
export default LogoComponent;
