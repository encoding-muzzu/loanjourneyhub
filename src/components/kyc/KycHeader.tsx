
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const KycHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white shadow-md p-4 flex items-center justify-center"
    >
      <h2 className="text-2xl font-semibold text-center flex items-center gap-2">
        <ShieldCheck className="text-[#ff416c] h-6 w-6" />
        KYC Verification
      </h2>
    </motion.div>
  );
};

export default KycHeader;
