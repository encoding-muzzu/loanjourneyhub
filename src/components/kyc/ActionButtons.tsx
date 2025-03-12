
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { DocumentStage } from "./DocumentUploadCard";

interface ActionButtonsProps {
  documentStage: DocumentStage;
  selectedOption: number | null;
  onProceed: () => void;
  onContinue: () => void;
}

const ActionButtons = ({ 
  documentStage, 
  selectedOption, 
  onProceed, 
  onContinue 
}: ActionButtonsProps) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="w-full bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]"
    >
      <div className="max-w-md mx-auto">
        {documentStage === 'selection' ? (
          <Button 
            className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl hover:opacity-95 transition-opacity"
            onClick={onProceed}
            disabled={!selectedOption}
          >
            Proceed with Document Upload
            <ArrowRight className="ml-1" />
          </Button>
        ) : documentStage === 'completed' ? (
          <Button 
            className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl hover:opacity-95 transition-opacity"
            onClick={onContinue}
          >
            Continue to Application Process
            <ArrowRight className="ml-1" />
          </Button>
        ) : null}
      </div>
    </motion.div>
  );
};

export default ActionButtons;
