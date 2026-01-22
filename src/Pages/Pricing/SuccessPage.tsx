import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { gsap } from "gsap";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
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
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Payment Successful!
          </h1>
          <p className="text-gray-400 text-lg">
            Thank you for your purchase. Your subscription is now active.
          </p>
          {sessionId && (
            <p className="text-xs text-gray-600 font-mono">
              Ref: {sessionId.slice(0, 10)}...
            </p>
          )}
        </div>

        <div className="pt-8 space-y-4">
          <Link to="/library">
            <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-green-900/20">
              Go to Library <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            A confirmation email has been sent to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
