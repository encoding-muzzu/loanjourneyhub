
import React from "react";
import { Progress } from "@/components/ui/progress";
import { DocumentStage } from "./DocumentUploadCard";

interface ProgressIndicatorProps {
  documentStage: DocumentStage;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ documentStage }) => {
  const getProgressPercentage = () => {
    switch (documentStage) {
      case 'selection': return 0;
      case 'id-front': return 20;
      case 'id-back': return 40;
      case 'address-front': return 60;
      case 'address-back': return 80;
      case 'completed': return 100;
      default: return 0;
    }
  };

  if (documentStage === 'selection' || documentStage === 'completed') {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Start</span>
        <span className="text-sm font-medium">Complete</span>
      </div>
      <Progress value={getProgressPercentage()} className="h-2" />
      
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Step {documentStage === 'id-front' ? 1 : documentStage === 'id-back' ? 2 : documentStage === 'address-front' ? 3 : 4} of 4</span>
        <span>{getProgressPercentage()}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressIndicator;
