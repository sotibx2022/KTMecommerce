"use client"
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import gsap from 'gsap'
import LimitedOffer from "../../limitedOffer/LimitedOffer";
const slidesData = [
  {
    "title": "Smartphone",
    "description": "Sleek design, 128GB storage.",
    "image_url": "https://cdn.pixabay.com/photo/2016/11/22/23/40/hands-1851218_960_720.jpg"
  },
  {
    "title": "Laptop",
    "description": "Lightweight, 16GB RAM.",
    "image_url": "https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg"
  },
  {
    "title": "Wireless Earbuds",
    "description": "Noise canceling, compact.",
    "image_url": "https://cdn.pixabay.com/photo/2021/06/26/10/44/airpods-6365870_1280.jpg"
  },
  {
    "title": "Smartwatch",
    "description": "Tracks health, stylish design.",
    "image_url": "https://cdn.pixabay.com/photo/2016/03/27/17/21/wristwatch-1283184_1280.jpg"
  },
  {
    "title": "Gaming Console",
    "description": "4K graphics, immersive play.",
    "image_url": "https://cdn.pixabay.com/photo/2024/05/24/16/40/ai-generated-8785422_1280.jpg"
  },
  {
    "title": "Tablet",
    "description": "Work & entertainment on the go.",
    "image_url": "https://cdn.pixabay.com/photo/2020/10/03/12/32/tablet-5623396_1280.jpg"
  },
  {
    "title": "Smart TV",
    "description": "55-inch, 4K UHD streaming.",
    "image_url": "https://cdn.pixabay.com/photo/2015/02/07/20/58/tv-627876_1280.jpg"
  },
]
const Banner = () => {
  const findTitleHeight =()=>{
    const sliderTitle = document.querySelectorAll('.sliderTitle')[0] as HTMLElement;
    return sliderTitle.offsetHeight;
  }
  useEffect(()=>{
    window.addEventListener('resize',findTitleHeight);
    return(()=>{
      window.removeEventListener('resize',findTitleHeight);
    })
  },[])
  const resetTitlePosition = () => {
    const height = findTitleHeight();
    gsap.set(".title1", { y: 0 });
    gsap.set(".title2", { y: `${height}px` });
    gsap.set('.subTitle',{x:'100%'})
  };
  const handleSlideChange = () => {
    const height = findTitleHeight();
    gsap.to(`.title1`, {
      y: `-${height}px`,
      duration: 1,
    });
    gsap.to(`.title2`, {
      y: `-${height}px`,
      duration: 1,
    });
    gsap.to('.subTitle',{
      x:0,
      duration:1,
    })
    resetTitlePosition()
  };
  return (
    <div className="swipperWrapper w-full h-[600px] relative">
      <Swiper
    modules={[ Scrollbar, A11y, Autoplay]} // Load Swiper modules
    spaceBetween={50}
    slidesPerView={1}
    scrollbar={{ draggable: true }}
    onSlideChange={handleSlideChange}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
  >
    {slidesData.map((slide, index) => (
      <SwiperSlide key={index}>
        <div className="slideImage relative ">
          <img src={slide.image_url} alt={`slider${index + 1}`} className="object-cover w-full h-[600px]" />
          <div className="slideOverlay top-0 left-0">
            <div className="absolute top-[10px] left-[10px] w-full p-4 text-white">
              <div className="sliderTitle w-full  md:h-[3rem] h-[2rem] overflow-hidden">
                <h2 className="text-2xl sm:text-3xl md:text-5xl z-10 uppercase title1 font-extrabold">{slide.title}</h2>
                <h2 className="text-2xl sm:text-3xl md:text-5xl z-10 uppercase title2 font-extrabold">{slide.title}</h2>
              </div>
              <p className="text-xl subTitle translate-x-[100%]">{slide.description}</p>
            </div>
          </div>
          <div className="limitedOfferWrapper absolute bottom-[10px] left-1/2 -translate-x-1/2 transform sm:left-auto sm:right-[10px] sm:translate-x-0 w-full sm:max-w-[400px]">
    <LimitedOffer/>
  </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
    </div>
  );
};
export default Banner;