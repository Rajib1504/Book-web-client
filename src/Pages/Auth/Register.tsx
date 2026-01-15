/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, type FormEvent } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { gsap } from "gsap";
import {
  BookOpen,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  // Sparkles,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Star,
  Globe,
  Users,
} from "lucide-react";
import { axiosInstance } from "../../lib/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState("");

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (
      containerRef.current &&
      formRef.current &&
      headerRef.current &&
      featuresRef.current
    ) {
      // Initial animations
      gsap.set([formRef.current, headerRef.current, featuresRef.current], {
        opacity: 0,
        y: 50,
      });

      // Header entrance animation
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Features entrance animation
      gsap.to(featuresRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });

      // Form entrance animation
      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
      });

      // Floating particles animation
      gsap.to(".floating-particle", {
        y: -20,
        x: 10,
        duration: 6,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });

      // Gradient orb animation
      gsap.to(".gradient-orb", {
        scale: 1.2,
        duration: 8,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Security pattern animation
      gsap.to(".security-pattern", {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      // Feature cards animation
      gsap.to(".feature-card", {
        scale: 1.05,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.8,
      });
    }
  }, []);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await axiosInstance.post("/auth/register", {
        fullName: name,
        email,
        phone,
        password,
      });

      // Success animation
      gsap.to(formRef.current, {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Instead of immediate login, redirect to OTP verification
          navigate("/verify-otp", { state: { email } });
        },
      });
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      // Error shake animation
      gsap.to(formRef.current, {
        x: -10,
        duration: 0.1,
        ease: "power2.out",
        yoyo: true,
        repeat: 5,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = (field: string) => {
    setIsFocused(field);
    gsap.to(`#${field}-container`, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleInputBlur = (field: string) => {
    setIsFocused("");
    gsap.to(`#${field}-container`, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // Registration benefits
  const benefits = [
    {
      icon: BookOpen,
      title: "Unlimited Access",
      description: "Browse millions of books and resources",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Join Community",
      description: "Connect with fellow book lovers worldwide",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Star,
      title: "Premium Features",
      description: "Access advanced reading tools and analytics",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl floating-particle gradient-orb"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/4 rounded-full blur-3xl floating-particle"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl floating-particle"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Security Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border border-red-500/20 rounded-full security-pattern"></div>
          <div className="absolute top-20 left-20 w-16 h-16 border border-blue-500/20 rounded-full security-pattern"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border border-purple-500/20 rounded-full security-pattern"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-yellow-500/20 rounded-full security-pattern"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-32 right-32 w-8 h-8 text-red-500/20 floating-particle">
          <Users className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 left-32 w-6 h-6 text-blue-500/20 floating-particle">
          <Star className="w-full h-full" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-10 h-10 text-purple-500/20 floating-particle">
          <Globe className="w-full h-full" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {/* Enhanced Header */}
          <div ref={headerRef} className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-8 w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-3xl">
              <BookOpen className="h-12 w-12 text-red-400" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-red-400 bg-clip-text text-transparent mb-6">
              Join the Revolution
            </h1>

            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Create Your Digital Library
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Embark on an extraordinary journey through the world of knowledge.
              Join thousands of readers who have already discovered the future
              of digital reading.
            </p>
          </div>

          {/* Benefits Section */}
          <div ref={featuresRef} className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="feature-card bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-gray-800/50 rounded-2xl p-8 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-black/30 transition-all duration-300 group hover:-translate-y-2"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl flex items-center justify-center group-hover:border-gray-600/50 transition-colors duration-300">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Form */}
          <div className="relative max-w-md mx-auto">
            <form ref={formRef} onSubmit={handleRegister} className="space-y-8">
              {/* Name Field */}
              <div id="name-container" className="relative group">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-300 mb-3 block"
                >
                  Full Name
                </Label>
                <div className="relative">
                  <User
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                      isFocused === "name" ? "text-red-400" : "text-gray-500"
                    }`}
                  />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => handleInputFocus("name")}
                    onBlur={() => handleInputBlur("name")}
                    required
                    className="pl-12 pr-4 py-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div id="email-container" className="relative group">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300 mb-3 block"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                      isFocused === "email" ? "text-red-400" : "text-gray-500"
                    }`}
                  />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => handleInputFocus("email")}
                    onBlur={() => handleInputBlur("email")}
                    required
                    className="pl-12 pr-4 py-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div id="phone-container" className="relative group">
                <Label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-300 mb-3 block"
                >
                  Phone Number
                </Label>
                <div className="relative">
                  <Zap
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                      isFocused === "phone" ? "text-red-400" : "text-gray-500"
                    }`}
                  />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onFocus={() => handleInputFocus("phone")}
                    onBlur={() => handleInputBlur("phone")}
                    required
                    className="pl-12 pr-4 py-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div id="password-container" className="relative group">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300 mb-3 block"
                >
                  Password
                </Label>
                <div className="relative">
                  <Lock
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                      isFocused === "password"
                        ? "text-red-400"
                        : "text-gray-500"
                    }`}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => handleInputFocus("password")}
                    onBlur={() => handleInputBlur("password")}
                    required
                    className="pl-12 pr-12 py-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-2 border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Create Account</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-gray-400">
                  Already part of the community?
                </span>
              </div>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <NavLink
                to="/login"
                className="inline-flex items-center space-x-2 px-2 py-2   text-gray-300 hover:text-white transition-all duration-300 group relative overflow-hidden"
              >
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />

                {/* Animated Underline */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </NavLink>
            </div>
          </div>

          {/* Trust Features */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 px-8 py-4 bg-gradient-to-r from-red-600/10 to-blue-600/10 border border-red-500/20 rounded-full">
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <Shield className="h-4 w-4" />
                <span>100% Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400 text-sm">
                <Zap className="h-4 w-4" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>Free Forever</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
