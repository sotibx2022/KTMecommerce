import React from 'react'
import LimitedOfferImage from '../../../../public/assets/limitedOffer.jpg'
import Image from 'next/image'
import Timer from './Timer'
const LimitedOffer = () => {
  return (
    <section className='py-2 rounded-lg border-2 border-inset border-helper' style={{ background: "var(--gradientwithOpacity)" }}>
        <div className='offerContainer max-w-[500px]'>
            <div className="LimitedOfferContentArea">
            <Timer/>
            </div>
        </div>
    </section>
  )
}
export default LimitedOffer