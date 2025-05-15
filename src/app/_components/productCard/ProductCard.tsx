import Link from 'next/link';
import { truncateText } from '@/app/services/helperFunctions/functions';
import DisplaySingleProductRating from '../singleProductReviews/DisplaySingleProductRating';
import { IProductDisplay } from '@/app/types/products';
import ProductCardAction from './ProductCardAction';
import Image from 'next/image';
const ProductCard: React.FC<IProductDisplay> = ({
  brand,
  productName,
  productDescription,
  productFeatures,
  price,
  stockAvailability,
  variant,
  url_slug,
  image,
  _id,
  overallRating
}) => {
  return (
    <div className="group relative w-full max-w-[280px] overflow-hidden rounded-xl bg-background shadow-sm shadow-primaryLight transition-all duration-300 hover:shadow-lg">
      <Link href={`/singleProduct/id:${_id}&,slug:${url_slug}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={image}
            alt={productName}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0  p-4"
          style={{ background: "var(--gradientwithOpacity)" }}>
            <h2 className="text-background font-bold text-lg">{productName}</h2>
          </div>
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
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-primaryDark font-bold bg-helper p-2 rounded-lg">{brand}</p>
            <p className="price-highlight">
              ${parseFloat(price).toFixed(2)}
            </p>
          </div>
          <p className="mb-3 text-sm text-primaryDark line-clamp-2">
            {productDescription}
          </p>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;