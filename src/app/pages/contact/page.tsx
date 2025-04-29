// src/components/LandingPage.jsx
import React from "react";
const LandingPage = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover the Future of Shopping
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            Unique products. Unmatched prices. Delivered to your doorstep.
          </p>
          <a
            href="#products"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700 transition"
          >
            Shop Now
          </a>
        </div>
        <img
          src="https://picsum.photos/1200/400"
          alt="Hero Banner"
          className="w-full object-cover h-64 md:h-96"
        />
      </section>
      {/* Featured Products */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div
                key={id}
                className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={`https://picsum.photos/id/${id + 10}/400/300`}
                  alt={`Product ${id}`}
                  className="rounded-md w-full h-48 object-cover mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Product Title {id}</h3>
                <p className="text-gray-600 mb-3">Short product description goes here.</p>
                <span className="block font-bold text-blue-600 mb-3">$19.99</span>
                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Style?</h2>
        <p className="mb-6 text-lg">Join thousands of happy customers today.</p>
        <a
          href="#"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </section>
    </div>
  );
};
export default LandingPage;
