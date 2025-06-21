"use client";
const brands = [
    { brandName: "Apple", brandImageUrl: "https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-500x281.png" },
    { brandName: "Dell", brandImageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg" },
    { brandName: "Lenovo", brandImageUrl: "https://1000logos.net/wp-content/uploads/2017/03/Lenovo-Logo-500x281.png" },
    { brandName: "Acer", brandImageUrl: "https://1000logos.net/wp-content/uploads/2016/09/Acer-Logo-500x313.png" },
    { brandName: "HP", brandImageUrl: "https://1000logos.net/wp-content/uploads/2017/02/HP-Log%D0%BE-500x281.png" },
    { brandName: "Samsung", brandImageUrl: "https://logolook.net/wp-content/uploads/2021/06/Samsung-Logo.png" },
    { brandName: "Google", brandImageUrl: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png" },
    { brandName: "Xiaomi", brandImageUrl: "https://seeklogo.com/images/X/xiaomi-logo-7D46D1B2E3-seeklogo.com.png" },
    { brandName: "OnePlus", brandImageUrl: "https://1000logos.net/wp-content/uploads/2022/11/OnePlus-Logo-500x281.png" },
    { brandName: "Oppo", brandImageUrl: "https://1000logos.net/wp-content/uploads/2018/10/Oppo-logo-500x240.png" },
    { brandName: "Redmi", brandImageUrl: "https://xiaomitime.com/wp-content/uploads/2024/11/redmi-logo-2.jpg" },
    { brandName: "Fitbit", brandImageUrl: "https://1000logos.net/wp-content/uploads/2017/09/Fitbit-Logo-500x313.png" },
    { brandName: "Xiaomi Mi", brandImageUrl: "https://images.seeklogo.com/logo-png/26/2/xiaomi-logo-png_seeklogo-268250.png" },
  ];
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import LinkComponent from "../linkComponent/LinkComponent";
const BrandCaurosel = () => {
  const [slidesPerView, setSlidesPerView] = useState(1);
  // Functions to calculate total width and slides per view
  const calculateSlidesPerView = () => {
    if (typeof window !== "undefined") {
      const totalWidth = window.innerWidth;
      const availableSpace = Math.floor(totalWidth / 250);
      return availableSpace > 0 ? availableSpace : 1;
    }
    return 1; // Default for SSR or initial render
  };
  // Handle the screen width change on component mount and resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set initial slides per view based on window width
      setSlidesPerView(calculateSlidesPerView());
      const handleResize = () => {
        setSlidesPerView(calculateSlidesPerView());
      };
      // Add event listener for window resize
      window.addEventListener("resize", handleResize);
      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  // Function to show book details with GSAP animation
  const showBookDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    const parent = event.currentTarget.closest(".slideItem");
    const overlay = parent?.querySelector(".slideOverlay");
    if (overlay) {
      gsap.to(overlay, {
        top: "0%",
        duration: 1,
      });
    }
  };
  // Function to hide book details with GSAP animation
  const hideBookDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
    const parent = event.currentTarget.closest(".slideItem");
    const overlay = parent?.querySelector(".slideOverlay");
    if (overlay) {
      gsap.to(overlay, {
        top: "100%",
        duration: 1,
      });
    }
  };
  return (
    <section className="container">
      <div className="sectionHeading">
        <h2 className="subHeading">Top Brands</h2>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={50}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        className="h-[200px] w-full swiperWrapper"
      >
        {brands.map((brand,index) => (
          <SwiperSlide className="w-[250px] slideItem relative h-full flex-center" key={index}>
           <img 
  src={brand.brandImageUrl} 
  alt={brand.brandName} 
  className="absolute top-1/2 left-1/2 w-[100px] h-auto transform -translate-x-1/2 -translate-y-1/2 transition-transform"
/><div>
</div>
            <button
              className="absolute bottom-0 left-1/2 text-2xl text-white bg-helper py-1 px-2 z-10"
              onClick={showBookDetails}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </button>
            <div className="slideOverlay absolute top-[100%] overflow-hidden left-0 flex flex-col pl-4 pt-8 justify-center items-center">
              <button
                className="absolute top-0 left-1/2 text-2xl text-white bg-helper py-1 px-2"
                onClick={hideBookDetails}
              >
                <FontAwesomeIcon icon={faArrowDown} />
              </button>
              <h2 className="text-3xl text-white mb-2">{brand.brandName}</h2>
              <Link href={`/catalog/advanceSearch?keyword=${brand.brandName}`} className="secondaryButton">Show Products</Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default BrandCaurosel;