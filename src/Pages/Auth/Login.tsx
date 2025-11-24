import { useState, useEffect, useRef, type FormEvent } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { gsap } from "gsap";
import {
  BookOpen,
  Eye,
  EyeOff,
  Mail,
  Lock,
  // Sparkles,
  Shield,
  Zap,
  ArrowRight,
  // CheckCircle,
  AlertCircle,
} from "lucide-react";
import { axiosInstance } from "../../lib/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState("");

  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

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
      particlesRef.current
    ) {
      // Initial animations
      gsap.set([formRef.current, headerRef.current], { opacity: 0, y: 50 });

      // Header entrance animation
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      // Form entrance animation
      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.6,
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
    }
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
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
          login(data.token, data);
          navigate("/", { replace: true });
        },
      });
    } catch {
      setError("Invalid credentials. Please try again.");
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

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl floating-particle gradient-orb"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/4 rounded-full blur-3xl floating-particle"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/3 rounded-full blur-3xl floating-particle"></div>

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
          <div className="absolute top-10 left-10 w-32 h-32 border border-blue-500/20 rounded-full security-pattern"></div>
          <div className="absolute top-20 left-20 w-16 h-16 border border-purple-500/20 rounded-full security-pattern"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border border-red-500/20 rounded-full security-pattern"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-green-500/20 rounded-full security-pattern"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-32 right-32 w-8 h-8 text-blue-500/20 floating-particle">
          <Shield className="w-full h-full" />
        </div>
        <div className="absolute bottom-32 left-32 w-6 h-6 text-purple-500/20 floating-particle">
          <Zap className="w-full h-full" />
        </div>
        <div className="absolute top-1/3 right-1/4 w-10 h-10 text-red-500/20 floating-particle">
          <BookOpen className="w-full h-full" />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Enhanced Header */}
          <div ref={headerRef} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6 w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-2xl">
              <BookOpen className="h-10 w-10 text-red-400" />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-100 to-red-400 bg-clip-text text-transparent mb-4">
              Welcome Back
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Sign in to access your digital library and continue your reading
              journey
            </p>
          </div>

          {/* Enhanced Form */}
          <div className="relative">
            <form ref={formRef} onSubmit={handleLogin} className="space-y-8">
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
                    placeholder="Enter your password"
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
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Sign In</span>
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
                  New to E-Book Hub?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <NavLink
                to="/register"
                className="inline-flex items-center gap-3  px-2 py-2  text-gray-300 hover:text-white transition-all duration-300 group relative overflow-hidden"
              >
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />

                {/* Animated Underline */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
              </NavLink>
            </div>
          </div>

          {/* Security Features */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-6 px-6 py-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-full">
              <div className="flex items-center space-x-2 text-blue-400 text-sm">
                <Shield className="h-4 w-4" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400 text-sm">
                <Zap className="h-4 w-4" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
