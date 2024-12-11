import Link from 'next/link';
import { Product } from '@/app/types/products';
import SecondaryButton from '../secondaryButton/SecondaryButton';
import { truncateText } from '@/app/services/helperFunctions/functions';
const ProductCard: React.FC<Product> = ({ brand, productName, productDescription, productFeatures, price, stockAvailability, variant, url_slug, image, remarks, _id})=>{
    return (
        <Link href={`/singleProduct/id:${_id}&,slug:${url_slug}`}>
        <div className="border shadow-primaryLight mb-4 flex flex-col items-start w-[300px] h-[400px] p-2 cursor-pointer">
        <div className="imageArea w-full h-[70%] relative">
            <img src={image} alt={productName} className="w-full h-full object-cover" />
            <h2 className="absolute bottom-0 w-full text-primaryDark text-lg font-bold bg-white bg-opacity-50 backdrop-blur-md border border-white flex items-center justify-center px-2">
                <span className="secondaryHeading z-10 opacity-100">{productName}</span>
            </h2>
        </div>
        <div className="contentArea w-full items-center mt-2 text-background bg-primaryLight p-2">
            <p className="text-md">
                {truncateText(productDescription)}
            </p>
            <div className="productDetails flex gap-2">
                <p className="text-background bg-primaryDark p-2  rounded-md flex items-center">Brand: {brand}</p>
                <p className="price-highlight">
  ${price}
</p>
            </div>
        </div>
    </div></Link>
    );
};
export default ProductCard;
