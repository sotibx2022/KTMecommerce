"use client";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IBrand, useBrands } from "@/app/hooks/queryHooks/useBrands";
import BrandItemSkeleton from "./BrandItemSkeleton";
const BrandCaurosel = () => {
  const { data: brands, isPending } = useBrands()
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [hoverIndex, setHoverIndex] = useState<null | number>(null)
  const calculateSlidesPerView = () => {
    if (typeof window !== "undefined") {
      const totalWidth = window.innerWidth;
      const availableSpace = Math.floor(totalWidth / 150);
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
        className="w-full swiperWrapper"
      >
        {isPending
          ? Array.from({ length: slidesPerView }).map((_, index) => (
            <SwiperSlide key={index}>
              <BrandItemSkeleton />
            </SwiperSlide>
          ))
          : brands?.map((brand: IBrand, index: number) => (
            <SwiperSlide
              className="w-auto h-[80px] slideItem cursor-pointer flex-center"
              key={index}
              onMouseEnter={() => setHoverIndex(index)}
            >
              <motion.img
                src={brand.brandImageUrl}
                alt={brand.brandName}
                className="w-auto h-[80px] object-center"
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