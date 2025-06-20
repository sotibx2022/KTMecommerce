"use client"
import SubmitError from '@/app/_components/submit/SubmitError'
import { SearchContext } from '@/app/context/AdvanceSearchContext'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState, useEffect } from 'react'
const KeywordSearch = () => {
    const { searchValues, setSearchValues } = useContext(SearchContext)
    const [inputValue, setInputValue] = useState(searchValues.keyword)
    const [error, setError] = useState<string | null>(null)
    const [isTyping, setIsTyping] = useState(false)
    useEffect(() => {
        setIsTyping(true)
        setError(null) // Clear error while typing
        const timer = setTimeout(() => {
            setIsTyping(false)
            if (inputValue.length > 0 && inputValue.length < 5) {
                setError('Minimum 5 characters required')
            } else if (inputValue.length > 20) {
                setError('Maximum 20 characters allowed')
            } else {
                setSearchValues(prev => ({ ...prev, keyword: inputValue }))
                setError(null)
            }
        }, 500) 
        return () => clearTimeout(timer)
    }, [inputValue, setSearchValues])
    return (
        <div className="relative flex flex-col w-full gap-1">
            <div className="relative flex items-center w-full">
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full shadow-sm bg-background text-primaryDark placeholder:text-primaryDark border-2 border-helper rounded-lg py-3 pl-8 focus:outline-none focus:ring-2 focus:ring-helper focus:border-transparent transition-all"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    maxLength={20} // Hard limit in the input
                />
                <FontAwesomeIcon 
                    icon={faSearch} 
                    className="w-5 h-5 absolute top-1/2 left-[10px] -translate-y-1/2 text-primaryDark" 
                />
            </div>
            <div className="flex justify-between items-start px-2">
                {error && !isTyping && (
                    <SubmitError message={error}/>
                )
            }
            </div>
        </div>
    )
}
export default KeywordSearch