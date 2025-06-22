"use client"
import { defaultSearchValues, SearchContext } from '@/app/context/AdvanceSearchContext';
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
const ResetSearchValues = () => {
    const context = useContext(SearchContext);
    const pathName = usePathname()
    console.log(pathName);
    if (!context) {
        throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
    }
    const {searchValues,setSearchValues} = context
    const resetSearchValues=()=>{
      setSearchValues({...defaultSearchValues,loading:true})
    }
    useEffect(()=>{
        if(!pathName.includes('/catelog')){
            resetSearchValues()
        }
    },[pathName])
  return (
    <Button variant="failure" className="gap-2 h-12" onClick={resetSearchValues}>
  <RotateCcw className="w-4 h-4" />
  Reset
</Button>
  )
}
export default ResetSearchValues