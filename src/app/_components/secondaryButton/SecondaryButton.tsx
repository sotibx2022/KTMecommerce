import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
interface SecondaryButton{
    text:string,
    icon?:string,
}
const SecondaryButton:React.FC<SecondaryButton> = ({text,icon}) => {
  return (
    <div className='bg-background w-[5rem] h-full flex justify-center items-center relative z-10 group rounded-sm border-[1px] border-primaryDark'>
    <button className='relative z-20'>{text}</button>
    <div className="overLay absolute top-0 left-0 w-0 text-primaryDark rounded-sm h-full bg-helper transition-all duration-500 ease-in-out group-hover:w-full -z-10"></div>
  </div>
  )
}
export default SecondaryButton