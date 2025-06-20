import React, { useEffect, useState } from 'react';
const AnalogClock = dynamic(
  () => import('analog-clock-react'),
  {
    ssr: false,
    loading: () => <h1>Loading</h1>
  }
);
import Timer from './Timer';
import dynamic from 'next/dynamic';
let options = {
    width: "300px",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#17a2b8",
    centerColor: "#459cff",
    centerBorderColor: "#ffffff",
    handColors: {
      second: "#d81c7a",
      minute: "#ffffff",
      hour: "#ffffff"
    }
};
const LimitedOffer = () => {
  const[showClock, setShowClock] = useState(false);
  return (
    <section className='py-2 rounded-lg border-2 border-inset border-helper' style={{ background: "var(--gradientwithOpacity)" }}
    >
   {!showClock && <div className="clockArea"
   onMouseEnter={()=>setShowClock(true)}
    onMouseLeave={()=>setShowClock(false)}>
    <AnalogClock
     {...options}
      ticks
    />
   </div>}
    {showClock && 
    <div className="timerArea">
      <Timer/>
    </div>
    }
 </section>
  );
};
export default LimitedOffer;