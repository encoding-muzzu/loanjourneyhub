
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, CheckCircle, XCircle, ArrowRight, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/contexts/ProgressContext";

// Screen type for the different states
type ScreenType = "processing" | "info-request" | "approved" | "rejected";

// Loan terms interface
interface LoanTerms {
  amount: string;
  interestRate: string;
  emi: string;
  tenure: string;
}

export default function LenderProcess() {
  const navigate = useNavigate();
  const { setCurrentStep } = useProgress();
  
  // Initial state is processing
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("processing");
  
  // Sample loan terms
  const loanTerms: LoanTerms = {
    amount: "₹3,00,000",
    interestRate: "10.5%",
    emi: "₹6,500",
    tenure: "60 months"
  };
  
  useEffect(() => {
    // Simulate application processing
    const timer = setTimeout(() => {
      // Show additional info request after 2 seconds
      setCurrentScreen("info-request");
      
      // After 3 more seconds, randomly show approval or rejection
      const finalTimer = setTimeout(() => {
        // Randomly decide approval or rejection
        const isApproved = Math.random() > 0.5;
        setCurrentScreen(isApproved ? "approved" : "rejected");
      }, 3000);
      
      return () => clearTimeout(finalTimer);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle completion (going back to home)
  const handleComplete = () => {
    if (currentScreen === "approved") {
      // Navigate to loan agreement page
      setCurrentStep('loan-agreement');
      navigate('/loan-agreement');
    } else {
      // If rejected, go back to home
      setCurrentStep('welcome');
      navigate('/');
    }
  };
  
  // Render screen based on current state
  const renderScreen = () => {
    switch (currentScreen) {
      case "processing":
        return (
          <Card className="shadow-xl border-none rounded-xl">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Clock className="h-6 w-6 text-blue-500" />
                Application In Process
              </CardTitle>
              <CardDescription className="text-blue-600">
                Your application is being reviewed by the lender
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="absolute animate-ping w-24 h-24 rounded-full bg-blue-200 opacity-75"></div>
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-blue-600">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <p className="text-center text-gray-700 mt-6">
                  Please wait while we process your application. This typically takes 24-48 hours.
                </p>
                
                <div className="flex justify-center mt-4">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
        
      case "info-request":
        return (
          <Card className="shadow-xl border-none rounded-xl">
            <CardHeader className="bg-amber-50 border-b border-amber-100">
              <CardTitle className="flex items-center gap-2 text-amber-700">
                <Info className="h-6 w-6 text-amber-500" />
                Additional Information Needed
              </CardTitle>
              <CardDescription className="text-amber-600">
                The lender requires more information to process your application
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-600">
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-4">
                  <h3 className="font-medium text-amber-800 mb-2">Required Documents:</h3>
                  <ul className="list-disc pl-5 text-amber-700 space-y-2">
                    <li>Latest 3 months' bank statements</li>
                    <li>Recent utility bill (not older than 3 months)</li>
                    <li>Selfie with your PAN card</li>
                  </ul>
                </div>
                
                <p className="text-center text-gray-700">
                  Please provide these documents as soon as possible to avoid delays.
                </p>
              </div>
            </CardContent>
          </Card>
        );
        
      case "approved":
        return (
          <Card className="shadow-xl border-none rounded-xl">
            <CardHeader className="bg-green-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Application Approved!
              </CardTitle>
              <CardDescription className="text-green-600">
                Congratulations! Your loan has been approved
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-4">
                    <CheckCircle className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <h3 className="text-lg font-medium text-center">Loan Terms</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500">Loan Amount</p>
                      <p className="text-xl font-semibold text-gray-800">{loanTerms.amount}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500">Interest Rate</p>
                      <p className="text-xl font-semibold text-gray-800">{loanTerms.interestRate}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500">Monthly EMI</p>
                      <p className="text-xl font-semibold text-gray-800">{loanTerms.emi}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500">Tenure</p>
                      <p className="text-xl font-semibold text-gray-800">{loanTerms.tenure}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-2">
                  <p className="text-sm text-green-700">
                    The funds will be disbursed to your account within 2-3 business days.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-6 rounded-full flex items-center justify-center gap-2 shadow-xl"
              >
                Proceed to Loan Agreement
                <ArrowRight className="ml-1" size={18} />
              </Button>
            </CardFooter>
          </Card>
        );
        
      case "rejected":
        return (
          <Card className="shadow-xl border-none rounded-xl">
            <CardHeader className="bg-red-50 border-b border-red-100">
              <CardTitle className="flex items-center gap-2 text-red-700">
                <XCircle className="h-6 w-6 text-red-500" />
                Application Not Approved
              </CardTitle>
              <CardDescription className="text-red-600">
                We're sorry, your application was not approved at this time
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-red-600 mb-4">
                    <XCircle className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700">
                    Based on our lender's criteria, we're unable to approve your loan application at this time.
                    This decision was based on multiple factors including credit history and eligibility requirements.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">What's Next?</h3>
                  <ul className="list-disc pl-5 text-blue-700 space-y-2">
                    <li>You can re-apply after 3 months</li>
                    <li>Work on improving your credit score</li>
                    <li>Ensure all your documents are up to date</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-6 rounded-full flex items-center justify-center gap-2 shadow-xl"
              >
                Back to Home
                <ArrowRight className="ml-1" size={18} />
              </Button>
            </CardFooter>
          </Card>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      {/* Header with Icon */}
      <div className="w-full bg-white shadow-md py-4 px-6 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] flex items-center justify-center mr-3">
          <Clock className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold">Lender Application Process</h1>
      </div>
      
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {renderScreen()}
        </motion.div>
      </div>
      
      <div className="h-16"></div> {/* Spacer at the bottom */}
    </div>
  );
}
