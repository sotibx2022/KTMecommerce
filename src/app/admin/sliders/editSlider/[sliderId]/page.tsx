import React from 'react'
import SingleSliderItem from '../../addSlider/addSliderComponents/SingleSliderItem';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { IDisplaySlideItems } from '@/app/types/sliders';
import EditSliderForm from '../editSliderComponents/EditSliderForm';
interface ISearchParams {
    searchParams: Promise<{ sliderId: string }>
}
const page: React.FC<ISearchParams> = async ({ searchParams: maybeSearchParams }) => {
    const searchParams = await maybeSearchParams;
    const { sliderId } = searchParams;
    return (
        <div>
            <EditSliderForm sliderId={sliderId} />
        </div>
    )
}
export default page