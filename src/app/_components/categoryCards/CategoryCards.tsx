import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { SpecificProducts } from "@/app/services/apiFunctions/productsQuery";
import { IProductDisplay } from "@/app/types/products";
import { config } from "./../../../config/configuration";
import "swiper/css";
import "swiper/css/autoplay";
import LinkComponent from "../linkComponent/LinkComponent";
import Link from "next/link";
import LoadingContainer from "../loadingComponent/LoadingContainer";
interface CategoryCardsProps {
  categoryType: "isNewArrivals" | "isTrendingNow" | "isTopSell" | "isOfferItem";
  title: string;
}
const CategoryCards = ({ categoryType, title }: CategoryCardsProps) => {
  const { data: products = [], isPending } = useQuery<IProductDisplay[]>({
    queryKey: [categoryType],
    queryFn: () => SpecificProducts(categoryType),
  });
  const imageWidth = 250; // Minimum width for each slide
  return (
    <div className="w-full">
      <div className="container w-full my-2 overflow-hidden">
        <h2 className="subHeading">{title}</h2>
        <div className="w-full px-4 mt-2">
          {isPending ? (
            <LoadingContainer />
          ) : products.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              spaceBetween={40}
              autoplay={{
                delay: 6000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { // sm
                  slidesPerView: 1,
                },
                768: { // md
                  slidesPerView: 1,
                },
                1024: { // lg
                  slidesPerView: 2,
                },
                1280: { // xl
                  slidesPerView: 3,
                },
                1536: { // 2xl
                  slidesPerView: 4,
                }
              }}
            >
              {products.map((product, i) => (
                <SwiperSlide 
                  key={i}
                  className="h-[300px] !flex items-center justify-center"
                >
                  <div className="flex flex-col items-center justify-center h-[300px] relative w-full">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="inline object-fit w-full h-[300px] hover:scale-105 transition-transform duration-100"
                    />
                    <h3 className="top-[10px] left-0 w-full h-[30px] text-primaryDark text-center">
                      <Link
                        href={`${config.websiteUrl}/singleProduct/id:${product._id}&,slug:${product.productName}`}
                        className="pl-[10px] line-clamp-1"
                      >
                        {product.productName}
                      </Link>
                    </h3>
                    <p className="text-helper font-bold text-lg bottom-[10px] left-0 w-full h-[30px] text-center bg-primaryDark">
                      $ {product.price}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
              <div className="viewMore text-helper items-center text-xl mt-8 flex justify-center">
          <LinkComponent 
            text="View More ➔"
            href={`${config.websiteUrl}/pages/${title.toLowerCase().replace(/\s+/g, "-")}`}
          />
        </div>
            </Swiper>
          ) : (
            <div className="text-center py-4">No products found</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CategoryCards;