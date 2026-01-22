import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

const CancelPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" },
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div ref={containerRef} className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Payment Cancelled
          </h1>
          <p className="text-gray-400 text-lg">
            Your payment process was cancelled using the cancel button or the
            browser back button. No charges were made.
          </p>
        </div>

        <div className="pt-8 space-y-4">
          <Link to="/pricing">
            <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-6 text-lg rounded-xl border border-gray-700">
              <ArrowLeft className="mr-2 w-5 h-5" /> Return to Pricing
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
