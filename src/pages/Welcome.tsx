
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md text-center relative"
      >
        <div className="absolute -left-10 -top-32 w-64 h-64 rotate-12">
          <div className="gradient-card w-full h-full flex flex-col justify-end p-5 shadow-2xl">
            <div className="text-xl font-light tracking-widest">2781 8191 6671 3190</div>
            <div className="text-sm mt-6 font-light">Exp. 09/29</div>
            <div className="text-sm mt-1 font-light">Your Name</div>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-6 mt-40">
          Effortless<br />
          Loans<br />
          Simplified
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Experience seamless loan matching<br />
          makes managing your finances easy and intuitive
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleStart}
            size="lg"
            className="gradient-button px-10 py-7 text-xl font-medium rounded-full"
          >
            Get Started Now
          </Button>
        </motion.div>
        <p className="mt-6 text-sm text-gray-500">
          No credit check required to view your offers
        </p>
      </motion.div>
    </div>
  );
}
