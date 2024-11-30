"use client"
const links = [
  { href: "/", text: "Home" },
  { href: "/carreers", text: "Carreers" },
  { href: "/help", text: "Help" },
  { href: "/terms", text: "Terms" },
  { href: "/contact", text: "Contact Us" },
];
import Link from 'next/link'
import React from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
import SecondaryButton from '../secondaryButton/SecondaryButton';
const PrimaryHeader =() =>{
  return (
      <div className="wrapper bg-primaryDark">
        <nav className="container py-1 flex justify-between items-center">
        <div className="flex-between w-[60%]">
      {links.map((link, index) => (
        <li className='text-white list-none' key={index} >
          <LinkComponent   href={link.href} text={link.text}/>
        </li>
      ))}
    </div>
        <div className="flex justify-end items-center h-[2rem] w-[20%] gap-1">
  <Link href="/auth/login">
    <SecondaryButton text="login"/>
  </Link>
  <Link href="/auth/signup">
    <SecondaryButton text="Signup"/>
  </Link>
</div>
      </nav>
      </div>
  )
}
export default PrimaryHeader