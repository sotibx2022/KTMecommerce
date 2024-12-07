import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';
interface CardData {
  title: string;
  image_url: string;
  products: string[];
}
const cardDatas: CardData[] = [
  {
    title: "New Arrivals",
    image_url: "https://picsum.photos/id/101/200/200",
    products: [
      "Apple iPhone 15 Pro Max",
      "Dell XPS 13 Plus (12th Gen Intel Core)",
      "Samsung Galaxy Watch 6 Classic",
      "Sony WF-1000XM5 Wireless Earbuds",
    ],
  },
  {
    title: "Trending Now",
    image_url: "https://picsum.photos/id/102/200/200",
    products: [
      "Sony PlayStation 5",
      "DJI Mini 3 Pro Drone",
      "Meta Quest 3 VR Headset",
      "Apple iPad Pro 12.9-inch (M2 Chip)",
    ],
  },
  {
    title: "Top Sell",
    image_url: "https://picsum.photos/id/103/200/200",
    products: [
      "LG C3 OLED 55-inch 4K TV",
      "JBL Charge 5 Bluetooth Speaker",
      "Asus ROG Zephyrus G14 Gaming Laptop",
      "Kindle Paperwhite Signature Edition",
    ],
  },
  {
    title: "Offer Item",
    image_url: "https://picsum.photos/id/104/200/200",
    products: [
      "Anker PowerCore 26800mAh Portable Charger",
      "Bose QuietComfort 45 Noise-Cancelling Headphones",
      "Fitbit Charge 6 Fitness Tracker",
      "Ring Stick Up Cam Battery (3rd Gen)",
    ],
  },
];
const CategoryCards = () => {
  return (
    <div className="flex flex-wrap w-1/2">
      {cardDatas.map((card, index) => (
        <div key={index} className="w-1/2 h-1/2 relative">
          <img
            className="object-cover w-full h-full"
            src={card.image_url}
            alt={card.title}
          />
          <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] bg-helper py-1 text-center flex gap-1 justify-center items-center cursor-pointer hover:underline hover:text-white hover:bg-opacity-80 transition-opacity duration-300">
            {card.title}
            <FontAwesomeIcon icon={faCaretRight} />
          </h2>
          <div className="cardContent absolute bottom-0 left-0  bg-background border-r-2 border-b-2 border-helper h-[30px] w-full p-1 overflow-hidden">
          <Swiper modules={[Autoplay]} // Load Swiper modules
    slidesPerView={1}
    autoplay={{ delay: 3000, disableOnInteraction: false }}>
             {card.products.map((product, i) => (
             
                <SwiperSlide key={i}>
                  <div className="flex items-center gap-2">
                  <h2 className="text-primaryDark cursor-pointer hover:underline hover:font-bold transition-all duration-300 font-normal">{product}</h2>
                  <FontAwesomeIcon icon={faCaretRight} className="text-primaryDark" />
                  </div>
                  </SwiperSlide>
              
              ))}
             </Swiper>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CategoryCards;
