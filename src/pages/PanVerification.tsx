
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function PanVerification() {
  const navigate = useNavigate();
  const { setCurrentStep } = useProgress();
  const [pan, setPan] = useState("");
  const { toast } = useToast();
  
  // Sample pre-collected user data - in a real app, this would come from previous steps or context
  const userData = {
    name: "Rahul Sharma",
    mobile: "98765 43210"
  };

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
            <div className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] p-6">
              <CardTitle className="text-white text-2xl font-light">Offer Details & PAN Verification</CardTitle>
              <CardDescription className="text-white/80 mt-1">
                We need your PAN to match you with the best lenders
              </CardDescription>
            </div>
            <CardContent className="p-6">
              {/* Auto-populated user details */}
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Your Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name</span>
                    <span className="font-medium">{userData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mobile</span>
                    <span className="font-medium">{userData.mobile}</span>
                  </div>
                </div>
              </div>
              
              {/* PAN input */}
              <div className="mb-6">
                <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter PAN Number
                </label>
                <Input
                  id="pan"
                  placeholder="ABCDE1234F"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  className="uppercase text-lg py-6 rounded-xl border-gray-200"
                  maxLength={10}
                />
              </div>
              
              {/* Consent message */}
              <div className="mb-4 p-4 border border-blue-100 bg-blue-50 rounded-lg">
                <div className="flex gap-2">
                  <ShieldCheck className="text-blue-500 h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Consent Required</h4>
                    <p className="text-xs text-blue-600 mt-1">
                      By proceeding, you consent to a full bureau pull which allows us to match you with different lenders and their best offers.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Disclaimer */}
              <div className="text-xs text-gray-500 mt-4">
                <p>Disclaimer: Final loan amount, interest rate, and term will be based on the lender's underwriting policies and your credit profile.</p>
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
          className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl"
        >
          Proceed with Consent
          <ArrowRight className="ml-1" />
        </Button>
      </motion.div>
    </div>
  );
}
