"use client"
const links = [
  { href: "/", text: "Home" },
  { href: "/pages/careers", text: "Careers" },
  { href: "/pages/help", text: "Help" },
  { href: "/pages/terms", text: "Terms" },
  { href: "/pages/contact", text: "Contact Us" },
];
import Link from 'next/link'
import React, { useContext, useState } from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
interface PrimaryHeader{
  classStyles?:string,
  classStyles2?:string,
}
const PrimaryHeader:React.FC<PrimaryHeader> =({classStyles,classStyles2}) =>{
  const context = useContext(UserDetailsContext);
  console.log("console at primary Header is visible.")
  console.log(context)
const {setVisibleComponent} = useContext(DisplayContext);
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
        <div className="flex items-center h-[2rem] w-auto gap-2">
          <SecondaryButton text="Login" onClick={() => setVisibleComponent('login')}/>
          <SecondaryButton text="Signup" onClick={() => setVisibleComponent('register')} />
            </div>
</div>
      </nav>
      </div>
  )
}
export default PrimaryHeader