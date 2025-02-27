import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { SpecificProducts } from "@/app/services/apiFunctions/productsQuery";
import { IProductDisplay } from "@/app/types/products";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import { config } from "./../../../config/configuration";
import "swiper/css";
import "swiper/css/autoplay";
import LinkComponent from "../linkComponent/LinkComponent";
const CategoryCards = () => {
  const { data: newArrivals = [], isPending } = useQuery({
    queryKey: ["newArrivals"],
    queryFn: () => SpecificProducts("isNewArrivals"),
  });
  const { data: trendingItems = [] } = useQuery({
    queryKey: ["trendingItems"],
    queryFn: () => SpecificProducts("isTrendingNow"),
  });
  const { data: topSells = [] } = useQuery({
    queryKey: ["topSells"],
    queryFn: () => SpecificProducts("isTopSell"),
  });
  const { data: offerItems = [] } = useQuery({
    queryKey: ["offerItems"],
    queryFn: () => SpecificProducts("isOfferItem"),
  });
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const [imagesPerRow,setImagesPerRow] = useState(1)
  const imageWidth = 250; 
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setImagesPerRow(Math.floor(window.innerWidth / imageWidth));
      };
      window.addEventListener("resize", handleResize);
      // Initial set to ensure correct value on first render
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [imageWidth]); // Dependency on imageWidth to recalculate when it changes
    const cardDatas = [
    { title: "New Arrivals", products: newArrivals },
    { title: "Trending Now", products: trendingItems },
    { title: "Top Sell", products: topSells },
    { title: "Offer Item", products: offerItems },
  ];
  return (
    <div>
      {isPending ? (
        <LoadingComponent />
      ) : (
        <div className="flex flex-wrap gap-4 w-full min-h-[500px] h-full">
          {cardDatas.map((card, index) => (
            <div
              key={index}
              className="mb-8 mx-2"
              style={{
                width: `${imageWidth}px`,
              }}
            >
              <div className="bg-helper text-xl text-primaryDark p-1 flex justify-between w-full z-10">
                <LinkComponent
                  href={`${config.websiteUrl}/pages/${card.title.toLowerCase().replace(/\s+/g, "-")}`}
                  text={card.title}
                />
                <FontAwesomeIcon icon={faCaretRight} />
              </div>
              <div className="relative h-[150px]">
                <Swiper
                  modules={[Autoplay]}
                  slidesPerView={1}
                  spaceBetween={30}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                >
                  {card.products?.map((product:IProductDisplay, i:number) => (
                    <SwiperSlide key={i}>
                      <div className="flex flex-col items-center justify-center h-full relative">
                        <img
                          src={product.image}
                          alt={product.productName}
                          className="max-w-[250px] w-full max-h-[200px]"
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
