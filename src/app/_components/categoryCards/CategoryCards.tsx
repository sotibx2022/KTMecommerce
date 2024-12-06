import React from 'react'
import SecondaryButton from '../secondaryButton/SecondaryButton';
import Link from 'next/link';
interface CardData {
    title: string; // The category or feature the product belongs to (e.g., New Arrivals, Trending Now).
    product_name: string; // The name of the product.
    product_description: string; // A brief description of the product.
    price: number; // The price of the product.
    image_url: string; // URL for the product image.
  }
const cardDatas= [
    {
      "title": "New Arrivals",
      "product_name": "Wireless Charging Pad",
      "product_description": "Fast and sleek wireless charger for Qi-enabled devices.",
      "price": 29.99,
      "image_url": "https://picsum.photos/id/101/200/200"
    },
    {
      "title": "Trending Now",
      "product_name": "Noise-Cancelling Headphones",
      "product_description": "Premium over-ear headphones with superior sound isolation.",
      "price": 199.99,
      "image_url": "https://picsum.photos/id/102/200/200"
    },
    {
      "title": "Top Sell",
      "product_name": "Fitness Tracker",
      "product_description": "Waterproof tracker with heart rate monitoring.",
      "price": 89.99,
      "image_url": "https://picsum.photos/id/103/200/200"
    },
    {
      "title": "Offer Item",
      "product_name": "Smartwatch",
      "product_description": "Stylish smartwatch with fitness and health tracking.",
      "price": 149.99,
      "image_url": "https://picsum.photos/id/104/200/200"
    }
  ]
const CategoryCards = () => {
  return (
    <div className="flex flex-wrap w-1/2">
    {cardDatas.map((card: CardData, index: number) => (
      <div key={index} className="w-1/2 h-1/2 relative">
         <img className="object-cover w-full h-full " src={card.image_url} alt={card.product_name} />
         <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] bg-helper py-1 text-center">{card.title}</h2>
         <div className="cardContent absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-[40px] bg-background p-4 flex-center border-r-2 border-helper">
        <h3 className="secondaryHeading ">{card.product_name}</h3>
        </div>
        </div>
    ))}
  </div>
  )
}
export default CategoryCards