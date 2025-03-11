
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  ArrowRight, 
  ShieldCheck, 
  Video, 
  Info, 
  IdCard 
} from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/components/ui/use-toast";

const KycProcess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentStep } = useProgress();
  const [selectedOption, setSelectedOption] = useState<number | null>(3); // Default to option 3 (Upload documents)

  const handleOptionSelect = (optionNumber: number) => {
    if (optionNumber === 3) {
      setSelectedOption(optionNumber);
    } else {
      // Show toast for disabled options
      toast({
        title: "Option Unavailable",
        description: "This verification method is currently disabled. Please use document upload."
      });
    }
  };

  const handleProceed = () => {
    if (selectedOption === 3) {
      // In a real app, navigate to document upload screen
      toast({
        title: "Proceeding to Document Upload",
        description: "You'll now be able to upload your ID and address proof documents."
      });
      // For now, we'll just display a toast since the next page isn't implemented yet
      // In a real implementation, you would navigate to the document upload page
      // navigate("/document-upload");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-4xl flex-1 flex flex-col items-center pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
            <ShieldCheck className="text-[#ff416c] h-6 w-6" />
            KYC Verification
          </h2>
          
          <Card className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Info className="h-5 w-5 text-[#ff416c]" />
                KYC Process Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                Complete your Know Your Customer (KYC) verification to proceed with your loan application. 
                This is a mandatory regulatory requirement to verify your identity.
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-2">Choose a verification method below:</h4>
                <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                  <li>eKYC is the fastest method using Aadhaar OTP (currently unavailable)</li>
                  <li>Video KYC allows you to verify through a short video call (currently unavailable)</li>
                  <li>Document upload requires you to submit copies of your ID and address proof</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            {/* Option 1: eKYC (Disabled) */}
            <Card 
              className={`border-2 ${selectedOption === 1 ? 'border-primary' : 'border-gray-200'} opacity-50 cursor-not-allowed`}
              onClick={() => handleOptionSelect(1)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-gray-200 rounded-full p-3">
                  <IdCard className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">eKYC (Aadhaar based)</h3>
                  <p className="text-sm text-gray-500">Verify instantly using your Aadhaar and OTP</p>
                </div>
                <div className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                  Disabled
                </div>
              </CardContent>
            </Card>
            
            {/* Option 2: VKYC (Disabled) */}
            <Card 
              className={`border-2 ${selectedOption === 2 ? 'border-primary' : 'border-gray-200'} opacity-50 cursor-not-allowed`}
              onClick={() => handleOptionSelect(2)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-gray-200 rounded-full p-3">
                  <Video className="h-6 w-6 text-gray-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Video KYC</h3>
                  <p className="text-sm text-gray-500">Complete verification through a short video call</p>
                </div>
                <div className="bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs font-medium">
                  Disabled
                </div>
              </CardContent>
            </Card>
            
            {/* Option 3: Upload Documents (Enabled) */}
            <Card 
              className={`border-2 ${selectedOption === 3 ? 'border-primary bg-gray-50' : 'border-gray-200'} cursor-pointer transition-all hover:shadow-md`}
              onClick={() => handleOptionSelect(3)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] rounded-full p-3">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Upload Documents</h3>
                  <p className="text-sm text-gray-500">Submit your ID and address proof documents</p>
                </div>
                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                  Available
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
      
      {/* Action button at bottom */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-4 w-full max-w-md px-4 mt-6"
      >
        <Button 
          className="gradient-button w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl"
          onClick={handleProceed}
          disabled={!selectedOption}
        >
          {selectedOption === 3 ? "Proceed with Document Upload" : "Select a Verification Method"}
          <ArrowRight className="ml-1" />
        </Button>
      </motion.div>
    </div>
  );
};

export default KycProcess;
