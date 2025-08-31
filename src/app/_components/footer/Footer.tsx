import React from 'react';
import NewsLetterSection from './NewsLetterSection';
import DirectContactDetails from './DirectContactDetails';
import QuickLinks from './QuickLinks';
import DeveloperDetails from './DeveloperDetails';
import dynamic from 'next/dynamic';
import FooterSkeleton from './FooterSkeleton';
import MobileFooterMenu from '../navbar/MobileFooterMenu';
import Footer2 from './Footer2';
const Footer = () => {
  return (
    <div className='bg-primaryDark mt-4'>
      <MobileFooterMenu />
      <Footer2 />
      <NewsLetterSection />
      <DirectContactDetails />
      <QuickLinks />
      <DeveloperDetails />
    </div>
  );
};
export default Footer;