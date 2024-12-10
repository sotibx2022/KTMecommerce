import Footer from '@/app/_components/footer/Footer';
import NavBar from '@/app/_components/navbar/Navbar';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import SocialMediaAuth from './SocialMediaAuth';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useForm } from 'react-hook-form';
import { LoginData } from '@/app/types/formData';
import { validateEmail, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import SubmitError from '../submit/SubmitError';
const LoginComponent = () => {
  const {setVisibleComponent} = useContext(DisplayContext);
  const {register, formState:{errors}, handleSubmit} = useForm<LoginData>({mode:'all'})
  const onSubmit=(data:LoginData)=>{
    console.log(data)
    alert("clicked");
  }
  return (
    <>
      <div
        className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-10"
        style={{ background: "var(--gradientwithOpacity)" }}
      >
        <div className="bg-background w-[400px] p-6 rounded-lg shadow-lg relative flex flex-col justify-center items-center">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Close Icon */}
            <FontAwesomeIcon
              icon={faTimes}
              className="text-background bg-helper w-[30px] h-[30px] absolute top-0 right-0 cursor-pointer"
onClick={()=>setVisibleComponent('')}
            />
            <h2 className="subHeading mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="formItem" id='email'
              {...register("email",{
                validate:(value)=>validateEmail("Email",value)
              })}
            />
            {errors.email?.message && <SubmitError message={errors.email.message}/>}
            <input
              type="password"
              placeholder="Password"
              className="formItem" id='password'
              {...register("password",{
                validate:(value)=>validatePassword("Password",value,8)
              })}
            />
            {errors.password?.message && <SubmitError message={errors.password.message}/>}
            <PrimaryButton searchText='Login'/>
            </form>
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
        {/* Social Media Auth Section */}
        <SocialMediaAuth action="Login"/>
      </div>
      </div>
    </>
  );
};
export default LoginComponent;
