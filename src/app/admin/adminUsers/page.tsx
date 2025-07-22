import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import AddAdmin from './AddAdmin'
import ListAdmin from './ListAdmin'
const page = () => {
    return (
        <div className='w-full px-4 flex flex-col md:flex-row gap-4 my-4'>
            <AddAdmin />
            <ListAdmin/>
        </div>
    )
}
export default page