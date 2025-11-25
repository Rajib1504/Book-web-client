import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles, Award, TrendingUp, Users } from "lucide-react";

// Swiper styles import
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/effect-cards";

gsap.registerPlugin(ScrollTrigger);

// Enhanced testimonial data with ratings and achievements
const testimonials = [
  {
    name: "Sarah L.",
    title: "Digital Marketing Director",
    company: "TechFlow Solutions",
    quote:
      "The digital assets from this platform have been a game-changer for my marketing campaigns. The quality is exceptional, and the variety is incredible. I've seen a 40% increase in engagement since implementing their content.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    achievement: "Top Performer",
    industry: "Marketing",
    verified: true,
  },
  {
    name: "David C.",
    title: "Founder & CEO",
    company: "InnovateStart",
    quote:
      "As a new startup, creating content from scratch was time-consuming and expensive. This library saved us hundreds of hours and thousands of dollars. The private label rights made it easy to customize everything to our brand.",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
    achievement: "Early Adopter",
    industry: "Technology",
    verified: true,
  },
  {
    name: "Emily R.",
    title: "Content Creator & Influencer",
    company: "Creative Empire",
    quote:
      "I was blown away by the variety and quality of the e-books. It's my secret weapon for creating amazing content for my audience. The templates are so professional that my followers think I have a full design team!",
    image: "https://randomuser.me/api/portraits/women/47.jpg",
    rating: 5,
    achievement: "Content Queen",
    industry: "Content Creation",
    verified: true,
  },
  {
    name: "Michael B.",
    title: "Business Coach & Consultant",
    company: "Success Path Coaching",
    quote:
      "An incredible resource for any entrepreneur. The private label rights make it easy to rebrand and sell valuable products. I've created multiple income streams using their library. This is pure gold for business owners.",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
    rating: 5,
    achievement: "Business Expert",
    industry: "Coaching",
    verified: true,
  },
  {
    name: "Lisa M.",
    title: "E-commerce Specialist",
    company: "Digital Storefront",
    quote:
      "The product templates and graphics have transformed my online store. Professional quality that converts visitors into customers. The ROI on this investment has been phenomenal - highly recommend for any e-commerce business.",
    image: "https://randomuser.me/api/portraits/women/49.jpg",
    rating: 5,
    achievement: "Sales Champion",
    industry: "E-commerce",
    verified: true,
  },
];

// Statistics data
const stats = [
  { number: "50K+", label: "Happy Members", icon: Users },
  { number: "98%", label: "Satisfaction Rate", icon: Star },
  { number: "200+", label: "Countries Served", icon: TrendingUp },
  { number: "4.9/5", label: "Average Rating", icon: Award },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const stats = statsRef.current;

    if (section && header && stats) {
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

      // Stats animation
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

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -15,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.8,
      });
    }
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-600"
        }`}
      />
    ));
  };

  return (
    <section ref={sectionRef} className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-32 left-20 w-80 h-80 bg-red-500/8 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-red-600/6 rounded-full blur-3xl floating-element"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl floating-element"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="text-center mb-24">
          <div className="inline-flex items-center justify-center mb-8 px-6 py-3 bg-red-600/10 border border-red-500/20 rounded-full">
            <Quote className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-red-400 font-medium">Testimonials</span>
          </div>
          
          <h2 className="animate-header text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-red-400 bg-clip-text text-transparent mb-8 leading-tight">
            Loved by Entrepreneurs Worldwide
          </h2>
          
          <p className="animate-header max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
            Don't just take our word for it. Here's what our members are saying about their 
            experience with our platform and how it's transformed their businesses.
          </p>
        </div>

        {/* Statistics Section */}
        <div ref={statsRef} className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-500/30 rounded-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-red-500" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Testimonials Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Custom Navigation */}
          <div className="flex items-center justify-center mb-12 space-x-4">
            <button
              onClick={() => swiper?.slidePrev()}
              className="group p-3 bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/30 rounded-full hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 hover:scale-110"
            >
              <ArrowLeft className="h-5 w-5 text-red-500 group-hover:text-red-400" />
            </button>
            
            <div className="text-center">
              <div className="text-sm text-gray-400">Swipe or use arrows</div>
            </div>
            
            <button
              onClick={() => swiper?.slideNext()}
              className="group p-3 bg-gradient-to-r from-red-600/20 to-red-700/20 border border-red-500/30 rounded-full hover:from-red-600/30 hover:to-red-700/30 transition-all duration-300 hover:scale-110"
            >
              <ArrowRight className="h-5 w-5 text-red-500 group-hover:text-red-400" />
            </button>
          </div>

          <Swiper
            onSwiper={setSwiper}
            spaceBetween={40}
            centeredSlides={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              type: 'bullets',
            }}
            navigation={false}
            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{
              crossFade: true
            }}
            className="testimonials-swiper"
            loop={true}
            speed={800}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="relative pb-8">
                  {/* Achievement Badge */}
                  <div className="absolute top-0 right-0 z-10">
                    <div className="flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full shadow-lg">
                      <Sparkles className="h-4 w-4 text-white mr-2" />
                      <span className="text-white text-sm font-medium">{testimonial.achievement}</span>
                    </div>
                  </div>

                  {/* Main Testimonial Card */}
                  <div className="bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] border border-gray-800/50 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/30 relative overflow-hidden">
                    {/* Quote Icon Background */}
                    <div className="absolute top-8 right-8 opacity-5">
                      <Quote className="h-32 w-32 text-white" />
                    </div>

                    {/* Industry Badge */}
                    <div className="inline-flex items-center px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs text-gray-300 mb-8">
                      {testimonial.industry}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl md:text-2xl font-medium text-gray-200 leading-relaxed mb-8 relative z-10">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex items-center mb-8">
                      <div className="flex items-center mr-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="text-gray-400 text-sm">Verified Customer</span>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-16 w-16 rounded-2xl border-2 border-red-500/30 shadow-lg"
                        />
                        {testimonial.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="ml-6">
                        <h4 className="text-xl font-bold text-white mb-1">
                          {testimonial.name}
                        </h4>
                        <p className="text-red-400 font-medium mb-1">{testimonial.title}</p>
                        <p className="text-gray-400 text-sm">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div className="swiper-pagination flex justify-center mt-12 space-x-2"></div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-24">
          <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-full">
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>100% Verified Reviews</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Real Customer Stories</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Updated Monthly</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style>{`
        .testimonials-swiper .swiper-pagination-bullet {
          background: rgba(239, 68, 68, 0.3);
          opacity: 1;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }
        
        .testimonials-swiper .swiper-pagination-bullet-active {
          background: #ef4444;
          transform: scale(1.2);
        }
        
        .testimonials-swiper .swiper-slide {
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        
        .testimonials-swiper .swiper-slide-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;