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
interface PrimaryHeader{
  classStyles?:string,
  classStyles2?:string,
}
const PrimaryHeader:React.FC<PrimaryHeader> =({classStyles,classStyles2}) =>{
  return (
      <div className="wrapper flex">
        <nav className={classStyles}>
        <ul className='flex flex-wrap'>
      {links.map((link, index) => (
        <li className='text-primaryDark list-none bg-primaryLight p-2 m-2 text-white' key={index} >
          <LinkComponent   href={link.href} text={link.text}/>
        </li>
      ))}
    </ul>
        <div className="flex items-center h-[2rem] w-[20%] gap-2">
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