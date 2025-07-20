'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { userOptions } from '@/app/data/userOptions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLogout } from '@/app/hooks/queryHooks/useLogout';
const UserOptions = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const logout = useLogout()
  return (
    <div className='absolute top-[100%] left-0 w-full shadow-helper p-4 bg-background z-[20]'>
      {userOptions.map((option, index) => (
        <div
          key={index}
          className={`border-b-2 border-primaryDark border-dotted py-2 ${activeCategory === index ? 'text-primaryDark' : 'text-primaryLight'
            }`}
          onMouseEnter={() => setActiveCategory(index)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <FontAwesomeIcon icon={option.icon} className={option.title === 'Logout' ? "text-red-500 " : "text-primaryLight mr-1"} />
          {option.title === 'Logout' ? (
            <span onClick={() => logout.mutate()} className='text-red-500 font-bold'>
              Logout
            </span>
          ) : (
            <Link href={option.href}>{option.title}</Link>
          )}
        </div>
      ))}
    </div>
  );
};
export default UserOptions;
