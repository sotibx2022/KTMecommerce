"use client"
import { addToRecent } from '@/app/redux/recentSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
const SetRecentProducts: React.FC<{ productId: string }> = ({ productId }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(addToRecent({ productId }))
    }, [])
    return (
        <div>We store recently viewed product IDs in your browser to improve your browsing experience.</div>
    )
}
export default SetRecentProducts