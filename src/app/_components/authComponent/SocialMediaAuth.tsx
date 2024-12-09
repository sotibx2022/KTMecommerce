import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
interface AuthAction{
    action:string
}
const SocialMediaAuth:React.FC<AuthAction> = ({action}) => {
  return (
    <div className="socialMediaAuth">
    <h2 className='secondaryHeading text-center my-4'>Or, {action} With</h2>
    <div className="flex justify-center items-center  gap-4">
      {/* Facebook Button */}
      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-100 transition">
        <FontAwesomeIcon
          icon={faFacebookF}
          className="text-blue-600 w-5 h-5"
        />
        <span className="text-blue-600 font-medium">Facebook</span>
      </button>
      {/* Google Button */}
      <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-red-100 transition">
        <FontAwesomeIcon
          icon={faGoogle}
          className="text-red-500 w-5 h-5"
        />
        <span className="text-red-500 font-medium">Google</span>
      </button>
    </div>
    </div>
  )
}
export default SocialMediaAuth