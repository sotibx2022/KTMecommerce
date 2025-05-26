import { navigationLinks } from '@/app/data/navigationLinks'
import React from 'react'
import LinkComponent from '../linkComponent/LinkComponent'
const QuickLinks = () => {
  return (
    <div className="bg-primaryDark shadow-primaryLight">
        <ul className=" container py-5 flex justify-center gap-4 flex-wrap ">
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