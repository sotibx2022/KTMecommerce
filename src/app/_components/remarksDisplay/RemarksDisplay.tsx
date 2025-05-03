import { getSpecificRemarks } from '@/app/services/queryFunctions/remarks';
import { IDisplayReviewDatas } from '@/app/types/remarks';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SingleProductReviews from '../singleProductReviews/SingleProductReviews';
import LoadingComponent from '../loadingComponent/LoadingComponent'; // Make sure to import LoadingComponent
import LoadingContainer from '../loadingComponent/LoadingContainer';
interface IRemarksDisplay {
    productId: string;
}
const RemarksDisplay: React.FC<IRemarksDisplay> = ({ productId }) => {
    const { data: remarks, isPending } = useQuery({
        queryKey: ['specificRemarks', productId],
        queryFn: () => getSpecificRemarks(productId),
        enabled: !!productId
    });
    console.log(remarks)
    return (
        <div>
            <div className='flex flex-wrap gap-4 justify-between items-center'>
                {isPending ? (
                    <LoadingContainer/>
                ) : remarks && Array.isArray(remarks) && remarks.length > 0 ? (
                    remarks.map((remark: IDisplayReviewDatas,index:number) => (
                        <div key={index} className='flex flex-wrap'> {/* Use a more unique key */}
                            <SingleProductReviews {...remark} />
                        </div>
                    ))
                ) : (
                    <p className='text-red-500'>No remarks available</p>
                )}
            </div>
        </div>
    );
};
export default RemarksDisplay;