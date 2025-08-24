"use client";
import { navigationLinks } from '@/app/data/navigationLinks'
import React, { useEffect } from 'react'
import LinkComponent from '../linkComponent/LinkComponent'
import { useDispatch } from 'react-redux';
import { setToRecent } from '@/app/redux/recentSlice';
const QuickLinks = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    if(typeof window !== "undefined"){
      const recentProductstring = localStorage.getItem('recentProductsArray');
      const recentProductArray = recentProductstring?JSON.parse(recentProductstring):[]
      dispatch(setToRecent(recentProductArray))
    }
  },[])
  return (
    <div className="bg-primaryDark shadow-primaryLight">
        <ul className="container py-5 flex justify-center gap-4 flex-wrap ">
                 {navigationLinks.map((link, index) => (
                   <li className="text-background" key={index}>
                     <LinkComponent href={link.href} text={link.text} />
                   </li>
                 ))}
               </ul>
    </div>
  )
}
export default QuickLinks