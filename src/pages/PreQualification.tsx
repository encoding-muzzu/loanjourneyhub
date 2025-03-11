
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { Card } from "@/components/ui/card";

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
        className="space-y-6"
      >
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Congratulations! You're Pre-Qualified
          </h2>
          
          <div className="text-center mb-8">
            <div className="text-4xl font-bold text-primary mb-2">
              ₹5,00,000
            </div>
            <p className="text-gray-600">
              Maximum Pre-Qualified Loan Amount
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Interest Rate Starting From</span>
              <span className="font-semibold">10.5% p.a.</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Tenure Available</span>
              <span className="font-semibold">Up to 60 months</span>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleViewOffer}
              className="w-full md:w-auto px-8"
              size="lg"
              disabled={loading}
            >
              {loading ? "Processing..." : "View Complete Offer"}
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              This is a pre-qualified offer and may be adjusted during verification
            </p>
          </div>
        </Card>
      </motion.div>
    </Layout>
  );
}
