"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent'
const PureSearch = () => {
    const { setVisibleComponent } = useContext(DisplayContext)
    const [searchValue, setSearchValue] = useState('')
    const router = useRouter()
    const handleSearch = () => {
        if (searchValue.trim()) {
            router.push(`/catalog/search?q=${encodeURIComponent(searchValue.trim())}`)
            setVisibleComponent('')
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }
    return (
        <AbsoluteComponent>
            <div className="w-full max-w-md bg-background p-6 rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-primaryDark">Search Products</h2>
                </div>
                <div className="relative flex items-center mb-4">
                    <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="w-full bg-background text-primaryDark placeholder:text-primaryDark/60 border-2 border-primaryDark rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-helper focus:border-transparent transition-all"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <button 
                        onClick={handleSearch}
                        disabled={!searchValue.trim()}
                        className="absolute right-3 text-primaryDark hover:text-helper disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
                    </button>
                </div>
                <button
                    onClick={handleSearch}
                    disabled={!searchValue.trim()}
                    className={`w-full flex items-center justify-center gap-2 bg-primaryDark text-background py-3 px-6 rounded-lg hover:bg-helper transition-colors ${
                        !searchValue.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    Search
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
                <div className="mt-4 text-sm text-primaryDark/70">
                    <p>Try searching for: "laptop", "phone", or "accessories"</p>
                </div>
            </div>
        </AbsoluteComponent>
    )
}
export default PureSearch