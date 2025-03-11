
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { useProgress } from "@/contexts/ProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

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
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto"
      >
        <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
          <div className="gradient-card p-6">
            <CardTitle className="text-white text-2xl font-light">Verify Your PAN</CardTitle>
            <CardDescription className="text-white/80 mt-1">
              We need your PAN details to fetch the best offers
            </CardDescription>
          </div>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  placeholder="Enter PAN Number"
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  className="uppercase text-lg py-6 rounded-xl border-gray-200"
                  maxLength={10}
                />
              </div>
              <div className="text-sm text-gray-500">
                Your PAN will be used to check credit eligibility
              </div>
              <Button type="submit" className="gradient-button w-full py-6 text-lg">
                Verify & Proceed
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
}
