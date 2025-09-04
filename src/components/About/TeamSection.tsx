import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Unique, non-copyrighted team data
const teamMembers = [
  {
    name: "Alex Thompson",
    role: "Founder & CEO",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedin: "#",
  },
  {
    name: "Samantha Carter",
    role: "Head of Product",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    linkedin: "#",
  },
  {
    name: "Mark Davidson",
    role: "Lead Developer",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
    linkedin: "#",
  },
];

const TeamSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      // Animate header
      gsap.fromTo(
        section.querySelector(".section-header"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );

      // Sophisticated card animation
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 100, scale: 0.8, rotationX: -45 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
              },
            }
          );

          // 3D Tilt Effect on hover
          card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (-y / rect.height) * 10;
            const rotateY = (x / rect.width) * 10;
            gsap.to(card, {
              rotationX: rotateX,
              rotationY: rotateY,
              transformPerspective: 1000,
              ease: "power2.out",
              duration: 0.5,
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              ease: "power2.out",
              duration: 1,
            });
          });
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="section-header text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20 mb-6">
            <Users className="h-5 w-5 text-red-400" />
            <span className="text-red-400 font-medium">THE TEAM</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            The Minds Behind the Magic
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            A dedicated team of creators, innovators, and dreamers committed to
            redefining the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el!;
              }}
              className="team-card relative rounded-2xl overflow-hidden group"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <div className="h-0.5 w-16 bg-red-500 my-2 transition-all duration-500 group-hover:w-24"></div>
                <div className="flex items-center justify-between opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <p className="text-red-400 font-semibold">{member.role}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-full hover:bg-red-500 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;