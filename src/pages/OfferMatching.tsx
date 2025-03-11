
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { Progress } from "@/components/ui/progress";

export default function OfferMatching() {
  const navigate = useNavigate();
  const { setCurrentStep } = useProgress();

  useEffect(() => {
    // Simulate loading and redirect
    const timer = setTimeout(() => {
      setCurrentStep('offers');
      navigate('/offers');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, setCurrentStep]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto text-center"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Finding Best Offers</h2>
          <p className="text-gray-600">
            Please wait while we match your profile with the best available offers...
          </p>
          <Progress value={33} className="w-full" />
          <div className="text-sm text-gray-500 animate-pulse">
            Analyzing credit profile...
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}
