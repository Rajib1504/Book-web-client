import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Key, BookOpenCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    title: "Discover Your Next Read",
    description:
      "Navigate our extensive library. Use smart filters to find books that match your interests, from bestsellers to niche genres.",
  },
  {
    icon: Key,
    title: "Unlock Instant Access",
    description:
      "Purchase individual books or subscribe to our premium plan to unlock the entire collection. Your library is available immediately.",
  },
  {
    icon: BookOpenCheck,
    title: "Read Anywhere, Anytime",
    description:
      "Enjoy a seamless reading experience on any device. Our web-based reader saves your progress, so you can pick up where you left off.",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = gsap.utils.toArray(".timeline-card");
    const timeline = timelineRef.current;

    // Desktop and Tablet Timeline Animation
    if (timeline && window.innerWidth >= 768) {
      gsap.fromTo(
        timeline,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: cards.length * 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom bottom-=100",
            scrub: 1,
          },
        }
      );
    }

    // Card Animation for all screen sizes
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      gsap.fromTo(
        cardElement,
        { opacity: 0.2, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardElement,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-black text-white overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Unlock a universe of knowledge in three simple steps.
          </p>
        </div>

        {/* Timeline for Desktop and Tablet */}
        <div className="hidden md:block relative">
          <div
            ref={timelineRef}
            className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-800"
          ></div>
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center w-full ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="w-1/2 px-8">
                  <div
                    className={`timeline-card p-8 bg-[#1a1a1a] border border-gray-800 rounded-xl shadow-lg relative ${
                      index % 2 === 0 ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-black ${
                        index % 2 === 0 ? "right-[-2.25rem]" : "left-[-2.25rem]"
                      } `}
                    ></div>
                    <step.icon
                      className={`h-10 w-10 text-red-500 mb-4 ${
                        index % 2 === 0 ? "ml-auto" : "mr-auto"
                      }`}
                    />
                    <h3 className="text-2xl font-semibold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simple List for Mobile */}
        <div className="md:hidden space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="timeline-card flex items-start space-x-6"
            >
              <div className="flex-shrink-0 mt-1 flex items-center justify-center h-16 w-16 bg-[#1a1a1a] border border-gray-800 rounded-full">
                <step.icon className="h-8 w-8 text-red-500" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
