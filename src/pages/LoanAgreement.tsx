
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Signature, CreditCard, Send, Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useProgress } from "@/contexts/ProgressContext";

type AgreementStep = "documents" | "esign" | "nach" | "complete";

export default function LoanAgreement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentStep: setAppStep } = useProgress();
  const [agreementStep, setAgreementStep] = useState<AgreementStep>("documents");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [otp, setOtp] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  
  const handleNextStep = () => {
    switch (agreementStep) {
      case "documents":
        setAgreementStep("esign");
        break;
      case "esign":
        setAgreementStep("nach");
        break;
      case "nach":
        handleSubmitForDisbursement();
        break;
      case "complete":
        // Navigate to home or completion page
        setAppStep("welcome");
        navigate("/");
        break;
    }
  };
  
  const handleSubmitForDisbursement = () => {
    setIsLoading(true);
    
    // Simulate submission process
    setTimeout(() => {
      setIsLoading(false);
      setAgreementStep("complete");
      
      toast({
        title: "Disbursement Request Submitted",
        description: "Your loan will be disbursed within 2-3 business days.",
        variant: "default",
      });
    }, 2000);
  };
  
  // Helper for OTP validation
  const validateOtp = (otp: string) => {
    // In a real app, you would verify with a server
    return otp.length === 6 && /^\d+$/.test(otp);
  };
  
  // Helper for bank details validation
  const validateBankDetails = () => {
    return bankAccount.length >= 9 && ifscCode.length === 11;
  };
  
  const renderStepContent = () => {
    switch (agreementStep) {
      case "documents":
        return (
          <Card className="shadow-xl border-none rounded-xl">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <FileText className="h-6 w-6 text-blue-500" />
                Loan Documents
              </CardTitle>
              <CardDescription className="text-blue-600">
                Please review the loan documents carefully before proceeding
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-2">Loan Agreement</h3>
                  <p className="text-sm text-gray-600">
                    This document outlines the terms and conditions of your loan, including the loan amount, 
                    interest rate, repayment schedule, and other important details.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Document
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-2">Terms & Conditions</h3>
                  <p className="text-sm text-gray-600">
                    This document contains the general terms and conditions that apply to your loan agreement.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Document
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-2">Privacy Policy</h3>
                  <p className="text-sm text-gray-600">
                    This document explains how your personal information will be collected, used, and protected.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    View Document
                  </Button>
                </div>
                
                <div className="flex items-start gap-3 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full h-6 w-6 p-0 flex items-center justify-center"
                    onClick={() => setHasAccepted(!hasAccepted)}
                  >
                    {hasAccepted && <Check className="h-4 w-4" />}
                  </Button>
                  <p className="text-sm text-gray-700">
                    I have read and agree to the terms and conditions outlined in the loan documents.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleNextStep}
                disabled={!hasAccepted}
                className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-6 rounded-full flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                Proceed to e-Sign
                <ArrowRight className="ml-1" size={18} />
              </Button>
            </CardFooter>
          </Card>
        );
        
      case "esign":
        return (
          <Card className="shadow-xl border-none rounded-xl">
            <CardHeader className="bg-indigo-50 border-b border-indigo-100">
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <Signature className="h-6 w-6 text-indigo-500" />
                e-Sign Setup
              </CardTitle>
              <CardDescription className="text-indigo-600">
                Electronically sign your loan documents
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-6">
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <p className="text-sm text-indigo-700">
                    We've sent a one-time password (OTP) to your registered mobile number. 
                    Please enter it below to verify your identity and electronically sign the documents.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium text-gray-700">
                    Enter OTP
                  </label>
                  <Input
                    id="otp"
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="text-center letter-spacing-1 text-lg"
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button variant="link" size="sm" className="text-indigo-600">
                    Resend OTP
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-2">Why e-Sign?</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>Faster processing of your loan application</li>
                    <li>Secure and legally binding digital signatures</li>
                    <li>Environmentally friendly alternative to paper documents</li>
                    <li>Convenient access to signed documents anytime</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleNextStep}
                disabled={!validateOtp(otp)}
                className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-6 rounded-full flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                Proceed to NACH Setup
                <ArrowRight className="ml-1" size={18} />
              </Button>
            </CardFooter>
          </Card>
        );
        
      case "nach":
        return (
          <Card className="shadow-xl border-none rounded-xl">
            <CardHeader className="bg-green-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CreditCard className="h-6 w-6 text-green-500" />
                NACH Setup
              </CardTitle>
              <CardDescription className="text-green-600">
                Set up auto-debit authorization for EMI payments
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-sm text-green-700">
                    NACH (National Automated Clearing House) allows automatic deduction of your EMI from your bank account 
                    on the due date. This ensures timely payments and helps you avoid late fees.
                  </p>
                </div>
                
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Bank Account</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label htmlFor="account" className="text-sm font-medium text-gray-700">
                        Bank Account Number
                      </label>
                      <Input
                        id="account"
                        type="text"
                        placeholder="Enter account number"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="ifsc" className="text-sm font-medium text-gray-700">
                        IFSC Code
                      </label>
                      <Input
                        id="ifsc"
                        type="text"
                        placeholder="Enter IFSC code"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="upi" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label htmlFor="upi" className="text-sm font-medium text-gray-700">
                        UPI ID
                      </label>
                      <Input
                        id="upi"
                        type="text"
                        placeholder="username@bankname"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-2">Important Information</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>Auto-debit will occur on your EMI due date each month</li>
                    <li>You can cancel the NACH mandate at any time by contacting customer support</li>
                    <li>Ensure sufficient balance in your account to avoid payment failures</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleNextStep}
                disabled={!validateBankDetails()}
                className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-6 rounded-full flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    Submit for Disbursement
                    <Send className="ml-1" size={18} />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
        
      case "complete":
        return (
          <Card className="shadow-xl border-none rounded-xl">
            <CardHeader className="bg-green-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <Check className="h-6 w-6 text-green-500" />
                Disbursement Request Submitted
              </CardTitle>
              <CardDescription className="text-green-600">
                Your loan is now being processed for disbursement
              </CardDescription>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-6">
                <div className="relative flex items-center justify-center py-6">
                  <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-sm text-green-700 text-center">
                    Your loan will be disbursed to your bank account within 2-3 business days.
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-800 mb-2">Next Steps</h3>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                    <li>You will receive an SMS notification when the funds are disbursed</li>
                    <li>Your first EMI will be due 30 days after disbursement</li>
                    <li>You can view your repayment schedule in the app</li>
                    <li>For any queries, please contact our customer support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleNextStep}
                className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-6 rounded-full flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
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
          <FileText className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold">Loan Agreement & e-Sign</h1>
      </div>
      
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {renderStepContent()}
        </motion.div>
      </div>
      
      <div className="h-16"></div> {/* Spacer at the bottom */}
    </div>
  );
}
