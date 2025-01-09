import React, { useState } from 'react'
import LinkComponent from '../linkComponent/LinkComponent';
const userOptions = [
    { title: "Profile", href: "/profile" },
    { title: "Orders", href: "/orders" },
    { title: "Wishlist", href: "/wishlist" },
    { title: "Cart", href: "/cart" },
    { title: "Notifications", href: "/notifications" },
    { title: "Settings", href: "/settings" }
  ];
const UserOptions = () => {
     const [activeCategory, setActiveCategory] = useState<number | null>(null);
  return (
    <div className='absolute top-[100%] left-0   shadow-helper p-4 bg-primaryLight z-10'>
        {userOptions.map((option,index)=>{
            return <div key={index} className='border-b-2 border-primaryDark border-dotted py-2 text-primaryDark text-xl' onMouseEnter={() => setActiveCategory(index)} // Set the current category as active
            onMouseLeave={() => setActiveCategory(null)}>
                <LinkComponent text={option.title} href={option.href}/>
                </div>
        })}
    </div>
  )
}
export default UserOptions