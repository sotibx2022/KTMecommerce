"use client"
import React, { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
const DeliveryMethod = () => {
    const [selected, setSelected] = useState('');
  return (
<div 
  className="container" 
>
  <h2 className="subHeading text-2xl font-bold mb-4">Delivery Details</h2>
  <div className="DeliveryAddress">
    <label className='text-primaryDark'>Delivery Address</label>
    <input type='text' placeholder='Kalyanpur-5, bharatpur, chitawan' className='formItem'/>
  </div>
  <div className="optionsContainer flex gap-8 my-6">
    <label className="flex items-center cursor-pointer gap-4">
      <input
        type="radio"
        name="payment"
        value="cod"
        className="peer hidden"
      />
      <div className="text-lg font-medium text-primaryDark peer-checked:bg-primaryDark p-4 peer-checked:text-background
      border-2 border-solid border-primaryDark">
        Payment On Delivery
      </div>
    </label>
    <label className="flex items-center cursor-pointer gap-4">
      <input
        type="radio"
        name="payment"
        value="online"
        className="peer hidden"
      />
      <div className="text-lg font-medium text-primaryDark peer-checked:bg-primaryDark p-4 peer-checked:text-background
      border-2 border-solid border-primaryDark ">
        Online Payment
      </div>
    </label>
  </div>
  <div className="">
  <input
    type="checkbox"
    id="terms"
    className="peer hidden"
  />
  <label
    htmlFor="terms"
    className="block cursor-pointer p-4  text-background bg-primaryLight peer-checked:bg-primaryDark peer-checked:text-white transition-colors text-lg"
  >
    Please agree to the terms and conditions of our e-commerce website.
  </label>
</div>
</div>
  )
}
export default DeliveryMethod