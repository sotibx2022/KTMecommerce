import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";
import { useSpecificCataegory } from "@/app/hooks/queryHooks/useSpecificCategory";
import SkeletonSlide from "../loadingComponent/SkeletonSlide";
interface CategoryCardsProps {
  categoryType: "isNewArrival" | "isTrendingNow" | "isTopSell" | "isOfferItem";
  title: string;
}
const CategoryCards = ({ categoryType, title }: CategoryCardsProps) => {
  const productResponse = useSpecificCataegory(categoryType, 1, 8);
  const products = productResponse.data?.success ? productResponse.data.data?.products : [];
  return (
    <div className="w-full px-4 container overflow-hidden">
      <div className="container mx-auto my-6">
        <h2 className="subHeading">{title}</h2>
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              centeredSlides: false
            }
          }}
          className="!overflow-visible"
        >
          {productResponse.isPending ? (
            <div className="flex my-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <SwiperSlide key={`skeleton-${i}`}
                 className="!w-[280px] my-4">
                  <SkeletonSlide />
                </SwiperSlide>
              ))}
            </div>
          ) : products && products?.length > 0 ? (
            products.map((product) => (
              <SwiperSlide
                key={product._id}
                className="!w-[280px] my-4"
              >
                <div className="group relative w-full h-full overflow-hidden rounded-xl bg-background shadow-sm shadow-primaryLight transition-all duration-300 hover:shadow-lg">
                  <Link href={`/singleProduct/productIdentifier?id=${product._id}&slug=${product.url_slug}`}>
                    <div className="relative h-64 w-full overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-white font-bold text-lg">{product.productName}</h3>
                      </div>
                      <span className={`absolute top-3 right-3 rounded-full px-2 py-1 text-xs font-semibold text-white ${product.stockAvailability ? 'bg-green-500' : 'bg-red-500'
                        }`}>
                        {product.stockAvailability ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-primaryDark font-bold bg-helper px-2 py-1 rounded-lg">
                          {product.brand}
                        </span>
                        <span className="price-highlight">
                          ${parseFloat(product.price).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-primaryDark line-clamp-2">
                        {product.productDescription}
                      </p>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <div className="w-full py-12 text-center">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </Swiper>
        {!productResponse.isPending && products && products.length > 0 && (
          <div className="mt-8 text-center link">
            <Link
              href={`/catalog/advanceSearch?${categoryType}=true`}
              className="inline-flex items-center text-primary hover:text-primaryDark transition-colors"
            >
              View More <FontAwesomeIcon icon={faCaretRight} className="ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default CategoryCards;