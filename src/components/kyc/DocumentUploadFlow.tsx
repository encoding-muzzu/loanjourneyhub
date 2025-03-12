
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useProgress } from "@/contexts/ProgressContext";
import { documentLabels, getDocumentIcon } from "@/constants/kycDocuments";

// Import refactored components
import DocumentUploadCard, { DocumentStage } from "@/components/kyc/DocumentUploadCard";
import DocumentSelectionCard from "@/components/kyc/DocumentSelectionCard";
import DocumentCompletionCard from "@/components/kyc/DocumentCompletionCard";
import ProgressIndicator from "@/components/kyc/ProgressIndicator";

const DocumentUploadFlow = () => {
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

  return {
    documentStage,
    renderDocumentUploadStage,
    handleProceed,
    handleContinueToLenderProcess,
    selectedOption
  };
};

export default DocumentUploadFlow;
