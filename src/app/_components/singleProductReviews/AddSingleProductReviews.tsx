import dynamic from 'next/dynamic';  // Import dynamic from next/dynamic
import PrimaryButton from '../primaryButton/PrimaryButton';
const AddSingleProductRating = dynamic(() => import('./AddSingleProductRating'), { ssr: false }); // Disable SSR for this component
const AddSingleProductReviews = () => {
  return (
    <div className='w-full lg:w-1/2 flex flex-col gap-2'>
        <h1 className='text-lg font-semibold text-primaryDark'>Add Review</h1>
        <input type='text' placeholder='FullName' className='formItem'/>
        <input type='text' placeholder='email' className='formItem'/>
        <textarea placeholder="Product Review.....Maximum 100 words" className="formItem"/>
        <AddSingleProductRating/> {/* This will now only be rendered on the client-side */}
        <PrimaryButton searchText='Add'/>
    </div>
  );
};
export default AddSingleProductReviews;
