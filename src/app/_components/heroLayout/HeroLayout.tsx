"use client"
import React, { useEffect, useState } from 'react';
import Banner from './banner/Banner';
import CategoryCards from '../categoryCards/CategoryCards';
const HeroLayout = () => {
  return (
      <div className='flex h-[500px] w-full bg-primaryDark flex-col lg:flex-row'>
        <Banner />
        <CategoryCards/>
      </div>
  );
};
export default HeroLayout;