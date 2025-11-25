import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle, Zap, Crown, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { Spinner } from "../ui/spinner";

gsap.registerPlugin(ScrollTrigger);

const singlePlan = {
  name: "Master Library Access",
  price: 197,
  oldPrice: 497,
  badge: "Limited Time Offer",
  description: "One payment. Lifetime access. Unlimited possibilities.",
  features: [
    "Instant Access to 1,000+ PLR Products",
    "New Premium Products Added Weekly",
    "Lifetime Private Label Rights (PLR)",
    "Unlimited Downloads Forever",
    "Digital Product University Access",
    "Pro Tools (Title Generator, Description Writer)",
    "100+ Professional E-book Covers",
    "Priority Support & Product Requests",
    "30-Day Money-Back Guarantee",
  ],
};

const PricingPlans = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user, updateUser } = useAuth();
  // console.log(user?.data?._id);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const isPro = user?.plan === "pro";
  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      gsap.fromTo(
        section.querySelector(".pricing-card"),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }
  }, []);

  const handlePurchse = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user.plan === "pro") {
      toast("You are already a Pro member!", {
        icon: "👑",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    setloading(true);

    const data = axiosInstance.put(`/users/update-plan`, {
      plan: "pro",
    });
    toast.promise(data, {
      loading: "Processing your upgrade...",
      success: "Upgrade successful! Welcome to Pro 🚀",
      error: "Failed to upgrade. Please try again.",
    });
    try {
      const responce = await data;
      if (responce.status === 200) {
        const updatedUserData = {
          ...user,
          ...responce.data.data,
          plan: "pro",
        };
        updateUser(updatedUserData);
        setTimeout(() => {
          navigate("/library");
        }, 500);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Single Premium Card */}
          <div className="pricing-card relative bg-[#111111]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
            {/* Top Badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-b-xl font-bold text-sm tracking-wider shadow-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {singlePlan.badge}
            </div>

            <div className="flex flex-col md:flex-row gap-12 mt-8">
              {/* Left Side: Pricing Info */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                    <Crown className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {singlePlan.name}
                  </h3>
                </div>

                <p className="text-gray-400 text-lg mb-6">
                  {singlePlan.description}
                </p>

                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-6xl font-extrabold text-white">
                    ${singlePlan.price}
                  </span>
                  <span className="text-2xl text-gray-500 line-through decoration-red-500/50">
                    ${singlePlan.oldPrice}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium mb-8">
                  One-time payment • No recurring fees
                </p>

                <Button
                  onClick={handlePurchse}
                  disabled={loading || isPro}
                  className="w-full cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-7 text-xl font-bold rounded-xl shadow-lg shadow-red-600/20 transform hover:scale-[1.02] transition-all duration-300"
                >
                  {loading ? (
                    <Spinner />
                  ) : isPro? (
                    "You are already a Member"
                  ) : (
                    <>
                      Get Lifetime Access Now <Zap className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Secure payment • Instant access
                </p>
              </div>

              {/* Divider for Mobile/Desktop */}
              <div className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-gray-800 to-transparent" />

              {/* Right Side: Features */}
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  Everything included:
                </h4>
                <ul className="space-y-4">
                  {singlePlan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-[15px] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
