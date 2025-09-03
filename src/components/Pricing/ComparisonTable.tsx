import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, X, Star, Crown, TrendingUp, Shield, Zap, Package, DollarSign, Users, BookOpen, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Data for the comparison table
const comparisonData = [
  {
    feature: "Product Variety (>1000+)",
    us: true,
    others: true,
    icon: Package,
  },
  {
    feature: "New Products Weekly",
    us: true,
    others: false,
    icon: TrendingUp,
  },
  {
    feature: "Average Price Per Product",
    us: "Less than $0.20",
    others: "At least $5.00",
    icon: DollarSign,
  },
  {
    feature: "Lifetime Unrestricted Access",
    us: true,
    others: false,
    icon: BookOpen,
  },
  {
    feature: "In-House Creative Team",
    us: "Unique Products",
    others: "Duplicated Content",
    icon: Users,
  },
  {
    feature: "Money-Back Guarantee",
    us: "Full 30 Days",
    others: false,
    icon: Shield,
  },
  {
    feature: "Overall Content Quality",
    us: "Made by Experts",
    others: "Low / Outdated",
    icon: Crown,
  },
  {
    feature: "Growth Tools & University",
    us: true,
    others: false,
    icon: Award,
  },
];

const ComparisonTable = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

      // Animate table rows
      gsap.fromTo(
        section.querySelectorAll(".comparison-row"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: section.querySelector(".comparison-table"),
            start: "top 85%",
          },
        }
      );
    }
  }, []);

  const renderCell = (value: string | boolean, isUs: boolean = false) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <Check className="h-5 w-5 text-green-400" />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
            <X className="h-5 w-5 text-red-400" />
          </div>
        </div>
      );
    }
    
    if (isUs) {
      return (
        <span className="text-white font-medium bg-gradient-to-r from-red-500/20 to-red-600/20 px-3 py-1 rounded-lg border border-red-500/30">
          {value}
        </span>
      );
    }
    
    return (
      <span className="text-gray-400 font-medium bg-gray-800/50 px-3 py-1 rounded-lg border border-gray-700">
        {value}
      </span>
    );
  };

  return (
      
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-black via-[#0A0A0A] to-black text-white relative overflow-hidden"
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-header text-center mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-red-600/20 px-4 py-2 rounded-full border border-red-500/30 mb-6">
            <Star className="h-4 w-4 text-red-400" />
            <span className="text-red-400 text-sm font-medium">COMPARISON</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Creating World-Class Content
          </h2>
          <p className="mt-6 text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Let's be real, most PLR sites offer outdated information and poor
            designs. See why our platform stands out from the crowd.
          </p>
        </div>

        <div className="comparison-table max-w-6xl mx-auto overflow-hidden rounded-3xl border border-gray-800/50 bg-gradient-to-b from-[#111111] to-[#0A0A0A] shadow-2xl shadow-black/50 relative">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5 rounded-3xl"></div>
          
          {/* Table Header */}
          <div className="grid grid-cols-3 text-center font-bold bg-gradient-to-r from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-sm relative z-10">
            <div className="p-6 border-b border-r border-gray-800/50 text-gray-300 text-lg">
              Features
            </div>
            <div className="p-6 border-b border-r border-gray-800/50 flex items-center justify-center gap-3 text-white bg-gradient-to-r from-red-500/20 to-red-600/20 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-t-3xl"></div>
              <div className="relative z-10 flex items-center gap-2">
                <Crown className="h-6 w-6 text-red-400" />
                <span className="text-xl">E-Book Hub</span>
              </div>
            </div>
            <div className="p-6 border-b border-gray-800/50 text-gray-400 text-lg">
              Other Sites
            </div>
          </div>

          {/* Table Body */}
          <div className="relative z-10">
            {comparisonData.map((row, index) => (
              <div
                key={index}
                className={`comparison-row grid grid-cols-3 text-center items-center transition-all duration-300 hover:bg-gray-800/20 ${
                  index % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/10'
                }`}
              >
                <div className="p-6 border-b border-r border-gray-800/50 text-left text-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <row.icon className="h-5 w-5 text-red-400" />
                  </div>
                  <span className="font-medium">{row.feature}</span>
                </div>
                <div className="p-6 border-b border-r border-gray-800/50 bg-gradient-to-r from-red-500/5 to-red-600/5">
                  {renderCell(row.us, true)}
                </div>
                <div className="p-6 border-b border-gray-800/50">
                  {renderCell(row.others)}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="p-8 text-center bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50 border-t border-gray-800/50">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="h-6 w-6 text-red-400" />
              <span className="text-red-400 font-semibold">READY TO GET STARTED?</span>
            </div>
            <p className="text-gray-300 text-lg mb-6">
              Join thousands of creators who've already transformed their business
            </p>
            <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;