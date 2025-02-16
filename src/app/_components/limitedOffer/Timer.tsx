import React, { useState, useEffect, useContext } from "react";
import "./Timer.css";
import { DisplayContext } from "@/app/context/DisplayComponents";
import PrimaryButton from "../primaryButton/PrimaryButton";
const Timer: React.FC = () => {
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
      <p className="primaryParagraph">Register now, to secure 10% off on your first purchase!</p>
      <div className="timer">
        <div className="days">
          <h1 className="text-2xl font-bold text-primaryDark">{days}</h1>
          <span className="text-primaryDark">Days</span>
        </div>
        <div className="hours">
          <h1 className="text-2xl font-bold text-primaryDark">{hours}</h1>
          <span className="text-primaryDark">Hours</span>
        </div>
        <div className="minutes">
          <h1 className="text-2xl font-bold text-primaryDark">{minutes}</h1>
          <span className="text-primaryDark">Minutes</span>
        </div>
        <div className="seconds">
          <h1 className="text-2xl font-bold text-helper">{seconds}</h1>
          <span className="text-primaryDark">Seconds</span>
        </div>
      </div>
      <PrimaryButton onClick={handleRegister} searchText="Register"/>
    </div>
  );
};
export default Timer;
