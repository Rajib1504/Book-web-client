import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Star, Package } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Data for stats and logos
const stats = [
  { icon: Users, endValue: 20000, label: "Happy Users" },
  { icon: Star, endValue: 98, label: "Satisfaction Rate", suffix: "%" },
  { icon: Package, endValue: 1000, label: "Products Created" },
];

const logos = [
  // Replace with your desired logos. Use transparent PNGs for best results.
  "https://cdn.worldvectorlogo.com/logos/business-insider-1.svg",
  "https://cdn.worldvectorlogo.com/logos/business-insider-1.svg",
  "https://cdn.worldvectorlogo.com/logos/business-insider-1.svg",
  "https://cdn.worldvectorlogo.com/logos/business-insider-1.svg",
  "https://cdn.worldvectorlogo.com/logos/business-insider-1.svg",
  "https://cdn.worldvectorlogo.com/logos/business-insider-1.svg",
//   "https://cdn.worldvectorlogo.com/logos/fox-news-channel.svg",
//   "https://cdn.worldvectorlogo.com/logos/associated-press.svg",
//   "https://cdn.worldvectorlogo.com/logos/benzinga.svg",
//   "https://cdn.worldvectorlogo.com/logos/nbc-4.svg",
//   "https://cdn.worldvectorlogo.com/logos/forbes-5.svg",
];

// Duplicate logos for a seamless infinite scroll effect
const extendedLogos = [...logos, ...logos];

const TrustBadges = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counterValues, setCounterValues] = useState([0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (section && !hasAnimated) {
      // Animate stats with a number counter
      stats.forEach((stat, index) => {
        const target = section.querySelector(`.stat-value-${index}`);
        if (target) {
          gsap.to({}, {
            duration: 3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              start: "top 85%",
              onEnter: () => {
                // Start the counter animation
                const startTime:number = Date.now();
                const duration = 3000; // 3 seconds
                
                const updateCounter = () => {
                  const elapsed = Date.now() - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const currentValue = Math.floor(stat.endValue * progress);
                  
                  setCounterValues(prev => {
                    const newValues = [...prev];
                    newValues[index] = currentValue;
                    return newValues;
                  });
                  
                  if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                  } else {
                    // Ensure final value is set
                    setCounterValues(prev => {
                      const newValues = [...prev];
                      newValues[index] = stat.endValue;
                      return newValues;
                    });
                  }
                };
                
                updateCounter();
                setHasAnimated(true);
              },
              once: true
            }
          });
        }
      });
    }
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-24 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-900 border-2 border-gray-800 rounded-full mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-red-500" />
              </div>
              <p
                className={`stat-value-${index} text-5xl font-extrabold text-white`}
              >
                {counterValues[index].toLocaleString()}{stat.suffix || "+"}
              </p>
              <p className="mt-2 text-lg text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Infinite Logo Scroller */}
        <div className="mt-24">
          <p className="text-center text-gray-500 font-medium mb-8">
            TRUSTED BY INDUSTRY LEADERS
          </p>
          <div
            className="relative w-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
            }}
          >
            <div className="flex animate-infinite-scroll">
              {extendedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 h-16 mx-8 flex items-center justify-center"
                >
                  <img
                    src={logo}
                    alt={`Partner logo ${index + 1}`}
                    className="max-h-10 w-auto object-contain filter grayscale invert brightness-0 opacity-60 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;