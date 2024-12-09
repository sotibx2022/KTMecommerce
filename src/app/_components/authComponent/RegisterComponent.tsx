import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import React from 'react'
const RegisterComponent = () => {
  return (
    <>
    <NavBar/>
    <div className='container flex justify-start items-center'>
      <form className="form flex flex-col gap-2">
        <h2 className='subHeading'>Register</h2>
<input type='email' placeholder='Email' className='formItem'/>
<input type='password' placeholder='Password' className='formItem'/>
<PrimaryButton searchText='Register'/>
      </form>
    </div>
    <Footer/>
    </>
  )
}
export default RegisterComponent