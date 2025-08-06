"use client"
import React, { useState } from 'react'
import SliderTableSkeleton from '../admin/sliders/slidersComponents/SliderTableSkeleton'
import SecondaryButton from '../_components/secondaryButton/SecondaryButton'
import axios from 'axios'
const page = () => {
    const[query,setQuery] = useState("");
    const handleSmartSearch=async () =>{
const response = await axios.post('/api/smartSearch',{query});
console.log(response);
console.log(response.data);
return response.data;
    }
    return (
        <div>
            <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)}/>
            <SecondaryButton text={'Find'} onClick={handleSmartSearch}/>
        </div>
    )
}
export default page