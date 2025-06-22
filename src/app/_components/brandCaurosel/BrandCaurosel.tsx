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
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
const BrandCaurosel = () => {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [hoverIndex, setHoverIndex] = useState<null | number>(null)
  const calculateSlidesPerView = () => {
    if (typeof window !== "undefined") {
      const totalWidth = window.innerWidth;
      const availableSpace = Math.floor(totalWidth / 250);
      return availableSpace > 0 ? availableSpace : 1;
    }
    return 1;
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSlidesPerView(calculateSlidesPerView());
      const handleResize = () => {
        setSlidesPerView(calculateSlidesPerView());
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
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
        {brands.map((brand, index) => (
          <SwiperSlide
            className="w-[250px] h-[100px] slideItem cursor-pointer flex-center"
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
          >
            <motion.img
              src={brand.brandImageUrl}
              alt={brand.brandName}
              className="w-[100px] h-[80px] object-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: hoverIndex === index ? 0 : 100,
                opacity: hoverIndex === index ? 1 : 0
              }}
              transition={{ type: "spring", stiffness: 100 }}
              className="bg-helper text-background text-lg inline-flex w-[100px] justify-center"
            >
              <Link href={`/catalog/advanceSearch?keyword=${brand.brandName}`}>
                More Items
              </Link>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
export default BrandCaurosel;