"use client"
import ConfettiComponent from '@/app/_components/submit/ConfettiComponent'
import { TableRowSkleton } from '@/app/admin/components/TableRowSkleton'
import React from 'react'
const page = () => {
  return (
    <div>
      <TableRowSkleton rowNumber={10}/>
    </div>
  )
}
export default page