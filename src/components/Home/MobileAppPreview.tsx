import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Smartphone,
  // Tablet,
  // Laptop,
  Globe,
  Zap,
  Shield,
  Download,
  Play,
  // CheckCircle,
  Star,
  // Wifi,
  // Battery,
  // Signal
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Mobile app features
const mobileFeatures = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Instant access to your entire library",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Shield,
    title: "Secure Access",
    description: "Bank-level encryption on all devices",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Globe,
    title: "Cloud Sync",
    description: "Seamlessly sync across all devices",
    color: "from-blue-500 to-cyan-500",
  },
];

// Device mockups data
// const devices = [
//   {
//     type: "Mobile",
//     icon: Smartphone,
//     size: "w-64 h-96",
//     mockupClass: "mobile-mockup",
//     features: ["Touch Optimized", "Offline Reading", "Push Notifications"],
//     color: "from-blue-600 to-purple-600"
//   },
//   {
//     type: "Tablet",
//     icon: Tablet,
//     size: "w-76 h-96",
//     mockupClass: "tablet-mockup",
//     features: ["Large Display", "Multi-touch", "Landscape Mode"],
//     color: "from-purple-600 to-pink-600"
//   },
//   {
//     type: "Desktop",
//     icon: Laptop,
//     size: "w-80 h-64",
//     mockupClass: "desktop-mockup",
//     features: ["Full Features", "Keyboard Shortcuts", "Multi-window"],
//     color: "from-red-600 to-orange-600"
//   }
// ];

// App screenshots mockup
// const AppMockup = ({ device, isActive }: { device: any; isActive: boolean }) => (
//   <div className={`${device.mockupClass} relative group ${isActive ? 'scale-110' : 'scale-100'} transition-all duration-700`}>
//     {/* Device Frame */}
//     <div className={`relative ${device.size} bg-gradient-to-br ${device.color} rounded-3xl p-2 shadow-2xl shadow-black/30`}>
//       {/* Device Screen */}
//       <div className="w-full h-full bg-black rounded-2xl overflow-hidden relative">
//         {/* Status Bar */}
//         <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white text-xs">
//           <div className="flex items-center space-x-2">
//             <Signal className="h-3 w-3 text-green-400" />
//             <Wifi className="h-3 w-3 text-blue-400" />
//           </div>
//           <span className="font-medium">9:41</span>
//           <div className="flex items-center space-x-1">
//             <div className="w-6 h-2 bg-gray-700 rounded-full overflow-hidden">
//               <div className="w-4 h-full bg-green-400 rounded-full"></div>
//             </div>
//             <Battery className="h-3 w-3 text-green-400" />
//           </div>
//         </div>

//         {/* App Content */}
//         <div className="p-4 text-white">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-4">
//             <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">E</span>
//             </div>
//             <h3 className="font-semibold">E-Book Hub</h3>
//             <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
//           </div>

//           {/* Search Bar */}
//           <div className="bg-gray-800 rounded-lg p-3 mb-4">
//             <div className="flex items-center space-x-2 text-gray-400">
//               <div className="w-4 h-4 bg-gray-600 rounded"></div>
//               <span className="text-xs">Search your library...</span>
//             </div>
//           </div>

//           {/* Content Grid */}
//           <div className="grid grid-cols-2 gap-2">
//             {[1, 2, 3, 4].map((item) => (
//               <div key={item} className="bg-gray-800 rounded-lg p-2">
//                 <div className="w-full h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded mb-2"></div>
//                 <div className="space-y-1">
//                   <div className="w-3/4 h-2 bg-gray-700 rounded"></div>
//                   <div className="w-1/2 h-2 bg-gray-700 rounded"></div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Bottom Navigation */}
//           <div className="absolute bottom-4 left-4 right-4">
//             <div className="flex items-center justify-around bg-gray-900 rounded-xl p-2">
//               {['🏠', '📚', '🔍', '👤'].map((icon, index) => (
//                 <div key={index} className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${
//                   index === 0 ? 'bg-red-500' : 'bg-gray-700'
//                 }`}>
//                   {icon}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Elements */}
//       <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//         <CheckCircle className="h-4 w-4 text-white" />
//       </div>

//       {/* Device Features */}
//       <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-48">
//         <div className="text-center">
//           <h4 className="font-semibold text-white mb-2">{device.type}</h4>
//           <div className="space-y-1 mt-4">
//             {device.features.map((feature, index) => (
//               <div key={index} className="flex items-center justify-center space-x-2 text-gray-300 text-sm">
//                 <CheckCircle className="h-3 w-3 text-green-400" />
//                 <span>{feature}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// );

const MobileAppPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const devicesRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const devices = devicesRef.current;
    const features = featuresRef.current;

    if (section && header && devices && features) {
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

      // Devices animation
      gsap.fromTo(
        devices.querySelectorAll(".device-item"),
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.3,
          scrollTrigger: {
            trigger: devices,
            start: "top 75%",
          },
        }
      );

      // Features animation
      gsap.fromTo(
        features.querySelectorAll(".feature-item"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: features,
            start: "top 80%",
          },
        }
      );

      // Floating animations
      gsap.to(".floating-element", {
        y: -20,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.8,
      });

      // Device rotation animations
      gsap.to(".mobile-mockup", {
        rotationY: 15,
        duration: 6,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(".tablet-mockup", {
        rotationY: -10,
        duration: 8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      });

      gsap.to(".desktop-mockup", {
        rotationY: 5,
        duration: 7,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/6 rounded-full blur-3xl floating-element"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/5 rounded-full blur-3xl floating-element"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Tech Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-blue-500/20 rounded-full"></div>
          <div className="absolute top-20 left-20 w-16 h-16 border border-purple-500/20 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border border-red-500/20 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-green-500/20 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-6 px-6 py-3 bg-blue-600/10 border border-blue-500/20 rounded-full">
            <Smartphone className="h-5 w-5 text-blue-500 mr-2" />
            <span className="text-blue-400 font-medium">Mobile Experience</span>
          </div>

          <h2 className="animate-header text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-blue-400 bg-clip-text text-transparent mb-6">
            Access Your Library
          </h2>

          <h3 className="animate-header text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent mb-6">
            Anywhere, Anytime
          </h3>

          <p className="animate-header max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
            Experience the full power of our platform on any device. From mobile
            phones to desktop computers, your digital library is always
            accessible with the same professional quality and features.
          </p>
        </div>

        {/* Device Mockups */}
        {/* <div ref={devicesRef} className="mb-24">
          <div className="flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 lg:space-x-16">
            {devices.map((device, index) => (
              <div key={index} className="device-item group">
                <AppMockup device={device} isActive={index === 1} />
              </div>
            ))}
          </div>
        </div> */}

        {/* Mobile Features */}
        <div ref={featuresRef} className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {mobileFeatures.map((feature, index) => (
              <div
                key={index}
                className="feature-item bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800/50 rounded-2xl p-8 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl flex items-center justify-center group-hover:border-gray-600/50 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-full sm:w-fit px-8 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full">
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center">
                <Download className="w-4 h-4 text-blue-400 mr-2" />
                <span>No Download Required</span>
              </div>
              <div className="flex items-center">
                <Play className="w-4 h-4 text-purple-400 mr-2" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span>Premium Experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppPreview;
