"use client"
import PageHeader from '@/app/_components/pageHeader/PageHeader';
import { ChevronDown, Package, CreditCard, Truck, RefreshCw, Shield, HelpCircle } from 'lucide-react';
import { useState } from 'react';
const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const faqCategories = [
    {
      name: "Orders",
      icon: <Package className="w-5 h-5 text-helper" />,
      questions: [
        {
          question: "How do I track my order?",
          answer: "You can track your order by logging into your account and visiting the 'My Orders' section. You'll receive tracking updates via email once your order ships."
        },
        {
          question: "Can I modify my order after placing it?",
          answer: "Order modifications are possible within 1 hour of placement. Please contact our support team immediately if you need to make changes."
        }
      ]
    },
    {
      name: "Payments",
      icon: <CreditCard className="w-5 h-5 text-helper" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit/debit cards, mobile payments (eSewa, Khalti), and cash on delivery within Kathmandu valley."
        },
        {
          question: "Is my payment information secure?",
          answer: "Yes, we use industry-standard encryption and never store your full payment details on our servers."
        }
      ]
    },
    {
      name: "Shipping",
      icon: <Truck className="w-5 h-5 text-helper" />,
      questions: [
        {
          question: "What are your delivery times?",
          answer: "Kathmandu Valley: 1-2 business days. Outside Valley: 3-7 business days depending on location."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently we only ship within Nepal."
        }
      ]
    },
    {
      name: "Returns",
      icon: <RefreshCw className="w-5 h-5 text-helper" />,
      questions: [
        {
          question: "What is your return policy?",
          answer: "You may return most items within 7 days of delivery. Items must be unused with original packaging."
        },
        {
          question: "How long do refunds take?",
          answer: "Refunds are processed within 3-5 business days after we receive the returned item."
        }
      ]
    },
    {
      name: "Security",
      icon: <Shield className="w-5 h-5 text-helper" />,
      questions: [
        {
          question: "How is my personal data protected?",
          answer: "We adhere to strict data protection policies and never share your information with third parties without consent."
        }
      ]
    }
  ];
  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="bg-background min-h-screen">
      {/* Page Header */}
<PageHeader 
  headerText="Frequently Asked Questions" 
  icon={HelpCircle} 
  headerTagline="Find quick answers to common questions about EcommerceKTM's services, policies, and more." 
/>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <div className="flex items-center mb-4">
                <div className="p-2 rounded-full bg-primaryDark/10 mr-4">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-primaryDark">{category.name}</h2>
              </div>
              <div className="space-y-3">
                {category.questions.map((item, itemIndex) => {
                  const fullIndex = parseInt(`${catIndex}-${itemIndex}`);
                  const isActive = activeIndex === fullIndex;
                  return (
                    <div
                      key={itemIndex}
                      className="border border-primaryLight rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(fullIndex)}
                        className="w-full flex justify-between items-center p-4 text-left hover:bg-primaryLight/10 transition-colors"
                      >
                        <h3 className="font-medium text-primaryDark">{item.question}</h3>
                        <ChevronDown
                          className={`w-5 h-5 text-primaryLight transform transition-transform ${isActive ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isActive && (
                        <div className="p-4 pt-0 text-primaryLight">
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* Additional Help */}
        <div className="mt-16 text-center">
          <p className="text-primaryLight mb-6">
            Didn't find what you were looking for?
          </p>
          <a
            href="/contact"
            className="inline-block bg-helper text-primaryDark font-bold py-3 px-8 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Contact Our Support Team
          </a>
        </div>
      </div>
    </div>
  );
};
export default FAQPage;