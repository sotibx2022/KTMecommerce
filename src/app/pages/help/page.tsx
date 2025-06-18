"use client"
import ProductCard from '@/app/_components/productCard/ProductCard'
import VerticalProductCard from '@/app/_components/productCard/VertivalProductCard'
import AdvanceSearchSkeleton from '@/app/catalog/[searchValue]/AdvanceSearchSkeleton'
import React from 'react'
const page = () => {
  // Common product data
  const productData = {
    productName: 'Premium Wireless Headphones',
    productDescription: 'Experience crystal-clear sound with our premium wireless headphones featuring noise cancellation, 30-hour battery life, and comfortable over-ear design.',
    status: 'active' as const,
    brand: 'AudioMaster',
    price: '199.99',
    stockAvailability: true,
    productFeatures: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Bluetooth 5.0',
      'Built-in microphone',
      'Foldable design'
    ],
    _id: 'prod_123456',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', // Headphone placeholder image
    productId: 'prod_123456',
    quantity: 1,
    userId: 'user_789',
    category: 'electronics',
    variant: 'black',
    url_slug: 'premium-wireless-headphones',
    overallRating: 4.5
  };
  return (
    <div className="p-6 grid gap-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Card Examples</h1>
      <div className="grid gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Standard Product Card</h2>
          <ProductCard {...productData} />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Vertical Product Card</h2>
          <VerticalProductCard {...productData} />
        </section>
      </div>
    </div>
  )
}
export default page