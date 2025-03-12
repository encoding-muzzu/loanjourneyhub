
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
  const { setCurrentStep, updateDocumentProgress } = useProgress();
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
      
      // Update progress in context
      updateDocumentProgress(documentType, true);
      
      // Get document label mapping
      let documentTitle = "";
      switch (documentType) {
        case 'idFront':
          documentTitle = documentLabels['id-front'].title;
          break;
        case 'idBack':
          documentTitle = documentLabels['id-back'].title;
          break;
        case 'addressFront':
          documentTitle = documentLabels['address-front'].title;
          break;
        case 'addressBack':
          documentTitle = documentLabels['address-back'].title;
          break;
      }
      
      // Show success toast
      toast({
        title: "Document Uploaded",
        description: `Your ${documentTitle} has been successfully uploaded.`,
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
    let currentDocType: keyof typeof documents;
    
    switch (documentStage) {
      case 'id-front':
        currentDocType = 'idFront';
        break;
      case 'id-back':
        currentDocType = 'idBack';
        break;
      case 'address-front':
        currentDocType = 'addressFront';
        break;
      case 'address-back':
        currentDocType = 'addressBack';
        break;
      default:
        currentDocType = 'idFront';
    }
    
    setDocuments(prev => ({
      ...prev,
      [currentDocType]: null
    }));
    
    // Also update progress in context
    updateDocumentProgress(currentDocType, false);
    
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
    setCurrentStep('lender-process');
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
        
        let uploadKey: keyof typeof documents;
        switch (currentDocType) {
          case 'id-front':
            uploadKey = 'idFront';
            break;
          case 'id-back':
            uploadKey = 'idBack';
            break;
          case 'address-front':
            uploadKey = 'addressFront';
            break;
          case 'address-back':
            uploadKey = 'addressBack';
            break;
          default:
            uploadKey = 'idFront';
        }

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
