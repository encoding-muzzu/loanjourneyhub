
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { ArrowRight } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();
  const { setCurrentStep } = useProgress();

  const handleStart = () => {
    setCurrentStep('pre-qualification');
    navigate('/pre-qualification');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
      <div className="max-w-md w-full px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Effortless<br />
            Loans<br />
            Simplified
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-400 mb-8"
          >
            Experience seamless loan matching that<br />
            makes managing your finances easy and intuitive
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleStart}
                size="lg"
                className="gradient-button px-8 py-6 text-lg font-medium rounded-full flex items-center gap-2 shadow-xl"
              >
                Get Started Now
                <ArrowRight className="ml-1" />
              </Button>
            </motion.div>
            <p className="mt-4 text-sm text-gray-500">
              No credit check required to view your offers
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
