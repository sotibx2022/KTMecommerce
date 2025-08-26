"use client"
import { IRecentItem } from '@/app/redux/recentSlice'
import { ReduxState } from '@/app/redux/store'
import React from 'react'
import { useSelector } from 'react-redux'
import SingleRecentProduct from './SIngleRecentProduct'
import NoData from '@/app/_components/noData/NoData'
import { Clock } from 'lucide-react'
import PageHeader from '@/app/_components/pageHeader/PageHeader'
const Page = () => {
    const recents = useSelector((state: ReduxState) => state.recent)
    return (
        <div className='container flex flex-col gap-4'>
            {/* Info banner for non-registered users */}
            <PageHeader headerText={'Recently Visited Products'} headerTagline={'Only stored in this browser. Register to save products permanently and add to cart or wishlist.'} icon={Clock}/>
            {/* Recent products list */}
            <div className='gridCards'>
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
