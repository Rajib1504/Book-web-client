import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Library,
  PenTool,
  BarChart3,
  Palette,
  GraduationCap,
  Headset,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// --- Service Data ---
const services = [
  {
    icon: Library,
    title: "Master PLR Library",
    description:
      "Access over 1,000+ premium digital products including eBooks, courses, and templates with full Private Label Rights.",
    features: ["Weekly Updates", "High-Quality Content", "Various Niches"],
  },
  {
    icon: PenTool,
    title: "Rebranding Tools",
    description:
      "Powerful tools to rename, edit, and claim ownership of digital assets. Make any product 100% yours in minutes.",
    features: ["Title Generator", "Description Writer", "Content Editor"],
  },
  {
    icon: Palette,
    title: "Design Studio",
    description:
      "Professional graphics and cover designs. Access 100+ editable Canva templates for book covers and social media.",
    features: ["Cover Templates", "Social Kits", "Mockup Generator"],
  },
  {
    icon: GraduationCap,
    title: "Digital University",
    description:
      "Comprehensive guides and video tutorials teaching you how to launch, market, and scale your digital product business.",
    features: ["Step-by-Step Guides", "Video Courses", "Marketing Strategy"],
  },
  {
    icon: BarChart3,
    title: "Market Insights",
    description:
      "Data-driven insights to help you choose the best-selling niches and products before you even start selling.",
    features: ["Trend Analysis", "Niche Reports", "Competitor Data"],
  },
  {
    icon: Headset,
    title: "Priority Support",
    description:
      "Dedicated support team to help you with technical issues, licensing questions, and business advice.",
    features: ["24/7 Response", "Technical Help", "Business Consulting"],
  },
];

const Service = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;

    if (container && header) {
      // 1. Hero Text Animation
      gsap.fromTo(
        header.querySelectorAll(".animate-text"),
        { opacity: 0, y: 50, skewY: 5 },
        {
          opacity: 1,
          y: 0,
          skewY: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.2,
        }
      );

      // 2. Service Cards Animation (Staggered Fade Up)
      const cards = container.querySelectorAll(".service-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: container.querySelector(".services-grid"),
            start: "top 80%",
          },
        }
      );

      // 3. Hover Effect Logic (GSAP)
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.02,
            borderColor: "#ef4444",
            duration: 0.3,
          });
          gsap.to(card.querySelector(".icon-box"), {
            backgroundColor: "rgba(239, 68, 68, 0.2)",
            scale: 1.1,
            duration: 0.3,
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            borderColor: "rgba(31, 41, 55, 0.5)",
            duration: 0.3,
          });
          gsap.to(card.querySelector(".icon-box"), {
            backgroundColor: "rgba(31, 41, 55, 0.5)",
            scale: 1,
            duration: 0.3,
          });
        });
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden"
    >
      {/* --- Background Elements --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        {/* --- Hero Section --- */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-24">
          <div className="animate-text inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-full mb-6">
            <Zap className="h-4 w-4 text-red-500" />
            <span className="text-red-400 font-medium text-sm">
              Premium Solutions
            </span>
          </div>

          <h1 className="animate-text text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            We Empower Your <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              Digital Empire
            </span>
          </h1>

          <p className="animate-text text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            From creation to scaling, we provide every tool, resource, and
            strategy you need to build a profitable digital product business.
          </p>
        </div>

        {/* --- Services Grid --- */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group p-8 rounded-3xl bg-[#111111] border border-gray-800 transition-colors relative overflow-hidden"
            >
              {/* Card Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon */}
              <div className="icon-box w-16 h-16 rounded-2xl bg-gray-800/50 flex items-center justify-center mb-8 border border-gray-700 transition-all">
                <service.icon className="h-8 w-8 text-white group-hover:text-red-500 transition-colors" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold mb-4 group-hover:text-red-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-gray-300"
                  >
                    <CheckCircle2 className="h-4 w-4 text-red-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- CTA Section --- */}
        <div className="relative rounded-[3rem] bg-gradient-to-r from-[#111111] to-[#0f0f0f] border border-gray-800 p-12 md:p-20 text-center overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600/5 rounded-full blur-[80px]"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join thousands of creators who are building their dream business
              with our platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl text-lg shadow-lg shadow-red-600/20 w-full sm:w-auto"
              >
                <Link to={"/pricing"} className="flex items-center">
                  {" "}
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-6 rounded-xl text-lg w-full sm:w-auto bg-transparent"
              >
                <Link to={"/pricing"}>View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
