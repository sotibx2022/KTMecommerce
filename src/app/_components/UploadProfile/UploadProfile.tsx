"use client"
import { faCamera } from '@fortawesome/free-solid-svg-icons'
const dummyImageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAACUCAMAAAD1XwjBAAAAMFBMVEXk5ueutLeqsLPN0NLn6eqzuLvq7O3g4uPX2tu3vL/Jzc+9wcTa3d7U19nGyszDx8mYkf2tAAAEMUlEQVR4nO2c27KrIAyGFSIHEX3/t91Ij2vXVg7RhBm/u1505g+QQDCh6y4uLi4uLi6egFKdniK6Uwqo9WShlPaztXaIWOtmr4M9jaD0PPQfWNm1MQveCvEpv++FsJ5a2x6g5bAp/m7CIDXjOYBO2h/qowVhDrhaAMbtqF8N6N3E0wCQG167xTCyDEUuTX1cRPwM0P3+2nkZMGhqvf8xpYu/rSFeTmASl/4Ly8mAfPmsDNAF8gPUsh9Amfx+4DEBam/P/YZwHAwAWSg/IOkNAFOsnkcUTd92PxGOWj3ICvkB6oxgKow9DwZi/RXOGxHELlw5/MEASv0wVg4/8QRArfqedhc21cMf8GQGKIsgv3dkyZjGkB82YSL5tXvXAyoPhpqjwwuxEOnXKMs/ZGI0yTz46s3rxmBIJgBr+feCJoLCghH9V/0jhfxO47jv6sAkDjAhuS+RA0Pt0f8FyW0ieCz5fU+xA1/6nwhz6b/0X/pb1d96/KHRj3d+oPmah3Z+o0pgGj9/tn7+R8u/iG6wWs9/0e4fHFExgWr8/qf1+7fW7z+bv3+Gxu//m//+UlM7cEeMpB8g2/7+iPD9l3b4q/dgS6q+/fqHyvqThVp9SCMr9HOo4Wu8/mo9hpYaQHdy+ENx/SEP+aX1n4xqoEvqbznU7j3JN4Aq6d0mO4qyGv1IXv0/vyaYnGoOJoHzL+n9Lyy2rU+S+o/C4LPy3Hdg7b37LZ5z/1fXev/djZb7H1dA6XkjK7NjI/2nAQXaz87dGoCtdWv/L7Qi/gaEwdaTCUw6/mgLAFBvQCujv6oGbYwfx2Vxd5ZFeh/b4DnPQxjjuOw3d+EYkQbrpO4YzsUqaPLLIMR26HwPoqJ3o9H3PzEAVj+VUftv6e9GrDZMHEISdJMM0T4/gxdiWKShnYSwU42uRPzTBDcboDpLA/htX81isKOmsAC68ddJLQt39qEuuOyc7q67hJPdmRVMwWcXRPU3E5w/aRIAzFLssr8ssPKMaAT6EPUR54/eEQBGtKrnTQumQ2MRYs3YF479HoZVsfTLgP4wPzalje6ZFhyU449niI8GHPBCDeBVGyYYYCWyG6uSG/4aZlQDFEqhSQ6ob0MglGnkG2DxvPg0z/1rAJYXz+ePPqIB6oRN6wsDwhIilL++DlFrgKp/YaCG2vIazCaFIiofSMHrESxlrpGvi0sz8Kgor0Sr8K+iuEwCPAf55WUqwEJ+8QspcHSumEzRNkYeOl+UnUVPTFj2KIhBeN05CBR0mJyZL+6TPQFMYuedgnfWGOy8b4jcHpOJlfzsHiUgyrm+IjLHn1rv/2S+8XL6fckuWacgpM46TLIWkGI3/HkLiFn0iSzpC4jV2eGBTR9/hss/q1wdp68RmZyCb/Jbhy3S0zD6W5Mt5lT9YNYyI3akH4EmyZGc4ldgSIb8dvgHCaZCuwDAQsoAAAAASUVORK5CYII=";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { profile } from 'console';
import React, { useState } from 'react'
interface UploadProfileProps{
  profileImageURL:(file:File)=>void;
  imageFromDb?:string
}
const UploadProfile:React.FC<UploadProfileProps> = ({profileImageURL,imageFromDb}) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the first file if exists
        if (file) {
          setImageUrl(URL.createObjectURL(file));
          profileImageURL(file)
        }
      };
      const handleCameraClick = () => {
        document.getElementById("fileInput")?.click(); // Trigger file input click
      };
  return (
    <div className="profileImageArea relative w-[200px] h-[200px]">
    <img
      src={imageUrl !== null?imageUrl:(imageFromDb?imageFromDb:dummyImageUrl)}
      alt="Profile"
      className="object-cover rounded-lg w-full h-full"
    />
    <input type="file" id="fileInput" className="formItem hidden" onChange={handleFileChange} />
    <div className='uploadIcon absolute bottom-[2%] right-[2%] w-[50px] h-[50px] rounded-full cursor-pointer bg-primaryDark flex justify-center items-center'>
      <FontAwesomeIcon
      icon={faCamera}
      className='text-white'
      size='lg'
      onClick={handleCameraClick}
    />
    </div>
  </div>
  )
}
export default UploadProfile