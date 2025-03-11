
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

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
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Available Offers</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: index * 0.2 }
              }}
            >
              <Card className={`overflow-hidden border-none shadow-xl rounded-2xl ${selectedOffer === offer.id ? 'ring-2 ring-primary' : ''}`}>
                <div className={`${offer.gradient} p-6`}>
                  <CardTitle className="text-white text-xl">{offer.lender}</CardTitle>
                  <div className="mt-2 text-3xl font-bold text-white">₹{offer.amount.toLocaleString()}</div>
                  <div className="text-sm text-white/80">Maximum Loan Amount</div>
                </div>
                <CardContent className="p-6 bg-white">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Interest Rate</span>
                      <span className="font-semibold">{offer.interestRate}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tenure</span>
                      <span className="font-semibold">{offer.tenure} months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Monthly EMI</span>
                      <span className="font-semibold">₹{offer.emi.toLocaleString()}</span>
                    </div>
                    <Button 
                      className={selectedOffer === offer.id ? "bg-gray-100 text-gray-800 w-full py-5 mt-2" : `${offer.gradient.replace('card', 'button')} w-full py-5 mt-2`}
                      onClick={() => handleSelectOffer(offer.id)}
                    >
                      {selectedOffer === offer.id ? "Selected" : "Select Offer"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}
