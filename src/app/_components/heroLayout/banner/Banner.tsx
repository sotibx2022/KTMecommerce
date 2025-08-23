"use client"
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import { Scrollbar, A11y, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import LimitedOffer from "../../limitedOffer/LimitedOffer";
import { useSlidersData } from "@/app/hooks/queryHooks/useSlidersData";
import { IDisplaySlideItems } from "@/app/types/sliders";
import { slidesData } from "@/app/data/slidesData";
const Banner = () => {
  const { data, isPending } = useSlidersData();
  const slidersData = isPending ? slidesData : data;
  return (
    <div className="swipperWrapper w-full h-[500px] relative">
      <Swiper
        modules={[Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {slidersData.map((slide: IDisplaySlideItems, index: number) => (
          <SwiperSlide key={index}>
            <div className="slideImage relative">
              <img
                src={slide.sliderImage}
                alt={`slider${index + 1}`}
                className="object-cover w-full h-[500px]"
              />
              <div className="slideOverlay top-0 left-0">
                <div className="absolute top-[10px] left-[10px] w-full p-4 text-white">
                  <div className="sliderTitle w-full md:h-[3rem] h-[2rem] overflow-hidden">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl z-10 uppercase font-extrabold">
                      {slide.sliderTitle}
                    </h2>
                  </div>
                  <p className="text-xl">{slide.sliderSlogan}</p>
                </div>
              </div>
              <div className="limitedOfferWrapper absolute bottom-[10px] left-1/2 -translate-x-1/2 transform sm:left-auto sm:right-[10px] sm:translate-x-0 w-full sm:max-w-[400px]">
                <LimitedOffer />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Banner;
