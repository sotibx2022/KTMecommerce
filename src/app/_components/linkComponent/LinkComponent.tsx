"use client";
import Link from 'next/link';
import React, { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
interface LinkComponentProps {
  href: string;
  text: string;
  className?: string;
  onClick?: () => void;
}
const LinkComponent: React.FC<LinkComponentProps> = ({ href, text, className, onClick }) => {
  const nav1Ref = useRef<HTMLSpanElement>(null);
  const nav2Ref = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    // Animation functions are now inside useGSAP's scope
    const showTextAnimation = () => {
      gsap.to([nav1Ref.current, nav2Ref.current], {
        y: '-1.5rem',
        duration: 0.5,
        stagger: 0.1,
        onComplete: () => {
          gsap.set([nav1Ref.current, nav2Ref.current], { y: '0' });
        }
      });
    };
    const hideTextAnimation = () => {
      gsap.set([nav1Ref.current, nav2Ref.current], { y: 0 });
    };
    // Add event listeners through GSAP's context
    const links = container.current?.querySelectorAll('span');
    links?.forEach(link => {
      link.addEventListener('mouseenter', showTextAnimation);
      link.addEventListener('mouseleave', hideTextAnimation);
    });
    // Cleanup
    return () => {
      links?.forEach(link => {
        link.removeEventListener('mouseenter', showTextAnimation);
        link.removeEventListener('mouseleave', hideTextAnimation);
      });
    };
  }, { scope: container }); // Scope the animations to the container
  return (
    <div ref={container} className={className}>
      <Link href={href} onClick={onClick}>
        <div className="flex flex-col h-[1.5rem] overflow-hidden">
          <span ref={nav1Ref} className="cursor-pointer">
            {text}
          </span>
          <span ref={nav2Ref} className="cursor-pointer">
            {text}
          </span>
        </div>
      </Link>
    </div>
  );
};
export default LinkComponent;