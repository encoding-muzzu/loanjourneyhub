
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";

export default function PanVerification() {
  const navigate = useNavigate();
  const { setCurrentStep } = useProgress();
  const [pan, setPan] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pan.length !== 10) {
      toast({
        variant: "destructive",
        title: "Invalid PAN",
        description: "Please enter a valid 10-digit PAN number"
      });
      return;
    }
    setCurrentStep('offer-matching');
    navigate('/offer-matching');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
            <div className="gradient-card p-6">
              <CardTitle className="text-white text-2xl font-light">Verify Your PAN</CardTitle>
              <CardDescription className="text-white/80 mt-1">
                We need your PAN details to fetch the best offers
              </CardDescription>
            </div>
            <CardContent className="p-6">
              <div className="flex-1">
                <Input
                  placeholder="Enter PAN Number"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  className="uppercase text-lg py-6 rounded-xl border-gray-200"
                  maxLength={10}
                />
              </div>
              <div className="text-sm text-gray-500 mt-4">
                Your PAN will be used to check credit eligibility
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Action button at bottom */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mb-4 w-full max-w-md px-4"
      >
        <Button 
          onClick={handleSubmit}
          className="gradient-button w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl"
        >
          Verify & Proceed
          <ArrowRight className="ml-1" />
        </Button>
      </motion.div>
    </div>
  );
}
