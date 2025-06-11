import React, { useState } from 'react'
import LinkComponent from '../linkComponent/LinkComponent';
import Link from 'next/link';
import { userOptions } from '@/app/data/userOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const UserOptions = () => {
     const [activeCategory, setActiveCategory] = useState<number | null>(null);
  return (
    <div className='absolute top-[100%] left-0 w-full shadow-helper p-4 bg-background z-[20]'>
        {userOptions.map((option,index)=>{
            return <div
  key={index}
  className={`border-b-2 border-primaryDark border-dotted py-2 ${
    activeCategory === index ? 'text-primaryDark' : 'text-primaryLight'
  }`}
  onMouseEnter={() => setActiveCategory(index)}
  onMouseLeave={()=>setActiveCategory(null)}
>
  <FontAwesomeIcon icon={option.icon} className='mr-1'/>
                <Link href={option.href}>{option.title}</Link>
                </div>
        })}
    </div>
  )
}
export default UserOptions