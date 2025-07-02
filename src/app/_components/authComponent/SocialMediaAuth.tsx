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
    </div>
  );
};
export default SocialMediaAuth;
