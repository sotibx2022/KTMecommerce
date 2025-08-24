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
        <></>
    )
}
export default SetRecentProducts