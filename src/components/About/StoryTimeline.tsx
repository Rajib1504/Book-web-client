import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Code, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Unique content for our timeline
const storySteps = [
  {
    icon: Lightbulb,
    year: "2021 - The Idea",
    title: "A Better Way Was Needed",
    description:
      "We entered the world of digital resources and saw a clear gap. Most products were outdated, poorly designed, and inaccessible. We knew creators deserved better tools to bring their visions to life.",
  },
  {
    icon: Code,
    year: "2023 - The Foundation",
    title: "Redefining an Industry",
    description:
      "We decided to build everything from the ground up. With innovation at our core, we developed a custom platform, bringing together expert writers, designers, and developers to create a new standard for digital quality.",
  },
  {
    icon: Rocket,
    year: "2025 - The Launch",
    title: "Creation Reinvented for Scale",
    description:
      "After perfecting our systems, the Master Library was born. We introduced a new way to produce high-quality digital assets at scale, making premium content creation faster and more affordable than ever before.",
  },
];

const StoryTimeline = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = gsap.utils.toArray(".timeline-card");
    const timeline = timelineRef.current;

    // Animate the timeline bar
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
            end: "bottom bottom-=150",
            scrub: 1,
          },
        }
      );
    }

    // Animate the cards
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      gsap.fromTo(
        cardElement,
        { opacity: 0.2, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
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
    <section ref={sectionRef} className="py-24 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold">Our Journey</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            A story of passion, innovation, and dedication to quality.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            ref={timelineRef}
            className="absolute left-1/2 top-0 h-full w-1 bg-gray-800 rounded-full"
          ></div>
          <div className="space-y-24">
            {storySteps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center w-full ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div className="w-1/2 px-8">
                  <div
                    className={`timeline-card p-8 bg-[#1a1a1a] border border-gray-800 rounded-2xl shadow-xl relative backdrop-blur-sm`}
                  >
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-red-600 rounded-full border-4 border-black ring-4 ring-red-500/30 ${
                        index % 2 === 0 ? "right-[-2.5rem]" : "left-[-2.5rem]"
                      }`}
                    ></div>
                    <p className="text-sm font-semibold text-red-400 mb-3">{step.year}</p>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryTimeline;