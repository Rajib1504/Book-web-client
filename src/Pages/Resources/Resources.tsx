import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  BookOpen, 
  Video, 
  Users, 
  Download, 
  Rocket, 
  HelpCircle, 
  ArrowRight, 
  Search,
  FileText,
  PlayCircle
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

gsap.registerPlugin(ScrollTrigger);

// --- Resource Categories Data ---
const resourceCategories = [
  {
    icon: BookOpen,
    title: "The PLR Playbook",
    description: "Comprehensive guides on how to rebrand, market, and sell digital products for maximum profit.",
    link: "Read Guides",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step video walkthroughs covering technical setup, design tips, and sales strategies.",
    link: "Watch Now",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  },
  {
    icon: Download,
    title: "Free Templates",
    description: "Grab free marketing templates, email swipes, and social media graphics to jumpstart your sales.",
    link: "Download",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20"
  },
  {
    icon: Users,
    title: "Community Hub",
    description: "Join our private Discord server to network with 10,000+ other digital creators and entrepreneurs.",
    link: "Join Community",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    icon: Rocket,
    title: "Case Studies",
    description: "Real-world examples of how our members turned a single PLR product into a 6-figure business.",
    link: "View Stories",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  },
  {
    icon: HelpCircle,
    title: "Help Center",
    description: "Got questions? Browse our extensive FAQ or contact our priority support team for assistance.",
    link: "Get Help",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20"
  }
];

// --- Latest Articles Data ---
const latestArticles = [
  {
    category: "Marketing",
    title: "5 Strategies to Launch Your First E-Book",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
  {
    category: "Design",
    title: "How to Create High-Converting Covers in Canva",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    category: "Sales",
    title: "Pricing Psychology: What to Charge for PLR?",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=2070&auto=format&fit=crop"
  }
];

const Resources = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const hero = heroRef.current;

    if (container && hero) {
      // 1. Hero Animation
      const heroTl = gsap.timeline();
      heroTl.fromTo(hero.querySelectorAll(".animate-hero"), 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      // 2. Resource Cards Animation
      gsap.fromTo(container.querySelectorAll(".resource-card"),
        { y: 60, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".resources-grid",
            start: "top 80%"
          }
        }
      );

      // 3. Articles Animation
      gsap.fromTo(container.querySelectorAll(".article-card"),
        { x: -30, opacity: 0 },
        {
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".articles-section",
            start: "top 75%"
          }
        }
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        
        {/* --- Hero Section --- */}
        <div ref={heroRef} className="text-center max-w-4xl mx-auto mb-20">
          <div className="animate-hero inline-flex items-center gap-2 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-medium text-sm tracking-wide uppercase">Knowledge Base</span>
          </div>
          
          <h1 className="animate-hero text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Master the Art of <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
              Digital Selling
            </span>
          </h1>
          
          <p className="animate-hero text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
            A curated collection of tools, guides, and insights designed to help you 
            build, launch, and scale your digital product business.
          </p>

          {/* Search Bar */}
          <div className="animate-hero max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <Input 
              type="text" 
              placeholder="Search for guides, tutorials, or tools..." 
              className="pl-10 py-6 bg-[#111111] border-gray-800 focus:border-red-500/50 rounded-xl text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* --- Resources Grid --- */}
        <div className="resources-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {resourceCategories.map((resource, index) => (
            <div 
              key={index}
              className="resource-card group p-8 rounded-2xl bg-[#111111] border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Hover Glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${resource.color.replace('text', 'from')}`}></div>

              <div className={`w-14 h-14 rounded-xl ${resource.bg} ${resource.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <resource.icon className={`h-7 w-7 ${resource.color}`} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                {resource.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {resource.description}
              </p>

              <div className="flex items-center text-sm font-medium text-white group-hover:underline decoration-red-500/50 underline-offset-4">
                {resource.link} <ArrowRight className="ml-2 h-4 w-4 text-red-500" />
              </div>
            </div>
          ))}
        </div>

        {/* --- Featured Section (University Preview) --- */}
        <div className="relative rounded-3xl overflow-hidden mb-32 border border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-black/80 z-0"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 z-[-1]"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center p-12 md:p-20">
            <div>
              <div className="inline-flex items-center gap-2 bg-red-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider mb-6">
                New Course
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Zero to Launch in 7 Days</h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our flagship crash course that takes you from having zero products to making your first sale in just one week. Available exclusively for Pro members.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-xl font-semibold">
                  Start Learning
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-white/10 hover:text-white px-8 py-6 rounded-xl font-semibold">
                  View Syllabus
                </Button>
              </div>
            </div>
            
            <div className="relative">
              {/* Video Preview Mockup */}
              <div className="rounded-xl overflow-hidden border border-gray-700 shadow-2xl shadow-red-900/20 relative group cursor-pointer">
                <img 
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop" 
                  alt="Course Preview" 
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <PlayCircle className="h-10 w-10 text-white fill-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Latest Insights (Blog) --- */}
        <div className="articles-section">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Insights</h2>
              <p className="text-gray-400">Strategies and tips from industry experts.</p>
            </div>
            <Button variant="link" className="text-red-500 hover:text-red-400 hidden sm:flex">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestArticles.map((article, index) => (
              <div key={index} className="article-card group cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-5 border border-gray-800 relative h-60">
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-xs font-medium text-white border border-white/10 z-10">
                    {article.category}
                  </div>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <FileText className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-red-500 transition-colors">
                  {article.title}
                </h3>
                <div className="h-0.5 w-0 bg-red-600 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resources;