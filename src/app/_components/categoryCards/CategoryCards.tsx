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
interface CategoryCardsProps {
  categoryType: "isNewArrivals" | "isTrendingNow" | "isTopSell" | "isOfferItem";
  title: string;
}
const CategoryCards = ({ categoryType, title }: CategoryCardsProps) => {
  const { data: products = [], isPending } = useSpecificCataegory(categoryType);
  return (
    <div className="w-full">
      <div className="container w-full my-2 overflow-hidden">
        <h2 className="subHeading">{title}</h2>
        <div className="w-full px-4 mt-2">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={40}
            autoplay={!isPending ? {
              delay: 6000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            } : false}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
              1536: { slidesPerView: 6 }
            }}
          >
            {isPending ? (
             <div className='container flex justify-between flex-wrap'>
             {[...Array(3)].map((_, i) => (
               <SkeletonSlide key={`skeleton-${i}`} />
             ))}
           </div>
            ) : products.length > 0 ? (
              products.map((product,index) => (
                <SwiperSlide 
                  key={index}
                  className="h-[300px] !flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center h-[300px] relative w-full">
                    <img
                      src={product.image}
                      alt={product.productName}
                      loading="lazy"
                      className="object-cover w-full h-[200px] hover:scale-105 transition-transform duration-100"
                    />
                    <h3 className="mt-4 w-full text-primaryDark text-center">
                      <LinkComponent href={`/singleProduct/id:${product._id}&slug:${product.productName}`} text={product.productName}/>
                    </h3>
                    <p className="price-highlight">
                      $ {product.price}
                    </p>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </Swiper>
          {!isPending && products.length > 0 && (
            <div className="viewMore text-helper items-center text-xl mt-8 flex justify-center">
              <Link
                href={`${config.websiteUrl}/pages/${title.toLowerCase().replace(/\s+/g, "-")}`}
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