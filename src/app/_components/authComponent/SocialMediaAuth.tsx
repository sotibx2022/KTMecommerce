"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
const SocialMediaAuth = () => {
  // Track loading states for each icon
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [facebookLoaded, setFacebookLoaded] = useState(false);
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };
  const handleFacebookLogin = () => {
    signIn("facebook", { callbackUrl: "/" });
  };
  return (
    <div className="flex justify-center items-center gap-6">
      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
        className="p-3 rounded-full border border-primaryLight hover:bg-primaryLight transition-colors duration-200 shadow-sm flex items-center justify-center"
        aria-label="Login with Google"
      >
        {!googleLoaded && (
          <div className="w-6 h-6 rounded-full bg-primaryLight animate-pulse" />
        )}
        <img
          src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-512.png"
          alt="Google login"
          className={`w-6 h-6 ${googleLoaded ? "block" : "hidden"}`}
          onLoad={() => setGoogleLoaded(true)}
          draggable={false}
        />
      </button>
      {/* Facebook Button */}
      <button
        onClick={handleFacebookLogin}
        className="p-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200 shadow-sm flex items-center justify-center"
        aria-label="Login with Facebook"
      >
        {!facebookLoaded && (
          <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
        )}
        <img
          src="https://cdn2.iconfinder.com/data/icons/social-media-applications/64/social_media_applications_1-facebook-512.png"
          alt="Facebook login"
          className={`w-6 h-6 ${facebookLoaded ? "block" : "hidden"}`}
          onLoad={() => setFacebookLoaded(true)}
          draggable={false}
        />
      </button>
    </div>
  );
};
export default SocialMediaAuth;
