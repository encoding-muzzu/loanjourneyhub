
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { Card } from "@/components/ui/card";
import { BadgeCheck, BadgeDollarSign, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <Card className="p-8 rounded-xl shadow-xl border-none bg-white">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <BadgeCheck className="h-8 w-8 text-[#10b981]" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Pre-Qualified
            </h2>
            <p className="text-gray-500 text-sm">
              Based on your preliminary assessment
            </p>
          </div>

          <div className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] p-6 rounded-xl mb-6 text-center shadow-md">
            <div className="text-white text-sm font-medium mb-2">Your Pre-Qualified Amount</div>
            <div className="text-white text-4xl font-bold mb-1">₹5,00,000</div>
            <div className="text-white/80 text-xs">Maximum eligible amount</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <ShieldCheck className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-sm text-gray-600">This is a pre-qualified offer that may be adjusted during verification</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <BadgeDollarSign className="h-5 w-5 text-gray-500 mr-3" />
              <span className="text-sm text-gray-600">Interest rates starting from 10.5% p.a.</span>
            </div>
          </div>

          <Button
            onClick={handleViewOffer}
            className="gradient-button w-full py-3 font-medium text-base"
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
              "View Offer"
            )}
          </Button>
        </Card>
      </motion.div>
    </Layout>
  );
}
