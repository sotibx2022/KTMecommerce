import React from 'react'
import LimitedOfferImage from '../../../../public/assets/limitedOffer.jpg'
import Image from 'next/image'
import Timer from './Timer'
const LimitedOffer = () => {
  return (
    <section className='bg-primaryLight py-4'>
        <div className='container'>
            <div className="LimitedOfferContentArea">
            <h1 className='subHeading'>Limited Offer</h1>
            <Timer/>
            </div>
        </div>
    </section>
  )
}
export default LimitedOffer