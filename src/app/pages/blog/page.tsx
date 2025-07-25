"use client"
import PageHeader from '@/app/_components/pageHeader/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ChevronRight, Search, PenSquare } from 'lucide-react';
import { useState } from 'react';
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}
const BlogPage = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "10 Tips for Secure Online Shopping in Nepal",
      excerpt: "Learn how to protect yourself while shopping online with these essential security practices.",
      author: "Ramesh Shrestha",
      date: "May 15, 2023",
      readTime: "5 min read",
      category: "Security",
      image: "/assets/blog-security.jpg"
    },
    {
      id: 2,
      title: "The Future of E-commerce in Kathmandu Valley",
      excerpt: "How digital transformation is changing shopping behaviors in the capital city.",
      author: "Sunita Gurung",
      date: "April 28, 2023",
      readTime: "8 min read",
      category: "Trends",
      image: "/assets/blog-trends.jpg"
    },
    {
      id: 3,
      title: "How to Choose the Right Payment Method for Your Purchase",
      excerpt: "Comparing COD, mobile payments, and credit cards for your online shopping needs.",
      author: "Amit Kumar",
      date: "April 10, 2023",
      readTime: "6 min read",
      category: "Payments",
      image: "/assets/blog-payments.jpg"
    },
    {
      id: 4,
      title: "Sustainable Packaging Initiatives at Ecommerce KTM",
      excerpt: "How we're reducing our environmental impact with eco-friendly packaging solutions.",
      author: "Priya Sharma",
      date: "March 22, 2023",
      readTime: "4 min read",
      category: "Sustainability",
      image: "/assets/blog-sustainability.jpg"
    },
    {
      id: 5,
      title: "Maximizing Your Budget During Festival Seasons",
      excerpt: "Smart shopping strategies for Dashain and Tihar celebrations.",
      author: "Bikram Thapa",
      date: "March 5, 2023",
      readTime: "7 min read",
      category: "Shopping Tips",
      image: "/assets/blog-festival.jpg"
    },
    {
      id: 6,
      title: "Behind the Scenes: Our Delivery Network",
      excerpt: "How we ensure timely deliveries across Nepal's diverse geography.",
      author: "Nabin Rai",
      date: "February 18, 2023",
      readTime: "9 min read",
      category: "Operations",
      image: "/assets/blog-delivery.jpg"
    }
  ];
  const categories = [
    "All",
    "Trends",
    "Security",
    "Payments",
    "Shopping Tips",
    "Sustainability"
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);
  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
      <PageHeader
        headerText="Our Blog"
        icon={PenSquare}
        headerTagline="Explore insights, stories, and updates from the world of EcommerceKTM."
      />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Search Bar */}
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${activeCategory === category
                    ? 'bg-primaryDark text-white'
                    : 'bg-white text-primaryDark border border-primaryLight hover:bg-primaryLight/10'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-primaryLight hover:shadow-md transition-shadow">
              {/* Blog Image */}
              <div className="aspect-video bg-primaryLight/10 flex items-center justify-center">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-primaryLight">Blog Image: {post.title}</span>
                </div>
              </div>
              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Badge variant={'default'}>
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-xs text-primaryLight">
                    <Calendar className="w-3 h-3 mr-1" />
                    {post.date}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-primaryDark mb-2">{post.title}</h2>
                <p className="text-primaryLight mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm text-primaryLight">
                    <User className="w-4 h-4 mr-1" />
                    {post.author}
                    <Clock className="w-4 h-4 ml-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        {/* Newsletter */}
        <div className="mt-16 bg-primaryLight/10 rounded-lg p-8 border border-primaryLight">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-primaryDark mb-2">Stay Updated</h2>
            <p className="text-primaryLight mb-6">
              Subscribe to our newsletter for the latest blog posts and ecommerce insights
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 py-2 px-4 border border-primaryLight rounded-lg focus:outline-none focus:ring-2 focus:ring-helper"
              />
              <button className="bg-helper text-primaryDark font-medium py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPage;