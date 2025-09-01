import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { MoveRight } from "lucide-react";
import { Button } from "../../ui/button";

// --- SVG Background Component (Defined inside Hero.tsx) ---
const HeroBackground = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const lines = svgRef.current?.querySelectorAll("path");
    if (lines) {
      gsap.set(lines, { strokeDasharray: 1500, strokeDashoffset: 1500 });

      const tl = gsap.timeline({ repeat: -1, yoyo: false });

      tl.to(lines, {
        strokeDashoffset: 0,
        duration: 5,
        ease: "power1.inOut",
        stagger: {
          each: 0.5,
          from: "random",
        },
      }).to(
        lines,
        {
          strokeDashoffset: -1500,
          duration: 5,
          ease: "power1.inOut",
          stagger: {
            each: 0.5,
            from: "random",
          },
        },
        "-=3"
      ); // Overlap animations for continuous flow
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g strokeWidth="1" filter="url(#glow)">
          <path
            d="M-200 100 C 200 400, 400 0, 800 300 S 1200 600, 1640 200"
            stroke="#ff3333"
            fill="none"
          />
          <path
            d="M-200 600 C 200 300, 400 800, 800 500 S 1200 200, 1640 700"
            stroke="#ff5555"
            fill="none"
          />
          <path
            d="M-200 300 C 200 800, 400 100, 800 400 S 1200 800, 1640 300"
            stroke="#ff1111"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

// --- Main Hero Component ---
const Hero = () => {
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      heroContentRef.current?.querySelectorAll(".animate-in"),
      { y: 60, opacity: 0, skewY: 5 },
      {
        y: 0,
        opacity: 1,
        skewY: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        delay: 0.5,
      }
    );
  }, []);

  return (
    <section className="relative w-full h-screen bg-[#0A0A0A] text-white overflow-hidden">
      <HeroBackground />

      <div
        ref={heroContentRef}
        className="relative z-10 h-full flex flex-col justify-center items-center text-center container mx-auto px-4"
      >
        <div className="max-w-4xl">
          <div className="overflow-hidden">
            <h1 className="animate-in text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-white">
              Craft Your Digital
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="animate-in text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter text-red-600 mt-2">
              Masterpiece.
            </h1>
          </div>

          <p className="animate-in mt-8 max-w-2xl mx-auto text-lg text-gray-400">
            Unlock a world of premium digital assets. From e-books to templates,
            we provide the tools you need to build and scale your brand.
          </p>

          <div className="animate-in mt-12">
            <Button
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700 rounded-full px-8 py-7 text-lg font-semibold shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-105 hover:shadow-red-500/30"
            >
              Unlock The Vault
              <MoveRight className="ml-3 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
