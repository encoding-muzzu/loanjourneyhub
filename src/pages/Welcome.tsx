
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";

export default function Welcome() {
  const navigate = useNavigate();
  const { setCurrentStep } = useProgress();

  const handleStart = () => {
    setCurrentStep('pre-qualification');
    navigate('/pre-qualification');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to LoanJourneyHub
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover loan offers tailored just for you, quickly and easily.
          Get started in just a few minutes.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleStart}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-lg shadow-lg"
          >
            Get Started
          </Button>
        </motion.div>
        <p className="mt-6 text-sm text-gray-500">
          No credit check required to view your offers
        </p>
      </motion.div>
    </div>
  );
}
