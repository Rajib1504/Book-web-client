import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HelpCircle,  Sparkles, MessageCircle, Clock, Shield, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

gsap.registerPlugin(ScrollTrigger);

// Data for the pricing-specific FAQs
const pricingFaqs = [
  {
    question: "Is this a subscription or a one-time payment?",
    answer:
      "This is a one-time payment! You pay once and get lifetime access to all the products included in the library. There are no recurring fees or hidden charges.", // Updated text
    icon: Zap,
    category: "Payment"
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee. If you are not satisfied with our library for any reason, just contact our support within 30 days of purchase, and we will issue a full refund, no questions asked.",
    icon: Shield,
    category: "Guarantee"
  },
  {
    question: "What license and rights will I get?",
    answer:
      "You will receive a full Private Label Rights (PLR) license. This means you can edit, rebrand, and sell the products as your own. You can use them for commercial projects and keep 100% of the profits.",
    icon: MessageCircle,
    category: "Licensing"
  },
  {
    question: "If I purchase now, will I get access to future updates?",
    answer:
      "Yes! You get instant access to all future product releases forever. We add new premium products every week, and you'll never be charged extra for them.", // Updated text
    icon: Clock,
    category: "Updates"
  },
];

const PricingFAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      // Animate header
      gsap.fromTo(
        section.querySelector(".section-header"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      // Animate stats cards
      gsap.fromTo(
        section.querySelectorAll(".stats-card"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: section.querySelector(".stats-section"),
            start: "top 85%",
          },
        }
      );

      // Animate accordion items
      gsap.fromTo(
        section.querySelectorAll(".faq-item"),
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: section.querySelector(".faq-accordion"),
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  const handleAccordionChange = (value: string) => {
    const index = parseInt(value.replace('item-', '')) - 1;
    setActiveIndex(index);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-black via-[#0A0A0A] to-black text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-header text-center mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-red-600/20 px-4 py-2 rounded-full border border-red-500/30 mb-6">
            <Sparkles className="h-4 w-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="mt-6 text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Find quick answers to common questions about our plans, licensing,
            and policies. Everything you need to know to get started.
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-section mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="stats-card text-center p-6 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-gray-800/50 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">30 Days</h3>
              <p className="text-gray-400">Money-Back Guarantee</p>
            </div>
            
            <div className="stats-card text-center p-6 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-gray-800/50 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">One-Time</h3>
              <p className="text-gray-400">Payment Only</p>
            </div>
            
            <div className="stats-card text-center p-6 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-gray-800/50 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Full PLR</h3>
              <p className="text-gray-400">License Rights</p>
            </div>
            
            <div className="stats-card text-center p-6 bg-gradient-to-b from-[#111111] to-[#0A0A0A] border border-gray-800/50 rounded-2xl hover:border-red-500/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Lifetime</h3>
              <p className="text-gray-400">Access Included</p>
            </div>
          </div>
        </div>

        <div className="faq-accordion max-w-4xl mx-auto mb-8">
          <Accordion type="single" collapsible className="w-full" onValueChange={handleAccordionChange}>
            {pricingFaqs.map((faq, index) => (
              <AccordionItem
                value={`item-${index + 1}`}
                key={index}
                className={`faq-item bg-gradient-to-r from-[#111111] to-[#0A0A0A] border border-gray-800/50 rounded-2xl mb-6 shadow-xl hover:shadow-2xl hover:border-red-500/30 transition-all duration-300 overflow-hidden ${
                  activeIndex === index ? 'ring-2 ring-red-500/20' : ''
                }`}
              >
                <AccordionTrigger className="text-left text-lg font-semibold p-6 hover:no-underline group">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <faq.icon className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-white">{faq.question}</span>
                      <div className="mt-1">
                        <span className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-full">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="text-base text-gray-300 leading-relaxed pl-14">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 border border-gray-800/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle className="h-6 w-6 text-red-400" />
              <span className="text-red-400 font-semibold">STILL HAVE QUESTIONS?</span>
            </div>
            <p className="text-gray-300 text-lg mb-6">
              Our support team is here to help you get the most out of your investment
            </p>
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;