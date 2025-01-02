import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import SocialMediaAuth from './SocialMediaAuth';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useForm } from 'react-hook-form';
import { LoginData } from '@/app/types/formData';
import { validateEmail, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import SubmitError from '../submit/SubmitError';
import loginUser from '@/app/services/firebaseFunctions/loginUser';
import { useMutation } from '@tanstack/react-query';
import { APIResponseError, APIResponseSuccess, loginUserMutation } from '@/app/services/queryFunctions/users';
import LoadingButton from '../primaryButton/LoadingButton';
import toast from 'react-hot-toast';
const LoginComponent = () => {
  const {setVisibleComponent} = useContext(DisplayContext);
  const {register, formState:{errors}, handleSubmit} = useForm<LoginData>({mode:'all'})
  const[isLoading,setIsLoading] = useState(false)
  const mutation = useMutation<APIResponseSuccess | APIResponseError, Error, LoginData>({
    mutationFn:loginUserMutation,
    onSuccess:(response)=>{
      toast.success(response.message);
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })
  const onSubmit=async(data:LoginData)=>{
    setIsLoading(true);
const {success,message} = await loginUser(data.email,data.password);
if(success){
 mutation.mutate({email:data.email,password:data.password});
 setIsLoading(false)
}else{
  setIsLoading(false);
  toast.error(message)
}
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
            {isLoading ? <LoadingButton/>:<PrimaryButton searchText='Login' />}
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
