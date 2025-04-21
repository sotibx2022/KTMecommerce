"use client"
import React, { useEffect } from 'react'
const page = () => {
  useEffect(()=>{
    const url = window.location.href
    console.log(url)
  },[])
  return (
    <div>This Page is to Display Product</div>
  )
}
export default page