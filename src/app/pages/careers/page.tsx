import React from 'react';
const HomePage = () => {
  // Sample product data
  const featuredProducts = [
    { id: 1, name: 'Premium Watch', price: 299, description: 'Elegant timepiece with modern design' },
    { id: 2, name: 'Wireless Headphones', price: 199, description: 'Noise-canceling premium sound' },
    { id: 3, name: 'Designer Bag', price: 499, description: 'Luxury leather accessory' },
  ];
  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Fashion' },
    { id: 3, name: 'Home & Living' },
    { id: 4, name: 'Beauty' },
  ];
  return (
    <div className="bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-indigo-600">SHOPLY</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">New Arrivals</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Categories</a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 transition">Sale</a>
            </div>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <img 
          src="https://picsum.photos/1920/1080?random=1" 
          className="w-full h-full object-cover absolute inset-0" 
          alt="Hero" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="text-white max-w-2xl">
            <h2 className="text-5xl font-bold mb-6">New Season Collection</h2>
            <p className="text-xl mb-8">Discover our curated selection of premium products</p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-12">Featured Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      {/* Categories Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Shop by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      {/* Promotion Banner */}
      <PromotionBanner />
      {/* Newsletter Section */}
      <NewsletterSection />
      {/* Footer */}
      <Footer />
    </div>
  );
};
// Reusable Components
const ProductCard = ({ product }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
    <div className="h-80 relative">
      <img
        src={`https://picsum.photos/400/500?random=${product.id + 10}`}
        className="w-full h-full object-cover hover:scale-105 transition-transform"
        alt={product.name}
      />
      <button className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg hover:bg-indigo-600 hover:text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
    </div>
    <div className="p-6">
      <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-2xl font-bold text-indigo-600">${product.price}</p>
    </div>
  </div>
);
const CategoryCard = ({ category }) => (
  <a href="#" className="group relative block h-64 rounded-xl overflow-hidden">
    <img
      src={`https://picsum.photos/300/400?random=${category.id + 20}`}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
      alt={category.name}
    />
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
      <h4 className="text-white text-2xl font-bold">{category.name}</h4>
    </div>
  </a>
);
const PromotionBanner = () => (
  <div className="relative h-96 my-16">
    <img
      src="https://picsum.photos/1920/800?random=4"
      className="w-full h-full object-cover absolute inset-0"
      alt="Sale"
    />
    <div className="absolute inset-0 bg-indigo-600/60 flex items-center justify-center">
      <div className="text-center text-white">
        <h3 className="text-4xl font-bold mb-4">Summer Sale</h3>
        <p className="text-xl mb-8">Up to 50% off selected items</p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-full hover:bg-gray-100 transition">
          Explore Offers
        </button>
      </div>
    </div>
  </div>
);
const NewsletterSection = () => (
  <section className="py-16 bg-gray-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 className="text-3xl font-bold mb-4">Join Our Newsletter</h3>
      <p className="text-gray-400 mb-8">Get 10% off your first order</p>
      <div className="max-w-md mx-auto flex gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 rounded-full px-6 py-3 text-gray-900"
        />
        <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition">
          Subscribe
        </button>
      </div>
    </div>
  </section>
);
const Footer = () => (
  <footer className="bg-gray-800 text-white py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h5 className="text-xl font-bold mb-4">SHOPLY</h5>
        <p className="text-gray-400">Premium e-commerce experience</p>
      </div>
      <div>
        <h6 className="font-bold mb-4">Company</h6>
        <ul className="space-y-2 text-gray-400">
          <li><a href="#" className="hover:text-white transition">About</a></li>
          <li><a href="#" className="hover:text-white transition">Careers</a></li>
          <li><a href="#" className="hover:text-white transition">Contact</a></li>
        </ul>
      </div>
      {/* Add more footer columns as needed */}
    </div>
  </footer>
);
export default HomePage;