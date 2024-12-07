"use client"
import React, { useEffect, useRef, useState } from "react";
import LinkComponent from "../linkComponent/LinkComponent";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ResponsiveHeader from "./responsiveHeader/ResponsiveHeader";
import gsap from "gsap";
const links = [
  { href: "/", text: "Home" },
  { href: "/carreers", text: "Carreers" },
  { href: "/help", text: "Help" },
  { href: "/terms", text: "Terms" },
  { href: "/contact", text: "Contact Us" },
];
const MainPrimaryHeader: React.FC = () => {
  const [showResponsiveMenu, setShowResponsiveMenu] = useState<boolean>(false);
  const responsiveHeaderRef = useRef<HTMLDivElement | null>(null); // Ref for the responsive header
  useEffect(() => {
    const responsiveHeader = responsiveHeaderRef.current;
    if (responsiveHeader) {
      if (showResponsiveMenu) {
        gsap.to(responsiveHeader, {
          left: "0%", // Slide in
          duration: 0.5,
          ease: "power2.out",
        });
      } else {
        gsap.to(responsiveHeader, {
          left: "100%", // Slide out
          duration: 0.5,
          ease: "power2.in",
        });
      }
    }
  }, [showResponsiveMenu]); // Trigger animation on state change
  const toggleResponsiveMenu = () => {
    setShowResponsiveMenu((prev) => !prev);
  };
  const handleChildData = (data: boolean) => {
    setShowResponsiveMenu(data);
  };
  return (
    <div className="bg-background lg:bg-primaryDark">
      <nav className="container flex justify-between items-center py-1">
        <ul className="hidden lg:flex justify-center items-center gap-4">
          {links.map((link, index) => (
            <li className="text-background" key={index}>
              <LinkComponent href={link.href} text={link.text} />
            </li>
          ))}
        </ul>
        <div className="flex gap-4 items-center">
          <div className="hidden lg:flex justify-center items-center gap-4">
            <Link href="/auth/login">
              <SecondaryButton text="Login" />
            </Link>
            <Link href="/auth/signup">
              <SecondaryButton text="Signup" />
            </Link>
          </div>
          <div className="flex sm:hidden">
            <img
              src="../assets/brand/logo.png"
              className="w-auto h-[50px] min-w-[150px] filter-1"
            />
          </div>
          <FontAwesomeIcon
            icon={faBars}
            className="text-primaryDark cursor-pointer transition-transform transform hover:scale-125 hover:rotate-12 lg:text-background "
            onClick={toggleResponsiveMenu}
          />
        </div>
      </nav>
      {/* Responsive header */}
      <div
        ref={responsiveHeaderRef} // Attach the ref here
        className="responsiveHeader absolute top-0 left-[100%] w-full h-full bg-black bg-opacity-80 flex z-10"
      >
        {showResponsiveMenu && (
          <ResponsiveHeader onSendData={handleChildData} />
        )}
      </div>
    </div>
  );
};
export default MainPrimaryHeader;
