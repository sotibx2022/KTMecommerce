"use client";
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation';
interface ConfettiComponentProps{
  link:string,
  message:string
}
const ConfettiComponent:React.FC<ConfettiComponentProps> = ({link,message}) => {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [showConfetti, setShowConfetti] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Redirect after animation completes (5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
      router.push(link);
    }, 5000); // Match this with your confetti duration
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div 
      className="fixed inset-0 overflow-y-auto z-50 flex flex-col justify-center items-center"
      style={{ background: "var(--gradientwithOpacity)" }}
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          onConfettiComplete={() => {
            setShowConfetti(false);
            router.push(link);
          }}
        />
      )}
      <h1 className='text-lg text-helper mt-4'>
        {message}
      </h1>
    </div>
  );
};
export default ConfettiComponent;