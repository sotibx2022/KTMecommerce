import Link from 'next/link';
import React from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
const SecondaryHeader = () => {
  const items = [
    { name: 'HTML', href: '/search?searchValue=html' },
    { name: 'CSS', href: '/search?searchValue=css' },
    { name: 'Javascript', href: '/search?searchValue=java' },
    { name: 'MongoDB', href: '/search?searchValue=mongo' },
    { name: 'Nextjs', href: '/search?searchValue=next' },
    { name: 'Nodejs', href: '/search?searchValue=node' },
    { name: 'GSAP', href: '/search?searchValue=gsap' },
    { name: 'React js', href: '/search?searchValue=react' },
  ];
  return (
    <div className='border-2 border-t-primaryDark border-b-primaryDark py-1'>
      <ul className='flex-between container'>
        {items.map((item, index) => (
          <li key={index} className="secondaryHeading uppercase font-bold text-primaryDark">
            <LinkComponent href={item.href} text={item.name}/>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SecondaryHeader;