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
      {isPending ? (
        <LoadingContainer />
      ) : (
        <div className="container w-full my-2 overflow-hidden">
            <h2 className="subHeading">{title}</h2>
          <div className="w-full px-4 mt-2">
            {products.length > 0 && (
              <Swiper
                modules={[Autoplay]}
                slidesPerView="auto"
                spaceBetween={20}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  640: { // sm
                    slidesPerView: 2,
                  },
                  768: { // md
                    slidesPerView: 3,
                  },
                  1024: { // lg
                    slidesPerView: 4,
                  },
                  1280: { // xl
                    slidesPerView: 6,
                  },
                  1536: { // 2xl
                    slidesPerView: 8,
                  }
                }}
              >
                {products.map((product, i) => (
                  <SwiperSlide 
                    key={i}
                    className="!h-auto !flex items-center justify-center"
                  >
                    <div className="flex flex-col items-center justify-center h-full relative w-full border-2 border-helper bg-primaryLight rounded-lg shadow-helper">
                      <img
                        src={product.image}
                        alt={product.productName}
                        className="inline rounded-lg"
                      />
                      <h3 className=" top-[10px] left-0 w-full h-[30px]  text-background"
                      style={{ background: "var(--gradientwithOpacity)" }}>
                        <Link
                          href={`${config.websiteUrl}/singleProduct/id:${product._id}&,slug:${product.productName}`}
                          className="pl-[10px] line-clamp-1"
                        >
                          {product.productName}
                        </Link>
                      </h3>
                      <p className="text-helper font-bold text-lg  bottom-[10px] left-0 w-full h-[30px] text-center" style={{ background: "var(--gradientwithOpacity)" }}>$ {product.price}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <div className="viewMore text-helper items-center text-xl  my-2 flex justify-center">
  <LinkComponent 
    text="View More"
    href={`${config.websiteUrl}/pages/${title.toLowerCase().replace(/\s+/g, "-")}`}
  />
</div>
        </div>
      )}
    </div>
  );
};
export default CategoryCards;