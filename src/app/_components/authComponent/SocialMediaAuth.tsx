"use client";
import { signIn } from 'next-auth/react';
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { FaFacebook, FaFacebookF } from 'react-icons/fa';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
const SocialMediaAuth = () => {
  const handleGoogleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };
  const handleFacebookLogin = () => {
    signIn('facebook', { callbackUrl: '/' });
  };
  return (
    <div className="">
      <div className="socialIcons flex justify-center items-center gap-4">
        <button 
          onClick={handleGoogleLogin}
          className="p-3 rounded-full"
        >
          <img 
            src='https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-512.png' 
            className="w-6 h-6"
            alt="Google login"
          />
        </button>
        <button 
          onClick={handleFacebookLogin}
          className="p-3 rounded-full  transition-colors"
        >
          <img 
            src='https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_1-facebook-512.png'
            className="w-6 h-6"
            alt="Facebook login"
          />
        </button>
      </div>
      {/* Divider */}
    </div>
  );
};
export default SocialMediaAuth;