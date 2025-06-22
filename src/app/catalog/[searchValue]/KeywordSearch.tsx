"use client"
import SubmitError from '@/app/_components/submit/SubmitError'
import { SearchContext } from '@/app/context/AdvanceSearchContext'
import { Button } from '@/components/ui/button'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ArrowRight } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { json } from 'stream/consumers'
const KeywordSearch = () => {
    const { searchValues, setSearchValues } = useContext(SearchContext)
    const [inputValue, setInputValue] = useState(searchValues.keyword)
    const[blur,setBlur] = useState(false)
    const [error, setError] = useState<string | null>("")
    const {keyword,...otherSearchValues} = searchValues;
    const previousValues = useRef(otherSearchValues);
    const currentSearchValues = otherSearchValues;
    useEffect(()=>{
        if( JSON.stringify(previousValues.current) !== JSON.stringify(otherSearchValues) ){
            if(inputValue !== searchValues.keyword && inputValue && !error){
              setSearchValues((prev)=>({...prev,keyword:inputValue}))  
            }
        }
        previousValues.current = currentSearchValues
    },[previousValues,currentSearchValues,setSearchValues])
const handleSearchChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value);
    const immediateVlaue = e.target.value
    if(immediateVlaue.length<4){
    setError("Minimum 4 Characters required")
}else if(immediateVlaue.length>20){
    setError("Maximum 20 characters allowded")
}else{
    setError(null)
}
}
const handleSearchBlur=(e:React.FocusEvent<HTMLInputElement>)=>{
setBlur(true)
}
const handleSearch=()=>{
    if(!error){
setSearchValues((prev)=>({...prev,keyword:inputValue}))
    }
}
    return (
        <div className="relative flex flex-col w-full gap-1">
            <div className="relative flex items-center w-full">
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full shadow-sm bg-background text-primaryDark placeholder:text-primaryDark border-2 border-helper rounded-lg py-3 pl-8 pr-12 focus:outline-none focus:ring-2 focus:ring-helper focus:border-transparent transition-all"
                    value={inputValue}
                    onChange={handleSearchChange}
                    maxLength={20}
                    onBlur={handleSearchBlur}
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="w-5 h-5 absolute top-1/2 left-[10px] -translate-y-1/2 text-primaryDark"
                />
                <Button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primaryDark hover:text-helper transition-colors"
                    variant="helper"
                    disabled={error !== null}
                >
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
            <div className="flex justify-between items-start px-2">
                {error && blur &&(
                    <SubmitError message={error} />
                )}
            </div>
        </div>
    )
}
export default KeywordSearch