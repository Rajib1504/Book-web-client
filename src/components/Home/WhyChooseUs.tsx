import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Library, Zap, ShieldCheck, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Library,
    title: "Vast & Curated Library",
    description:
      "Access thousands of handpicked books from top authors and publishers across various genres and industries.",
  },
  {
    icon: Zap,
    title: "Instant Access, No Downloads",
    description:
      "Start reading immediately in your browser. No downloads, no installations, just seamless access on any device.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Your library and reading data are kept secure and private. We prioritize your data protection with top-tier security.",
  },
  {
    icon: Globe,
    title: "Read Anywhere, Anytime",
    description:
      "Whether you are on your laptop, tablet, or phone, your library is always with you. Pick up right where you left off.",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(
        section.querySelectorAll(".feature-card"),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#0A0A0A] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Our Platform Is a Game-Changer
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            We are not just another e-book store. We are a dedicated platform
            for serious learners and readers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card p-8 bg-[#1a1a1a] border border-gray-800 rounded-xl text-center"
            >
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-6 bg-gray-900 border-2 border-red-500/50 rounded-full shadow-lg shadow-red-500/10">
                <feature.icon className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
