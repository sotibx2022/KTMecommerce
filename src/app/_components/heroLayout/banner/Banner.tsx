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
    "image_url": "https://images.unsplash.com/photo-1592890288564-76628a30a657?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "title": "Laptop",
    "description": "Lightweight, 16GB RAM.",
    "image_url": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8bGFwdG9wfGVufDB8fDB8fHww"
  },
  {
    "title": "Wireless Earbuds",
    "description": "Noise canceling, compact.",
    "image_url": "https://images.unsplash.com/photo-1577864663715-47341a4f300b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFdpcmVsZXNzJTIwRWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "title": "Smartwatch",
    "description": "Tracks health, stylish design.",
    "image_url": "https://plus.unsplash.com/premium_photo-1681147547346-2d73c90988d8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "title": "Gaming Console",
    "description": "4K graphics, immersive play.",
    "image_url": "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2FtaW5nJTIwQ29uc29sZXxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "title": "Tablet",
    "description": "Work & entertainment on the go.",
    "image_url": "https://images.unsplash.com/photo-1648737966636-2fc3a5fffc8a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8dGFibGV0fGVufDB8fDB8fHww"
  },
  {
    "title": "Bluetooth Speaker",
    "description": "Deep bass, portable.",
    "image_url": "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZXRvb3RoJTIwc3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "title": "Smart TV",
    "description": "55-inch, 4K UHD streaming.",
    "image_url": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "title": "Drone",
    "description": "Compact with HD camera.",
    "image_url": "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmV8ZW58MHx8MHx8fDA%3D"
  },
  {
    "title": "Gaming Headset",
    "description": "Surround sound, mic included.",
    "image_url": "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R2FtaW5nJTIwSGVhZHNldHxlbnwwfHwwfHx8MA%3D%3D"
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
    <div className="swipperWrapper w-1/2 h-[400px] lg:w-1/2">
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