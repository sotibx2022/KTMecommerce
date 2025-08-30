import Link from 'next/link';
import { truncateText } from '@/app/services/helperFunctions/functions';
import DisplaySingleProductRating from '../singleProductReviews/DisplaySingleProductRating';
import { IProductDisplay } from '@/app/types/products';
import ProductCardAction from './ProductCardAction';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import ProductTitle from './ProductTitle';
import { Rupee } from './Rupee';
const ProductCard: React.FC<IProductDisplay> = ({
  brand,
  productName,
  categoryName,
  productDescription,
  price,
  stockAvailability,
  url_slug,
  image,
  _id,
  overallRating,
  isNewArrivals,
  isTrendingNow,
  isTopSell,
  isOfferItem,
}) => {
  return (
    <div className="group w-full max-w-[280px] overflow-hidden rounded-xl bg-background shadow-sm shadow-primaryLight transition-all duration-300 hover:shadow-lg">
      <Link href={`/singleProduct/productIdentifier?id=${_id}&slug=${url_slug}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={image}
            alt={productName}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
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
        <ProductTitle productName={productName} productHighlight={{
          isNewArrivals,
          isTrendingNow,
          isTopSell,
          isOfferItem
        }} />
        <p className="mb-3 text-sm text-primaryDark line-clamp-2 p-2">
          {truncateText(productDescription)}
        </p>
        <div>
          <div className="mb-2 flex items-center justify-center gap-2">
            <p className="text-primaryDark font-bold bg-helper p-2 rounded-lg">{categoryName}</p>
            <p className="text-primaryDark font-bold bg-helper p-2 rounded-lg">{brand}</p>
          </div>
          <p className="price-highlight my-2">
            <Rupee price={price}/>
          </p>
          <div className="productRatingArea flex justify-center items-center mb-2">
            <DisplaySingleProductRating rating={overallRating} />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;