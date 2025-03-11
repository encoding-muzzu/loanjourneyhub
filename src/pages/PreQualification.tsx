
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { Card } from "@/components/ui/card";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default function PreQualification() {
  const navigate = useNavigate();
  const { setCurrentStep } = useProgress();
  const [loading, setLoading] = useState(false);

  const handleViewOffer = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setCurrentStep('pan-verification');
      navigate('/pan-verification');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Card className="p-8 rounded-xl shadow-xl border-none bg-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pre-Qualified Loan Offer
              </h2>
              
              <div className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] p-8 rounded-xl mb-6 text-center shadow-md">
                <div className="text-white text-sm font-medium mb-2">Pre-Qualified Amount</div>
                <div className="text-white text-4xl font-bold mb-2">₹5,00,000</div>
                <div className="text-white/80 text-sm">Maximum eligible amount</div>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg mb-8">
              <ShieldCheck className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
              <span className="text-sm text-gray-600">
                This is a pre-qualified amount based on your preliminary assessment. The final loan amount may be adjusted after detailed verification.
              </span>
            </div>

            <Button
              onClick={handleViewOffer}
              className="gradient-button w-full py-6 text-lg font-medium rounded-full flex items-center justify-center gap-2 shadow-xl"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="mr-2">Processing</span>
                  <span className="flex gap-1">
                    <span className="animate-bounce h-1.5 w-1.5 rounded-full bg-white"></span>
                    <span className="animate-bounce h-1.5 w-1.5 rounded-full bg-white animation-delay-200"></span>
                    <span className="animate-bounce h-1.5 w-1.5 rounded-full bg-white animation-delay-400"></span>
                  </span>
                </>
              ) : (
                <>
                  View Offer
                  <ArrowRight className="ml-1" />
                </>
              )}
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
