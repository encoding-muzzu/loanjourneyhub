
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { ArrowRight, Building, CreditCard, Shield } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center pt-12">
        {/* Logo Section */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="gradient-card flex items-center justify-center w-20 h-20 rounded-full p-5 shadow-lg">
            <Building size={40} className="text-white" strokeWidth={1.5} />
          </div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6"
          >
            EasyLoan
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-600 mb-4"
          >
            Welcome to your trusted loan marketplace
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="text-sm text-gray-500 mb-8 max-w-xs mx-auto"
          >
            Compare and apply for multiple loan offers tailored to your needs with just a few clicks
          </motion.p>
        </motion.div>
      </div>
      
      {/* Action button at bottom */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mb-4 w-full max-w-md px-4"
      >
        <Button
          onClick={handleStart}
          size="lg"
          className="gradient-button px-8 py-6 text-lg font-medium rounded-full w-full flex items-center justify-center gap-2 shadow-xl"
        >
          Get Started Now
          <ArrowRight className="ml-1" />
        </Button>
        <p className="mt-4 text-sm text-center text-gray-500">
          No credit check required to view your offers
        </p>
      </motion.div>
    </div>
  );
}
