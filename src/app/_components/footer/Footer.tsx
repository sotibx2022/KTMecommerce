import React from 'react';
import Footer2 from './Footer2';
import NewsLetterSection from './NewsLetterSection';
import DirectContactDetails from './DirectContactDetails';
import QuickLinks from './QuickLinks';
import DeveloperDetails from './DeveloperDetails';
const Footer = () => {
  return (
      <div className='bg-primaryDark mt-4'>
        <Footer2/>
        <NewsLetterSection/>
        <DirectContactDetails/>
        <QuickLinks/>
        <DeveloperDetails/>
    </div>
  );
};
export default Footer;
