"use client";
import React, { useEffect, useState } from "react";
import LinkComponent from "../linkComponent/LinkComponent";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import ResponsiveHeader from "./responsiveHeader/ResponsiveHeader";
import gsap from 'gsap'
const links = [
  { href: "/", text: "Home" },
  { href: "/carreers", text: "Carreers" },
  { href: "/help", text: "Help" },
  { href: "/terms", text: "Terms" },
  { href: "/contact", text: "Contact Us" },
];
const MainPrimaryHeader: React.FC = () => {
  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);
  const [showResponsiveMenu, setShowResponsiveMenu] = useState(windowSize<700? true:false);
  useEffect(() => {
    const findWindowSize = () => {
      setWindowSize(window.innerWidth);
      console.log(window.innerWidth)
    };
    window.addEventListener("resize", findWindowSize);
    return () => {
      window.removeEventListener("resize", findWindowSize);
    };
  }, []);
  const toggleResponsiveMenu = () => {
    setShowResponsiveMenu(!showResponsiveMenu);
  };
  let responsiveHeader = document.querySelector(".responsiveHeader")
  if (showResponsiveMenu) {
    gsap.to(responsiveHeader, {
      left: "100%",          
      duration: 0.3,    
    });
  } else {
    gsap.to(responsiveHeader, {
      left:0,    
      duration: 0.3,    
    });
  }
  const handleChildData = (data: boolean) => {
    console.log("Data received from child:", data);
    setShowResponsiveMenu(data); 
  };
  return (
    <div className="flex bg-primaryDark">
      <nav className="container flex justify-between items-center py-1">
      <ul className={`${windowSize < 700 ? 'hidden' : 'flex justify-center items-center gap-4'}`}>
          {links.map((link, index) => (
            <li className="text-background" key={index}>
              <LinkComponent href={link.href} text={link.text} />
            </li>
          ))}
        </ul>
        <div className="flex gap-4 items-center">
        <div className={`${windowSize<700?'hidden':'flex justify-center items-center gap-4'}`}>
          <Link href="/auth/login">
            <SecondaryButton text="login" />
          </Link>
          <Link href="/auth/signup">
            <SecondaryButton text="Signup" />
          </Link>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          className="text-white cursor-pointer transition-transform transform hover:scale-125 hover:rotate-12"
          onClick={toggleResponsiveMenu}
        />
        </div>
      </nav>
      <div className="responsiveHeader absolute top-0  w-full h-full bg-black bg-opacity-80 flex z-10">
      <ResponsiveHeader onSendData={handleChildData} />
      </div>
    </div>
  );
};
export default MainPrimaryHeader;
