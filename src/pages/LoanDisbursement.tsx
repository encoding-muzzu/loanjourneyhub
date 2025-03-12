
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Calendar, CreditCard, BarChart3, FileText, Phone, Mail, HelpCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useProgress } from "@/contexts/ProgressContext";

export default function LoanDisbursement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentStep } = useProgress();
  const [activeTab, setActiveTab] = useState<"confirmation" | "details" | "support">("confirmation");
  
  // Mock loan details - in a real app, this would come from an API
  const loanDetails = {
    loanId: "LN20240710001",
    amount: 250000,
    tenure: 24, // months
    interestRate: 11.5, // percentage
    processingFee: 5000,
    disbursementDate: "2024-07-10",
    accountNumber: "XXXX XXXX 1234",
    emi: 11689, // per month
    totalInterest: 30536,
    totalRepayment: 280536
  };
  
  // Mock EMI schedule - first 6 months
  const emiSchedule = [
    { month: 1, date: "2024-08-10", principal: 9564, interest: 2125, balance: 240436 },
    { month: 2, date: "2024-09-10", principal: 9645, interest: 2044, balance: 230791 },
    { month: 3, date: "2024-10-10", principal: 9727, interest: 1962, balance: 221064 },
    { month: 4, date: "2024-11-10", principal: 9810, interest: 1879, balance: 211254 },
    { month: 5, date: "2024-12-10", principal: 9893, interest: 1796, balance: 201361 },
    { month: 6, date: "2025-01-10", principal: 9977, interest: 1712, balance: 191384 }
  ];
  
  const handleHomeReturn = () => {
    toast({
      title: "Thank you for using our service!",
      description: "Your loan has been successfully processed.",
    });
    
    setCurrentStep("welcome");
    navigate("/");
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      {/* Header with Icon */}
      <div className="w-full bg-white shadow-md py-4 px-6 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mr-3">
          <Check className="h-5 w-5 text-white" />
        </div>
        <h1 className="text-xl font-semibold">Loan Disbursement Confirmation</h1>
      </div>
      
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center pt-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Tabs defaultValue="confirmation" onValueChange={(value) => setActiveTab(value as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
              <TabsTrigger value="details">Loan Details</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="confirmation" className="mt-4">
              <Card className="shadow-xl border-none rounded-xl">
                <CardHeader className="bg-green-50 border-b border-green-100">
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    <Check className="h-6 w-6 text-green-500" />
                    Disbursement Successful
                  </CardTitle>
                  <CardDescription className="text-green-600">
                    Your loan amount has been successfully disbursed to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="space-y-6">
                    <div className="relative flex items-center justify-center py-6">
                      <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-600">
                        <Check className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-1">
                        {formatCurrency(loanDetails.amount)}
                      </h3>
                      <p className="text-gray-500">has been disbursed to your account</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Account Number</span>
                        <span className="font-medium">{loanDetails.accountNumber}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">Disbursement Date</span>
                        <span className="font-medium">{formatDate(loanDetails.disbursementDate)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Loan ID</span>
                        <span className="font-medium">{loanDetails.loanId}</span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <p className="text-sm text-green-700 text-center">
                        Your first EMI payment of {formatCurrency(loanDetails.emi)} is scheduled for {formatDate('2024-08-10')}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setActiveTab("details")}
                    className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-6 rounded-full flex items-center justify-center gap-2 shadow-xl"
                  >
                    View Loan Details
                    <ArrowRight className="ml-1" size={18} />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="mt-4">
              <Card className="shadow-xl border-none rounded-xl">
                <CardHeader className="bg-blue-50 border-b border-blue-100">
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    <FileText className="h-6 w-6 text-blue-500" />
                    Loan Details
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    Complete information about your loan and repayment schedule
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                        <CreditCard className="h-8 w-8 text-gray-500 mb-2" />
                        <span className="text-sm text-gray-500">Loan Amount</span>
                        <span className="font-bold text-lg">{formatCurrency(loanDetails.amount)}</span>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                        <Calendar className="h-8 w-8 text-gray-500 mb-2" />
                        <span className="text-sm text-gray-500">Tenure</span>
                        <span className="font-bold text-lg">{loanDetails.tenure} months</span>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                        <BarChart3 className="h-8 w-8 text-gray-500 mb-2" />
                        <span className="text-sm text-gray-500">Interest Rate</span>
                        <span className="font-bold text-lg">{loanDetails.interestRate}% p.a.</span>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                        <Calendar className="h-8 w-8 text-gray-500 mb-2" />
                        <span className="text-sm text-gray-500">Monthly EMI</span>
                        <span className="font-bold text-lg">{formatCurrency(loanDetails.emi)}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-800 mb-3">Repayment Schedule</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="text-xs text-gray-500 border-b">
                              <th className="pb-2 text-left">Month</th>
                              <th className="pb-2 text-left">Due Date</th>
                              <th className="pb-2 text-right">Principal</th>
                              <th className="pb-2 text-right">Interest</th>
                              <th className="pb-2 text-right">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {emiSchedule.map((emi) => (
                              <tr key={emi.month} className="text-sm border-b border-gray-100">
                                <td className="py-2">{emi.month}</td>
                                <td className="py-2">{formatDate(emi.date)}</td>
                                <td className="py-2 text-right">{formatCurrency(emi.principal)}</td>
                                <td className="py-2 text-right">{formatCurrency(emi.interest)}</td>
                                <td className="py-2 text-right">{formatCurrency(emi.balance)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 text-right">
                        Showing first 6 months of {loanDetails.tenure} months
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="text-center">
                          <span className="text-sm text-gray-500">Total Interest</span>
                          <div className="font-bold text-lg">{formatCurrency(loanDetails.totalInterest)}</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="text-center">
                          <span className="text-sm text-gray-500">Total Repayment</span>
                          <div className="font-bold text-lg">{formatCurrency(loanDetails.totalRepayment)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => setActiveTab("support")}
                    className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-6 rounded-full flex items-center justify-center gap-2 shadow-xl"
                  >
                    Need Help?
                    <HelpCircle className="ml-1" size={18} />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="support" className="mt-4">
              <Card className="shadow-xl border-none rounded-xl">
                <CardHeader className="bg-indigo-50 border-b border-indigo-100">
                  <CardTitle className="flex items-center gap-2 text-indigo-700">
                    <HelpCircle className="h-6 w-6 text-indigo-500" />
                    Support Information
                  </CardTitle>
                  <CardDescription className="text-indigo-600">
                    We're here to help if you have any questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-6">
                  <div className="space-y-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        Thank You for Choosing Us!
                      </h3>
                      <p className="text-gray-500">
                        We appreciate your trust in our services
                      </p>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                      <p className="text-sm text-indigo-700">
                        If you have any questions or need assistance with your loan, 
                        our customer support team is available to help you through multiple channels.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Phone className="h-6 w-6 text-gray-500 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-800">Call Us</h4>
                          <p className="text-sm text-gray-500">1800-XXX-XXXX (Toll Free)</p>
                          <p className="text-xs text-gray-400">Mon-Sat, 9:00 AM - 6:00 PM</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <Mail className="h-6 w-6 text-gray-500 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-800">Email Support</h4>
                          <p className="text-sm text-gray-500">support@loanabc.com</p>
                          <p className="text-xs text-gray-400">We respond within 24 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <MessageSquare className="h-6 w-6 text-gray-500 mr-3" />
                        <div>
                          <h4 className="font-medium text-gray-800">Live Chat</h4>
                          <p className="text-sm text-gray-500">Chat with our support agents</p>
                          <p className="text-xs text-gray-400">Available 24/7</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-800 mb-2">Frequently Asked Questions</h3>
                      <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
                        <li>How do I check my EMI payment status?</li>
                        <li>Can I make partial prepayment of my loan?</li>
                        <li>How to update my personal information?</li>
                        <li>What happens if I miss an EMI payment?</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleHomeReturn}
                    className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-6 rounded-full flex items-center justify-center gap-2 shadow-xl"
                  >
                    Back to Home
                    <ArrowRight className="ml-1" size={18} />
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      <div className="h-16"></div> {/* Spacer at the bottom */}
    </div>
  );
}
