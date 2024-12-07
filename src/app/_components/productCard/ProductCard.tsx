import Link from 'next/link';
import { Product } from '@/app/types/products';
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { truncateText } from '@/app/services/helperFunctions/functions';
const ProductCard: React.FC<Product> = ({ brand, mobileName, mobileDescription, mobileFeatures, price, stockAvailability, variant, url_slug, image, remarks, _id})=>{
    return (
        <div className="border shadow-primaryLight mb-4 flex flex-col items-start w-[300px] h-[400px] p-2 cursor-pointer">
        <div className="imageArea w-full h-[70%] relative">
            <img src={image} alt={mobileName} className="w-full h-full object-cover" />
            <h2 className="absolute bottom-0 w-full text-primaryDark text-lg font-bold bg-white bg-opacity-50 backdrop-blur-md border border-white flex items-center justify-center px-2">
                <span className="secondaryHeading z-10 opacity-100">{mobileName}</span>
            </h2>
        </div>
        <div className="contentArea w-full items-center mt-2 text-background bg-primaryLight p-2">
            <p className="text-md">
                {truncateText(mobileDescription)}
            </p>
            <div className="productDetails flex gap-4">
                <p className="text-background bg-helper p-2 rounded-md">Brand: {brand}</p>
                <p className="text-background bg-helper p-2 rounded-md">Only at ${price}</p>
            </div>
        </div>
    </div>
    );
};
export default ProductCard;