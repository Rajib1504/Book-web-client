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
import { Badge } from "../ui/badge";

gsap.registerPlugin(ScrollTrigger);

interface Plan {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  features: string[];
  priceMonthly: number;
  priceAnnual: number;
  priceMonthlyText: string;
  priceAnnualText: string;
  savePercent: number;
  saveText: string | null;
  isActive: boolean;
}

const PricingPlans = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const [loading, setLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  const isPro = user?.plan === "pro";

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await axiosInstance.get("/plans");
        if (data.status) {
          setPlans(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  useEffect(() => {
    if (!loading && plans.length > 0) {
      const section = sectionRef.current;
      if (section) {
        gsap.fromTo(
          section.querySelectorAll(".pricing-card"),
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
    }
  }, [loading, plans]);

  const handlePurchase = async (plan: Plan) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setPurchaseLoading(plan.id);

    try {
      const { data } = await axiosInstance.post(`/stripe/subscribe`, {
        planId: plan.id,
        planType: billingCycle,
      });

      if (data.status && data.data.url) {
        toast.loading("Redirecting to checkout...");
        // Redirect to Stripe Checkout
        window.location.href = data.data.url;
      } else {
        toast.error(data.message || "Failed to initiate checkout");
      }
    } catch (error: any) {
      console.error("Stripe Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to initiate checkout"
      );
    } finally {
      setPurchaseLoading(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-black text-white relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Choose the plan that's right for you and get instant access to our
            entire library.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm font-medium ${
                billingCycle === "monthly" ? "text-white" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setBillingCycle((prev) =>
                  prev === "monthly" ? "annual" : "monthly"
                )
              }
              className="relative w-14 h-7 bg-gray-800 rounded-full p-1 transition-colors duration-300 hover:bg-gray-700"
            >
              <div
                className={`w-5 h-5 bg-red-600 rounded-full transition-transform duration-300 transform ${
                  billingCycle === "annual" ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                billingCycle === "annual" ? "text-white" : "text-gray-500"
              }`}
            >
              Annual
              <Badge className="ml-2 bg-green-500/20 text-green-500 border-green-500/30">
                Save 40%+
              </Badge>
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner />
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              plans.length === 1
                ? "max-w-2xl mx-auto"
                : plans.length === 2
                ? "max-w-5xl mx-auto grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="pricing-card relative bg-[#111111]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 flex flex-col overflow-hidden shadow-2xl transition-all duration-500 hover:border-red-600/30 group"
              >
                {/* Promotion Badge */}
                {plan.saveText && billingCycle === "annual" && (
                  <div className="absolute top-0 right-10 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1.5 rounded-b-lg font-bold text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {plan.saveText}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Crown className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                    {plan.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm mb-8 min-h-[40px]">
                  {plan.shortDescription}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-extrabold text-white">
                      {billingCycle === "monthly"
                        ? `₹${plan.priceMonthly}`
                        : `₹${plan.priceAnnual}`}
                    </span>
                    <span className="text-gray-500 text-sm">
                      /{billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {billingCycle === "monthly"
                      ? "Billed monthly"
                      : "Billed annually (Save more)"}
                  </p>
                </div>

                <div className="flex-1 space-y-4 mb-10">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    What's included:
                  </h4>
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => handlePurchase(plan)}
                  disabled={purchaseLoading !== null || isPro}
                  className="w-full cursor-pointer bg-gradient-to-r from-gray-800 to-gray-900 hover:from-red-600 hover:to-red-700 text-white py-6 text-lg font-bold rounded-xl shadow-lg transform active:scale-95 transition-all duration-300 group-hover:from-red-600 group-hover:to-red-700"
                >
                  {purchaseLoading === plan.id ? (
                    <Spinner />
                  ) : isPro ? (
                    "Current Plan"
                  ) : (
                    <>
                      Get Started <Zap className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingPlans;
