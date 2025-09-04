import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye, Gem, Sparkles, Zap, Users, Globe, ArrowRight, Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Enhanced content with more depth
const missionData = {
  title: "The New Era of Digital Creation",
  subtitle: "Empowering creators to build extraordinary digital experiences",
  mission: {
    icon: Target,
    title: "Our Mission",
    description:
      "Our mission is to empower creators with the tools to build premium digital products faster, easier, and more affordably than ever before. We believe great ideas shouldn't be limited by technical barriers.",
    stats: "10K+ Creators Empowered",
    color: "#F59E0B",
    gradient: "from-amber-500 to-orange-500",
  },
  vision: {
    icon: Eye,
    title: "Our Vision",
    description:
      "We are on a path to become the world's leading platform for publishing-grade digital products. By blending automation with human expertise, we are building a future where anyone can bring their creative ideas to life.",
    stats: "Global Impact",
    color: "#3B82F6",
    gradient: "from-blue-500 to-indigo-500",
  },
  values: [
    { icon: Users, title: "Community First", description: "Building together" },
    { icon: Zap, title: "Innovation", description: "Always pushing boundaries" },
    { icon: Globe, title: "Global Reach", description: "Worldwide impact" },
  ],
};

// Interactive Mission/Vision Card Component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MissionCard = ({ data, isLeft }: { data: typeof missionData.mission; isLeft: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card || !icon) return;

    if (isHovered) {
      gsap.to(card, {
        scale: 1.05,
        y: -10,
        duration: 0.6,
        ease: "power3.out"
      });
      
      gsap.to(icon, {
        rotation: 360,
        scale: 1.2,
        duration: 0.8,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(icon, {
        rotation: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Background */}
      <div className={`relative p-10 rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-2 border-gray-700/50 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 group-hover:border-opacity-100`}
           style={{ borderColor: isHovered ? data.color : undefined }}>
        
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Icon */}
          <div 
            ref={iconRef}
            className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${data.gradient} shadow-lg mb-8`}
          >
            <data.icon className="h-12 w-12 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-500">
            {data.title}
          </h3>

          {/* Description */}
          <p className="text-lg text-gray-300 leading-relaxed mb-8 group-hover:text-gray-200 transition-colors duration-300">
            {data.description}
          </p>

          {/* Stats */}
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800/50 border border-gray-600/50 rounded-full backdrop-blur-sm">
            <Star className="h-4 w-4" style={{ color: data.color }} />
            <span className="text-sm font-semibold text-gray-300">{data.stats}</span>
          </div>
        </div>

        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"
          style={{ backgroundColor: data.color }}
        ></div>
      </div>
    </div>
  );
};

// Values Grid Component
const ValuesGrid = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.value-item');
    
    gsap.fromTo(items,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
        },
      }
    );
  }, []);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {missionData.values.map((value, index) => (
        <div key={index} className="value-item group">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/30 backdrop-blur-sm text-center hover:border-red-500/50 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 border border-red-500/20 rounded-full mb-4 group-hover:bg-red-600/20 transition-colors duration-300">
              <value.icon className="h-8 w-8 text-red-400" />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{value.title}</h4>
            <p className="text-gray-400 text-sm">{value.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const MissionVision = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState<'mission' | 'vision' | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const header = section.querySelector(".section-header");
    const cards = section.querySelectorAll(".mission-card");
    const values = section.querySelector(".values-section");

    // Master timeline for sophisticated animations
    const masterTimeline = gsap.timeline({ delay: 0.5 });

    // Header animation
    masterTimeline
      .fromTo(header,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }
      );

    // Cards animation with sophisticated entrance
    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      
      gsap.fromTo(cardElement,
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.8,
          rotationX: 45,
          transformOrigin: "center bottom"
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.8 + (index * 0.3),
          scrollTrigger: {
            trigger: cardElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Values section animation
    if (values) {
      gsap.fromTo(values,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: values,
            start: "top 85%",
          },
        }
      );
    }

  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0">
        {/* Multiple gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-red-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-32 right-32 w-8 h-8 border border-red-500/20 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-blue-500/10 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-1/3 left-1/4 w-4 h-4 border-2 border-amber-400/20 rotate-12 animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="section-header text-center mb-24 max-w-5xl mx-auto">
          <div className="inline-flex items-center justify-center mb-8 px-8 py-4 bg-red-600/10 border border-red-500/30 rounded-full backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-600 rounded-full">
                <Gem className="h-5 w-5 text-white" />
              </div>
              <span className="text-red-400 font-semibold text-sm tracking-wide uppercase">
                Our Purpose & Vision
              </span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            <span className="block text-white">The New Era of</span>
            <span className="block mt-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              Digital Creation
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
            {missionData.subtitle}
          </p>
        </div>

        {/* Interactive Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto mb-24">
          <div className="mission-card">
            <MissionCard data={missionData.mission} isLeft={true} />
          </div>
          <div className="mission-card">
            <MissionCard data={missionData.vision} isLeft={false} />
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section text-center">
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Our Core Values</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>
          <ValuesGrid />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24">
          <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full">
            <Sparkles className="h-5 w-5 text-red-500" />
            <span className="text-gray-300 font-medium">Ready to join our mission?</span>
            <ArrowRight className="h-5 w-5 text-red-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;