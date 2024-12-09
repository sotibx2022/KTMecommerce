import Footer from '@/app/_components/footer/Footer';
import NavBar from '@/app/_components/navbar/Navbar';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import SocialMediaAuth from './SocialMediaAuth';
const LoginComponent = () => {
  return (
    <>
      <div
        className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-1000"
        style={{ background: "var(--gradientwithOpacity)" }}
      >
        <div className="bg-background w-[400px] p-6 rounded-lg shadow-lg relative flex flex-col justify-center items-center">
          <form className="flex flex-col gap-2">
            {/* Close Icon */}
            <FontAwesomeIcon
              icon={faTimes}
              className="text-background bg-helper w-[30px] h-[30px] absolute top-0 right-0 cursor-pointer"
            />
            <h2 className="subHeading mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="formItem"
            />
            <input
              type="password"
              placeholder="Password"
              className="formItem"
            />
            <PrimaryButton searchText="Login" />
            <div className="usefulLinks my-2">
              <p className="secondaryHeading">
                <FontAwesomeIcon icon={faCaretRight} className="mr-2" />
                Don't have an account? <span className="link">Sign up</span>
              </p>
              <p className="secondaryHeading">
                <FontAwesomeIcon icon={faCaretRight} className="mr-2" />
                Forget Password ? <span className="link">Reset Password</span>
              </p>
            </div>
          </form>
        {/* Social Media Auth Section */}
        <SocialMediaAuth />
      </div>
      </div>
    </>
  );
};
export default LoginComponent;
