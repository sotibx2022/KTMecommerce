"use client"
import React, { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import { Scrollbar, A11y, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import gsap from 'gsap';
import LimitedOffer from "../../limitedOffer/LimitedOffer";
import { useSlidersData } from "@/app/hooks/queryHooks/useSlidersData";
import { IDisplaySlideItems } from "@/app/types/sliders";
import { slidesData } from "@/app/data/slidesData";
const Banner = () => {
  const { data, isPending } = useSlidersData();
  const slidersData = isPending ? slidesData : data;
  // Find slider title height
  const findTitleHeight = useCallback(() => {
    const sliderTitle = document.querySelector('.sliderTitle') as HTMLElement;
    return sliderTitle ? sliderTitle.offsetHeight : 0;
  }, []);
  // Reset title/subtitle positions
  const resetTitlePosition = useCallback(() => {
    const height = findTitleHeight();
    gsap.set(".title1", { y: 0 });
    gsap.set(".title2", { y: `${height}px` });
    gsap.set('.subTitle', { x: '100%' });
  }, [findTitleHeight]);
  // Smooth slide animation using GSAP timeline
  const handleSlideChange = () => {
    const height = findTitleHeight();
    const tl = gsap.timeline({
      onComplete: resetTitlePosition
    });
    tl.to(".title1", { y: `-${height}px`, duration: 1 })
      .to(".title2", { y: `-${height}px`, duration: 1 }, 0) // run simultaneously
      .to(".subTitle", { x: 0, duration: 1 }, 0);
  };
  // Throttle resize events for performance
  useEffect(() => {
    const handleResize = () => requestAnimationFrame(resetTitlePosition);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [resetTitlePosition]);
  // Initial position setup
  useEffect(() => {
    resetTitlePosition();
  }, [resetTitlePosition]);
  return (
    <div className="swipperWrapper w-full h-[500px] relative">
      <Swiper
        modules={[Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        onSlideChange={handleSlideChange}
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
                    <h2 className="text-2xl sm:text-3xl md:text-5xl z-10 uppercase title1 font-extrabold">
                      {slide.sliderTitle}
                    </h2>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl z-10 uppercase title2 font-extrabold">
                      {slide.sliderTitle}
                    </h2>
                  </div>
                  <p className="text-xl subTitle translate-x-[100%]">
                    {slide.sliderSlogan}
                  </p>
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
