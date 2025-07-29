import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
const SlidersPageHeader = () => {
    return (
        <div className='flex justify-between items-center my-4'>
            <h2 className='subHeading'>HomePage Sliders</h2>
            <Link href='/admin/sliders/addSlider'> <Button
                variant="success"
                size="default"
                className="gap-2"
                aria-label="Add product"
            >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Slider</span>
            </Button></Link>
        </div>
    )
}
export default SlidersPageHeader