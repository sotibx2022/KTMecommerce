"use client"
import { IRecentItem } from '@/app/redux/recentSlice'
import { ReduxState } from '@/app/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import SingleRecentProduct from './SIngleRecentProduct'
import NoData from '@/app/_components/noData/NoData'
import { Clock } from 'lucide-react'
const Page = () => {
    const recents = useSelector((state: ReduxState) => state.recent)
    return (
        <div className='container flex flex-col gap-4'>
            {/* Info banner for non-registered users */}
            <div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-3 rounded-md shadow-sm'>
                <p className='text-sm'>
                    Only stored in this browser. Register to save products permanently and add to cart or wishlist.
                </p>
            </div>
            {/* Recent products list */}
            <div className='flex flex-col gap-2'>
                {recents.length === 0 ? (
                    <NoData
                        icon={<Clock />}
                        notFoundMessage="No recently viewed products found."
                    />
                ) : (
                    recents.map((recentItem: IRecentItem, index: number) => (
                        <SingleRecentProduct key={index} productId={recentItem.productId} />
                    ))
                )}
            </div>
        </div>
    )
}
export default Page
