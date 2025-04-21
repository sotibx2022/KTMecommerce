"use client";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faDownload, faTimes } from "@fortawesome/free-solid-svg-icons";
import SocialMediaSharing from "../socialMedia/SocialMediaSharing";
import { IProductImage } from "@/app/pages/contact/page";
import logoImage from '../../../../public/assets/brand/logo.png'
import { toPng } from 'html-to-image';
import { faFacebookSquare, faInstagram, faTwitterSquare, faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import { config } from "@/config/configuration";
import dynamic from "next/dynamic";
import { DisplayContext } from "@/app/context/DisplayComponents";
const DisplaySingleProductRating = dynamic(
    () => import('../singleProductReviews/DisplaySingleProductRating'),
    { 
      ssr: false, // Disable server-side rendering
      loading: () => <p>Loading rating...</p> // Optional loading fallback
    }
  );
const ProductImage: React.FC<IProductImage> = ({ ...cartItemDetails }) => {
    const {setVisibleComponent} = useContext(DisplayContext);
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
        _id, // _id is received as a string
        image,
        overallRating
    } = cartItemDetails;
    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center z-10"
            style={{ background: "var(--gradientwithOpacity)" }}>
            <div id="snapshot-container" className="p-4 gap-4 bg-background max-w-[800px] border-2 border-helper relative overflow-hidden">
                <FontAwesomeIcon
                              icon={faTimes}
                              className="text-background bg-helper w-[30px] h-[30px] absolute top-0 right-0 cursor-pointer"
                onClick={()=>setVisibleComponent('')}
                            />
                <div className="p-4 gap-4  bg-background border-2 border-helper">
                    <h1 className="subHeading">
                        {productName}
                    </h1>
                    <div className="wrapper flex-col md:flex-row flex justify-between items-center">
                    <div className="singleProductLeft w-2/3">
                            <div className="overallRatingArea my-2">
                                <DisplaySingleProductRating rating={overallRating} />
                            </div>
                            <p className="primaryParagraph">{productDescription}</p>
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
                            <h2 className="text-primaryLight text-2xl">Features</h2>
                            <ul className="primaryList">
                                {productFeatures &&
                                    productFeatures.map((feature: string, index: number) => (
                                        <li key={index} className="text-primaryDark flex items-center gap-1">
                                            <FontAwesomeIcon icon={faCaretRight} className="mr-2" size="2x" />
                                            <p>{feature}</p>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="w-1/3">
                            <img src={image} alt={productName} className="w-full rounded-lg" />
                            <img src="../assets/brand/logo.png" />
                        </div>
                    </div>
                </div>
            </div>
          {clientSide &&  <div className="imageActions flex justify-center gap-2 mt-2">
            <FontAwesomeIcon 
  icon={faDownload}
  className="social-icon text-green-600 hover:text-green-800"
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
        </div>
    );
};
export default ProductImage;
