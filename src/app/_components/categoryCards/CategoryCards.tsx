import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { IProductDisplay } from "@/app/types/products";
import { config } from "./../../../config/configuration";
import "swiper/css";
import "swiper/css/autoplay";
import Link from "next/link";
import { useSpecificCataegory } from "@/app/hooks/queryHooks/useSpecificCategory";
import LinkComponent from "../linkComponent/LinkComponent";
import SkeletonSlide from "../loadingComponent/SkeletonSlide";
import ProductCard from "../productCard/ProductCard";
interface CategoryCardsProps {
  categoryType: "isNewArrivals" | "isTrendingNow" | "isTopSell" | "isOfferItem";
  title: string;
}
const CategoryCards = ({ categoryType, title }: CategoryCardsProps) => {
  const { data, isPending } = useSpecificCataegory(categoryType, 1, 8);
  const products = isPending ? null : (data ? data.products : []);
  return (
    <div className="w-full">
      <div className="container w-full my-2 overflow-hidden">
        <h2 className="subHeading">{title}</h2>
        <div className="container">
          <Swiper
            className="w-full mt-2"
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={20}
            autoplay={{
              delay: 5000,
            }}
            breakpoints={{
              640: { 
                slidesPerView: 1,
                spaceBetween: 20 
              },
              768: { 
                slidesPerView: 2,
                spaceBetween: 20 
              },
              1024: { 
                slidesPerView: 3,
                spaceBetween: 20 
              },
              1280: { 
                slidesPerView: 3,
                spaceBetween: 20 
              },
              1536: { 
                slidesPerView: 4,
                spaceBetween: 20 
              }
            }}
          >
            {isPending ? (
              <div className='container flex justify-between flex-wrap'>
                {[...Array(3)].map((_, i) => (
                  <SkeletonSlide key={`skeleton-${i}`} />
                ))}
              </div>
            ) : products && products?.length > 0 ? (
              products.map((product, index) => (
                <SwiperSlide
                  key={index}
                  className="my-4 flex justify-center"
                >
                  <div className="group relative w-full max-w-[280px] overflow-hidden rounded-xl bg-background shadow-sm shadow-primaryLight transition-all duration-300 hover:shadow-lg">
                    <Link href={`/singleProduct/id:${product._id}&,slug:${product.url_slug}`}>
                      <div className="relative h-64 w-full overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4"
                          style={{ background: "var(--gradientwithOpacity)" }}>
                          <h2 className="text-background font-bold text-lg">{product.productName}</h2>
                        </div>
                        {product.stockAvailability ? (
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
                          <p className="text-primaryDark font-bold bg-helper p-2 rounded-lg">{product.brand}</p>
                          <p className="price-highlight">
                            ${parseFloat(product.price).toFixed(2)}
                          </p>
                        </div>
                        <p className="mb-3 text-sm text-primaryDark line-clamp-2">
                          {product.productDescription}
                        </p>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </Swiper>
          {!isPending && products && products.length > 0 && (
            <div className="viewMore text-helper items-center text-xl mt-8 flex justify-center">
              <Link
                href={`/pages/${categoryType}`}
                className="flex items-center"
              >
                View More <FontAwesomeIcon icon={faCaretRight} className="ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CategoryCards;