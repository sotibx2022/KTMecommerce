"use client"
import React, { useContext, useState } from 'react'
import PrimaryButton from '../primaryButton/PrimaryButton'
import { useRouter } from 'next/navigation'
import IconButton from '../iconText/IconButton'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const PureSearch = () => {
    const {setVisibleComponent} = useContext(DisplayContext)
    const[searchValue,setSearchValue] = useState('')
    const router = useRouter();
    const handleSearch = () => {
        if (searchValue) {
          router.push(`/catalog/keyword=${searchValue}`);
        }
      };
  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex-center z-10'   style={{ background: "var(--gradientwithOpacity)" }}>
        <div className="searchArea flex  flex-col items-start gap-4 bg-primaryLight p-8 relative min-h-[200px]">
        <input
          type='text'
          placeholder='Search the product'
          className='min-w-[300px] bg-primaryLight text-primaryDark placeholder:text-primaryDark border-b-2 border-primaryDark border-solid focus:outline-none focus:placeholder-opacity-0 p-2'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <PrimaryButton searchText='Search' onClick={handleSearch} />
         <FontAwesomeIcon
                     icon={faTimes}
                     className="text-background bg-helper w-[30px] h-[30px] absolute top-0 right-0 cursor-pointer"
       onClick={()=>setVisibleComponent('')}
                   />
      </div>
    </div>
  )
}
export default PureSearch