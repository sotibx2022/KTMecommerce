"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import { toPng } from 'html-to-image';
import { faFacebookSquare, faInstagram, faTwitterSquare, faWhatsappSquare } from "@fortawesome/free-brands-svg-icons";
import dynamic from "next/dynamic";
import { IProductDisplay } from "@/app/types/products";
import { AbsoluteComponent } from "../absoluteComponent/AbsoluteComponent";
const ProductImage: React.FC<IProductDisplay> = ({ ...cartItemDetails }) => {
    const [clientSide, setClientSide] = useState<boolean>(false);
    useEffect(() => {
        setClientSide(true)
    }, [])
    const handleShare = (mediaName: string) => { }
    const downloadImage = async (name: string) => {
        if (!clientSide) return;
        if (typeof document !== "undefined") {
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
        price,
        _id,
        image,
    } = cartItemDetails;
    return (
        <AbsoluteComponent>
            <section id='snapshot-container' className=" relative max-w-[600px] overflow-hidden rounded-lg shadow-lg bg-background">
                {/* Product Image with overlay */}
                <div className="relative h-64 w-full">
                    <img
                        src={image}
                        className="w-full h-full object-cover"
                        alt={productName}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primaryDark opacity-80"></div>
                    {/* Product Info - positioned within image area */}
                    <div className="absolute bottom-0 left-0 w-full p-4">
                        {/* Product Name */}
                        <h1 className="text-2xl font-bold text-background mb-2 drop-shadow-md">
                            {productName}
                        </h1>
                        {/* Price and Brand */}
                        <div className="flex justify-between items-center">
                            <p className="price-highlight">${price}</p>
                        </div>
                    </div>
                </div>
                {/* Available at section - now properly separated below the image */}
                <div className="flex flex-col items-center border-t-2 border-helper">
                    <img
                        src="../assets/brand/logo.png"
                        className="h-10 object-contain"
                        alt="Store logo"
                    />
                </div>
            </section>
            {/* Social Actions */}
            {clientSide && (
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => downloadImage(productName)}
                        className="social-icon  text-primaryDark p-3  bg-transparent hover:bg-primaryDark hover:text-background transition-all duration-300 transform hover:scale-110"
                        aria-label="Download"
                    >
                        <FontAwesomeIcon icon={faDownload} size="lg" className="text-background" />
                    </button>
                    <button
                        onClick={() => handleShare("facebook")}
                        className="social-icon bg-helper text-primaryDark p-3  hover:bg-[#1877F2] hover:text-background transition-all duration-300 transform hover:scale-110"
                        aria-label="Share on Facebook"
                    >
                        <FontAwesomeIcon icon={faFacebookSquare} size="lg" className="text-background" />
                    </button>
                    <button
                        onClick={() => handleShare("twitter")}
                        className="social-icon bg-helper text-primaryDark p-3 rounded-full hover:bg-[#1DA1F2] hover:text-background transition-all duration-300 transform hover:scale-110"
                        aria-label="Share on Twitter"
                    >
                        <FontAwesomeIcon icon={faTwitterSquare} size="lg" className="text-background" />
                    </button>
                    <button
                        onClick={() => handleShare("instagram")}
                        className="social-icon bg-helper text-primaryDark p-3  hover:bg-[#E4405F] hover:text-background transition-all duration-300 transform hover:scale-110"
                        aria-label="Share on Instagram"
                    >
                        <FontAwesomeIcon icon={faInstagram} size="lg" className="text-background" />
                    </button>
                    <button
                        onClick={() => handleShare("whatsapp")}
                        className="social-icon bg-helper text-primaryDark p-3  hover:bg-[#25D366] hover:text-background transition-all duration-300 transform hover:scale-110"
                        aria-label="Share on WhatsApp"
                    >
                        <FontAwesomeIcon icon={faWhatsappSquare} size="lg" className="text-background" />
                    </button>
                </div>
            )}
        </AbsoluteComponent>
    );
};
export default ProductImage;