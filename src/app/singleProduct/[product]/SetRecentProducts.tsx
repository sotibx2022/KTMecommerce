"use client"
import { addToRecent, IRecentItem, IRecentState } from '@/app/redux/recentSlice'
import { ReduxState } from '@/app/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const SetRecentProducts: React.FC<{ productId: string }> = ({ productId }) => {
    const recent = useSelector((state: ReduxState) => state.recent)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(addToRecent({ productId }))
    }, [])
    return (
        <div>We store recently viewed product IDs in your browser to improve your browsing experience.</div>
    )
}
export default SetRecentProducts