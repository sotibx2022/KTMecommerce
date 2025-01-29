import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";
import { SpecificProducts } from "@/app/services/apiFunctions/productsQuery";
import { IProductDisplay } from "@/app/types/products";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import {config} from './../../../config/configuration'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import LinkComponent from "../linkComponent/LinkComponent";
const CategoryCards = () => {
  // Add unique query keys for each query
  const { data: newArrivals = [], isPending } = useQuery({ 
    queryKey: ['newArrivals'], 
    queryFn: () => SpecificProducts('isNewArrivals') 
  });
  const { data: trendingItems = [] } = useQuery({ 
    queryKey: ['trendingItems'], 
    queryFn: () => SpecificProducts('isTrendingNow') 
  });
  const { data: topSells = [] } = useQuery({ 
    queryKey: ['topSells'], 
    queryFn: () => SpecificProducts('isTopSell') 
  });
  const { data: offerItems = [] } = useQuery({ 
    queryKey: ['offerItems'], 
    queryFn: () => SpecificProducts('isOfferItem') 
  });
  interface ICardData {
    title: string,
    products: IProductDisplay[]
  }
  const cardDatas: ICardData[] = [
    { title: "New Arrivals", products: newArrivals },
    { title: "Trending Now", products: trendingItems },
    { title: "Top Sell", products: topSells },
    { title: "Offer Item", products: offerItems }
  ];
  return (
    <div className="space-y-8">
      {isPending ? (
        <LoadingComponent />
      ) : (
        <div className="flex-center flex-wrap gap-1 w-[600px]">
          {cardDatas.map((card: ICardData, index: number) => (
          <div key={index} className="mb-8 w-[290px]">
           <div className="bg-helper text-xl text-primaryDark p-1 flex justify-between">
           <LinkComponent href={`${config.websiteUrl}/pages/${card.title.toLowerCase().replace(/\s+/g, '-')}`} text= {card.title}>
           </LinkComponent>
           <FontAwesomeIcon icon={faCaretRight}/>
           </div>
            <div className="relative h-[150px]">
              <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{ 
                  delay: 3000, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
              >
                {card.products?.map((product: IProductDisplay, i) => (
                  <SwiperSlide key={i}> {/* Slide height */}
                    <div className="flex flex-col items-center justify-center h-full relative">
                      <img 
                        src={product.image} 
                        alt={product.productName} 
                        className="w-full h-auto max-h-[150px] object-fit mb-4"
                      />
                      <h3 className="absolute top-0 left-0 w-full h-[30px] bg-primaryDark text-background">
                        {product.productName}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};
export default CategoryCards;