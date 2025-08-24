import Link from 'next/link';
import { truncateText } from '@/app/services/helperFunctions/functions';
import DisplaySingleProductRating from '../singleProductReviews/DisplaySingleProductRating';
import { IProductDisplay } from '@/app/types/products';
import ProductCardAction from './ProductCardAction';
import Image from 'next/image';
const VerticalProductCard: React.FC<IProductDisplay> = ({
    brand,
    productName,
    categoryName,
    productDescription,
    price,
    stockAvailability,
    url_slug,
    image,
    _id,
    overallRating
}) => {
    return (
        <div className="group relative w-full overflow-hidden rounded-xl bg-background shadow-sm shadow-primaryLight transition-all duration-300 hover:shadow-lg">
            <Link href={`/singleProduct/productIdentifier?id=${_id}&slug=${url_slug}`}>
                <div className="w-full overflow-hidden flex justify-between">
                    <div className="productImage relative w-[20vw]">
                        <img
                            src={image}
                            alt={productName}
                            className="relative object-cover transition-transform duration-500 group-hover:scale-105 max-h-[200px] w-full"
                            loading="lazy"
                        />
                        {stockAvailability ? (
                            <span className="absolute top-3 right-3 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white">
                                In Stock
                            </span>
                        ) : (
                            <span className="absolute top-3 right-3 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                                Out of Stock
                            </span>
                        )}
                    </div>
                    <div className="productDetails p-4 flex flex-col w-[40vw] border-2 border-transparent border-dotted border-r-helper justify-center text-wrap">
                        <div className="productTitle p-2 rounded-lg"
                            style={{ background: "var(--gradientwithOpacity)" }}>
                            <h2 className="text-background font-bold text-lg">{productName}</h2>
                        </div>
                        <div className="productDescription">{truncateText(productDescription)}</div>
                        <div className="productRating">
                        <DisplaySingleProductRating rating={overallRating} />
                    </div>
                    </div>
                    <div className="flex justify-center items-center flex-col gap-4 px-2 w-[10vw]">
                        <p className="text-primaryDark font-bold bg-helper p-2 rounded-lg">{categoryName}</p>
                        <p className="text-primaryDark font-bold bg-helper p-2 rounded-lg">{brand}</p>
                    </div>
                    <div className="flex justify-center items-center w-[10vw]">
                        <p className="price-highlight">
                            ${parseFloat(price).toFixed(2)}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
export default VerticalProductCard;