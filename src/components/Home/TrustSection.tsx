import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Shield, 
  Users, 
  Globe, 
  Award, 
  CheckCircle, 
  Lock, 
  Star, 
  TrendingUp,
  Zap,
  Heart
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Trust statistics data
const trustStats = [
  {
    icon: Users,
    number: "50K+",
    label: "Happy Members",
    description: "Trusted by entrepreneurs worldwide",
    color: "from-blue-500 to-blue-600",
    bgColor: "from-blue-500/20 to-blue-600/20",
    borderColor: "border-blue-500/30"
  },
  {
    icon: Globe,
    number: "200+",
    label: "Countries Served",
    description: "Global reach and accessibility",
    color: "from-green-500 to-green-600",
    bgColor: "from-green-500/20 to-green-600/20",
    borderColor: "border-green-500/30"
  },
  {
    icon: Award,
    number: "98%",
    label: "Satisfaction Rate",
    description: "Consistently high user satisfaction",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "from-yellow-500/20 to-yellow-600/20",
    borderColor: "border-yellow-500/30"
  },
  {
    icon: TrendingUp,
    number: "4.9/5",
    label: "Average Rating",
    description: "Rated by thousands of users",
    color: "from-red-500 to-red-600",
    bgColor: "from-red-500/20 to-red-600/20",
    borderColor: "border-red-500/30"
  }
];

// Trust indicators data
const trustIndicators = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit SSL encryption and secure data centers",
    color: "text-blue-400"
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Your data is never shared with third parties",
    color: "text-green-400"
  },
  {
    icon: CheckCircle,
    title: "Verified Platform",
    description: "Trusted by major corporations and institutions",
    color: "text-yellow-400"
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "24/7 support and money-back guarantee",
    color: "text-red-400"
  }
];

// Certifications and badges
const certifications = [
  {
    name: "SSL Secure",
    icon: "🔒",
    description: "256-bit encryption"
  },
  {
    name: "GDPR Compliant",
    icon: "🇪🇺",
    description: "Data protection compliant"
  },
  {
    name: "ISO 27001",
    icon: "🏆",
    description: "Information security"
  },
  {
    name: "PCI DSS",
    icon: "💳",
    description: "Payment security"
  }
];

const TrustSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  const certificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stats = statsRef.current;
    const indicators = indicatorsRef.current;
    const certifications = certificationsRef.current;

    if (section && stats && indicators && certifications) {
      // Main section animation
      gsap.fromTo(
        section.querySelector(".animate-header"),
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      // Stats animation with counter
      gsap.fromTo(
        stats.querySelectorAll(".stat-item"),
        { opacity: 0, y: 40, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: stats,
            start: "top 85%",
          },
        }
      );

      // Trust indicators animation
      gsap.fromTo(
        indicators.querySelectorAll(".trust-indicator"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: indicators,
            start: "top 80%",
          },
        }
      );

      // Certifications animation
      gsap.fromTo(
        certifications.querySelectorAll(".certification-item"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: certifications,
            start: "top 85%",
          },
        }
      );

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -15,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 1,
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/6 rounded-full blur-3xl floating-element"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl floating-element"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Security Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-blue-500/20 rounded-full"></div>
          <div className="absolute top-20 left-20 w-16 h-16 border border-green-500/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border border-yellow-500/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-red-500/20 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-blue-600/10 border border-blue-500/20 rounded-full">
            <Shield className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-blue-400 font-medium">Trust & Security</span>
          </div>
          
          <h2 className="animate-header text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-blue-400 bg-clip-text text-transparent mb-6">
            Trusted by Entrepreneurs Worldwide
          </h2>
          
          <p className="animate-header max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
            Join thousands of successful entrepreneurs who trust our platform for their digital success. 
            We prioritize your security, privacy, and success above everything else.
          </p>
        </div>

        {/* Trust Statistics */}
        <div ref={statsRef} className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {trustStats.map((stat, index) => (
              <div key={index} className="stat-item text-center group">
                <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className={`h-10 w-10 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-br ${stat.color} bg-clip-text text-transparent mb-3`}>
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div ref={indicatorsRef} className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="trust-indicator bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800/50 rounded-2xl p-8 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 group hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-800/50 border border-gray-700/50 rounded-xl flex items-center justify-center group-hover:border-gray-600/50 transition-colors duration-300">
                    <indicator.icon className={`h-8 w-8 ${indicator.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">{indicator.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{indicator.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Badges */}
        <div ref={certificationsRef} className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Certifications & Compliance</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform meets the highest industry standards for security, privacy, and data protection
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-item text-center group">
                <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all duration-300 group-hover:scale-105 ${
                  index === 1 || index === 3 ? 'scale-110' : 'scale-100'
                }`}>
                  <div className="text-4xl mb-3">{cert.icon}</div>
                  <h4 className="text-lg font-semibold text-white mb-2">{cert.name}</h4>
                  <p className="text-sm text-gray-400">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust CTA */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-blue-500/30 rounded-full">
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-blue-400 mr-2" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-green-400 mr-2" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
