import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ShoppingCart, UserPlus, CheckCircle } from "lucide-react";

// --- Animated Background Component ---
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Floating Orbs */}
      <div className="absolute top-10 -left-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite_2s]"></div>
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
    </div>
  );
};

// --- Main Pricing Hero Component ---
const PricingHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heroElement = heroRef.current;
    if (heroElement) {
      // Animate all elements with the class 'animate-hero'
      gsap.fromTo(
        heroElement.querySelectorAll(".animate-hero"),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full py-32 lg:py-40 bg-black text-white overflow-hidden"
    >
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Limited Time Offer Badge */}
        <div className="animate-hero inline-flex items-center justify-center mb-8 px-6 py-3 bg-red-600/10 border border-red-500/30 rounded-full">
          <span className="text-red-400 font-semibold">
            Limited Time Lifetime Offer
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="animate-hero text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-300 to-red-400 bg-clip-text text-transparent">
          Get Lifetime Access To Your
        </h1>
        <h2 className="animate-hero text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mt-2">
          Ultimate Digital Library
        </h2>

        {/* Sub-headline */}
        <p className="animate-hero mt-8 max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed">
          Unlock over 1000+ premium done-for-you eBooks, video courses,
          templates, and more with full Private Label Rights.
        </p>

        {/* Steps */}
        <div className="animate-hero mt-16 max-w-2xl mx-auto flex items-center justify-between space-x-4">
          {[
            { icon: ShoppingCart, label: "Purchase" },
            { icon: UserPlus, label: "Sign Up" },
            { icon: CheckCircle, label: "Get Access" },
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-900/50 border-2 border-gray-800 rounded-full">
                <step.icon className="h-7 w-7 text-red-500" />
              </div>
              <span className="font-semibold text-gray-300">{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingHero;