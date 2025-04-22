"use client"
import React, { useEffect, useState } from 'react';
import Banner from './banner/Banner';
import CategoryCards from '../categoryCards/CategoryCards';
const HeroLayout = () => {
  return (
      <div className='flex min-h-[500px] w-full bg-primaryDark'>
        <Banner />
      </div>
  );
};
export default HeroLayout;