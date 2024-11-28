"use client";
import Link from 'next/link';
import React, { useRef } from 'react';
import gsap from 'gsap';
interface LinkComponentProps {
  href: string;
  text: string;
}
const LinkComponent: React.FC<LinkComponentProps> = ({ href, text }) => {
  // Create refs for the nav1 and nav2 spans
  const nav1Ref = useRef<HTMLSpanElement | null>(null);
  const nav2Ref = useRef<HTMLSpanElement | null>(null);
  const showTextAnimation = () => {
    gsap.to(nav1Ref.current, {
      y: '-1.5rem',
      duration: 1,
      // Reset position on animation completion
      onComplete: () => {
        gsap.set(nav1Ref.current, { y: '0' });
      },
    });
    gsap.to(nav2Ref.current, {
      y: '-1.5rem',
      duration: 1,
      // Reset position on animation completion
      onComplete: () => {
        gsap.set(nav2Ref.current, { y: '0' });
      },
    });
  };
  const hideTextAnimation = () => {
    gsap.set(nav1Ref.current, {
      y: 0,
    });
    gsap.set(nav2Ref.current, {
      y: 0,
    });
  };
  return (
    <div>
      <Link href={href}>
        <div
          className='flex flex-col h-[1.5rem] overflow-hidden'
          onMouseEnter={showTextAnimation}
          onMouseLeave={hideTextAnimation}
        >
          <span ref={nav1Ref} className="cursor-pointer nav1" >
            {text}
          </span>
          <span ref={nav2Ref} className="cursor-pointer nav2" >
            {text}
          </span>
        </div>
      </Link>
    </div>
  );
};
export default LinkComponent;