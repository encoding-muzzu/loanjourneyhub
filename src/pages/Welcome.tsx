
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { ArrowRight, Shield, CreditCard, DollarSign } from "lucide-react";

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

  const cardVariants = {
    hidden: { y: -20, opacity: 0, rotateY: 15, rotateX: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4 overflow-hidden">
      <div className="max-w-md w-full px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: -100, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
          className="absolute -right-20 -top-32 w-64 h-40 rotate-12 sm:block hidden"
        >
          <div className="gradient-card w-full h-full flex flex-col justify-end p-5 shadow-2xl">
            <div className="text-xl font-light tracking-widest">2781 8191 6671 3190</div>
            <div className="text-sm mt-6 font-light">Exp. 09/29</div>
            <div className="text-sm mt-1 font-light">Your Name</div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mt-16 sm:mt-40"
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
            Experience seamless loan matching<br />
            makes managing your finances easy and intuitive
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mb-12"
          >
            <Button
              onClick={handleStart}
              size="lg"
              className="gradient-button px-8 py-6 text-lg font-medium rounded-full flex items-center gap-2 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <ArrowRight className="ml-1" />
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              No credit check required to view your offers
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
          >
            <motion.div 
              variants={itemVariants}
              className="card-overlay p-4 flex flex-col items-center text-white"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Shield className="mb-2 text-white h-6 w-6" />
              <p className="text-sm font-medium">Secure & Private</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="card-overlay p-4 flex flex-col items-center text-white"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <CreditCard className="mb-2 text-white h-6 w-6" />
              <p className="text-sm font-medium">Multiple Offers</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="card-overlay p-4 flex flex-col items-center text-white"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <DollarSign className="mb-2 text-white h-6 w-6" />
              <p className="text-sm font-medium">Best Rates</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Mobile card - only visible on small screens */}
        <motion.div 
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="sm:hidden block mt-10 mx-auto w-full max-w-[260px]"
        >
          <div className="gradient-card w-full aspect-[1.6/1] flex flex-col justify-end p-5 shadow-2xl">
            <div className="text-base font-light tracking-widest">2781 8191 6671 3190</div>
            <div className="text-xs mt-4 font-light">Exp. 09/29</div>
            <div className="text-xs mt-1 font-light">Your Name</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
