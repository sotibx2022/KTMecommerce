import React from 'react';
import NewsLetterSection from './NewsLetterSection';
import DirectContactDetails from './DirectContactDetails';
import QuickLinks from './QuickLinks';
import DeveloperDetails from './DeveloperDetails';
import dynamic from 'next/dynamic';
import FooterSkeleton from './FooterSkeleton';
// Correct dynamic import syntax
const Footer2 = dynamic(
  () => import('./Footer2'),
  { 
    ssr: false,
    loading: () => <FooterSkeleton /> // Fixed syntax for loading component
  }
);
const Footer = () => {
  return (
    <div className='bg-primaryDark mt-4'>
      <Footer2 /> {/* Include the dynamically imported Footer2 */}
      <NewsLetterSection />
      <DirectContactDetails />
      <QuickLinks />
      <DeveloperDetails />
    </div>
  );
};
export default Footer;