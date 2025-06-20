"use client"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent'
import CategoriesSelection from '@/app/admin/components/CategoreisSelection'
import AdvanceSearch from '@/app/catalog/[searchValue]/AdvanceSearchMobile'
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
            <AdvanceSearch/>
        </AbsoluteComponent>
    )
}
export default PureSearch