import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import SocialMediaAuth from './SocialMediaAuth'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { useForm } from 'react-hook-form'
import SubmitError from '../submit/SubmitError'
import { validateConfirmPassword, validateEmail, validateNumber, validatePassword, validateWord } from '@/app/services/helperFunctions/validatorFunctions'
const RegisterComponent = () => {
  const {setVisibleComponent} = useContext(DisplayContext);
  const {register,formState:{errors},getValues,handleSubmit} = useForm<RegisterData>({mode:'all'})
  const onSubmit=(data:RegisterData)=>{
    console.log(data)
  }
  return (
    <>
     <div
  className="absolute top-0 left-0 w-screen min-h-screen flex flex-col justify-center items-center z-10"
  style={{ background: "var(--gradientwithOpacity)" }}
>
  <div className="bg-background w-[400px] p-6 rounded-lg shadow-lg relative">
    {/* Position the icon absolutely within the form */}
 <div className="registerComponentWrapper">
 <FontAwesomeIcon
      icon={faTimes}
      className="text-background bg-helper w-[30px] h-[30px] absolute top-0 right-0 cursor-pointer"
      onClick={()=>setVisibleComponent('')}
    />
    <h2 className="subHeading mb-4">Register</h2>
   <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
   <input
      type="text"
      placeholder="Full Name"
      className="formItem" id='firstName'
      {...register("fullName",{
        validate:(value)=>validateWord("Full Name ", value,3,10)
      })
      }
    />
    {errors.fullName?.message && <SubmitError message={errors.fullName.message}/>}
    <input
      type="email"
      placeholder="Email"
      className="formItem" id='email'
      {...register("email",{
        validate:(value)=>validateEmail("Email" ,value)
      })
      }
    />
    {errors.email?.message && <SubmitError message={errors.email.message}/>}
     <input
      type="text"
      placeholder="Phone NUmber"
      className="formItem" id='phoneNumber'
      {...register("phoneNumber",{
        validate:(value)=>validateNumber("Phone Number",value, 10,10)
      })
      }
    />
    {errors.phoneNumber?.message && <SubmitError message={errors.phoneNumber.message}/>}
    <input
      type="password"
      placeholder="Password"
      className="formItem" id='password'
      {...register("password",{
        validate:(value)=>validatePassword("Password" ,value, 8)
      })
      }
    />
    {errors.password?.message && <SubmitError message={errors.password.message}/>}
    <input
      type="password"
      placeholder="Confirm Password"
      className="formItem" id='confirmPassword'
      {...register("confirmPassword",{
        validate:(value)=>validateConfirmPassword("Confirm Password" ,getValues("password"),value)
      })
      }
    />
    {errors.confirmPassword?.message && <SubmitError message={errors.confirmPassword.message}/>}
    <PrimaryButton searchText="Register" />
   </form>
    <div className="usefulLinks my-2">
    <p className='secondaryHeading'><FontAwesomeIcon icon={faCaretRight} className='mr-2' />Already have an account? <span className='link'>Login</span></p>
    <p className='secondaryHeading'><FontAwesomeIcon icon={faCaretRight} className='mr-2'/>Forget Password ? <span className='link'>Reset Password</span></p>
    </div>
  </div>
  <SocialMediaAuth action="Register"/>
 </div>
</div>
    </>
  )
}
export default RegisterComponent
