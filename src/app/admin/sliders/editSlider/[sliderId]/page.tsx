import React from 'react'
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