import React from 'react';
import Footer1 from './Footer1';
import Footer2 from './Footer2';
const Footer = () => {
  return (
    <footer className=" bg-gray-800 text-white py-4 mt-4">
      {/* <Footer1/>
      <hr></hr> */}
      <Footer2/>
      <hr></hr>
      <div className="container mx-auto flex justify-center items-center h-[30px]">
        <p>This is the project developed by Binayaraj Soti.</p>
      </div>
    </footer>
  );
};
export default Footer;
