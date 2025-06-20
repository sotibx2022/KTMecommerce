"use client";
import React, {useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { toPng } from 'html-to-image';
import { faFacebookSquare, faInstagram, faTwitterSquare, faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import dynamic from "next/dynamic";
import { IProductDisplay } from "@/app/types/products";
import { AbsoluteComponent } from "../absoluteComponent/AbsoluteComponent";
const DisplaySingleProductRating = dynamic(
    () => import('../singleProductReviews/DisplaySingleProductRating'),
    { 
      ssr: false, // Disable server-side rendering
      loading: () => <p>Loading rating...</p> // Optional loading fallback
    }
  );
const ProductImage: React.FC<IProductDisplay> = ({ ...cartItemDetails }) => {
    const[clientSide, setClientSide] = useState<boolean>(false);
    useEffect(()=>{
        setClientSide(true)
    },[])
const handleShare =(mediaName:string) =>{}
const downloadImage = async (name: string) => {
    if(!clientSide) return;
    if(typeof document !== "undefined"){
        const element: HTMLElement | null = document.getElementById('snapshot-container') as HTMLElement;
        const dataUrl = await toPng(element);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${name}.png`;
    link.click();
    }
};
    const {
        productName,
        productDescription,
        brand,
        price,
        stockAvailability,
        productFeatures,
        _id, 
        image,
        overallRating
    } = cartItemDetails;
    return (
           <AbsoluteComponent>
             <div id="snapshot-container" className="p-4 gap-4 bg-primaryDark max-w-[600px]   overflow-hidden">
                <div className="text-white p-2 flex flex-col"
                style={{ background: "var(--gradientwithOpacity)" }}>
                    <h1 className="text-white text-xl font-bold">
                        {productName}
                    </h1>
                    <div className="wrapper flex-col  flex justify-between items-center ">
                    <div className="w-full">
                            <div className="overallRatingArea my-2">
                                <DisplaySingleProductRating rating={overallRating} />
                            </div>
                            <p className="text-white">{productDescription}</p>
                            <div className="productDetails flex items-center gap-4 my-2">
                                <p className="text-background bg-helper p-2 rounded-md">Brand: {brand}</p>
                                <h3
                                    className={`text-background p-2 rounded-md ${stockAvailability ? "bg-green-500" : "bg-red-500"
                                        }`}
                                >
                                    {stockAvailability ? "In Stock" : "Out of Stock"}
                                </h3>
                                <p className="price-highlight">${price}</p>
                            </div>
                            <h2 className="text-white text-2xl">Features</h2>
                            <ul className="primaryList">
                                {productFeatures &&
                                    productFeatures.map((feature: string, index: number) => (
                                        <li key={index} className="text-primaryDark flex items-center gap-1 text-white">
                                            <FontAwesomeIcon icon={faCaretRight} className="mr-2" size="2x" />
                                            <p>{feature}</p>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                            <div className="productLogoArea flex justify-center items-center">
                                <img src="../assets/brand/logo.png" />
                            </div>
            </div>
          {clientSide &&  <div className="imageActions flex justify-center gap-2 mt-2">
            <FontAwesomeIcon 
  icon={faDownload}
  className="social-icon text-green-600 hover:text-green-800"
  onClick={()=>downloadImage(productName)}
/>
<FontAwesomeIcon 
  icon={faFacebookSquare}
  className="social-icon text-blue-600 hover:text-blue-800"
  onClick={() => handleShare("facebook")}
/>
<FontAwesomeIcon 
  icon={faTwitterSquare}
  className="social-icon text-blue-400 hover:text-blue-600"
  onClick={() => handleShare("twitter")}
/>
<FontAwesomeIcon 
  icon={faInstagram}
  className="social-icon text-pink-500 hover:text-pink-700"
  onClick={() => handleShare("instagram")}
/>
<FontAwesomeIcon 
  icon={faWhatsappSquare}
  className="social-icon text-green-500 hover:text-green-700"
  onClick={() => handleShare("whatsapp")}
/>
           </div>}
           </AbsoluteComponent>
    );
};
export default ProductImage;
