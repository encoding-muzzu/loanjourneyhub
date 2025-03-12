
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { useProgress } from "@/contexts/ProgressContext";
import { useToast } from "@/components/ui/use-toast";

// Import refactored components
import DocumentUploadCard, { DocumentStage } from "@/components/kyc/DocumentUploadCard";
import DocumentSelectionCard from "@/components/kyc/DocumentSelectionCard";
import DocumentCompletionCard from "@/components/kyc/DocumentCompletionCard";
import ProgressIndicator from "@/components/kyc/ProgressIndicator";
import KycHeader from "@/components/kyc/KycHeader";
import { documentLabels, getDocumentIcon } from "@/constants/kycDocuments";

const KycProcess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentStep } = useProgress();
  const [selectedOption, setSelectedOption] = useState<number | null>(3); // Default to option 3 (Upload documents)
  const [documentStage, setDocumentStage] = useState<DocumentStage>('selection');
  
  // Track uploaded documents
  const [documents, setDocuments] = useState({
    idFront: null,
    idBack: null,
    addressFront: null,
    addressBack: null
  });

  const handleOptionSelect = (optionNumber: number) => {
    if (optionNumber === 3) {
      setSelectedOption(optionNumber);
    } else {
      // Show toast for disabled options
      toast({
        title: "Option Unavailable",
        description: "This verification method is currently disabled. Please use document upload."
      });
    }
  };

  const handleProceed = () => {
    if (selectedOption === 3) {
      setDocumentStage('id-front');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, documentType: keyof typeof documents) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // In a real app, you would upload the file to a server here
      setDocuments(prev => ({
        ...prev,
        [documentType]: file
      }));
      
      // Show success toast
      toast({
        title: "Document Uploaded",
        description: `Your ${documentLabels[documentType as keyof typeof documentLabels].title} has been successfully uploaded.`,
        variant: "default",
      });
      
      // Move to next stage based on current stage
      switch (documentType) {
        case 'idFront':
          setDocumentStage('id-back');
          break;
        case 'idBack':
          setDocumentStage('address-front');
          break;
        case 'addressFront':
          setDocumentStage('address-back');
          break;
        case 'addressBack':
          setDocumentStage('completed');
          break;
      }
    }
  };

  const handleRetake = () => {
    // Allow user to retake the current document photo
    const currentDocType = documentStage.replace('-', '') as keyof typeof documents;
    setDocuments(prev => ({
      ...prev,
      [currentDocType]: null
    }));
    
    toast({
      title: "Retake Photo",
      description: "Please take a new photo of your document.",
    });
  };

  const handleBack = () => {
    // Go back to previous stage
    switch (documentStage) {
      case 'id-back':
        setDocumentStage('id-front');
        break;
      case 'address-front':
        setDocumentStage('id-back');
        break;
      case 'address-back':
        setDocumentStage('address-front');
        break;
      default:
        setDocumentStage('selection');
    }
  };

  const handleContinueToLenderProcess = () => {
    setCurrentStep('kyc-process');
    navigate('/lender-process');
  };

  const renderDocumentUploadStage = () => {
    switch (documentStage) {
      case 'id-front':
      case 'id-back':
      case 'address-front':
      case 'address-back': {
        const currentDocType = documentStage as keyof typeof documentLabels;
        const documentInfo = documentLabels[currentDocType];
        const uploadKey = currentDocType.replace('-', '') as keyof typeof documents;

        return (
          <>
            <ProgressIndicator documentStage={documentStage} />
            <DocumentUploadCard 
              title={documentInfo.title}
              description={documentInfo.description}
              icon={getDocumentIcon(documentInfo.iconType)}
              onUpload={(e) => handleFileUpload(e, uploadKey)}
              onRetake={handleRetake}
              onBack={handleBack}
              stage={documentStage}
            />
          </>
        );
      }
      case 'completed':
        return <DocumentCompletionCard />;
      default:
        return (
          <DocumentSelectionCard 
            selectedOption={selectedOption} 
            onOptionSelect={handleOptionSelect} 
          />
        );
    }
  };

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
              onClick={handleProceed}
              disabled={!selectedOption}
            >
              Proceed with Document Upload
              <ArrowRight className="ml-1" />
            </Button>
          ) : documentStage === 'completed' ? (
            <Button 
              className="bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] w-full py-6 text-lg rounded-full flex items-center justify-center gap-2 shadow-xl hover:opacity-95 transition-opacity"
              onClick={handleContinueToLenderProcess}
            >
              Continue to Application Process
              <ArrowRight className="ml-1" />
            </Button>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};

export default KycProcess;
