"use client"
import React, { useState, useEffect, useContext } from "react";
import "./Timer.css";
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
    <div className="timerContainer">
<h1 className="text-2xl text-helper font-bold flex items-center gap-2">
  <div className="icon bg-helper p-2 rounded-full">
<FaGift className="text-background   rounded-full" />
  </div>
  First order: 10% off!
</h1>
      <div className="timer">
        <div className="days">
          <h1 className="text-2xl font-bold ">{days}</h1>
          <span className="">Days</span>
        </div>
        <div className="hours">
          <h1 className="text-2xl font-bold ">{hours}</h1>
          <span className="">Hours</span>
        </div>
        <div className="minutes">
          <h1 className="text-2xl font-bold ">{minutes}</h1>
          <span className="">Minutes</span>
        </div>
        <div className="seconds">
          <h1 className="text-2xl font-bold text-helper">{seconds}</h1>
          <span className="">Seconds</span>
        </div>
      </div>
      {userDetails ?
      <Link href="/pages/isOfferItem"><PrimaryButton  searchText="Offers"/></Link>
       :<PrimaryButton onClick={handleRegister} searchText="Register"/>}
    </div>
  );
};
export default Timer;
