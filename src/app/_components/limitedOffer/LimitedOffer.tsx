import React, { useState } from 'react';
import Timer from './Timer';
const LimitedOffer = () => {
  return (
    <section>
          <div className='py-2 rounded-lg border-2 border-inset border-helper' 
      style={{ background: "var(--gradientwithOpacity)" }}>
            <Timer />
          </div>
    </section>
  );
};
export default LimitedOffer;