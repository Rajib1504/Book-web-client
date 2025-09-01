import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, HelpCircle, Sparkles, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

gsap.registerPlugin(ScrollTrigger);

// Enhanced FAQ data with categories
const faqs = [
  {
    category: "Product Information",
    icon: Sparkles,
    items: [
      {
        question: "What are Private Label Rights (PLR)?",
        answer:
          "Private Label Rights (PLR) give you the right to edit, rebrand, and sell the digital products as your own. You can put your name on them and keep 100% of the profits. This includes the ability to modify content, change titles, add your branding, and even combine multiple products into new offerings.",
      },
      {
        question: "What formats are the digital products available in?",
        answer:
          "Our products come in various formats, including PDF for e-books, MP4 for videos, DOCX for templates, PSD for graphics, and more. Each product description specifies the available formats. We also provide source files when available, giving you maximum flexibility for customization.",
      },
    ],
  },
  {
    category: "Account & Access",
    icon: HelpCircle,
    items: [
      {
        question: "Are the products updated regularly?",
        answer:
          "Yes! We constantly update our library with new, high-quality digital products every month to ensure you always have fresh content for your audience and customers. Our team works with top creators and publishers to bring you the latest trends and valuable content.",
      },
      {
        question: "Can I access my products on multiple devices?",
        answer:
          "Absolutely! Your account is accessible from any device with an internet connection. Whether you're on your laptop, tablet, or smartphone, your entire library is available. We also offer offline access for premium members.",
      },
    ],
  },
  {
    category: "Support & Refunds",
    icon: MessageCircle,
    items: [
      {
        question: "Can I get a refund if I'm not satisfied?",
        answer:
          "Due to the digital nature of our products and the instant access provided, we generally do not offer refunds. However, we are committed to your satisfaction. If you face any issues, please contact our support team. We'll work with you to resolve any problems and ensure you get the value you expect.",
      },
      {
        question: "What kind of support do you provide?",
        answer:
          "We offer comprehensive support including 24/7 live chat, email support, video tutorials, and a detailed knowledge base. Our team of experts is here to help you maximize the value of your digital products and answer any questions you may have.",
      },
    ],
  },
];

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const categories = categoriesRef.current;

    if (section && header && categories) {
      // Header animation
      gsap.fromTo(
        header.querySelectorAll(".animate-header"),
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: header,
            start: "top 80%",
          },
        }
      );

      // Categories animation
      gsap.fromTo(
        categories.querySelectorAll(".category-section"),
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: categories,
            start: "top 75%",
          },
        }
      );

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600/5 rounded-full blur-3xl floating-element"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-red-600/10 border border-red-500/20 rounded-full">
            <HelpCircle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-400 font-medium">FAQ</span>
          </div>
          
          <h2 className="animate-header text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-red-400 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h2>
          
          <p className="animate-header max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
            Everything you need to know about our platform, products, and services. 
            Can't find what you're looking for? Our support team is here to help.
          </p>
          
          <div className="animate-header mt-8 flex items-center justify-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>

        {/* Enhanced FAQ Categories */}
        <div ref={categoriesRef} className="max-w-6xl mx-auto">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="category-section mb-16">
              {/* Category Header */}
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg shadow-red-500/20 mr-6">
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{category.category}</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full mt-2"></div>
                </div>
              </div>

              {/* FAQ Items */}
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
                <Accordion type="single" collapsible className="w-full">
                  {category.items.map((faq, index) => (
                    <AccordionItem
                      value={`item-${categoryIndex}-${index}`}
                      key={index}
                      className="border-b border-gray-800/50 last:border-b-0"
                    >
                      <AccordionTrigger className="group text-left py-6 hover:no-underline">
                        <div className="flex items-start w-full">
                          <div className="flex-shrink-0 w-8 h-8 bg-red-600/10 border border-red-500/20 rounded-lg flex items-center justify-center mr-4 mt-1 group-hover:bg-red-600/20 transition-colors duration-200">
                            <span className="text-red-500 font-semibold text-sm">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors duration-200 pr-8">
                              {faq.question}
                            </h4>
                          </div>
                          <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-all duration-200 group-data-[state=open]:rotate-180 flex-shrink-0" />
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 mr-4"></div>
                          <div className="flex-1">
                            <p className="text-gray-300 leading-relaxed text-base">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-300 hover:scale-105">
            <MessageCircle className="h-5 w-5 text-white mr-2" />
            <span className="text-white font-semibold">Still have questions? Contact Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;