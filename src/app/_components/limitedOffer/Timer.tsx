"use client"
import React, { useState, useEffect, useContext } from "react";
import { DisplayContext } from "@/app/context/DisplayComponents";
import PrimaryButton from "../primaryButton/PrimaryButton";
import { FaGift, FaPercent } from "react-icons/fa";
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import Link from "next/link";
const Timer: React.FC = () => {
  const context = useContext(UserDetailsContext);
    if(!context){
      throw new Error("The User Details context is not working.")
    }
    const {userDetails} = context;
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
const {setVisibleComponent} = useContext(DisplayContext);
const[showRegister,setShowRegister] = useState(false);
const handleRegister=() =>{
setShowRegister(true);
setVisibleComponent('register');
}
  const targetTime: Date = new Date("12/1/2025");
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = targetTime.getTime() - currentTime;
      if (remainingTime <= 0) {
        clearInterval(interval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        return;
      }
      const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      setDays(remainingDays);
      setHours(remainingHours);
      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);
  return (
  <div className="max-w-md mx-auto p-3 rounded-lg shadow-md">
  {/* Header with icon - made more compact */}
  <div className="flex items-center gap-2 mb-3">
    <div className="flex items-center justify-center bg-helper p-2 rounded-full">
      <FaGift className="text-white text-lg" />
    </div>
    <h1 className="text-xl md:text-xl font-bold text-background">First order: 10% off!</h1>
  </div>
  {/* Timer section - more compact */}
  <div className="mb-4">
    <p className="text-gray-600 text-sm mb-2">Offer expires in:</p>
    <div className="grid grid-cols-4 gap-2">
      {/* Days */}
      <div className="flex flex-col items-center bg-primaryLight p-2 rounded-md">
        <span className="text-xl md:text-2xl font-bold text-primaryDark">{days}</span>
        <span className="text-xs text-background">Days</span>
      </div>
      {/* Hours */}
      <div className="flex flex-col items-center bg-primaryLight p-2 rounded-md">
        <span className="text-xl md:text-2xl font-bold text-primaryDark">{hours}</span>
        <span className="text-xs text-background">Hours</span>
      </div>
      {/* Minutes */}
      <div className="flex flex-col items-center bg-primaryLight p-2 rounded-md">
        <span className="text-xl md:text-2xl font-bold text-primaryDark">{minutes}</span>
        <span className="text-xs text-background">Minutes</span>
      </div>
      {/* Seconds */}
      <div className="flex flex-col items-center bg-primaryLight p-2 rounded-md">
        <span className="text-xl md:text-2xl font-bold text-helper">{seconds}</span>
        <span className="text-xs text-background">Seconds</span>
      </div>
    </div>
  </div>
  {/* Button section - more compact */}
  <div className="flex justify-center">
    {userDetails ? (
      <Link href="/pages/isOfferItem" className="w-full">
        <PrimaryButton 
          searchText="View Offers"
        />
      </Link>
    ) : (
      <PrimaryButton 
        onClick={handleRegister}
        searchText="Register Now"
      />
    )}
  </div>
</div>
  );
};
export default Timer;
