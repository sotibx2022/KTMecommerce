import React, { useState } from 'react'
import LinkComponent from '../linkComponent/LinkComponent';
import Link from 'next/link';
const userOptions = [
    { title: "Profile", href: "/dashboard/profile" },
    { title: "Orders", href: "/dashboard/orders" },
    { title: "Wishlist", href: "/dashboard/wishlist" },
    { title: "Cart", href: "/dashboard/cart" },
    { title: "Reviews", href: "/dashboard/reviews" },
    { title: "Notifications", href: "/dashboard/notifications" },
    { title: "Settings", href: "/dashboard/settings" }
  ];
const UserOptions = () => {
     const [activeCategory, setActiveCategory] = useState<number | null>(null);
  return (
    <div className='absolute top-[100%] left-0 shadow-helper p-4 bg-background z-10'>
        {userOptions.map((option,index)=>{
            return <div
  key={index}
  className={`border-b-2 border-primaryDark border-dotted py-2 ${
    activeCategory === index ? 'text-primaryDark' : 'text-primaryLight'
  }`}
  onMouseEnter={() => setActiveCategory(index)}
  onMouseLeave={()=>setActiveCategory(null)}
>
                <Link href={option.href}>{option.title}</Link>
                </div>
        })}
    </div>
  )
}
export default UserOptions