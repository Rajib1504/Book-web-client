/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { Building2, Sparkles, Award, Zap, Target, Users, TrendingUp } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// --- Advanced Particle System ---
const ParticleSystem = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const particles = particlesRef.current;
    if (!particles) return;

    // Create floating particles
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-red-500/20 rounded-full';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
      particles.appendChild(particle);
    }

    // Animate particles
    gsap.to(particles.children, {
      y: "random(-100, 100)",
      x: "random(-50, 50)",
      rotation: "random(0, 360)",
      scale: "random(0.5, 1.5)",
      duration: "random(10, 20)",
      repeat: -1,
      yoyo: true,
      ease: "none",
      stagger: 0.1
    });
  }, []);

  return (
    <div 
      ref={particlesRef}
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ animation: 'particleFloat 20s linear infinite' }}
    />
  );
};

// --- Sophisticated Background with Depth ---
const AdvancedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Base gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A]"></div>
    
    {/* Animated mesh gradient */}
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-600/5 via-transparent to-red-500/5 animate-gradient-move"></div>
    </div>
    
    {/* Floating geometric shapes */}
    <div className="absolute top-20 left-20 w-32 h-32 border border-red-500/10 rotate-45 animate-spin-slow"></div>
    <div className="absolute bottom-32 right-32 w-24 h-24 bg-red-500/5 rounded-full animate-pulse"></div>
    <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-red-400/20 rotate-12 animate-bounce-slow"></div>
    
    {/* Particle system */}
    <ParticleSystem />
    
    {/* Subtle noise overlay */}
    <div className="absolute inset-0 bg-noise-pattern opacity-[0.02]"></div>
  </div>
);

// --- Interactive Stats Component ---
const InteractiveStats = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  
  const stats = [
    { icon: Users, value: "10K+", label: "Active Creators", color: "text-red-400" },
    { icon: TrendingUp, value: "500+", label: "Products Launched", color: "text-red-500" },
    { icon: Target, value: "99%", label: "Success Rate", color: "text-red-600" },
    { icon: Zap, value: "24/7", label: "Support", color: "text-red-400" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`group relative p-6 rounded-2xl border border-gray-800/50 bg-gradient-to-br from-gray-900/30 to-gray-800/20 backdrop-blur-sm transition-all duration-500 hover:border-red-500/50 hover:bg-gradient-to-br hover:from-red-900/20 hover:to-red-800/10 cursor-pointer`}
          onMouseEnter={() => setHoveredStat(index)}
          onMouseLeave={() => setHoveredStat(null)}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className={`p-3 rounded-full bg-red-600/10 border border-red-500/20 transition-all duration-300 ${hoveredStat === index ? 'scale-110 border-red-500/50' : ''}`}>
              <stat.icon className={`h-6 w-6 ${stat.color} transition-colors duration-300`} />
            </div>
            <div className="space-y-1">
              <div className={`text-2xl font-bold ${stat.color} transition-all duration-300 ${hoveredStat === index ? 'scale-110' : ''}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main About Hero Component ---
const AboutHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const heroElement = heroRef.current;
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;
    const title = titleRef.current;

    if (!heroElement || !leftPanel || !rightPanel || !title) return;

    // Advanced GSAP Timeline with sophisticated animations
    const masterTimeline = gsap.timeline({ delay: 0.5 });

    // Split screen entrance
    masterTimeline
      .fromTo(leftPanel, 
        { x: "-100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(rightPanel,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1.2, ease: "power4.out" },
        "-=0.8"
      );

    // Title morphing animation
    masterTimeline
      .fromTo(title.querySelectorAll(".title-word"),
        { 
          y: 100, 
          opacity: 0, 
          rotationX: 90,
          transformOrigin: "50% 50% -50px"
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.5,
          ease: "back.out(1.7)",
          stagger: 0.2
        },
        "-=0.6"
      );

    // Text reveal animation
    masterTimeline
      .fromTo(heroElement.querySelectorAll(".reveal-text"),
        { 
          clipPath: "inset(0 100% 0 0)",
          opacity: 0
        },
        { 
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.3
        },
        "-=0.8"
      );

    // Floating elements animation
    masterTimeline
      .fromTo(heroElement.querySelectorAll(".floating-element"),
        { 
          y: 50, 
          opacity: 0, 
          scale: 0.8,
          rotation: "random(-15, 15)"
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          stagger: 0.1
        },
        "-=0.6"
      );

    // Continuous floating animation for decorative elements
    gsap.to(heroElement.querySelectorAll(".floating-element"), {
      y: "random(-20, 20)",
      rotation: "random(-5, 5)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    setIsLoaded(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen bg-[#0A0A0A] text-white overflow-hidden"
    >
      <AdvancedBackground />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 floating-element">
        <Sparkles className="h-6 w-6 text-red-400/40" />
      </div>
      <div className="absolute top-32 right-16 floating-element">
        <Award className="h-8 w-8 text-red-500/30" />
      </div>
      <div className="absolute bottom-32 left-20 floating-element">
        <Building2 className="h-7 w-7 text-red-600/35" />
      </div>
      <div className="absolute top-1/2 right-10 floating-element">
        <Zap className="h-5 w-5 text-red-400/30" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh]">
          
          {/* Left Panel - Content */}
          <div ref={leftPanelRef} className="space-y-8">
            {/* Animated Badge */}
            <div className="inline-flex items-center justify-center px-6 py-3 bg-red-600/10 border border-red-500/30 rounded-full backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-600 rounded-full">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-red-400 font-semibold text-sm tracking-wide uppercase">
                  Industry Leading Platform
                </span>
              </div>
            </div>

            {/* Advanced Typography */}
            <div ref={titleRef} className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.9]">
                <span className="title-word block text-white">
                  Crafting Digital
                </span>
                <span className="title-word block mt-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>
            </div>

            <div className="space-y-6">
              <p className="reveal-text text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg">
                We're not just another platform. We're the architects of digital transformation, 
                empowering creators to build extraordinary products that shape the future.
              </p>
              
              <p className="reveal-text text-base text-gray-400 leading-relaxed max-w-lg">
                Our mission is to democratize premium digital creation, making world-class 
                tools and resources accessible to every entrepreneur and creator.
              </p>
            </div>

            {/* Interactive Stats */}
            <div className="reveal-text">
              <InteractiveStats />
            </div>
          </div>

          {/* Right Panel - Visual Elements */}
          <div ref={rightPanelRef} className="relative">
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Central Visual Element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  {/* Rotating outer ring */}
                  <div className="absolute inset-0 border-2 border-red-500/20 rounded-full animate-spin-slow"></div>
                  
                  {/* Inner content */}
                  <div className="absolute inset-8 bg-gradient-to-br from-red-600/10 to-red-500/5 rounded-full backdrop-blur-sm border border-red-500/20 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-red-600 rounded-full flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-white" />
                      </div>
                      <div className="space-y-2">
                        <div className="text-2xl font-bold text-white">2024</div>
                        <div className="text-sm text-gray-400">Year of Innovation</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating particles around the circle */}
                  <div className="absolute inset-0">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-red-500/40 rounded-full"
                        style={{
                          top: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                          left: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                          animation: `orbit 10s linear infinite ${i * 0.5}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;