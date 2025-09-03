import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, Zap } from "lucide-react";
import { Button } from "../ui/button";
// import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Data for the pricing plans
const pricingPlans = {
  lite: {
    name: "Library Lite",
    price: 97,
    features: [
      "More Than 1000 Products",
      "Unlimited Downloads",
      "3 Months of New Releases",
      "Private Label Rights",
      "Lifetime PLR License",
      "Money-Back Guarantee",
    ],
  },
  pro: {
    name: "Library Pro",
    price: 197,
    oldPrice: 497,
    badge: "Save 60%",
    highlight: true,
    features: {
      litePlus: ["New Releases Forever", "Request New Products"],
      tools: [
        "Digital Product Ideator",
        "Book Title Generator",
        "Product Description Writer",
        "PDF Logo Rebrander",
        "200+ Design Templates",
        "100+ Ebook Covers",
        "Digital Product University",
      ],
    },
  },
};

const PricingPlans = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(
        section.querySelectorAll(".pricing-card"),
        { opacity: 0, y: 80, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Lite Plan Card */}
          <div className="pricing-card bg-[#111111] border border-gray-800 rounded-2xl p-8 flex flex-col">
            <h3 className="text-2xl font-bold text-white">{pricingPlans.lite.name}</h3>
            <div className="mt-4">
              <span className="text-5xl font-extrabold">${pricingPlans.lite.price}</span>
              <span className="text-xl font-medium text-gray-400">/lifetime</span>
            </div>
            <p className="mt-2 text-gray-500">One-time payment</p>
            <Button className="mt-8 w-full bg-gray-700 hover:bg-gray-600 text-white py-6 text-lg rounded-xl">
              Get Master Library
            </Button>
            <ul className="mt-8 space-y-4 text-lg">
              {pricingPlans.lite.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan Card (Highlighted) */}
          <div className="pricing-card relative bg-[#111111] border-2 border-red-500/50 rounded-2xl p-8 flex flex-col shadow-2xl shadow-red-500/10">
            <div className="absolute top-4 right-4">
                <div className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-white font-semibold text-sm shadow-md">
                    {pricingPlans.pro.badge}
                </div>
            </div>
            <h3 className="text-2xl font-bold text-red-400">{pricingPlans.pro.name}</h3>
            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-5xl font-extrabold">${pricingPlans.pro.price}</span>
              <span className="text-2xl font-medium text-gray-600 line-through">${pricingPlans.pro.oldPrice}</span>
              <span className="text-xl font-medium text-gray-400">/lifetime</span>
            </div>
            <p className="mt-2 text-gray-500">One-time payment</p>
            <Button className="mt-8 w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-6 text-lg rounded-xl shadow-lg shadow-red-500/20 transform hover:scale-105 transition-transform duration-300">
              Get Everything With Pro
            </Button>
            <div className="mt-8">
              <p className="font-semibold text-gray-400">EVERYTHING IN LITE, PLUS:</p>
              <ul className="mt-4 space-y-4 text-lg">
                {pricingPlans.pro.features.litePlus.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <p className="font-semibold text-gray-400">TOOLS AND RESOURCES:</p>
              <ul className="mt-4 space-y-4 text-lg">
                {pricingPlans.pro.features.tools.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Zap className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;