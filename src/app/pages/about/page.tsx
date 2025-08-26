import PageHeader from '@/app/_components/pageHeader/PageHeader';
import { Users, Globe, Award, Shield, Truck, Heart, Mail, BookOpen } from 'lucide-react';
import Link from 'next/link';
const AboutPage = () => {
  const stats = [
    { value: "1,000+", label: "Happy Customers" },
    { value: "50+", label: "Local Sellers" },
    { value: "100%", label: "Secure Payments" },
    { value: "24/7", label: "Customer Support" }
  ];
  const values = [
    {
      icon: <Globe className="w-8 h-8 text-helper" />,
      title: "Local Focus",
      description: "We prioritize Nepali businesses and products to boost our local economy"
    },
    {
      icon: <Award className="w-8 h-8 text-helper" />,
      title: "Quality First",
      description: "Every product is carefully vetted to meet our high standards"
    },
    {
      icon: <Shield className="w-8 h-8 text-helper" />,
      title: "Secure Shopping",
      description: "Your safety is our priority with encrypted transactions"
    },
    {
      icon: <Truck className="w-8 h-8 text-helper" />,
      title: "Reliable Delivery",
      description: "Timely shipping across Nepal's diverse geography"
    },
    {
      icon: <Users className="w-8 h-8 text-helper" />,
      title: "Community Driven",
      description: "We grow by supporting local entrepreneurs"
    },
    {
      icon: <Heart className="w-8 h-8 text-helper" />,
      title: "Customer Love",
      description: "Your satisfaction is at the heart of everything we do"
    }
  ];
  const team = [
    {
      name: "Ramesh Shrestha",
      role: "Founder & CEO",
      bio: "Tech entrepreneur with 10+ years in ecommerce solutions",
      image: "/assets/team-ramesh.jpg"
    },
    {
      name: "Sunita Gurung",
      role: "Operations Director",
      bio: "Logistics expert specializing in Nepal's unique challenges",
      image: "/assets/team-sunita.jpg"
    },
    {
      name: "Amit Kumar",
      role: "Head of Technology",
      bio: "Full-stack developer passionate about secure platforms",
      image: "/assets/team-amit.jpg"
    },
    {
      name: "Priya Sharma",
      role: "Customer Experience",
      bio: "Customer service specialist with a personal touch",
      image: "/assets/team-priya.jpg"
    }
  ];
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <PageHeader
        headerText="Our Story"
        icon={BookOpen}
        headerTagline="Revolutionizing online shopping in Nepal with a local touch and global standards."
      />
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primaryDark mb-6">Who We Are</h2>
              <div className="space-y-4 text-primaryLight">
                <p>
                  Founded in 2020, Ecommerce KTM began as a passion project to connect Kathmandu's vibrant local businesses with tech-savvy shoppers.
                </p>
                <p>
                  Today, we've grown into Nepal's most trusted online marketplace, bridging the gap between traditional commerce and digital convenience.
                </p>
                <p>
                  Our platform showcases the best of Nepali products while providing a seamless shopping experience with secure payments and reliable delivery.
                </p>
              </div>
            </div>
            <div className="bg-primaryLight rounded-xl overflow-hidden aspect-video flex items-center justify-center">
              <div className="w-full h-full bg-backgroundLight flex items-center justify-center">
                <img src='/assets/office.png' />
              </div>
            </div>
          </div>
        </section>
        {/* Stats Section */}
        <section className="py-12 bg-background rounded-xl shadow-sm mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-4">
                <p className="text-3xl font-bold text-primaryDark mb-2">{stat.value}</p>
                <p className="text-primaryLight">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-primaryDark mb-12 text-center">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm border border-primaryLight hover:border-helper transition-colors">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-primaryDark mr-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-primaryDark">{value.title}</h3>
                </div>
                <p className="text-primaryLight">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Team Section */}
        {/* CTA Section */}
        <section className="bg-primaryDark text-background rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a shopper or seller, we'd love to have you be part of our growing community.
          </p>
          <div className="flex justify-center items-center">
            <Link
              href="/pages/contact"
              className="bg-helper text-primaryDark font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Contact Team
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
export default AboutPage;