"use client"
import SearchResults from '@/app/_components/navbar/SearchResults'
import SubmitError from '@/app/_components/submit/SubmitError'
import { SearchContext } from '@/app/context/AdvanceSearchContext'
import { useDebounce } from '@/app/hooks/generalHooks/useDebounce'
import { Button } from '@/components/ui/button'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useRef, useState } from 'react'
const KeywordSearch = () => {
    const router = useRouter()
    const [typesenceLoading, setTypesenceLoading] = useState(true);
    const [searchResults, setSearchResults] = useState([])
    const [searchValue, setsearchValue] = useState("")
    const [searchBarUsed, setSearchBarUsed] = useState(false);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setsearchValue(e.target.value);
        setTypesenceLoading(true);
        setSearchBarUsed(true);
    }
    useDebounce({
        callback: async () => {
            if (!searchBarUsed) return;
            if (searchValue === "") return;
            const response = await axios.post('/api/smartSearch', { searchValue });
            setSearchResults(response.data);
            setTypesenceLoading(false);
            return response.data;
        },
        delay: 300,
        dependencies: [searchValue, searchBarUsed],
    });
    const handleSearch = () => {
            router.push(`/catalog/advanceSearch?highlighted=none&keyword=${searchValue}`)
    }
    return (
        <div className="relative flex flex-col w-full gap-1">
            <div className="relative flex items-center w-full">
                <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="w-full shadow-sm bg-background text-primaryDark placeholder:text-primaryDark border-2 border-helper rounded-lg py-3 pl-8 pr-12 focus:outline-none focus:ring-2 focus:ring-helper focus:border-transparent transition-all"
                    value={searchValue}
                    onChange={handleSearchChange}
                    maxLength={20}
                />
                <FontAwesomeIcon
                    icon={faSearch}
                    className="w-5 h-5 absolute top-1/2 left-[10px] -translate-y-1/2 text-primaryDark"
                />
                <Button
                    onClick={handleSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primaryDark hover:text-helper transition-colors"
                    variant="helper"
                >
                    <ArrowRight className="w-5 h-5" />
                </Button>
            </div>
            {searchBarUsed && <SearchResults results={searchResults} loading={typesenceLoading} />}
        </div>
    )
}
export default KeywordSearch