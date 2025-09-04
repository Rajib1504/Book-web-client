import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Navigation links
const navLinks = [
  { title: "Home", path: "/" },
  { title: "Pricing", path: "/pricing" },
  { title: "Services", path: "/services" },
  { title: "Resources", path: "/resources" },
  { title: "About", path: "/about" },
];

const Navigation = () => {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  // GSAP animations for navigation items
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current.querySelectorAll('.nav-link'),
        { opacity: 0, y: -20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
      //     duration: 0.6, 
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.2
        }
      );
    }
  }, []);

  return (
    <div className="sticky top-0 z-40 flex justify-center py-4">
      <nav 
        ref={navRef}
        className="flex items-center space-x-1 bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 rounded-full p-2 shadow-2xl shadow-black/20"
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <NavLink
              key={link.title}
              to={link.path}
              className={`nav-link relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full group ${
                isActive
                  ? "text-white"
                  : "text-gray-300 hover:text-white hover:bg-neutral-800/50"
              }`}
            >
              <span className="relative z-10">{link.title}</span>
              
              {/* Active Indicator - Red Underline */}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-red-500 rounded-full animate-pulse"></div>
              )}
              
              {/* Hover Effect */}
              {!isActive && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
              
              {/* Active Background Glow */}
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 animate-pulse"></div>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;
