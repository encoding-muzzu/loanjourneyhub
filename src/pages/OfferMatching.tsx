
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

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

  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <Card className="p-8 border-none shadow-xl rounded-2xl">
            <div className="space-y-6">
              <div className="mb-8 flex justify-center">
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] opacity-20 animate-ping"></div>
                  <div className="absolute inset-3 rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <h2 className="text-2xl font-semibold text-center">Finding Best Offers</h2>
              <p className="text-gray-600 text-center">
                Please wait while we match your profile with the best available offers...
              </p>
              <Progress value={progress} className="h-2 w-full" />
              <div className="text-sm text-gray-500 animate-pulse text-center">
                Analyzing credit profile...
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* This page doesn't need a button but maintaining consistent spacing */}
      <div className="mb-4 w-full max-w-md px-4">
        {/* Empty space to maintain layout consistency */}
      </div>
    </div>
  );
}
