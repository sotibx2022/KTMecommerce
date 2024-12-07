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
const slidesData = [
  {
    "title": "Smartphone",
    "description": "Sleek design, 128GB storage.",
    "image_url": "https://picsum.photos/200?random=1"
  },
  {
    "title": "Laptop",
    "description": "Lightweight, 16GB RAM.",
    "image_url": "https://picsum.photos/200?random=2"
  },
  {
    "title": "Wireless Earbuds",
    "description": "Noise canceling, compact.",
    "image_url": "https://picsum.photos/200?random=3"
  },
  {
    "title": "Smartwatch",
    "description": "Tracks health, stylish design.",
    "image_url": "https://picsum.photos/200?random=4"
  },
  {
    "title": "Gaming Console",
    "description": "4K graphics, immersive play.",
    "image_url": "https://picsum.photos/200?random=5"
  },
  {
    "title": "Tablet",
    "description": "Work & entertainment on the go.",
    "image_url": "https://picsum.photos/200?random=6"
  },
  {
    "title": "Bluetooth Speaker",
    "description": "Deep bass, portable.",
    "image_url": "https://picsum.photos/200?random=7"
  },
  {
    "title": "Smart TV",
    "description": "55-inch, 4K UHD streaming.",
    "image_url": "https://picsum.photos/200?random=8"
  },
  {
    "title": "Drone",
    "description": "Compact with HD camera.",
    "image_url": "https://picsum.photos/200?random=9"
  },
  {
    "title": "Gaming Headset",
    "description": "Surround sound, mic included.",
    "image_url": "https://picsum.photos/200?random=10"
  }
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
    <div className="swipperWrapper w-full h-[500px] lg:w-1/2">
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
          <img src={slide.image_url} alt={`slider${index + 1}`} className="object-cover w-full h-[500px]" />
          <div className="slideOverlay top-0 left-0">
            <div className="absolute top-[10px] left-[10px] w-full p-4 text-white">
              <div className="sliderTitle w-full  md:h-[3rem] h-[2rem] overflow-hidden">
                <h2 className="text-2xl sm:text-3xl md:text-5xl z-10 uppercase title1 font-extrabold">{slide.title}</h2>
                <h2 className="text-2xl sm:text-3xl md:text-5xl z-10 uppercase title2 font-extrabold">{slide.title}</h2>
              </div>
              <p className="text-xl subTitle translate-x-[100%]">{slide.description}</p>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
    </div>
  );
};
export default Banner;