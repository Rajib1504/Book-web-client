import { useState, useRef, useEffect, type FormEvent } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { gsap } from "gsap";
import { Mail, AlertCircle, ArrowRight, BookOpen } from "lucide-react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current && headerRef.current) {
      gsap.set([formRef.current, headerRef.current], { opacity: 0, y: 30 });
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      if (data.status || data.success) {
        toast.success(data.message || "OTP sent to your email!");
        // Navigate to reset password page with email in state
        navigate("/reset-password", { state: { email } });
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Failed to send OTP. Please check your email."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative w-full max-w-md z-10">
        <div ref={headerRef} className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/20 mb-6">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
            Forgot Password
          </h1>
          <p className="text-gray-400">
            Enter your email to receive a password reset code
          </p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-900/40 backdrop-blur-xl p-8 rounded-3xl border border-gray-800/50 shadow-2xl"
        >
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email Address
            </Label>
            <div className="relative group">
              <Mail
                className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-300 ${
                  isFocused ? "text-red-500" : "text-gray-500"
                }`}
              />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="pl-12 bg-gray-900/50 border-gray-700/50 focus:border-red-500/50 focus:ring-red-500/20 py-6 rounded-xl text-white placeholder:text-gray-600 transition-all font-medium"
                placeholder="yours@example.com"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-shake">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-xl font-bold shadow-lg shadow-red-600/20 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Send Reset Code <ArrowRight className="h-5 w-5" />
              </span>
            )}
          </Button>

          <div className="text-center pt-4">
            <NavLink
              to="/login"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Back to Login
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
