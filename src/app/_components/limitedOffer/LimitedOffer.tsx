import React, { useState } from 'react';
const AnalogClock = dynamic(
  () => import('analog-clock-react'),
  {
    ssr: false,
    loading: () => <div className="h-[100px] w-[100px] bg-primaryDark animate-pulse border-2 border-helper rounded-full"></div>
  }
);
import Timer from './Timer';
import dynamic from 'next/dynamic';
let options = {
    width: "100px",
    border: true,
    borderColor: "#531c1d",
    baseColor: "#876061",
    centerColor: "#fcae04",
    centerBorderColor: "#feffdf",
    handColors: {
      second: "#fcae04",
      minute: "#feffdf",
      hour: "#feffdf"
    }
};
const LimitedOffer = () => {
  const [showTimer, setShowTimer] = useState(false);
  return (
    <section>
      <div 
        className="hoverArea"
        onMouseEnter={() => setShowTimer(true)}
        onMouseLeave={() => setShowTimer(false)}
      >
        {!showTimer ? (
          <div className="flex justify-end"> {/* Parent container pushes child to the right */}
  <div className="clockArea flex flex-col items-end">
    <AnalogClock {...options} ticks />
    <h2 className="text-helper font-bold rounded-lg mt-1">Limited Offer</h2>
  </div>
</div>
        ) : (
          <div className='py-2 rounded-lg border-2 border-inset border-helper' 
      style={{ background: "var(--gradientwithOpacity)" }}>
            <Timer />
          </div>
        )}
      </div>
    </section>
  );
};
export default LimitedOffer;