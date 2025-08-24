"use client"
import { IRecentItem } from '@/app/redux/recentSlice'
import { ReduxState } from '@/app/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import SIngleRecentProduct from './SIngleRecentProduct'
const Page = () => {
    const recents = useSelector((state: ReduxState) => state.recent)
    return (
        <div>
            {recents.length === 0 ? (
                <h2>No items available</h2>
            ) : (
                recents.map((recentItem: IRecentItem, index: number) => (
                   <SIngleRecentProduct productId={recentItem.productId}/>
                ))
            )}
        </div>
    )
}
export default Page
