
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
      emi: 16200
    },
    {
      id: 2,
      lender: "XYZ Finance",
      amount: 450000,
      interestRate: 11.0,
      tenure: 36,
      emi: 14700
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
        <h2 className="text-2xl font-semibold text-center">Available Offers</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <Card key={offer.id} className={selectedOffer === offer.id ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle>{offer.lender}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Loan Amount</span>
                    <span className="font-semibold">₹{offer.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Rate</span>
                    <span className="font-semibold">{offer.interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenure</span>
                    <span className="font-semibold">{offer.tenure} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EMI</span>
                    <span className="font-semibold">₹{offer.emi.toLocaleString()}</span>
                  </div>
                </div>
                <Button 
                  className="w-full"
                  onClick={() => handleSelectOffer(offer.id)}
                  variant={selectedOffer === offer.id ? "secondary" : "default"}
                >
                  {selectedOffer === offer.id ? "Selected" : "Select Offer"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </Layout>
  );
}
