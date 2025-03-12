
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

// Import refactored components
import KycHeader from "@/components/kyc/KycHeader";
import DocumentUploadFlow from "@/components/kyc/DocumentUploadFlow";
import ActionButtons from "@/components/kyc/ActionButtons";

const KycProcess = () => {
  const { 
    documentStage, 
    renderDocumentUploadStage, 
    handleProceed, 
    handleContinueToLenderProcess,
    selectedOption
  } = DocumentUploadFlow();

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with Icon */}
      <KycHeader />
      
      {/* Scrollable Content Area */}
      <div className="w-full max-w-4xl flex-1 flex flex-col items-center px-4 py-6 overflow-hidden">
        <ScrollArea className="w-full h-[calc(100vh-200px)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full p-4"
          >
            {renderDocumentUploadStage()}
          </motion.div>
        </ScrollArea>
      </div>
      
      {/* Fixed Action Button at Bottom */}
      <ActionButtons 
        documentStage={documentStage}
        selectedOption={selectedOption}
        onProceed={handleProceed}
        onContinue={handleContinueToLenderProcess}
      />
    </div>
  );
};

export default KycProcess;
