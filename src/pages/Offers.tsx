
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, BadgePercent, Calendar, CreditCard, BadgeCheck, Percent } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Offer {
  id: number;
  lender: string;
  amount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  gradient: string;
}

export default function Offers() {
  const { toast } = useToast();
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null);

  const offers: Offer[] = [
    {
      id: 1,
      lender: "ABC Bank",
      amount: 500000,
      interestRate: 10.5,
      tenure: 36,
      emi: 16200,
      gradient: "gradient-card"
    },
    {
      id: 2,
      lender: "XYZ Finance",
      amount: 450000,
      interestRate: 11.0,
      tenure: 36,
      emi: 14700,
      gradient: "gradient-card-purple"
    }
  ];

  const handleSelectOffer = (offerId: number) => {
    setSelectedOffer(offerId);
    toast({
      title: "Offer Selected",
      description: "You'll be contacted by our team shortly."
    });
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
            <BadgeCheck className="text-[#ff416c] h-6 w-6" />
            Available Offers
          </h2>
          
          {/* Scrollable content area with fixed height */}
          <ScrollArea className="h-[calc(100vh-280px)] w-full rounded-md">
            <div className="grid gap-6 md:grid-cols-2 p-1">
              {offers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.2 }
                  }}
                  onClick={() => setSelectedOffer(offer.id)}
                  className="cursor-pointer"
                >
                  <Card className={`overflow-hidden border-none shadow-xl rounded-2xl ${selectedOffer === offer.id ? 'ring-2 ring-primary' : ''}`}>
                    <div className={`${offer.gradient} p-6`}>
                      <CardTitle className="text-white text-xl flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        {offer.lender}
                      </CardTitle>
                      <div className="mt-2 text-3xl font-bold text-white">₹{offer.amount.toLocaleString()}</div>
                      <div className="text-sm text-white/80">Maximum Loan Amount</div>
                    </div>
                    <CardContent className="p-6 bg-white">
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm items-center">
                          <span className="text-gray-500 flex items-center gap-2">
                            <Percent className="h-4 w-4 text-[#ff416c]" />
                            Interest Rate
                          </span>
                          <span className="font-semibold">{offer.interestRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                          <span className="text-gray-500 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-[#ff416c]" />
                            Tenure
                          </span>
                          <span className="font-semibold">{offer.tenure} months</span>
                        </div>
                        <div className="flex justify-between text-sm items-center">
                          <span className="text-gray-500 flex items-center gap-2">
                            <BadgePercent className="h-4 w-4 text-[#ff416c]" />
                            Monthly EMI
                          </span>
                          <span className="font-semibold">₹{offer.emi.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
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
          onClick={() => selectedOffer ? handleSelectOffer(selectedOffer) : null}
          disabled={!selectedOffer}
        >
          {selectedOffer ? "Proceed with Selected Offer" : "Select an Offer to Continue"}
          {selectedOffer && <ArrowRight className="ml-1" />}
        </Button>
      </motion.div>
    </div>
  );
}
