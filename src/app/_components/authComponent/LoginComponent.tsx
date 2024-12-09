import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
const LoginComponent = () => {
  return (
    <>
     <div
  className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-10"
  style={{ background: "var(--gradientwithOpacity)" }}
>
  <form className="bg-background w-[400px] p-6 rounded-lg shadow-lg relative">
    {/* Position the icon absolutely within the form */}
    <FontAwesomeIcon
      icon={faTimes}
      className="text-background bg-helper w-[30px] h-[30px] absolute top-0 right-0 cursor-pointer"
    />
    <h2 className="subHeading mb-4">Login</h2>
    <input
      type="email"
      placeholder="Email"
      className="formItem mb-3 p-2 w-full border border-gray-300 rounded"
    />
    <input
      type="password"
      placeholder="Password"
      className="formItem mb-3 p-2 w-full border border-gray-300 rounded"
    />
    <PrimaryButton searchText="Login" />
    <div className="usefulLinks my-2">
    <p className='secondaryHeading'><FontAwesomeIcon icon={faCaretRight} className='mr-2' />Don't have an account? <span className='link'>Sign up</span></p>
    <p className='secondaryHeading'><FontAwesomeIcon icon={faCaretRight} className='mr-2'/>Forget Password ? <span className='link'>Reset Password</span></p>
    </div>
  </form>
</div>
    </>
  )
}
export default LoginComponent
