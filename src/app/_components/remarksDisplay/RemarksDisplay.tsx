import { IRemarksBase } from '@/app/types/remarks';
import React from 'react';
import SingleProductReviews from '../singleProductReviews/SingleProductReviews';
interface IRemarksDisplayProps{
    remarks:IRemarksBase[]
}
const RemarksDisplay: React.FC<IRemarksDisplayProps> = ({ remarks }) => {
  return (
    <div>
      <div className='flex flex-wrap gap-4 justify-between items-center'>
        {remarks && Array.isArray(remarks) && remarks.length > 0 ? (
          remarks.map((remark: IRemarksBase,index:number) => (
            <div key={index} className='flex flex-wrap'>
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