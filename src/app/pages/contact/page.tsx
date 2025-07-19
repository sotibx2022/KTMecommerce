import { Mail, Phone, MessageSquare, MapPin, Clock, AlertTriangle } from 'lucide-react';
const ContactPage = () => {
  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5 text-helper" />,
      title: "Email Support",
      description: "For general inquiries and support",
      details: "support@ecommercektm.com",
      link: "mailto:support@ecommercektm.com",
      availability: "Response within 24 hours"
    },
    {
      icon: <Phone className="w-5 h-5 text-helper" />,
      title: "Phone Support",
      description: "Speak directly with our team",
      details: "01-XXXXXXX",
      link: "tel:011234567",
      availability: "9AM-6PM, Sunday-Friday"
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-helper" />,
      title: "Live Chat",
      description: "Instant messaging support",
      details: "Start Chat Now",
      link: "#chat",
      availability: "10AM-8PM daily"
    },
    {
      icon: <MapPin className="w-5 h-5 text-helper" />,
      title: "Office Visit",
      description: "Visit our headquarters",
      details: "KTM Plaza, Kathmandu",
      link: "https://maps.google.com",
      availability: "10AM-5PM, Weekdays"
    }
  ];
  const quickActions = [
    {
      title: "Track Your Order",
      link: "/track-order"
    },
    {
      title: "Returns & Refunds",
      link: "/returns"
    },
    {
      title: "Shipping Information",
      link: "/shipping"
    },
    {
      title: "FAQ Section",
      link: "/faq"
    }
  ];
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="bg-primaryDark text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-2xl mx-auto">
            We're here to help! Choose your preferred contact method or find quick answers below.
          </p>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Contact Methods Grid */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primaryDark mb-8">Ways to Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm p-6 border border-primaryLight hover:border-helper transition-colors"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-full bg-primaryDark/10 mr-4">
                    {method.icon}
                  </div>
                  <h3 className="font-bold text-primaryDark">{method.title}</h3>
                </div>
                <p className="text-primaryLight mb-3">{method.description}</p>
                <div className="mb-3">
                  <a 
                    href={method.link} 
                    className="font-medium text-primaryDark hover:text-helper transition-colors"
                  >
                    {method.details}
                  </a>
                </div>
                <p className="text-xs text-primaryLight">Available: {method.availability}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Quick Help Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primaryDark mb-6">Quick Help</h2>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-primaryLight">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <a
                  key={index}
                  href={action.link}
                  className="p-4 text-center border border-primaryLight rounded-lg hover:bg-primaryLight/10 transition-colors"
                >
                  <span className="font-medium text-primaryDark">{action.title}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
        {/* Emergency Contact */}
        <section>
          <div className="bg-primaryLight/10 border-l-4 border-helper rounded-lg p-6">
            <div className="flex items-start">
              <AlertTriangle className="w-6 h-6 text-helper mr-4 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-primaryDark mb-2">Emergency Support</h3>
                <p className="text-primaryLight mb-4">
                  For urgent issues requiring immediate assistance outside regular hours
                </p>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-helper mr-2" />
                  <a 
                    href="tel:011234567" 
                    className="text-lg font-bold text-primaryDark hover:text-helper transition-colors"
                  >
                    01-XXXXXXX (24/7 Emergency Line)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default ContactPage;