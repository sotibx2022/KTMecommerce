"use client"
import ConfettiComponent from '@/app/_components/submit/ConfettiComponent'
import { TableRowSkleton } from '@/app/admin/components/TableRowSkleton'
import React from 'react'
import { toast, Toaster } from 'sonner'
const page = () => {
  const testAlert=() =>{
    toast("Hello!", {
  className:"successToast"
});
  }
  return (
    <div>
      <button onClick={testAlert}>Test alert</button>
      <Toaster/>
    </div>
  )
}
export default page