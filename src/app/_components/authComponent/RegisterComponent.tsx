import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import SocialMediaAuth from './SocialMediaAuth'
import { DisplayComponents, DisplayContext } from '@/app/context/DisplayComponents'
const RegisterComponent = () => {
  const {setVisibleComponent} = useContext(DisplayContext);
  return (
    <>
     <div
  className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-10"
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
   <form className='flex flex-col gap-2'>
   <input
      type="text"
      placeholder="First Name"
      className="formItem"
    />
    <input
      type="text"
      placeholder="Last Name"
      className="formItem"
    />
    <input
      type="email"
      placeholder="Email"
      className="formItem"
    />
     <input
      type="number"
      placeholder="Phone NUmber"
      className="formItem"
    />
    <input
      type="password"
      placeholder="Password"
      className="formItem"
    />
    <input
      type="password"
      placeholder="Confirm Password"
      className="formItem"
    />
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
