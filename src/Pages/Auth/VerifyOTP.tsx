import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Mail, AlertCircle, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedData = value.substring(0, 6).split("");
      const newOtp = [...otp];
      pastedData.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      // Focus last filled or next input
      const nextIndex = Math.min(index + pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp: otpCode,
      });

      if (data.status) {
        toast.success("Email verified successfully!");
        navigate("/login");
      } else {
        setError(data.message || "Verification failed");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Verification failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] text-white flex items-center justify-center p-4">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border border-gray-800/50 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-black/50 backdrop-blur-xl"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-8 w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-3xl shadow-lg shadow-red-500/10 transition-transform hover:scale-105 duration-300">
            <Mail className="h-12 w-12 text-red-500" />
          </div>
          <h2 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
            Verify Email
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Enter the 6-digit code sent to <br />
            <span className="text-red-400 font-semibold">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-10">
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {otp.map((digit, idx) => (
              <Input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-full h-12 sm:h-16 text-center text-xl sm:text-3xl font-bold bg-[#252525]/50 border-2 border-gray-800/50 rounded-xl sm:rounded-2xl focus:border-red-500/50 focus:ring-4 focus:ring-red-500/10 transition-all duration-300 text-white placeholder-gray-600"
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center space-x-3 p-5 bg-red-500/10 border border-red-500/20 rounded-2xl animate-shake">
              <AlertCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400 font-medium">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold text-lg rounded-2xl shadow-xl shadow-red-500/20 hover:shadow-red-500/30 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-center justify-center space-x-3">
              <span>{isLoading ? "Verifying..." : "Verify Identity"}</span>
              {!isLoading && (
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              )}
            </div>
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Entered the wrong email?{" "}
              <span className="text-red-400 font-semibold underline">
                Go back
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
