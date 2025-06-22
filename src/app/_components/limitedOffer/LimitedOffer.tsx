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
import { Button } from '@/components/ui/button';
let options = {
    width: "80px",
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
          <div className="flex justify-end "  >
  <div className="clockArea flex  items-center justify-center gap-2 shadow-helper p-2  cursor-pointer" style={{ background: "var(--gradientwithOpacity)" }}>
    <AnalogClock {...options} ticks />
    <div className="clockDeta flex-col justify-center gap-2">
      <h2 className="text-lg text-helper">Limited Offer</h2>
    <Button variant="outline">Check</Button>
    </div>
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