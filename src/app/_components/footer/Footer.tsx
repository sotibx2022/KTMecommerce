import React from 'react';
import Footer2 from './Footer2';
import NewsLetterSection from './NewsLetterSection';
const Footer = () => {
  return (
    <footer className="bg-primaryDark text-white mt-4">
      <NewsLetterSection/>
      <Footer2/>
      <div className=" mx-auto flex justify-center items-center h-[30px]  bg-primaryLight py-8">
        <p>This is the project developed by Binayaraj Soti.</p>
      </div>
    </footer>
  );
};
export default Footer;
