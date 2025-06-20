declare module 'analog-clock-react' {
  import React from 'react';
  interface AnalogClockProps {
    width?: number;
    height?: number;
    border?: boolean;
    borderColor?: string;
    baseColor?: string;
    centerColor?: string;
    handColors?: {
      second?: string;
      minute?: string;
      hour?: string;
    };
    ticks?: boolean;
  }
  const AnalogClock: React.FC<AnalogClockProps>;
  export default AnalogClock;
}